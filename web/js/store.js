/* =========================================================
   USKLIK — Data layer (Supabase)
   -----------------------------------------------------
   Ovo je JEDINO mesto u sajtu koje priča sa bazom (Supabase).
   Sve HTML stranice pozivaju iste funkcije kao i pre
   (KU.store.getRequests(), KU.store.login()...), samo što
   sada te funkcije vraćaju "Promise" (rade preko interneta,
   ne trenutno kao localStorage) — zato stranice ispred tih
   poziva imaju "await".

   KU.ready je jedan "signal" koji kaže da je provera prijave
   (da li je neko već ulogovan) završena. Svaka stranica prvo
   sačeka (await KU.ready) pre nego što nastavi — to se radi
   samo jednom po učitavanju stranice, brzo je.
   ========================================================= */

const KU_SUPABASE = window.supabase.createClient(KU_CONFIG.supabase.url, KU_CONFIG.supabase.anonKey);

let _kuCurrentUser = null;

/* ---------------------- Prevod baza <-> sajt ----------------------
   Kolone u bazi su snake_case (klijent_id, created_at...), a sajt
   svuda koristi camelCase (klijentId, createdAt...) kao i u staroj
   localStorage verziji — ovi "mapiraj" pretvaraju jedno u drugo, da
   nijedna HTML stranica ne mora da se menja zbog imena polja. */

function _kuMapProfile(row) {
  if (!row) return null;
  return {
    id: row.id,
    role: row.role,
    ime: row.ime,
    email: row.email,
    telefon: row.telefon,
    kategorije: row.kategorije || [],
    bio: row.bio || "",
    createdAt: row.created_at,
    demo: !!row.demo,
    godinaRodjenja: row.godina_rodjenja,
    godineIskustva: row.godine_iskustva,
    cenaIzlaskaHitno: row.cena_izlaska_hitno,
  };
}

function _kuMapRequest(row) {
  if (!row) return null;
  return {
    id: row.id,
    klijentId: row.klijent_id,
    kategorija: row.kategorija,
    opis: row.opis,
    lokacija: row.lokacija,
    zeljeniTermin: row.zeljeni_termin || "",
    status: row.status,
    createdAt: row.created_at,
    izabranaPonudaId: row.izabrana_ponuda_id,
    tipTermina: row.tip_termina || null,
    datumPocetka: row.datum_pocetka || null,
    fleksibilnostDana: row.fleksibilnost_dana || null,
    zeljeniMesec: row.zeljeni_mesec || null,
    hitno: !!row.hitno,
    slikaUrl: row.slika_url || null,
  };
}

function _kuMapOffer(row) {
  if (!row) return null;
  return {
    id: row.id,
    requestId: row.request_id,
    izvodjacId: row.izvodjac_id,
    poruka: row.poruka,
    status: row.status,
    createdAt: row.created_at,
    predlozeniDatum: row.predlozeni_datum || null,
    cenaIzlaska: row.cena_izlaska,
    cenaPopravkeOd: row.cena_popravke_od,
    cenaPopravkeDo: row.cena_popravke_do,
  };
}

function _kuMapRating(row) {
  if (!row) return null;
  return {
    id: row.id,
    requestId: row.request_id,
    izvodjacId: row.izvodjac_id,
    klijentId: row.klijent_id,
    ocena: row.ocena,
    komentar: row.komentar || "",
    createdAt: row.created_at,
  };
}

/* Neke greške od Supabase Auth su na engleskom — prevod za najčešće. */
function _kuAuthErrorMessage(error) {
  const msg = (error && error.message) || "";
  if (/already registered|already exists/i.test(msg)) {
    return "Nalog sa ovim email-om već postoji. Probaj da se prijaviš.";
  }
  if (/invalid login credentials/i.test(msg)) {
    return "Pogrešan email ili lozinka.";
  }
  if (/password should be at least/i.test(msg)) {
    return "Lozinka je prekratka (najmanje 6 karaktera).";
  }
  if (/email not confirmed/i.test(msg)) {
    return "Nalog čeka potvrdu email-a. Proveri inbox (i spam folder) pre prijave.";
  }
  return msg || "Došlo je do greške. Pokušaj ponovo.";
}

async function _kuFetchProfile(id) {
  if (!id) return null;
  const { data, error } = await KU_SUPABASE.from("profiles").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("Greška pri učitavanju profila:", error.message);
    return null;
  }
  return _kuMapProfile(data);
}

/* ---------------------- Javni API: KU.store ---------------------- */
const KU = window.KU || {};
KU.store = {
  async init() {
    const { data, error } = await KU_SUPABASE.auth.getSession();
    if (error) {
      console.error("Greška pri proveri prijave:", error.message);
      return;
    }
    if (data && data.session) {
      _kuCurrentUser = await _kuFetchProfile(data.session.user.id);
    }
  },

  /* ---- Korisnici / prijava ---- */
  async getUsers() {
    const { data, error } = await KU_SUPABASE.from("profiles").select("*");
    if (error) { console.error(error.message); return []; }
    return (data || []).map(_kuMapProfile);
  },

  async getUserById(id) {
    return _kuFetchProfile(id);
  },

  async getUserByEmail(email) {
    const e = (email || "").trim().toLowerCase();
    const { data, error } = await KU_SUPABASE.from("profiles").select("*").eq("email", e).maybeSingle();
    if (error) return null;
    return _kuMapProfile(data);
  },

  async registerUser({ role, ime, email, password, telefon, kategorije, bio }) {
    const cleanEmail = (email || "").trim().toLowerCase();
    const { data, error } = await KU_SUPABASE.auth.signUp({ email: cleanEmail, password });
    if (error) throw new Error(_kuAuthErrorMessage(error));
    if (!data.user) throw new Error("Registracija nije uspela. Pokušaj ponovo.");
    if (!data.session) {
      // Projekat ima uključenu potvrdu email-a — nalog postoji, ali se ne
      // može odmah koristiti. (Za MVP test preporučeno je isključiti ovu
      // opciju u Supabase -> Authentication, vidi UPUTSTVO_SUPABASE.md.)
      throw new Error("Nalog je napravljen, ali je potrebno prvo potvrditi email (proveri inbox), pa se onda prijaviti.");
    }

    const row = {
      id: data.user.id,
      role,
      ime: (ime || "").trim(),
      email: cleanEmail,
      telefon: (telefon || "").trim(),
      kategorije: role === "izvodjac" ? (kategorije || []) : null,
      bio: role === "izvodjac" ? (bio || "") : null,
    };
    const { data: profileRow, error: profileError } = await KU_SUPABASE
      .from("profiles")
      .insert(row)
      .select()
      .single();
    if (profileError) {
      throw new Error("Nalog za prijavu je napravljen, ali čuvanje profila nije uspelo: " + profileError.message);
    }
    _kuCurrentUser = _kuMapProfile(profileRow);
    return _kuCurrentUser;
  },

  async updateUser(id, patch) {
    const dbPatch = {};
    if (patch.ime !== undefined) dbPatch.ime = patch.ime;
    if (patch.telefon !== undefined) dbPatch.telefon = patch.telefon;
    if (patch.bio !== undefined) dbPatch.bio = patch.bio;
    if (patch.kategorije !== undefined) dbPatch.kategorije = patch.kategorije;
    if (patch.godinaRodjenja !== undefined) dbPatch.godina_rodjenja = patch.godinaRodjenja;
    if (patch.godineIskustva !== undefined) dbPatch.godine_iskustva = patch.godineIskustva;
    if (patch.cenaIzlaskaHitno !== undefined) dbPatch.cena_izlaska_hitno = patch.cenaIzlaskaHitno;

    const { data, error } = await KU_SUPABASE.from("profiles").update(dbPatch).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    const mapped = _kuMapProfile(data);
    if (_kuCurrentUser && _kuCurrentUser.id === id) _kuCurrentUser = mapped;
    return mapped;
  },

  async login(email, password) {
    const { data, error } = await KU_SUPABASE.auth.signInWithPassword({
      email: (email || "").trim().toLowerCase(),
      password,
    });
    if (error || !data.session) return null;
    _kuCurrentUser = await _kuFetchProfile(data.session.user.id);
    return _kuCurrentUser;
  },

  async logout() {
    await KU_SUPABASE.auth.signOut();
    _kuCurrentUser = null;
  },

  /* Reset zaboravljene lozinke (dogovoreno 7.9.) — šalje email sa linkom
     koji vodi na nova-lozinka.html. Supabase automatski otvara privremenu
     sesiju kad korisnik klikne link iz emaila (detectSessionInUrl), pa ta
     stranica onda može da pozove postaviNovuLozinku(). */
  async posaljiResetLozinke(email) {
    const { error } = await KU_SUPABASE.auth.resetPasswordForEmail(
      (email || "").trim().toLowerCase(),
      { redirectTo: window.location.origin + window.location.pathname.replace(/[^/]*$/, "") + "nova-lozinka.html" }
    );
    if (error) throw new Error(_kuAuthErrorMessage(error));
  },

  async postaviNovuLozinku(novaLozinka) {
    const { error } = await KU_SUPABASE.auth.updateUser({ password: novaLozinka });
    if (error) throw new Error(_kuAuthErrorMessage(error));
  },

  /* Sinhrono (bez await) — čita iz memorije, popunjeno u init()/login().
     Zato SVAKA stranica mora prvo da uradi "await KU.ready" pre nego što
     pozove ovo ili kuRequireAuth(). */
  currentUser() {
    return _kuCurrentUser;
  },

  /* ---- Zahtevi ---- */
  async getRequests() {
    const { data, error } = await KU_SUPABASE.from("requests").select("*").order("created_at", { ascending: false });
    if (error) { console.error(error.message); return []; }
    return (data || []).map(_kuMapRequest);
  },

  async getRequestById(id) {
    if (!id) return null;
    const { data, error } = await KU_SUPABASE.from("requests").select("*").eq("id", id).maybeSingle();
    if (error) { console.error(error.message); return null; }
    return _kuMapRequest(data);
  },

  async getRequestsByKlijent(klijentId) {
    const { data, error } = await KU_SUPABASE
      .from("requests")
      .select("*")
      .eq("klijent_id", klijentId)
      .order("created_at", { ascending: false });
    if (error) { console.error(error.message); return []; }
    return (data || []).map(_kuMapRequest);
  },

  async createRequest({
    klijentId, kategorija, opis, lokacija, zeljeniTermin,
    tipTermina, datumPocetka, fleksibilnostDana, zeljeniMesec, hitno, slikaUrl,
  }) {
    const row = {
      klijent_id: klijentId,
      kategorija,
      opis: (opis || "").trim(),
      lokacija,
      zeljeni_termin: (zeljeniTermin || "").trim(),
      status: "otvoren",
      tip_termina: tipTermina || null,
      datum_pocetka: datumPocetka || null,
      fleksibilnost_dana: fleksibilnostDana || null,
      zeljeni_mesec: zeljeniMesec || null,
      hitno: !!hitno,
      slika_url: slikaUrl || null,
    };
    const { data, error } = await KU_SUPABASE.from("requests").insert(row).select().single();
    if (error) throw new Error(error.message);
    return _kuMapRequest(data);
  },

  /* Otpremanje slike uz hitnu intervenciju (dogovoreno 7.9.) — Supabase
     Storage, bucket "hitne-slike" (javno čitljiv, vidi db/schema.sql deo
     7). Vraća javni URL slike koji se onda čuva u requests.slika_url. */
  async uploadSlikaHitne(file, klijentId) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${klijentId}/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
    const { error } = await KU_SUPABASE.storage.from("hitne-slike").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw new Error("Slika nije mogla da se otpremi: " + error.message);
    const { data } = KU_SUPABASE.storage.from("hitne-slike").getPublicUrl(path);
    return data.publicUrl;
  },

  async cancelRequest(id) {
    const { data, error } = await KU_SUPABASE.from("requests").update({ status: "otkazan" }).eq("id", id).select().single();
    if (error) { console.error(error.message); return null; }
    return _kuMapRequest(data);
  },

  async completeRequest(id) {
    const { data, error } = await KU_SUPABASE.from("requests").update({ status: "zavrsen" }).eq("id", id).select().single();
    if (error) { console.error(error.message); return null; }
    return _kuMapRequest(data);
  },

  /* ---- Ponude izvođača na zahteve ---- */
  async getOffers() {
    const { data, error } = await KU_SUPABASE.from("offers").select("*");
    if (error) { console.error(error.message); return []; }
    return (data || []).map(_kuMapOffer);
  },

  async getOffersByRequest(requestId) {
    const { data, error } = await KU_SUPABASE
      .from("offers")
      .select("*")
      .eq("request_id", requestId)
      .order("created_at", { ascending: false });
    if (error) { console.error(error.message); return []; }
    return (data || []).map(_kuMapOffer);
  },

  async getOffersByIzvodjac(izvodjacId) {
    const { data, error } = await KU_SUPABASE
      .from("offers")
      .select("*")
      .eq("izvodjac_id", izvodjacId)
      .order("created_at", { ascending: false });
    if (error) { console.error(error.message); return []; }
    return (data || []).map(_kuMapOffer);
  },

  async hasOffered(requestId, izvodjacId) {
    const { data, error } = await KU_SUPABASE
      .from("offers")
      .select("id")
      .eq("request_id", requestId)
      .eq("izvodjac_id", izvodjacId)
      .maybeSingle();
    if (error) return false;
    return !!data;
  },

  async createOffer({
    requestId, izvodjacId, poruka,
    predlozeniDatum, cenaIzlaska, cenaPopravkeOd, cenaPopravkeDo,
  }) {
    const row = {
      request_id: requestId,
      izvodjac_id: izvodjacId,
      poruka: (poruka || "").trim(),
      status: "poslata",
      predlozeni_datum: predlozeniDatum || null,
      cena_izlaska: cenaIzlaska != null && cenaIzlaska !== "" ? Number(cenaIzlaska) : null,
      cena_popravke_od: cenaPopravkeOd != null && cenaPopravkeOd !== "" ? Number(cenaPopravkeOd) : null,
      cena_popravke_do: cenaPopravkeDo != null && cenaPopravkeDo !== "" ? Number(cenaPopravkeDo) : null,
    };
    const { data, error } = await KU_SUPABASE.from("offers").insert(row).select().single();
    if (error) throw new Error(error.message);
    return _kuMapOffer(data);
  },

  async acceptOffer(offerId) {
    const { data: offer, error: offerErr } = await KU_SUPABASE
      .from("offers")
      .update({ status: "prihvacena" })
      .eq("id", offerId)
      .select()
      .single();
    if (offerErr || !offer) throw new Error(offerErr ? offerErr.message : "Ponuda nije pronađena.");

    await KU_SUPABASE
      .from("offers")
      .update({ status: "odbijena" })
      .eq("request_id", offer.request_id)
      .neq("id", offerId);

    await KU_SUPABASE
      .from("requests")
      .update({ status: "u_toku", izabrana_ponuda_id: offerId })
      .eq("id", offer.request_id);

    return _kuMapOffer(offer);
  },

  /* ---- Ocene ---- */
  async getRatings() {
    const { data, error } = await KU_SUPABASE.from("ratings").select("*");
    if (error) { console.error(error.message); return []; }
    return (data || []).map(_kuMapRating);
  },

  async getRatingsByIzvodjac(izvodjacId) {
    const { data, error } = await KU_SUPABASE
      .from("ratings")
      .select("*")
      .eq("izvodjac_id", izvodjacId)
      .order("created_at", { ascending: false });
    if (error) { console.error(error.message); return []; }
    return (data || []).map(_kuMapRating);
  },

  async hasRated(requestId) {
    const { data, error } = await KU_SUPABASE.from("ratings").select("id").eq("request_id", requestId).maybeSingle();
    if (error) return false;
    return !!data;
  },

  async addRating({ requestId, izvodjacId, klijentId, ocena, komentar }) {
    const row = {
      request_id: requestId,
      izvodjac_id: izvodjacId,
      klijent_id: klijentId,
      ocena: Number(ocena),
      komentar: (komentar || "").trim(),
    };
    const { data, error } = await KU_SUPABASE.from("ratings").insert(row).select().single();
    if (error) throw new Error(error.message);
    // Isto kao u staroj verziji: dodavanje ocene garantuje da je zahtev
    // označen kao završen (ako slučajno već nije).
    await KU_SUPABASE.from("requests").update({ status: "zavrsen" }).eq("id", requestId);
    return _kuMapRating(data);
  },

  /* ---- Izvedene statistike ---- */
  async providerStats(izvodjacId) {
    const ratings = await this.getRatingsByIzvodjac(izvodjacId);
    const count = ratings.length;
    const avg = count ? ratings.reduce((s, r) => s + r.ocena, 0) / count : 0;
    const { count: poslovi } = await KU_SUPABASE
      .from("offers")
      .select("id", { count: "exact", head: true })
      .eq("izvodjac_id", izvodjacId)
      .eq("status", "prihvacena");
    return { avg, count, poslovi: poslovi || 0 };
  },

  async getIzvodjaciByKategorija(kategorijaId) {
    const { data, error } = await KU_SUPABASE
      .from("profiles")
      .select("*")
      .eq("role", "izvodjac")
      .contains("kategorije", [kategorijaId]);
    if (error) { console.error(error.message); return []; }
    return (data || []).map(_kuMapProfile);
  },
};

window.KU = KU;
KU.ready = KU.store.init();

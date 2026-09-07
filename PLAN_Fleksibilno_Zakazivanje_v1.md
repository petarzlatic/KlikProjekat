# Tehnički plan — Fleksibilno zakazivanje + Hitne intervencije (v2)

> Ovaj fajl je tehnički plan za DVE povezane nove funkcije, isti princip
> kao `docs/Dopuna_Biznis_Plana_Mehanizam_Ponuda_v1.docx` za hibridni
> mehanizam cena — interni, tehnički dokument (ne za investitore), pravi
> se PRE kodiranja da razjasnimo tačno šta gradimo.
>
> Vezano za: `TASKOVI.md` i `STATUS.md`. Ovo je ODVOJENO od hibridnog
> mehanizma v2 (automatski obračun cene po cenovniku za REGULARNE
> zahteve) — sve tri funkcije diraju tabelu `offers`, ali rade nezavisno.
>
> v1 (6. septembar) je pokrivao samo fleksibilno zakazivanje i imao 4
> otvorena pitanja. v2 (7. septembar) dodaje odgovore na ta pitanja PLUS
> potpuno novu funkciju — hitne intervencije — koju je Petar opisao istog
> dana kao prirodni nastavak (razlog: "bez ograničenja" odgovor na
> pitanje o minimalnom roku je zapravo značio da sajtu treba i način da
> primi zahteve koji ne trpe odlaganje, van klasičnog kalendara).

Poslednje ažurirano: 7. septembar 2026.

---

## DEO 1 — Fleksibilno zakazivanje (regularni zahtevi)

### 1.1 Cilj

Kad klijent objavljuje REGULARAN zahtev (`novi-zahtev.html`), umesto
slobodnog teksta za termin, bira jedan od tri načina:

1. **Tačan datum** — kalendar/date picker, najranije **sutra** (ne može
   danas — današnji dan je rezervisan za hitne intervencije, deo 2).
2. **Fleksibilan period** — ±3, ±5 ili ±7 dana oko izabranog datuma
   (isti minimum — sutra).
3. **Fleksibilan mesec** — prost izbor meseca (npr. "oktobar 2026"), bez
   tačnog datuma. Ovo daje majstoru najviše slobode da se javi, pa
   klijentu donosi najviše ponuda.

Kad se majstor javi na zahtev, ako NE MOŽE u traženom periodu, može da
**predloži drugi datum** u svojoj ponudi — informativno, ne traži
posebnu potvrdu klijenta (vidi 1.2, pitanje 1).

### 1.2 Odgovori na otvorena pitanja (v1 → v2, odgovoreno 7. septembra)

1. **Predlog drugog datuma je informativan.** Klijent normalno bira i
   prihvata ponudu kao i do sad (dugme "Prihvati ponudu" ne traži ništa
   dodatno) — predloženi datum se samo jasno prikaže uz ponudu da
   klijent zna na šta pristaje.
2. **Minimalni rok za regularne zahteve: najmanje sutra** (ne danas).
   Razlog za ovu granicu: današnji dan je rezervisan za HITNE
   intervencije (deo 2) — tamo nema kalendara uopšte, ide se odmah.
3. **Fleksibilan mesec = prost izbor meseca**, `<input type="month">`,
   bez dodatne podele na delove meseca.
4. **Stari zahtevi ostaju kao i do sad**, bez posebne oznake — ovo je
   bila test faza, retroaktivno označavanje nema smisla. Kad platforma
   krene sa pravim korisnicima, ovo se po potrebi preispituje.

### 1.3 Šema baze — `requests` / `offers`

```sql
-- REQUESTS — tip i vrednost željenog termina (regularni zahtevi)
alter table requests add column if not exists tip_termina text
  check (tip_termina in ('tacan_datum', 'fleksibilan_period', 'fleksibilan_mesec'));
alter table requests add column if not exists datum_pocetka date;
  -- za tip_termina = 'tacan_datum' ILI 'fleksibilan_period' (centar perioda)
alter table requests add column if not exists fleksibilnost_dana int
  check (fleksibilnost_dana in (3, 5, 7));
  -- popunjeno SAMO kad je tip_termina = 'fleksibilan_period'
alter table requests add column if not exists zeljeni_mesec date;
  -- popunjeno SAMO kad je tip_termina = 'fleksibilan_mesec' (čuva se 1. u mesecu)

-- OFFERS — majstor može predložiti drugi datum (regularni tok)
alter table offers add column if not exists predlozeni_datum date;
```

Stare kolone (`zeljeni_termin`, `poruka`) ostaju netaknute radi
kompatibilnosti sa postojećim redovima.

### 1.4 UI izmene

- **`novi-zahtev.html`**: polje `#termin` (tekst) zamenjeno sa 3
  radio-kartice (isti vizuelni stil kao izbor uloge u
  `registracija.html` — `.radio-card`/`.radio-group`, ništa novo za
  smisliti): "Tačan datum" / "Fleksibilno (±dana)" / "Samo mesec".
  Datumska polja imaju `min` = sutrašnji datum (računa se u JS-u pri
  učitavanju stranice).
- **`zahtev.html`**: prikaz termina čita nova strukturirana polja
  (funkcija `kuFormatTermin(req)` u `common.js`, sa padom nazad na stari
  `zeljeniTermin` tekst za stare zahteve). `offerFormHtml()` dobija
  opciono polje "Ne mogu u traženom terminu — predlažem:" +
  `<input type="date">`. Kartica ponude kod klijenta prikazuje predlog
  ako postoji, jasno vizuelno odvojeno od traženog termina.

### 1.5 `store.js` izmene

- `createRequest(...)`: novi parametri `tipTermina`, `datumPocetka`,
  `fleksibilnostDana`, `zeljeniMesec`.
- `_kuMapRequest(row)`: mapira nove kolone.
- `createOffer(...)`: novi opcioni parametar `predlozeniDatum`.
- `_kuMapOffer(row)`: dodaje `predlozeniDatum`.

---

## DEO 2 — Hitne intervencije (nova funkcija, dogovoreno 7. septembra)

### 2.1 Cilj (Petarov opis, sažeto)

Pored regularnih zahteva (kalendar, dani/nedelje/meseci unapred), sajt
treba da podrži i **hitne intervencije** — kvarove koji moraju da se
reše u roku od par sati, ne mogu da čekaju "sutra" (npr. pukla cev).
Ovo je poseban tok, odvojen od klasičnog cenovnika po stavkama:

- Majstor naplaćuje **cenu izlaska na teren** (kao taksi "start
  vožnje") — fiksna cena koju majstor sam podesi jednom u svom profilu.
- Plus **cenu same popravke**, koju majstor daje kao okvirni raspon u
  ponudi (npr. "1500–2000 din" za zamenu pukle cevi) — tačna cena zavisi
  od onoga što se vidi na licu mesta.
- Ovaj model motiviše majstore da reaguju brzo — brži odziv na hitne
  pozive znači više posla i zarade.

### 2.2 Odluke (doneto 7. septembra, kroz razgovor)

1. **Kategorije koje mogu biti hitne (MVP): samo majstor-kategorije sa
   pravim kvarovima** — `vodoinstalater`, `elektricar`, `bravar`,
   `bela-tehnika`. Čišćenje (vertikala B) NE ulazi u hitni tok za sada —
   dodaje se kasnije, ako uopšte, kad se smisli poseban model naplate za
   njega (nema "popravke" kod čišćenja). Ovo je NEZAVISNO od
   `KU_CONFIG.AKTIVNE_KATEGORIJE` (koje kontrolišu koje kategorije su
   otvorene za REGULARNE zahteve) — hitne intervencije su nova, posebna
   grana, nova lista `KU_CONFIG.HITNE_KATEGORIJE`.
2. **Cena izlaska je fiksna, podešava je majstor jednom u svom profilu**
   (`moj-profil.html`) — polje "Cena izlaska za hitne intervencije"
   (RSD), vidljivo samo ako majstor ima izabranu bar jednu hitnu
   kategoriju. Ta vrednost se automatski upiše u svaku hitnu ponudu koju
   pošalje (majstor je vidi i teoretski mogao izmeniti po potrebi, ali
   za MVP ide direktno iz profila, bez ručnog unosa pri svakoj ponudi —
   jednostavnije, i ponaša se dosledno kao "cenovnik izlaska").
3. **Cena popravke je opseg** (npr. "1500–2000 din"), majstor ga upisuje
   u samoj ponudi — dva broja (od/do).
4. **Klijent prijavljuje hitnu intervenciju kroz poseban, jednostavniji
   formular** — nova stranica `hitna-intervencija.html`, jasno vizuelno
   odvojena (crveni akcenat, istaknuto dugme na početnoj) od običnog
   "Objavi zahtev". Samo: kategorija (ograničeno na hitne kategorije),
   opis problema, lokacija — BEZ biranja termina (hitno = odmah).

### 2.3 Šema baze

```sql
-- REQUESTS — da li je zahtev hitna intervencija
alter table requests add column if not exists hitno boolean not null default false;

-- OFFERS — cena za hitne intervencije
alter table offers add column if not exists cena_izlaska numeric(10,2);
alter table offers add column if not exists cena_popravke_od numeric(10,2);
alter table offers add column if not exists cena_popravke_do numeric(10,2);

-- PROFILES — podrazumevana cena izlaska majstora (hitne intervencije)
alter table profiles add column if not exists cena_izlaska_hitno numeric(10,2);
```

### 2.4 UI / tok

- **`web/js/config.js`**: nova lista `HITNE_KATEGORIJE` = `vodoinstalater,
  elektricar, bravar, bela-tehnika` + helper `kuKategorijaHitnaDostupna(id)`.
- **`index.html`**: istaknut crveni CTA "🚨 Hitna intervencija" u hero
  sekciji (odvojeno od dve postojeće kartice majstor/čišćenje) — sajt već
  pominje "hitne intervencije" u opisu kategorija, ovo im konačno daje
  pravu funkciju.
- **`common.js` (header)**: link ka `hitna-intervencija.html` u navigaciji
  za prijavljenog klijenta.
- **Nova stranica `hitna-intervencija.html`**: kategorija (dropdown,
  samo `HITNE_KATEGORIJE`), opis, lokacija. Kratko objašnjenje modela
  naplate (izlazak + popravka) iznad dugmeta. Zahtev se šalje sa
  `hitno: true`, bez termin polja. Zahteva prijavu kao klijent (isto kao
  `novi-zahtev.html`).
- **`zahtev.html`**:
  - Prikaz zahteva: ako je `req.hitno`, umesto termina prikazuje se
    istaknut crveni bedž "🔴 Hitna intervencija" i kratko objašnjenje
    naplate.
  - `offerFormHtml()` grana se na dve verzije: za hitan zahtev prikazuje
    "Cena izlaska" (predpopunjeno iz profila majstora, broj), "Cena
    popravke od/do" (dva broja) i opcionu napomenu; za regularan zahtev
    ostaje postojeća poruka + opcioni predloženi datum (deo 1.4).
  - Kartica ponude kod klijenta (`offerCardForClient`) za hitne ponude
    prikazuje cenu izlaska i raspon popravke istaknuto (ne samo tekst
    poruke).
- **`panel-izvodjac.html`**: u tabu "Dostupni zahtevi", hitni zahtevi
  (ako ih ima u majstorovim kategorijama) prikazuju se u posebnoj
  sekciji na vrhu, vizuelno istaknuti (crveni akcenat/bedž "🔴 HITNO"),
  iznad regularnih zahteva.
- **`moj-profil.html`**: novo polje "Cena izlaska za hitne intervencije
  (RSD)", vidljivo samo kad je bar jedna od `HITNE_KATEGORIJE` čekirana
  u listi kategorija majstora (dinamički prikaz/sakrivanje na promenu
  čekboksova).

### 2.5 `store.js` izmene

- `createRequest(...)`: novi parametar `hitno` (boolean, default false).
- `_kuMapRequest(row)`: dodaje `hitno: !!row.hitno`.
- `createOffer(...)`: novi opcioni parametri `cenaIzlaska`,
  `cenaPopravkeOd`, `cenaPopravkeDo`.
- `_kuMapOffer(row)`: dodaje sve tri.
- `_kuMapProfile(row)`: dodaje `cenaIzlaskaHitno: row.cena_izlaska_hitno`.
- `updateUser(id, patch)`: dodaje mapiranje `cenaIzlaskaHitno` →
  `cena_izlaska_hitno`.

---

## Redosled gradnje (oba dela zajedno, jedan build)

1. Petar pokreće `alter table` SQL (delovi 1.3 + 2.3) u Supabase SQL
   Editoru.
2. Izmena `config.js` (HITNE_KATEGORIJE + helper).
3. Izmena `store.js` (sve mapiranje + `createRequest`/`createOffer`/
   `updateUser`).
4. Izmena `common.js` (`kuFormatTermin` helper, header link ka hitnoj
   intervenciji).
5. Izmena `novi-zahtev.html` (3-way selektor termina, min = sutra).
6. Nova stranica `hitna-intervencija.html`.
7. Izmena `zahtev.html` (prikaz termina/hitno bedž, grananje forme za
   ponudu, prikaz cena u kartici ponude).
8. Izmena `panel-izvodjac.html` (odvojena hitna sekcija).
9. Izmena `moj-profil.html` (cena izlaska, dinamički prikaz).
10. Izmena `index.html` (CTA za hitnu intervenciju).
11. Sintaksna provera (`node --check` + inline skripte) i vizuelna
    provera (statička HTML reprodukcija + Playwright snimci ključnih
    ekrana).
12. Petar upload na GitHub, live test oba toka (regularan zahtev sa
    fleksibilnim periodom + hitna intervencija sa ponudom).
13. Ažuriranje `TASKOVI.md`/`STATUS.md`.

Sva 4 pitanja iz v1 i sve odluke oko hitnih intervencija su odgovorene —
plan je spreman za kodiranje.

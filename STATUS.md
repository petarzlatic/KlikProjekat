# STATUS — Klik usluga

> Ovaj fajl je "dnevnik projekta". Ažurira se na kraju svake radne sesije sa
> Claude-om, tako da svaka nova sesija (koja inače ne pamti prethodne
> razgovore) može da pročita ovaj fajl i odmah zna tačno gde je stalo.
>
> **Kad kreneš novu sesiju sa Claude-om o ovom projektu, samo reci:
> "Nastavljamo Klik uslugu, pogledaj STATUS.md u folderu" — i podeli/potvrdi
> pristup ovom folderu.**

Poslednje ažurirano: 15. avgust 2026.

---

## Gde smo trenutno

Faza: **prelazak iz Faze 0 (validacija) u Fazu 1 (MVP)** — po dogovoru,
preskočili smo/radimo paralelno sa ručnom validacijom i krenuli pravo na
izradu MVP-a, jer je cilj brzo dobiti demo za investitore i/ili konkurs za
državna sredstva.

Izrađen je **funkcionalan prototip web platforme** (Faza 1 iz biznis plana):
registracija/prijava, objava zahteva, pregled i javljanje na zahteve,
prihvatanje ponude i otključavanje kontakta, označavanje posla kao završenog,
ocenjivanje izvođača, javna pretraga izvođača po kategoriji. Bez sistema
plaćanja — u skladu sa planom.

## Tehnička odluka (važno za sledeće sesije)

Cloud sandbox okruženje u kom Claude radi **nema pristup internetu za
instalaciju paketa** (npm/pip registry blokiran), pa Next.js/React/Supabase
build alati nisu mogli da se instaliraju. Zbog toga je MVP napravljen kao:

- **Čist HTML/CSS/JavaScript, bez build koraka** — nijedan `npm install`
  nije potreban da bi sajt radio. Otvara se direktno u browseru ili se hostuje
  na bilo kom besplatnom static hosting servisu (Netlify, Vercel, GitHub
  Pages...).
- **Podaci se trenutno čuvaju u browseru korisnika (localStorage)** — dobro
  za demo i testiranje toka, ali **ne za prave višekorisničke podatke**
  (svaki browser ima svoju kopiju). Ovo je namerno privremeno rešenje.
- Sav pristup podacima ide kroz jedan fajl: `web/js/store.js` (funkcije kao
  `createRequest`, `createOffer`, `acceptOffer`, `addRating`...). Kad budemo
  spremni za pravu bazu (preporuka: **Supabase** — besplatan tier, Postgres
  baza + autentikacija), menja se SAMO unutrašnjost tih funkcija — nijedna
  HTML stranica se ne dira. Ovo je urađeno namerno da bi taj korak bio brz.

## Šta je urađeno (MVP v1)

Stranice u `web/`:

- `index.html` — landing/marketing stranica (problem, rešenje, katalog, CTA)
- `kako-radi.html` — detaljno objašnjenje + katalog usluga + konkurencija + veličina tržišta
- `registracija.html` — registracija (izbor uloge: klijent / izvođač)
- `prijava.html` — prijava (+ demo nalozi za brzo testiranje)
- `panel-klijent.html` — pregled mojih objavljenih zahteva
- `novi-zahtev.html` — forma za objavu novog zahteva
- `panel-izvodjac.html` — pregled dostupnih zahteva (sa filterima) + moje ponude
- `zahtev.html` — detalji zahteva: ponude, prihvatanje, otključavanje kontakta, označavanje završetka, ocenjivanje
- `profil.html` — javni profil izvođača (ocene, kategorije, istorija)
- `pretraga.html` — javna pretraga/pregled izvođača po kategoriji
- `moj-profil.html` — uređivanje sopstvenog profila

Katalog kategorija i koje su trenutno "otvorene" za objavu zahteva definisani
su na jednom mestu: `web/js/config.js` (lako se menja kad se iz Faze 0
sazna šta je stvarno najtraženije).

Sajt je testiran (Playwright, automatski test kompletnog toka: registracija →
objava zahteva → javljanje izvođača → prihvatanje ponude → otključavanje
kontakta → završetak → ocena → provera profila) — bez grešaka, radi i na
mobilnim dimenzijama ekrana.

Demo podaci (par izmišljenih izvođača, klijenata i završenih poslova) su
uključeni da sajt ne izgleda prazno kad se pokaže nekome — vidljivi su odmah,
sa bannerom na vrhu koji to jasno naznačava i dugmetom za reset.

## Šta NIJE urađeno / sledeći koraci

1. **Deploy na pravi link — u toku.** Dogovoreno: GitHub (čuvanje koda) +
   Render (besplatan static site hosting). Napisano je uputstvo korak-po-korak
   bez potrebe za komandnom linijom: `UPUTSTVO_DEPLOY.md` u ovom folderu.
   Petar treba da: (1) napravi GitHub nalog i repozitorijum `klik-usluga`,
   (2) prevuče fajlove iz `KlikProjekat` foldera kroz GitHub web upload,
   (3) napravi Render nalog i poveže ga sa tim repozitorijumom (Publish
   directory: `web`). Kad se to uradi, sajt dobija pravi javni link.
2. **Prava baza podataka (Supabase)** — da podaci ne zavise od jednog
   browsera, nego da klijenti i izvođači iz različitih uređaja vide iste
   podatke. Potrebno: besplatan Supabase nalog (par klikova, bez kartice),
   pa zamena unutrašnjosti `store.js` da poziva Supabase umesto localStorage.
3. **Faza 0 validacija** — biznis plan preporučuje ručnu validaciju (Google
   forma, Instagram, WhatsApp, 10-15 ručno posredovanih poslova) pre/paralelno
   sa MVP-om, da se potvrdi da postoji tražnja i sazna koje su stvarno
   najtraženije kategorije. Ovo još nije pokrenuto.
4. **Registracija pravnog lica i osnivački ugovor** (odeljak 10 biznis plana)
   — pravni koraci, nezavisno od koda.
5. **Sitnija poboljšanja MVP-a**: potvrda emaila, jača validacija forme,
   notifikacije (email/SMS) kada stigne ponuda, mogućnost slanja slika uz
   zahtev, filter po lokaciji za klijenta koji pretražuje izvođače.

## Odluke koje smo doneli

- **Vizuelni dizajn (boje, raspored, ton)** je Claude-ov samostalan predlog
  na osnovu sadržaja biznis plana — nije prethodno dogovaran sa Petrom.
  Petar treba da pregleda sajt i javi šta bi menjao (boje, logo, tekst,
  raspored) — ovo je otvorena stavka, čeka njegov feedback.
- **Deploy put:** GitHub (arhiva koda) + Render (hosting), umesto bržeg ali
  manje trajnog Netlify Drop-a — izabrano jer Petar želi trajniji setup s
  obzirom da će uskoro dodavati i pravu bazu podataka.
- **Nema iskustva sa kodom** kod Petra → Claude piše sav kod, objašnjava
  jednostavno, bira alate sa što manje ručnog održavanja.
- **Prvo web, mobilna aplikacija kasnije** — sajt radi dobro i na mobilnom
  telefonu (responsive dizajn), prava native aplikacija dolazi kad bude
  bilo korisnika i budžeta.
- **Bez postojećih naloga** (domen, hosting, GitHub) na startu — sve se
  bira i podešava iz nule.
- Projekat se čuva u folderu **`C:\Users\pzlat\KlikProjekat`** na Petrovom
  računaru (povezano preko Claude desktop aplikacije), tako da fajlovi
  trajno ostaju dostupni između sesija.

## Kako nastaviti u sledećoj sesiji

Reci Claude-u nešto poput: *"Nastavljamo rad na Klik usluzi, pročitaj
STATUS.md u folderu KlikProjekat i predloži sledeći korak."* Claude će
pročitati ovaj fajl, biznis plan (`docs/`) i kod (`web/`), i nastaviti
tačno odatle gde smo stali.

Predlog sledeće sesije: **povezivanje prave baze (Supabase)** ili
**postavljanje sajta na besplatan hosting da dobije pravi link** — koje god
od ova dva želiš prvo.

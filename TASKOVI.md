# TASKOVI — Usklik.rs

> Ovo je radna tabla zadataka — dopunjuje `STATUS.md` (koji je "istorija i
> veliki kontekst") sa konkretnim, malim koracima za svaki dan. Ideja:
> svako jutro pogledaš sekciju **"Danas"**, svako veče je ažuriraš —
> šta je urađeno ide u "Urađeno", šta nije ostaje/prelazi u sutrašnji dan.
>
> Metodologija koja stoji iza redosleda zadataka: Customer Development
> (Steve Blank / Bob Dorf, "Priručnik za startapere") — ne gradimo
> unapred na pretpostavkama, svaki blok zadataka vodi ka stvarnom testu
> sa pravim korišćenjem, ne ka gomilanju funkcija.

Poslednje ažurirano: 3. septembar 2026. (dopunjeno istog dana — Dan 2 završen)

---

## 🎯 Trenutni cilj (sve dok se ne postigne, ostali zadaci čekaju)

**✅ POSTIGNUTO (7. septembar): Fleksibilno zakazivanje + hitne
intervencije — ISKODIRANO, čeka SQL + upload.** Petar je odgovorio na
svih 4 pitanja iz plana, pa je u istom razgovoru opisao i potpuno novu
funkciju — hitne intervencije (kvarovi koji ne trpe odlaganje, poseban
model naplate izlazak+popravka) — koja je odmah ugrađena u isti plan i
kod. Detalji u dnevniku ispod ("07.09"), pun tehnički opis u
`PLAN_Fleksibilno_Zakazivanje_v1.md` (v2). **Da bi ovo proradilo na
živom sajtu, potrebno je da Petar:**
1. Pokrene SQL iz `db/schema.sql` (ceo fajl se može pokrenuti ponovo od
   početka, ili samo novi `alter table` blokovi na dnu — vidi
   napomene u fajlu) u Supabase SQL Editoru.
2. Upload-uje na GitHub sve izmenjene/nove fajlove — tačan spisak je u
   dnevniku ispod ("07.09").
3. Live test: objaviti jedan REGULARAN zahtev (isprobati sva tri tipa
   termina) i jednu HITNU intervenciju (drugi nalog kao majstor šalje
   ponudu sa cenom izlaska+popravke), proveriti da se sve ispravno
   prikazuje.

**✅ POSTIGNUTO (4. septembar): Live test sa dva naloga na pravoj bazi
podataka.** Petar se ulogovao kao izvođač, žena kao klijent, poslat
zahtev i razmenjena ponuda — sve preko prave Supabase baze. Sajt je
zvanično potvrđen kao funkcionalan sa pravim korisnicima.

**✅ POSTIGNUTO (4. septembar): Vizuelni redizajn početne strane — pravac
odobren.** Kroz nekoliko rundi mockup-a (Claude Design kanvas) odlučeno:
hladnija plava paleta umesto zeleno-bele, početna strana odmah deli
posetioca na dva velika klikabilna polja ("Treba ti majstor" /
"Održavanje i čistoća"), registracija izvođača postaje sitna sekundarna
stavka. Ikonice na kraju usaglašene: ukršteni alat u boji (čekić+ključ,
kofa+metla), naše brend boje, veliki i jednostavni oblici da se
prepoznaju i izdaleka. Odobrena verzija je zavedena u radne mockup fajlove
— sledeći korak je prenošenje u pravi kod sajta (vidi novi zadatak ispod).

**✅ POSTIGNUTO (4. septembar): Vizuelni redizajn prenet u pravi kod i
potvrđen na živom sajtu.** Nova plava paleta, novi raspored početne
strane (dve velike kartice) i nova stranica za pregled potkategorija su
uploadovani na GitHub i live na klikprojekat.onrender.com. Usput
otkriveno i ispravljeno: `web/css/style.css` prvi put nije stigao na
GitHub (verovatno upload van `css` foldera), pa je sajt kratko izgledao
neizmenjeno — Petar ponovo uploadovao taj jedan fajl u pravi folder,
provereno da je sad ispravno (nova plava boja + `.hero-card` stilovi
potvrđeni direktno u živom CSS fajlu).

**✅ POSTIGNUTO (6. septembar): Preimenovanje platforme, DRUGI put, u
"Usklik.rs".** Prvo je "SveNaKlik.rs" ispao nedostupan (zauzet), pa se
prešlo na "UslugeNaKlik.rs" — ali se onda ispostavilo da već postoji
aktivan istoimeni sajt **uslugenaklik.com** (ista namena, realan rizik
zabune). Zato je odlučeno TREĆE ime: **Usklik.rs** (skraćenica od "usluge
na klik", i sama po sebi prava srpska reč). Preimenovanje sprovedeno kroz
ceo projekat, PRE kupovine domena i deploy-a — vidi dnevnik ispod za
spisak fajlova. Petar kupuje domen usklik.rs (par dana da bude zvanično
aktivan); dok traje, sajt na klikprojekat.onrender.com radi dalje
nepromenjeno, kod je samo unapred pripremljen za novo ime.

**Stanje na kraju dana, 6. septembar — šta je gotovo, šta čeka:**
1. **Vizuelne izmene + lakši izbor usluge/datuma** — DELIMIČNO gotovo:
   - [x] Tehnički plan za fleksibilno zakazivanje termina napravljen
     (`PLAN_Fleksibilno_Zakazivanje_v1.md`) — čeka Petrove odgovore na 4
     otvorena pitanja pre nego što se počne kodiranje (vidi taj fajl).
   - [x] Pravi logo ubačen (favicon, header, footer sajta, naslovnice
     dokumenata) — vidi dnevnik ispod, "06.09 (logo)".
   - [ ] Konkretna lista OSTALIH "vizuelnih stvari" koje Petar želi i dalje
     NIJE precizirana — treba pitati na početku sledeće sesije.
2. **Kupovina domena usklik.rs** — U TOKU (Petar kupuje kod RNIDS
   akreditovanog registratora, par dana da bude zvanično aktivan). Dok
   traje, sajt na klikprojekat.onrender.com radi dalje nepromenjeno. Kad
   Petar javi da je domen aktivan: (a) Petar upload-uje sve izmenjene
   fajlove sa NOVIM nazivom Usklik.rs na GitHub — vidi tačan spisak u
   poslednjoj poruci Claude-a tog dana — uključujući NOVI folder
   `web/img/` (4 slike logoa, ranije nisu postojale); (b) povežemo domen
   na Render (DNS podešavanja, savet već dat u STATUS.md).
3. **Održavanje i bezbednost sajta nakon kupovine domena** — email
   hosting, backup baze, uptime monitoring, napomena o ZZPL — savet već
   dat, vidi STATUS.md, nema akcije dok domen ne bude aktivan.

**Ažurirano isto veče (6.09):** Petar je upload-ovao sve fajlove na
GitHub — preimenovanje u Usklik.rs i novi logo su POTVRĐENO live na
klikprojekat.onrender.com. (Domen usklik.rs se i dalje kupuje odvojeno,
nezavisno od ovog upload-a — kad bude aktivan, ide se na DNS povezivanje
sa Render-om, to još nije urađeno.)

**07.09 — sva 4 pitanja odgovorena, PLUS nova funkcija (hitne
intervencije) dogovorena i iskodirana istog dana.** Vidi dnevnik ispod
za pun spisak fajlova i "Trenutni cilj" gore za tačne sledeće korake
(SQL + GitHub upload + live test).

**Sledeća sesija počinje sa:** (a) proverom da li je Petar pokrenuo SQL
i uploadovao fajlove, pa live test oba toka (regularan zahtev + hitna
intervencija), (b) pitanjem Petru za listu preostalih vizuelnih izmena
(i dalje nije poslata), (c) proverom da li je domen usklik.rs u
međuvremenu aktiviran.

Dok se ove tri stavke ne razjasne/završe, tehnički plan za hibridni
mehanizam v2 (automatski obračun cene, broadcast ponuda) ostaje pauziran
— nije zaboravljen, samo nije prioritet trenutno. Ručni unos pravih
majstora i cena je takođe svesno odložen — Petar unosi te podatke tek kad
sajt bude potpuno spreman za korišćenje.

---

## 📋 Plan po danima (radi se redom, jedan blok = otprilike jedan dan)

### Dan 1 — Supabase nalog i šema baze
- [x] **(Claude)** Pripremljena SQL skripta za tabele (`db/schema.sql`) i uputstvo korak-po-korak (`UPUTSTVO_SUPABASE.md`).
- [x] **(Petar)** Napravljen besplatan nalog na supabase.com i projekat "SveNaKlik.rs" (region Ireland).
- [x] **(Petar)** Pokrenuta finalna verzija `db/schema.sql` (sa 64 stavke usluga) u SQL Editoru.
- [x] **(Petar)** Kopirati Project URL i anon public key, poslati Claude-u u chat (`UPUTSTVO_SUPABASE.md`, deo 3).

**Arhitekturska odluka (17. avgust):** koristimo ugrađeni **Supabase Auth**
za prijavu/registraciju (bezbedno, lozinke se ne čuvaju ručno u tabeli kao
u localStorage verziji), plus tabelu `profiles` za ostale podatke (ime,
uloga, telefon, kategorije). Ručni unos pravih majstora ide direktno kroz
Supabase "Table Editor" (izgleda kao Excel) — ne treba dodatni ekran na
sajtu za to.

**Proširenje šeme (3. septembar):** na osnovu Petrovog konkretnog primera
(izvođač Petar Petrović — krečenje, farbanje, vodoinstalacije,
elektroinstalacije, sa cenovnikom po stavci) dodate su u `db/schema.sql`
dve nove tabele: `usluge` (zajednički spisak stavki koje se cenovnički
mogu ponuditi, npr. "Krečenje zidova — po m²" — isti spisak za sve
izvođače) i `cenovnik` (cena SVAKOG izvođača za stavke koje on nudi).
Dogovoreno: izvođač bira iz zajedničkog spiska, ne piše slobodno, jer je
to neophodno za kasniji automatski obračun cene (v2 mehanizam). Dodata i
dva polja u `profiles`: `godina_rodjenja`, `godine_iskustva`. Šema je
testirana lokalno (dva uzastopna pokretanja, bez greške, bez duplikata)
pre slanja Petru. Ovo je samo STRUKTURA baze — sam mehanizam automatskog
obračuna/broadcast ponuda (v2) i dalje gradimo POSLE live testa, po
ranijem dogovoru (vidi STATUS.md).

### Dan 2 — Povezivanje sajta sa bazom ✅ ZAVRŠENO (3. septembar)
- [x] **(Claude)** Prepravljen `web/js/store.js` da umesto localStorage poziva Supabase. Dodata Supabase konekcija u `config.js` (`sb_publishable_...` ključ). Sve HTML stranice dopunjene da "sačekaju" (`await`) odgovor baze svuda gde je ranije bilo trenutno (localStorage) — izgled i tok stranica nisu menjani. Uklonjeni izmišljeni demo nalozi i dugme za reset (nebezbedno sa pravom deljenom bazom). Sintaksna provera svih fajlova prošla bez greške (stvaran test protiv žive baze nije bio moguć iz sandboxa — na redu je u Danu 3/4).

### Dan 3 — Ponovni deploy sa pravom bazom ✅ ZAVRŠENO (4. septembar)
- [x] **(Petar)** U Supabase-u isključeno "Confirm email".
- [x] **(Petar)** Uploadovane sve izmene na GitHub (Dan 2 + ispravka naziva) — sajt live, radi.
- [x] **(Automatski)** Render redeploy — potvrđeno, radi.
- [x] **(Zajedno)** Provera na živom linku: registracija i prijava rade ispravno sa pravom bazom.

### Dan 4 — Live test sa dva naloga ✅ ZAVRŠENO (4. septembar)
- [x] **(Petar)** Registrovao sebe kao izvođača, ženu kao klijenta — pravi nalozi na pravoj bazi.
- [x] **(Petar)** Zahtev poslat, ponuda poslata/primljena — potvrđeno da radi.
- [ ] **(Zajedno)** Napomena: nije eksplicitno potvrđeno da li je testirano i "prihvatanje ponude otključava kontakt" i ocenjivanje na kraju — sitnica za proveru kad bude zgodno, nije blokirajuće.

### Dan 5 — Proširenje kataloga i sitne ispravke
- [ ] **(Claude)** Otvoriti SVE kategorije usluga za objavu zahteva (trenutno su otvorene samo 4 — `config.js`, lako se menja).
- [ ] **(Petar)** Odlučiti da li već sada želi da unese prave majstore sa kojima je pričao (Faza 0 kontakti) direktno u bazu, ili čekamo da se sami registruju.

### Dan 6+ — Hibridni mehanizam ponude/tražnje (v2) ⬅ **u planiranju, pauzirano**
Vidi odluku od 4. septembra u `STATUS.md` i `Dopuna_Biznis_Plana_Mehanizam_Ponuda_v1.docx`.
Konkretan tehnički plan (koraci gradnje) se pravi kad ova stavka ponovo
postane prioritet — ovo je najveća funkcionalna nadogradnja do sad, radi
se pažljivo u manjim koracima, ne odjednom.

### Novi blok — Fleksibilno zakazivanje termina (dogovoreno 6. septembra, još nije napravljen tehnički plan)
Petar želi da klijent pri objavi zahteva bira ROK početka radova na tri
načina, plus da majstor može da ponudi alternativu:
- [ ] Opcija **tačan datum** (kalendar).
- [ ] Opcija **fleksibilan period**: ±3, ±5 ili ±7 dana od izabranog datuma.
- [ ] Opcija **fleksibilan mesec**: samo mesec kad klijent želi da radovi počnu.
- [ ] **Nova poslovna logika:** ako se majstor javi na ponudu ali ne može u
      traženom periodu, treba da može da odgovori predlažući DRUGI datum/rok
      — tako klijent i van svog željenog perioda vidi koji majstori su mu
      dostupni i kada.
- [ ] Ovo zahteva izmenu šeme baze: tabela `requests` trenutno ima samo
      slobodan tekst `zeljeni_termin`, treba strukturirano polje
      (tačan datum / opseg / mesec); tabela `offers` trenutno ima samo
      `poruka` (slobodan tekst), treba polje za predloženi datum majstora.
- [x] Tehnički plan napravljen: `PLAN_Fleksibilno_Zakazivanje_v1.md`
      (šema baze, izmene UI-ja, redosled gradnje, 4 otvorena pitanja za
      Petra pre nego što se počne kodiranje).

### Vizuelni redizajn — prenos u kod ✅ POTPUNO ZAVRŠENO, potvrđeno na živom sajtu (4. septembar)
Mockup je odobren i preveden u pravi `web/` kod:
- [x] Nova plava paleta (`--color-primary #0A1A4D`, `--color-primary-light
      #2F6FED`, `--color-accent #C44F1C`) u `web/css/style.css` — pošto je
      sav sajt građen preko CSS promenljivih, boja se automatski promenila
      na svih 11 stranica (dugmad, bedževi, kartice, footer...), ne samo
      na početnoj. Favicon takođe ažuriran (bio je hardkodovan u staroj
      boji na svakoj stranici).
- [x] `web/index.html` hero prepravljen: dve velike klikabilne kartice
      ("Treba ti majstor" / "Održavanje i čistoća") sa odobrenim
      ikonicama, registracija izvođača je sitna sekundarna stavka ispod
      kartica.
- [x] Napravljene dve nove stranice za pregled potkategorija:
      `web/potkategorije-majstor.html` i `web/potkategorije-ciscenje.html`
      — prikazuju SVE kategorije iz kataloga (ne samo aktivne), aktivne su
      klikabilne, neaktivne imaju bedž "Uskoro" (isti princip kao ostatak
      sajta — vidi `KU_CONFIG.AKTIVNE_KATEGORIJE` u `config.js`).
- [x] Klik na aktivnu potkategoriju vodi na `novi-zahtev.html?kategorija=ID`
      koji sada prepoznaje taj parametar i unapred bira kategoriju u
      dropdown-u (manja izmena i u `common.js`: stranica za prijavu sad
      pamti i te parametre ako korisnik nije ulogovan pa mora prvo da se
      prijavi).
- [x] Sintaksna provera svih izmenjenih/novih fajlova (JS + inline skripte)
      prošla bez greške; vizuelna provera urađena lokalno (Playwright
      snimci ekrana — desktop, mobilni, obe nove stranice).
- [x] **Petar** uploadovao sve fajlove na GitHub. Prvi pokušaj je
      propustio `web/css/style.css` (upload van `css` foldera), pa je sajt
      kratko izgledao neizmenjeno bez boja/stilova kartica — ispravljeno
      ponovnim uploadom tog fajla u pravi folder. Provereno direktno u
      živom CSS fajlu: nova paleta i `.hero-card` stilovi su na mestu.
      **Vizuelni redizajn je zvanično gotov i live.**

---

## 🌤️ Jutarnji / večernji šablon

Na početku sesije ("jutarnji plan"), Claude:
1. Čita ovaj fajl + `STATUS.md`.
2. Kaže: "Danas radimo: [sledeći neurađeni blok iz plana]."
3. Ako nešto sa juče nije završeno, prvo se to završava.

Na kraju sesije ("večernji pregled"), Claude:
1. Čekira [x] šta je urađeno danas.
2. Upisuje ispod novu sekciju **"Napomene"** ako se nešto neplanirano desilo.
3. Kaže glasno: "Sutra nas čeka: [sledeći blok]."

## 📝 Dnevnik (dopunjuje se svaki dan, najnovije na vrhu)

- **07.09 — Fleksibilno zakazivanje + hitne intervencije, iskodirano.**
  Sesija je počela odgovorima na 4 otvorena pitanja iz
  `PLAN_Fleksibilno_Zakazivanje_v1.md` (v1). Odgovor na pitanje o
  minimalnom roku ("bez ograničenja, treba da radi i za hitne
  intervencije") otvorio je razgovor o potpuno novoj funkciji — Petar je
  opisao ceo model: majstori vide REGULARNE zahteve (rok od par dana do
  par meseci) ODVOJENO od HITNIH intervencija (kvar koji mora da se reši
  za par sati), a hitne se naplaćuju drugačije od klasičnog cenovnika:
  cena izlaska na teren (fiksna, kao taksi "start") + cena same
  popravke (okvirna procena, jer se tačno stanje vidi tek na licu
  mesta). Kroz par rundi pitanja dogovoreno: hitne intervencije važe
  samo za prave kvarove (vodoinstalater, električar, bravar, bela
  tehnika — NE čišćenje, bar za sada), cenu izlaska majstor podešava
  JEDNOM u svom profilu (ne unosi je iznova svaki put), cena popravke
  ide kao raspon (od-do) u samoj ponudi, klijent prijavljuje hitnu
  intervenciju kroz poseban, jednostavniji formular (bez biranja
  termina). Sve je odmah upisano u `PLAN_Fleksibilno_Zakazivanje_v1.md`
  (v2, prošireno) i iskodirano isti dan:
  - **`db/schema.sql`** — nove kolone: `requests.tip_termina`,
    `datum_pocetka`, `fleksibilnost_dana`, `zeljeni_mesec`, `hitno`;
    `offers.predlozeni_datum`, `cena_izlaska`, `cena_popravke_od`,
    `cena_popravke_do`; `profiles.cena_izlaska_hitno`. **Petar treba da
    pokrene ovaj SQL u Supabase SQL Editoru** — ništa se ne briše,
    samo se dodaju nove kolone.
  - **`web/js/config.js`** — nova lista `HITNE_KATEGORIJE`
    (vodoinstalater, električar, bravar, bela tehnika) + helper
    `kuKategorijaHitnaDostupna(id)`.
  - **`web/js/store.js`** — `createRequest`/`createOffer`/`updateUser`
    prošireni novim poljima, `_kuMapRequest`/`_kuMapOffer`/
    `_kuMapProfile` mapiraju nove kolone.
  - **`web/js/common.js`** — novi helperi `kuFormatTermin(req)` (čitljiv
    prikaz termina iz strukturiranih polja, sa padom nazad na stari
    tekst) i `kuSutra()` (sutrašnji datum za `min` na date input); u
    header navigaciji dodat istaknut link "🚨 Hitna intervencija" za
    prijavljenog klijenta.
  - **`web/novi-zahtev.html`** — polje za termin zamenjeno sa 3
    radio-kartice (tačan datum / fleksibilan period ±3-5-7 dana / samo
    mesec), minimalni datum = sutra.
  - **`web/hitna-intervencija.html`** (NOVA stranica) — pojednostavljen
    formular za prijavu hitnog kvara: kategorija (samo hitne), opis,
    lokacija, bez termina; objašnjenje modela naplate iznad dugmeta.
  - **`web/zahtev.html`** — prikaz termina sad koristi
    `kuFormatTermin()`; hitni zahtevi dobijaju crveni bedž i objašnjenje
    naplate; forma za ponudu se grana — hitni zahtevi traže cenu
    izlaska (predpopunjena iz profila) + raspon cene popravke,
    regularni zahtevi dobijaju novo opciono polje "predloži drugi
    datum"; kartica ponude kod klijenta prikazuje cene i/ili predloženi
    datum.
  - **`web/panel-izvodjac.html`** — u tabu "Dostupni zahtevi", hitne
    intervencije se prikazuju u posebnoj, vizuelno istaknutoj sekciji na
    vrhu (crveni akcenat, bedž "🚨 HITNO"), regularni zahtevi ispod;
    "Moje ponude" prikazuje cenu izlaska/popravke za hitne ponude.
  - **`web/moj-profil.html`** — novo polje "Cena izlaska za hitne
    intervencije", vidljivo samo ako majstor ima čekiranu bar jednu
    hitnu kategoriju (dinamički prikaz na promenu čekboksova).
  - **`web/index.html`** — istaknut crveni CTA baner "🚨 Hitan kvar? Ne
    čekaj." u hero sekciji, vodi na `hitna-intervencija.html` (sajt je
    već pominjao "hitne intervencije" u opisu kategorija — sad to
    konačno ima pravu funkciju iza sebe).
  - **`web/css/style.css`** — nove klase `.navlink-hitno`, `.badge-hitno`,
    `.hero-urgent` (crveni akcenat baner u hero sekciji na tamnoj
    pozadini).
  Sve sintaksno provereno (`node --check` na svim .js fajlovima i
  izvučenim inline skriptama iz svih izmenjenih .html fajlova — sve
  prošlo), i vizuelno provereno (statička HTML reprodukcija stvarnog
  markupa + CSS-a, Playwright snimci: hero baner, sva tri stanja
  selektora termina — toggle logika testirana klikom, ne samo
  vizuelno —, forma za hitnu intervenciju, forma za hitnu ponudu i
  kartica ponude sa cenama, kartica hitnog zahteva u panelu izvođača —
  sve izgleda dosledno sa ostatkom sajta). **Nije još uploadovano na
  GitHub niti pokrenut SQL — vidi "Trenutni cilj" gore za tačne sledeće
  korake.**
- **07.09 (dopuna) — dve manje izmene na početnoj + animirana "rotaciona
  lampa" za hitne intervencije.** Pre upload-a, Petar je tražio: (1)
  izbaciti rečenicu "Zanatski posao je vredan ali redak i sezonski.
  Čišćenje je jeftinije ali stalno. Zajedno rešavaju sezonalnost." ispod
  naslova "Dve vertikale koje se dopunjuju" (odaje internu poslovnu
  logiku korisnicima/majstorima koju ne treba da vide), i (2) skratiti
  "100% besplatno u ovoj fazi" na prosto "100% besplatno" — oboje u
  `web/index.html`. Zatim je zatražio da statična 🚨 emoji ikonica za
  hitne intervencije bude upadljivija — "rotirajuća lampa/sirena", kao na
  servisnim vozilima. Napravljena čisto CSS animacija (`.siren` klasa u
  `style.css` — kružni amber/narandžasti sjaj koji pulsira plus rotirajući
  odsjaj, bez slika, poštuje `prefers-reduced-motion`) i zamenjena svuda
  gde je emoji ranije stajao: hero baner na početnoj (`.siren-lg`,
  veća verzija), link u navigaciji, bedž na `hitna-intervencija.html`,
  bedž na `zahtev.html`, i bedž/naslov na `panel-izvodjac.html` (kartica
  hitnog zahteva + naslov sekcije). Sintaksno provereno i vizuelno
  potvrđeno (Playwright, dva frejma animacije) — sjaj i rotacija se jasno
  vide. Izmenjeni fajlovi (dodatno na spisak iz glavnog unosa iznad):
  `web/index.html`, `web/js/common.js`, `web/hitna-intervencija.html`,
  `web/zahtev.html`, `web/panel-izvodjac.html`, `web/css/style.css`.
  **Dopuna (ista sesija):** dodata minijaturna strelica između koraka u
  sekciji "Kako platforma radi" (`index.html`) — udesno između koraka na
  desktopu, naniže kad se koraci ređaju u jednu kolonu na mobilnom.
  Čisto CSS (`.step::after` u `style.css`), HTML nedirnut. Ovo je
  POSLEDNJA izmena pre GitHub upload-a — `web/css/style.css` je fajl
  koji je Petar poslednji dobio, ta verzija je finalna za upload.
- **06.09 — PREGLED CELOG DANA (za brz nastavak sledeći put).** Radilo se
  na tri stvari, redom (detalji u zasebnim unosima ispod):
  1. **Ime platforme promenjeno DRUGI PUT, u "Usklik.rs".** Domen
     "SveNaKlik.rs" ispao nedostupan, prešlo se na "UslugeNaKlik.rs", ali
     se ispostavilo da već postoji aktivan istoimeni sajt
     (uslugenaklik.com) — pa je izabrano treće, originalnije ime:
     **Usklik.rs**. Sav kod, oba biznis-plan dokumenta i prezentacija su
     preimenovani. Petar kupuje domen usklik.rs (traje par dana).
  2. **Tehnički plan za fleksibilno zakazivanje termina napravljen**
     (`PLAN_Fleksibilno_Zakazivanje_v1.md`) — kalendar za tačan datum /
     ±dana / mesec, plus mogućnost da majstor predloži drugi datum. Čeka
     Petrove odgovore na 4 otvorena pitanja pre kodiranja.
  3. **Pravi logo (Petrov predlog) ubačen svuda** — favicon, header i
     footer sajta, naslovnice oba biznis-plan dokumenta, naslovni slajd
     prezentacije.
  Svi fajlovi su poslati Petru (pojedinačno + zip, tri puta tokom dana) i
  sačuvani u `KlikProjekat` folder. **Petar još NIJE upload-ovao ništa od
  ovoga na GitHub** — sajt na klikprojekat.onrender.com i dalje prikazuje
  staro ime i stari izgled dok se to ne uradi. Otvoreno: lista preostalih
  vizuelnih izmena (Petar treba da je pošalje), i 4 pitanja iz plana za
  zakazivanje. Vidi "Stanje na kraju dana" gore za tačan spisak sledećih
  koraka.
- **06.09 (logo) — pravi logo ubačen na sajt i u dokumenta.** Petar poslao
  gotov logo (uzvičnik sa kursorom kao tačkom + zvučni talasi + tekst
  "USKLIK usluga na klik", plava/narandžasta). Claude ponudio 3 sopstvena
  alternativna pravca za poređenje (Claude Design kanvas), ali Petar je
  odlučio da ostane pri svom — "više mi se sviđa moj predlog". Poslata
  slika je bila samo flat PNG sa belom pozadinom (bez providnosti), pa je
  obrađena: pozadina uklonjena (providna), izvučena 3 verzije — samostalna
  ikonica (kvadrat, za favicon), lockup ikonica+"USKLIK" bez tagline (za
  header/footer sajta), i pun lockup sa tagline "usluga na klik" (za
  naslovnice dokumenata). Ubačeno:
  - **Favicon** na svih 13 `web/*.html` stranica (`web/img/usklik-icon-*.png`,
    zamenjen stari inline SVG "S" favicon) + apple-touch-icon.
  - **Header logo** (`kuRenderHeader` u `common.js`) — slika + ".rs" tekst.
  - **Footer logo** (`kuRenderFooter`) — ista slika, čitljivo i na tamnoj
    plavoj pozadini footera (provereno vizuelno, kontrast dovoljan).
  - **Naslovnica oba biznis-plan docx dokumenta** (`Svenaklik_Biznis_Plan_v7.docx`,
    `Dopuna_Biznis_Plana_Mehanizam_Ponuda_v1.docx`) — pun lockup sa tagline,
    iznad postojećeg naslova.
  - **Naslovni slajd prezentacije** (`Svenaklik_Prezentacija_v7.pptx`) —
    samo ikonica (bez teksta, diskretno u uglu) da se ne dupira sa
    postojećim velikim tekstualnim naslovom na slajdu; NIJE dodata na
    ostale slajdove jer bi se sudarala sa njihovim rasporedom sadržaja.
  - Nove slike žive u `web/img/` — te fajlove Petar MORA da doda na GitHub
    (nisu postojale ranije, sam upload izmenjenih HTML/JS fajlova nije
    dovoljan bez njih).
  - Napomena data Petru: tagline na logou piše "usluga na klik" (jednina),
    dok ostatak sajta/dokumenata dosledno piše "usluge na klik" (množina)
    — nije menjano bez njegove potvrde, ostaje kao otvorena sitnica za
    kasnije ako poželi da uskladi.
- **06.09 (nastavak) — preimenovanje u "Usklik.rs" (uslugenaklik.rs se
  sudarao sa postojećim istoimenim .com sajtom iste namene).** Pre nego
  što je uslugenaklik.rs kupljen, primećeno je da već postoji aktivan
  sajt **uslugenaklik.com** — takođe platforma za usluge domaćinstva, isto
  ime, ista kategorija, samo drugi nastavak domena. Realan rizik zabune
  kod korisnika, pa je odlučeno da se ime opet promeni PRE kupovine i
  deploy-a (dakle bez posledica po živi sajt). Novo ime: **Usklik.rs** —
  skraćenica od "USluge na KLIK", a i sama po sebi postojeća srpska reč
  (usklik/uzvik — izraz snažnog osećanja). Provereno: nema postojećeg
  sajta ni brenda po imenu "Usklik", nema DNS zapisa niti Wayback
  istorije za usklik.rs (čist signal da je verovatno slobodan, ali
  konačna potvrda ide tek kroz pravog registratora). Petar kupuje domen
  usklik.rs (traje par dana da bude zvanično aktivan) — dok se to ne
  desi, sajt na klikprojekat.onrender.com nastavlja da radi kao i do sad,
  samo je KOD u međuvremenu preimenovan da bude spreman za trenutak kad
  domen bude aktivan. Izmenjeno: svih 13 `web/*.html` fajlova,
  `web/js/common.js`, `web/js/config.js`, `web/js/store.js`,
  `db/schema.sql` (komentar), naslovi `README.md`/`TASKOVI.md`/
  `STATUS.md`, i sadržaj sva tri dokumenta biznis plana (nazivi FAJLOVA
  nisu menjani). Napomena o istoriji naziva u biznis planu dopunjena
  novim korakom (nije prepisana). Petar je iskoristio ovih par dana
  čekanja na domen i za doradu/unapređenje sajta pre zvaničnog
  postavljanja pod novim imenom — vidi dogovor o prioritetima ispod.
- **06.09 — preimenovanje u "UslugeNaKlik.rs" (domen SveNaKlik.rs bio
  zauzet).** Petar odlučio: kreni odmah, novi naziv svuda glasi
  **UslugeNaKlik.rs**. Izmenjeno: svih 13 `web/*.html` fajlova,
  `web/js/common.js`, `web/js/config.js` (uključujući komentare u kodu),
  `db/schema.sql` (komentar na vrhu), naslovi u `README.md`, `TASKOVI.md`
  i `STATUS.md`, i sadržaj sva tri dokumenta biznis plana
  (`Svenaklik_Biznis_Plan_v7.docx`, `Svenaklik_Prezentacija_v7.pptx`,
  `Dopuna_Biznis_Plana_Mehanizam_Ponuda_v1.docx` — nazivi FAJLOVA nisu
  menjani, samo sadržaj). Napomena o istoriji naziva u biznis planu
  dopunjena tačnim redosledom (KlikMajstor → Klik usluga → SveNaKlik →
  SveNaKlik.rs → UslugeNaKlik.rs), a ne prepisana. `UPUTSTVO_SUPABASE.md`
  i `UPUTSTVO_DEPLOY.md` NISU menjani — to su uputstva za jednokratno
  podešavanje koje je Petar već odradio (repo/Render/Supabase su već
  nazvani "KlikProjekat"/"klikprojekat"/"svenaklik" i menjanje tih naziva
  sada nema nikakav efekat na sajt niti je potrebno). Petar je takođe
  najavio dva paralelna zadatka (kupovina domena UslugeNaKlik.rs i savet
  oko održavanja/bezbednosti sajta — odgovoreno u istoj sesiji) i detaljno
  opisao željenu funkcionalnost fleksibilnog zakazivanja termina (vidi
  novi blok "Fleksibilno zakazivanje termina" gore) — ovo je stvarna nova
  funkcija (izmena šeme baze), treba joj poseban tehnički plan pre
  kodiranja, nije samo vizuelna izmena.
- **04.09 (vizuelni redizajn — potvrđen live)** — Petar uploadovao sve
  fajlove, ali prvi put je sajt izgledao neizmenjeno. Provera je pokazala
  da je `web/css/style.css` jedini fajl koji nije stigao na GitHub
  (verovatno upload van `css` foldera) — bez njega su nove kartice bile
  potpuno neuređene i boje su ostale stare. Petar ponovo uploadovao taj
  fajl u `web/css/`, provereno direktno u živom CSS-u da je nova plava
  paleta i `.hero-card` stil sada na mestu. **Vizuelni redizajn je
  zvanično gotov.**
- **04.09 (vizuelni redizajn — prenet u pravi kod)** — Nakon što je Petar
  odobrio pravac (Runda 4 — Opcija B), izmene su prenete iz mockup-a u
  pravi `web/` kod: nova plava paleta (kroz CSS promenljive, pa se
  automatski primenila na svih 11 stranica), nov raspored početne strane
  (dve velike kartice), i dve nove stranice za pregled potkategorija
  (`potkategorije-majstor.html`, `potkategorije-ciscenje.html`) koje se
  prikazuju pre forme za zahtev. Fajlovi za GitHub upload (16 ukupno — 2
  nova, 14 izmenjenih): `web/css/style.css`, `web/js/common.js`,
  `web/js/config.js`, `web/index.html`, `web/novi-zahtev.html`,
  `web/potkategorije-majstor.html` (NOVO), `web/potkategorije-ciscenje.html`
  (NOVO), i favicon-samo izmena na `web/kako-radi.html`,
  `web/moj-profil.html`, `web/panel-izvodjac.html`,
  `web/panel-klijent.html`, `web/pretraga.html`, `web/prijava.html`,
  `web/profil.html`, `web/registracija.html`, `web/zahtev.html`. Sledeće:
  Petar uploaduje na GitHub, pa provera na živom linku.
- **04.09 (vizuelni redizajn — pravac odobren)** — Petar poželeo izmenu
  izgleda sajta (početna strana mu je delovala "flat i neupadljiva").
  Napravljen Claude Design kanvas mockup (nije diran pravi kod sajta dok
  Petar ne odobri pravac): hladnija plava paleta umesto zeleno-bele
  (inspiracija: plavi gradijent koji je Petar poslao, samo kao ton, ne
  kopiranje slike), početna strana odmah deli posetioca na dva velika
  klikabilna polja — "Treba ti majstor" (zanatsko-građevinski poslovi) i
  "Održavanje i čistoća" — a registracija izvođača postaje sitna
  sekundarna stavka. Ikonice su prošle nekoliko rundi doterivanja: prvo
  jednobojne bele siluete (Petru delovalo flat), zatim ukrštene alatke
  belom bojom (Petru zbunjujuće), zatim alatke u boji ali sa nejasnim
  ključem (ličio na lupu/prsten), na kraju odobreno: **Runda 4 — Opcija
  B** — pravi otvoreni oblik ključa, veće (~20%) i jednostavnije ikonice,
  isključivo brend boje (plava/tamnoplava/narandžasta), bela okrugla
  značka bez dodatnog obruba. Petar potvrdio: "ajmo sa runda br 4 opcija
  b, neka to bude dizajn za sada". Odobrene ikonice odmah prenete u
  mockup fajlove (`Main.dc.html`, `MainMobile.dc.html`) kao tačan
  predložak za kasniji pravi kod. Sledeći korak: preneti sve ovo u pravi
  `web/` kod (vidi novi zadatak "Vizuelni redizajn — prenos u kod" gore)
  — mockup sam po sebi ne menja živi sajt.
- **04.09 (Dan 3 + Dan 4 završeni, uveče)** — Petar isključio "Confirm
  email" i uradio pravi live test: registrovao sebe kao izvođača, ženu
  kao klijenta, poslao zahtev, razmenili ponudu — sve radi preko prave
  Supabase baze. Ovim su Dan 3 i Dan 4 suštinski gotovi. Petar zatim
  detaljno opisao viziju za "hibridni mehanizam v2" (already skiciran
  16. avgusta): klijent bira uslugu/količinu iz dropdown-a (da što manje
  kuca), sistem automatski množi sa cenovnikom svakog majstora te
  kategorije i šalje već obračunatu ponudu (iznos + rok) svim majstorima
  odjednom, majstor samo potvrđuje/odbija. Odlučeno (Petar, birao između
  3 opcije): pristup je **kombinacija** — dropdown je glavni, brzi put;
  za probleme koji ne postoje u spisku usluga, dodaje se opcija "opiši
  svojim rečima" gde AI predlaže NAJBLIŽU postojeću kategoriju iz spiska
  (ne izmišlja cenu ni novu uslugu) — klijent/majstor i dalje ručno
  potvrđuju. Sledeće: napraviti konkretan tehnički plan gradnje ovog
  mehanizma (novi koraci u ovom fajlu), pre nego što se počne kodiranje.
- **04.09** — Petar uploadovao Dan 2 fajlove na GitHub, sajt je live i
  radi sa novom verzijom (potvrđeno screenshotom). Primetio da logo u
  headeru/footeru pogrešno ispisuje ime, podeljeno tačkom na sredini
  ("Svena • klik"). Odlučeno (Petar): naziv svuda na sajtu (logo, naslovi
  stranica, tekst) treba da glasi **"SveNaKlik.rs"** — usklađeno sa
  domenom koji planira da kupi. Izmenjeno: `common.js` (logo u headeru i
  footeru, copyright linija), `config.js` (`nazivPlatforme`), i naslovi/
  tekst na svih 11 HTML stranica. Fajlovi poslati Petru i sačuvani u
  folder — čeka se još jedan GitHub upload da ispravka ode na živi sajt.
  Napomena: biznis plan dokumenti (`docs/`) i dalje pišu "Svenaklik" —
  nisu menjani u ovom koraku, čeka se da Petar potvrdi da li i njih treba
  ažurirati.
- **03.09 (Dan 2)** — Petar poslao Project URL i publishable ključ.
  Claude prepravio `store.js`, `config.js`, `common.js` i svih 11 HTML
  stranica da rade sa pravom Supabase bazom umesto localStorage-a
  (detalji u STATUS.md). Uklonjeni demo nalozi. Fajlovi poslati Petru
  (pojedinačno + zip) i sačuvani u folder. Istraženo i dopunjeno
  uputstvo za API ključeve i za isključivanje "Confirm email" opcije.
  Sledeće: Petar isključuje "Confirm email", uploaduje fajlove na
  GitHub (Dan 3), pa live test (Dan 4).
- **03.09 (Dan 1)** — Petar napravio Supabase nalog i projekat (Dan 1 u toku).
  Ispričao konkretan primer izvođača (Petar Petrović) sa cenovnikom po
  usluzi — na osnovu toga dopunjena `db/schema.sql` sa tabelama `usluge`
  i `cenovnik` plus dva nova polja u `profiles`. Čeka se da Petar ponovo
  pokrene ažuriranu skriptu i pošalje Project URL + anon key.
- **01.09** — Platforma preimenovana iz "Klik usluga" u **Svenaklik**
  (domen svenaklik.rs). Ažuriran sav kod sajta (nazivi, naslovi, logo,
  favicon), sva uputstva i STATUS.md, kao i oba dokumenta biznis plana
  (preimenovana, sadržaj usklađen). Petar u paraleli pravi Supabase
  projekat pod imenom "svenaklik" — nastavljamo Dan 1 čim pošalje Project
  URL i anon key.
- **17.08** — Napravljen task board. Razjašnjeno: baza (Supabase) ne zavisi
  od cenovnika v2, ali cenovnik v2 zavisi od baze — zato baza ide prva.
  Pripremljena SQL šema (`db/schema.sql`) i uputstvo
  (`UPUTSTVO_SUPABASE.md`). Čeka se da Petar napravi Supabase nalog i
  pošalje Project URL + anon key.

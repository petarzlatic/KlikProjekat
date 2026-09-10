# Uputstvo: Hibridni mehanizam v2 (automatski predlog cene)

Ovo je nova funkcija za pilot kategorije **krečenje**, **redovno
čišćenje** i **generalno čišćenje**: umesto da klijent samo opiše posao
slobodnim tekstom, sad bira konkretne usluge (npr. krečenje +
gletovanje) i unosi kvadraturu — sajt mu odmah pokazuje okvirnu cenu
("5.000–15.000 RSD"), a posle slanja zahteva sistem sam izračuna tačnu
cenu za svakog majstora (na osnovu NJEGOVOG cenovnika) i predloži mu
gotovu ponudu koju samo treba da potvrdi ili odbije — ne mora ništa
sam da kuca.

Pun opis odluka i dizajna: `PLAN_Hibridni_Mehanizam_v2.md`. Ovo
uputstvo je samo "uradi ovo redom da bi proradilo".

## 1. Pokreni ažuriranu bazu (SQL Editor)

1. U Supabase dashboard-u otvori **SQL Editor**.
2. Otvori fajl `db/schema.sql` iz `KlikProjekat` foldera, kopiraj **ceo
   sadržaj** (isti obrazac kao i do sada — fajl je napravljen tako da
   je bezbedno pokrenuti ga ceo iznova, ništa se ne duplira niti briše
   postojeće podatke).
3. Nalepi u SQL Editor i klikni **Run**.
4. Trebalo bi da prođe bez greške. Ovo dodaje: novu tabelu
   `zahtev_stavke` (koje je usluge klijent izabrao za svoj zahtev),
   novo polje na zahtevima za "otežani uslovi", proširenje statusa
   ponuda sa novim stanjem `nacrt` (sistem predložio, čeka majstora),
   i novu funkciju u bazi koja sve to bezbedno povezuje.

## 2. Uploaduj izmenjene fajlove na GitHub

Ovih 5 fajlova su izmenjena i treba da odu na GitHub (Render će sam
pokupiti izmenu i osvežiti sajt, kao i do sada):

- `web/js/config.js`
- `web/js/store.js`
- `web/novi-zahtev.html`
- `web/panel-izvodjac.html`
- `web/zahtev.html`

## 3. Deploy-uj novu Edge Function — `generate-auto-offers`

Isti postupak kao za `notify-new-request` (koju si već jednom radio/la
za mejl obaveštenja):

1. U Supabase dashboard-u otvori **Edge Functions** → **Deploy a new
   function** → **Via Editor**.
2. Ime funkcije upiši tačno: `generate-auto-offers`
3. Obriši ponuđeni primer koda i nalepi ceo sadržaj fajla
   `supabase/functions/generate-auto-offers/index.ts`.
4. Klikni **Deploy function**.
5. **Isključi Verify JWT** — otvori funkciju iz liste, tab
   **Settings**, toggle **"Verify JWT with legacy secret"** → isključi
   i **Save changes**. (Isti poznati bug kao ranije: ako ikad ponovo
   deploy-uješ ovu funkciju posle izmene koda, toggle će se sam vratiti
   na uključeno — proveri ga tada opet.)

Ova funkcija ne treba dodatni "secret" (koristi samo ono što Supabase
sam obezbeđuje svakoj funkciji) — nema Resend, nema API ključ.

## 4. Napravi DRUGI Database Webhook

Ovo je nezavisan okidač od onog za mejlove — ako jedna funkcija ikad
otkaže, druga i dalje radi normalno.

1. **Integrations → Database Webhooks** (integracija je već
   instalirana od prošli put, pa ovaj put nema "Install integration"
   dugme — samo idi pravo na **Create a new hook**).
2. Popuni:
   - **Name:** `generate-auto-offers`
   - **Schema:** `public`
   - **Table:** `requests`
   - **Events:** čekiraj samo **Insert**
   - **Type:** **Supabase Edge Functions**
   - **Edge Function:** izaberi `generate-auto-offers` iz liste
3. **Create webhook**.

Sad na svaki novi zahtev pucaju DVA webhook-a nezavisno: jedan šalje
mejl majstorima (postojeći), drugi (ovaj novi) proverava da li je
kategorija pilot-kategorija i ako jeste, računa i predlaže ponude.

## 5. Test podaci — `db/test_cenovnik_pzlatic.sql`

Da bi mehanizam imao šta da obračuna, bar jedan majstor mora imati
unetu cenu (cenovnik) za usluge iz pilot kategorija. Pošto je
test-majstor tvoj sopstveni nalog (`p.zlatic85@gmail.com`), pripremljen
je poseban SQL fajl sa izmišljenim cenama:

- Krečenje zidova i plafona (belo) — 400 RSD/m²
- Gletovanje zidova (priprema pre bojenja) — 400 RSD/m²
- Priprema prostora za krečenje (zaštita nameštaja/poda) — 200 RSD/m²
- Redovno čišćenje stana — 150 RSD/m²
- Generalno čišćenje stana — 250 RSD/m²

**Pre nego što ga pokreneš, proveri jednu stvar:** ovaj nalog mora u
bazi imati `role = 'izvodjac'` (znači da si se registrovao/la kao
izvođač, ne klijent, sa ovim mejlom) — u suprotnom SQL javlja jasnu
grešku umesto da tiho ne uradi ništa.

Otvori `db/test_cenovnik_pzlatic.sql`, nalepi ceo sadržaj u SQL Editor
i pokreni — posle koraka 1 (ažurirana šema) ali može i posle svega
ostalog, redosled nije bitan. Bezbedno je pokrenuti ga više puta.

**Dodatna preporuka (da bi test bio potpun):** u **Moj profil** proveri
da su kod ovog naloga čekirane kategorije "Krečenje", "Redovno
čišćenje" i "Generalno čišćenje" — bez toga zahtev se neće pojaviti u
tvom tabu "Dostupni zahtevi" niti ćeš dobiti mejl obaveštenje (predlog
ponude u tabu "Predložene ponude" će se ipak pojaviti nezavisno od
ovoga, jer ga generiše sistem direktno na osnovu cenovnika).

Namerno NISU unete cene za sve usluge iz kataloga (npr. "Krečenje u
boji (sa gletovanjem)", "Farbanje stolarije/radijatora", "Skidanje
stare tapete", "Čišćenje po satu/kancelarije") — to su postojeće stavke
kataloga van dogovorene pilot-kombinacije. Ako ih tokom testa čekiraš
na `novi-zahtev.html`, sistem će ispravno prijaviti da nema izvođača sa
unetom cenom za tu kombinaciju (očekivano ponašanje, ne greška) — za
test koristi samo 5 usluga sa spiska iznad.

## 6. Kako testirati kad sve bude spremno

1. Uloguj se kao **klijent**, idi na "Objavi zahtev", izaberi kategoriju
   **Krečenje** (ili čišćenje) — pojaviće se novo polje za kvadraturu i
   spisak usluga sa kvačicama, i odmah ispod okvirna cena.
2. Pošalji zahtev.
3. Uloguj se kao **majstor** (test-nalog za koji smo uneli cenovnik) —
   u panelu će se pojaviti novi tab **"Predložene ponude"** sa brojem u
   zagradi. Otvori ga — trebalo bi da vidiš karticu sa obračunatom
   cenom i dugmićima **Potvrdi ponudu** / **Ne mogu**.
4. Klikni **Potvrdi ponudu** — tek sada se ta ponuda pojavljuje
   klijentu (proveri iz klijentskog naloga na `zahtev.html` te
   prijave — cena i stavke treba da se vide u kartici ponude).
5. Ako nešto ne štima, otvori **Edge Functions → generate-auto-offers →
   Logs** u Supabase dashboard-u — tu se vidi da li je funkcija uopšte
   pozvana i zašto (npr. "nijedan izvođač nema kompletan cenovnik za
   ovu kombinaciju usluga" znači da test-majstor nema unetu cenu baš za
   tu kombinaciju usluga koju si izabrao/la kao klijent).

## Kako mehanizam bira kome predlaže ponudu

Funkcija gleda koje je usluge (i u kojoj količini) klijent izabrao, i
predlaže ponudu SVAKOM majstoru koji ima unetu cenu za **baš sve** te
usluge (ne delimično — ako majstor nema cenu za jednu od izabranih
stavki, ne dobija predlog za taj zahtev, jer ne bi mogao da da
kompletnu ponudu). Cena se računa kao zbir (cena po jedinici × unesena
kvadratura) za svaku izabranu uslugu, uz +25% ako je klijent čekirao
"otežani uslovi" (samo za čišćenje). Ponuda je u statusu **nacrt** dok
je majstor ne potvrdi — klijent je do tada uopšte ne vidi.

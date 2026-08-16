# Uputstvo: postavljanje sajta na pravi link (GitHub + Render)

Ovo uputstvo te vodi kroz dva koraka: prvo kod ide na **GitHub** (besplatna
"arhiva" koda, i mesto odakle Render čita sajt), a zatim **Render** taj kod
pretvara u živi sajt sa pravim linkom. Nijedan od koraka ne zahteva pisanje
koda ni komandnu liniju — sve je kroz sajtove, klikom i prevlačenjem fajlova.

---

## DEO A — GitHub (čuvanje koda)

1. Idi na **github.com** i klikni **Sign up**. Napravi besplatan nalog
   (email, korisničko ime, lozinka, potvrda mejla).

2. Kad si ulogovan/a, u gornjem desnom uglu klikni **+** pa **New repository**.

3. Popuni:
   - **Repository name:** `klik-usluga`
   - Ostavi **Public** (ili izaberi Private ako želiš da kod ne bude javno
     vidljiv — oboje je besplatno)
   - **NE** čekiraj "Add a README file" (da izbegnemo komplikacije)
   - Klikni **Create repository**

4. Na sledećoj strani, potraži link koji kaže **"uploading an existing
   file"** i klikni na njega.

5. Otvori na svom računaru folder `C:\Users\pzlat\KlikProjekat` i prevuci
   (drag & drop) **ceo sadržaj** foldera (fascikle `docs` i `web`, i fajlove
   `README.md`, `STATUS.md`) u prozor za upload na GitHub-u. Sačekaj da se
   sve učita.

6. Na dnu strane klikni zeleno dugme **Commit changes**.

Gotovo — kod je sada na GitHub-u. Proveri da folder `web` postoji u
repozitorijumu i da u njemu vidiš `index.html` i ostale fajlove.

---

## DEO B — Render (živi link)

1. Idi na **render.com** i klikni **Get Started** (ili Sign Up). Najlakše je
   da izabereš **"Sign up with GitHub"** — tako se nalozi automatski povežu.

2. U Render dashboard-u klikni **New +** pa **Static Site**.

3. Ako te pita da povežeš GitHub nalog/repozitorijum, dozvoli pristup
   (Authorize) i izaberi repozitorijum **klik-usluga**.

4. Popuni podešavanja:
   - **Name:** `klik-usluga` (ovo postaje deo linka, npr.
     `klik-usluga.onrender.com`)
   - **Branch:** `main`
   - **Publish directory:** `web`  ⚠️ *ovo je najvažnije polje — mora tačno
     da piše `web`, jer je tu sav sajt*
   - **Build command:** ostavi prazno — sajtu nije potreban build korak

5. Klikni **Create Static Site**. Render će za par minuta obraditi sajt i
   dati ti pravi link (nešto poput `https://klik-usluga.onrender.com`) koji
   možeš da pošalješ bilo kome — investitoru, sebi na telefon, bilo kome.

---

## Kako da ažuriraš sajt kasnije

Kad god Claude napravi izmenu u fajlovima (novi izgled, nova funkcija):

1. Fajlovi se snimaju u `C:\Users\pzlat\KlikProjekat` kao i do sada.
2. Ti odeš na svoj repozitorijum na GitHub-u, uđeš u folder koji je
   izmenjen, i ponovo prevučeš izmenjene fajlove (GitHub će ponuditi da ih
   zameni/overwrite) — ili mi javi pa ti dam tačno koji fajlovi su se
   promenili.
3. Render **automatski** primeti izmenu na GitHub-u i sam ponovo postavi
   sajt na live link — ne moraš ništa dodatno da radiš na Render strani.

## Šta ako nešto ne prođe glatko

Ako na bilo kom koraku ne vidiš dugme ili opciju koju uputstvo pominje,
pošalji mi screenshot (kao i ranije sa povezivanjem foldera) — snađemo se
zajedno.

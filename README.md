# Projektuppgift - Programmering i TypeScript, DT208G

## Syfte

Detta projekt är en webbapplikation byggd med Angular och TypeScript som simulerar en kursplattform för ett fiktivt universitet.

Syftet med projektet är att omsätta kunskaper inom Angular, TypeScript och webbutveckling i ett större sammanhängande projekt där data hämtas, bearbetas och presenteras i ett användargränssnitt.

Applikationen gör det möjligt att:
- Lista och filtrera universitetskurser
- Skapa ett personligt ramschema
- Hantera kurser dynamiskt i webbläsaren

---

## Funktionalitet

### Kurslista
- Visar alla kurser från en JSON-fil
- Filtrering på kurskod, kursnamn och ämne
- Sortering på kurskod, namn, poäng och ämne
- Visar antal kurser i aktuell vy
- Möjlighet att lägga till kurser i ramschema

---

### Ramschema
- Lägga till och ta bort kurser
- Förhindrar dubletter i ramschema
- Visar totalt antal högskolepoäng
- Visar antal valda kurser
- Sparas automatiskt i `localStorage`
- Laddas in automatiskt vid sidstart

---

### Startsida
- Översikt av plattformen
- Visar antal kurser och ämnen
- Navigering till kurslistan via tydlig knapp

---

## Tekniker

Projektet är byggt med:

- Angular
- TypeScript
- RxJS (HttpClient)
- Angular Signals
- HTML & CSS
- LocalStorage API

---

## Arkitektur

Projektet är uppdelat i:

- ###Components
  - course-list
  - schedule
  - home
  - navbar

- ###Services
  - CourseService (hanterar kursdata)
  - ScheduleService (hanterar ramschema)

- ###Routing
  - /courses – kurslista
  - /schedule – ramschema
  - / – startsida

---

## Datahantering

Kursdata hämtas från en lokal JSON-fil (`miun_courses.json`).

Ramschemat sparas lokalt i webbläsaren via `localStorage`, vilket gör att data finns kvar även efter uppdatering av sidan.

---

## Publicering

Projektet är publicerat via Netlify och körs som en statisk webbapplikation.

Vid deploy används Angulars produktionsbuild:

ng build --configuration production

Eftersom Angular är en Single Page Application används en _redirects-fil för att hantera routing:

/*    /index.html   200
 
### Responsiv design

Webbplatsen är anpassad för både desktop och mobila enheter med responsiv layout.

---

### Utförda uppgiftskrav:

- ## Grundkrav
- Angular + TypeScript
- Minst två undersidor
- Routing
- Minst två services
- Kursdata från JSON
- Ramschema med localStorage
- Förhindra dubletter
- Dynamisk uppdatering utan reload
- Responsiv design

- ## Kursfunktioner:
- Sortering
- Filtrering
- Ämnesfiltrering
- Lägga till/tar bort kurser
- Visa antal kurser i vy
- Visa total högskolepoäng

- ## Valfri funktionalitet (extra)
- Startsida med statistik
- Paginering i kurslistan och i ramschemat
- Modern state management med Angular Signals
- Tydlig UX med separat ramschema

## Installation & körning
npm install
ng serve

Öppna sedan:

http://localhost:4200

## Publicerad Demowebplats

https://keen-gecko-f5cb3e.netlify.app/home 

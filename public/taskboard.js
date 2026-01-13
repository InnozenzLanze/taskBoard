console.log("asfwjsiogas<gvjesioaj") //test

let tickets = [ //später aus dummydaten.json
    {
        termin: "2026-01-10",
        bezeichnung: "Müll rausbringen",
        prioritaet: "prio3",
        beschreibung: "Noch einmal alle Ablagen prüfen (besonders Küche!)"
    },
    {
        termin: "2026-01-11",
        bezeichnung: "Leon bei Hausaufgaben helfen",
        prioritaet: "prio1",
        beschreibung: "Buch für Vorstellung raussuchen (14 Jahre, irgendwas mit Comming of Age)"
    },
    {
        termin: "2026-02-01",
        bezeichnung: "Miete Überweisen",
        prioritaet: "prio1",
        beschreibung: "Dauerauftrag anlegen?"
    },
    {
        termin: "2026-01-10",
        bezeichnung: "Kuchen backen",
        prioritaet: "prio2",
        beschreibung: "Glutenfrei, Vegan!"
    }
];

//_____Deklaration Initialisierung Dummy
let ticket1 = {
    termin: new Date("2026-01-20"),
    bezeichnung: "Socken sortieren",
    prioritaet: "prio1",
    beschreibung: "Socken paarweise sortieren. Die mit Loch wegwerfen",
    kw: 0 //KalenderWoche automatisch
};

//_____Ausgabe
/*
    next: 
    1. function für Datenübertragung
    2. Schleife für tickets
*/

const termin = document.getElementById("termin");
//let terminWochentag = ticket1.termin.toLocaleString("de-De", {weekday:"short"}); 
let terminUnformat = ticket1.termin; 
let terminDatum = terminUnformat.toISOString().split("T")[0];
let terminWochentag = ticket1.termin.toLocaleString("de-De", {weekday:"short"}); 
let terminAusgabe = terminWochentag + " " + terminDatum;
termin.innerHTML =  terminAusgabe;

const bezeichnung = document.getElementById("bezeichnung");
bezeichnung.innerHTML = ticket1.bezeichnung;

/*
    switch (prio)
        case prio1 dann svg rot, break
        case prio2 dann svg gelb, break
        case prio3 dann svg (grün) [alternativ blau -> rotgrünblindheit], break
        default keine priorität setzen ermöglichen
*/

const prioritaet = document.getElementById("prioritaet");

const circle = document.getElementById("circle");
switch(ticket1.prioritaet) {
    case "prio1":
        circle.setAttribute("fill","#FF0000");
        break;
    case "prio2":
        circle.setAttribute("fill","#FFD700"); 
        break; 
    case "prio3":
        circle.setAttribute("fill","#4169E1"); 
        break;  
    default:
        circle.setAttribute("fill", "currentColour")
}

/*
    Anzeigen KW1 Regeln
    1. jene Woche, die den 4. Januar enthält
    2. jene Woche, die 1. Januar enthält, falls dieser 
        ein Montag, Dienstag, Mittwoch oder Donnerstag ist,
        sonst die darauffolgende Woche
    Zählweise nach ISO8601
    1. Kalenderwoche beginnen am Montag 
    2. Die Kalenderwoche 1 eines Jahres hat den ersten Donnerstag des Jahres
    3. Jedes Jahr hat entweder 52 oder 53 Wochen
    4. Ein Jahr hat genau dann 53 Wochen, wenn es mit Donnerstag beginnt und endet
        4.1 Gemeinjahr mit 53 Wochen beginnt und endet mit Donnerstag
        4.2 Schaltjahr mit 53 Wochen beginnt 
            entweder an einem Mittwoch und endet am Donnerstag
            oder beginnt am Donnerstag und endet am Freitag.
    5. Der 29. 30. und 31. Dezember können schon zur Kalenderwoche 1 gehören
    6. Der 1. 2. 3. Januar können zur letzten Kalenderwoche des Vorjahres gehören. 
*/  

/*
grobes Vorgehen:
    1. Jahr vom Termin nehmen und den 4. Januar ausgeben
    2. Wochentag des 4. Januar ausgeben und entsprechend den Montag der KW1 ermittlen
    3. Anzahl Tage vom Montag des Termins zum Montag KW1 ermitteln
    4. KW = AnzahlTage / 7 
*/
let kw = document.getElementById("kw") 

// grobes Vorgehen
//  1. Schritt
const terminJahr = ticket1.termin.getFullYear();
console.log(terminJahr)     //Testausgabe 

//  2. Schritt
const wochentage = {  //getDay gibt eine Nummer für einen Wochentag zurück
    0: "Sonntag",
    1: "Montag", 
    2: "Dienstag", 
    3: "Mittwoch", 
    4: "Donnerstag", 
    5: "Freitag", 
    6: "Samstag"
};

const januarVier = new Date(terminJahr, 0, 4)
console.log(januarVier)        //Testausgabe
const wochentagJanuarVier = januarVier.getDay(); 
console.log(wochentagJanuarVier)    //Testausgabe 

let wochentagJanuarVierName = wochentage[wochentagJanuarVier];
console.log(wochentagJanuarVierName)    //Testausgabe; 2026 Sonntag

const wochentageAbzug = { //Abzug für die Tage vom 04.Jan bis KW1 Montag
    "Montag": 0,
    "Dienstag": 1,
    "Mittwoch": 2,
    "Donnerstag": 3,
    "Freitag": 4,
    "Samstag": 5,
    "Sonntag": 6
}

let abzugZuMontag = wochentageAbzug[wochentagJanuarVierName];
console.log(abzugZuMontag)      //Testausgabe

const datumMontagKWEins = new Date(januarVier);
datumMontagKWEins.setDate(januarVier.getDate() - abzugZuMontag)
console.log(datumMontagKWEins)  //Testausgabe; wenn 2026 2025-12-29

// 3. Schritt
//Quelle: https://www.delftstack.com/de/howto/javascript/javascript-subtract-dates/
function differenz(datum1, datum2) {
    const datum1utc = 
        Date.UTC(datum1.getFullYear(), datum1.getMonth(), datum1.getDate());
    const datum2utc = 
        Date.UTC(datum2.getFullYear(), datum2.getMonth(), datum2.getDate());

    tag = 1000 * 60 * 60 * 24; //Java speichert Datum als Millisekunden
    return (datum2utc - datum1utc) /tag
}

const anzahlTage = differenz(datumMontagKWEins, ticket1.termin)

console.log(anzahlTage)

// 4. Schritt

const kalenderWoche = (anzahlTage / 7) +1; 
console.log(kalenderWoche)

ticket1.kw = Math.floor(kalenderWoche); //abrunden

kw.innerHTML = ticket1.kw; //Ausgabe an HTML
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
    termin: "2026-01-20",
    bezeichnung: "Socken sortieren",
    prioritaet: "prio1",
    beschreibung: "Socken paarweise sortieren. Die mit Loch wegwerfen"
};

//_____Ausgabe
/*
next: 
1. function für Datenübertragung
2. Schleife für tickets
*/

const termin = document.getElementById("termin");
termin.innerHTML = ticket1.termin;

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

/*function für Berechnung KW
1. Startdatum setzen bspw 01.Januar 1950 Sonntag
2. Definition Schaltjahre
3. ab 1KW Montag +7 Tage KW+, nach KW52 wieder KW1
*/
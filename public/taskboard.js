console.log("asfwjsiogas<gvjesioaj")

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

/*
function priosetzen()
switch (prio)
    case prio1 dann svg rot, break
    case prio2 dann svg gelb, break
    case prio3 dann svg grün, break

*/
const circle = document.getElementById("circle");
circle.setAttribute("fill","#FF0000");

let ticket1 = {
    termin: "2026-01-20",
    bezeichnung: "Socken sortieren",
    prioritaet: "prio1",
    beschreibung: "Socken paarweise sortieren. Die mit Loch wegwerfen"
};

/*
next: 
1. function für Datenübertragung
2. Schleife für tickets
*/

let termin = document.getElementById("termin");
termin.innerHTML = ticket1.termin;

let bezeichnung = document.getElementById("bezeichnung");
bezeichnung.innerHTML = ticket1.bezeichnung;


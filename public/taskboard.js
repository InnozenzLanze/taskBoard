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

//_____Ausgabe

befuelleTabelle();

function rechneKW(ticket) {
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

    // grobes Vorgehen
    //  1. Schritt
    const terminString = ticket.termin;
    const termin = new Date(terminString);
    const terminJahr = termin.getFullYear();
   
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
    const wochentagJanuarVier = januarVier.getDay(); 

    let wochentagJanuarVierName = wochentage[wochentagJanuarVier];

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

    const datumMontagKWEins = new Date(januarVier);
    datumMontagKWEins.setDate(januarVier.getDate() - abzugZuMontag)

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

    const anzahlTage = differenz(datumMontagKWEins, termin)

    // 4. Schritt

    const kalenderWoche = (anzahlTage / 7) +1; 

    let kwErgebnis = Math.floor(kalenderWoche); //abrunden
    return (kwErgebnis);
}

function befuelleTabelle() {
    tickets.forEach((ticket) => {
        let ergebnis = `
        <tr>
            <td> <!--Checkbox-->
                <input 
                    type="checkbox" 
                    id="task1" 
                    name="task1" 
                    value=""
                >
            </td>
            <td id="prio"> <!--Prio-->
                <svg id="circle"
                    class = ${ticket.prioritaet}
                    width="30"
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    />
                </svg>
            </td> 
            <td id="kw">${rechneKW(ticket)}</td>
            <td id="termin">${ticket.termin}</td>
            <td id="bezeichnung">${ticket.bezeichnung}</td>
            <td> <!--buttons-->
                <!--Details/Info-->
                <button id="Icon">
                    <svg 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M12 6C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 10.5 4.5C10.5 5.32843 11.1716 6 12 6ZM9 10H11V18H9V20H15V18H13V8H9V10Z"
                        />
                    </svg> 
                </button>             
            </td>
            <td>
                <!--Bearbeiten-->
                <button id="Icon">
                    <svg 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M5.32943 3.27158C6.56252 2.8332 7.9923 3.10749 8.97927 4.09446C10.1002 5.21537 10.3019 6.90741 9.5843 8.23385L20.293 18.9437L18.8788 20.3579L8.16982 9.64875C6.84325 10.3669 5.15069 10.1654 4.02952 9.04421C3.04227 8.05696 2.7681 6.62665 3.20701 5.39332L5.44373 7.63C6.02952 8.21578 6.97927 8.21578 7.56505 7.63C8.15084 7.04421 8.15084 6.09446 7.56505 5.50868L5.32943 3.27158ZM15.6968 5.15512L18.8788 3.38736L20.293 4.80157L18.5252 7.98355L16.7574 8.3371L14.6361 10.4584L13.2219 9.04421L15.3432 6.92289L15.6968 5.15512ZM8.97927 13.2868L10.3935 14.7011L5.09018 20.0044C4.69966 20.3949 4.06649 20.3949 3.67597 20.0044C3.31334 19.6417 3.28744 19.0699 3.59826 18.6774L3.67597 18.5902L8.97927 13.2868Z"
                        />
                    </svg>  
                </button>                 
            </td>
        </tr>
        `;
        document.getElementById("tabelleBody").innerHTML += ergebnis;
    })
}


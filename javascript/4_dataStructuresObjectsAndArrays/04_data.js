const JOURNAL = require('./journal');

function tableFor(event, journal) {
    let table = [0,0,0,0];
    for (let i = 0; i < journal.length; i++) {
        let entry = journal[i], index = 0;
        if (entry.events.includes(event)) index += 1;
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }
    return table;
}

function phi(x) {
    return (x[3] * x[0] - x[2] * x[1]) /
    Math.sqrt(
        (x[2] + x[3]) *
        (x[0] + x[1]) *
        (x[1] + x[3]) *
        (x[0] + x[2])
    );
}

//Now, lets get every unique event and automate the correlation process.
function getUniqueEvents(journal) {
    let uniqueEvents = [];
    for (let i = 0; i < journal.length; i++) {
        let journalEvents = journal[i].events
        for (let i = 0; i < journalEvents.length; i++) {
            if (!uniqueEvents.includes(journalEvents[i])) {
                uniqueEvents.push(journalEvents[i])
            } 
        }
    }

    return uniqueEvents;
}

function totalCorrelation(unique, journal) {
    let correlationArray = [];
    for (let i = 0; i < unique.length; i++) {
        let obj = {};
        let results = parseFloat(phi(tableFor(unique[i], journal)).toFixed(2));
        obj.event = unique[i];
        obj.correlation = results;
        correlationArray.push(obj);
    }
    return correlationArray;
}

let uniqueEvents = getUniqueEvents(JOURNAL);
let correlationResults = totalCorrelation(uniqueEvents, JOURNAL);
let sortedResults = correlationResults.sort((a, b) => b.correlation-a.correlation);
console.log(sortedResults);
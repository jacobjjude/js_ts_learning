const JOURNAL = require('./journal');

function tableFor(event, journal) {
    let table = [0,0,0,0];
    for (let i = 0; i < journal.length; i++) {
        let entry = journal[i], index = 0;
        // console.log(`
        //     Events: ${entry.events}
        //     Squirrel: ${entry.squirrel}
        //     index: ${index}
        //     ---------------------------------------
        //     `);
        if (entry.events.includes(event)) index += 1;
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }

    return table;
}

// function phi_(table) {
//     return (table[3] * table[0] - table[2] * table[1]) /
//     Math.sqrt((table[2] + table[3]) *
//     (table[0] + table[1]) *
//     (table[1] + table[3]) *
//     (table[0] + table[2]));
// }

function phi(x) {
    return (x[3] * x[0] - x[2] * x[1]) /
    Math.sqrt(
        (x[2] + x[3]) *
        (x[0] + x[1]) *
        (x[1] + x[3]) *
        (x[0] + x[2])
    );
}

let results = tableFor("pizza", JOURNAL);
let correlation = phi(results);
console.log(results);
console.log(correlation);
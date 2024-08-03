//Project:
// Objective: Create an automation bot that follows a road, picking up and dropping off parcels.

const roads = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",
    "Grete's House-Shop",
    "Marketplace-Farm",
    "Marketplace-Post Office",
    "Marketplace-Shop",
    "Marketplace-Town Hall",
    "Shop-Town Hall"
];

//converting the array into a data structure that can tells us what can be reached from which place

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (from in graph) {
            graph[from].push(to);
        } else {
            graph[from] = [to];
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
        let parcels = this.parcels.map(p => {
            if (p.place != this.place) return p;
            return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
        }
    }
}

let first = new VillageState(
        "Post Office",
        [{place: "Post Office", address: "Alice's House"}]
    );

function runRobot(state, robot, memory) {
    for (let turn=0;; turn++) {
        if(state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            return turn;
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        // console.log(`Moved to ${action.direction}`);
    }
}

//What's the dumbest strategy that could possibly work? Moving in a random direction

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
}

// runRobot(VillageState.random(), randomRobot);

// Improve upon the bot by making a route that passes all the places in the village

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    } 
    return {direction: memory[0], memory: memory.slice(1)};
}

runRobot(VillageState.random(), routeRobot, mailRoute);

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work [i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot ({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

let task = VillageState.random();
console.log(task);

// Exercise 1:
// Write a function that compares two robots
// Should generate 100 tasks and let each robot solve each of the tasks. 
// Output the average number of steps each robot took per task
// Same tasks per robot

let goalBot = runRobot(VillageState.random(), goalOrientedRobot, mailRoute);
let randoBot = runRobot(VillageState.random(), randomRobot);
console.log(goalBot);
console.log(randoBot);

function compareRobots(robot1, robot2, tasktotal) {
    let total1 = 0;
    let total2 = 0;

    for (let i = 0; i < tasktotal; i++) {
        let task = VillageState.random();
        let result1 = runRobot(task, robot1, mailRoute);
        let result2 = runRobot(task, robot2, mailRoute);

        total1 += result1;
        total2 += result2
    }
    console.log(total1 / tasktotal);
    console.log(total2 / tasktotal);
}

compareRobots(randomRobot, goalOrientedRobot, 100);
var dropdown = d3.select("#selDataset");
var demo_el = d3.select("#sample-metadata");
var data = {}

function start() {
    d3.json("./samples.json").then(function (response) {
        data = response
        var names = response.names
        for (const id of names) {
            // console.log(id);
            dropdown.append("option").text(id)
        }
        optionChanged(names[0])
    })
}

function optionChanged(id) {
    // console.log(params);
    demo_populate(id)
    graphs(id)
}

function demo_populate(id) {
    console.log("demo_populate");
}

function graphs(id) {
    console.log("graphs");
}

start()


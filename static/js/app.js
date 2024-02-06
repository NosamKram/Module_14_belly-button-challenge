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
    var metadata = data.metadata.find(obj=>obj.id==id)
    demo_el.html("")
    Object.entries(metadata).forEach(element => {
        var info = `${element[0]}: ${element[1]}`
        demo_el.append("p").text(info)
    });
}

function graphs(id) {
    var samples = data.samples.find(obj=>obj.id==id)
    var sample_values = samples.sample_values
    var otu_ids = samples.otu_ids
    var otu_labels = samples.otu_labels
        // console.log(samples)
    var bar_data = [{
        type: 'bar',
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.map(otu_id=>`OTU ${otu_id}`).slice(0,10).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        orientation: 'h'
      }];
      
      Plotly.newPlot('bar', bar_data);
      
      var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
        //   opacity: [1, 0.8, 0.6, 0.4],
          size: sample_values
        }
      };
      
      var bubble_data = [trace1];
      
      var bubble_layout = {
         title: 'Marker Size and Color',
         showlegend: false,
         height: 600,
         width: 600,
         title: 'OTU ID'
       };
      
       Plotly.newPlot('bubble', bubble_data, bubble_layout);

}

start()


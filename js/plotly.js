/**
* * * Helper Functions to Read the Study Data Files * * *
**/

var loadData = function(path) {
    var data = null;
    $.ajax({
        url: path,
        async: false,
        success: function (csvd) {
            data = $.csv.toArrays(csvd);
        },
        dataType: "text",
        complete: function () {
            console.log('loaded ' + path)
        }
    });

    data = data[0].map((col, i) => data.map(row => row[i]));

    data_dict = {}
    for (var i = 0; i < data.length; i++) {
        key = data[i][0]
        data[i].shift()
        data_dict[key] = data[i].map(Number)
    }
    return data_dict
}

/**
file.csv
column1 | column2 | .....
--------------------------
1       | 2       |
2       |  -332   |
534     | 0.123   |
output = loadData('file.csv')
output = {
    'column1': [1, 2, 534]
    'column2': [2, -332, 0.123]
}
output['column1'] = [1, 2, 534]
**/

/**
* * * Hidden Layer Study Plots * * *
**/

// Load the Data
files = [
    'data/MLP/hiddenlayer_study/varied-epoch-0HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-1HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-2HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-3HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-4HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-5HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-10HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-25HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-50HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-100HL.csv'
]

hidden_layers = ['0', '1', '2', '3', '4', '5', '10', '25', '50', '100']

accuracy_traces = []
for (var i = 0; i < files.length; i++) {
    data = loadData(files[i])
    var trace = {
      x: data['epochs'],
      y: data['accuracy'],
      mode: 'lines+markers',
      type: 'scatter',
      name: hidden_layers[i] + ' Hidden Layers'
    };
    accuracy_traces.push(trace)
}

var layout = {
    title: 'Hidden Layer Study',
    xaxis: {
        title: 'Epochs - Log Scale',
        type: 'log',
        autorange: true,
        showline: true,
        showgrid: true,
        zeroline: false
    },
    yaxis: {
        title: 'Accuracy',
        showline: true,
        showgrid: true,
        zeroline: false
    }
};

Plotly.newPlot('hidden-layer-study', accuracy_traces, layout);


/**
* * * * Feature Visualization * * * *
**/

// Load the data
data = loadData('data/feature_analysis/stratified_crop_data.csv')

// Generate dimensional array

dims = []
for (var band in data) {
    console.log(band)
    console.log(data[band])
    dims.push({
        label: band,
        values: data[band]
    });
}
console.log(dims)

var data = [{
  type: 'parcoords',
  pad: [80,80,80,80],
  line: {
    color: data['Crop ID'],
    colorscale: [[0, 'red'],
                 [0.5, 'green'],
                 [1, 'blue'],
                 [3, 'black'],
                 [4, 'yellow'],
                 [5, 'orange'],
                 [6, 'purple']]
  },

  dimensions: dims
}];

var layout = {};

Plotly.newPlot('feature-analysis-plot', data, layout);
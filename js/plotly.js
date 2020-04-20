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

// Filter Example Constraints
filters = [
    [[0.0128, 0.04], [0.28, 0.32]],
    [[0.0103, 0.05], [0.225, 0.325]],
    [[0.05, 0.065], [0.25, 0.32]],
    [],
    [[0.0675, 0.1], [0.28, 0.30], [0.32, 0.37]],
    [[0.2525, 0.31], [0.375, 0.445]],
    [],
    [],
    [],
    [[0.19, 0.225], [0.32, 0.4]],
    [],
    [[0.325, 0.355], [0.365, 0.4], [0.45, 0.50]],
    [],
]

dims = []
dims_filtered = []
f = 0
for (var band in data) {
    dims.push({
        label: band,
        values: data[band]
    });
    dims_filtered.push({
        label: band,
        values: data[band],
        constraintrange: filters[f]
    });
    f = f + 1;
}

var data = [{
  type: 'parcoords',
  pad: [80,80,80,80],
  line: {
    color: data['Crop ID'],
  },
  dimensions: dims
}];


var layout = {};

var applyFilters = function(apply) {
    if (apply) {
        data[0]['dimensions'] = dims_filtered
    } else {
        data[0]['dimensions'] = dims
    }
    Plotly.newPlot('feature-analysis-plot', data, layout);
}

applyFilters(0);
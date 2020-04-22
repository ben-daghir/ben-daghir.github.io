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
    title: 'Effects of Hidden Layer Numbers on Accuracy',
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
*** Activation Study Plot - Softplus Out ***
**/

// Load the Data

files = [
    'data/MLP/activation_study/softplus-out/varied-epoch-exponential-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-hard_sigmoid-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-linear-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-relu-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-sigmoid-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-softmax-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-softplus-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-softsign-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-tanh-sp_out.csv'
]

activation_function = ['Exponential', 'Hard Sigmoid', 'Linear', 'RELU', 'Sigmoid', 'Softmax', 'Softplus', 'Softsign', 'Tanh']

accuracy_traces = []
for (var i = 0; i < files.length; i++) {
    data = loadData(files[i])
    var trace = {
      x: data['epochs'],
      y: data['accuracy'],
      mode: 'lines+markers',
      type: 'scatter',
      name: activation_function[i] + ' Activation Function'
    };
    accuracy_traces.push(trace)
}

var layout = {
    title: 'Effects of Activation Function on Accuracy (Softplus Out)',
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

Plotly.newPlot('activation-function-study-softplus', accuracy_traces, layout);

/**
Activation Study Plot - Uniform Out
**/


// Load the Data

files = [
    'data/MLP/activation_study/uniform-out/varied-epoch-exponential.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-hard_sigmoid.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-linear.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-relu.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-sigmoid.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-softmax.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-softplus.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-softsign.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-tanh.csv'
]

activation_function = ['Exponential', 'Hard Sigmoid', 'Linear', 'RELU', 'Sigmoid', 'Softmax', 'Softplus', 'Softsign', 'Tanh']

accuracy_traces = []
for (var i = 0; i < files.length; i++) {
    data = loadData(files[i])
    var trace = {
      x: data['epochs'],
      y: data['accuracy'],
      mode: 'lines+markers',
      type: 'scatter',
      name: activation_function[i] + ' Activation Function'
    };
    accuracy_traces.push(trace)
}

var layout = {
    title: 'Effects of Activation Function on Accuracy (Uniform Out)',
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

Plotly.newPlot('activation-function-study-uniform', accuracy_traces, layout);

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

var paracoord_data = [{
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
        paracoord_data[0]['dimensions'] = dims_filtered
    } else {
        paracoord_data[0]['dimensions'] = dims
    }
    Plotly.newPlot('feature-analysis-plot', paracoord_data, layout);
}

applyFilters(0);

/**
//SVM Plot
**/

//Accuracy Plot
data = loadData('data/RGBStudyResults.csv')

accuracy_traces = []
    var trace = {
      x: data['Proportional Size'],
      y: data['Avg All-Band Accuracy'],
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Average of All-Bands'
    };
    accuracy_traces.push(trace)

var trace = {
      x: data['Proportional Size'],
      y: data['Avg RGB Accuracy'],
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Average of RGB Bands'
    };
    accuracy_traces.push(trace)


var layout = {
    title: 'Effects of Bands on Accuracy',
    xaxis: {
        title: 'Percentage of Available Training Data Used in Model Training',
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

Plotly.newPlot('RGB-Band-Studies', accuracy_traces, layout);

//Time Plot
data = loadData('data/RGBStudyResults.csv')

accuracy_traces = []
    var trace = {
      x: data['Proportional Size'],
      y: data['Avg All-Band Times (seconds)'],
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Average Time of All-Bands'
    };
    accuracy_traces.push(trace)

var trace = {
      x: data['Proportional Size'],
      y: data['Avg RGB Times (seconds)'],
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Average Time of RGB Bands'
    };
    accuracy_traces.push(trace)


var layout = {
    title: 'Effects of Bands on Training Times',
    xaxis: {
        title: 'Percentage of Available Training Data Used in Model Training',
        showline: true,
        showgrid: true,
        zeroline: false
    },
    yaxis: {
        title: 'Average Time Spent Training, (sec)',
        showline: true,
        showgrid: true,
        zeroline: false
    }
};

Plotly.newPlot('RGB-Band-Studies-Time', accuracy_traces, layout);

/**
Summary Plot
**/

files = [
    ['data/MLP/activation_study/softplus-out/varied-epoch-exponential-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-hard_sigmoid-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-linear-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-relu-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-sigmoid-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-softmax-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-softplus-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-softsign-sp_out.csv',
    'data/MLP/activation_study/softplus-out/varied-epoch-tanh-sp_out.csv'],
    ['data/MLP/activation_study/uniform-out/varied-epoch-exponential.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-hard_sigmoid.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-linear.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-relu.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-sigmoid.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-softmax.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-softplus.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-softsign.csv',
    'data/MLP/activation_study/uniform-out/varied-epoch-tanh.csv'],
    ['data/MLP/hiddenlayer_study/varied-epoch-0HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-1HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-2HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-3HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-4HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-5HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-10HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-25HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-50HL.csv',
    'data/MLP/hiddenlayer_study/varied-epoch-100HL.csv']
]

methods = [['exponential-sp_out',
    'hard_sigmoid-sp_out',
    'linear-sp_out',
    'relu-sp_out',
    'sigmoid-sp_out',
    'softmax-sp_out',
    'softplus-sp_out',
    'softsign-sp_out',
    'tanh-sp_out'],
    ['exponential',
    'hard_sigmoid',
    'linear',
    'relu',
    'sigmoid',
    'softmax',
    'softplus',
    'softsign',
    'tanh'],
    ['0HL',
    '1HL',
    '2HL',
    '3HL',
    '4HL',
    '5HL',
    '10HL',
    '25HL',
    '50HL',
    '100HL.']]

studies = ['Activation Study <br>with SoftPlus Output',
'Activation Study <br>with Uniform Activation',
'Hidden Layer Study']

accuracies = []
for (var i = 0; i < files.length; i++) {
    sub_acc = []
    for (var j = 0; j < files[i].length; j++) {
        data = loadData(files[i][j])
        sub_acc.push(data['accuracy'][6])
    }
    accuracies.push(sub_acc)
}

accuracies = accuracies[0].map((col, i) => accuracies.map(row => row[i]));
methods = methods[0].map((col, i) => methods.map(row => row[i]));

accuracy_loop = []
for (var i = 0; i < accuracies.length; i++) {
    var trace = {
      x: studies,
      y: accuracies[i],
      type: 'bar',
      name: methods[i]
    };
    accuracy_loop.push(trace)
}

console.log(accuracy_loop)

var layout = {
    title: 'Study Methods Affect on Accuracy',
    xaxis: {
        title: 'Method',
        showline: true,
        showgrid: true,
        zeroline: false,
        categoryorder: 'array',
        categoryarray: 'value ascending'
    },
    yaxis: {
        title: 'Accuracy',
        showline: true,
        showgrid: true,
        zeroline: false

    },

};

console.log(accuracy_loop)

Plotly.newPlot('All-Studies-Accuracy', accuracy_loop, layout);

/**
* * * FINAL MLP PLOTS * * *
**/

data = loadData('data/MLP/final_mlp/acc_v_batch_size.csv')

accuracy_traces = []
    var trace = {
      x: data['batchsize'],
      y: data['accuracy'],
      mode: 'lines+markers',
      type: 'scatter',
    };
    accuracy_traces.push(trace)


var layout = {
    title: 'Effect of Batch Size on Accuracy',
    xaxis: {
        title: 'Batch Size',
        showline: true,
        showgrid: true,
        zeroline: false,
        type: 'log'
    },
    yaxis: {
        title: 'Accuracy',
        showline: true,
        showgrid: true,
        zeroline: false
    }
};

Plotly.newPlot('Batch_size', accuracy_traces, layout);


////////PCA DIM PLOT

data = loadData('data/MLP/final_mlp/acc_v_pca_dims.csv')

accuracy_traces = []
var trace = {
      x: data['pca_dims'],
      y: data['accuracy'],
      mode: 'lines+markers',
      type: 'scatter',
    };
    accuracy_traces.push(trace)


var layout = {
    title: 'Effects of PCA Dimensions Number on Accuracy',
    xaxis: {
        title: 'Number of PCA Dimensions',
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

Plotly.newPlot('PCA_dims', accuracy_traces, layout);

////////EPCOHS

data = loadData('data/MLP/final_mlp/acc_v_epochs.csv')

accuracy_traces = []
var trace = {
      x: data['epochs'],
      y: data['accuracy'],
      mode: 'lines+markers',
      type: 'scatter',
    };
    accuracy_traces.push(trace)


var layout = {
    title: 'Final Model Accuracy with Epoch',
    xaxis: {
        title: 'Number of Epochs',
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

Plotly.newPlot('epochs', accuracy_traces, layout);

/**
* * * Confusion Matrix * * *
**/

data = loadData('data/confusion_matrix.csv');

var confusion_array = []
for (var key in data) {
    confusion_array.push(data[key])
}

var confusion_data = [
  {
    z: confusion_array,
    type: 'heatmap'
  }
];

var layout = {
    title: 'Confusion Matrix for the 7 Crop ID\'s (0 - 6)',
    yaxis: {
        autorange: 'reversed'
    },
    ascending: true
};

Plotly.newPlot('confusion-matrix', confusion_data, layout);

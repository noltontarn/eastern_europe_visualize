google.charts.load('current', {
    'packages':['geochart', 'controls'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    
    var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));

    var yearSelector = new google.visualization.ControlWrapper({
        controlType: 'CategoryFilter',
        containerId: 'filter_div',
        options: {
            filterColumnLabel: 'Year',
            ui: {
                allowTyping: false,
                allowMultiple: false,
                allowNone: false
            }
        }
    });

    var mapChart = new google.visualization.ChartWrapper({
        chartType: 'GeoChart',
        containerId: 'regions_div',
        options: {
            region: '150',
            colorAxis: {colors: ['#AFEEEE', '#FFC0CB']}
        }
    });
    
    dashboard.bind(yearSelector, mapChart);

    $.get("./data/Agriculture.csv", function(csvString) {
            var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
            var data = google.visualization.arrayToDataTable(arrayData);
            console.log("infunction " + data);
            dashboard.draw(data);
            document.getElementById("current").innerHTML = "Agriculture";
    });

    document.getElementById('agriculture').addEventListener('click', function () {
        $.get("./data/Agriculture.csv", function(csvString) {
            var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
            var data = google.visualization.arrayToDataTable(arrayData);
            console.log("infunction " + data);
            dashboard.draw(data);
            document.getElementById("current").innerHTML = "Agriculture";
        });
    }, false);

    document.getElementById('services').addEventListener('click', function () {
        $.get("./data/Services.csv", function(csvString) {
            var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
            var data = google.visualization.arrayToDataTable(arrayData);
            console.log("infunction " + data);
            dashboard.draw(data);
            document.getElementById("current").innerHTML = "Services";
        });
    }, false);

    document.getElementById('industry').addEventListener('click', function () {
        $.get("./data/Industry.csv", function(csvString) {
            var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
            var data = google.visualization.arrayToDataTable(arrayData);
            console.log("infunction " + data);
            dashboard.draw(data);
            document.getElementById("current").innerHTML = "Industry";
        });
    }, false);
}
/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 103.0, "series": [{"data": [[21500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1473", "isController": false}, {"data": [[31900.0, 1.0]], "isOverall": false, "label": "DeleteTask 1352", "isController": false}, {"data": [[16500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1356", "isController": false}, {"data": [[32200.0, 1.0]], "isOverall": false, "label": "DeleteTask 1475", "isController": false}, {"data": [[32000.0, 1.0]], "isOverall": false, "label": "DeleteTask 1359", "isController": false}, {"data": [[29300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1358", "isController": false}, {"data": [[30600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1357", "isController": false}, {"data": [[26100.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1731", "isController": false}, {"data": [[28700.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1732", "isController": false}, {"data": [[33300.0, 1.0], [33900.0, 1.0], [35300.0, 3.0], [35700.0, 1.0], [36500.0, 1.0], [800.0, 1.0], [1000.0, 1.0], [3600.0, 1.0], [4200.0, 1.0], [5100.0, 1.0], [4900.0, 1.0], [8100.0, 1.0], [11000.0, 1.0], [13300.0, 1.0], [15000.0, 1.0], [14900.0, 1.0], [15400.0, 1.0], [16000.0, 1.0], [16200.0, 1.0], [15900.0, 1.0], [16300.0, 1.0], [17300.0, 5.0], [16900.0, 5.0], [17400.0, 4.0], [17000.0, 4.0], [17200.0, 3.0], [17100.0, 1.0], [16500.0, 2.0], [16700.0, 2.0], [16800.0, 1.0], [16600.0, 6.0], [18100.0, 2.0], [18000.0, 1.0], [17900.0, 3.0], [17500.0, 3.0], [17600.0, 1.0], [17800.0, 2.0], [19100.0, 1.0], [18900.0, 1.0], [18600.0, 3.0], [18500.0, 1.0], [19200.0, 1.0], [20100.0, 2.0], [19900.0, 8.0], [20000.0, 1.0], [19800.0, 8.0], [19600.0, 2.0], [19700.0, 2.0], [20400.0, 1.0], [20200.0, 1.0], [20500.0, 1.0], [21100.0, 3.0], [21200.0, 2.0], [21300.0, 1.0], [21900.0, 1.0], [21600.0, 1.0], [21700.0, 2.0], [22500.0, 1.0], [22700.0, 1.0], [22900.0, 3.0], [24400.0, 1.0], [23600.0, 1.0], [24100.0, 1.0], [24500.0, 1.0], [24000.0, 1.0], [24600.0, 3.0], [24800.0, 1.0], [25100.0, 1.0], [25300.0, 4.0], [25200.0, 1.0], [25700.0, 3.0], [26400.0, 3.0], [25600.0, 2.0], [26100.0, 8.0], [26300.0, 3.0], [26500.0, 1.0], [26600.0, 3.0], [26800.0, 1.0], [26900.0, 2.0], [27300.0, 1.0], [26700.0, 1.0], [27100.0, 1.0], [27700.0, 2.0], [28000.0, 1.0], [28200.0, 2.0], [28100.0, 1.0], [28500.0, 2.0], [29000.0, 1.0], [28700.0, 1.0], [29100.0, 2.0], [29300.0, 1.0], [29400.0, 2.0], [29500.0, 6.0], [29600.0, 2.0], [29800.0, 1.0], [30000.0, 1.0], [30200.0, 3.0], [30300.0, 6.0], [30400.0, 1.0], [30500.0, 6.0], [30600.0, 8.0], [30700.0, 5.0], [31500.0, 1.0], [30800.0, 7.0], [30900.0, 2.0], [31100.0, 6.0], [31000.0, 1.0], [31200.0, 5.0], [31300.0, 7.0], [31400.0, 2.0], [31600.0, 4.0], [31700.0, 2.0], [32100.0, 3.0], [31900.0, 1.0], [32300.0, 1.0], [32200.0, 2.0], [34000.0, 1.0], [34800.0, 1.0], [35000.0, 1.0], [36800.0, 1.0], [38400.0, 1.0]], "isOverall": false, "label": "UpdateTask", "isController": false}, {"data": [[31900.0, 1.0]], "isOverall": false, "label": "DeleteTask 1341", "isController": false}, {"data": [[31400.0, 1.0]], "isOverall": false, "label": "DeleteTask 1340", "isController": false}, {"data": [[25500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1344", "isController": false}, {"data": [[29500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1349", "isController": false}, {"data": [[30700.0, 1.0]], "isOverall": false, "label": "DeleteTask 1469", "isController": false}, {"data": [[30800.0, 1.0]], "isOverall": false, "label": "DeleteTask 1348", "isController": false}, {"data": [[29400.0, 1.0]], "isOverall": false, "label": "DeleteTask 1347", "isController": false}, {"data": [[32900.0, 2.0], [33300.0, 1.0], [34900.0, 1.0], [39700.0, 1.0], [300.0, 1.0], [400.0, 4.0], [500.0, 10.0], [600.0, 2.0], [700.0, 9.0], [1000.0, 1.0], [1100.0, 1.0], [1200.0, 3.0], [1300.0, 7.0], [1500.0, 1.0], [1600.0, 5.0], [1700.0, 6.0], [1800.0, 4.0], [1900.0, 1.0], [2000.0, 3.0], [2200.0, 3.0], [2300.0, 2.0], [2400.0, 5.0], [2500.0, 7.0], [2600.0, 3.0], [2900.0, 2.0], [3000.0, 2.0], [3200.0, 1.0], [3300.0, 2.0], [3500.0, 2.0], [3700.0, 1.0], [3800.0, 2.0], [3900.0, 2.0], [4000.0, 3.0], [4100.0, 2.0], [4300.0, 2.0], [4500.0, 4.0], [4600.0, 10.0], [4700.0, 3.0], [4800.0, 3.0], [4900.0, 1.0], [5000.0, 2.0], [5100.0, 6.0], [5200.0, 6.0], [5300.0, 1.0], [5600.0, 5.0], [5700.0, 3.0], [5900.0, 2.0], [6300.0, 4.0], [6200.0, 2.0], [6500.0, 3.0], [6600.0, 2.0], [6400.0, 1.0], [6700.0, 1.0], [6800.0, 1.0], [6900.0, 1.0], [7000.0, 4.0], [7100.0, 4.0], [7200.0, 3.0], [7300.0, 2.0], [7400.0, 3.0], [7500.0, 2.0], [7600.0, 2.0], [7700.0, 2.0], [7800.0, 2.0], [7900.0, 1.0], [8000.0, 2.0], [8100.0, 2.0], [8200.0, 2.0], [8300.0, 3.0], [8400.0, 1.0], [8500.0, 4.0], [8600.0, 1.0], [8700.0, 1.0], [8800.0, 4.0], [8900.0, 2.0], [9000.0, 3.0], [9100.0, 2.0], [9200.0, 1.0], [9300.0, 1.0], [9400.0, 2.0], [9500.0, 4.0], [9600.0, 2.0], [9700.0, 1.0], [9800.0, 3.0], [10000.0, 1.0], [10100.0, 2.0], [10300.0, 2.0], [10400.0, 1.0], [10500.0, 4.0], [10600.0, 2.0], [10700.0, 2.0], [11100.0, 1.0], [10800.0, 1.0], [10900.0, 1.0], [11000.0, 2.0], [11200.0, 2.0], [11300.0, 2.0], [11500.0, 5.0], [11600.0, 3.0], [11400.0, 1.0], [11900.0, 3.0], [12000.0, 5.0], [11800.0, 4.0], [12100.0, 2.0], [12200.0, 5.0], [12300.0, 3.0], [12400.0, 1.0], [12500.0, 1.0], [12600.0, 2.0], [12900.0, 1.0], [13100.0, 2.0], [13000.0, 1.0], [13300.0, 2.0], [13400.0, 2.0], [13500.0, 4.0], [13600.0, 3.0], [13700.0, 2.0], [13800.0, 1.0], [13900.0, 2.0], [14000.0, 2.0], [14100.0, 2.0], [14200.0, 1.0], [14300.0, 4.0], [14400.0, 6.0], [14500.0, 2.0], [14600.0, 1.0], [14700.0, 2.0], [14800.0, 2.0], [14900.0, 3.0], [15000.0, 3.0], [15100.0, 5.0], [15200.0, 2.0], [15300.0, 1.0], [15400.0, 3.0], [15500.0, 3.0], [15600.0, 5.0], [15700.0, 4.0], [15800.0, 1.0], [15900.0, 6.0], [16000.0, 3.0], [16100.0, 1.0], [16300.0, 2.0], [16200.0, 1.0], [17200.0, 12.0], [16600.0, 2.0], [16400.0, 6.0], [16800.0, 4.0], [17000.0, 2.0], [17400.0, 10.0], [17600.0, 10.0], [18400.0, 3.0], [17800.0, 6.0], [18000.0, 11.0], [18200.0, 3.0], [19200.0, 6.0], [18600.0, 9.0], [18800.0, 1.0], [19000.0, 1.0], [19400.0, 3.0], [19600.0, 5.0], [20000.0, 9.0], [19800.0, 3.0], [20200.0, 8.0], [20400.0, 15.0], [20600.0, 6.0], [20800.0, 5.0], [21000.0, 2.0], [21400.0, 2.0], [21800.0, 4.0], [21600.0, 2.0], [22000.0, 3.0], [22400.0, 4.0], [23200.0, 1.0], [22600.0, 4.0], [22800.0, 1.0], [24000.0, 2.0], [24200.0, 2.0], [23600.0, 1.0], [23800.0, 3.0], [24400.0, 3.0], [24600.0, 1.0], [24800.0, 3.0], [25000.0, 1.0], [25200.0, 1.0], [25400.0, 2.0], [25600.0, 2.0], [25800.0, 3.0], [26000.0, 2.0], [26200.0, 1.0], [26400.0, 2.0], [26600.0, 2.0], [27600.0, 3.0], [26800.0, 1.0], [27200.0, 2.0], [27400.0, 1.0], [28400.0, 2.0], [28600.0, 2.0], [27800.0, 1.0], [29400.0, 1.0], [28800.0, 1.0], [29000.0, 2.0], [29200.0, 1.0], [29600.0, 1.0], [29800.0, 2.0], [30000.0, 2.0], [30200.0, 2.0], [30400.0, 1.0], [30600.0, 1.0], [31200.0, 2.0], [30800.0, 4.0], [31000.0, 1.0], [31400.0, 2.0], [31800.0, 4.0], [32000.0, 2.0], [32200.0, 1.0], [32600.0, 3.0], [33600.0, 1.0], [32800.0, 1.0], [33200.0, 2.0], [35600.0, 1.0], [38400.0, 1.0], [33100.0, 1.0], [37100.0, 1.0], [40300.0, 1.0], [17300.0, 5.0], [16500.0, 2.0], [16700.0, 5.0], [16900.0, 2.0], [17100.0, 9.0], [18300.0, 7.0], [17700.0, 9.0], [17900.0, 9.0], [17500.0, 8.0], [18100.0, 8.0], [18900.0, 7.0], [18500.0, 7.0], [18700.0, 1.0], [19100.0, 4.0], [19300.0, 5.0], [19500.0, 8.0], [19700.0, 1.0], [19900.0, 5.0], [20100.0, 7.0], [20300.0, 17.0], [20500.0, 12.0], [20700.0, 6.0], [20900.0, 5.0], [21100.0, 2.0], [21300.0, 3.0], [21700.0, 1.0], [21900.0, 3.0], [22100.0, 2.0], [22300.0, 2.0], [22500.0, 1.0], [22900.0, 4.0], [23300.0, 3.0], [22700.0, 2.0], [23500.0, 2.0], [24100.0, 1.0], [23700.0, 2.0], [23900.0, 2.0], [24500.0, 2.0], [25100.0, 1.0], [24700.0, 1.0], [24900.0, 2.0], [25300.0, 3.0], [25500.0, 2.0], [25700.0, 2.0], [25900.0, 2.0], [26100.0, 3.0], [26500.0, 1.0], [26300.0, 1.0], [26900.0, 2.0], [27100.0, 3.0], [27300.0, 3.0], [27900.0, 2.0], [28300.0, 1.0], [28500.0, 2.0], [27700.0, 3.0], [29100.0, 3.0], [28700.0, 2.0], [28900.0, 1.0], [29300.0, 2.0], [29500.0, 1.0], [29700.0, 2.0], [30700.0, 3.0], [29900.0, 2.0], [30100.0, 2.0], [30300.0, 4.0], [30500.0, 1.0], [31100.0, 5.0], [30900.0, 3.0], [31300.0, 3.0], [31500.0, 5.0], [31700.0, 2.0], [31900.0, 4.0], [32100.0, 7.0], [32500.0, 2.0], [32700.0, 2.0], [33000.0, 3.0]], "isOverall": false, "label": "ReadTodo", "isController": false}, {"data": [[4800.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1464", "isController": false}, {"data": [[29500.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1585", "isController": false}, {"data": [[35200.0, 1.0]], "isOverall": false, "label": "DeleteTask 1509", "isController": false}, {"data": [[16000.0, 1.0]], "isOverall": false, "label": "DeleteTask 1292", "isController": false}, {"data": [[23200.0, 1.0]], "isOverall": false, "label": "DeleteTask 1291", "isController": false}, {"data": [[23600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1290", "isController": false}, {"data": [[29700.0, 1.0]], "isOverall": false, "label": "DeleteTask 1330", "isController": false}, {"data": [[29000.0, 1.0]], "isOverall": false, "label": "DeleteTask 1295", "isController": false}, {"data": [[32400.0, 1.0]], "isOverall": false, "label": "DeleteTask 1334", "isController": false}, {"data": [[30700.0, 1.0]], "isOverall": false, "label": "DeleteTask 1332", "isController": false}, {"data": [[32500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1453", "isController": false}, {"data": [[28300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1298", "isController": false}, {"data": [[30600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1573", "isController": false}, {"data": [[31300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1338", "isController": false}, {"data": [[32100.0, 1.0]], "isOverall": false, "label": "DeleteTask 1459", "isController": false}, {"data": [[31700.0, 1.0]], "isOverall": false, "label": "DeleteTask 1578", "isController": false}, {"data": [[22600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1335", "isController": false}, {"data": [[31300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1339", "isController": false}, {"data": [[26300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1282", "isController": false}, {"data": [[23700.0, 1.0]], "isOverall": false, "label": "DeleteTask 1281", "isController": false}, {"data": [[30300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1286", "isController": false}, {"data": [[31700.0, 1.0]], "isOverall": false, "label": "DeleteTask 1561", "isController": false}, {"data": [[29800.0, 1.0]], "isOverall": false, "label": "DeleteTask 1285", "isController": false}, {"data": [[31000.0, 1.0]], "isOverall": false, "label": "DeleteTask 1284", "isController": false}, {"data": [[25600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1283", "isController": false}, {"data": [[30000.0, 1.0]], "isOverall": false, "label": "DeleteTask 1289", "isController": false}, {"data": [[29400.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1805", "isController": false}, {"data": [[31800.0, 1.0]], "isOverall": false, "label": "DeleteTask 1442", "isController": false}, {"data": [[32300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1287", "isController": false}, {"data": [[32900.0, 4.0], [34900.0, 1.0], [35300.0, 1.0], [300.0, 1.0], [400.0, 2.0], [1500.0, 1.0], [2000.0, 1.0], [2100.0, 1.0], [2200.0, 4.0], [3800.0, 1.0], [4000.0, 1.0], [4200.0, 4.0], [4300.0, 2.0], [4500.0, 1.0], [4700.0, 1.0], [4800.0, 2.0], [5000.0, 1.0], [5100.0, 1.0], [5200.0, 2.0], [5300.0, 1.0], [5600.0, 2.0], [5500.0, 1.0], [5800.0, 3.0], [5700.0, 1.0], [6000.0, 1.0], [6100.0, 1.0], [5900.0, 1.0], [6200.0, 3.0], [6300.0, 1.0], [6400.0, 3.0], [6500.0, 2.0], [6600.0, 2.0], [6700.0, 1.0], [7100.0, 2.0], [7000.0, 1.0], [7200.0, 2.0], [7400.0, 1.0], [8100.0, 1.0], [8300.0, 1.0], [9200.0, 1.0], [9300.0, 1.0], [9900.0, 2.0], [10100.0, 1.0], [10700.0, 1.0], [11000.0, 1.0], [11700.0, 2.0], [11600.0, 1.0], [11900.0, 1.0], [11800.0, 1.0], [12100.0, 1.0], [12300.0, 1.0], [12600.0, 3.0], [13300.0, 1.0], [12800.0, 1.0], [13000.0, 3.0], [13100.0, 3.0], [14100.0, 1.0], [14300.0, 3.0], [14000.0, 1.0], [14800.0, 1.0], [14400.0, 3.0], [15200.0, 4.0], [15300.0, 1.0], [15100.0, 2.0], [15000.0, 1.0], [15600.0, 1.0], [15500.0, 5.0], [15700.0, 1.0], [15400.0, 1.0], [16100.0, 3.0], [16200.0, 2.0], [16000.0, 3.0], [17400.0, 3.0], [17000.0, 4.0], [16600.0, 1.0], [17200.0, 3.0], [16800.0, 1.0], [16400.0, 1.0], [17600.0, 7.0], [18200.0, 11.0], [17800.0, 7.0], [18000.0, 8.0], [18400.0, 2.0], [19200.0, 4.0], [18600.0, 6.0], [18800.0, 5.0], [19000.0, 5.0], [19400.0, 35.0], [19600.0, 9.0], [19800.0, 14.0], [20000.0, 6.0], [20200.0, 11.0], [20400.0, 11.0], [21000.0, 1.0], [21200.0, 3.0], [21400.0, 2.0], [20600.0, 13.0], [20800.0, 1.0], [22200.0, 1.0], [22400.0, 1.0], [23200.0, 4.0], [22800.0, 1.0], [23000.0, 1.0], [23400.0, 1.0], [23600.0, 2.0], [24000.0, 2.0], [24200.0, 2.0], [23800.0, 1.0], [24400.0, 1.0], [24800.0, 3.0], [24600.0, 6.0], [25000.0, 6.0], [25200.0, 1.0], [25400.0, 1.0], [26200.0, 2.0], [25600.0, 1.0], [25800.0, 1.0], [26400.0, 3.0], [26000.0, 2.0], [27400.0, 4.0], [27600.0, 2.0], [27000.0, 2.0], [26800.0, 1.0], [28600.0, 3.0], [28200.0, 1.0], [28000.0, 2.0], [28800.0, 3.0], [29600.0, 2.0], [29200.0, 2.0], [30400.0, 2.0], [30000.0, 3.0], [30200.0, 2.0], [30600.0, 1.0], [29800.0, 1.0], [31400.0, 6.0], [31000.0, 4.0], [31200.0, 5.0], [31600.0, 8.0], [30800.0, 3.0], [31800.0, 5.0], [32000.0, 7.0], [32200.0, 4.0], [32400.0, 9.0], [32600.0, 4.0], [32800.0, 8.0], [33100.0, 2.0], [35500.0, 1.0], [16700.0, 3.0], [17100.0, 8.0], [16900.0, 1.0], [16500.0, 1.0], [17300.0, 4.0], [17500.0, 4.0], [17700.0, 1.0], [18100.0, 7.0], [17900.0, 3.0], [18300.0, 8.0], [18500.0, 6.0], [18700.0, 2.0], [18900.0, 6.0], [19100.0, 4.0], [19300.0, 10.0], [19500.0, 8.0], [19700.0, 16.0], [19900.0, 13.0], [20100.0, 8.0], [20300.0, 12.0], [21300.0, 3.0], [20500.0, 18.0], [20700.0, 4.0], [21500.0, 1.0], [21100.0, 2.0], [22100.0, 2.0], [22300.0, 5.0], [22500.0, 1.0], [23500.0, 3.0], [23300.0, 2.0], [22900.0, 1.0], [24500.0, 4.0], [24100.0, 1.0], [23900.0, 2.0], [24300.0, 1.0], [24700.0, 3.0], [24900.0, 1.0], [25100.0, 1.0], [25300.0, 3.0], [25500.0, 1.0], [26300.0, 1.0], [26500.0, 2.0], [25900.0, 3.0], [26700.0, 3.0], [27500.0, 4.0], [27300.0, 4.0], [27100.0, 2.0], [27900.0, 3.0], [27700.0, 1.0], [28500.0, 1.0], [28300.0, 4.0], [28100.0, 2.0], [28700.0, 3.0], [29100.0, 2.0], [30100.0, 9.0], [30300.0, 3.0], [29900.0, 2.0], [30700.0, 4.0], [29700.0, 1.0], [30900.0, 5.0], [31100.0, 8.0], [31300.0, 8.0], [31500.0, 5.0], [31700.0, 4.0], [31900.0, 4.0], [32300.0, 7.0], [32100.0, 5.0], [32500.0, 5.0], [32700.0, 6.0], [33000.0, 3.0], [37400.0, 2.0]], "isOverall": false, "label": "ReadTask", "isController": false}, {"data": [[22900.0, 1.0]], "isOverall": false, "label": "DeleteTask 1271", "isController": false}, {"data": [[16500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1270", "isController": false}, {"data": [[26500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1275", "isController": false}, {"data": [[31500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1396", "isController": false}, {"data": [[31400.0, 1.0]], "isOverall": false, "label": "DeleteTask 1274", "isController": false}, {"data": [[29000.0, 1.0]], "isOverall": false, "label": "DeleteTask 1273", "isController": false}, {"data": [[31600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1272", "isController": false}, {"data": [[25200.0, 1.0]], "isOverall": false, "label": "DeleteTask 1312", "isController": false}, {"data": [[26300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1279", "isController": false}, {"data": [[17200.0, 1.0]], "isOverall": false, "label": "DeleteTask 1278", "isController": false}, {"data": [[35600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1399", "isController": false}, {"data": [[26600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1277", "isController": false}, {"data": [[23500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1276", "isController": false}, {"data": [[29500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1316", "isController": false}, {"data": [[40300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1439", "isController": false}, {"data": [[27000.0, 1.0]], "isOverall": false, "label": "DeleteTask 1438", "isController": false}, {"data": [[18700.0, 1.0]], "isOverall": false, "label": "DeleteTask 1260", "isController": false}, {"data": [[18900.0, 1.0]], "isOverall": false, "label": "DeleteTask 1264", "isController": false}, {"data": [[32300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1385", "isController": false}, {"data": [[18800.0, 1.0]], "isOverall": false, "label": "DeleteTask 1263", "isController": false}, {"data": [[31500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1262", "isController": false}, {"data": [[0.0, 42.0], [100.0, 5.0], [33300.0, 2.0], [36500.0, 1.0], [400.0, 1.0], [500.0, 2.0], [600.0, 12.0], [700.0, 24.0], [800.0, 5.0], [900.0, 2.0], [1000.0, 6.0], [1100.0, 1.0], [1200.0, 16.0], [1300.0, 11.0], [1500.0, 1.0], [1600.0, 40.0], [1700.0, 44.0], [1800.0, 26.0], [1900.0, 15.0], [2000.0, 1.0], [2100.0, 1.0], [2200.0, 10.0], [2300.0, 1.0], [2400.0, 6.0], [2500.0, 18.0], [2600.0, 7.0], [2800.0, 13.0], [2700.0, 3.0], [2900.0, 12.0], [3000.0, 6.0], [3100.0, 3.0], [3200.0, 5.0], [3300.0, 9.0], [3400.0, 5.0], [3500.0, 12.0], [3700.0, 5.0], [3600.0, 6.0], [3900.0, 1.0], [4000.0, 1.0], [4300.0, 6.0], [4100.0, 2.0], [4400.0, 1.0], [4500.0, 3.0], [4600.0, 2.0], [5000.0, 1.0], [5300.0, 1.0], [5200.0, 1.0], [5600.0, 1.0], [5500.0, 1.0], [5700.0, 1.0], [5900.0, 1.0], [6000.0, 4.0], [6100.0, 1.0], [6200.0, 1.0], [6300.0, 1.0], [6400.0, 3.0], [6500.0, 1.0], [6700.0, 2.0], [6900.0, 1.0], [7200.0, 1.0], [7400.0, 1.0], [7500.0, 1.0], [7600.0, 2.0], [7700.0, 1.0], [8000.0, 2.0], [8400.0, 1.0], [8600.0, 1.0], [8500.0, 1.0], [9000.0, 1.0], [9500.0, 1.0], [10600.0, 1.0], [11200.0, 2.0], [11300.0, 1.0], [11700.0, 1.0], [12100.0, 2.0], [12000.0, 2.0], [11900.0, 1.0], [12200.0, 1.0], [12300.0, 1.0], [12500.0, 5.0], [13100.0, 1.0], [13800.0, 8.0], [13900.0, 3.0], [14100.0, 1.0], [14500.0, 1.0], [14800.0, 1.0], [14600.0, 1.0], [15000.0, 1.0], [15300.0, 2.0], [15100.0, 1.0], [14900.0, 1.0], [15600.0, 2.0], [15700.0, 3.0], [15800.0, 3.0], [15400.0, 2.0], [15500.0, 2.0], [16000.0, 4.0], [16200.0, 2.0], [15900.0, 2.0], [16300.0, 2.0], [16600.0, 15.0], [17000.0, 11.0], [17400.0, 8.0], [17200.0, 4.0], [16400.0, 2.0], [16800.0, 3.0], [17600.0, 4.0], [17800.0, 5.0], [18000.0, 5.0], [18200.0, 4.0], [18400.0, 3.0], [18800.0, 4.0], [19200.0, 12.0], [18600.0, 7.0], [19000.0, 4.0], [19400.0, 14.0], [20000.0, 24.0], [20400.0, 2.0], [20200.0, 9.0], [19800.0, 37.0], [19600.0, 10.0], [20800.0, 1.0], [20600.0, 2.0], [21400.0, 1.0], [21200.0, 2.0], [21600.0, 2.0], [22200.0, 1.0], [21800.0, 1.0], [22000.0, 1.0], [22600.0, 3.0], [23000.0, 2.0], [24200.0, 2.0], [24000.0, 1.0], [24400.0, 1.0], [24800.0, 1.0], [25000.0, 1.0], [25400.0, 4.0], [25600.0, 3.0], [26600.0, 4.0], [27200.0, 4.0], [27600.0, 2.0], [27000.0, 1.0], [27800.0, 3.0], [28000.0, 1.0], [28200.0, 2.0], [28800.0, 1.0], [29000.0, 5.0], [29400.0, 2.0], [29600.0, 3.0], [30000.0, 1.0], [29800.0, 1.0], [30200.0, 2.0], [30400.0, 1.0], [30600.0, 2.0], [30800.0, 7.0], [31200.0, 4.0], [31400.0, 2.0], [31600.0, 4.0], [31800.0, 1.0], [32200.0, 2.0], [32400.0, 1.0], [33200.0, 1.0], [35600.0, 1.0], [17300.0, 10.0], [16900.0, 6.0], [16700.0, 9.0], [17100.0, 6.0], [16500.0, 4.0], [17700.0, 2.0], [17500.0, 6.0], [17900.0, 3.0], [18100.0, 5.0], [18300.0, 9.0], [18500.0, 5.0], [18700.0, 5.0], [18900.0, 7.0], [19100.0, 7.0], [19300.0, 8.0], [20300.0, 11.0], [19500.0, 12.0], [20100.0, 13.0], [19900.0, 40.0], [19700.0, 38.0], [20500.0, 1.0], [20700.0, 1.0], [21100.0, 2.0], [21300.0, 1.0], [22300.0, 1.0], [21700.0, 4.0], [21900.0, 2.0], [22500.0, 2.0], [23100.0, 1.0], [22700.0, 2.0], [22900.0, 2.0], [23500.0, 1.0], [24300.0, 1.0], [23900.0, 4.0], [24100.0, 4.0], [23700.0, 3.0], [24500.0, 3.0], [24700.0, 2.0], [24900.0, 1.0], [25100.0, 1.0], [25300.0, 2.0], [25700.0, 3.0], [26300.0, 3.0], [26100.0, 2.0], [26500.0, 2.0], [26900.0, 6.0], [27100.0, 13.0], [27300.0, 7.0], [27500.0, 6.0], [26700.0, 1.0], [28100.0, 2.0], [27700.0, 13.0], [28300.0, 2.0], [28500.0, 10.0], [29100.0, 2.0], [29300.0, 1.0], [29500.0, 7.0], [28700.0, 3.0], [29700.0, 1.0], [30100.0, 2.0], [30300.0, 5.0], [30500.0, 5.0], [30700.0, 8.0], [31100.0, 10.0], [30900.0, 3.0], [31300.0, 6.0], [31500.0, 1.0], [31700.0, 3.0], [31900.0, 1.0], [32100.0, 2.0], [32300.0, 1.0], [32500.0, 2.0], [33800.0, 1.0], [36200.0, 2.0]], "isOverall": false, "label": "CreateTask", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "DeleteTask 1261", "isController": false}, {"data": [[31200.0, 1.0]], "isOverall": false, "label": "DeleteTask 1382", "isController": false}, {"data": [[12800.0, 1.0]], "isOverall": false, "label": "DeleteTask 1301", "isController": false}, {"data": [[25400.0, 1.0]], "isOverall": false, "label": "DeleteTask 1268", "isController": false}, {"data": [[30500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1422", "isController": false}, {"data": [[13600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1267", "isController": false}, {"data": [[17600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1300", "isController": false}, {"data": [[17500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1266", "isController": false}, {"data": [[26100.0, 1.0]], "isOverall": false, "label": "DeleteTask 1425", "isController": false}, {"data": [[31700.0, 1.0]], "isOverall": false, "label": "DeleteTask 1302", "isController": false}, {"data": [[31300.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1785", "isController": false}, {"data": [[30900.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1786", "isController": false}, {"data": [[30600.0, 1.0]], "isOverall": false, "label": "DeleteTask 1307", "isController": false}, {"data": [[32200.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1784", "isController": false}, {"data": [[30700.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1788", "isController": false}, {"data": [[17400.0, 1.0]], "isOverall": false, "label": "DeleteTask 1257", "isController": false}, {"data": [[26500.0, 1.0]], "isOverall": false, "label": "DeleteTask 1256", "isController": false}, {"data": [[28300.0, 1.0]], "isOverall": false, "label": "DeleteTask 1498", "isController": false}, {"data": [[16400.0, 1.0]], "isOverall": false, "label": "DeleteTask 1259", "isController": false}, {"data": [[31100.0, 1.0]], "isOverall": false, "label": "DeleteTask 1534", "isController": false}, {"data": [[31400.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1718", "isController": false}, {"data": [[16700.0, 1.0]], "isOverall": false, "label": "DeleteTask 1258", "isController": false}, {"data": [[32100.0, 1.0]], "isOverall": false, "label": "DeleteTask 1539", "isController": false}, {"data": [[30600.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1795", "isController": false}, {"data": [[0.0, 1.0], [3100.0, 1.0], [5200.0, 1.0], [5300.0, 1.0], [11600.0, 1.0], [12600.0, 1.0], [13200.0, 1.0], [12800.0, 1.0], [12900.0, 1.0], [13900.0, 2.0], [14000.0, 2.0], [14300.0, 2.0], [14400.0, 1.0], [14800.0, 1.0], [14900.0, 1.0], [15400.0, 2.0], [15700.0, 1.0], [15600.0, 1.0], [16200.0, 1.0], [15900.0, 2.0], [16300.0, 4.0], [17300.0, 6.0], [16900.0, 7.0], [16700.0, 10.0], [17100.0, 6.0], [17400.0, 5.0], [16500.0, 8.0], [17200.0, 6.0], [16600.0, 9.0], [17000.0, 9.0], [16800.0, 3.0], [16400.0, 4.0], [18200.0, 3.0], [17700.0, 3.0], [17500.0, 11.0], [17600.0, 6.0], [18100.0, 3.0], [18000.0, 5.0], [17900.0, 6.0], [17800.0, 2.0], [18300.0, 6.0], [18400.0, 2.0], [18500.0, 7.0], [18900.0, 9.0], [19000.0, 8.0], [18800.0, 9.0], [19200.0, 5.0], [18600.0, 5.0], [19400.0, 5.0], [19300.0, 6.0], [19100.0, 2.0], [18700.0, 2.0], [19700.0, 16.0], [19500.0, 10.0], [19900.0, 12.0], [19800.0, 18.0], [20000.0, 9.0], [20200.0, 7.0], [20100.0, 6.0], [20300.0, 6.0], [20400.0, 1.0], [19600.0, 10.0], [21200.0, 2.0], [20600.0, 2.0], [20500.0, 1.0], [20800.0, 1.0], [21100.0, 3.0], [21000.0, 1.0], [21500.0, 1.0], [21900.0, 1.0], [21800.0, 1.0], [22500.0, 1.0], [21700.0, 4.0], [21600.0, 1.0], [22600.0, 1.0], [23400.0, 1.0], [22900.0, 2.0], [24200.0, 1.0], [24500.0, 3.0], [23700.0, 3.0], [23900.0, 1.0], [25000.0, 1.0], [24600.0, 1.0], [24700.0, 1.0], [25300.0, 1.0], [25700.0, 1.0], [26100.0, 1.0], [26600.0, 3.0], [26800.0, 2.0], [26700.0, 1.0], [26900.0, 1.0], [27200.0, 1.0], [27600.0, 2.0], [27300.0, 2.0], [27100.0, 1.0], [28200.0, 3.0], [28100.0, 1.0], [28400.0, 1.0], [28000.0, 1.0], [27800.0, 3.0], [28700.0, 2.0], [29100.0, 3.0], [29600.0, 2.0], [29500.0, 4.0], [29000.0, 2.0], [30200.0, 1.0], [30100.0, 2.0], [30300.0, 1.0], [30400.0, 2.0], [30600.0, 3.0], [30500.0, 3.0], [30700.0, 2.0], [29700.0, 1.0], [30800.0, 1.0], [31100.0, 4.0], [31200.0, 5.0], [31000.0, 2.0], [30900.0, 1.0], [31400.0, 1.0], [31300.0, 2.0], [31500.0, 1.0], [31700.0, 5.0], [31600.0, 2.0], [31800.0, 1.0], [31900.0, 2.0], [32200.0, 4.0], [32100.0, 2.0], [32300.0, 2.0], [32400.0, 2.0], [32800.0, 1.0], [34200.0, 1.0]], "isOverall": false, "label": "UpdateTodo", "isController": false}, {"data": [[0.0, 103.0], [100.0, 98.0], [34500.0, 1.0], [200.0, 49.0], [300.0, 61.0], [400.0, 26.0], [500.0, 36.0], [600.0, 1.0], [1000.0, 1.0], [1100.0, 1.0], [1200.0, 4.0], [1300.0, 1.0], [1700.0, 1.0], [1800.0, 8.0], [1900.0, 4.0], [2000.0, 4.0], [2100.0, 2.0], [2200.0, 6.0], [2400.0, 3.0], [2500.0, 2.0], [2700.0, 1.0], [2900.0, 4.0], [3000.0, 4.0], [3100.0, 3.0], [3300.0, 1.0], [3400.0, 5.0], [3500.0, 7.0], [3600.0, 5.0], [3700.0, 2.0], [3900.0, 4.0], [4000.0, 2.0], [4500.0, 1.0], [4600.0, 1.0], [4800.0, 1.0], [4900.0, 2.0], [5100.0, 1.0], [5000.0, 1.0], [5300.0, 4.0], [5400.0, 2.0], [5700.0, 1.0], [5800.0, 1.0], [6300.0, 1.0], [6400.0, 1.0], [6500.0, 1.0], [6600.0, 1.0], [6700.0, 7.0], [6800.0, 1.0], [7100.0, 2.0], [8000.0, 1.0], [8700.0, 1.0], [8800.0, 5.0], [8900.0, 1.0], [10100.0, 2.0], [10400.0, 1.0], [10300.0, 1.0], [11200.0, 1.0], [11500.0, 2.0], [11700.0, 6.0], [11400.0, 1.0], [11600.0, 4.0], [12000.0, 4.0], [12100.0, 1.0], [12200.0, 2.0], [12700.0, 2.0], [12300.0, 2.0], [12500.0, 5.0], [12400.0, 1.0], [12900.0, 3.0], [13000.0, 1.0], [13600.0, 2.0], [13800.0, 3.0], [13700.0, 1.0], [13900.0, 3.0], [14000.0, 2.0], [14200.0, 2.0], [14100.0, 2.0], [14800.0, 8.0], [14700.0, 4.0], [14900.0, 4.0], [15200.0, 2.0], [15100.0, 5.0], [15000.0, 1.0], [15400.0, 2.0], [15600.0, 9.0], [15800.0, 9.0], [15500.0, 2.0], [15700.0, 5.0], [16300.0, 8.0], [16200.0, 5.0], [16100.0, 5.0], [16000.0, 5.0], [15900.0, 8.0], [16600.0, 13.0], [16800.0, 7.0], [17200.0, 43.0], [17400.0, 48.0], [16400.0, 11.0], [17000.0, 24.0], [18400.0, 22.0], [17600.0, 34.0], [17800.0, 11.0], [18000.0, 43.0], [18200.0, 34.0], [19200.0, 21.0], [18600.0, 40.0], [18800.0, 27.0], [19000.0, 10.0], [19400.0, 15.0], [20200.0, 8.0], [19600.0, 8.0], [20000.0, 14.0], [19800.0, 14.0], [20400.0, 2.0], [20600.0, 4.0], [21000.0, 3.0], [21200.0, 3.0], [20800.0, 1.0], [21800.0, 4.0], [21600.0, 3.0], [22000.0, 2.0], [23000.0, 2.0], [22600.0, 1.0], [23200.0, 1.0], [23600.0, 2.0], [24200.0, 3.0], [23800.0, 3.0], [24000.0, 2.0], [24600.0, 2.0], [25000.0, 1.0], [25400.0, 2.0], [25600.0, 1.0], [26200.0, 1.0], [26000.0, 1.0], [26800.0, 3.0], [28200.0, 2.0], [29000.0, 1.0], [29400.0, 1.0], [29800.0, 1.0], [30200.0, 1.0], [30600.0, 3.0], [30400.0, 1.0], [30800.0, 3.0], [31000.0, 5.0], [31200.0, 7.0], [31400.0, 3.0], [31600.0, 5.0], [31800.0, 1.0], [32200.0, 6.0], [32000.0, 1.0], [32400.0, 3.0], [38000.0, 1.0], [33900.0, 1.0], [36700.0, 1.0], [37500.0, 1.0], [39500.0, 1.0], [16700.0, 13.0], [17300.0, 42.0], [16500.0, 16.0], [16900.0, 12.0], [17100.0, 29.0], [18100.0, 26.0], [17700.0, 40.0], [17500.0, 55.0], [17900.0, 25.0], [18300.0, 49.0], [18500.0, 27.0], [18700.0, 17.0], [18900.0, 29.0], [19100.0, 9.0], [19300.0, 14.0], [19700.0, 15.0], [19500.0, 6.0], [20100.0, 9.0], [19900.0, 18.0], [20300.0, 4.0], [20700.0, 2.0], [20900.0, 2.0], [21300.0, 2.0], [21500.0, 2.0], [20500.0, 3.0], [21700.0, 3.0], [22500.0, 1.0], [22700.0, 3.0], [22900.0, 2.0], [24300.0, 1.0], [23900.0, 2.0], [23700.0, 1.0], [24700.0, 3.0], [24900.0, 1.0], [25300.0, 1.0], [25500.0, 1.0], [26100.0, 1.0], [26500.0, 1.0], [26900.0, 2.0], [28100.0, 2.0], [28700.0, 1.0], [29500.0, 2.0], [30500.0, 5.0], [29700.0, 1.0], [30300.0, 5.0], [30100.0, 1.0], [30700.0, 3.0], [30900.0, 4.0], [31100.0, 2.0], [31300.0, 3.0], [31500.0, 2.0], [31700.0, 5.0], [31900.0, 3.0], [32100.0, 3.0], [32300.0, 3.0], [39000.0, 1.0]], "isOverall": false, "label": "CreateTodo", "isController": false}, {"data": [[32100.0, 1.0]], "isOverall": false, "label": "DeleteTask 1362", "isController": false}, {"data": [[22700.0, 1.0]], "isOverall": false, "label": "DeleteTask 1360", "isController": false}, {"data": [[29500.0, 1.0]], "isOverall": false, "label": "DeleteTodo 1728", "isController": false}, {"data": [[28100.0, 1.0]], "isOverall": false, "label": "DeleteTask 1404", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 40300.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 158.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 4711.0, "series": [{"data": [[0.0, 394.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 158.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 4711.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 48.0, "minX": 1.61064462E12, "maxY": 371.8164464023494, "series": [{"data": [[1.61064474E12, 194.50773195876297], [1.61064462E12, 51.13333333333333], [1.61064468E12, 371.8164464023494]], "isOverall": false, "label": "stressTest", "isController": false}, {"data": [[1.61064474E12, 112.01793721973097], [1.61064462E12, 300.0], [1.61064468E12, 296.59090909090907]], "isOverall": false, "label": "soakTest", "isController": false}, {"data": [[1.61064474E12, 48.0], [1.61064462E12, 99.98765432098769], [1.61064468E12, 324.49859943977617]], "isOverall": false, "label": "spikeTest", "isController": false}, {"data": [[1.61064474E12, 168.25438596491236], [1.61064462E12, 133.5142857142857], [1.61064468E12, 300.0]], "isOverall": false, "label": "loadTest", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.61064474E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 1.5, "minX": 1.0, "maxY": 40340.0, "series": [{"data": [[1044.0, 21524.0]], "isOverall": false, "label": "DeleteTask 1473", "isController": false}, {"data": [[1044.0, 21524.0]], "isOverall": false, "label": "DeleteTask 1473-Aggregated", "isController": false}, {"data": [[293.0, 31931.0]], "isOverall": false, "label": "DeleteTask 1352", "isController": false}, {"data": [[293.0, 31931.0]], "isOverall": false, "label": "DeleteTask 1352-Aggregated", "isController": false}, {"data": [[1152.0, 16545.0]], "isOverall": false, "label": "DeleteTask 1356", "isController": false}, {"data": [[1152.0, 16545.0]], "isOverall": false, "label": "DeleteTask 1356-Aggregated", "isController": false}, {"data": [[199.0, 32273.0]], "isOverall": false, "label": "DeleteTask 1475", "isController": false}, {"data": [[199.0, 32273.0]], "isOverall": false, "label": "DeleteTask 1475-Aggregated", "isController": false}, {"data": [[244.0, 32000.0]], "isOverall": false, "label": "DeleteTask 1359", "isController": false}, {"data": [[244.0, 32000.0]], "isOverall": false, "label": "DeleteTask 1359-Aggregated", "isController": false}, {"data": [[746.0, 29363.0]], "isOverall": false, "label": "DeleteTask 1358", "isController": false}, {"data": [[746.0, 29363.0]], "isOverall": false, "label": "DeleteTask 1358-Aggregated", "isController": false}, {"data": [[530.0, 30696.0]], "isOverall": false, "label": "DeleteTask 1357", "isController": false}, {"data": [[530.0, 30696.0]], "isOverall": false, "label": "DeleteTask 1357-Aggregated", "isController": false}, {"data": [[933.0, 26176.0]], "isOverall": false, "label": "DeleteTodo 1731", "isController": false}, {"data": [[933.0, 26176.0]], "isOverall": false, "label": "DeleteTodo 1731-Aggregated", "isController": false}, {"data": [[948.0, 28739.0]], "isOverall": false, "label": "DeleteTodo 1732", "isController": false}, {"data": [[948.0, 28739.0]], "isOverall": false, "label": "DeleteTodo 1732-Aggregated", "isController": false}, {"data": [[108.0, 30300.0], [119.0, 30564.0], [122.0, 30514.0], [121.0, 38445.0], [126.0, 30724.0], [164.0, 36827.0], [211.0, 32181.0], [221.0, 36565.0], [220.0, 32254.0], [219.0, 32254.0], [231.0, 32104.0], [227.0, 32387.0], [254.0, 31615.0], [281.0, 31710.5], [276.0, 31670.0], [275.0, 31672.0], [302.0, 31941.0], [316.0, 35727.0], [332.0, 31392.0], [351.0, 31600.0], [339.0, 31409.0], [366.0, 31379.0], [360.0, 31373.0], [357.0, 35364.0], [356.0, 35362.0], [355.0, 31599.0], [353.0, 35324.0], [382.0, 35092.0], [381.0, 31349.0], [376.0, 31451.0], [395.0, 31315.0], [388.0, 31114.0], [385.0, 34824.0], [412.0, 27112.0], [404.0, 31236.0], [401.0, 31252.0], [400.0, 31264.0], [430.0, 31259.0], [426.0, 31321.0], [424.0, 31105.0], [423.0, 31145.0], [435.0, 31242.0], [433.0, 31345.0], [463.0, 31017.0], [478.0, 30812.0], [477.0, 30812.0], [476.0, 30812.0], [474.0, 30822.0], [486.0, 30838.0], [481.0, 30842.0], [510.0, 31124.0], [507.0, 31111.0], [496.0, 31153.0], [534.0, 34012.0], [529.0, 33912.0], [525.0, 30705.0], [517.0, 30925.0], [513.0, 30979.0], [573.0, 30583.0], [570.0, 33344.0], [568.0, 30605.0], [562.0, 30659.0], [560.0, 30651.0], [552.0, 30807.0], [549.0, 26799.0], [545.0, 30535.0], [607.0, 30716.0], [591.0, 30721.0], [585.0, 30667.0], [582.0, 30601.0], [581.0, 30605.0], [579.0, 30577.0], [576.0, 30619.0], [636.0, 30325.0], [634.0, 30318.0], [631.0, 30307.0], [629.0, 30315.0], [628.0, 30312.0], [623.0, 30499.0], [617.0, 30573.0], [613.0, 30654.0], [609.0, 30728.0], [670.0, 32189.0], [663.0, 30279.0], [658.0, 30237.0], [657.0, 30210.0], [702.0, 29515.0], [698.0, 29409.0], [691.0, 26697.0], [679.0, 29879.0], [674.0, 30075.0], [734.0, 29555.0], [730.0, 29658.0], [729.0, 29655.0], [717.0, 29558.0], [713.0, 29563.0], [709.0, 26463.0], [706.0, 29512.0], [752.0, 29176.0], [751.0, 29178.0], [747.0, 29375.0], [742.0, 29442.0], [738.0, 29533.0], [798.0, 28191.0], [779.0, 28565.0], [774.0, 28580.0], [769.0, 28768.0], [823.0, 25262.0], [821.0, 28097.0], [809.0, 28210.0], [802.0, 28203.0], [846.0, 27750.0], [844.0, 25683.0], [895.0, 26920.0], [865.0, 27372.0], [926.0, 26311.0], [925.0, 26499.0], [921.0, 26500.0], [913.0, 29026.0], [907.0, 26670.0], [905.0, 26668.0], [900.0, 26935.0], [953.0, 26105.0], [957.0, 25787.0], [935.0, 14894.0], [958.0, 24084.0], [955.0, 25786.0], [952.0, 26192.0], [947.0, 26339.0], [945.0, 26340.0], [940.0, 26159.0], [930.0, 26163.0], [939.0, 26158.0], [938.0, 26159.0], [936.0, 26155.0], [987.0, 25374.0], [985.0, 25375.0], [975.0, 25371.0], [972.0, 25381.0], [967.0, 25675.0], [1020.0, 24693.0], [1017.0, 24698.0], [1014.0, 24823.0], [1001.0, 24691.0], [998.0, 27749.0], [992.0, 25151.0], [1058.0, 22951.0], [1081.0, 22518.0], [1070.0, 22771.0], [1064.0, 22949.0], [1060.0, 22945.0], [1056.0, 25705.0], [1045.0, 26480.0], [1033.0, 26824.0], [1027.0, 24538.0], [1038.0, 23699.0], [1037.0, 24113.0], [1146.0, 17292.833333333332], [1145.0, 17027.0], [1148.0, 16913.0], [1144.0, 20271.0], [1134.0, 21109.0], [1132.0, 21110.0], [1129.0, 21221.0], [1123.0, 21351.0], [1115.0, 21162.0], [1101.0, 21733.0], [1096.0, 21723.0], [1114.0, 11068.0], [1113.0, 21221.0], [1161.0, 17713.666666666668], [1193.0, 17084.0], [1194.0, 18565.2], [1195.0, 17918.0], [1191.0, 10220.5], [1192.0, 17481.5], [1187.0, 17322.333333333332], [1178.0, 17182.5], [1173.0, 16810.0], [1175.0, 16365.0], [1168.0, 16697.0], [1170.0, 16683.4], [1155.0, 20413.0], [1160.0, 16918.5], [1163.0, 16759.0], [1162.0, 19995.0], [1164.0, 16611.5], [1167.0, 16714.0], [1184.0, 18606.0], [1185.0, 16270.5], [1186.0, 17275.5], [1245.0, 15067.0], [1238.0, 17023.0], [1339.0, 19156.0], [1329.0, 19273.0], [1304.0, 15933.0], [1302.0, 17493.0], [1300.0, 17592.0], [1280.0, 8114.0], [1394.0, 18115.0], [1385.0, 18044.0], [1375.0, 17941.0], [1469.0, 13781.333333333334], [1467.0, 811.0], [1441.0, 9888.5], [1497.0, 19672.0], [1477.0, 18723.666666666668], [1487.0, 14328.5], [1505.0, 19673.0], [1489.0, 19982.333333333332], [1490.0, 20116.0], [1496.0, 19531.25], [1492.0, 18181.0], [1488.0, 19913.0], [1498.0, 19793.0], [1500.0, 19855.75], [1501.0, 19881.0], [1503.0, 19873.333333333332], [1473.0, 16991.0], [1472.0, 20514.0], [1502.0, 19831.0]], "isOverall": false, "label": "UpdateTask", "isController": false}, {"data": [[898.1520912547533, 24605.8403041825]], "isOverall": false, "label": "UpdateTask-Aggregated", "isController": false}, {"data": [[245.0, 31999.0]], "isOverall": false, "label": "DeleteTask 1341", "isController": false}, {"data": [[245.0, 31999.0]], "isOverall": false, "label": "DeleteTask 1341-Aggregated", "isController": false}, {"data": [[377.0, 31450.0]], "isOverall": false, "label": "DeleteTask 1340", "isController": false}, {"data": [[377.0, 31450.0]], "isOverall": false, "label": "DeleteTask 1340-Aggregated", "isController": false}, {"data": [[886.0, 25513.0]], "isOverall": false, "label": "DeleteTask 1344", "isController": false}, {"data": [[886.0, 25513.0]], "isOverall": false, "label": "DeleteTask 1344-Aggregated", "isController": false}, {"data": [[695.0, 29553.0]], "isOverall": false, "label": "DeleteTask 1349", "isController": false}, {"data": [[695.0, 29553.0]], "isOverall": false, "label": "DeleteTask 1349-Aggregated", "isController": false}, {"data": [[610.0, 30728.0]], "isOverall": false, "label": "DeleteTask 1469", "isController": false}, {"data": [[610.0, 30728.0]], "isOverall": false, "label": "DeleteTask 1469-Aggregated", "isController": false}, {"data": [[522.0, 30802.0]], "isOverall": false, "label": "DeleteTask 1348", "isController": false}, {"data": [[522.0, 30802.0]], "isOverall": false, "label": "DeleteTask 1348-Aggregated", "isController": false}, {"data": [[741.0, 29440.0]], "isOverall": false, "label": "DeleteTask 1347", "isController": false}, {"data": [[741.0, 29440.0]], "isOverall": false, "label": "DeleteTask 1347-Aggregated", "isController": false}, {"data": [[66.0, 40340.0], [93.0, 39786.0], [134.0, 38456.0], [157.0, 33139.0], [156.0, 33206.0], [152.0, 33318.0], [171.0, 33214.0], [182.0, 32999.0], [181.0, 33043.0], [180.0, 33047.0], [184.0, 33050.0], [198.0, 32962.0], [206.0, 32852.0], [209.0, 37107.0], [228.0, 32692.0], [249.0, 32624.0], [271.0, 32624.0], [267.0, 32701.0], [261.0, 32766.0], [278.0, 32554.0], [274.0, 32588.0], [304.0, 32259.0], [334.0, 27733.0], [333.0, 27776.0], [325.0, 32161.0], [323.0, 32132.0], [340.0, 32185.0], [367.0, 32125.0], [365.0, 32137.0], [359.0, 31923.0], [358.0, 32135.0], [398.0, 32016.0], [392.0, 32036.0], [389.0, 35601.0], [415.0, 32111.0], [409.0, 31917.0], [407.0, 27628.0], [402.0, 27649.0], [428.0, 31802.0], [422.0, 31785.0], [420.0, 31839.0], [440.0, 612.0], [445.0, 721.0], [446.0, 722.0], [447.0, 724.8571428571428], [436.0, 31859.0], [448.0, 784.0], [461.0, 1066.0], [463.0, 1137.0], [462.0, 31934.0], [459.0, 34930.0], [458.0, 31925.0], [468.0, 16506.0], [469.0, 1277.0], [470.0, 1065.3333333333333], [471.0, 1328.4], [472.0, 27770.0], [467.0, 31865.0], [485.0, 1671.0], [486.0, 1710.0], [492.0, 1765.0], [493.0, 6989.8], [494.0, 1409.3333333333333], [487.0, 31587.0], [497.0, 1905.0], [501.0, 305.0], [508.0, 15850.0], [511.0, 31188.0], [500.0, 31439.0], [517.0, 2527.0], [513.0, 2354.0], [514.0, 1103.5], [516.0, 1583.3333333333333], [515.0, 31312.0], [521.0, 1390.0], [524.0, 31503.0], [530.0, 435.0], [528.0, 31446.0], [531.0, 2229.0], [534.0, 2322.0], [533.0, 31522.0], [537.0, 2938.0], [541.0, 1781.0], [548.0, 2534.0], [549.0, 1631.0], [568.0, 485.0], [569.0, 2526.0], [571.0, 2027.0], [572.0, 11196.666666666666], [573.0, 2074.0], [575.0, 2089.0], [552.0, 514.0], [553.0, 2409.0], [554.0, 17563.0], [558.0, 1679.0], [559.0, 2264.0], [564.0, 1869.0], [567.0, 2457.0], [590.0, 2675.0], [576.0, 2335.0], [582.0, 2485.0], [583.0, 4087.0], [585.0, 2536.0], [586.0, 2563.0], [589.0, 2642.0], [587.0, 31395.0], [591.0, 3307.0], [592.0, 17643.0], [606.0, 30955.0], [603.0, 4114.0], [601.0, 31116.0], [605.0, 4186.0], [600.0, 17593.5], [636.0, 4866.0], [623.0, 4540.0], [614.0, 13164.333333333334], [611.0, 33601.0], [615.0, 31067.0], [622.0, 4519.0], [619.0, 31135.0], [626.0, 17745.5], [628.0, 4664.5], [630.0, 4705.0], [631.0, 4714.0], [637.0, 4884.0], [638.0, 17957.0], [639.0, 30862.0], [625.0, 30924.0], [646.0, 5120.0], [642.0, 5004.0], [647.0, 11283.25], [649.0, 13697.666666666666], [651.0, 5237.0], [652.0, 5256.0], [653.0, 17992.5], [656.0, 18030.0], [669.0, 5420.0], [670.0, 5729.0], [667.0, 18060.0], [672.0, 4651.5], [673.0, 4677.0], [675.0, 30362.0], [678.0, 30302.0], [676.0, 30293.0], [686.0, 5002.0], [685.0, 30514.0], [684.0, 30147.0], [680.0, 30353.0], [691.0, 5937.0], [693.0, 5203.0], [695.0, 5207.0], [696.0, 17688.0], [697.0, 5968.0], [687.0, 30345.0], [732.0, 4737.0], [714.0, 6308.0], [712.0, 29970.0], [715.0, 29956.0], [716.0, 6370.0], [723.0, 6528.0], [724.0, 6577.0], [725.0, 6604.0], [727.0, 31298.0], [726.0, 27113.0], [729.0, 5696.5], [734.0, 7529.0], [731.0, 29879.0], [760.0, 18210.0], [742.0, 7014.0], [743.0, 7050.5], [746.0, 7118.0], [745.0, 29522.0], [744.0, 29610.0], [749.0, 29365.0], [748.0, 31166.0], [750.0, 7197.0], [751.0, 5169.0], [736.0, 29773.0], [752.0, 6223.0], [753.0, 17789.5], [762.0, 7204.0], [765.0, 14517.0], [763.0, 29985.0], [771.0, 7422.0], [779.0, 7999.5], [769.0, 7353.0], [782.0, 8308.666666666666], [783.0, 8420.0], [774.0, 7486.0], [775.0, 7549.0], [784.0, 8529.333333333334], [798.0, 10091.0], [799.0, 10190.0], [796.0, 14640.0], [797.0, 18737.5], [794.0, 9600.666666666666], [795.0, 9724.5], [792.0, 9425.5], [793.0, 9526.0], [785.0, 8660.333333333334], [786.0, 8821.0], [787.0, 8834.0], [788.0, 12980.6], [789.0, 9123.333333333334], [790.0, 19780.0], [791.0, 9398.0], [776.0, 14812.666666666668], [777.0, 7743.5], [778.0, 7854.5], [780.0, 8064.5], [781.0, 8176.0], [803.0, 10670.333333333334], [800.0, 10349.5], [814.0, 20251.75], [815.0, 16132.5], [812.0, 11690.5], [813.0, 11807.5], [810.0, 18354.8], [811.0, 14687.5], [801.0, 16576.0], [802.0, 10572.0], [804.0, 9437.333333333334], [805.0, 10940.0], [806.0, 16958.0], [807.0, 11594.0], [816.0, 17536.0], [830.0, 13193.0], [831.0, 13306.0], [828.0, 13126.0], [827.0, 27933.0], [829.0, 12277.666666666666], [824.0, 12287.0], [826.0, 20434.0], [818.0, 12093.0], [819.0, 15807.6], [820.0, 12339.25], [822.0, 19351.5], [823.0, 11421.0], [808.0, 11678.0], [809.0, 11376.5], [835.0, 13784.0], [832.0, 13492.0], [846.0, 14781.666666666666], [847.0, 14890.5], [844.0, 14569.5], [845.0, 14655.0], [842.0, 14395.0], [843.0, 14466.333333333334], [833.0, 19043.0], [834.0, 13336.75], [836.0, 13886.5], [837.0, 14012.0], [838.0, 14130.0], [839.0, 14291.0], [848.0, 15015.666666666666], [861.0, 16123.0], [858.0, 16562.5], [860.0, 16000.333333333332], [856.0, 15740.0], [857.0, 15780.5], [849.0, 15129.0], [850.0, 15193.333333333334], [851.0, 15324.0], [853.0, 15448.0], [852.0, 29869.0], [854.0, 15567.5], [855.0, 15660.0], [840.0, 14389.0], [841.0, 14438.0], [865.0, 16456.2], [864.0, 16381.0], [879.0, 17658.5], [866.0, 16538.0], [868.0, 16779.5], [869.0, 21559.6], [870.0, 16868.0], [882.0, 17788.0], [893.0, 21053.0], [895.0, 18249.0], [890.0, 22939.5], [889.0, 27259.0], [891.0, 27311.0], [892.0, 21365.0], [883.0, 17895.333333333332], [884.0, 17937.0], [885.0, 18007.0], [886.0, 18161.0], [872.0, 17089.5], [873.0, 20966.0], [874.0, 18449.0], [876.0, 27321.0], [878.0, 18956.0], [903.0, 22745.0], [908.0, 18684.0], [897.0, 15643.0], [898.0, 18327.0], [901.0, 18356.0], [902.0, 27114.0], [912.0, 8898.0], [924.0, 18940.0], [925.0, 26885.0], [926.0, 19094.0], [920.0, 18636.0], [922.0, 18805.0], [914.0, 11104.5], [915.0, 18563.0], [916.0, 18525.0], [917.0, 18642.0], [919.0, 26955.0], [904.0, 18607.0], [905.0, 17640.333333333332], [907.0, 23990.5], [910.0, 18553.0], [911.0, 15959.0], [930.0, 19178.5], [931.0, 24132.0], [934.0, 26526.0], [936.0, 19351.0], [937.0, 26488.0], [939.0, 19499.5], [941.0, 19565.0], [943.0, 24813.0], [928.0, 26690.0], [957.0, 26035.0], [947.0, 26409.0], [954.0, 26147.0], [953.0, 26123.0], [952.0, 26269.0], [990.0, 25369.0], [989.0, 25491.0], [988.0, 25649.0], [987.0, 25738.0], [969.0, 25887.0], [968.0, 27350.5], [963.0, 25877.0], [962.0, 25970.0], [999.0, 25320.0], [1021.0, 24853.5], [1019.0, 24912.0], [1015.0, 26305.0], [1010.0, 25096.0], [1006.0, 25272.0], [998.0, 25401.0], [997.0, 25516.5], [993.0, 24610.5], [1075.0, 29184.0], [1081.0, 22613.0], [1080.0, 21917.5], [1085.0, 22414.5], [1057.0, 23527.0], [1056.0, 23527.0], [1066.0, 25710.0], [1065.0, 23355.5], [1084.0, 22473.0], [1083.0, 22635.0], [1079.0, 22793.0], [1076.0, 22869.0], [1073.0, 22913.0], [1072.0, 22970.0], [1054.0, 23658.0], [1029.0, 24458.5], [1027.0, 24601.0], [1035.0, 24492.0], [1030.0, 24587.5], [1037.0, 24291.0], [1036.0, 22076.0], [1051.0, 23752.0], [1049.0, 23847.0], [1047.0, 23950.0], [1040.0, 24032.0], [1143.0, 19667.0], [1115.0, 15160.0], [1090.0, 22395.0], [1089.0, 22460.0], [1103.0, 22025.0], [1095.0, 22189.5], [1114.0, 24266.0], [1112.0, 21644.0], [1111.0, 21732.333333333332], [1110.0, 21963.0], [1108.0, 21224.75], [1104.0, 21937.0], [1136.0, 22961.0], [1142.0, 20366.285714285714], [1139.0, 19657.0], [1138.0, 21001.0], [1144.0, 14300.0], [1145.0, 18738.0], [1146.0, 18081.0], [1147.0, 17921.0], [1148.0, 18136.0], [1149.0, 17598.5], [1150.0, 17342.333333333332], [1125.0, 21483.0], [1123.0, 21484.0], [1130.0, 21352.0], [1128.0, 21384.0], [1135.0, 21117.0], [1134.0, 22632.0], [1154.0, 17260.0], [1181.0, 17949.0], [1203.0, 18204.0], [1190.0, 17755.14285714286], [1191.0, 15665.0], [1192.0, 18072.0], [1194.0, 17209.0], [1193.0, 18202.0], [1195.0, 18149.0], [1187.0, 18233.666666666668], [1186.0, 18645.0], [1188.0, 12091.5], [1183.0, 13809.75], [1182.0, 18904.0], [1158.0, 9493.5], [1160.0, 15695.8], [1161.0, 17155.5], [1162.0, 17331.0], [1163.0, 18369.0], [1165.0, 16814.5], [1166.0, 17271.666666666668], [1167.0, 18228.666666666668], [1157.0, 19680.6], [1155.0, 17422.5], [1156.0, 19008.0], [1153.0, 17412.0], [1152.0, 18252.0], [1184.0, 17841.75], [1185.0, 17533.571428571428], [1179.0, 17677.0], [1180.0, 17645.0], [1178.0, 17632.0], [1172.0, 18854.666666666668], [1168.0, 11985.5], [1169.0, 17381.5], [1170.0, 17377.0], [1171.0, 19098.6], [1173.0, 17739.0], [1174.0, 19232.333333333332], [1176.0, 18309.5], [1177.0, 17978.0], [1240.0, 19547.0], [1235.0, 19653.0], [1264.0, 19653.0], [1270.0, 19713.0], [1272.0, 16782.5], [1250.0, 18157.0], [1237.0, 18154.0], [1236.0, 16655.0], [1234.0, 18317.0], [1287.0, 19846.0], [1293.0, 19918.0], [1317.0, 1715.0], [1302.0, 17211.0], [1301.0, 5662.0], [1299.0, 18362.0], [1300.0, 16698.0], [1297.0, 16725.0], [1404.0, 17664.0], [1398.0, 19259.0], [1394.0, 19287.0], [1375.0, 19345.0], [1353.0, 19314.0], [1345.0, 19300.0], [1463.0, 20304.333333333332], [1425.0, 20034.0], [1423.0, 20826.0], [1445.0, 19902.0], [1447.0, 19922.0], [1449.0, 3873.0], [1451.0, 19844.0], [1452.0, 21867.0], [1461.0, 18678.666666666668], [1462.0, 20192.0], [1465.0, 18554.333333333332], [1466.0, 20081.0], [1467.0, 20179.0], [1468.0, 19978.0], [1469.0, 20426.4], [1470.0, 20466.5], [1441.0, 1612.0], [1498.0, 20145.5], [1480.0, 5652.0], [1474.0, 20478.0], [1501.0, 14978.857142857143], [1502.0, 16448.8], [1503.0, 20333.5], [1499.0, 23268.0], [1500.0, 20325.666666666668], [1496.0, 12299.8], [1497.0, 20192.0], [1494.0, 20299.75], [1495.0, 16022.25], [1490.0, 20539.0], [1491.0, 15047.666666666666], [1489.0, 20223.8], [1488.0, 20767.0], [1475.0, 20500.0], [1479.0, 20391.0], [1481.0, 20413.0], [1483.0, 20596.0], [1482.0, 20143.5], [1484.0, 25140.0], [1485.0, 18886.0], [1486.0, 20709.0], [1487.0, 16145.375], [1504.0, 20429.666666666668], [1505.0, 20383.0]], "isOverall": false, "label": "ReadTodo", "isController": false}, {"data": [[918.4430803571427, 16786.888392857138]], "isOverall": false, "label": "ReadTodo-Aggregated", "isController": false}, {"data": [[1185.0, 4805.0]], "isOverall": false, "label": "DeleteTodo 1464", "isController": false}, {"data": [[1185.0, 4805.0]], "isOverall": false, "label": "DeleteTodo 1464-Aggregated", "isController": false}, {"data": [[719.0, 29554.0]], "isOverall": false, "label": "DeleteTodo 1585", "isController": false}, {"data": [[719.0, 29554.0]], "isOverall": false, "label": "DeleteTodo 1585-Aggregated", "isController": false}, {"data": [[328.0, 35267.0]], "isOverall": false, "label": "DeleteTask 1509", "isController": false}, {"data": [[328.0, 35267.0]], "isOverall": false, "label": "DeleteTask 1509-Aggregated", "isController": false}, {"data": [[1344.0, 16080.0]], "isOverall": false, "label": "DeleteTask 1292", "isController": false}, {"data": [[1344.0, 16080.0]], "isOverall": false, "label": "DeleteTask 1292-Aggregated", "isController": false}, {"data": [[1002.0, 23239.0]], "isOverall": false, "label": "DeleteTask 1291", "isController": false}, {"data": [[1002.0, 23239.0]], "isOverall": false, "label": "DeleteTask 1291-Aggregated", "isController": false}, {"data": [[1051.0, 23670.0]], "isOverall": false, "label": "DeleteTask 1290", "isController": false}, {"data": [[1051.0, 23670.0]], "isOverall": false, "label": "DeleteTask 1290-Aggregated", "isController": false}, {"data": [[692.0, 29722.0]], "isOverall": false, "label": "DeleteTask 1330", "isController": false}, {"data": [[692.0, 29722.0]], "isOverall": false, "label": "DeleteTask 1330-Aggregated", "isController": false}, {"data": [[78.0, 29062.0]], "isOverall": false, "label": "DeleteTask 1295", "isController": false}, {"data": [[78.0, 29062.0]], "isOverall": false, "label": "DeleteTask 1295-Aggregated", "isController": false}, {"data": [[195.0, 32492.0]], "isOverall": false, "label": "DeleteTask 1334", "isController": false}, {"data": [[195.0, 32492.0]], "isOverall": false, "label": "DeleteTask 1334-Aggregated", "isController": false}, {"data": [[590.0, 30720.0]], "isOverall": false, "label": "DeleteTask 1332", "isController": false}, {"data": [[590.0, 30720.0]], "isOverall": false, "label": "DeleteTask 1332-Aggregated", "isController": false}, {"data": [[175.0, 32538.0]], "isOverall": false, "label": "DeleteTask 1453", "isController": false}, {"data": [[175.0, 32538.0]], "isOverall": false, "label": "DeleteTask 1453-Aggregated", "isController": false}, {"data": [[792.0, 28389.0]], "isOverall": false, "label": "DeleteTask 1298", "isController": false}, {"data": [[792.0, 28389.0]], "isOverall": false, "label": "DeleteTask 1298-Aggregated", "isController": false}, {"data": [[533.0, 30686.0]], "isOverall": false, "label": "DeleteTask 1573", "isController": false}, {"data": [[533.0, 30686.0]], "isOverall": false, "label": "DeleteTask 1573-Aggregated", "isController": false}, {"data": [[331.0, 31392.0]], "isOverall": false, "label": "DeleteTask 1338", "isController": false}, {"data": [[331.0, 31392.0]], "isOverall": false, "label": "DeleteTask 1338-Aggregated", "isController": false}, {"data": [[230.0, 32104.0]], "isOverall": false, "label": "DeleteTask 1459", "isController": false}, {"data": [[230.0, 32104.0]], "isOverall": false, "label": "DeleteTask 1459-Aggregated", "isController": false}, {"data": [[311.0, 31782.0]], "isOverall": false, "label": "DeleteTask 1578", "isController": false}, {"data": [[311.0, 31782.0]], "isOverall": false, "label": "DeleteTask 1578-Aggregated", "isController": false}, {"data": [[1073.0, 22680.0]], "isOverall": false, "label": "DeleteTask 1335", "isController": false}, {"data": [[1073.0, 22680.0]], "isOverall": false, "label": "DeleteTask 1335-Aggregated", "isController": false}, {"data": [[326.0, 31347.0]], "isOverall": false, "label": "DeleteTask 1339", "isController": false}, {"data": [[326.0, 31347.0]], "isOverall": false, "label": "DeleteTask 1339-Aggregated", "isController": false}, {"data": [[720.0, 26329.0]], "isOverall": false, "label": "DeleteTask 1282", "isController": false}, {"data": [[720.0, 26329.0]], "isOverall": false, "label": "DeleteTask 1282-Aggregated", "isController": false}, {"data": [[1039.0, 23700.0]], "isOverall": false, "label": "DeleteTask 1281", "isController": false}, {"data": [[1039.0, 23700.0]], "isOverall": false, "label": "DeleteTask 1281-Aggregated", "isController": false}, {"data": [[654.0, 30383.0]], "isOverall": false, "label": "DeleteTask 1286", "isController": false}, {"data": [[654.0, 30383.0]], "isOverall": false, "label": "DeleteTask 1286-Aggregated", "isController": false}, {"data": [[312.0, 31743.0]], "isOverall": false, "label": "DeleteTask 1561", "isController": false}, {"data": [[312.0, 31743.0]], "isOverall": false, "label": "DeleteTask 1561-Aggregated", "isController": false}, {"data": [[683.0, 29889.0]], "isOverall": false, "label": "DeleteTask 1285", "isController": false}, {"data": [[683.0, 29889.0]], "isOverall": false, "label": "DeleteTask 1285-Aggregated", "isController": false}, {"data": [[390.0, 31068.0]], "isOverall": false, "label": "DeleteTask 1284", "isController": false}, {"data": [[390.0, 31068.0]], "isOverall": false, "label": "DeleteTask 1284-Aggregated", "isController": false}, {"data": [[968.0, 25677.0]], "isOverall": false, "label": "DeleteTask 1283", "isController": false}, {"data": [[968.0, 25677.0]], "isOverall": false, "label": "DeleteTask 1283-Aggregated", "isController": false}, {"data": [[673.0, 30071.0]], "isOverall": false, "label": "DeleteTask 1289", "isController": false}, {"data": [[673.0, 30071.0]], "isOverall": false, "label": "DeleteTask 1289-Aggregated", "isController": false}, {"data": [[87.0, 29416.0]], "isOverall": false, "label": "DeleteTodo 1805", "isController": false}, {"data": [[87.0, 29416.0]], "isOverall": false, "label": "DeleteTodo 1805-Aggregated", "isController": false}, {"data": [[268.0, 31801.0]], "isOverall": false, "label": "DeleteTask 1442", "isController": false}, {"data": [[268.0, 31801.0]], "isOverall": false, "label": "DeleteTask 1442-Aggregated", "isController": false}, {"data": [[660.0, 32354.0]], "isOverall": false, "label": "DeleteTask 1287", "isController": false}, {"data": [[660.0, 32354.0]], "isOverall": false, "label": "DeleteTask 1287-Aggregated", "isController": false}, {"data": [[2.0, 24202.0], [3.0, 24405.0], [4.0, 24791.0], [5.0, 24824.0], [6.0, 25057.0], [7.0, 24759.0], [8.0, 25910.0], [9.0, 25992.0], [10.0, 25052.0], [11.0, 25968.0], [12.0, 26519.0], [15.0, 26783.0], [16.0, 26890.0], [17.0, 27020.0], [18.0, 27067.0], [19.0, 27121.0], [20.0, 27151.0], [21.0, 27303.0], [22.0, 27344.0], [23.0, 27309.0], [24.0, 27341.0], [25.0, 27504.0], [26.0, 27528.0], [27.0, 27477.0], [28.0, 27648.0], [29.0, 27560.0], [30.0, 27536.0], [31.0, 27902.0], [32.0, 27904.0], [34.0, 28024.0], [37.0, 28179.0], [36.0, 28014.0], [39.0, 28334.0], [38.0, 28176.0], [41.0, 28297.0], [40.0, 28344.0], [43.0, 28308.0], [45.0, 28311.0], [47.0, 28566.0], [49.0, 28664.0], [51.0, 28691.0], [52.0, 28793.0], [55.0, 28710.0], [57.0, 29115.0], [56.0, 28899.0], [59.0, 29208.0], [58.0, 29152.0], [63.0, 29282.0], [65.0, 29942.0], [64.0, 29830.0], [71.0, 30104.0], [69.0, 29710.0], [68.0, 29699.0], [75.0, 30197.0], [74.0, 30111.0], [73.0, 30073.0], [77.0, 30122.0], [83.0, 30169.0], [82.0, 30036.0], [86.0, 30667.0], [84.0, 30281.0], [91.0, 30882.0], [90.0, 30900.0], [89.0, 30740.0], [88.0, 30714.0], [94.0, 31009.0], [92.0, 31031.0], [97.0, 30983.0], [103.0, 31134.0], [102.0, 30830.0], [100.0, 30851.0], [107.0, 31148.0], [106.0, 31160.0], [105.0, 31152.0], [104.0, 31000.0], [111.0, 31379.0], [110.0, 31102.0], [109.0, 31128.0], [115.0, 31635.0], [114.0, 31509.0], [113.0, 31558.0], [112.0, 31349.0], [118.0, 31755.0], [117.0, 31712.0], [116.0, 31630.0], [120.0, 31857.0], [127.0, 31904.0], [124.0, 31848.0], [133.0, 32139.0], [132.0, 32183.0], [131.0, 32027.0], [129.0, 32009.0], [128.0, 31949.0], [143.0, 32622.0], [142.0, 32530.0], [140.0, 32529.0], [139.0, 32561.0], [138.0, 32601.0], [137.0, 32435.0], [136.0, 32411.0], [151.0, 32971.0], [150.0, 32908.0], [149.0, 33008.0], [148.0, 32740.0], [147.0, 32829.0], [145.0, 32624.0], [144.0, 32690.0], [158.0, 37471.0], [155.0, 33125.0], [153.0, 33059.0], [167.0, 32880.0], [163.0, 32867.0], [162.0, 37432.0], [160.0, 32975.0], [170.0, 32899.0], [183.0, 32829.0], [179.0, 32932.0], [176.0, 33013.0], [191.0, 32724.0], [187.0, 32772.0], [196.0, 32825.0], [207.0, 32767.0], [204.0, 32803.0], [203.0, 19702.0], [202.0, 32743.0], [200.0, 32858.0], [213.0, 32743.0], [229.0, 32478.0], [239.0, 32334.0], [235.0, 32332.0], [232.0, 32402.0], [246.0, 21240.0], [242.0, 32340.0], [241.0, 32419.0], [240.0, 32294.0], [255.0, 32384.0], [252.0, 32410.0], [251.0, 32507.0], [250.0, 32585.0], [248.0, 32499.0], [269.0, 23818.0], [266.0, 23089.0], [260.0, 32361.0], [258.0, 32384.0], [257.0, 22345.0], [283.0, 32415.0], [282.0, 32472.0], [303.0, 32156.0], [300.0, 32259.0], [298.0, 32273.0], [289.0, 24514.0], [318.0, 26496.0], [317.0, 26265.0], [314.0, 32103.0], [313.0, 32064.0], [311.0, 32046.0], [309.0, 25015.0], [335.0, 35572.0], [322.0, 32256.0], [321.0, 32078.0], [348.0, 32122.0], [338.0, 31912.0], [336.0, 32030.0], [362.0, 31747.0], [383.0, 32052.0], [378.0, 31650.0], [375.0, 35389.0], [372.0, 31804.0], [368.0, 31623.0], [399.0, 31854.0], [397.0, 31706.0], [391.0, 31811.0], [384.0, 31986.0], [427.0, 31661.0], [447.0, 31575.0], [440.0, 31546.0], [439.0, 31641.0], [434.0, 34906.0], [456.0, 31455.0], [455.0, 31488.0], [452.0, 31412.0], [451.0, 31428.0], [449.0, 31449.0], [448.0, 31666.0], [479.0, 31523.0], [464.0, 31619.0], [508.0, 364.0], [505.0, 31304.0], [501.0, 31317.0], [542.0, 31372.0], [532.0, 2230.5], [530.0, 2204.0], [534.0, 2263.0], [540.0, 27794.0], [536.0, 31238.0], [535.0, 27486.0], [531.0, 31301.0], [523.0, 27430.0], [518.0, 30985.0], [520.0, 31226.0], [549.0, 2101.5], [574.0, 31140.0], [563.0, 31289.0], [559.0, 31365.0], [557.0, 31385.0], [592.0, 3843.0], [604.0, 4099.0], [602.0, 31002.0], [598.0, 31161.0], [595.0, 31214.0], [577.0, 31288.0], [608.0, 4210.0], [609.0, 4242.0], [610.0, 4238.5], [623.0, 30903.0], [621.0, 30909.0], [668.0, 30291.0], [665.0, 30377.0], [659.0, 30484.0], [648.0, 30752.0], [646.0, 30767.0], [688.0, 478.0], [676.0, 5619.0], [686.0, 5013.0], [672.0, 30334.0], [692.0, 5838.0], [696.0, 5872.0], [677.0, 30133.0], [697.0, 31452.0], [694.0, 30114.0], [693.0, 30014.0], [690.0, 30192.0], [704.0, 18026.5], [705.0, 4373.0], [706.0, 6161.0], [709.0, 6206.0], [710.0, 6244.0], [712.0, 6281.0], [733.0, 4765.0], [757.0, 6347.0], [759.0, 16798.0], [762.0, 26595.0], [740.0, 29624.0], [797.0, 9932.0], [778.0, 7284.0], [777.0, 28771.0], [780.0, 19794.0], [790.0, 19176.0], [791.0, 8300.0], [792.0, 9390.0], [773.0, 30475.0], [772.0, 28852.0], [798.0, 10155.0], [799.0, 17561.0], [794.0, 28841.0], [807.0, 11995.0], [800.0, 6598.0], [805.0, 6450.0], [806.0, 11072.0], [813.0, 11854.0], [816.0, 10768.0], [830.0, 13161.0], [829.0, 27906.0], [827.0, 13001.0], [828.0, 12209.0], [824.0, 12651.5], [826.0, 12828.0], [817.0, 12131.0], [818.0, 16356.0], [821.0, 12387.0], [823.0, 12978.0], [856.0, 15612.0], [837.0, 6767.0], [832.0, 425.0], [847.0, 26059.0], [838.0, 6639.0], [839.0, 32309.0], [841.0, 15284.0], [846.0, 14802.0], [851.0, 10540.5], [852.0, 15310.0], [855.0, 9589.666666666666], [861.0, 21773.5], [859.0, 27611.0], [862.0, 16164.0], [863.0, 16267.0], [876.0, 17402.0], [868.0, 16748.0], [869.0, 15625.5], [888.0, 14970.0], [891.0, 18102.0], [892.0, 13342.0], [895.0, 18224.0], [880.0, 17643.0], [881.0, 17652.0], [882.0, 15127.0], [883.0, 16492.5], [884.0, 17863.0], [886.0, 18116.0], [887.0, 18194.5], [872.0, 18207.0], [873.0, 17105.0], [874.0, 14408.0], [877.0, 5707.0], [878.0, 17558.5], [879.0, 17557.5], [902.0, 18392.0], [898.0, 18176.0], [896.0, 14120.5], [910.0, 21074.0], [899.0, 18207.0], [900.0, 17793.8], [901.0, 18312.0], [912.0, 17553.666666666668], [926.0, 18906.5], [927.0, 18953.0], [924.0, 21480.0], [925.0, 19672.0], [922.0, 21462.0], [923.0, 18809.0], [920.0, 18619.0], [921.0, 19994.5], [913.0, 22675.5], [914.0, 20182.0], [916.0, 21250.333333333332], [917.0, 18437.5], [918.0, 21922.0], [919.0, 21210.5], [904.0, 18381.0], [905.0, 18362.0], [908.0, 18658.666666666668], [909.0, 18737.0], [931.0, 16627.0], [928.0, 18987.5], [943.0, 19456.5], [940.0, 17805.333333333332], [942.0, 21796.666666666668], [938.0, 19422.0], [939.0, 19399.0], [929.0, 19081.0], [930.0, 18986.0], [932.0, 19155.0], [933.0, 19169.0], [934.0, 19192.666666666668], [935.0, 16776.5], [957.0, 25895.0], [951.0, 26369.0], [954.0, 24502.0], [936.0, 19274.0], [937.0, 19359.0], [990.0, 25306.0], [988.0, 25513.0], [984.0, 25448.0], [979.0, 25692.0], [968.0, 7198.0], [1023.0, 24617.0], [1022.0, 24620.0], [1010.0, 7450.0], [1008.0, 25027.0], [999.0, 7074.0], [998.0, 25132.0], [993.0, 25238.0], [1060.0, 19354.5], [1050.0, 19370.5], [1055.0, 23514.0], [1037.0, 24052.0], [1034.0, 24391.0], [1031.0, 24227.0], [1027.0, 22512.0], [1061.0, 19354.0], [1065.0, 7264.0], [1074.0, 19459.0], [1082.0, 19472.0], [1085.0, 22398.0], [1057.0, 23266.0], [1081.0, 22396.5], [1068.0, 22963.0], [1067.0, 20856.0], [1094.0, 20788.5], [1088.0, 19518.0], [1098.0, 19391.0], [1095.0, 22218.0], [1108.0, 19470.0], [1109.0, 19469.0], [1112.0, 19427.0], [1127.0, 19495.0], [1130.0, 19437.0], [1134.0, 21158.0], [1139.0, 19412.0], [1143.0, 19378.0], [1142.0, 19407.0], [1141.0, 18207.0], [1148.0, 15297.666666666666], [1146.0, 17857.0], [1147.0, 17679.0], [1144.0, 15944.5], [1145.0, 16268.333333333334], [1153.0, 17104.5], [1164.0, 20514.5], [1158.0, 19415.0], [1152.0, 16543.0], [1181.0, 17619.0], [1183.0, 18801.0], [1155.0, 16182.333333333334], [1156.0, 17388.5], [1157.0, 9801.0], [1154.0, 17096.0], [1161.0, 19447.0], [1163.0, 18698.5], [1166.0, 12961.5], [1200.0, 19583.0], [1205.0, 19470.0], [1209.0, 19505.0], [1210.0, 19464.0], [1213.0, 19432.0], [1184.0, 16096.0], [1178.0, 18479.5], [1177.0, 17347.0], [1174.0, 17186.0], [1176.0, 4821.0], [1172.0, 17231.0], [1173.0, 17027.0], [1170.0, 17144.5], [1169.0, 19607.0], [1171.0, 4517.0], [1180.0, 19499.0], [1187.0, 19527.0], [1189.0, 18133.666666666668], [1190.0, 14371.5], [1192.0, 18020.0], [1194.0, 18022.4], [1188.0, 18085.0], [1225.0, 19427.0], [1230.0, 19438.0], [1235.0, 19451.0], [1234.0, 16213.0], [1238.0, 17234.5], [1244.0, 19482.0], [1245.0, 19444.0], [1253.0, 19494.0], [1267.0, 19660.0], [1276.0, 19721.0], [1272.0, 18108.0], [1290.0, 19705.0], [1286.0, 19754.0], [1291.0, 19688.0], [1297.0, 19683.0], [1309.0, 19721.0], [1311.0, 19708.0], [1316.0, 19710.0], [1321.0, 19590.0], [1327.0, 18811.0], [1336.0, 19655.0], [1337.0, 12803.5], [1338.0, 19636.5], [1375.0, 19816.0], [1346.0, 19592.0], [1344.0, 1574.0], [1397.0, 19728.0], [1362.0, 19442.0], [1364.0, 19766.0], [1366.0, 19727.0], [1385.0, 15528.0], [1387.0, 17709.5], [1389.0, 19720.0], [1391.0, 19707.0], [1456.0, 19845.0], [1412.0, 19883.0], [1413.0, 19868.0], [1420.0, 19884.0], [1435.0, 19796.0], [1441.0, 20249.5], [1445.0, 19743.0], [1457.0, 24690.0], [1461.0, 19967.8], [1462.0, 21475.333333333332], [1463.0, 22378.75], [1464.0, 20008.8], [1465.0, 20337.18181818182], [1466.0, 19212.0], [1467.0, 19089.0], [1468.0, 19914.5], [1469.0, 19700.0], [1471.0, 21827.333333333332], [1476.0, 19846.833333333332], [1473.0, 24936.0], [1472.0, 20458.2], [1502.0, 23278.0], [1503.0, 20189.0], [1500.0, 20285.5], [1501.0, 20587.555555555555], [1495.0, 20004.8], [1496.0, 22855.0], [1497.0, 19919.0], [1493.0, 21454.666666666668], [1494.0, 20137.0], [1491.0, 22697.833333333332], [1492.0, 23624.0], [1488.0, 22998.333333333336], [1489.0, 19932.75], [1490.0, 20626.75], [1475.0, 20577.333333333332], [1478.0, 19752.8], [1477.0, 20430.75], [1479.0, 19382.75], [1481.0, 24812.0], [1483.0, 20546.75], [1484.0, 5105.0], [1485.0, 17387.2], [1486.0, 20482.5], [1487.0, 21110.0], [1504.0, 20277.0], [1482.0, 20510.0], [1480.0, 20349.0], [1.0, 23493.0]], "isOverall": false, "label": "ReadTask", "isController": false}, {"data": [[861.6068027210886, 21679.19319727888]], "isOverall": false, "label": "ReadTask-Aggregated", "isController": false}, {"data": [[1063.0, 22949.0]], "isOverall": false, "label": "DeleteTask 1271", "isController": false}, {"data": [[1063.0, 22949.0]], "isOverall": false, "label": "DeleteTask 1271-Aggregated", "isController": false}, {"data": [[1160.0, 16568.0]], "isOverall": false, "label": "DeleteTask 1270", "isController": false}, {"data": [[1160.0, 16568.0]], "isOverall": false, "label": "DeleteTask 1270-Aggregated", "isController": false}, {"data": [[920.0, 26502.0]], "isOverall": false, "label": "DeleteTask 1275", "isController": false}, {"data": [[920.0, 26502.0]], "isOverall": false, "label": "DeleteTask 1275-Aggregated", "isController": false}, {"data": [[343.0, 31561.0]], "isOverall": false, "label": "DeleteTask 1396", "isController": false}, {"data": [[343.0, 31561.0]], "isOverall": false, "label": "DeleteTask 1396-Aggregated", "isController": false}, {"data": [[370.0, 31429.0]], "isOverall": false, "label": "DeleteTask 1274", "isController": false}, {"data": [[370.0, 31429.0]], "isOverall": false, "label": "DeleteTask 1274-Aggregated", "isController": false}, {"data": [[910.0, 29025.0]], "isOverall": false, "label": "DeleteTask 1273", "isController": false}, {"data": [[910.0, 29025.0]], "isOverall": false, "label": "DeleteTask 1273-Aggregated", "isController": false}, {"data": [[350.0, 31606.0]], "isOverall": false, "label": "DeleteTask 1272", "isController": false}, {"data": [[350.0, 31606.0]], "isOverall": false, "label": "DeleteTask 1272-Aggregated", "isController": false}, {"data": [[988.0, 25293.0]], "isOverall": false, "label": "DeleteTask 1312", "isController": false}, {"data": [[988.0, 25293.0]], "isOverall": false, "label": "DeleteTask 1312-Aggregated", "isController": false}, {"data": [[721.0, 26345.0]], "isOverall": false, "label": "DeleteTask 1279", "isController": false}, {"data": [[721.0, 26345.0]], "isOverall": false, "label": "DeleteTask 1279-Aggregated", "isController": false}, {"data": [[1159.0, 17288.0]], "isOverall": false, "label": "DeleteTask 1278", "isController": false}, {"data": [[1159.0, 17288.0]], "isOverall": false, "label": "DeleteTask 1278-Aggregated", "isController": false}, {"data": [[294.0, 35691.0]], "isOverall": false, "label": "DeleteTask 1399", "isController": false}, {"data": [[294.0, 35691.0]], "isOverall": false, "label": "DeleteTask 1399-Aggregated", "isController": false}, {"data": [[917.0, 26625.0]], "isOverall": false, "label": "DeleteTask 1277", "isController": false}, {"data": [[917.0, 26625.0]], "isOverall": false, "label": "DeleteTask 1277-Aggregated", "isController": false}, {"data": [[1053.0, 23598.0]], "isOverall": false, "label": "DeleteTask 1276", "isController": false}, {"data": [[1053.0, 23598.0]], "isOverall": false, "label": "DeleteTask 1276-Aggregated", "isController": false}, {"data": [[737.0, 29533.0]], "isOverall": false, "label": "DeleteTask 1316", "isController": false}, {"data": [[737.0, 29533.0]], "isOverall": false, "label": "DeleteTask 1316-Aggregated", "isController": false}, {"data": [[46.0, 40331.0]], "isOverall": false, "label": "DeleteTask 1439", "isController": false}, {"data": [[46.0, 40331.0]], "isOverall": false, "label": "DeleteTask 1439-Aggregated", "isController": false}, {"data": [[506.0, 27050.0]], "isOverall": false, "label": "DeleteTask 1438", "isController": false}, {"data": [[506.0, 27050.0]], "isOverall": false, "label": "DeleteTask 1438-Aggregated", "isController": false}, {"data": [[1182.0, 18795.0]], "isOverall": false, "label": "DeleteTask 1260", "isController": false}, {"data": [[1182.0, 18795.0]], "isOverall": false, "label": "DeleteTask 1260-Aggregated", "isController": false}, {"data": [[1496.0, 18947.0]], "isOverall": false, "label": "DeleteTask 1264", "isController": false}, {"data": [[1496.0, 18947.0]], "isOverall": false, "label": "DeleteTask 1264-Aggregated", "isController": false}, {"data": [[226.0, 32387.0]], "isOverall": false, "label": "DeleteTask 1385", "isController": false}, {"data": [[226.0, 32387.0]], "isOverall": false, "label": "DeleteTask 1385-Aggregated", "isController": false}, {"data": [[1179.0, 18855.0]], "isOverall": false, "label": "DeleteTask 1263", "isController": false}, {"data": [[1179.0, 18855.0]], "isOverall": false, "label": "DeleteTask 1263-Aggregated", "isController": false}, {"data": [[319.0, 31572.0]], "isOverall": false, "label": "DeleteTask 1262", "isController": false}, {"data": [[319.0, 31572.0]], "isOverall": false, "label": "DeleteTask 1262-Aggregated", "isController": false}, {"data": [[174.0, 32537.0], [173.0, 32539.0], [168.0, 32451.0], [190.0, 32317.0], [212.0, 32179.0], [222.0, 36564.0], [217.0, 32254.0], [216.0, 32248.0], [238.0, 32133.0], [247.0, 36232.0], [243.0, 31976.0], [271.0, 35658.0], [287.0, 31702.0], [285.0, 31711.0], [284.0, 31709.0], [277.0, 31670.0], [305.0, 31821.0], [329.0, 31336.0], [327.0, 31345.0], [325.0, 31346.0], [349.0, 31625.0], [347.0, 31628.0], [345.0, 31559.0], [337.0, 31440.0], [352.0, 31600.0], [380.0, 31349.0], [379.0, 31348.0], [373.0, 31444.0], [386.0, 31111.0], [411.0, 27111.0], [408.0, 31350.0], [420.0, 6.333333333333334], [421.0, 1598.55], [422.0, 107.0], [423.0, 49.0], [424.0, 52.0], [429.0, 31260.0], [419.0, 31275.0], [440.0, 534.0], [445.0, 673.6], [441.0, 31107.0], [438.0, 31169.5], [449.0, 713.4444444444443], [450.0, 787.0], [451.0, 764.8235294117648], [461.0, 1053.3333333333333], [463.0, 1069.6666666666667], [460.0, 26937.0], [469.0, 15999.5], [472.0, 1312.9047619047617], [473.0, 7194.8], [474.0, 1304.0], [475.0, 30812.0], [471.0, 30807.0], [466.0, 30979.0], [493.0, 1818.5555555555557], [485.0, 16248.5], [486.0, 1675.7272727272727], [488.0, 1606.55], [489.0, 1692.5454545454543], [492.0, 10406.5], [483.0, 30839.0], [482.0, 30841.0], [494.0, 1806.925925925926], [495.0, 1857.5], [484.0, 27078.0], [497.0, 1921.875], [508.0, 2219.9], [509.0, 31110.0], [504.0, 31152.0], [498.0, 31215.0], [514.0, 16708.0], [513.0, 2398.25], [516.0, 11956.666666666666], [536.0, 2905.0], [537.0, 2943.0], [538.0, 30396.0], [541.0, 3042.3333333333335], [543.0, 26782.0], [521.0, 8226.2], [522.0, 2454.8125], [523.0, 2595.166666666667], [526.0, 30705.0], [527.0, 30704.0], [531.0, 2790.4], [532.0, 2867.5], [534.0, 2856.3], [535.0, 2880.0], [548.0, 3224.3333333333335], [549.0, 3306.6666666666665], [568.0, 2467.0], [572.0, 2197.0], [552.0, 2870.5], [553.0, 3439.0], [555.0, 12505.666666666666], [556.0, 30798.0], [558.0, 3498.5454545454545], [559.0, 3569.0], [547.0, 30537.0], [564.0, 9045.2], [567.0, 3663.0], [576.0, 4023.5], [590.0, 4420.0], [586.0, 4060.0], [591.0, 1940.0], [599.0, 30717.0], [594.0, 30752.0], [593.0, 30748.0], [583.0, 30601.0], [580.0, 30593.0], [578.0, 33309.0], [588.0, 33252.0], [584.0, 33319.0], [626.0, 4599.0], [628.0, 4639.5], [638.0, 5612.0], [637.0, 30337.0], [633.0, 30318.0], [630.0, 30314.0], [627.0, 30324.0], [624.0, 30505.0], [618.0, 30577.0], [612.0, 30654.0], [664.0, 30280.0], [652.0, 18212.5], [651.0, 5902.0], [654.0, 6038.5], [640.0, 30174.0], [656.0, 6128.0], [669.0, 5817.666666666667], [671.0, 30153.0], [666.0, 33816.0], [662.0, 30274.0], [673.0, 6463.0], [686.0, 6797.0], [701.0, 31155.0], [700.0, 31155.0], [699.0, 29409.0], [688.0, 29710.0], [681.0, 29888.0], [730.0, 6705.0], [705.0, 14822.333333333332], [711.0, 17883.0], [710.0, 31135.0], [707.0, 29512.0], [728.0, 29655.0], [712.0, 7514.0], [716.0, 6364.0], [714.0, 29565.0], [725.0, 18139.0], [724.0, 29671.0], [734.0, 8035.0], [735.0, 8061.0], [733.0, 29557.0], [732.0, 29556.0], [767.0, 28768.0], [736.0, 5786.0], [751.0, 6912.0], [750.0, 29189.0], [752.0, 8483.0], [755.0, 29063.0], [754.0, 29063.0], [760.0, 8684.0], [743.0, 29455.0], [739.0, 29538.0], [764.0, 28818.0], [761.0, 29065.0], [758.0, 29074.0], [756.0, 29064.0], [799.0, 19753.5], [771.0, 9095.0], [783.0, 28559.0], [770.0, 28767.0], [768.0, 28769.0], [782.0, 28559.0], [781.0, 28557.0], [777.0, 7682.0], [778.0, 13946.666666666668], [784.0, 18539.0], [785.0, 28577.0], [794.0, 30023.0], [775.0, 28580.0], [791.0, 28386.0], [789.0, 28567.0], [787.0, 28576.0], [786.0, 28579.0], [818.0, 12025.0], [800.0, 12159.0], [802.0, 10959.0], [803.0, 17111.0], [804.0, 28217.0], [824.0, 12578.42857142857], [830.0, 20476.0], [828.0, 27839.0], [825.0, 27873.0], [831.0, 27793.0], [817.0, 29313.0], [815.0, 11733.0], [814.0, 28310.0], [813.0, 29595.0], [819.0, 12091.0], [820.0, 20125.0], [821.0, 12249.0], [823.0, 12553.0], [857.0, 19646.666666666668], [837.0, 17322.5], [838.0, 15431.666666666666], [856.0, 27579.0], [844.0, 14527.0], [834.0, 27786.0], [832.0, 27790.0], [836.0, 27785.0], [835.0, 27786.0], [843.0, 27750.0], [842.0, 27743.0], [841.0, 27743.0], [840.0, 27744.0], [848.0, 21262.5], [853.0, 29135.0], [850.0, 27629.0], [855.0, 27579.0], [854.0, 27570.0], [858.0, 19712.666666666668], [860.0, 16053.2], [863.0, 27370.0], [862.0, 27399.0], [868.0, 22622.0], [869.0, 19646.75], [871.0, 27202.0], [870.0, 27246.0], [888.0, 22249.5], [892.0, 16322.0], [881.0, 27103.0], [880.0, 27105.0], [872.0, 22069.0], [873.0, 17030.0], [874.0, 19564.0], [876.0, 27151.0], [875.0, 27151.0], [877.0, 13584.5], [879.0, 19821.75], [864.0, 27374.0], [867.0, 27374.0], [866.0, 27374.0], [882.0, 21572.5], [883.0, 22425.5], [884.0, 27102.0], [887.0, 15712.5], [885.0, 27101.0], [899.0, 22481.5], [896.0, 22360.0], [898.0, 26932.0], [897.0, 26932.0], [911.0, 26643.0], [900.0, 18802.25], [902.0, 26938.0], [903.0, 18096.0], [904.0, 22400.0], [905.0, 18211.5], [908.0, 19271.0], [906.0, 26668.0], [909.0, 20846.0], [913.0, 3051.0], [926.0, 18539.0], [927.0, 26309.0], [922.0, 22453.5], [924.0, 14843.0], [920.0, 18418.666666666668], [921.0, 18418.0], [918.0, 18257.0], [919.0, 13287.0], [934.0, 18897.0], [931.0, 18784.0], [929.0, 18746.0], [941.0, 26159.0], [933.0, 18864.0], [932.0, 26176.0], [936.0, 3483.0], [939.0, 3760.0], [944.0, 4122.0], [959.0, 25729.0], [950.0, 26361.0], [946.0, 26339.0], [977.0, 25426.0], [991.0, 25152.0], [983.0, 25432.0], [982.0, 24145.0], [981.0, 25424.0], [971.0, 25328.0], [970.0, 25327.0], [966.0, 25675.0], [965.0, 24107.0], [964.0, 25626.0], [963.0, 25634.0], [961.0, 25730.0], [960.0, 25730.0], [1022.0, 22541.0], [1023.0, 24540.0], [1016.0, 27243.0], [1015.0, 24823.0], [1013.0, 22955.0], [1010.0, 24593.0], [1008.0, 23057.0], [1004.0, 24708.0], [996.0, 24999.0], [995.0, 25002.0], [999.0, 24780.0], [1075.0, 4335.0], [1059.0, 18839.0], [1051.0, 20110.5], [1047.0, 23775.0], [1043.0, 23780.0], [1060.0, 11544.0], [1080.0, 22590.0], [1078.0, 22704.0], [1071.0, 22771.0], [1061.0, 22938.0], [1052.0, 23597.0], [1024.0, 24498.0], [1028.0, 24267.0], [1026.0, 24538.0], [1035.0, 24151.0], [1034.0, 21972.0], [1146.0, 17198.857142857145], [1088.0, 4327.0], [1104.0, 21703.0], [1143.0, 17209.0], [1145.0, 16721.333333333332], [1151.0, 16340.0], [1121.0, 21224.0], [1125.0, 23733.0], [1124.0, 21350.0], [1150.0, 20307.0], [1149.0, 20307.0], [1142.0, 20682.0], [1102.0, 21735.0], [1100.0, 21735.0], [1097.0, 21735.0], [1092.0, 21921.0], [1135.0, 27736.0], [1133.0, 21110.0], [1157.0, 16510.0], [1208.0, 14667.0], [1188.0, 18015.5], [1190.0, 17796.5], [1191.0, 18738.0], [1187.0, 17444.0], [1186.0, 18606.0], [1200.0, 18951.0], [1203.0, 17158.0], [1194.0, 17696.5], [1195.0, 19798.5], [1192.0, 17255.5], [1184.0, 18770.0], [1185.0, 16870.0], [1156.0, 20457.0], [1160.0, 16918.5], [1161.0, 16709.666666666668], [1163.0, 16855.5], [1165.0, 19845.0], [1166.0, 21186.0], [1167.0, 16705.0], [1155.0, 17314.0], [1152.0, 16548.4], [1181.0, 18795.0], [1177.0, 17014.0], [1174.0, 19147.0], [1178.0, 14182.0], [1171.0, 16705.5], [1172.0, 16809.0], [1168.0, 16698.0], [1170.0, 16681.666666666668], [1153.0, 18506.25], [1154.0, 18503.0], [1264.0, 19255.0], [1245.0, 19198.0], [1218.0, 15153.0], [1231.0, 17431.0], [1224.0, 17416.0], [1270.0, 19215.0], [1278.0, 17413.0], [1272.0, 17354.0], [1250.0, 15749.0], [1240.0, 1650.0], [1238.0, 17025.0], [1237.0, 18837.0], [1336.0, 19287.0], [1287.0, 19176.0], [1291.0, 19002.0], [1309.0, 12243.5], [1306.0, 15942.0], [1304.0, 754.0], [1301.0, 18302.0], [1300.0, 23093.0], [1298.0, 10605.0], [1296.0, 17558.5], [1311.0, 17532.0], [1283.0, 2955.0], [1337.0, 19300.333333333332], [1339.0, 19250.0], [1340.0, 19249.0], [1330.0, 17620.0], [1319.0, 17516.0], [1406.0, 3.0], [1388.0, 19260.5], [1390.0, 19281.0], [1397.0, 12242.5], [1407.0, 16600.0], [1395.0, 16529.0], [1394.0, 18103.0], [1392.0, 18090.0], [1370.0, 16285.0], [1354.0, 15963.0], [1365.0, 17817.0], [1385.0, 18044.0], [1463.0, 19337.0], [1413.0, 19346.0], [1408.0, 11557.5], [1436.0, 18639.0], [1435.0, 19260.0], [1428.0, 18510.0], [1426.0, 18467.0], [1446.0, 19111.0], [1451.0, 19513.0], [1460.0, 19534.333333333332], [1461.0, 17370.5], [1464.0, 18518.666666666668], [1465.0, 15472.0], [1468.0, 20226.666666666668], [1467.0, 19685.25], [1469.0, 17676.2], [1471.0, 20190.0], [1441.0, 18683.0], [1470.0, 20301.5], [1495.0, 19457.0], [1476.0, 24375.0], [1472.0, 18809.333333333332], [1473.0, 921.0], [1501.0, 19926.722222222223], [1502.0, 19903.0], [1503.0, 17768.0], [1498.0, 19793.666666666668], [1500.0, 19946.55555555556], [1496.0, 19299.1875], [1497.0, 19011.75], [1494.0, 17602.166666666664], [1492.0, 20416.666666666668], [1493.0, 19785.454545454548], [1490.0, 18777.66666666667], [1491.0, 19985.176470588234], [1489.0, 19265.904761904763], [1488.0, 19519.8], [1474.0, 20306.8], [1475.0, 20010.571428571428], [1478.0, 16628.833333333336], [1477.0, 20098.0], [1479.0, 19988.5], [1483.0, 15329.4], [1485.0, 16451.2], [1487.0, 20315.75], [1504.0, 13095.333333333334], [1505.0, 21000.5], [1486.0, 24051.0], [1484.0, 20475.8], [1482.0, 19920.666666666668]], "isOverall": false, "label": "CreateTask", "isController": false}, {"data": [[909.4746945898773, 14563.647469458994]], "isOverall": false, "label": "CreateTask-Aggregated", "isController": false}, {"data": [[1497.0, 2412.0]], "isOverall": false, "label": "DeleteTask 1261", "isController": false}, {"data": [[1497.0, 2412.0]], "isOverall": false, "label": "DeleteTask 1261-Aggregated", "isController": false}, {"data": [[417.0, 31275.0]], "isOverall": false, "label": "DeleteTask 1382", "isController": false}, {"data": [[417.0, 31275.0]], "isOverall": false, "label": "DeleteTask 1382-Aggregated", "isController": false}, {"data": [[1149.0, 12846.0]], "isOverall": false, "label": "DeleteTask 1301", "isController": false}, {"data": [[1149.0, 12846.0]], "isOverall": false, "label": "DeleteTask 1301-Aggregated", "isController": false}, {"data": [[981.0, 25427.0]], "isOverall": false, "label": "DeleteTask 1268", "isController": false}, {"data": [[981.0, 25427.0]], "isOverall": false, "label": "DeleteTask 1268-Aggregated", "isController": false}, {"data": [[620.0, 30547.0]], "isOverall": false, "label": "DeleteTask 1422", "isController": false}, {"data": [[620.0, 30547.0]], "isOverall": false, "label": "DeleteTask 1422-Aggregated", "isController": false}, {"data": [[1185.0, 13620.0]], "isOverall": false, "label": "DeleteTask 1267", "isController": false}, {"data": [[1185.0, 13620.0]], "isOverall": false, "label": "DeleteTask 1267-Aggregated", "isController": false}, {"data": [[1194.0, 17679.0]], "isOverall": false, "label": "DeleteTask 1300", "isController": false}, {"data": [[1194.0, 17679.0]], "isOverall": false, "label": "DeleteTask 1300-Aggregated", "isController": false}, {"data": [[1319.0, 17516.0]], "isOverall": false, "label": "DeleteTask 1266", "isController": false}, {"data": [[1319.0, 17516.0]], "isOverall": false, "label": "DeleteTask 1266-Aggregated", "isController": false}, {"data": [[934.0, 26186.0]], "isOverall": false, "label": "DeleteTask 1425", "isController": false}, {"data": [[934.0, 26186.0]], "isOverall": false, "label": "DeleteTask 1425-Aggregated", "isController": false}, {"data": [[315.0, 31708.0]], "isOverall": false, "label": "DeleteTask 1302", "isController": false}, {"data": [[315.0, 31708.0]], "isOverall": false, "label": "DeleteTask 1302-Aggregated", "isController": false}, {"data": [[365.0, 31380.0]], "isOverall": false, "label": "DeleteTodo 1785", "isController": false}, {"data": [[365.0, 31380.0]], "isOverall": false, "label": "DeleteTodo 1785-Aggregated", "isController": false}, {"data": [[457.0, 30964.0]], "isOverall": false, "label": "DeleteTodo 1786", "isController": false}, {"data": [[457.0, 30964.0]], "isOverall": false, "label": "DeleteTodo 1786-Aggregated", "isController": false}, {"data": [[561.0, 30661.0]], "isOverall": false, "label": "DeleteTask 1307", "isController": false}, {"data": [[561.0, 30661.0]], "isOverall": false, "label": "DeleteTask 1307-Aggregated", "isController": false}, {"data": [[218.0, 32254.0]], "isOverall": false, "label": "DeleteTodo 1784", "isController": false}, {"data": [[218.0, 32254.0]], "isOverall": false, "label": "DeleteTodo 1784-Aggregated", "isController": false}, {"data": [[608.0, 30718.0]], "isOverall": false, "label": "DeleteTodo 1788", "isController": false}, {"data": [[608.0, 30718.0]], "isOverall": false, "label": "DeleteTodo 1788-Aggregated", "isController": false}, {"data": [[1189.0, 17427.0]], "isOverall": false, "label": "DeleteTask 1257", "isController": false}, {"data": [[1189.0, 17427.0]], "isOverall": false, "label": "DeleteTask 1257-Aggregated", "isController": false}, {"data": [[923.0, 26508.0]], "isOverall": false, "label": "DeleteTask 1256", "isController": false}, {"data": [[923.0, 26508.0]], "isOverall": false, "label": "DeleteTask 1256-Aggregated", "isController": false}, {"data": [[793.0, 28389.0]], "isOverall": false, "label": "DeleteTask 1498", "isController": false}, {"data": [[793.0, 28389.0]], "isOverall": false, "label": "DeleteTask 1498-Aggregated", "isController": false}, {"data": [[1152.0, 16462.0]], "isOverall": false, "label": "DeleteTask 1259", "isController": false}, {"data": [[1152.0, 16462.0]], "isOverall": false, "label": "DeleteTask 1259-Aggregated", "isController": false}, {"data": [[387.0, 31113.0]], "isOverall": false, "label": "DeleteTask 1534", "isController": false}, {"data": [[387.0, 31113.0]], "isOverall": false, "label": "DeleteTask 1534-Aggregated", "isController": false}, {"data": [[374.0, 31451.0]], "isOverall": false, "label": "DeleteTodo 1718", "isController": false}, {"data": [[374.0, 31451.0]], "isOverall": false, "label": "DeleteTodo 1718-Aggregated", "isController": false}, {"data": [[1161.0, 16703.0]], "isOverall": false, "label": "DeleteTask 1258", "isController": false}, {"data": [[1161.0, 16703.0]], "isOverall": false, "label": "DeleteTask 1258-Aggregated", "isController": false}, {"data": [[205.0, 32159.0]], "isOverall": false, "label": "DeleteTask 1539", "isController": false}, {"data": [[205.0, 32159.0]], "isOverall": false, "label": "DeleteTask 1539-Aggregated", "isController": false}, {"data": [[569.0, 30606.0]], "isOverall": false, "label": "DeleteTodo 1795", "isController": false}, {"data": [[569.0, 30606.0]], "isOverall": false, "label": "DeleteTodo 1795-Aggregated", "isController": false}, {"data": [[13.0, 23720.0], [14.0, 23998.0], [33.0, 26696.0], [35.0, 26638.0], [42.0, 26877.0], [44.0, 27157.0], [48.0, 27345.0], [50.0, 27385.0], [53.0, 27643.0], [54.0, 27663.0], [61.0, 27808.0], [60.0, 27807.0], [62.0, 27856.0], [67.0, 28030.0], [70.0, 28410.0], [79.0, 29168.0], [76.0, 28797.0], [81.0, 29195.0], [80.0, 29093.0], [85.0, 29033.0], [95.0, 29594.0], [98.0, 29570.0], [96.0, 29721.0], [100.0, 29607.0], [123.0, 30564.0], [125.0, 30678.0], [130.0, 30775.0], [142.0, 31391.0], [159.0, 32287.0], [165.0, 32471.0], [161.0, 32287.0], [169.0, 32465.0], [188.0, 32256.0], [197.0, 32351.0], [192.0, 32321.0], [215.0, 32182.0], [210.0, 32154.0], [224.0, 32246.0], [262.0, 31740.0], [279.0, 31639.0], [272.0, 31676.0], [301.0, 31871.0], [297.0, 31999.0], [295.0, 31933.0], [291.0, 31777.0], [288.0, 31701.0], [308.0, 31753.0], [307.0, 31754.0], [344.0, 31560.0], [354.0, 27221.0], [369.0, 26922.0], [413.0, 31423.0], [410.0, 31357.0], [403.0, 31242.0], [416.0, 31268.0], [446.0, 31237.0], [444.0, 31178.0], [442.0, 31114.0], [432.0, 31263.0], [455.0, 30959.0], [453.0, 34258.0], [450.0, 31004.0], [490.0, 31006.0], [488.0, 30883.0], [502.0, 31100.0], [499.0, 31219.0], [497.0, 31156.0], [571.0, 30633.0], [567.0, 30609.0], [565.0, 30593.0], [553.0, 30794.0], [549.0, 30560.0], [546.0, 26771.0], [544.0, 30497.0], [603.0, 30477.0], [635.0, 32851.0], [669.0, 30128.0], [650.0, 30300.0], [642.0, 30140.0], [682.0, 26810.0], [723.0, 29680.0], [718.0, 29557.0], [708.0, 29519.0], [795.0, 28283.0], [814.0, 11657.0], [812.0, 28252.0], [809.0, 28215.0], [807.0, 28135.0], [838.0, 13910.0], [839.0, 14057.0], [840.0, 14033.0], [855.0, 15453.0], [851.0, 29154.0], [874.0, 14473.0], [883.0, 17743.0], [884.0, 17522.0], [885.0, 17560.0], [886.0, 17641.666666666668], [909.0, 20846.666666666668], [905.0, 21982.0], [907.0, 18088.0], [908.0, 18069.0], [910.0, 18025.0], [911.0, 17955.0], [912.0, 18044.0], [918.0, 18258.0], [922.0, 3156.0], [923.0, 13923.0], [926.0, 18520.5], [935.0, 18919.0], [938.0, 19032.0], [939.0, 21843.0], [945.0, 14320.0], [957.0, 25786.0], [949.0, 28746.0], [931.0, 26166.0], [975.0, 25382.0], [1021.0, 24694.0], [1007.0, 24561.0], [1006.0, 30200.0], [1005.0, 24708.0], [1060.0, 14343.0], [1084.0, 18916.0], [1087.0, 21794.0], [1086.0, 21790.0], [1066.0, 22960.0], [1062.0, 22939.0], [1046.0, 23778.0], [1025.0, 24501.0], [1146.0, 17162.333333333332], [1094.0, 18807.0], [1088.0, 18843.0], [1117.0, 21194.0], [1116.0, 21165.0], [1108.0, 21711.0], [1106.0, 21617.0], [1104.0, 21570.0], [1148.0, 15522.333333333334], [1147.0, 20181.0], [1144.0, 16935.8], [1142.0, 17106.0], [1137.0, 20847.0], [1098.0, 21728.0], [1143.0, 20289.0], [1145.0, 17179.375], [1149.0, 16697.75], [1151.0, 16339.0], [1126.0, 23794.0], [1121.0, 19815.5], [1131.0, 21097.0], [1128.0, 18391.0], [1135.0, 18303.0], [1134.0, 21109.0], [1156.0, 17604.5], [1214.0, 18808.0], [1158.0, 19295.666666666668], [1167.0, 17804.5], [1163.0, 16873.8], [1166.0, 16681.0], [1160.0, 12964.0], [1161.0, 16697.333333333332], [1179.0, 18170.5], [1173.0, 17418.0], [1176.0, 19038.0], [1177.0, 16965.75], [1178.0, 18856.0], [1172.0, 20590.0], [1168.0, 13285.0], [1170.0, 16681.0], [1171.0, 16655.0], [1182.0, 17035.0], [1180.0, 18775.0], [1152.0, 17691.0], [1155.0, 18853.666666666668], [1154.0, 16608.5], [1153.0, 16497.0], [1157.0, 17035.333333333332], [1188.0, 18915.0], [1215.0, 17288.0], [1187.0, 17323.666666666668], [1184.0, 17613.0], [1213.0, 17258.0], [1211.0, 17236.0], [1195.0, 17090.0], [1194.0, 17740.0], [1193.0, 17877.0], [1190.0, 17159.5], [1189.0, 17587.2], [1270.0, 19205.0], [1254.0, 5262.0], [1264.0, 19232.0], [1271.0, 17353.0], [1265.0, 15721.0], [1250.0, 20409.0], [1238.0, 15664.0], [1237.0, 17390.0], [1219.0, 18847.0], [1336.0, 18465.0], [1319.0, 17508.0], [1318.0, 17516.0], [1312.0, 17537.0], [1297.0, 17561.0], [1283.0, 15928.0], [1401.0, 18238.0], [1386.0, 18895.0], [1385.0, 19364.0], [1391.0, 14807.0], [1397.0, 18174.0], [1396.0, 16540.0], [1394.0, 16506.0], [1353.0, 15964.0], [1348.0, 17703.0], [1344.0, 17656.0], [1375.0, 17946.0], [1374.0, 17940.0], [1368.0, 17866.0], [1366.0, 16232.0], [1461.0, 19485.4], [1413.0, 14974.0], [1415.0, 18330.0], [1437.0, 18642.0], [1427.0, 18500.0], [1426.0, 18469.0], [1420.0, 5327.0], [1456.0, 19373.5], [1463.0, 19526.0], [1462.0, 19361.0], [1464.0, 19572.0], [1465.0, 19177.0], [1471.0, 20305.0], [1453.0, 18628.0], [1447.0, 18645.0], [1470.0, 20249.0], [1467.0, 20120.0], [1496.0, 18884.5], [1477.0, 19939.0], [1472.0, 19985.0], [1474.0, 20675.0], [1473.0, 22033.5], [1500.0, 20131.875], [1499.0, 19228.0], [1502.0, 19802.0], [1501.0, 19233.333333333332], [1503.0, 19752.0], [1497.0, 19139.0], [1498.0, 21291.666666666668], [1495.0, 18895.25], [1493.0, 19495.0], [1494.0, 19564.0], [1491.0, 19735.0], [1492.0, 18933.0], [1490.0, 20525.375], [1489.0, 19622.85714285714], [1488.0, 20193.0], [1475.0, 19930.5], [1476.0, 19865.0], [1478.0, 18561.5], [1479.0, 24279.0], [1480.0, 20032.0], [1481.0, 20044.0], [1483.0, 15601.833333333334], [1485.0, 20437.666666666668], [1486.0, 17433.0], [1487.0, 19585.727272727276], [1504.0, 19629.5], [1505.0, 19665.0], [1484.0, 20038.0]], "isOverall": false, "label": "UpdateTodo", "isController": false}, {"data": [[1087.9719626168235, 20967.214953271035]], "isOverall": false, "label": "UpdateTodo-Aggregated", "isController": false}, {"data": [[72.0, 39541.0], [101.0, 39016.0], [135.0, 38047.0], [146.0, 37585.0], [166.0, 32479.0], [172.0, 32438.0], [178.0, 36749.0], [177.0, 32310.0], [189.0, 32272.0], [186.0, 32256.0], [185.0, 32222.0], [194.0, 32475.0], [193.0, 32354.0], [201.0, 32224.0], [214.0, 32151.0], [208.0, 32094.0], [223.0, 32247.0], [225.0, 32362.0], [236.0, 32132.0], [234.0, 32204.0], [233.0, 32104.0], [253.0, 31587.0], [265.0, 31903.0], [264.0, 31784.0], [263.0, 31757.0], [259.0, 31639.0], [257.0, 31609.0], [286.0, 31717.0], [273.0, 31678.0], [299.0, 31979.0], [296.0, 31951.0], [292.0, 31836.0], [290.0, 31717.0], [306.0, 31744.0], [330.0, 31358.0], [320.0, 31610.0], [346.0, 31639.0], [342.0, 31406.0], [341.0, 31526.0], [363.0, 31319.0], [362.0, 31288.0], [371.0, 31431.0], [399.0, 121.16666666666667], [396.0, 31215.0], [394.0, 31096.0], [393.0, 30980.0], [413.0, 71.17021276595747], [414.0, 1231.030303030303], [415.0, 301.0], [412.0, 198.71428571428572], [411.0, 158.54320987654316], [410.0, 162.06896551724142], [409.0, 159.0], [407.0, 133.0], [405.0, 15707.0], [406.0, 31369.0], [408.0, 156.0], [403.0, 138.0], [402.0, 129.0], [401.0, 70.0], [400.0, 2.0], [417.0, 264.0], [421.0, 473.090909090909], [420.0, 346.5], [422.0, 539.0], [418.0, 2926.3333333333335], [423.0, 580.5], [419.0, 211.0], [416.0, 1.5], [431.0, 31259.0], [425.0, 31209.0], [445.0, 11153.666666666666], [443.0, 31117.0], [450.0, 1284.0], [451.0, 1294.0], [461.0, 30918.0], [472.0, 1741.75], [473.0, 1873.0], [470.0, 30801.0], [465.0, 31020.0], [486.0, 2153.0], [488.0, 2251.2], [489.0, 16600.5], [493.0, 2419.0], [494.0, 11954.333333333334], [495.0, 31131.0], [491.0, 31025.0], [480.0, 30829.0], [508.0, 1834.5], [503.0, 31096.0], [537.0, 16919.0], [514.0, 2943.0], [513.0, 2547.6666666666665], [512.0, 30933.0], [516.0, 3027.0], [519.0, 33971.0], [521.0, 2995.2], [522.0, 2534.0], [531.0, 2301.0], [532.0, 1867.0], [534.0, 3467.0], [541.0, 30539.0], [539.0, 30419.0], [555.0, 4018.0], [552.0, 3933.0], [553.0, 3960.0], [554.0, 4019.0], [558.0, 2040.0], [559.0, 30630.0], [551.0, 30581.0], [550.0, 30702.0], [568.0, 3627.0], [569.0, 3556.0], [572.0, 3526.6666666666665], [575.0, 26905.0], [566.0, 30597.0], [591.0, 4356.5], [576.0, 3749.75], [586.0, 10706.5], [592.0, 3747.0], [605.0, 30685.0], [604.0, 30568.0], [597.0, 30838.0], [596.0, 30718.0], [589.0, 30716.0], [628.0, 4640.0], [638.0, 4900.0], [632.0, 30317.0], [616.0, 30566.0], [644.0, 30319.0], [647.0, 6434.0], [654.0, 5137.0], [667.0, 6313.0], [669.0, 5428.0], [661.0, 30208.0], [655.0, 30399.0], [643.0, 26958.0], [641.0, 26842.0], [651.0, 30321.0], [645.0, 30198.0], [672.0, 5392.0], [673.0, 5336.0], [676.0, 5387.0], [691.0, 5427.0], [695.0, 5805.0], [689.0, 29737.0], [686.0, 29809.0], [733.0, 6774.0], [734.0, 6779.666666666667], [735.0, 12433.5], [722.0, 29588.0], [716.0, 29485.0], [736.0, 6599.0], [742.0, 6699.0], [743.0, 6714.0], [761.0, 7133.5], [765.0, 8785.0], [766.0, 26023.0], [757.0, 29070.0], [771.0, 18808.0], [776.0, 8870.0], [780.0, 8014.0], [787.0, 8812.0], [788.0, 8922.5], [796.0, 28255.0], [801.0, 10495.0], [800.0, 20457.0], [804.0, 11594.0], [805.0, 19981.5], [806.0, 11749.0], [824.0, 12551.75], [828.0, 12984.0], [816.0, 28178.0], [818.0, 12035.5], [819.0, 12658.666666666666], [821.0, 12231.0], [822.0, 12378.0], [808.0, 11276.0], [810.0, 10809.0], [811.0, 10183.0], [813.0, 11539.5], [839.0, 14030.5], [834.0, 12936.5], [837.0, 13537.4], [838.0, 13916.0], [846.0, 14743.333333333334], [845.0, 34592.0], [848.0, 14515.6], [849.0, 25585.0], [860.0, 15860.0], [862.0, 17658.0], [857.0, 15681.0], [858.0, 13674.0], [851.0, 15181.0], [852.0, 15120.0], [855.0, 16149.75], [870.0, 16674.0], [865.0, 16391.333333333332], [864.0, 16313.0], [879.0, 17384.333333333332], [866.0, 16367.0], [868.0, 16822.6], [869.0, 15413.5], [880.0, 17477.0], [893.0, 17174.6], [894.0, 26895.0], [895.0, 17762.5], [888.0, 16866.444444444445], [892.0, 17931.555555555555], [882.0, 17611.0], [883.0, 17062.111111111113], [884.0, 17533.0], [885.0, 17602.0], [886.0, 17628.4], [887.0, 17190.42857142857], [873.0, 17007.0], [874.0, 17352.25], [877.0, 17653.0], [878.0, 21321.5], [897.0, 19014.0], [908.0, 17361.0], [896.0, 17785.75], [911.0, 17954.75], [898.0, 17925.5], [900.0, 17970.272727272728], [912.0, 18562.8], [926.0, 18563.714285714286], [927.0, 19785.5], [924.0, 18508.0], [925.0, 18610.0], [922.0, 18433.333333333332], [923.0, 18492.666666666668], [920.0, 18400.0], [921.0, 18715.375], [913.0, 18332.14285714286], [914.0, 18025.0], [915.0, 22298.0], [916.0, 18110.333333333332], [917.0, 18176.0], [918.0, 18260.0], [919.0, 20965.0], [904.0, 17309.0], [905.0, 18105.285714285717], [907.0, 18055.8], [909.0, 18644.0], [910.0, 18023.666666666668], [929.0, 20698.2], [928.0, 18619.666666666668], [942.0, 18845.0], [939.0, 20364.5], [940.0, 18802.0], [930.0, 18661.0], [931.0, 19628.666666666668], [933.0, 18869.0], [934.0, 18895.0], [935.0, 20259.5], [944.0, 22611.5], [936.0, 18890.0], [937.0, 18940.0], [990.0, 25061.0], [986.0, 24259.0], [978.0, 24086.0], [977.0, 25406.0], [973.0, 23971.0], [969.0, 25421.0], [1018.0, 24714.0], [1012.0, 24735.0], [1011.0, 24616.0], [1009.0, 24602.0], [1003.0, 23239.0], [1000.0, 24718.0], [994.0, 24950.0], [1079.0, 22702.0], [1051.0, 18873.0], [1048.0, 23815.0], [1042.0, 23763.0], [1041.0, 23647.0], [1060.0, 18821.0], [1059.0, 25610.0], [1065.0, 22953.0], [1084.0, 18962.0], [1082.0, 22094.0], [1077.0, 20309.0], [1074.0, 22702.0], [1073.0, 20189.0], [1033.0, 24072.0], [1069.0, 22686.0], [1067.0, 22943.0], [1139.0, 18905.0], [1088.0, 20388.0], [1094.0, 18861.0], [1093.0, 22013.0], [1091.0, 21897.0], [1090.0, 21831.0], [1136.0, 20844.0], [1099.0, 23920.0], [1108.0, 18905.0], [1107.0, 21699.0], [1105.0, 21579.0], [1109.0, 21696.0], [1114.0, 18844.0], [1110.0, 18695.0], [1130.0, 18929.0], [1127.0, 23854.0], [1122.0, 21341.0], [1121.0, 21225.0], [1131.0, 23821.0], [1151.0, 17308.0], [1150.0, 16738.666666666668], [1149.0, 16786.25], [1148.0, 17536.0], [1147.0, 18326.0], [1146.0, 17883.833333333336], [1145.0, 17192.125], [1144.0, 17861.333333333332], [1143.0, 17234.0], [1142.0, 17228.333333333332], [1141.0, 20675.0], [1140.0, 18158.0], [1213.0, 16066.5], [1204.0, 18071.0], [1158.0, 18397.0], [1157.0, 17296.0], [1156.0, 18623.0], [1155.0, 18395.75], [1154.0, 19090.666666666668], [1153.0, 19015.0], [1152.0, 17256.875], [1160.0, 17925.333333333332], [1159.0, 17315.0], [1161.0, 18603.14285714286], [1167.0, 18905.5], [1166.0, 17771.0], [1165.0, 17383.0], [1164.0, 17605.333333333332], [1163.0, 17165.0], [1162.0, 17349.0], [1201.0, 17149.0], [1200.0, 17139.0], [1203.0, 18711.0], [1202.0, 17161.0], [1180.0, 18883.0], [1179.0, 18917.0], [1178.0, 17754.333333333332], [1177.0, 16819.5], [1176.0, 17263.5], [1175.0, 17384.0], [1174.0, 18921.0], [1173.0, 20013.75], [1172.0, 17462.5], [1171.0, 17077.0], [1170.0, 19207.0], [1169.0, 17433.0], [1168.0, 16792.25], [1182.0, 17252.0], [1183.0, 18047.0], [1188.0, 18010.0], [1187.0, 17809.5], [1186.0, 17082.0], [1185.0, 17219.666666666668], [1184.0, 17156.0], [1189.0, 18400.2], [1191.0, 17062.0], [1190.0, 17148.333333333332], [1193.0, 17083.0], [1192.0, 20005.666666666668], [1195.0, 17092.0], [1194.0, 17932.2], [1197.0, 17106.0], [1196.0, 17094.0], [1199.0, 17127.5], [1198.0, 17117.0], [1215.0, 17292.0], [1214.0, 17276.0], [1212.0, 17256.0], [1211.0, 18732.0], [1210.0, 17229.0], [1209.0, 17204.0], [1208.0, 17194.0], [1207.0, 17187.5], [1206.0, 17172.0], [1205.0, 17161.0], [1230.0, 18307.0], [1277.0, 15848.0], [1270.0, 16917.666666666668], [1244.0, 19022.0], [1243.0, 17203.0], [1242.0, 17190.0], [1241.0, 17179.0], [1240.0, 18769.0], [1239.0, 17954.0], [1238.0, 18328.666666666668], [1237.0, 17771.0], [1236.0, 17391.0], [1235.0, 18974.0], [1234.0, 17428.0], [1233.0, 19000.0], [1232.0, 18987.0], [1245.0, 17202.0], [1247.0, 18836.0], [1217.0, 17320.0], [1216.0, 17308.0], [1219.0, 17353.0], [1218.0, 17332.0], [1221.0, 17374.0], [1220.0, 17373.5], [1223.0, 17397.0], [1222.0, 17385.0], [1225.0, 17420.0], [1224.0, 17409.0], [1227.0, 17439.0], [1226.0, 18918.0], [1229.0, 17433.0], [1228.0, 17440.0], [1246.0, 17225.0], [1254.0, 17331.333333333332], [1252.0, 17237.333333333332], [1250.0, 17258.0], [1249.0, 17245.0], [1248.0, 18847.0], [1256.0, 17183.0], [1259.0, 17211.0], [1258.0, 15634.333333333334], [1262.0, 18833.0], [1261.0, 16447.5], [1264.0, 16870.666666666668], [1231.0, 17433.0], [1266.0, 15739.0], [1265.0, 18869.0], [1268.0, 16532.0], [1267.0, 17267.0], [1276.0, 18505.4], [1275.0, 17378.0], [1274.0, 16842.333333333332], [1272.0, 17350.0], [1271.0, 18913.0], [1279.0, 15882.0], [1278.0, 15856.0], [1336.0, 20415.333333333332], [1287.0, 18313.0], [1290.0, 17001.333333333332], [1288.0, 15959.0], [1291.0, 17534.0], [1293.0, 15997.0], [1292.0, 15994.0], [1295.0, 17539.0], [1294.0, 17555.0], [1329.0, 17606.5], [1328.0, 17594.0], [1331.0, 16142.0], [1330.0, 17617.0], [1333.0, 17639.0], [1332.0, 17626.0], [1335.0, 17661.0], [1334.0, 17649.0], [1297.0, 18299.0], [1296.0, 16060.0], [1299.0, 17581.0], [1298.0, 17557.0], [1301.0, 18921.666666666668], [1300.0, 17529.0], [1303.0, 17433.0], [1302.0, 17476.0], [1305.0, 17462.0], [1304.0, 17442.0], [1307.0, 19100.0], [1306.0, 17475.0], [1309.0, 17501.0], [1308.0, 17489.0], [1311.0, 17525.0], [1281.0, 17441.0], [1280.0, 15906.0], [1283.0, 19040.0], [1282.0, 15917.0], [1286.0, 16700.0], [1284.0, 19050.0], [1310.0, 17511.0], [1316.0, 18349.5], [1315.0, 16016.0], [1314.0, 17553.0], [1313.0, 17544.0], [1312.0, 17537.5], [1317.0, 17583.0], [1319.0, 18348.666666666668], [1318.0, 17593.0], [1321.0, 17543.0], [1320.0, 16783.0], [1323.0, 17566.0], [1322.0, 17554.0], [1325.0, 17589.0], [1324.0, 17576.0], [1327.0, 16842.0], [1326.0, 17600.0], [1340.0, 18474.5], [1339.0, 16959.0], [1338.0, 17688.0], [1337.0, 17678.0], [1343.0, 17744.0], [1342.0, 17733.0], [1341.0, 17722.0], [1395.0, 18773.0], [1403.0, 18252.0], [1407.0, 18770.0], [1346.0, 19198.5], [1375.0, 18416.666666666668], [1345.0, 17722.0], [1344.0, 17755.0], [1374.0, 17124.0], [1373.0, 17928.0], [1372.0, 17901.0], [1371.0, 17895.0], [1370.0, 16283.0], [1369.0, 17861.0], [1368.0, 17049.0], [1366.0, 17826.0], [1365.0, 16739.0], [1363.0, 16180.0], [1362.0, 17771.666666666668], [1361.0, 17764.0], [1386.0, 20567.333333333332], [1385.0, 18708.0], [1384.0, 16427.0], [1383.0, 18027.0], [1382.0, 18003.0], [1381.0, 18007.0], [1380.0, 17996.0], [1379.0, 17181.0], [1378.0, 17975.0], [1377.0, 17963.0], [1376.0, 16352.0], [1390.0, 18448.666666666668], [1389.0, 16482.0], [1388.0, 18057.0], [1387.0, 18046.0], [1391.0, 18080.0], [1406.0, 18200.0], [1405.0, 16578.0], [1404.0, 18834.5], [1402.0, 18240.0], [1401.0, 18941.2], [1400.0, 19428.0], [1399.0, 18174.0], [1398.0, 18174.0], [1397.0, 18161.0], [1396.0, 16538.0], [1394.0, 18112.0], [1393.0, 18101.0], [1392.0, 18092.0], [1359.0, 16922.5], [1358.0, 16129.0], [1357.0, 16091.0], [1356.0, 16103.0], [1355.0, 17705.0], [1354.0, 19266.0], [1353.0, 17706.0], [1352.0, 17742.0], [1351.0, 17725.0], [1349.0, 17709.0], [1348.0, 17692.5], [1465.0, 19233.666666666668], [1461.0, 19333.714285714286], [1413.0, 17157.0], [1411.0, 16658.0], [1410.0, 16646.0], [1409.0, 17433.5], [1408.0, 18768.5], [1414.0, 18810.0], [1416.0, 18674.333333333332], [1415.0, 17503.5], [1418.0, 16739.0], [1417.0, 18400.0], [1421.0, 18416.5], [1419.0, 18374.0], [1423.0, 18859.0], [1422.0, 18410.0], [1439.0, 18655.0], [1438.0, 18648.5], [1437.0, 18643.0], [1436.0, 16981.0], [1435.0, 18621.0], [1434.0, 18607.0], [1433.0, 18597.0], [1432.0, 19024.0], [1431.0, 19027.666666666668], [1430.0, 18678.5], [1429.0, 18514.0], [1428.0, 18892.0], [1427.0, 18499.0], [1426.0, 18876.5], [1425.0, 18471.0], [1424.0, 18439.0], [1446.0, 18952.666666666668], [1447.0, 18400.666666666668], [1449.0, 18671.0], [1448.0, 18659.0], [1453.0, 18629.0], [1452.0, 18613.5], [1455.0, 18646.0], [1454.0, 18639.0], [1456.0, 19063.0], [1458.0, 19026.0], [1457.0, 17088.0], [1459.0, 19379.0], [1463.0, 19281.0], [1462.0, 19074.5], [1468.0, 19842.666666666664], [1467.0, 19334.5], [1466.0, 18547.0], [1469.0, 18831.666666666668], [1470.0, 19118.0], [1471.0, 20130.0], [1445.0, 18616.0], [1444.0, 18611.0], [1443.0, 18601.0], [1442.0, 18590.0], [1441.0, 18652.0], [1440.0, 18667.0], [1464.0, 17157.5], [1498.0, 19423.5], [1477.0, 19646.2], [1472.0, 18571.64285714286], [1474.0, 18326.0], [1473.0, 17537.2], [1502.0, 19235.0], [1503.0, 17894.75], [1500.0, 18937.0], [1499.0, 17510.0], [1501.0, 18525.999999999996], [1497.0, 18077.2], [1496.0, 18603.333333333336], [1495.0, 19019.6], [1494.0, 18452.5], [1493.0, 17864.0], [1492.0, 18996.8], [1491.0, 19112.75], [1488.0, 19648.0], [1489.0, 19345.333333333332], [1490.0, 20090.14285714286], [1476.0, 20018.333333333332], [1475.0, 19200.25], [1478.0, 18345.785714285714], [1479.0, 18926.0], [1480.0, 18651.0], [1481.0, 18525.333333333332], [1483.0, 18466.0], [1485.0, 18666.857142857145], [1484.0, 17817.0], [1486.0, 17562.0], [1487.0, 18811.307692307695], [1504.0, 18812.57142857143], [1482.0, 18354.90909090909]], "isOverall": false, "label": "CreateTodo", "isController": false}, {"data": [[947.4115226337447, 13964.495590828925]], "isOverall": false, "label": "CreateTodo-Aggregated", "isController": false}, {"data": [[237.0, 32129.0]], "isOverall": false, "label": "DeleteTask 1362", "isController": false}, {"data": [[237.0, 32129.0]], "isOverall": false, "label": "DeleteTask 1362-Aggregated", "isController": false}, {"data": [[1076.0, 22760.0]], "isOverall": false, "label": "DeleteTask 1360", "isController": false}, {"data": [[1076.0, 22760.0]], "isOverall": false, "label": "DeleteTask 1360-Aggregated", "isController": false}, {"data": [[703.0, 29517.0]], "isOverall": false, "label": "DeleteTodo 1728", "isController": false}, {"data": [[703.0, 29517.0]], "isOverall": false, "label": "DeleteTodo 1728-Aggregated", "isController": false}, {"data": [[819.0, 28104.0]], "isOverall": false, "label": "DeleteTask 1404", "isController": false}, {"data": [[819.0, 28104.0]], "isOverall": false, "label": "DeleteTask 1404-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1505.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 3675.4, "minX": 1.61064462E12, "maxY": 2802886.85, "series": [{"data": [[1.61064474E12, 1240615.7333333334], [1.61064462E12, 619985.3833333333], [1.61064468E12, 2802886.85]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.61064474E12, 3675.4], [1.61064462E12, 4315.4], [1.61064468E12, 11361.2]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.61064474E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 1083.6028806584363, "minX": 1.61064462E12, "maxY": 40331.0, "series": [{"data": [[1.61064468E12, 21524.0]], "isOverall": false, "label": "DeleteTask 1473", "isController": false}, {"data": [[1.61064474E12, 31931.0]], "isOverall": false, "label": "DeleteTask 1352", "isController": false}, {"data": [[1.61064468E12, 16545.0]], "isOverall": false, "label": "DeleteTask 1356", "isController": false}, {"data": [[1.61064474E12, 32273.0]], "isOverall": false, "label": "DeleteTask 1475", "isController": false}, {"data": [[1.61064474E12, 32000.0]], "isOverall": false, "label": "DeleteTask 1359", "isController": false}, {"data": [[1.61064474E12, 29363.0]], "isOverall": false, "label": "DeleteTask 1358", "isController": false}, {"data": [[1.61064474E12, 30696.0]], "isOverall": false, "label": "DeleteTask 1357", "isController": false}, {"data": [[1.61064474E12, 26176.0]], "isOverall": false, "label": "DeleteTodo 1731", "isController": false}, {"data": [[1.61064474E12, 28739.0]], "isOverall": false, "label": "DeleteTodo 1732", "isController": false}, {"data": [[1.61064474E12, 29885.458333333336], [1.61064468E12, 18217.058823529413]], "isOverall": false, "label": "UpdateTask", "isController": false}, {"data": [[1.61064474E12, 31999.0]], "isOverall": false, "label": "DeleteTask 1341", "isController": false}, {"data": [[1.61064474E12, 31450.0]], "isOverall": false, "label": "DeleteTask 1340", "isController": false}, {"data": [[1.61064474E12, 25513.0]], "isOverall": false, "label": "DeleteTask 1344", "isController": false}, {"data": [[1.61064474E12, 29553.0]], "isOverall": false, "label": "DeleteTask 1349", "isController": false}, {"data": [[1.61064474E12, 30728.0]], "isOverall": false, "label": "DeleteTask 1469", "isController": false}, {"data": [[1.61064474E12, 30802.0]], "isOverall": false, "label": "DeleteTask 1348", "isController": false}, {"data": [[1.61064474E12, 29440.0]], "isOverall": false, "label": "DeleteTask 1347", "isController": false}, {"data": [[1.61064474E12, 29876.757763975158], [1.61064462E12, 4503.9315789473685], [1.61064468E12, 17202.104587155965]], "isOverall": false, "label": "ReadTodo", "isController": false}, {"data": [[1.61064468E12, 4805.0]], "isOverall": false, "label": "DeleteTodo 1464", "isController": false}, {"data": [[1.61064474E12, 29554.0]], "isOverall": false, "label": "DeleteTodo 1585", "isController": false}, {"data": [[1.61064474E12, 35267.0]], "isOverall": false, "label": "DeleteTask 1509", "isController": false}, {"data": [[1.61064468E12, 16080.0]], "isOverall": false, "label": "DeleteTask 1292", "isController": false}, {"data": [[1.61064474E12, 23239.0]], "isOverall": false, "label": "DeleteTask 1291", "isController": false}, {"data": [[1.61064468E12, 23670.0]], "isOverall": false, "label": "DeleteTask 1290", "isController": false}, {"data": [[1.61064474E12, 29722.0]], "isOverall": false, "label": "DeleteTask 1330", "isController": false}, {"data": [[1.61064474E12, 29062.0]], "isOverall": false, "label": "DeleteTask 1295", "isController": false}, {"data": [[1.61064474E12, 32492.0]], "isOverall": false, "label": "DeleteTask 1334", "isController": false}, {"data": [[1.61064474E12, 30720.0]], "isOverall": false, "label": "DeleteTask 1332", "isController": false}, {"data": [[1.61064474E12, 32538.0]], "isOverall": false, "label": "DeleteTask 1453", "isController": false}, {"data": [[1.61064474E12, 28389.0]], "isOverall": false, "label": "DeleteTask 1298", "isController": false}, {"data": [[1.61064474E12, 30686.0]], "isOverall": false, "label": "DeleteTask 1573", "isController": false}, {"data": [[1.61064474E12, 31392.0]], "isOverall": false, "label": "DeleteTask 1338", "isController": false}, {"data": [[1.61064474E12, 32104.0]], "isOverall": false, "label": "DeleteTask 1459", "isController": false}, {"data": [[1.61064474E12, 31782.0]], "isOverall": false, "label": "DeleteTask 1578", "isController": false}, {"data": [[1.61064468E12, 22680.0]], "isOverall": false, "label": "DeleteTask 1335", "isController": false}, {"data": [[1.61064474E12, 31347.0]], "isOverall": false, "label": "DeleteTask 1339", "isController": false}, {"data": [[1.61064474E12, 26329.0]], "isOverall": false, "label": "DeleteTask 1282", "isController": false}, {"data": [[1.61064468E12, 23700.0]], "isOverall": false, "label": "DeleteTask 1281", "isController": false}, {"data": [[1.61064474E12, 30383.0]], "isOverall": false, "label": "DeleteTask 1286", "isController": false}, {"data": [[1.61064474E12, 31743.0]], "isOverall": false, "label": "DeleteTask 1561", "isController": false}, {"data": [[1.61064474E12, 29889.0]], "isOverall": false, "label": "DeleteTask 1285", "isController": false}, {"data": [[1.61064474E12, 31068.0]], "isOverall": false, "label": "DeleteTask 1284", "isController": false}, {"data": [[1.61064474E12, 25677.0]], "isOverall": false, "label": "DeleteTask 1283", "isController": false}, {"data": [[1.61064474E12, 30071.0]], "isOverall": false, "label": "DeleteTask 1289", "isController": false}, {"data": [[1.61064474E12, 29416.0]], "isOverall": false, "label": "DeleteTodo 1805", "isController": false}, {"data": [[1.61064474E12, 31801.0]], "isOverall": false, "label": "DeleteTask 1442", "isController": false}, {"data": [[1.61064474E12, 32354.0]], "isOverall": false, "label": "DeleteTask 1287", "isController": false}, {"data": [[1.61064474E12, 29837.38492063491], [1.61064462E12, 4649.599999999999], [1.61064468E12, 18268.649006622523]], "isOverall": false, "label": "ReadTask", "isController": false}, {"data": [[1.61064468E12, 22949.0]], "isOverall": false, "label": "DeleteTask 1271", "isController": false}, {"data": [[1.61064468E12, 16568.0]], "isOverall": false, "label": "DeleteTask 1270", "isController": false}, {"data": [[1.61064474E12, 26502.0]], "isOverall": false, "label": "DeleteTask 1275", "isController": false}, {"data": [[1.61064474E12, 31561.0]], "isOverall": false, "label": "DeleteTask 1396", "isController": false}, {"data": [[1.61064474E12, 31429.0]], "isOverall": false, "label": "DeleteTask 1274", "isController": false}, {"data": [[1.61064474E12, 29025.0]], "isOverall": false, "label": "DeleteTask 1273", "isController": false}, {"data": [[1.61064474E12, 31606.0]], "isOverall": false, "label": "DeleteTask 1272", "isController": false}, {"data": [[1.61064474E12, 25293.0]], "isOverall": false, "label": "DeleteTask 1312", "isController": false}, {"data": [[1.61064474E12, 26345.0]], "isOverall": false, "label": "DeleteTask 1279", "isController": false}, {"data": [[1.61064468E12, 17288.0]], "isOverall": false, "label": "DeleteTask 1278", "isController": false}, {"data": [[1.61064474E12, 35691.0]], "isOverall": false, "label": "DeleteTask 1399", "isController": false}, {"data": [[1.61064474E12, 26625.0]], "isOverall": false, "label": "DeleteTask 1277", "isController": false}, {"data": [[1.61064468E12, 23598.0]], "isOverall": false, "label": "DeleteTask 1276", "isController": false}, {"data": [[1.61064474E12, 29533.0]], "isOverall": false, "label": "DeleteTask 1316", "isController": false}, {"data": [[1.61064474E12, 40331.0]], "isOverall": false, "label": "DeleteTask 1439", "isController": false}, {"data": [[1.61064474E12, 27050.0]], "isOverall": false, "label": "DeleteTask 1438", "isController": false}, {"data": [[1.61064468E12, 18795.0]], "isOverall": false, "label": "DeleteTask 1260", "isController": false}, {"data": [[1.61064468E12, 18947.0]], "isOverall": false, "label": "DeleteTask 1264", "isController": false}, {"data": [[1.61064474E12, 32387.0]], "isOverall": false, "label": "DeleteTask 1385", "isController": false}, {"data": [[1.61064468E12, 18855.0]], "isOverall": false, "label": "DeleteTask 1263", "isController": false}, {"data": [[1.61064474E12, 31572.0]], "isOverall": false, "label": "DeleteTask 1262", "isController": false}, {"data": [[1.61064474E12, 29094.52857142856], [1.61064462E12, 2226.9848101265816], [1.61064468E12, 17930.55452865065]], "isOverall": false, "label": "CreateTask", "isController": false}, {"data": [[1.61064468E12, 2412.0]], "isOverall": false, "label": "DeleteTask 1261", "isController": false}, {"data": [[1.61064474E12, 31275.0]], "isOverall": false, "label": "DeleteTask 1382", "isController": false}, {"data": [[1.61064468E12, 12846.0]], "isOverall": false, "label": "DeleteTask 1301", "isController": false}, {"data": [[1.61064474E12, 25427.0]], "isOverall": false, "label": "DeleteTask 1268", "isController": false}, {"data": [[1.61064474E12, 30547.0]], "isOverall": false, "label": "DeleteTask 1422", "isController": false}, {"data": [[1.61064468E12, 13620.0]], "isOverall": false, "label": "DeleteTask 1267", "isController": false}, {"data": [[1.61064468E12, 17679.0]], "isOverall": false, "label": "DeleteTask 1300", "isController": false}, {"data": [[1.61064468E12, 17516.0]], "isOverall": false, "label": "DeleteTask 1266", "isController": false}, {"data": [[1.61064474E12, 26186.0]], "isOverall": false, "label": "DeleteTask 1425", "isController": false}, {"data": [[1.61064474E12, 31708.0]], "isOverall": false, "label": "DeleteTask 1302", "isController": false}, {"data": [[1.61064474E12, 31380.0]], "isOverall": false, "label": "DeleteTodo 1785", "isController": false}, {"data": [[1.61064474E12, 30964.0]], "isOverall": false, "label": "DeleteTodo 1786", "isController": false}, {"data": [[1.61064474E12, 30661.0]], "isOverall": false, "label": "DeleteTask 1307", "isController": false}, {"data": [[1.61064474E12, 32254.0]], "isOverall": false, "label": "DeleteTodo 1784", "isController": false}, {"data": [[1.61064474E12, 30718.0]], "isOverall": false, "label": "DeleteTodo 1788", "isController": false}, {"data": [[1.61064468E12, 17427.0]], "isOverall": false, "label": "DeleteTask 1257", "isController": false}, {"data": [[1.61064474E12, 26508.0]], "isOverall": false, "label": "DeleteTask 1256", "isController": false}, {"data": [[1.61064474E12, 28389.0]], "isOverall": false, "label": "DeleteTask 1498", "isController": false}, {"data": [[1.61064468E12, 16462.0]], "isOverall": false, "label": "DeleteTask 1259", "isController": false}, {"data": [[1.61064474E12, 31113.0]], "isOverall": false, "label": "DeleteTask 1534", "isController": false}, {"data": [[1.61064474E12, 31451.0]], "isOverall": false, "label": "DeleteTodo 1718", "isController": false}, {"data": [[1.61064468E12, 16703.0]], "isOverall": false, "label": "DeleteTask 1258", "isController": false}, {"data": [[1.61064474E12, 32159.0]], "isOverall": false, "label": "DeleteTask 1539", "isController": false}, {"data": [[1.61064474E12, 30606.0]], "isOverall": false, "label": "DeleteTodo 1795", "isController": false}, {"data": [[1.61064474E12, 29789.93684210526], [1.61064468E12, 18450.22222222222]], "isOverall": false, "label": "UpdateTodo", "isController": false}, {"data": [[1.61064474E12, 30497.904347826086], [1.61064462E12, 1083.6028806584363], [1.61064468E12, 17927.01545454544]], "isOverall": false, "label": "CreateTodo", "isController": false}, {"data": [[1.61064474E12, 32129.0]], "isOverall": false, "label": "DeleteTask 1362", "isController": false}, {"data": [[1.61064468E12, 22760.0]], "isOverall": false, "label": "DeleteTask 1360", "isController": false}, {"data": [[1.61064474E12, 29517.0]], "isOverall": false, "label": "DeleteTodo 1728", "isController": false}, {"data": [[1.61064474E12, 28104.0]], "isOverall": false, "label": "DeleteTask 1404", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.61064474E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.61064462E12, "maxY": 30497.81739130435, "series": [{"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1473", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1352", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1356", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1475", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1359", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1358", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1357", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1731", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1732", "isController": false}, {"data": [[1.61064474E12, 29885.361111111106], [1.61064468E12, 18216.98319327732]], "isOverall": false, "label": "UpdateTask", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1341", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1340", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1344", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1349", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1469", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1348", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1347", "isController": false}, {"data": [[1.61064474E12, 29870.018633540367], [1.61064462E12, 4499.352631578949], [1.61064468E12, 17196.647706422016]], "isOverall": false, "label": "ReadTodo", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1464", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1585", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1509", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1292", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1291", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1290", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1330", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1295", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1334", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1332", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1453", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1298", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1573", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1338", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1459", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1578", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1335", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1339", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1282", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1281", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1286", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1561", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1285", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1284", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1283", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1289", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1805", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1442", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1287", "isController": false}, {"data": [[1.61064474E12, 29835.05158730158], [1.61064462E12, 4648.066666666667], [1.61064468E12, 18266.887417218564]], "isOverall": false, "label": "ReadTask", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1271", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1270", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1275", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1396", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1274", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1273", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1272", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1312", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1279", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1278", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1399", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1277", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1276", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1316", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1439", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1438", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1260", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1264", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1385", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1263", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1262", "isController": false}, {"data": [[1.61064474E12, 29094.433333333334], [1.61064462E12, 2226.883544303798], [1.61064468E12, 17930.44731977818]], "isOverall": false, "label": "CreateTask", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1261", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1382", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1301", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1268", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1422", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1267", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1300", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1266", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1425", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1302", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1785", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1786", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1307", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1784", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1788", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1257", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1256", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1498", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1259", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1534", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1718", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1258", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1539", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1795", "isController": false}, {"data": [[1.61064474E12, 29789.85263157896], [1.61064468E12, 18450.13513513516]], "isOverall": false, "label": "UpdateTodo", "isController": false}, {"data": [[1.61064474E12, 30497.81739130435], [1.61064462E12, 1079.2366255144034], [1.61064468E12, 17926.87636363636]], "isOverall": false, "label": "CreateTodo", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1362", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1360", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1728", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1404", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.61064474E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.61064462E12, "maxY": 149.9670781893004, "series": [{"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1473", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1352", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1356", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1475", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1359", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1358", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1357", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1731", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1732", "isController": false}, {"data": [[1.61064474E12, 0.013888888888888888], [1.61064468E12, 0.0]], "isOverall": false, "label": "UpdateTask", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1341", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1340", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1344", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1349", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1469", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1348", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1347", "isController": false}, {"data": [[1.61064474E12, 0.0], [1.61064462E12, 0.0], [1.61064468E12, 0.0]], "isOverall": false, "label": "ReadTodo", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1464", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1585", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1509", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1292", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1291", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1290", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1330", "isController": false}, {"data": [[1.61064474E12, 1.0]], "isOverall": false, "label": "DeleteTask 1295", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1334", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1332", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1453", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1298", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1573", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1338", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1459", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1578", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1335", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1339", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1282", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1281", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1286", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1561", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1285", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1284", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1283", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1289", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1805", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1442", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1287", "isController": false}, {"data": [[1.61064474E12, 0.1349206349206349], [1.61064462E12, 0.0], [1.61064468E12, 0.0]], "isOverall": false, "label": "ReadTask", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1271", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1270", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1275", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1396", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1274", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1273", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1272", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1312", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1279", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1278", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1399", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1277", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1276", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1316", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1439", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1438", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1260", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1264", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1385", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1263", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1262", "isController": false}, {"data": [[1.61064474E12, 0.0], [1.61064462E12, 0.0], [1.61064468E12, 0.0]], "isOverall": false, "label": "CreateTask", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1261", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1382", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1301", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1268", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1422", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1267", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1300", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1266", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1425", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1302", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1785", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1786", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1307", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1784", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1788", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1257", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1256", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1498", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1259", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1534", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1718", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1258", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1539", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1795", "isController": false}, {"data": [[1.61064474E12, 0.1473684210526316], [1.61064468E12, 0.0]], "isOverall": false, "label": "UpdateTodo", "isController": false}, {"data": [[1.61064474E12, 0.7043478260869566], [1.61064462E12, 149.9670781893004], [1.61064468E12, 1.1072727272727254]], "isOverall": false, "label": "CreateTodo", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1362", "isController": false}, {"data": [[1.61064468E12, 0.0]], "isOverall": false, "label": "DeleteTask 1360", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTodo 1728", "isController": false}, {"data": [[1.61064474E12, 0.0]], "isOverall": false, "label": "DeleteTask 1404", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.61064474E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.61064462E12, "maxY": 40340.0, "series": [{"data": [[1.61064474E12, 40340.0], [1.61064462E12, 9260.0], [1.61064468E12, 29184.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.61064474E12, 32452.4], [1.61064462E12, 6253.6], [1.61064468E12, 20769.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.61064474E12, 37451.89], [1.61064462E12, 8886.8], [1.61064468E12, 24713.25]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.61064474E12, 33045.2], [1.61064462E12, 7539.099999999992], [1.61064468E12, 22771.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.61064474E12, 7074.0], [1.61064462E12, 1.0], [1.61064468E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.61064474E12, 30514.0], [1.61064462E12, 1653.0], [1.61064468E12, 18306.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.61064474E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 180.5, "minX": 8.0, "maxY": 32989.5, "series": [{"data": [[8.0, 24775.0], [14.0, 32989.5], [15.0, 26890.0], [17.0, 27648.0], [18.0, 32161.0], [19.0, 30539.0], [21.0, 9637.0], [22.0, 21792.0], [23.0, 32294.0], [24.0, 22261.0], [25.0, 9146.5], [26.0, 19802.0], [27.0, 32880.0], [28.0, 20249.0], [29.0, 25308.5], [30.0, 20409.0], [31.0, 15029.5], [32.0, 5630.5], [33.0, 18595.5], [34.0, 12241.0], [37.0, 17402.0], [36.0, 18947.5], [39.0, 3958.0], [38.0, 31542.5], [40.0, 20121.5], [41.0, 21221.0], [42.0, 16708.0], [43.0, 20090.0], [44.0, 28770.0], [45.0, 32321.0], [47.0, 18283.5], [46.0, 17486.0], [49.0, 17764.0], [48.0, 31265.0], [51.0, 19327.0], [50.0, 16823.5], [52.0, 24842.5], [53.0, 29144.5], [54.0, 18440.5], [55.0, 31096.0], [57.0, 29556.0], [59.0, 19095.0], [65.0, 17910.0], [66.0, 18119.0], [68.0, 19739.0], [78.0, 716.0], [82.0, 3343.0], [81.0, 19997.0], [83.0, 19870.0], [85.0, 18946.5], [121.0, 2551.0], [134.0, 17255.5], [171.0, 17516.0], [191.0, 1738.0], [214.0, 18340.0], [212.0, 18415.5], [398.0, 180.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 398.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 177.5, "minX": 8.0, "maxY": 32987.5, "series": [{"data": [[8.0, 24772.0], [14.0, 32987.5], [15.0, 26889.0], [17.0, 27646.0], [18.0, 32157.5], [19.0, 30539.0], [21.0, 9635.0], [22.0, 21078.0], [23.0, 32292.0], [24.0, 17628.0], [25.0, 9016.0], [26.0, 19801.0], [27.0, 32877.0], [28.0, 19467.5], [29.0, 22095.5], [30.0, 20407.0], [31.0, 14976.5], [32.0, 5520.0], [33.0, 18016.5], [34.0, 12241.0], [37.0, 17371.0], [36.0, 18947.5], [39.0, 3954.0], [38.0, 31399.0], [40.0, 20087.0], [41.0, 21162.0], [42.0, 16707.5], [43.0, 20044.0], [44.0, 28769.0], [45.0, 32272.0], [47.0, 17827.0], [46.0, 17478.5], [49.0, 17764.0], [48.0, 31261.0], [51.0, 19327.0], [50.0, 16823.5], [52.0, 22460.0], [53.0, 28097.0], [54.0, 18440.5], [55.0, 31096.0], [57.0, 29556.0], [59.0, 19094.0], [65.0, 17908.5], [66.0, 18119.0], [68.0, 19739.0], [78.0, 716.0], [82.0, 3343.0], [81.0, 19997.0], [83.0, 19870.0], [85.0, 18946.0], [121.0, 2551.0], [134.0, 17255.5], [171.0, 17516.0], [191.0, 1738.0], [214.0, 18335.5], [212.0, 18415.0], [398.0, 177.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 398.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.7, "minX": 1.61064462E12, "maxY": 55.5, "series": [{"data": [[1.61064474E12, 0.7], [1.61064462E12, 31.516666666666666], [1.61064468E12, 55.5]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.61064474E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.38333333333333336, "minX": 1.61064462E12, "maxY": 27.35, "series": [{"data": [[1.61064474E12, 6.883333333333334], [1.61064462E12, 3.6666666666666665], [1.61064468E12, 16.633333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.61064474E12, 5.416666666666667], [1.61064462E12, 14.683333333333334], [1.61064468E12, 27.35]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.61064474E12, 3.9833333333333334], [1.61064468E12, 7.533333333333333]], "isOverall": false, "label": "202", "isController": false}, {"data": [[1.61064474E12, 1.1833333333333333], [1.61064468E12, 0.38333333333333336]], "isOverall": false, "label": "204", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.61064474E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.61064462E12, "maxY": 18.333333333333332, "series": [{"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1382-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1307-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1260-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1399-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1292-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1335-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1277-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1534-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1785-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1464-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1264-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1339-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1341-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1283-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1805-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1498-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1360-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1300-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1422-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1453-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1312-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1268-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1788-success", "isController": false}, {"data": [[1.61064474E12, 1.5833333333333333], [1.61064468E12, 5.55]], "isOverall": false, "label": "UpdateTodo-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1287-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1258-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1349-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1273-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1728-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1438-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1731-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1316-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1338-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1261-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1795-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1278-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1473-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1585-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1784-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1295-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1282-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1298-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1286-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1270-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1358-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1330-success", "isController": false}, {"data": [[1.61064474E12, 1.9166666666666667], [1.61064462E12, 8.1], [1.61064468E12, 18.333333333333332]], "isOverall": false, "label": "CreateTodo-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1334-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1578-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1396-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1439-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1274-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1301-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1291-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1257-success", "isController": false}, {"data": [[1.61064474E12, 3.5], [1.61064462E12, 6.583333333333333], [1.61064468E12, 9.016666666666667]], "isOverall": false, "label": "CreateTask-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1290-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1352-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1275-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1459-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1442-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1262-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1281-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1279-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1266-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1356-success", "isController": false}, {"data": [[1.61064474E12, 2.4], [1.61064468E12, 1.9833333333333334]], "isOverall": false, "label": "UpdateTask-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1573-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1359-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1362-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1271-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1285-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1561-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1289-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1347-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1256-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1302-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1469-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1276-success", "isController": false}, {"data": [[1.61064474E12, 4.2], [1.61064462E12, 0.5], [1.61064468E12, 7.55]], "isOverall": false, "label": "ReadTask-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1385-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1259-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1263-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1539-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1509-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1475-success", "isController": false}, {"data": [[1.61064474E12, 2.683333333333333], [1.61064462E12, 3.1666666666666665], [1.61064468E12, 9.083333333333334]], "isOverall": false, "label": "ReadTodo-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1718-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1786-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1357-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1340-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1284-success", "isController": false}, {"data": [[1.61064468E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1267-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1404-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1344-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1332-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTodo 1732-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1272-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1425-success", "isController": false}, {"data": [[1.61064474E12, 0.016666666666666666]], "isOverall": false, "label": "DeleteTask 1348-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.61064474E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 17.466666666666665, "minX": 1.61064462E12, "maxY": 51.9, "series": [{"data": [[1.61064474E12, 17.466666666666665], [1.61064462E12, 18.35], [1.61064468E12, 51.9]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.61064474E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

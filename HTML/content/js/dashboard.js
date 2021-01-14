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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.08987269618088542, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "DeleteTask 1473"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1352"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1356"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1475"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1359"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1358"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1357"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1731"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1732"], "isController": false}, {"data": [0.0038022813688212928, 500, 1500, "UpdateTask"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1341"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1340"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1344"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1349"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1469"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1348"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1347"], "isController": false}, {"data": [0.023995535714285716, 500, 1500, "ReadTodo"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1464"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1585"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1509"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1292"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1291"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1290"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1330"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1295"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1334"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1332"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1453"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1298"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1573"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1338"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1459"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1578"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1335"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1339"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1282"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1281"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1286"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1561"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1285"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1284"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1283"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1289"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1805"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1442"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1287"], "isController": false}, {"data": [0.004081632653061225, 500, 1500, "ReadTask"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1271"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1270"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1275"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1396"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1274"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1273"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1272"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1312"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1279"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1278"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1399"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1277"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1276"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1316"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1439"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1438"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1260"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1264"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1385"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1263"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1262"], "isController": false}, {"data": [0.07635253054101222, 500, 1500, "CreateTask"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1261"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1382"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1301"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1268"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1422"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1267"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1300"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1266"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1425"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1302"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1785"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1786"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1307"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1784"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1788"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1257"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1256"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1498"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1259"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1534"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1718"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1258"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1539"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1795"], "isController": false}, {"data": [0.002336448598130841, 500, 1500, "UpdateTodo"], "isController": false}, {"data": [0.21105232216343328, 500, 1500, "CreateTodo"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1362"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1360"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTodo 1728"], "isController": false}, {"data": [0.0, 500, 1500, "DeleteTask 1404"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 5263, 0, 0.0, 16988.651529545874, 1, 40340, 18294.0, 30502.600000000002, 31599.8, 33044.44, 51.66642124380307, 2682.484151051637, 11.131460756884112], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["DeleteTask 1473", 1, 0, 0.0, 21524.0, 21524, 21524, 21524.0, 21524.0, 21524.0, 21524.0, 0.04645976584278015, 0.008665835230440438, 0.008438980905036239], "isController": false}, {"data": ["DeleteTask 1352", 1, 0, 0.0, 31931.0, 31931, 31931, 31931.0, 31931.0, 31931.0, 31931.0, 0.03131752842065704, 0.005841453055024897, 0.005688535435783407], "isController": false}, {"data": ["DeleteTask 1356", 1, 0, 0.0, 16545.0, 16545, 16545, 16545.0, 16545.0, 16545.0, 16545.0, 0.060441220912662436, 0.011273704291326684, 0.010978581142339074], "isController": false}, {"data": ["DeleteTask 1475", 1, 0, 0.0, 32273.0, 32273, 32273, 32273.0, 32273.0, 32273.0, 32273.0, 0.030985653642363584, 0.005779550630558051, 0.005628253493632448], "isController": false}, {"data": ["DeleteTask 1359", 1, 0, 0.0, 32000.0, 32000, 32000, 32000.0, 32000.0, 32000.0, 32000.0, 0.03125, 0.005828857421875, 0.00567626953125], "isController": false}, {"data": ["DeleteTask 1358", 1, 0, 0.0, 29363.0, 29363, 29363, 29363.0, 29363.0, 29363.0, 29363.0, 0.03405646561999796, 0.006352329036542588, 0.006186037700507441], "isController": false}, {"data": ["DeleteTask 1357", 1, 0, 0.0, 30696.0, 30696, 30696, 30696.0, 30696.0, 30696.0, 30696.0, 0.032577534532186606, 0.006076473726218399, 0.005917403733385457], "isController": false}, {"data": ["DeleteTodo 1731", 1, 0, 0.0, 26176.0, 26176, 26176, 26176.0, 26176.0, 26176.0, 26176.0, 0.038202933985330076, 0.00712574256952934, 0.006939204805929096], "isController": false}, {"data": ["DeleteTodo 1732", 1, 0, 0.0, 28739.0, 28739, 28739, 28739.0, 28739.0, 28739.0, 28739.0, 0.034795921917951216, 0.006490254967117854, 0.006320353004627857], "isController": false}, {"data": ["UpdateTask", 263, 0, 0.0, 24605.8403041825, 811, 38445, 26155.0, 31539.8, 32360.399999999998, 36659.32000000001, 3.2103708405556506, 0.9781598654817998, 0.7461604102072703], "isController": false}, {"data": ["DeleteTask 1341", 1, 0, 0.0, 31999.0, 31999, 31999, 31999.0, 31999.0, 31999.0, 31999.0, 0.03125097659301853, 0.005829039579361856, 0.005676446920216257], "isController": false}, {"data": ["DeleteTask 1340", 1, 0, 0.0, 31450.0, 31450, 31450, 31450.0, 31450.0, 31450.0, 31450.0, 0.03179650238473768, 0.005930792925278219, 0.0057755365659777425], "isController": false}, {"data": ["DeleteTask 1344", 1, 0, 0.0, 25513.0, 25513, 25513, 25513.0, 25513.0, 25513.0, 25513.0, 0.03919570415082507, 0.00731091747344491, 0.00711953219927096], "isController": false}, {"data": ["DeleteTask 1349", 1, 0, 0.0, 29553.0, 29553, 29553, 29553.0, 29553.0, 29553.0, 29553.0, 0.03383751226609819, 0.00631148910432105, 0.006146266876459243], "isController": false}, {"data": ["DeleteTask 1469", 1, 0, 0.0, 30728.0, 30728, 30728, 30728.0, 30728.0, 30728.0, 30728.0, 0.03254360843530331, 0.0060701457140067685, 0.005911241375943764], "isController": false}, {"data": ["DeleteTask 1348", 1, 0, 0.0, 30802.0, 30802, 30802, 30802.0, 30802.0, 30802.0, 30802.0, 0.032465424323095904, 0.006055562544639959, 0.005897039964937342], "isController": false}, {"data": ["DeleteTask 1347", 1, 0, 0.0, 29440.0, 29440, 29440, 29440.0, 29440.0, 29440.0, 29440.0, 0.033967391304347824, 0.006335714588994565, 0.006169858186141304], "isController": false}, {"data": ["ReadTodo", 896, 0, 0.0, 16786.888392857138, 305, 40340, 17731.0, 29801.800000000007, 31608.899999999998, 33217.119999999995, 9.149485851994813, 2119.5779934474212, 1.4028020300421733], "isController": false}, {"data": ["DeleteTodo 1464", 1, 0, 0.0, 4805.0, 4805, 4805, 4805.0, 4805.0, 4805.0, 4805.0, 0.2081165452653486, 0.038818613423517175, 0.03780241935483871], "isController": false}, {"data": ["DeleteTodo 1585", 1, 0, 0.0, 29554.0, 29554, 29554, 29554.0, 29554.0, 29554.0, 29554.0, 0.033836367327603714, 0.006311275546457332, 0.0061460589091155175], "isController": false}, {"data": ["DeleteTask 1509", 1, 0, 0.0, 35267.0, 35267, 35267, 35267.0, 35267.0, 35267.0, 35267.0, 0.028355119516828765, 0.00528889436300224, 0.005150441630986474], "isController": false}, {"data": ["DeleteTask 1292", 1, 0, 0.0, 16080.0, 16080, 16080, 16080.0, 16080.0, 16080.0, 16080.0, 0.062189054726368154, 0.011599716262437812, 0.011296058768656718], "isController": false}, {"data": ["DeleteTask 1291", 1, 0, 0.0, 23239.0, 23239, 23239, 23239.0, 23239.0, 23239.0, 23239.0, 0.04303111149360988, 0.008026310835233873, 0.007816197986143981], "isController": false}, {"data": ["DeleteTask 1290", 1, 0, 0.0, 23670.0, 23670, 23670, 23670.0, 23670.0, 23670.0, 23670.0, 0.04224757076468103, 0.00788016212505281, 0.0076738751584283895], "isController": false}, {"data": ["DeleteTask 1330", 1, 0, 0.0, 29722.0, 29722, 29722, 29722.0, 29722.0, 29722.0, 29722.0, 0.03364511136531862, 0.006275601826929547, 0.006111319056591077], "isController": false}, {"data": ["DeleteTask 1295", 1, 0, 0.0, 29062.0, 29062, 29062, 29062.0, 29062.0, 29062.0, 29062.0, 0.034409194136673316, 0.006418121171977152, 0.006250107528731677], "isController": false}, {"data": ["DeleteTask 1334", 1, 0, 0.0, 32492.0, 32492, 32492, 32492.0, 32492.0, 32492.0, 32492.0, 0.030776806598547337, 0.0057405957620337315, 0.0055903183860642625], "isController": false}, {"data": ["DeleteTask 1332", 1, 0, 0.0, 30720.0, 30720, 30720, 30720.0, 30720.0, 30720.0, 30720.0, 0.032552083333333336, 0.006071726481119792, 0.00591278076171875], "isController": false}, {"data": ["DeleteTask 1453", 1, 0, 0.0, 32538.0, 32538, 32538, 32538.0, 32538.0, 32538.0, 32538.0, 0.030733296453377593, 0.005732480100190547, 0.005582415176101789], "isController": false}, {"data": ["DeleteTask 1298", 1, 0, 0.0, 28389.0, 28389, 28389, 28389.0, 28389.0, 28389.0, 28389.0, 0.03522491105709958, 0.006570271496001973, 0.006398274859980979], "isController": false}, {"data": ["DeleteTask 1573", 1, 0, 0.0, 30686.0, 30686, 30686, 30686.0, 30686.0, 30686.0, 30686.0, 0.032588150948315193, 0.006078453936648635, 0.005919332105846315], "isController": false}, {"data": ["DeleteTask 1338", 1, 0, 0.0, 31392.0, 31392, 31392, 31392.0, 31392.0, 31392.0, 31392.0, 0.03185524974515801, 0.0059417506848878695, 0.005786207473241591], "isController": false}, {"data": ["DeleteTask 1459", 1, 0, 0.0, 32104.0, 32104, 32104, 32104.0, 32104.0, 32104.0, 32104.0, 0.03114876650884625, 0.005809975003114877, 0.005657881416645901], "isController": false}, {"data": ["DeleteTask 1578", 1, 0, 0.0, 31782.0, 31782, 31782, 31782.0, 31782.0, 31782.0, 31782.0, 0.031464350890441126, 0.005868838886791266, 0.005715204360959033], "isController": false}, {"data": ["DeleteTask 1335", 1, 0, 0.0, 22680.0, 22680, 22680, 22680.0, 22680.0, 22680.0, 22680.0, 0.04409171075837743, 0.00822413745590829, 0.0080088458994709], "isController": false}, {"data": ["DeleteTask 1339", 1, 0, 0.0, 31347.0, 31347, 31347, 31347.0, 31347.0, 31347.0, 31347.0, 0.031900979360066355, 0.005950280329856126, 0.005794513829074552], "isController": false}, {"data": ["DeleteTask 1282", 1, 0, 0.0, 26329.0, 26329, 26329, 26329.0, 26329.0, 26329.0, 26329.0, 0.037980933571347186, 0.007084334289186828, 0.006898880511982984], "isController": false}, {"data": ["DeleteTask 1281", 1, 0, 0.0, 23700.0, 23700, 23700, 23700.0, 23700.0, 23700.0, 23700.0, 0.04219409282700422, 0.00787018723628692, 0.007664161392405063], "isController": false}, {"data": ["DeleteTask 1286", 1, 0, 0.0, 30383.0, 30383, 30383, 30383.0, 30383.0, 30383.0, 30383.0, 0.03291314221768753, 0.00613907242536945, 0.005978363723134648], "isController": false}, {"data": ["DeleteTask 1561", 1, 0, 0.0, 31743.0, 31743, 31743, 31743.0, 31743.0, 31743.0, 31743.0, 0.03150300853731531, 0.0058760494439718996, 0.00572222616009829], "isController": false}, {"data": ["DeleteTask 1285", 1, 0, 0.0, 29889.0, 29889, 29889, 29889.0, 29889.0, 29889.0, 29889.0, 0.03345712469470374, 0.0062405379069222795, 0.006077173040248921], "isController": false}, {"data": ["DeleteTask 1284", 1, 0, 0.0, 31068.0, 31068, 31068, 31068.0, 31068.0, 31068.0, 31068.0, 0.032187459765675296, 0.0060037156398867, 0.005846550308999613], "isController": false}, {"data": ["DeleteTask 1283", 1, 0, 0.0, 25677.0, 25677, 25677, 25677.0, 25677.0, 25677.0, 25677.0, 0.038945359660396466, 0.007264222358530981, 0.0070740594695642015], "isController": false}, {"data": ["DeleteTask 1289", 1, 0, 0.0, 30071.0, 30071, 30071, 30071.0, 30071.0, 30071.0, 30071.0, 0.033254630707326, 0.006202768032323501, 0.0060403919058228854], "isController": false}, {"data": ["DeleteTodo 1805", 1, 0, 0.0, 29416.0, 29416, 29416, 29416.0, 29416.0, 29416.0, 29416.0, 0.03399510470492249, 0.006340883787734566, 0.006174892065542561], "isController": false}, {"data": ["DeleteTask 1442", 1, 0, 0.0, 31801.0, 31801, 31801, 31801.0, 31801.0, 31801.0, 31801.0, 0.03144555202666583, 0.005865332458098802, 0.005711789723593598], "isController": false}, {"data": ["DeleteTask 1287", 1, 0, 0.0, 32354.0, 32354, 32354, 32354.0, 32354.0, 32354.0, 32354.0, 0.030908079371947825, 0.00576508121097855, 0.005614162854670211], "isController": false}, {"data": ["ReadTask", 735, 0, 0.0, 21679.19319727888, 364, 37471, 20277.0, 31875.8, 32511.399999999998, 33092.28, 7.291521993611238, 640.198498665701, 1.117938430661098], "isController": false}, {"data": ["DeleteTask 1271", 1, 0, 0.0, 22949.0, 22949, 22949, 22949.0, 22949.0, 22949.0, 22949.0, 0.04357488343718681, 0.008127737047365897, 0.007914969061832759], "isController": false}, {"data": ["DeleteTask 1270", 1, 0, 0.0, 16568.0, 16568, 16568, 16568.0, 16568.0, 16568.0, 16568.0, 0.06035731530661516, 0.011258053929261226, 0.010963340475615644], "isController": false}, {"data": ["DeleteTask 1275", 1, 0, 0.0, 26502.0, 26502, 26502, 26502.0, 26502.0, 26502.0, 26502.0, 0.03773300128292204, 0.00703808910648253, 0.006853845936155762], "isController": false}, {"data": ["DeleteTask 1396", 1, 0, 0.0, 31561.0, 31561, 31561, 31561.0, 31561.0, 31561.0, 31561.0, 0.031684674123126644, 0.00590993433351288, 0.005755224010646051], "isController": false}, {"data": ["DeleteTask 1274", 1, 0, 0.0, 31429.0, 31429, 31429, 31429.0, 31429.0, 31429.0, 31429.0, 0.03181774793980082, 0.0059347557192401925, 0.005779395621877884], "isController": false}, {"data": ["DeleteTask 1273", 1, 0, 0.0, 29025.0, 29025, 29025, 29025.0, 29025.0, 29025.0, 29025.0, 0.03445305770887166, 0.006426302756244617, 0.006258074935400517], "isController": false}, {"data": ["DeleteTask 1272", 1, 0, 0.0, 31606.0, 31606, 31606, 31606.0, 31606.0, 31606.0, 31606.0, 0.03163956210846042, 0.005901519885464785, 0.005747029836107068], "isController": false}, {"data": ["DeleteTask 1312", 1, 0, 0.0, 25293.0, 25293, 25293, 25293.0, 25293.0, 25293.0, 25293.0, 0.03953663068833274, 0.007374508263155814, 0.00718145830862294], "isController": false}, {"data": ["DeleteTask 1279", 1, 0, 0.0, 26345.0, 26345, 26345, 26345.0, 26345.0, 26345.0, 26345.0, 0.03795786676788764, 0.0070800317897134184, 0.006894690643385842], "isController": false}, {"data": ["DeleteTask 1278", 1, 0, 0.0, 17288.0, 17288, 17288, 17288.0, 17288.0, 17288.0, 17288.0, 0.05784359093012494, 0.010789185417630727, 0.010506746008792226], "isController": false}, {"data": ["DeleteTask 1399", 1, 0, 0.0, 35691.0, 35691, 35691, 35691.0, 35691.0, 35691.0, 35691.0, 0.028018267910677762, 0.0052260636434955585, 0.005089255694712952], "isController": false}, {"data": ["DeleteTask 1277", 1, 0, 0.0, 26625.0, 26625, 26625, 26625.0, 26625.0, 26625.0, 26625.0, 0.03755868544600939, 0.007005575117370892, 0.006822183098591549], "isController": false}, {"data": ["DeleteTask 1276", 1, 0, 0.0, 23598.0, 23598, 23598, 23598.0, 23598.0, 23598.0, 23598.0, 0.04237647258242224, 0.007904205335197898, 0.00769728896516654], "isController": false}, {"data": ["DeleteTask 1316", 1, 0, 0.0, 29533.0, 29533, 29533, 29533.0, 29533.0, 29533.0, 29533.0, 0.03386042731859276, 0.006315763298682829, 0.006150429180916263], "isController": false}, {"data": ["DeleteTask 1439", 1, 0, 0.0, 40331.0, 40331, 40331, 40331.0, 40331.0, 40331.0, 40331.0, 0.024794822840990802, 0.00462481558850512, 0.004503747117601845], "isController": false}, {"data": ["DeleteTask 1438", 1, 0, 0.0, 27050.0, 27050, 27050, 27050.0, 27050.0, 27050.0, 27050.0, 0.036968576709796676, 0.006895506007393715, 0.006714995378927911], "isController": false}, {"data": ["DeleteTask 1260", 1, 0, 0.0, 18795.0, 18795, 18795, 18795.0, 18795.0, 18795.0, 18795.0, 0.05320563979781857, 0.009924098829475923, 0.009664305666400638], "isController": false}, {"data": ["DeleteTask 1264", 1, 0, 0.0, 18947.0, 18947, 18947, 18947.0, 18947.0, 18947.0, 18947.0, 0.052778804032300626, 0.009844483955243575, 0.009586774951179607], "isController": false}, {"data": ["DeleteTask 1385", 1, 0, 0.0, 32387.0, 32387, 32387, 32387.0, 32387.0, 32387.0, 32387.0, 0.030876586284620373, 0.005759207012072745, 0.005608442430604872], "isController": false}, {"data": ["DeleteTask 1263", 1, 0, 0.0, 18855.0, 18855, 18855, 18855.0, 18855.0, 18855.0, 18855.0, 0.05303632988597189, 0.00989251856271546, 0.009633552108194113], "isController": false}, {"data": ["DeleteTask 1262", 1, 0, 0.0, 31572.0, 31572, 31572, 31572.0, 31572.0, 31572.0, 31572.0, 0.031673634866337265, 0.005907875253389079, 0.005753218833143291], "isController": false}, {"data": ["CreateTask", 1146, 0, 0.0, 14563.647469458994, 1, 36564, 17644.0, 28569.7, 30805.25, 32388.019999999997, 12.371401120550992, 3.7573298325110924, 3.3103163154599335], "isController": false}, {"data": ["DeleteTask 1261", 1, 0, 0.0, 2412.0, 2412, 2412, 2412.0, 2412.0, 2412.0, 2412.0, 0.41459369817578773, 0.07733144174958541, 0.07530705845771145], "isController": false}, {"data": ["DeleteTask 1382", 1, 0, 0.0, 31275.0, 31275, 31275, 31275.0, 31275.0, 31275.0, 31275.0, 0.0319744204636291, 0.005963978816946443, 0.005807853717026379], "isController": false}, {"data": ["DeleteTask 1301", 1, 0, 0.0, 12846.0, 12846, 12846, 12846.0, 12846.0, 12846.0, 12846.0, 0.07784524365561264, 0.014519962439669937, 0.014139858710882766], "isController": false}, {"data": ["DeleteTask 1268", 1, 0, 0.0, 25427.0, 25427, 25427, 25427.0, 25427.0, 25427.0, 25427.0, 0.039328273095528374, 0.007335644688716719, 0.0071436121052424586], "isController": false}, {"data": ["DeleteTask 1422", 1, 0, 0.0, 30547.0, 30547, 30547, 30547.0, 30547.0, 30547.0, 30547.0, 0.032736438930173174, 0.006106113120764723, 0.005946267227550987], "isController": false}, {"data": ["DeleteTask 1267", 1, 0, 0.0, 13620.0, 13620, 13620, 13620.0, 13620.0, 13620.0, 13620.0, 0.07342143906020558, 0.013694819199706314, 0.013336316079295155], "isController": false}, {"data": ["DeleteTask 1300", 1, 0, 0.0, 17679.0, 17679, 17679, 17679.0, 17679.0, 17679.0, 17679.0, 0.056564285310255105, 0.010550564935799537, 0.010274372136433056], "isController": false}, {"data": ["DeleteTask 1266", 1, 0, 0.0, 17516.0, 17516, 17516, 17516.0, 17516.0, 17516.0, 17516.0, 0.057090659968029235, 0.010648746146380453, 0.010369983158255311], "isController": false}, {"data": ["DeleteTask 1425", 1, 0, 0.0, 26186.0, 26186, 26186, 26186.0, 26186.0, 26186.0, 26186.0, 0.03818834491713129, 0.007123021366378981, 0.006936554838463301], "isController": false}, {"data": ["DeleteTask 1302", 1, 0, 0.0, 31708.0, 31708, 31708, 31708.0, 31708.0, 31708.0, 31708.0, 0.03153778226315126, 0.005882535558849502, 0.005728542481392708], "isController": false}, {"data": ["DeleteTodo 1785", 1, 0, 0.0, 31380.0, 31380, 31380, 31380.0, 31380.0, 31380.0, 31380.0, 0.0318674314850223, 0.005944022864882091, 0.00578842017208413], "isController": false}, {"data": ["DeleteTodo 1786", 1, 0, 0.0, 30964.0, 30964, 30964, 30964.0, 30964.0, 30964.0, 30964.0, 0.032295569047926624, 0.006023880554837877, 0.005866187346596047], "isController": false}, {"data": ["DeleteTask 1307", 1, 0, 0.0, 30661.0, 30661, 30661, 30661.0, 30661.0, 30661.0, 30661.0, 0.03261472228563973, 0.006083410113825381, 0.0059241585401650304], "isController": false}, {"data": ["DeleteTodo 1784", 1, 0, 0.0, 32254.0, 32254, 32254, 32254.0, 32254.0, 32254.0, 32254.0, 0.03100390649221802, 0.0057829552148570725, 0.005631568952688039], "isController": false}, {"data": ["DeleteTodo 1788", 1, 0, 0.0, 30718.0, 30718, 30718, 30718.0, 30718.0, 30718.0, 30718.0, 0.03255420274757471, 0.00607212180154958, 0.005913165733446188], "isController": false}, {"data": ["DeleteTask 1257", 1, 0, 0.0, 17427.0, 17427, 17427, 17427.0, 17427.0, 17427.0, 17427.0, 0.05738222298731853, 0.01070312948298617, 0.010422942847305905], "isController": false}, {"data": ["DeleteTask 1256", 1, 0, 0.0, 26508.0, 26508, 26508, 26508.0, 26508.0, 26508.0, 26508.0, 0.03772446054021428, 0.007036496057793874, 0.006852294590312359], "isController": false}, {"data": ["DeleteTask 1498", 1, 0, 0.0, 28389.0, 28389, 28389, 28389.0, 28389.0, 28389.0, 28389.0, 0.03522491105709958, 0.006570271496001973, 0.006398274859980979], "isController": false}, {"data": ["DeleteTask 1259", 1, 0, 0.0, 16462.0, 16462, 16462, 16462.0, 16462.0, 16462.0, 16462.0, 0.06074596039363382, 0.011330545346859434, 0.011033934212124894], "isController": false}, {"data": ["DeleteTask 1534", 1, 0, 0.0, 31113.0, 31113, 31113, 31113.0, 31113.0, 31113.0, 31113.0, 0.03214090573072349, 0.005995032221257995, 0.005838094204994697], "isController": false}, {"data": ["DeleteTodo 1718", 1, 0, 0.0, 31451.0, 31451, 31451, 31451.0, 31451.0, 31451.0, 31451.0, 0.03179549139931957, 0.005930604352802772, 0.005775352929954533], "isController": false}, {"data": ["DeleteTask 1258", 1, 0, 0.0, 16703.0, 16703, 16703, 16703.0, 16703.0, 16703.0, 16703.0, 0.05986948452373825, 0.011167062054720709, 0.010874730587319643], "isController": false}, {"data": ["DeleteTask 1539", 1, 0, 0.0, 32159.0, 32159, 32159, 32159.0, 32159.0, 32159.0, 32159.0, 0.03109549426288131, 0.00580003848067415, 0.005648205012593675], "isController": false}, {"data": ["DeleteTodo 1795", 1, 0, 0.0, 30606.0, 30606, 30606, 30606.0, 30606.0, 30606.0, 30606.0, 0.03267333202640005, 0.0060943422041429786, 0.005934804450107822], "isController": false}, {"data": ["UpdateTodo", 428, 0, 0.0, 20967.214953271035, 3, 34258, 19536.0, 30637.5, 31659.35, 32431.94, 4.344207385152555, 1.5993810392602668, 1.035143165993382], "isController": false}, {"data": ["CreateTodo", 1701, 0, 0.0, 13964.495590828925, 1, 39541, 17439.0, 20673.4, 30159.099999999948, 32223.96, 17.341217249464776, 5.571543432689367, 4.047413010373127], "isController": false}, {"data": ["DeleteTask 1362", 1, 0, 0.0, 32129.0, 32129, 32129, 32129.0, 32129.0, 32129.0, 32129.0, 0.03112452924149522, 0.005805454184692957, 0.0056534789442559685], "isController": false}, {"data": ["DeleteTask 1360", 1, 0, 0.0, 22760.0, 22760, 22760, 22760.0, 22760.0, 22760.0, 22760.0, 0.043936731107205626, 0.008195230118629174, 0.00798069529876977], "isController": false}, {"data": ["DeleteTodo 1728", 1, 0, 0.0, 29517.0, 29517, 29517, 29517.0, 29517.0, 29517.0, 29517.0, 0.03387878171900938, 0.00631918682454179, 0.006153763085679439], "isController": false}, {"data": ["DeleteTask 1404", 1, 0, 0.0, 28104.0, 28104, 28104, 28104.0, 28104.0, 28104.0, 28104.0, 0.03558212354113294, 0.0066368999964417875, 0.0064631591588386], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 5263, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});

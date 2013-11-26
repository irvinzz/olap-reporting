var mysql = require('mysql');
var _ = require('underscore');
var nodeExcel = require('excel-export');

var connection = mysql.createConnection({
    host: 'rt.uriit.local',
    user: 'rt4reader',
    password: '123wasp',
    database: 'rtdb'
});
connection.connect(function(err) {
    if (err) {
        console.log('mysql connection failed');
    }
    else {
        console.log('mysql connection succeed');
    }
});


process.on('exit', function() {
    connection.end();
});

module.exports = {
    get_id: function(req, res, id) {
        var c = connection;
        var queues = [4,19,20];
        var fmap = [16, 17, 8, 9, 31, 10, 13, 35];
        //var fmap = [];
        var cffq = 'SELECT id,Name FROM CustomFields WHERE id in (' + fmap.join(',') + ')';
        //return onGetMap({});
        console.log(cffq);
        connection.query(cffq, function(err, rows, fields) {
            if (err) return res.send(err);
            console.log(rows);
            var fmap = {};
            for (var i = 0; i < rows.length; i++) {
                fmap[rows[i].id] = rows[i].Name;
            }
            onGetMap(fmap);
        });

        function onGetMap(fmap) {
            var OCFVQT = 'SELECT Group_Concat(Content SEPARATOR ",") as Content, ObjectId From ObjectCustomFieldValues WHERE CustomField = ? Group By ObjectId';
            var filter = {
                //Status: ['worked','open','new','other',''],
                Status: ['deleted','rejected'],
                type: 'not'
            };
            var f = ['Tickets.id', 'Tickets.Status', 'Tickets.Subject', 'Tickets.Queue'];
            var a = [null, null, 'Organization'];
            var j = [];
            for (var i in fmap) {
                var sstn = 'table_' + _.uniqueId();
                f.push(sstn + '.Content ' + '"' + (fmap[i] || '') + '"');
                j.push(' LEFT JOIN (' + c.format(OCFVQT, [i]) + ') ' + sstn + ' ON ' + sstn + '.ObjectId = Tickets.id ');
            }
            var q = 'SELECT ' + f.join(',') + ' FROM Tickets ' + j.join(' ') + ' WHERE Queue in ('+queues.join(',')+') AND Status '+filter.type+' in ("'+filter.Status.join('","')+'")';
            console.log(q);
            connection.query(q, function(err, rows, fields) {
                if (err) {
                    res.send(err);
                }
                else {
                    makeExcel(rows,fields);
                }
            });
        }

        function makeExcel(rows,fields) {
            var conf = {};
            //conf.stylesXmlFile = "styles.xml";
            /*conf.cols = [{
                caption: 'string',
                type: 'string',
                beforeCellWrite: function(row, cellData) {
                    return cellData.toUpperCase();
                },
                width: 28.7109375
            }, {
                caption: 'date',
                type: 'date',
                beforeCellWrite: function() {
                    var originDate = new Date(Date.UTC(1899, 12, 29));
                    return function(row, cellData, eOpt) {
                        if (eOpt.rowNum % 2) {
                            eOpt.styleIndex = 1;
                        }
                        else {
                            eOpt.styleIndex = 2;
                        }
                        return (cellData - originDate) / (24 * 60 * 60 * 1000);
                    }
                }()
            }, {
                caption: 'bool',
                type: 'bool'
            }, {
                caption: 'number',
                type: 'number'
            }];
            conf.rows = [
                ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
                ["e", new Date(2012, 4, 1), false, 2.7182],
                ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.2]
            ];*/
            conf.cols = [];
            for (var i =0 ; i< fields.length;i++){
                var f = fields[i];
                conf.cols.push({
                    caption: f.name,
                    type: 'string',
                })
            }
            conf.rows=[];
            for (var j=0;j<rows.length;j++){
                conf.rows.push(_.values(rows[j]));
            }
            var result = nodeExcel.execute(conf);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            res.end(result, 'binary');
        }
    }
};


































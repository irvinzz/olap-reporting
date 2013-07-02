var palo = require('./libs');
function extractResult(fields,result){
    var _ret=[];
    for (var i=0,l=result.length;i<l;++i){
        var row = result[i];
        var r = {
            abbr: row[fields.abbr],
            text: row[fields.text]
        };
        _ret.push(r);
    }
    return {
        success: true,
        total: _ret.length,
        rows: _ret
    };
}
function extractResultWrap(opt,req,res){
    console.log('session >>> ',req.session);
    req.paloClient.call(opt.e,opt.r,{query: req.query},function(err,result){
        if (!err){
            res.send(extractResult(opt.fields,result.rows));
        }else{
            res.send({
                success: false,
                msg: result
            });
        }
    });
}
module.exports = {
    get_servers_index: function(req,res){
        res.send('fine');
    },
    /*get_server_databases_index: function(rq,rs){
        palo.getClientWrap(rq,rs,function(req,res){
            res.send('ok');
        });
    }*/
    get_server_databases_index: function(req,res){
        extractResultWrap({
            e: 'server',
            r: 'databases',
            fields: {
                abbr: 'database',
                text: 'name_database'
            }
        },req,res);
    },
    get_database_cubes_index: function(req,res){
        extractResultWrap({
            e: 'database',
            r: 'cubes',
            fields: {
                abbr: 'cube',
                text: 'name_cube'
            }
        },req,res);
    },
    get_dimension_elements: function(req,res){
        extractResultWrap({
            e: 'dimension',
            r: 'elements',
            fields: {
                abbr: 'element',
                text: 'name_element'
            }
        },req,res);
    },
    get_dimension_elements_tree: function(req,res){
        function treeElement(obj){
            return {
                text: obj.name_element,
                leaf: (obj.number_children!=='0' ? false: true),
                //parents: obj.parents,
                element: obj.element,
                children: obj.children,
                checked: (req.query.multiselect === 'true' ? false : undefined)
            };
        }
        function buildtree(s){
            var tree = [];
            var treeNode = {};
            var goodNodes = [];
            for (var j=0, k=s.length; j<k;j++){
                var el = s[j];
                var treeEl = treeElement(el);
                goodNodes.push(treeEl);
                treeNode[el.element]=treeEl;
            }
            for (var i=0, l=s.length; i<l;i++){
                var el2 = s[i];
                var treeEl2 = goodNodes[i];
                if (el2.parents===''){
                    treeEl2.expanded = true;
                    tree.push(treeEl2);
                }else{
                    var parent = el2.parents;
                    var p = treeNode[parent];
                    if (p===undefined) continue;
                    if (typeof p.children !== 'object'){
                        p.children=[];
                    }
                    p.children.push(treeEl2);
                }
            }
            return tree;
        }
        req.paloClient.call('dimension','elements',{
            query: req.query
        },function(err,result){
            if (!err){
                res.send(buildtree(result.rows));
            }else{
                res.send({
                    success: false,
                    msg: result
                });
            }
        });
    },
    get_cube_info_dimensions: function(req,res){
        function getDimension(id,cb){
            req.paloClient.call('dimension','info',{
                query: {
                    database: req.query.database,
                    dimension: id
                }
            },cb);
        }
        var j=0;
        
        var l;
        var _res = [];
        function onGetDimention(err,result){
            j++;
            if (!err){
                var dim = {
                    dimension: result.rows[0].dimension,
                    name_dimension: result.rows[0].name_dimension
                };
                _res.push(dim);
            }
            if (j>=l){
                res.send(
                    extractResult({
                        abbr: 'dimension',
                        text: 'name_dimension'
                    },_res)
                );
            }
        }
        
        req.paloClient.call('cube','info',{
            query: req.query
        },function(err,result){
            if (!err){
                var r = result.rows[0].dimensions.split(',');
                var i=0;
                l=r.length;
                (function nextTick(){
                    getDimension(r[i],function(err,result){
                        onGetDimention(err,result);
                        ++i;
                        if (i<l) nextTick();
                    });
                }());
            }else{
                res.send({
                    success: false,
                    msg: result
                });
            }
        });
    }
};



































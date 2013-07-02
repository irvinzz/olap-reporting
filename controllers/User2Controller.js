module.exports = {
    get_index: function (req,res){
        req.paloClient.call('dimension','elements',{
            query: {
                database: 0,
                dimension: 0,
                show_system: 1
            }
        },function(err,result){
            res.send(result);
        });
    }
};


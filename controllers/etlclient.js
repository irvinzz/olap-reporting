 /*var soap = require('soap');
  var url = '/home/irvin/CreditReportSimple.wsdl';
  var args = {name: 'value'};
  soap.createClient(url, function(err, client) {
      client.MyFunction(args, function(err, result) {
          console.log(result);
      });
  });
*/



/*
var SoapClient = require('node-soap-client').SoapClient;

new SoapClient({wsdl: '/home/irvin/CreditReportSimple.wsdl'}).init(function(err, metabus) {
    
    console.log(metabus);
    return;
    
    var searchingModule = new metabus.SearchingModule();

    searchingModule.search({geoFilter: {distance: 10}, text: ''}, function(err, result) {
        if (err)
            console.log(err.children[1].text())
        else
            console.log(result);
    });

    // or same request in other syntax
    // searchingModule.search(new metabus.SearchQuery({geoFilter: new metabus.GeoFilter({distance: 10}), text: 'кофе около кремля'}), function(err, result) {...})


    // args can be JSON objects or proxy objects, generated from WSDL

    // service methods signature
    // module.method(arg1, arg2, arg3, success_callback)
    // or module.method({"param1": arg1, "param2": arg2, "param3": arg3}, success_callback)
});
*/
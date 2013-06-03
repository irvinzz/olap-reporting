var fs = require('fs');
var parseString = require('xml2js').parseString;

function onParse(err,result){
    if (!err){
        console.log(result.rss.channel[0].item[0]);
        //console.log(result.rss.channel[0].item);
        /*
        var list = result.messageList.message;
        for (var i=0;i<list.length;++i){
            console.log(list[i]);
        }*/
    }else{
        console.log(err);
    }
    
}

function onRead(err,data){
    if (!err)
        parseString(data,onParse)
    else
        console.log('readError');
}

// cause of cp1251 do http get over curl

var exec = require('child_process').exec;

exec("curl 'bash.im/rss/' | iconv -f cp1251 -t utf8", function (error, stdout, stderr) {
    if (!error){
        parseString(stdout,onParse);
    }
});

//fs.readFile(__dirname+'/bash.utf.xml','ASCII',onRead);







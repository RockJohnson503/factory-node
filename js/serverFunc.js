/*
服务器的方法
*/
var fs = require('fs');

exports.status = 0;

exports.Router = function (request, response, url, fileUrl, fun) {
    if(url.length === fileUrl.length && fileUrl.length === fun.length){
        for(var i in url){
            if(request.url.indexOf(url[i]) !== -1){
                fun[i](request, response, url[i], fileUrl[i]);
                this.status = 1;
            }
        }
    }
};

//获取文件
exports.getFiler = function (request, response, url, fileUrl) {
    //获取每页的显示数量
    var results = {"status" : 1, "data" : []};
    if(request.url.indexOf("?") !== -1){
        var args = decodeURIComponent(request.url.split("?")[1].split("=")[1]);
        fileUrl = fileUrl.replace("?", args);
    }

    fs.readFile(fileUrl, function (err, data) {
        if(err){
            response.writeHead(404, {'Content-Type': 'text/json', "Access-Control-Allow-Origin": "http://localhost:8080",
                            "Access-Control-Allow-Credentials": "true"});
        }else{
            response.writeHead(200, {'Content-Type': 'text/json', "Access-Control-Allow-Origin": "http://localhost:8080",
                            "Access-Control-Allow-Credentials": "true"});
            response.writeHead(200, {'Content-Type': 'text/json', "Access-Control-Allow-Origin": "http://localhost:8080",
                                "Access-Control-Allow-Credentials": "true"});

            if(!Number(data)){
                data = JSON.parse(data);
                for(var i = data.data.length - 1; i >= 0; i--){
                    results.data.push(data.data[i])
                }
                data = JSON.stringify(results)
            }
            response.write(data);
        }
        //  发送响应数据
        response.end();
    });
};

//写入文件
exports.writeFiler = function (request, response, url, fileUrl) {
    //获取参数
    var args;
    var datas;
    var exist;
    if(request.url.indexOf("&") === -1){
        args = decodeURIComponent(request.url.split("?")[1].split("=")[1]);
    }else{
        args = request.url.split("?")[1].split("&");
        var dataName = decodeURIComponent(args[0].split("=")[1]);
        datas = JSON.parse(decodeURIComponent(args[1].split("=")[1]));
        fileUrl = fileUrl.replace("?", dataName);
    }

    fs.readFile(fileUrl, function (err, data) {
        if(err){
            response.writeHead(404, {'Content-Type': 'text/Json', "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": "true"});
        }else{
            if(datas){
                data = JSON.parse(data);

                //判断这条数据是否存在
                if(fileUrl.indexOf("detailData") === -1){
                    for(var i in data.data){
                        if(datas.id === data.data[i].id &&
                            datas.factory === data.data[i].factory &&
                            datas.name === data.data[i].name && (datas.key === data.data[i].key || !datas.key)){
                            exist = 1;
                            for(var q in data.data[i]){
                                data.data[i][q] = datas[q];
                            }
                        }
                    }
                }

                if(!exist){data.data.push(datas);}
                args = JSON.stringify(data);
            }

            fs.writeFile(fileUrl, args, function (err) {
               if(err){
                   response.writeHead(404, {'Content-Type': 'text/json', "Access-Control-Allow-Origin": "http://localhost:8080",
                            "Access-Control-Allow-Credentials": "true"});
               }else{
                   response.writeHead(200, {'Content-Type': 'text/json', "Access-Control-Allow-Origin": "http://localhost:8080",
                            "Access-Control-Allow-Credentials": "true"});
                }
            });
        }
        //  发送响应数据
        response.end();
    });
};
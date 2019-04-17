/*
服务器端
 */
let http = require('http');
let fs = require('fs');
let url = require('url');
 
// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   let pathname = url.parse(request.url).pathname;

   //路由
    if(request.url.indexOf("/getTableNum") !== -1){
        //获取每页的显示数量
        fs.readFile("./data/tableNum.txt", function (err, data) {
            if(err){
                response.writeHead(404, {'Content-Type': 'text/json', "Access-Control-Allow-Origin": "http://localhost:8080",
                                "Access-Control-Allow-Credentials": "true"});
            }else{
                response.writeHead(200, {'Content-Type': 'text/json', "Access-Control-Allow-Origin": "http://localhost:8080",
                                "Access-Control-Allow-Credentials": "true"});
                response.write(data.toString());
            }
            //  发送响应数据
            response.end();
        });
    }
    else if(request.url.indexOf("/changeTableNum") !== -1){
        let args = decodeURIComponent(request.url.split("?")[1].split("=")[1]);//获取参数

        fs.readFile("./data/tableNum.txt", function (err, data) {
            if(err){
                response.writeHead(404, {'Content-Type': 'text/Json', "Access-Control-Allow-Origin": "http://localhost:8080",
                                "Access-Control-Allow-Credentials": "true"});
            }else{
                fs.writeFile("./data/tableNum.txt", args, function (err) {
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
    }
    else if(request.url.indexOf("/getJsonData") !== -1){
        //获取json数据
        let args = decodeURIComponent(request.url.split("?")[1].split("=")[1]);//获取参数
        let results = {"status" : 1, "data" : []};

        fs.readFile("./data/" + args + ".json", function (err, data) {
            if(err){
                response.writeHead(404, {'Content-Type': 'text/json', "Access-Control-Allow-Origin": "http://localhost:8080",
                                "Access-Control-Allow-Credentials": "true"});
            }else{
                response.writeHead(200, {'Content-Type': 'text/json', "Access-Control-Allow-Origin": "http://localhost:8080",
                                "Access-Control-Allow-Credentials": "true"});
                data = JSON.parse(data);
                for(let i = data.data.length - 1; i >= 0; i--){
                    results.data.push(data.data[i])
                }
                response.write(JSON.stringify(results));
            }
            //  发送响应数据
            response.end();
        });
    }
    else if(request.url.indexOf("/changeJsonData") !== -1){
        //获取json数据
        let args = request.url.split("?")[1].split("&");//获取参数
        let dataName = decodeURIComponent(args[0].split("=")[1]);
        let datas = decodeURIComponent(args[1].split("=")[1]);

        datas = JSON.parse(datas);

        fs.readFile("./data/" + dataName + ".json", function (err, data) {
            if(err){
                response.writeHead(404, {'Content-Type': 'text/Json', "Access-Control-Allow-Origin": "http://localhost:8080",
                                "Access-Control-Allow-Credentials": "true"});
            }else{
                data = JSON.parse(data);
                data.data.push(datas);

                fs.writeFile("./data/" + dataName + ".json", JSON.stringify(data), function (err) {
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
    }
    else{
        // 从文件系统中读取请求的文件内容
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/plain
                if(pathname.indexOf(".css") !== -1){
                    response.writeHead(404, {'Content-Type': 'text/css'});
                }else{
                    response.writeHead(404, {'Content-Type': 'text/html'});
                }
            }else{
                // HTTP 状态码: 200 : OK
                // Content Type: text/plain
                if(pathname.indexOf(".css") !== -1){
                    response.writeHead(200, {'Content-Type': 'text/css'});
                }else{
                    response.writeHead(200, {'Content-Type': 'text/html'});
                }
                // 响应文件内容
                response.write(data.toString());
            }
        //  发送响应数据
        response.end();
       });
    }
}).listen(8080);
 
// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');
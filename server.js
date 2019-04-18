/*
服务器端
 */
let http = require('http');
let fs = require('fs');
let url = require('url');
let func = require("./js/serverFunc");
 
// 创建服务器
http.createServer( function (request, response) {  
    // 解析请求，包括文件名
    let pathname = url.parse(request.url).pathname;
    let urls = ["/getTableNum", "/getJsonData", "/changeTableNum", "/changeJsonData"];
    let fileUrls = ["./data/tableNum.txt","./data/?.json", "./data/tableNum.txt", "./data/?.json"];
    let funcs = [func.getFiler, func.getFiler, func.writeFiler, func.writeFiler];
    func.status = 0;

    //路由
    if(urls.indexOf(pathname) !== -1){func.Router(request, response, urls, fileUrls, funcs);}

    //从文件系统中读取请求的文件内容
    if(func.status === 0){
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
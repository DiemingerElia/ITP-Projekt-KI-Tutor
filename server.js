const HTTP = require('http');
const URL = require('node:url');
const FILE_SYSTEM = require('node:fs');
const PATH = require('path');

const CSS_PATH = "css";
const JS_PATH = "js";
const IMG_PATH = "img";
const HTML_PATH = "./index.html";

function HandleRequest(req, res){
    let url = URL.parse(req.url);
    let httpResponse = "";

    let splitPath = url.path.split('/');
    
    console.log(splitPath[1]);

    if(url.path == '/'){
        httpResponse = FILE_SYSTEM.readFileSync(HTML_PATH, "utf-8");
        res.writeHead(200, {'Content-Type': 'text/html'});   

        res.write(httpResponse);
        res.end();
    }
    else if(splitPath[1] == JS_PATH){
        httpResponse = FILE_SYSTEM.readFileSync(__dirname + url.path, "utf-8");
        res.writeHead(200, {'Content-Type': 'text/javascript'});

        res.write(httpResponse);
        res.end();
    }
    else if(splitPath[1] == CSS_PATH){
        httpResponse = FILE_SYSTEM.readFileSync(__dirname + url.path, "utf-8");
        res.writeHead(200, {'Content-Type': 'text/stylesheet'});

        res.write(httpResponse);
        res.end();
    }
    else if(splitPath[1] == IMG_PATH){
        httpResponse = FILE_SYSTEM.readFileSync(__dirname + url.path);
        res.writeHead(200, {'Content-Type': 'img/jpeg'});

        res.write(httpResponse);
        res.end();
    }
    else{
        res.writeHead(404, {'Content-Type': 'plain/text'});
        res.end('404 Not Found!');
    }
}

let server = HTTP.createServer(HandleRequest);
server.listen(5500);
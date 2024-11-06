const HTTP = require('http');
const URL = require('node:url');
const FILE_SYSTEM = require('node:fs');
const OPENAI = require('openai');


const CSS_PATH = "css";
const JS_PATH = "js";
const IMG_PATH = "img";
const HTML_PATH = "./index.html";

function HandleRequest(req, res){
    let url = URL.parse(req.url);
    let splitPath = url.path.split('/');
    let httpResponse = "";

    if(url.path == '/'){
        try{
            httpResponse = FILE_SYSTEM.readFileSync(HTML_PATH, "utf-8");
            res.writeHead(200, {'Content-Type': 'text/html'});   

            res.write(httpResponse);
            res.end();
        }
        catch(err){
            HandleError("Internal Server Error!", 500, res);
        }
    }
    else if(splitPath[1] == JS_PATH && splitPath.length > 1){
        try{
            httpResponse = FILE_SYSTEM.readFileSync(__dirname + url.path, "utf-8");
            res.writeHead(200, {'Content-Type': 'text/javascript'});

            res.write(httpResponse);
            res.end();
        }
        catch(err){
            HandleError("Not Allowed!", 405, res);
        }
        
    }
    else if(splitPath[1] == CSS_PATH && splitPath.length > 1){
        try{
            httpResponse = FILE_SYSTEM.readFileSync(__dirname + url.path, "utf-8");
            res.writeHead(200, {'Content-Type': 'text/stylesheet'});

            res.write(httpResponse);
            res.end();
        }
        catch(err){
            HandleError("Not Allowed!", 405, res);
        }
    }
    else if(splitPath[1] == IMG_PATH && splitPath.length > 1){
        try{
            httpResponse = FILE_SYSTEM.readFileSync(__dirname + url.path);
            res.writeHead(200, {'Content-Type': 'img/jpeg'});

            res.write(httpResponse);
            res.end();
        }
        catch(err){
            HandleError("Not Allowed!", 405, res);
        }
    }
    else{
        res.writeHead(404, {'Content-Type': 'plain/text'});
        res.end('404 Not Found!');
    }
}

function HandleError(displayedText, errCode, res){
    res.writeHead(errCode, {'Content-Type': 'text/plain'});
    res.end(errCode + " " + displayedText);
}

let server = HTTP.createServer(HandleRequest);
server.listen(5500);

GetAiResponse();

async function GetAiResponse(){
    const openai = new OPENAI.OpenAI();

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Write a haiku about recursion in programming.",
            },
        ],
    });

    console.log(completion.choices[0].message);
}
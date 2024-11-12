require('dotenv').config();
const HTTP = require('http');
const URL = require('node:url');
const FILE_SYSTEM = require('node:fs');
const OPENAI = require('openai');


const CSS_PATH = "style.css";
const JS_PATH = "js";
const ASSET_PATH = "assets";
const HTML_PATH = "./index.html";
const API_PATH = "api"

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
            httpResponse = FILE_SYSTEM.readFileSync(CSS_PATH, "utf-8");
            res.writeHead(200, {'Content-Type': 'text/css'});

            res.write(httpResponse);
            res.end();
        }
        catch(err){
            HandleError("Not Allowed!", 405, res);
        }
    }
    else if(splitPath[1] == ASSET_PATH && splitPath.length > 1){
        try{
            httpResponse = FILE_SYSTEM.readFileSync(__dirname + url.path);
            console.log(__dirname + url.path);
            res.writeHead(200, {'Content-Type': 'img/jpeg'});

            res.write(httpResponse);
            res.end();
        }
        catch(err){
            HandleError("Not Allowed!", 405, res);
        }
    }
    else if(splitPath[1] == API_PATH && splitPath.length > 1){
        let params = url.searchParams;
        try{
            httpResponse = askOpenAI(req.headers['api-role'], req.header['api-question']);
        }
        catch(error){
            httpResponse = "Es gab ein Problem mit der Anfrage.";
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});

        res.write(httpResponse);
        res.end();
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
server.listen(80);

// OPENAI - API
askOpenAI("Du bist ein vielseitig informierter Assistent für Allgemeinwissen. Deine Aufgabe ist es, Nutzern zu helfen, indem du präzise und verständliche Antworten auf Fragen aus verschiedenen Wissensbereichen gibst, darunter Geschichte, Geographie, Naturwissenschaften, Politik und Kultur. Bleibe sachlich und objektiv, und wenn angebracht, füge interessante Fakten hinzu, um das Thema lebendig zu gestalten. Vermeide Spekulationen und sorge dafür, dass deine Informationen auf anerkannten und verlässlichen Quellen basieren. Dein Ton ist freundlich und informativ, sodass der Nutzer ein angenehmes und lehrreiches Erlebnis hat.", "Wer bist du?");
console.log(process.env.OPENAI_API_AUTHORIZATION);
async function askOpenAI(question, role) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.OPENAI_API_AUTHORIZATION,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: role },
                    { role: "user", content: question }
                ],
                max_tokens: 50,
                temperature: 0.5,
                frequency_penalty: 0.5,
                presence_penalty: 0.8,
                logit_bias: 0.5
            })
        });
 
        if (!response.ok) {
            const errorDetails = await response.json();
            console.log("Fehlerdetails:", errorDetails);
            throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
        }
 
        const data = await response.json();
        if (!data.choices || !data.choices[0]) {
            console.log("Unerwartete Antwortstruktur:", data);
            throw new Error("Die Antwort enthält keine 'choices'-Daten.");
        }
 
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Fehler:", error.message);
        return "Es gab ein Problem mit der Anfrage.";
    }
 }
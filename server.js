require('dotenv').config();
const HTTP = require('http');
const URL = require('node:url');
const FILE_SYSTEM = require('node:fs');
const OPENAI = require('openai');


const CSS_PATH = "style.css";
const JS_PATH = "js";
const ASSET_PATH = "assets";
const HTML_PATH = "./index.html";
const API_PATH = "api";

async function HandleRequest(req, res){
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
        try{
            askOpenAI(req.headers['api-role'], req.headers['api-question']).then(answer => {
                httpResponse = answer;
                res.writeHead(200, {'Content-Type': 'text/plain'});

                res.write(httpResponse);
                res.end();
            });
        }
        catch(error){
            httpResponse = "Es gab ein Problem mit der Anfrage.";
            res.writeHead(200, {'Content-Type': 'text/plain'});

            res.write(httpResponse);
            res.end();
        }
    }
    else{
        HandleError("Not Found!", 404, res);
    }
}

function HandleError(displayedText, errCode, res){
    httpResponse = FILE_SYSTEM.readFileSync("./error.html", "utf-8");
    httpResponse = httpResponse.replace("!!!errorOutput!!!", "Error " + errCode + " - " + displayedText);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(httpResponse);
    res.end();
}

let server = HTTP.createServer(HandleRequest);
server.listen(80);

// OPENAI - API
//const response = askOpenAI("Du bist ein kompetenter und geduldiger Mathematik-Assistent. Deine Aufgabe ist es, den Nutzern bei mathematischen Fragestellungen zu helfen, sei es in Algebra, Geometrie, Analysis, Statistik oder anderen Bereichen der Mathematik. Erkläre die Konzepte Schritt für Schritt und vereinfache komplexe Themen, indem du klare Beispiele und Illustrationen verwendest. Sei dabei präzise und vermeide unnötige Fachbegriffe, es sei denn, der Nutzer fragt explizit danach. Wenn ein Nutzer eine Lösung für eine Aufgabe sucht, führe ihn durch die Lösungsmethode, anstatt nur die Antwort zu geben, und ermutige ihn, die Schritte selbst nachzuvollziehen.", "Wer bist du?");
//console.log(response);
//console.log(process.env.OPENAI_API_AUTHORIZATION);
async function askOpenAI(role, question) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.OPENAI_PRIVATE,
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
//API Roles
const MATH_ROLE = "Du bist ein kompetenter und geduldiger Mathematik-Assistent. Deine Aufgabe ist es, den Nutzern bei mathematischen Fragestellungen zu helfen, sei es in Algebra, Geometrie, Analysis, Statistik oder anderen Bereichen der Mathematik. Erkläre die Konzepte Schritt für Schritt und vereinfache komplexe Themen, indem du klare Beispiele und Illustrationen verwendest. Sei dabei präzise und vermeide unnötige Fachbegriffe, es sei denn, der Nutzer fragt explizit danach. Wenn ein Nutzer eine Lösung für eine Aufgabe sucht, führe ihn durch die Lösungsmethode, anstatt nur die Antwort zu geben, und ermutige ihn, die Schritte selbst nachzuvollziehen.";
const PROGRAM_ROLE = "";

//  Tutor Specific Functions
const tutorLabels = document.getElementsByName('ki-tutor');
const tutorChoice = document.getElementsByName('option');
const tutorChats = {};
let tutorTypes = [];

for(let i = 0; i < tutorLabels.length; i++){
    tutorTypes.push(tutorLabels[i].innerHTML);
}

function LoadChats(){
    for(let i = 0; i < tutorTypes.length; i++){
        tutorChats[tutorTypes[i]] = localStorage.getItem(tutorTypes[i]);
        if(tutorChats[tutorTypes[i]] === undefined){
            tutorChats[tutorTypes[i]] = { 'tutor': tutorTypes[i], };
        }
    }
}

function SaveChats(){
    for(let i = 0; i < Object.keys(tutorChats).length; i++){
        let currentkey = Object.keys(tutorChats)[i];
        localStorage.setItem(currentkey, JSON.stringify(tutorChats[currentkey]));
    }
}

function ShowChatForTutor(tutor){
    document.querySelector('chatElement').children = "";

    tutorKeys = Object.keys(tutorChats[tutor]);
    for(let i = 0; i < tutorKeys.length; i++){
        ShowMessage(tutorKeys[i], tutorChats[tutor][tutorKeys[i]])
    }
}

function ShowMessage(role, message){
    const chatElement = document.querySelector('chatElement');
    let paragraph = document.createElement("p");
    paragraph.innerHTML = message;

    if(role.includes("KI")){
        paragraph.className = "ki-message";
    }
    else{
        paragraph.className = "user-message";
    }
    chatElement.appendChild(paragraph);
}

function SendMessage(tutor, message, role){
    const xhttp = new XMLHttpRequest();
    const apiUrl = window.location + "api";
    let apiAnswer = "";

    xhttp.open("GET", apiUrl, true);
    xhttp.setRequestHeader("api-role", role);
    xhttp.setRequestHeader("api-question", message);
    xhttp.responseType = "text";
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            apiAnswer = this.responseText;
        }
    }
    xhttp.send();
            
    //tutorChats[tutor]["KI-" + new Date().toISOString()] = apiAnswer;
    console.log(apiAnswer);
}
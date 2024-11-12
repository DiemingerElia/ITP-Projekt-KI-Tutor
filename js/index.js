//Navbar
const navHomeButton = document.querySelector("#navHome");
const navAboutButton = document.querySelector("#navAbout");
const navContactButton = document.querySelector("#navContact");
const navTutorButton = document.querySelector("#navTutor");
const themeSwitcher = document.querySelector('.themeSwitcher input');

const navButtons = [navHomeButton, navAboutButton, navContactButton, navTutorButton];
let currentPage = "home";

navButtons.forEach((element) => {
    element.addEventListener("click", (event) => {
        let newPage = event.target.id.toString().toLocaleLowerCase().replace("nav", "");

        if(currentPage == newPage) return;

        document.querySelector("#" + newPage).style.display = "block";
        document.querySelector("#" + currentPage).style.display = "none";
    
        currentPage = newPage;
    });
});

themeSwitcher.addEventListener('click', function (event) {
    if(themeSwitcher.checked){
        document.body.classList.remove('lightheme');
        document.body.classList.add('darktheme');
    }
    else{
        document.body.classList.remove('darktheme');
        document.body.classList.add('lightheme');
    }
});

document.body.onload = function(){
    let mainElements = document.querySelectorAll("main");
    mainElements.forEach((HTMLElement) => {
        HTMLElement.style.display = "none";
    });
    document.querySelector("main#home").style.display = "block";
}

//  Tutor Specific Functions
const tutorLabels = document.getElementsByName('ki-tutor');
let tutorTypes = [];
for(let i = 0; i < tutorLabels.length; i++){
    tutorTypes.push(tutorLabels[i].innerHTML);
}

const tutorChoice = document.getElementsByName('option');
const tutorChats = {};

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
    const chatElement = document.querySelector('chatElement');
    tutorKeys = Object.keys(tutorChats[tutor]);
    for(let i = 0; i < tutorKeys.length; i++){
        let paragraph = document.createElement("p");
        paragraph.innerHTML = tutorChats[tutor][tutorKeys[i]];

        if(tutorKeys[i].includes("KI")){
            paragraph.className = "ki-message";
        }
        else{
            paragraph.className = "user-message";
        }
        chatElement.appendChild(paragraph);
    }
}

function SendMessage(tutor, message){
    tutorChats[tutor]["KI-" ]
}
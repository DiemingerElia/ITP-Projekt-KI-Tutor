//Navbar
const navHomeButton = document.querySelector("#navHome");
const navAboutButton = document.querySelector("#navAbout");
const navContactButton = document.querySelector("#navContact");
const navTutorButton = document.querySelector("#navTutor");

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


document.body.onload = function(){
    let mainElements = document.querySelectorAll("main");
    mainElements.forEach((HTMLElement) => {
        HTMLElement.style.display = "none";
    });
    document.querySelector("main#home").style.display = "block";
}
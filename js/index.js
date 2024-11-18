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
        document.title = document.querySelector('#nav' + newPage.charAt(0).toUpperCase() + newPage.slice(1)).innerHTML.split('</i>').pop().trim();
    });
});

themeSwitcher.addEventListener('change', function (event) {
    if(themeSwitcher.checked){
        document.body.classList.remove('lightTheme');
        document.body.classList.add('darkTheme');
    }
    else{
        document.body.classList.remove('darkTheme');
        document.body.classList.add('lightTheme');
    }
});

document.body.onload = function(){
    let mainElements = document.querySelectorAll("main");
    mainElements.forEach((HTMLElement) => {
        HTMLElement.style.display = "none";
    });
    document.querySelector("main#home").style.display = "block";

    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        themeSwitcher.checked = true;
        document.body.classList.remove('lightTheme');
        document.body.classList.add('darkTheme');
    }
    else{
        themeSwitcher.checked = false;
        document.body.classList.remove('darkTheme');
        document.body.classList.add('lightTheme');
    }
    APILoad();
}
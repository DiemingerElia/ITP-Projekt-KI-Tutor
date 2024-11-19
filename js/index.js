//Navbar
const navHomeButton = document.querySelector("#navHome");
const navAboutButton = document.querySelector("#navAbout");
const navContactButton = document.querySelector("#navContact");
const navTutorButton = document.querySelector("#navTutor");
const burgerMenu = document.querySelector('#burgermenu');

const footerTermsOfUse = document.querySelector('#footerTermsOfUse');
const footerLegal = document.querySelector('#footerLegal');

const themeSwitcher = document.querySelector('.themeSwitcher input');

const navButtons = [navHomeButton, navAboutButton, navContactButton, navTutorButton];
const footerLinks = [footerTermsOfUse, footerLegal];
let currentPage = "home";

navButtons.forEach((element) => {
    element.addEventListener("click", (event) => {
        let newPage = event.target.id.toString().toLocaleLowerCase().replace("nav", "");

        if(currentPage == newPage){
            document.querySelector('#header > nav').style.display = "none";
            document.querySelector('#' + currentPage).style.display = "block";
            document.querySelector('footer').style.display = "block";
            return;
        }

        document.querySelector("#" + newPage).style.display = "block";
        document.querySelector("#" + currentPage).style.display = "none";
    
        currentPage = newPage;
        document.title = document.querySelector('#nav' + newPage.charAt(0).toUpperCase() + newPage.slice(1)).innerHTML.split('</i>').pop().trim();

        if(window.innerWidth <= 768){
            document.querySelector('#header > nav').style.display = "none";
        }
    });
});

footerLinks.forEach((element) => {
    element.addEventListener("click", (event) => {
        let newPage = event.target.id.toString().toLocaleLowerCase().replace("footer", "");

        if(currentPage == newPage) return;

        document.querySelector("#" + newPage).style.display = "block";
        document.querySelector("#" + currentPage).style.display = "none";
    
        currentPage = newPage;
        document.title = document.querySelector('#footer' + newPage.charAt(0).toUpperCase() + newPage.slice(1)).innerHTML.split('</i>').pop().trim();
    });
});

burgerMenu.addEventListener('click', function(event){
    event.preventDefault();
    if(document.querySelector('#header > nav').style.display == "flex"){
        document.querySelector('#header > nav').style.display = "none";
        document.querySelector('#' + currentPage).style.display = "block";
        document.querySelector('footer').style.display = "block";
    }
    else{
        document.querySelector('#header > nav').style.display = "flex";
        document.querySelector('#' + currentPage).style.display = "none";
        document.querySelector('footer').style.display = "none";
    }
})

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

window.onresize = function(){
    if(window.innerWidth >= 768) {
        document.querySelector('#header > nav').style.display = "";
    }
};

document.querySelector('#tinputarea').addEventListener('keypress', function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        document.querySelector('#tinputsend').click();
    }
});
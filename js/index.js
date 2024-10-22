//Navbar
const navHomeButton = document.querySelector("main#home");

document.body.onload = function(){
    let mainElements = document.querySelectorAll("main");
    mainElements.forEach((HTMLElement) => {
        console.log(HTMLElement);
        HTMLElement.style.display = "none";
    });
    document.querySelector("main#home").style.display = "block";
}
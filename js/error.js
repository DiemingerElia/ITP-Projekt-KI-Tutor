document.body.onload = function(){
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        document.body.classList.remove('lightTheme');
        document.body.classList.add('darkTheme');
    }
    else{
        document.body.classList.remove('darkTheme');
        document.body.classList.add('lightTheme');
    }
}
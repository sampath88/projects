const icon = document.querySelector(".fas");
const section = document.querySelector('.showcase');
// const icon = toggle.children;

function menu(){
    section.classList.toggle('active');
    removemenu();
    icon.classList.toggle('fa-times');
}

function removemenu(){
    icon.classList.toggle('fa-bars');
}

icon.addEventListener('click', menu);
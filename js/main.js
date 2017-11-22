// global variables
let selectedColor;
//
function init() {
    const colors = ["#3c56aa", "red", "pink", "yellow"];
    const buttonIcons = ["fa fa-plus-square-o", "fa fa-times", "fa fa-font", "fa fa-strikethrough", "fa fa-check-square-o", "fa fa-square-o", "fa fa-sort"];
    const colorsDiv = document.createElement("div");
    colorsDiv.id = "colorsDiv";

    //colors
    for (let i = 0; i < colors.length; i++) {
        const color = document.createElement("div");
        color.className = "color";
        color.style.backgroundColor = colors[i];
        colorsDiv.appendChild(color);
        if (i === 0) {
            selectedColor = color;
            selectedColor.className += " selectedColor";
        } 
    }

    //textbox
    let node = document.createElement("input");
    node.type = "text";
    node.className = "textBox";
    node.maxLength = 72;
    node.placeholder = "Introduce aqui el nuevo plato...";
    document.getElementById("mainContainer").appendChild(colorsDiv);
    document.getElementById("mainContainer").appendChild(node);

    //buttons
    node = document.createElement("div");
    node.id = "buttonsDiv";

    for (let i = 0; i < buttonIcons.length; i++) {
        const icon = document.createElement("i");
        icon.className = buttonIcons[i];
        icon.className += " button";
        node.appendChild(icon);
    }

    document.getElementById("mainContainer").appendChild(node);
    
    loadMenu();
    initListeners();
}

function initListeners() {
    //colors picker listener
    let colors = [].slice.call(document.querySelectorAll(".color"));
    colors.map(e => e.addEventListener("click", function(){
        selectedColor.className = "color";
        selectedColor = this;
        selectedColor.className = "color selectedColor";
    }, false));

    //textbox listener 
    let tb = document.querySelector(".textBox").addEventListener("keypress", function(e){
        //var key = e.wich || e.keycode;
        if(e.key === 'Enter'){
            addDish(this.value);
            var menu = document.getElementById("menu");
            this.value = "";
        }
    }, false);
    
    //buttons listeners//
    let buttons = document.querySelectorAll(".button");
    //addDish
    buttons[0].addEventListener("click", function(){
        addDish(document.querySelector(".textBox").value);
    }, false);   
    //unLineThrough
    buttons[2].addEventListener("click", unLineThrough, false);    
    //lineThrough
    buttons[3].addEventListener("click", lineThrough, false);
    //checkAll
    buttons[4].addEventListener("click", checkAll, false);
    //uncheckAll
    buttons[5].addEventListener("click", unCheckAll, false);
}

function loadMenu(){
    let menu = document.createElement("div");
    menu.id = "menu";

    document.getElementById("mainContainer").appendChild(menu);
    addDish("nfoiwnqiof");
    addDish("jfopwqnpofw");
    
}

function addDish(name){
    let dish = document.createElement("div");
    dish.className = "dish";
    //dish.textContent = "Papas con mojo";
    dish.style.backgroundColor = selectedColor.style.backgroundColor;
    
    let check = document.createElement("input");
    check.type = "checkbox";
    check.name = "menuDishes";
    
    let text = document.createElement("span");
    text.className = "dishName";
    text.textContent = name;
    
    dish.appendChild(check);
    dish.appendChild(text);
    
    document.getElementById("menu").appendChild(dish);
}

function checkAll(){
    let checkboxes = document.querySelectorAll(".dish > input");
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = true;
    }
}

function unCheckAll(){
    let checkboxes = document.querySelectorAll(".dish > input");
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = false;
    }
}

function getChecked(){
    let checkboxes = document.querySelectorAll(".dish > input");
    let checked = [];

    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked == true){
            checked.push(checkboxes[i]);
        }
    }

    return checked;
}

function lineThrough(){
    let checkboxes = getChecked();

    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].nextSibling.style.textDecoration = "line-through";
    }
}

function unLineThrough(){
    let checkboxes = getChecked();

    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].nextSibling.style.textDecoration = "none";
    }
}
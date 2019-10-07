let xField = document.forms["main-form"]["X"];
let yField = document.forms["main-form"]["Y"];
let rField = document.forms["main-form"]["R"];
let offsetField = document.forms["main-form"]["offset"];
let warn_y_nan = document.getElementsByClassName("warn-checkbox")[3];
let warn_y_int = document.getElementsByClassName("warn-checkbox")[4];
let warn_x_nan = document.getElementsByClassName("warn-checkbox")[1];
let warn_x_int = document.getElementsByClassName("warn-checkbox")[2];
let warn_r = document.getElementsByClassName("warn-checkbox")[0];
let submitButton = document.getElementsByClassName("submit-button")[0];
let clearButton = document.getElementsByClassName("submit-button")[1];
let canvas = document.getElementsByTagName("canvas")[0];
let xChecked = false;
let yChecked = false;
let rChecked = false;
let i = 25;

for (let button of document.getElementsByClassName("r-button")){
    button.addEventListener("click", rButtonsOnClick)
}
submitButton.addEventListener("click", check);
clearButton.addEventListener("click", clear);
xField.addEventListener("keyup", checkX);
yField.addEventListener("keyup", checkY);
canvas.addEventListener("click", handleCanvasClick);

blockButton();
offsetField.value = new Date().getTimezoneOffset();
drawAxis();


function rButtonsOnClick(event) {
    for (let button of document.getElementsByClassName("r-button")){
        button.classList.remove("pressed");
    }
    event.target.classList.add("pressed");
    rField.value = ""+event.target.value;
    checkR(event);
}
function blockButton() {
    if (!(xChecked && yChecked && rChecked)) {
        submitButton.setAttribute("disabled", "disable");
    } else {
        submitButton.removeAttribute("disabled")
    }
}
function clear() {
    xField.value = "";
    yField.value = "";
    rField.value = "";
    for (let button of document.getElementsByClassName("r-button")){
        button.classList.remove("pressed");
    }
    warn_r.hidden = true;
    yField.classList.remove("warn-text");
    xField.classList.remove("warn-text");
    submitButton.setAttribute("disabled", "disable");
    xChecked = false;
    yChecked = false;
    rChecked = false;
    warn_y_nan.hidden = true;
    warn_y_int.hidden = true;
    warn_x_nan.hidden = true;
    warn_x_int.hidden = true;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawAxis();
}
function checkY(event) {
    yField.value = yField.value.replace(",", ".");
    if (!isFinite(Number(yField.value)) || !(/0*/).test(yField.value) && Number(yField.value) === 0 || (/^ *$/).test(yField.value)) {
        event.preventDefault();
        yField.classList.add("warn-text");
        yChecked = false;
        warn_y_nan.hidden = false;
        warn_y_int.hidden = true;
    } else if (Number(yField.value) < -5 || Number(yField.value) > 3) {
        event.preventDefault();
        yField.classList.add("warn-text");
        yChecked = false;
        warn_y_int.hidden = false;
        warn_y_nan.hidden = true;
    } else {
        yField.classList.remove("warn-text");
        yChecked = true;
        warn_y_nan.hidden = true;
        warn_y_int.hidden = true;
    }
    blockButton();
}
function checkX(event) {
    xField.value = xField.value.replace(",", ".");
    if (!isFinite(Number(xField.value)) || !(/0*/).test(xField.value) && Number(xField.value) === 0 || (/^ *$/).test(xField.value)) {
        event.preventDefault();
        xField.classList.add("warn-text");
        xChecked = false;
        warn_x_nan.hidden = false;
        warn_x_int.hidden = true;
    } else if (Number(xField.value) < -5 || Number(xField.value) > 5) {
        event.preventDefault();
        xField.classList.add("warn-text");
        xChecked = false;
        warn_x_int.hidden = false;
        warn_x_nan.hidden = true;
    } else {
        xField.classList.remove("warn-text");
        xChecked = true;
        warn_x_nan.hidden = true;
        warn_x_int.hidden = true;
    }
    blockButton();
}
function checkR(event) {
    if(!(rField.value==="1" || rField.value==="1.5" || rField.value==="2" || rField.value==="2.5" || rField.value==="3")){
        event.preventDefault();
        rChecked = false;
        warn_r.hidden = false;
    }
    else{
        rChecked = true;
        warn_r.hidden = true;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        drawArea(Number(rField.value));
        drawAxis();
    }
    blockButton();
}
function check(event) {
    checkR(event);
    checkY(event);
    checkY(event);
    if (yChecked && yField.value!=="") {
        yField.value = Number(yField.value);
    }
    if (xChecked && xField.value!=="") {
        xField.value = Number(xField.value);
    }
}
function drawAxis() {
    let ctx = canvas.getContext('2d');
    let h = canvas.height;
    let w = canvas.width;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w/2, h);
    ctx.lineTo(w/2, 0);
    ctx.lineTo(w/2+3, 7);
    ctx.moveTo(w/2, 0);
    ctx.lineTo(w/2-3, 7);
    drawDigitsX(ctx, i, w, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, h/2);
    ctx.lineTo(w, h/2);
    ctx.lineTo(w-7, h/2+3);
    ctx.moveTo(w, h/2);
    ctx.lineTo(w-7, h/2-3);
    drawDigitsY(ctx, i, w, h);
    ctx.stroke();
}
function drawDigitsX(ctx, i, w, h) {
    let t=w/2;
    for (let j=0; j<5; j++){
        t+=i;
        ctx.moveTo(t, h/2+3);
        ctx.lineTo(t, h/2-3)
    }
    t=w/2;
    for (let j=0; j<5; j++){
        t-=i;
        ctx.moveTo(t, h/2+3);
        ctx.lineTo(t, h/2-3)
    }
}
function drawDigitsY(ctx, i, w, h) {
    let t=h/2;
    for (let j=0; j<5; j++){
        t+=i;
        ctx.moveTo(w/2+3, t);
        ctx.lineTo(w/2-3, t);
    }
    t=h/2;
    for (let j=0; j<5; j++){
        t-=i;
        ctx.moveTo(w/2+3, t);
        ctx.lineTo(w/2-3, t);
    }
}
function drawArea(r) {
    let ctx = canvas.getContext('2d');
    let h = canvas.height;
    let w = canvas.width;
    ctx.strokeStyle = "#007765";
    ctx.fillStyle = "#007765";
    ctx.beginPath();
    ctx.arc(w/2,h/2,r*i,0,Math.PI/2*3,true);
    ctx.moveTo(w/2, h/2-r*i);
    ctx.lineTo(w/2-r/2*i, h/2);
    ctx.lineTo(w/2, h/2);
    ctx.lineTo(w/2, h/2+r/2*i);
    ctx.lineTo(w/2+r*i, h/2+r/2*i);
    ctx.lineTo(w/2+r*i, h/2);
    ctx.fill();
}
function handleCanvasClick(event) {
    let obj = event.target;
    let x,y;

}



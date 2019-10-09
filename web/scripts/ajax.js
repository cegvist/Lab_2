function doAjax(x, y) {
    let req = new XMLHttpRequest();
    req.open("POST", document.documentURI, true);
    req.onload = ()=>changePage(JSON.parse(req.responseText));
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(`X=${x}&Y=${y}&R=${rField.value}&type=ajax`)
}
function changePage(point) {
    drawPoint(point.x, point.y, (point.inArea==="Да" ? "lime":"red"))
}
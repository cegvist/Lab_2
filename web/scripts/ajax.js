function doAjax(x, y, r, writable) {
    let req = new XMLHttpRequest();
    req.open("POST", document.documentURI, true);
    req.onload = ()=>changePage(JSON.parse(req.responseText), writable);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(`X=${x}&Y=${y}&R=${r}&type=${writable ? "ajax" : "ajax-no-cache"}&offset=${offsetField.value}`)
}
function changePage(point, writable) {
    drawPoint(point.x, point.y, (point.inArea==="Да" ? "lime":"red"));
    if(writable) {
        if (!document.getElementById("result-table")) {
            let table = document.createElement("table");
            table.id = "result-table";
            let headers = document.createElement("tr");
            headers.id = "table-headers";
            headers.innerHTML = "<th>Координата X</th><th>Координата Y</th><th>Радиус</th><th>Попадание в область</th><th>Время запроса</th>";
            let header = document.createElement("h1");
            header.innerText = "История запросов";
            let button = document.createElement("div");
            button.innerHTML = "<button type=\"button\" onclick=\"clearHistory(); location.reload();\" class=\"history-button\">Очистить историю</button><br>";
            document.getElementsByClassName("main")[0].append(header);
            document.getElementsByClassName("main")[0].append(button);
            document.getElementsByClassName("main")[0].append(table);
            table.append(headers);

        }
        let row = document.createElement("tr");
        row.innerHTML = `<td>${point.x}</td><td>${point.y}</td><td>${point.r}</td><td>${point.inArea}</td><td>${point.time}</td>`;
        document.getElementById("table-headers").after(row);
    }
}
function clearHistory() {
    let req = new XMLHttpRequest();
    req.open("POST", document.documentURI, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send("type=clear");
}
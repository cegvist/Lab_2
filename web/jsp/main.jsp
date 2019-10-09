<%@ page import="beans.History" %>
<%@ page import="javax.naming.InitialContext" %>
<%@ page import="model.Point" %>
<%@ page import="java.util.Collections" %>
<%@ page import="java.util.List" %><%--
  Created by IntelliJ IDEA.
  User: Вячеслав
  Date: 06.10.2019
  Time: 17:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%!
    private History history;
%>
<%try {
    history = (History) new InitialContext().lookup("java:global/Lab2_war_exploded/History");
} catch (Exception e) {
    e.printStackTrace();}%>
<html>
<head>
    <meta charset="UTF-8">
    <title>Lab 1</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/styles/main.css">
</head>
<body>
<div class="head">
        <span id="head-title">
            Лабораторная работа №1. Вариант 214500
        </span>
    <img src="${pageContext.request.contextPath}/img/vt-logo.png" alt="logo"><br>
    <span id="head-author">
            Выполнил студент группы P3214 Гораш Вячеслав Игоревич
        </span>
</div>
<div class="main">
    <h1>Определение попадания точки в область</h1>
    <form id="main-form" action="" method="post">
        <canvas height="300px" width="300px"></canvas>
        <h2>Выберите радиус</h2>
        <button type="button" class="r-button" value="1">1</button>
        <button type="button" class="r-button" value="1.5">1.5</button>
        <button type="button" class="r-button" value="2">2</button>
        <button type="button" class="r-button" value="2.5">2.5</button>
        <button type="button" class="r-button" value="3">3</button>
        <input type="hidden" name="offset">
        <p class="warn-checkbox" hidden>Не выбрано значение радиуса</p>
        <h2>Введите координату X</h2>
        <label>
            <input type="text" name="X" placeholder="от -5 до 5" maxlength="15">
        </label>
        <p class="warn-checkbox" hidden>Введено не число</p>
        <p class="warn-checkbox" hidden>Число выходит за пределы интервала </p>
        <h2>Введите координату Y</h2>
        <label>
            <input type="text" name="Y" placeholder="от -5 до 3" maxlength="15">
        </label>
        <input type="hidden" name="R">
        <p class="warn-checkbox" hidden>Введено не число</p>
        <p class="warn-checkbox" hidden>Число выходит за пределы интервала </p>
        <br>
        <button type="submit" class="submit-button">Проверить</button>
        <button type="button" class="submit-button" style="margin-left: 20px">Очистить</button>
    </form><br>
    <%if (history.getList().size()>0){%>
    <h1>История запросов</h1>
    <table id="result-table">
        <tr id="table-headers"><th>Координата X</th><th>Координата Y</th><th>Радиус</th><th>Попадание в область</th><th>Время запроса</th></tr>
        <%
            List<Point> list = history.getList();
            Collections.reverse(list);
            for (Point p : list){%>
        <tr><td><%=p.getX()%></td><td><%=p.getY()%></td><td><%=p.getR()%></td><td><%=p.isInArea()%></td><td><%=p.getTime()%></td></tr>
        <%}%>
    </table>
    <%}%>
</div>
<script src="${pageContext.request.contextPath}/scripts/drawing.js"></script>
<script src="${pageContext.request.contextPath}/scripts/main.js"></script>
<script src="${pageContext.request.contextPath}/scripts/ajax.js"></script>
</body>
</html>

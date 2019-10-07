<%--
  Created by IntelliJ IDEA.
  User: Вячеслав
  Date: 06.10.2019
  Time: 17:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Lab 1</title>
    <link rel="stylesheet" href="styles/index.css">
</head>
<body>
<div class="head">
        <span id="head-title">
            Лабораторная работа №1. Вариант 214500
        </span>
    <img src="img/vt-logo.png" alt="logo"><br>
    <span id="head-author">
            Выполнил студент группы P3214 Гораш Вячеслав Игоревич
        </span>
</div>
<div class="main">
    <h1>Определение попадания точки в область</h1>
    <form id="main-form" action="" method="get">
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
            <input type="text" name="X" placeholder="от -5 до 5">
        </label>
        <p class="warn-checkbox" hidden>Введено не число</p>
        <p class="warn-checkbox" hidden>Число выходит за пределы интервала </p>
        <h2>Введите координату Y</h2>
        <label>
            <input type="text" name="Y" placeholder="от -5 до 3">
        </label>
        <input type="hidden" name="R">
        <p class="warn-checkbox" hidden>Введено не число</p>
        <p class="warn-checkbox" hidden>Число выходит за пределы интервала </p>
        <br>
        <button type="submit" class="submit-button">Проверить</button>
        <button type="button" class="submit-button" style="margin-left: 20px">Очистить</button>
    </form>
</div>
<script src="scripts/index.js"></script>
</body>
</html>

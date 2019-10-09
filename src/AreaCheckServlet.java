import beans.History;
import model.Point;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        History history = (History) req.getSession().getAttribute("history");
        float x;
        float y;
        float r;
        try {
            x = Float.parseFloat(req.getParameter("X"));
            y = Float.parseFloat(req.getParameter("Y"));
            r = Float.parseFloat(req.getParameter("R"));
            if (x > 5 || x < -5 || y < -5 || y > 3 || (r != 1 && r != 1.5 && r != 2 && r != 2.5 && r != 3)) {
                throw new NumberFormatException();
            }
        } catch (NumberFormatException e) {
            resp.getWriter().println("<h1>Incorrect parameters</h1>");
            return;
        }
        Point point = new Point(x, y, r);
        history.addPoint(point);
        if (req.getParameter("type") != null && req.getParameter("type").equals("ajax")) {
            resp.setContentType("text/json; charset=UTF-8");
            PrintWriter out = resp.getWriter();
            out.println("{\"x\": " + point.getX() + ", \"y\": " + point.getY() + ", \"r\": " + point.getR() + ", \"inArea\": \"" + point.isInArea() + "\", \"time\": \"" + point.getTime() + "\"}");
        } else {
            resp.setContentType("text/html; charset=UTF-8");
            PrintWriter out = resp.getWriter();
            out.println("<html>\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <title>Lab 1</title>\n" +
                    "    <link rel=\"stylesheet\" href=\"" + req.getContextPath() + "/styles/main.css\">\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "<div class=\"head\">\n" +
                    "        <span id=\"head-title\">\n" +
                    "            Лабораторная работа №2. Вариант 214500\n" +
                    "        </span>\n" +
                    "    <img src=\"" + req.getContextPath() + "/img/vt-logo.png\" alt=\"logo\"><br>\n" +
                    "    <span id=\"head-author\">\n" +
                    "            Выполнил студент группы P3214 Гораш Вячеслав Игоревич\n" +
                    "        </span>\n" +
                    "</div>\n" +
                    "<div class=\"main\">" +
                    "    <h1>Результат обработки запроса</h1>" +
                    "    <table id=\"result-table\">" +
                    "        <tr><th>Координата X</th><th>Координата Y</th><th>Радиус</th><th>Попадание в область</th></tr>" +
                    "        <tr><td>" + point.getX() + "</td><td>" + point.getY() + "</td><td>" + point.getR() + "</td><td>" + point.isInArea() + "</td>" +
                    "    </table>" +
                    "<a href=\"" + req.getContextPath() + "\"><button class=\"submit-button\">Назад</button></a>" +
                    "</div></body></html>");
        }

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.sendRedirect(this.getServletContext().getContextPath());
    }
}

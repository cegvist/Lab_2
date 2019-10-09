package model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Point implements Serializable {
    private float x;
    private float y;
    private float r;
    private boolean inArea;
    private LocalDateTime time;

    public Point(float x, float y, float r){
        time = LocalDateTime.now();
        this.x = x;
        this.y = y;
        this.r = r;
        inArea = ((x<=0 && y>=0 && y<=(2*x+r)) || (x>=0 && y>=0 && x*x+y*y<=r*r) || (x>=0 && y<=0 && x<=r && y>=-r/2));
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getR() {
        return r;
    }

    public String getTime() {
        return time.format(DateTimeFormatter.ofPattern("dd.LL.yy, kk:mm:ss"));
    }

    public String toString(){
        return "X="+x+", Y="+y+", R="+r+(inArea ? " Да" : " Нет");
    }
    public String isInArea(){
        return inArea ? "Да" : "Нет";
    }
}

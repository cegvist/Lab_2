package beans;

import model.Point;

import javax.ejb.*;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class History {
    private List<Point> list;

    public History(){
        list = new ArrayList<>();
    }

    public void addPoint(Point point){
        list.add(point);
    }

    public List<Point> getList(){
        return list;
    }
}

import javax.print.PrintException;
import javax.print.StreamPrintService;
import javax.swing.*;
import java.sql.SQLOutput;

public class Location {
    private String building;
    private int roomNumber;

    public Location(String building, int roomNumber) {
        this.building = building;
        this.roomNumber = roomNumber;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }
}

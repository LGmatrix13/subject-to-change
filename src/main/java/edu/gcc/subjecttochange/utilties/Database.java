package edu.gcc.subjecttochange.utilties;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.gcc.subjecttochange.controllers.CoursesController;

import edu.gcc.subjecttochange.dtos.CourseDto;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.List;

public class Database {
    private static final Logger logger = LoggerFactory.getLogger(CoursesController.class);
    public static Connection connect() {
        String url = "jdbc:sqlite:C://sqlite/database.db";
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url);
        } catch (SQLException e) {
            logger.warn(e.getMessage(), e);
        }
        return conn;
    }

    public static <T> List<T> query(String sql, Class<T> serializeTo, Object... args) throws SQLException {
        ObjectMapper objectMapper = new ObjectMapper();
        return new QueryRunner()
                .query(Database.connect(), sql, new MapListHandler(), args)
                .stream()
                .map(response -> objectMapper.convertValue(response, serializeTo))
                .toList();
    }
}

package edu.gcc.subjecttochange.utilties;

import edu.gcc.subjecttochange.controllers.CoursesController;
import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

public class Database {
    private static final Logger logger = LoggerFactory.getLogger(CoursesController.class);
    private static Connection connect() {
        String url = "jdbc:sqlite:C://sqlite/database.db";
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url);
        } catch (SQLException e) {
            logger.warn(e.getMessage(), e);
        }
        return conn;
    }

    public static void createTables() {
        try {
            Connection connection = connect();
            connection.prepareStatement("""
                CREATE TABLE IF NOT EXISTS student (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT,
                    password TEXT,
                    major TEXT
                );
             """).execute();
            connection.prepareStatement("""
                CREATE TABLE IF NOT EXISTS schedule (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    courseId INTEGER,
                    studentId INTEGER,
                    FOREIGN KEY(studentId) REFERENCES student(id)
                );
            """).execute();
            connection.close();
        } catch (SQLException e) {
            logger.warn(e.getMessage(), e);
        }
    }

    public static boolean modify(String sql) {
        try {
            Connection connection = connect();
            connection.prepareStatement(sql).execute();
            connection.commit();
            connection.close();
        } catch (SQLException e) {
            logger.warn(e.getMessage(), e);
            return false;
        }

        return true;
    }

    public static <T> T read(String sql, ResultSetHandler<T> handler) {
        Connection connection = null;
        try {
            connection = connect();
            QueryRunner queryRunner = new QueryRunner();
            return queryRunner.query(connection, sql, handler);
        } catch (SQLException e) {
            logger.warn("Error executing SQL query: " + sql, e);
        } finally {
            DbUtils.closeQuietly(connection);
        }
        return null;
    }
}

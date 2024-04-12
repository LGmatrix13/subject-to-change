package edu.gcc.subjecttochange.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.dtos.ProfessorDto;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

public class SearchController {
    public static void getSearch(Context context) throws SQLException {
        List<CourseDto> courseDtos = Database.query("""
            select * from "course"    
        """, CourseDto.class);
        Response.send(200, context, courseDtos);
    }
}

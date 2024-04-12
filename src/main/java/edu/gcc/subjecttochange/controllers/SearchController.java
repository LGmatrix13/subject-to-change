package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.models.Search;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;

import java.sql.SQLException;
import java.util.List;

public class SearchController {
    public static void getSearch(Context context) throws SQLException {
        Search search = new Search(context.req());
        Response.send(200, context, search.run());
    }
}

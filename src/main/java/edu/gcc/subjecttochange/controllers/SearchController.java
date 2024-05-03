package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Search;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;

import java.sql.SQLException;

public class SearchController {
    public static void getSearch(Context context) throws SQLException {
        Search search = new Search(context.req());
        Response.send(Response.OK, context, search.run());
    }
}

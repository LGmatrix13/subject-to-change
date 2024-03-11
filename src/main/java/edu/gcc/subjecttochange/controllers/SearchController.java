package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Search;
import io.javalin.http.Context;


public class SearchController {
    public static void getSearch(Context context) {
        Search search = new Search(
            context.req().getParameter("code"),
            context.req().getParameter("name"),
            context.req().getParameter("time"),
            context.req().getParameter("day")
        );
        context.json(search.run());
        context.status(200);
    }
}

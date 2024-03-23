package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Search;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

import java.util.List;
import java.util.Optional;


public class SearchController {
    public static void getSearch(Context context) {
        Search search = new Search(context.req());
        context.json(search.run());
        context.status(200);
    }
}

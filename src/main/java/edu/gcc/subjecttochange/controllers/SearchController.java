package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Search;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

/**
 * HTTP logic for search results
 */
public class SearchController {
    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);
    
    /**
     * HTTP logic for geting search results 
     */
    public static void getSearch(Context context) {
        Search search = new Search(context.req());
        context.json(search.run());
        logger.info("New Search was Successful.");
        context.status(200);
    }
}

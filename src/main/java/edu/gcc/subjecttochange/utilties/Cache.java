package edu.gcc.subjecttochange.utilties;

import edu.gcc.subjecttochange.models.*;

import java.util.HashMap;
import java.util.List;

public class Cache {
    public static final HashMap<Search, List<Course>> searchHistory = new HashMap<>();
}

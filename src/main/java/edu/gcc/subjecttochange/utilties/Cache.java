package edu.gcc.subjecttochange.utilties;

import edu.gcc.subjecttochange.models.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class Cache {
    public static final HashMap<Search, List<Course>> searchHistory = new HashMap<>();
}

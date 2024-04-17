package edu.gcc.subjecttochange.utilties;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RMPScraper {

    private static final String BASE_URL = "https://www.ratemyprofessors.com";
    private static final String SEARCH_URL = BASE_URL + "/search/professors?query=%s&sid=U2Nob29sLTExNjY=";

    public static void main(String[] args) throws IOException {
        String professorName = "Youhui Owen Zhang"; // Example, replace with input or iterate over a list
        Map<String, Object> professorInfo = scrapeProfessorInfo(professorName);
        System.out.println(new ObjectMapper().writeValueAsString(professorInfo));
    }

    private static Map<String, Object> scrapeProfessorInfo(String name) throws IOException {
        Map<String, Object> info = new HashMap<>();
        Document searchPage = Jsoup.connect(String.format(SEARCH_URL, name.replace(" ", "%20"))).get();
        Element linkElement = searchPage.selectFirst("a.TeacherCard__StyledTeacherCard-syjs0d-0");
        if (linkElement != null) {
            String professorPageUrl = BASE_URL + linkElement.attr("href");
            Document professorPage = Jsoup.connect(professorPageUrl).get();
            info.put("rating", professorPage.selectFirst(".RatingValue__Numerator-qw8sqy-2").text());
            info.put("difficulty", professorPage.selectFirst(".FeedbackItem__FeedbackNumber-uof32n-1").text());
            info.put("reviews", extractReviews(professorPage));
        }
        return info;
    }

    private static List<String> extractReviews(Document doc) {
        List<String> reviews = new ArrayList<>();
        Elements reviewElements = doc.select("#ratingsList > li");
        for (Element review : reviewElements) {
            String course = review.select(".RatingHeader__StyledClass-sc-1dlkqw1-3").text();
            String date = review.select(".TimeStamp__StyledTimeStamp-sc-9q2r30-0").text();
            String detail = review.select(".Comments__StyledComments-dzzyvm-0").text();
            reviews.add(String.format("%s, %s: %s", course, date, detail));
        }
        return reviews;
    }
}


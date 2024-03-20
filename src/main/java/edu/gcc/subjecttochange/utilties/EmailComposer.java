package edu.gcc.subjecttochange.utilties;

import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

public class EmailComposer {
    public static void composeEmail(String professorEmail, String userName) {
        // Compose the email template
        String subject = "Meeting Request";
        String body = "Dear Professor,\n\n"
                + "I hope this email finds you well. My name is " + userName + ", and I am a student at GCC. "
                + "I would like to request a meeting with you to discuss [topic]. Please let me know your availability. "
                + "Thank you for your time.\n\n"
                + "Sincerely,\n" + userName;

        // Call method to send email
        sendEmail(professorEmail, subject, body);
    }

    private static void sendEmail(String recipient, String subject, String body) {
        // Create mailto URI
        String uriStr = String.format("mailto:%s?subject=%s&body=%s",
                recipient,
                uriEncode(subject),
                uriEncode(body));

        try {
            // Open default email application
            Desktop.getDesktop().mail(new URI(uriStr));
        } catch (IOException | URISyntaxException e) {
            // Handle exceptions
            e.printStackTrace();
        }
    }

    private static String uriEncode(String value) {
        try {
            return new URI(null, null, value, null).toASCIIString();
        } catch (URISyntaxException e) {
            // Handle exceptions
            e.printStackTrace();
            return "";
        }
    }
}

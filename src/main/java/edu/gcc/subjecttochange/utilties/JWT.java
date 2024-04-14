package edu.gcc.subjecttochange.utilties;

import io.jsonwebtoken.Jwts;
import io.javalin.http.Context;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

public class JWT {
    private static SecretKey secretKey() {
        // Convert the string to a byte array
        byte[] keyBytes = "dd2fcae2-b184-4d3e-9655-e440cc8b7835".getBytes(StandardCharsets.UTF_8);
        // Create a SecretKeySpec object using the byte array and the desired algorithm
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }
    public static String generate(int studentId) {
        return Jwts.builder().subject(String.valueOf(studentId)).signWith(secretKey()).compact();
    }

    public static Integer decodeStudentId(Context context) {
        if (context.header("jwt") == null) {
            return null;
        }

        String subject = Jwts.parser().verifyWith(secretKey()).build().parseSignedClaims(context.header("jwt")).getPayload().getSubject();
        try {
            return Integer.parseInt(subject);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}

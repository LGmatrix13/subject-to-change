package edu.gcc.subjecttochange.utilties;

import io.jsonwebtoken.Jwts;
import io.javalin.http.Context;

import javax.crypto.SecretKey;

public class JWT {
    private final static  SecretKey secretKey = Jwts.SIG.HS256.key().build();;

    public static String generate(int studentId) {
        return Jwts.builder().subject(String.valueOf(studentId)).signWith(secretKey).compact();
    }

    public static Integer decodeStudentId(Context context) {
        if (context.header("jwt") == null) {
            return null;
        }
        
        String subject = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(context.header("jwt")).getPayload().getSubject();
        try {
            return Integer.parseInt(subject);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}

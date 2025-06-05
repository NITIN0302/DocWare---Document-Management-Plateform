package com.example.Document_Service.Backend_Document.FileModule;
import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;

public class CreateFileName {
    public static String createName(NodeDocument nodeDocument) {
        String fileName = randomString(nodeDocument.getName());
        return fileName;
    }

    public static String randomString(String name) {
        String timestamp = String.valueOf(Instant.now().toEpochMilli());
        String input = name + timestamp;
        return Base64.getEncoder().encodeToString(input.getBytes(StandardCharsets.UTF_8));
    }
}


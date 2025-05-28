package com.DocumentService.Backend_Document.FileModule;

import com.Document.Backend_Document.Entity.NodeDocument;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;

public class CreateFileName
{
    public static String createName(NodeDocument nodeDocument){
        String fileName = nodeDocument.getName() + "-" + nodeDocument.getParentid() + "-" + randomString(nodeDocument.getName()) + ".txt";
        return fileName;
    }

    public static String randomString(String name){
        String timestamp = String.valueOf(Instant.now().toEpochMilli());
        String input = name + timestamp;
        return Base64.getEncoder().encodeToString(input.getBytes(StandardCharsets.UTF_8));
    }
}

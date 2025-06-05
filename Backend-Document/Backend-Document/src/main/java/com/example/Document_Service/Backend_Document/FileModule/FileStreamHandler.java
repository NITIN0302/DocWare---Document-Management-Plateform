package com.example.Document_Service.Backend_Document.FileModule;


import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import java.io.*;

public class FileStreamHandler {

    public static void createAndWriteToFile(String data, String filePath) {
        File file = new File(filePath);

        try {
            if (file.createNewFile()) {
                System.out.println("File created successfully: " + filePath);
            } else {
                System.out.println("File already exists: " + filePath);
            }

            try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
                writer.write(data);
                System.out.println("Data written successfully.");
            }

        } catch (IOException e) {
            System.err.println("Error handling file: " + e.getMessage());
        }
    }

    public static String readFile(String filePath) {
        File file = new File(filePath);

        if (!file.exists()) {
            System.err.println("File does not exist: " + filePath);
            return "";
        }

        StringBuilder content = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }

        return content.toString();
    }

}

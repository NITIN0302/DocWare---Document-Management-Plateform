package com.DocumentService.Backend_Document.FileModule;

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

    public static void readFile(String filePath) {
        File file = new File(filePath);

        if (!file.exists()) {
            System.out.println("File does not exist: " + filePath);
            return;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            System.out.println("File content:");
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        String filePath = "C:/local_folder/output.txt"; // Adjust path as needed
        String fileContent = "This is the content to write in the file.and it is modified";

        createAndWriteToFile(fileContent, filePath);
        readFile(filePath);
    }
}
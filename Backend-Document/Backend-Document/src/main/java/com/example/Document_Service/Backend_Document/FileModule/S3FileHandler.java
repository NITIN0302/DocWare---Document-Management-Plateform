package com.example.Document_Service.Backend_Document.FileModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.nio.charset.StandardCharsets;

@Component
public class S3FileHandler {

    private final S3Client s3Client;
    private final String bucketName = "docware"; // You can externalize this to application.properties

    @Autowired
    public S3FileHandler(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public void uploadToS3(String data, String key) throws Exception {
        try {
            PutObjectRequest putRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType("text/plain")
                    .build();

            s3Client.putObject(putRequest, RequestBody.fromString(data, StandardCharsets.UTF_8));
            System.out.println("File uploaded successfully to S3: " + key);
        } catch (S3Exception e) {
            System.err.println("Failed to upload file: " + e.awsErrorDetails().errorMessage());
            throw new Exception(e.awsErrorDetails().errorMessage());
        }
    }

    public String readFromS3(String key) throws Exception{
        try {
            GetObjectRequest getRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            return s3Client.getObjectAsBytes(getRequest).asUtf8String();

        } catch (NoSuchKeyException e) {
            System.err.println("File not found in S3: " + key);
        } catch (S3Exception e) {
            System.err.println("Failed to read file: " + e.awsErrorDetails().errorMessage());
            throw new Exception(e.awsErrorDetails().errorMessage());
        }

        return "";
    }
}


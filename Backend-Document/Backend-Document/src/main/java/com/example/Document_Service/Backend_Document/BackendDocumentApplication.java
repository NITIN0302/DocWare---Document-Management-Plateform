package com.example.Document_Service.Backend_Document;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BackendDocumentApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendDocumentApplication.class, args);
	}

}

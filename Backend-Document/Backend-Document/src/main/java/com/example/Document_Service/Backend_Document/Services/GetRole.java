package com.example.Document_Service.Backend_Document.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(url="localhost:8080",value="GetUserRole")
public interface GetRole {

    @GetMapping("/UserService/getRole")
    public List<String> getRole(@RequestHeader("username") String username);

}


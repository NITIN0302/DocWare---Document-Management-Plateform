package com.example.Folder_Service.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(url="localhost:8080",value="GetUser")
public interface GetUser {
    @GetMapping("/UserService/getUserInfo")
    public String getUserByJwtToken(@RequestHeader("Authorization") String token);
}

package com.example.Folder_Service.Services;


import com.example.Folder_Service.Pojo.ResultResponse;
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

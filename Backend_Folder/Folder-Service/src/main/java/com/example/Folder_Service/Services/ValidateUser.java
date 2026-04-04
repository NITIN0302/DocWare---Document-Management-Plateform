package com.example.Folder_Service.Services;
import com.example.Folder_Service.Pojo.ResultResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "USER-SERVICE",contextId="Validate-User")
public interface ValidateUser {
    @GetMapping("/UserService/validateToken")
    public ResponseEntity<ResultResponse> validateToken(@RequestHeader("Authorization") String token);
}

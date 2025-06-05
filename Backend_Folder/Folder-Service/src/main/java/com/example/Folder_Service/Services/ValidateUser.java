package com.example.Folder_Service.Services;
import com.example.Folder_Service.Pojo.ResultResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(url="localhost:8080",value="Validate-User")
public interface ValidateUser {
    @GetMapping("/UserService/validateToken")
    public ResponseEntity<ResultResponse> validateToken(@RequestHeader("Authorization") String token);
}

package com.example.Document_Service.Backend_Document.Services;
import com.example.Document_Service.Backend_Document.Pojo.ResultResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "USER-SERVICE",contextId="Validate-User")
public interface ValidateUser {
    @GetMapping("/UserService/validateToken")
    public ResponseEntity<ResultResponse> validateToken(@RequestHeader("Authorization") String token);
}

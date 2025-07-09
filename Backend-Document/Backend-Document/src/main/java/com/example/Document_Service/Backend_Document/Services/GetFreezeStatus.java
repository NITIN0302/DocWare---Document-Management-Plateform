package com.example.Document_Service.Backend_Document.Services;

import com.example.Document_Service.Backend_Document.Pojo.FreezeStatus;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(url="localhost:8081",value="GetFreezeStatus")
public interface GetFreezeStatus {
    @GetMapping("/FolderService/isfreezeFolder/{id}")
    public ResponseEntity<FreezeStatus> isFolderFreeze(@PathVariable int id);
}

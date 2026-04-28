package com.example.Folder_Service.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "AccessRights",contextId="GetMappedUser")
public interface GetMappedUser {
    @GetMapping("/getMappedUser/{id}")
    public boolean getMappedUser(@PathVariable int id);
}

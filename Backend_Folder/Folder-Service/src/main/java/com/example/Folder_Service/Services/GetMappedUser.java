package com.example.Folder_Service.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "AccessRights", contextId="GetMappedUser")
public interface GetMappedUser {

    @GetMapping("/AccessService/getAllMetaDataMapped/{username}")
    List<String> getMappedUser(@PathVariable("username") String username);
}

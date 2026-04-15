package com.example.Document_Service.Backend_Document.Services;

import com.example.Document_Service.Backend_Document.Entity.MetaData;
import com.example.Document_Service.Backend_Document.Pojo.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "AccessRights",contextId="SaveMetaData")
public interface SaveMetaData {
    @PostMapping("/AccessService/saveMetadataInfo")
    public ResponseEntity<CommonResponse> saveMetadataInfo(@RequestBody MetaData metadata);
}

package com.EntitlementService.AccessRights.Controller;

import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Pojo.CommonResponse;
import com.EntitlementService.AccessRights.Service.DynamicCreation;
import com.EntitlementService.AccessRights.Service.Impl.AccessServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/AccessService")
public class AccessController {

    public AccessServiceImpl accessService;
    public DynamicCreation creation;

    public AccessController(AccessServiceImpl accessService, DynamicCreation creation) {
        this.accessService = accessService;
        this.creation = creation;
    }

    @PostMapping("/createMetadata")
    public ResponseEntity<CommonResponse> createMetadata(@RequestBody MetaData metadata) {
        CommonResponse createPojo = new CommonResponse();
        try {
            accessService.createMetadata(metadata);
            createPojo.setStatus("1");
            createPojo.setMessage("Metadata Created Successfully");
        }catch(Exception e){
            createPojo.setStatus("0");
            createPojo.setMessage("MetaData Already Exists");
        }
        return new ResponseEntity<>(createPojo, HttpStatus.OK);
    }

    @PostMapping("/saveMetadataInfo")
    public ResponseEntity<CommonResponse> saveMetadataInfo(@RequestBody MetaData metadata) {
        CommonResponse insertPojo = new CommonResponse();
        try {
            creation.saveMetadataDoc(metadata);
            insertPojo.setStatus("1");
            insertPojo.setMessage("Data Saved Successfully");
        }catch(Exception e){
            insertPojo.setStatus("0");
            insertPojo.setMessage("Error Saving Metadata");
        }
        return new ResponseEntity<>(insertPojo, HttpStatus.OK);
    }


}

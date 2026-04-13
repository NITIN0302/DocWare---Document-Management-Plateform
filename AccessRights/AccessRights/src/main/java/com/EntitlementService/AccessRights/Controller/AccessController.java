package com.EntitlementService.AccessRights.Controller;

import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaUserMapping;
import com.EntitlementService.AccessRights.Pojo.CommonResponse;
import com.EntitlementService.AccessRights.Repository.MetaUserMap;
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
    public MetaUserMap metaUserMap;

    public AccessController(AccessServiceImpl accessService, DynamicCreation creation,MetaUserMap metaUserMap) {
        this.accessService = accessService;
        this.creation = creation;
        this.metaUserMap = metaUserMap;
    }

    @PostMapping("/createMetadata")
    public ResponseEntity<CommonResponse> createMetadata(@RequestBody MetaData metadata) {
        CommonResponse createPojo = new CommonResponse();
        try {
            accessService.createMetadata(metadata);
            MetaUserMapping mp = new MetaUserMapping(1, metadata.getId(), "1","1","1","1","1");
            metaUserMap.save(mp);
            createPojo.setStatus("1");
            createPojo.setMessage("Metadata Created Successfully");
        }catch(NullPointerException e){
            createPojo.setStatus("0");
            createPojo.setMessage("Unable to Create Metadata");
        }
        catch(Exception e){
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

    @PostMapping("/accessRights")
    public ResponseEntity<CommonResponse> accessRights(@RequestBody MetaUserMapping userMap) {
        CommonResponse accessRights = new CommonResponse();
        try{
            metaUserMap.save(userMap);
            accessRights.setStatus("1");
            accessRights.setMessage("User Access Granted");
        }catch(Exception e){
            e.printStackTrace();
            accessRights.setStatus("0");
            accessRights.setMessage("Error Saving Access Rights");
        }

        return new ResponseEntity<>(accessRights, HttpStatus.OK);
    }


}

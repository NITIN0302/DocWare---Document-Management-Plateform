package com.EntitlementService.AccessRights.Controller;

import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaProperties;
import com.EntitlementService.AccessRights.Entity.MetaUserMapping;
import com.EntitlementService.AccessRights.Pojo.CommonResponse;
import com.EntitlementService.AccessRights.Pojo.MetaDataDTO;
import com.EntitlementService.AccessRights.Repository.MetaUserMap;
import com.EntitlementService.AccessRights.Service.DynamicCreation;
import com.EntitlementService.AccessRights.Service.Impl.AccessServiceImpl;
import com.EntitlementService.AccessRights.Session.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/AccessService")
public class AccessController {

    public AccessServiceImpl accessService;
    public DynamicCreation creation;
    public MetaUserMap metaUserMap;
    public JwtUtils jwtUtils;

    public AccessController(AccessServiceImpl accessService, DynamicCreation creation, MetaUserMap metaUserMap, JwtUtils jwtUtils) {
        this.accessService = accessService;
        this.creation = creation;
        this.metaUserMap = metaUserMap;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/createMetadata")
    public ResponseEntity<CommonResponse> createMetadata(@RequestBody MetaData metadata) {
        CommonResponse createPojo = new CommonResponse();
        try {
            accessService.createMetadata(metadata);
            MetaUserMapping mp = new MetaUserMapping("admin", metadata, "1","1","1","1");
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
            MetaData ms = accessService.accessRepository.findByName(metadata.getName());
            insertPojo.setId(ms.getId());
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

    @GetMapping("/getAllMetaData")
    public ResponseEntity<?> getAllMetaData() {
        CommonResponse response = new CommonResponse();
        List<MetaDataDTO> metaList = new ArrayList<>();
        try{
            metaList = accessService.getAllmetaData();
            return new ResponseEntity<>(metaList, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            response.setStatus("0");
            response.setMessage("Error In Getting MetaData");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getMetaMapUser/{id}")
    public ResponseEntity<?> getMetaMapUser(@PathVariable int id) {
        CommonResponse response = new CommonResponse();
        try{
            List<MetaUserMapping> metaDataList = accessService.getAllMetaMapUser(id);
            return  new ResponseEntity<>(metaDataList, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            response.setStatus("0");
            response.setMessage("Error In Getting Info");
        }
        return  new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getMappedUser/{id}")
    public ResponseEntity<?> getMappedUser(HttpServletRequest request, @PathVariable int id) {
        CommonResponse response = new CommonResponse();
        String token = request.getHeader("Authorization");
        String username = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        try{
            boolean isAccessible = creation.getAllMappedUser(id,username);
            return new ResponseEntity<>(isAccessible, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            response.setStatus("0");
            response.setMessage("Error In Getting Info");
        }
        return  new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/getAllProp/{id}")
    public ResponseEntity<?> getMetaProperty(@PathVariable int id) {
        CommonResponse response = new CommonResponse();
        try{
            List<MetaProperties> metaDataList = creation.getAllProps(id);
            return  new ResponseEntity<>(metaDataList, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            response.setStatus("0");
            response.setMessage("Error In Getting Info");
        }
        return  new ResponseEntity<>(response, HttpStatus.OK);
    }




}

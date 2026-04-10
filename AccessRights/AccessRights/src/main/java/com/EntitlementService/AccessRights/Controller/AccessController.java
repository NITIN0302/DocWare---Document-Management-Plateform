package com.EntitlementService.AccessRights.Controller;

import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Pojo.CreateMetadata;
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

    public AccessController(AccessServiceImpl accessService) {
        this.accessService = accessService;
    }

    @PostMapping("/createMetadata")
    public ResponseEntity<String> createMetadata(@RequestBody MetaData metadata) {
        CreateMetadata createPojo = new CreateMetadata();
        accessService.createMetadata(metadata);
        createPojo.setStatus("1");
        createPojo.setMessage("Success");
        return new ResponseEntity<>(createPojo.getStatus(), HttpStatus.OK);
    }


}

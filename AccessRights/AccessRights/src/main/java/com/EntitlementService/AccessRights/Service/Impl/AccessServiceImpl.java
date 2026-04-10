package com.EntitlementService.AccessRights.Service.Impl;

import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaProperties;
import com.EntitlementService.AccessRights.Repository.AccessPropRepo;
import com.EntitlementService.AccessRights.Repository.AccessRepository;
import com.EntitlementService.AccessRights.Service.AccessService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AccessServiceImpl implements AccessService {

    public AccessRepository accessRepository;
    public AccessPropRepo accessPropRepo;;

    public AccessServiceImpl(AccessRepository accessRepository, AccessPropRepo accessPropRepo) {
        this.accessRepository = accessRepository;
        this.accessPropRepo = accessPropRepo;
    }

    @Override
    public void createMetadata(MetaData metaData) {
        MetaData md = accessRepository.save(metaData);
        int metadataId = md.getId();
        List<MetaProperties> properties = metaData.getMetaData();
        for(MetaProperties metaProperties : properties){
            metaProperties.setId(metadataId);
            accessPropRepo.save(metaProperties);
        }
    }
}

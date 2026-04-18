package com.EntitlementService.AccessRights.Service.Impl;

import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaProperties;
import com.EntitlementService.AccessRights.Entity.MetaUserMapping;
import com.EntitlementService.AccessRights.Pojo.MetaDataDTO;
import com.EntitlementService.AccessRights.Repository.MetaUserMap;
import com.EntitlementService.AccessRights.Repository.AccessRepository;
import com.EntitlementService.AccessRights.Service.AccessService;
import com.EntitlementService.AccessRights.Service.DynamicCreation;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AccessServiceImpl implements AccessService {

    public AccessRepository accessRepository;
    public MetaUserMap accessPropRepo;
    public DynamicCreation dynamicCreation;

    public AccessServiceImpl(AccessRepository accessRepository,
                             MetaUserMap accessPropRepo,
                             DynamicCreation dynamicCreation) {
        this.accessRepository = accessRepository;
        this.accessPropRepo = accessPropRepo;
        this.dynamicCreation = dynamicCreation;
    }

    @Override
    public void createMetadata(MetaData metaData) {
        try{
            MetaData md = accessRepository.save(metaData);
            dynamicCreation.createMetadataTable(metaData);
        }
        catch(Exception e){
            throw e;
        }
    }

    @Override
    public List<MetaDataDTO> getAllmetaData(){
        return accessRepository.getAllmetaData();
    }

    @Override
    public List<MetaUserMapping> getAllMetaMapUser(int id){
        return accessRepository.getAllWithMetadata(id);
    }
}

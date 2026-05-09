package com.EntitlementService.AccessRights.Service.Impl;

import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaUserMapping;
import com.EntitlementService.AccessRights.Pojo.AccessRight;
import com.EntitlementService.AccessRights.Repository.AccessRepository;
import com.EntitlementService.AccessRights.Repository.MetaUserMap;
import com.EntitlementService.AccessRights.Service.MetaUserMapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MetaUserMapServiceImpl implements MetaUserMapService {
    @Autowired
    public MetaUserMap metaUserMap;
    @Autowired
    public AccessRepository accessRepo;
    @Override
    public boolean giveAccessRights(MetaUserMapping userMap) {
        metaUserMap.save(userMap);
        return true;
    }

    @Override
    public boolean giveAccessRightUser(AccessRight userMap) {
        String metaDataid = userMap.getMetadataId();
        MetaData metadata = accessRepo.findById(Integer.parseInt(metaDataid)).orElseThrow(()-> {
            try {
                throw new IllegalAccessException("Not Found");
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        });
        MetaUserMapping metaUser = new MetaUserMapping(
                userMap.getUserName(),
                metadata,
                userMap.getReadRights(),
                userMap.getDeleteRights(),
                userMap.getUploadRights(),
                userMap.getDownloadRights()
        );
        metaUserMap.save(metaUser);
        return true;
    }
}

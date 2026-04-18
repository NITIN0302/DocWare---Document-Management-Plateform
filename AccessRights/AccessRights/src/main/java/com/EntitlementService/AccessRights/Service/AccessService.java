package com.EntitlementService.AccessRights.Service;
import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaUserMapping;
import com.EntitlementService.AccessRights.Pojo.MetaDataDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccessService {
    public void createMetadata(MetaData metaData);
    public List<MetaDataDTO> getAllmetaData();
    public List<MetaUserMapping> getAllMetaMapUser(int id);
}

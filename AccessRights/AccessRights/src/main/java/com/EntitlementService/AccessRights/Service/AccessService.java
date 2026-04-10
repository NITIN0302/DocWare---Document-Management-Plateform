package com.EntitlementService.AccessRights.Service;
import com.EntitlementService.AccessRights.Entity.MetaData;
import org.springframework.stereotype.Service;

@Service
public interface AccessService {
    public void createMetadata(MetaData metaData);
}

package com.EntitlementService.AccessRights.Service;

import com.EntitlementService.AccessRights.Entity.MetaData;
import org.springframework.stereotype.Service;

import java.net.InterfaceAddress;

@Service
public interface DynamicCreation {
    public boolean createMetadataTable(MetaData metaData);
    public boolean saveMetadataDoc(MetaData metaData);
}

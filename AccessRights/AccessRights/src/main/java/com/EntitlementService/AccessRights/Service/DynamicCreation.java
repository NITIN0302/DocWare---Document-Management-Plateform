package com.EntitlementService.AccessRights.Service;

import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaProperties;
import org.springframework.stereotype.Service;

import java.net.InterfaceAddress;
import java.util.List;

@Service
public interface DynamicCreation {
    public boolean createMetadataTable(MetaData metaData);
    public boolean saveMetadataDoc(MetaData metaData);
    public boolean saveMetaProp(List<MetaProperties> metaProps,int id);
}

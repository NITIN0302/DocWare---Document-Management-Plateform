package com.EntitlementService.AccessRights.Service;

import com.EntitlementService.AccessRights.Entity.MetaUserMapping;
import com.EntitlementService.AccessRights.Pojo.AccessRight;
import org.springframework.stereotype.Service;

@Service
public interface MetaUserMapService{
    public boolean giveAccessRights(MetaUserMapping metaUserMapping);
    public boolean giveAccessRightUser(AccessRight userMap);
}

package com.example.Document_Service.Backend_Document.Services;
import com.example.Document_Service.Backend_Document.Entity.DocumentAccess;

import java.util.List;

public interface RoleService
{
    void addAccessRights(DocumentAccess fa);

    List<DocumentAccess> getAccessByuuid(Long uuid);
}

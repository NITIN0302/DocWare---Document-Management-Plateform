package com.example.Document_Service.Backend_Document.Services.Impl;
import com.example.Document_Service.Backend_Document.Entity.DocumentAccess;
import com.example.Document_Service.Backend_Document.Services.RoleService;
import com.example.Document_Service.Backend_Document.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Override
    public void addAccessRights(DocumentAccess da) {
        roleRepository.save(da);
    }

    @Override
    public List<DocumentAccess> getAccessByuuid(Long uuid) {
        return roleRepository.findByUuid(uuid);
    }
}

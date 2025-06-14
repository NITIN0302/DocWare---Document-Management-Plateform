package com.example.Folder_Service.Services.impl;

import com.example.Folder_Service.Entity.FolderAccess;
import com.example.Folder_Service.Repository.RoleRepository;
import com.example.Folder_Service.Services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Override
    public void addAccessRights(FolderAccess fa) {
        roleRepository.save(fa);
    }
}

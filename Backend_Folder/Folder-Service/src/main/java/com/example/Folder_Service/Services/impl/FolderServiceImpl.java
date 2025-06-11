package com.example.Folder_Service.Services.impl;

import java.util.List;
import java.util.Optional;

import com.example.Folder_Service.Entity.FolderAccess;
import com.example.Folder_Service.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Folder_Service.Entity.NodeFolder;
import com.example.Folder_Service.Repository.FolderRepository;
import com.example.Folder_Service.Services.FolderService;

@Service
public class FolderServiceImpl implements FolderService {

    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<NodeFolder> getFolderByName(String name) {
        return folderRepository.findByName(name);
    }

    @Override
    public NodeFolder createFolder(NodeFolder nodefolder) {
        List<String> roles = nodefolder.getRoles();
        FolderAccess fa = new FolderAccess();
        NodeFolder nodeRes = folderRepository.save(nodefolder);
        for(String role : roles){
            fa.setUuid(nodeRes.getUuid());
            fa.setRole(role);
            roleRepository.save(fa);
        }
        return nodeRes;
    }

    @Override
    public List<NodeFolder> getFolder(int parentId) {
        return folderRepository.findByParentId(parentId);
    }

    @Override
    public Optional<NodeFolder> getFolderById(int id) {
        return folderRepository.findById(id);
    }
}

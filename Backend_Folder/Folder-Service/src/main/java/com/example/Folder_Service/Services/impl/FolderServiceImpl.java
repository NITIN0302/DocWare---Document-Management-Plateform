package com.example.Folder_Service.Services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Folder_Service.Entity.NodeFolder;
import com.example.Folder_Service.Repository.FolderRepository;
import com.example.Folder_Service.Services.FolderService;

@Service
public class FolderServiceImpl implements FolderService {

    @Autowired
    private FolderRepository folderRepository;

    @Override
    public List<NodeFolder> getFolderByName(String name) {
        return folderRepository.findByName(name);
    }

    @Override
    public NodeFolder createFolder(NodeFolder nodefolder) {
        return folderRepository.save(nodefolder);
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

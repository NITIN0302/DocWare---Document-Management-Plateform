package com.example.Folder_Service.Services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.Folder_Service.Entity.FolderAccess;
import com.example.Folder_Service.Repository.RoleRepository;
import com.example.Folder_Service.Services.GetRole;
import com.example.Folder_Service.Services.GetUser;
import com.example.Folder_Service.Services.RoleService;
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
    @Autowired
    private RoleService roleService;
    @Autowired
    private GetRole userRole;


    @Override
    public List<NodeFolder> getFolderByName(String username,String name) {
        List<String> userRoles =  userRole.getRole(username);
        List<NodeFolder> allFolderByName = folderRepository.findByName(name);
        List<NodeFolder> allAccessedFolder = new ArrayList<NodeFolder>();
        if(userRoles.contains("ROLE_ADMIN")){
            return allFolderByName;
        }
        else{
            for(NodeFolder nf : allFolderByName){
                List<FolderAccess> accessRights = roleRepository.findByUuid(nf.getUuid());
                for(FolderAccess fa : accessRights){
                    if(userRoles.contains(fa.getRole())){
                        allAccessedFolder.add(nf);
                    }
                }
            }
        }
        return allAccessedFolder;
    }

    @Override
    public NodeFolder createFolder(NodeFolder nodefolder) {
        List<String> roles = nodefolder.getRoles();
        NodeFolder nodeRes = folderRepository.save(nodefolder);
        for (String role : roles) {
            FolderAccess fa = new FolderAccess();
            fa.setUuid(nodeRes.getUuid());
            fa.setRole(role);
            roleService.addAccessRights(fa);
        }
        return nodeRes;
    }

    @Override
    public List<NodeFolder> getFolder(String username,int parentId) {
        List<NodeFolder> allFolderByParent =  folderRepository.findByParentId(parentId);
        List<NodeFolder> accessedFolder = new ArrayList<NodeFolder>();
        List<String> userRoles =  userRole.getRole(username);
        if(userRoles.contains("ROLE_ADMIN")){
            return allFolderByParent;
        }
        else{
            for(NodeFolder nf : allFolderByParent){
                List<FolderAccess> accessRights = roleRepository.findByUuid(nf.getUuid());
                for(FolderAccess fa : accessRights){
                    if(userRoles.contains(fa.getRole())){
                        accessedFolder.add(nf);
                    }
                }
            }
        }
        return accessedFolder;
    }

    @Override
    public Optional<NodeFolder> getFolderById(String username,int id) {
        List<String> userRoles =  userRole.getRole(username);
        Optional<NodeFolder> nf = folderRepository.findById(id);
        if(userRoles.contains("ROLE_ADMIN")){
            return nf;
        }
        else{
            List<FolderAccess> accessRights = roleRepository.findByUuid(nf.get().getUuid());
            for(FolderAccess fa : accessRights){
                if(userRoles.contains(fa.getRole())){
                    return nf;
                }
            }
        }
        return null;
    }

    @Override
    public NodeFolder freezeFolder(NodeFolder nd) {
        return folderRepository.save(nd);
    }

}

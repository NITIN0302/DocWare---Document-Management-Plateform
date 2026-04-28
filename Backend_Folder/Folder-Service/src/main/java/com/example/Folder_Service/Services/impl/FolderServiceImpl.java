package com.example.Folder_Service.Services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.Folder_Service.Entity.FolderAccess;
import com.example.Folder_Service.Entity.FolderMetaMap;
import com.example.Folder_Service.Entity.MetaData;
import com.example.Folder_Service.Pojo.SaveMetaDataResp;
import com.example.Folder_Service.Repository.FolderMetaRepository;
import com.example.Folder_Service.Repository.RoleRepository;
import com.example.Folder_Service.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Folder_Service.Entity.NodeFolder;
import com.example.Folder_Service.Repository.FolderRepository;

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
    @Autowired
    public SaveMetaData saveMetaData;
    @Autowired
    public FolderMetaRepository folderMetaRepository;
    @Autowired
    public GetMappedUser getMappedUser;


    @Override
    public List<NodeFolder> getFolderByName(String username,String name) {
        List<String> userRoles =  userRole.getRole(username);
        List<NodeFolder> allFolderByName = folderRepository.findByNameContaining(name);
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
        SaveMetaDataResp response = new SaveMetaDataResp();
        NodeFolder nodeRes = folderRepository.save(nodefolder);
        MetaData ms = nodefolder.getMetaData();
        ms.setDocid(String.valueOf(nodeRes.getUuid()));
        FolderMetaMap fm = new FolderMetaMap();
        response = saveMetaData.saveMetadataInfo(nodefolder.getMetaData()).getBody();
        if(response != null) {
            fm.setMetaDataId(response.getId());
            fm.setFolderId(nodeRes.getUuid());
            folderMetaRepository.save(fm);
        }
        return nodeRes;
    }

    @Override
    public List<NodeFolder> getFolder(String username,int parentId) {
        List<NodeFolder> allFolderByParent =  folderRepository.findByParentId(parentId);
        List<NodeFolder> accessedFolder = new ArrayList<NodeFolder>();
        if(parentId == 0){
            return allFolderByParent;
        }
        else{
            List<NodeFolder> allFolder = new ArrayList<>();
            for(NodeFolder nf : allFolderByParent){
                FolderMetaMap metaId = folderMetaRepository.findByFolderId(nf.getUuid());
                int metaDataId = metaId.getMetaDataId();
                boolean isAccessed = getMappedUser.getMappedUser(metaDataId);
                if(isAccessed){
                    accessedFolder.add(nf);
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

    @Override
    public boolean isFolderFreeze(Integer id) {
        Optional<NodeFolder> nd = folderRepository.findById(id);
        if (nd.get().getFreeze() == 0) {
            return false;
        }
        return true;
    }

}

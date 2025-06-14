package com.example.Folder_Service.Services;
import com.example.Folder_Service.Entity.NodeFolder;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface FolderService{
    List<NodeFolder>  getFolderByName(String username,String name);

    NodeFolder createFolder(NodeFolder nodefolder);

    List<NodeFolder> getFolder(String username, int parentId);

    Optional<NodeFolder> getFolderById(String username,int id);
}

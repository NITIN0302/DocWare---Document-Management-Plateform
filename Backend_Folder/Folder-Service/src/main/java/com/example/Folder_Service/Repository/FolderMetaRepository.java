package com.example.Folder_Service.Repository;

import com.example.Folder_Service.Entity.FolderMetaMap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderMetaRepository extends JpaRepository<FolderMetaMap, Integer> {
    public FolderMetaMap findByFolderId(Integer id);
}

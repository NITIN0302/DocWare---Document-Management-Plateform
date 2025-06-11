package com.example.Folder_Service.Repository;

import com.example.Folder_Service.Entity.FolderAccess;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<FolderAccess,Integer> {
    List<FolderAccess> findByUuid(int uuid);
}

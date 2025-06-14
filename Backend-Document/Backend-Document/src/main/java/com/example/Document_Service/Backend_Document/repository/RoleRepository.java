package com.example.Document_Service.Backend_Document.repository;

import com.example.Document_Service.Backend_Document.Entity.DocumentAccess;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<DocumentAccess,Integer> {
    List<DocumentAccess> findByUuid(Long uuid);
}

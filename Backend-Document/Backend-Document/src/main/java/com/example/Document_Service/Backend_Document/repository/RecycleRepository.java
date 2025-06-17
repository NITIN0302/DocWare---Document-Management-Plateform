package com.example.Document_Service.Backend_Document.repository;

import com.example.Document_Service.Backend_Document.Entity.RecycledDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecycleRepository extends JpaRepository<RecycledDocument,Long> {

}

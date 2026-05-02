package com.example.Document_Service.Backend_Document.repository;

import com.example.Document_Service.Backend_Document.Entity.DocMetaMap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentMetaMapRepository extends JpaRepository<DocMetaMap,Integer> {
    public DocMetaMap findByDocId(Long docid);
}

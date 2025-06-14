package com.example.Document_Service.Backend_Document.repository;

import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<NodeDocument,Long> {
    public List<NodeDocument> getDocumentByParentId(Long parentId);

    public List<NodeDocument> getDocumentByName(String name);

}

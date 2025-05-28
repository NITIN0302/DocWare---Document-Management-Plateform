package com.Document.Backend_Document.repository;

import com.Document.Backend_Document.Entity.NodeDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<NodeDocument,Long> {

}

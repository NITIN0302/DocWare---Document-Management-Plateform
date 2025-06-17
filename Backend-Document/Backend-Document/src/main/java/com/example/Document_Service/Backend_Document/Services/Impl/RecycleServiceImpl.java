package com.example.Document_Service.Backend_Document.Services.Impl;

import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import com.example.Document_Service.Backend_Document.Entity.RecycledDocument;
import com.example.Document_Service.Backend_Document.Pojo.DeleteDocument;
import com.example.Document_Service.Backend_Document.Services.RecycleService;
import com.example.Document_Service.Backend_Document.repository.DocumentRepository;
import com.example.Document_Service.Backend_Document.repository.RecycleRepository;
import org.hibernate.sql.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class RecycleServiceImpl implements RecycleService {

    @Autowired
    private RecycleRepository recycleRepository;

    @Autowired
    private DocumentServiceImpl documentService;

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public List<RecycledDocument> getAllDeletedDocument(String username) {
        return recycleRepository.findAll();
    }

    @Override
    public DeleteDocument recycleDocument(String username, Long uuid) {
        Optional<RecycledDocument> rd = recycleRepository.findById(uuid);
        DeleteDocument response = new DeleteDocument();
        if (rd.isEmpty()) {
            response.setStatus("1");
            response.setMessage("Document Not Found");
        } else {
            RecycledDocument recycleDocument = rd.get();
            NodeDocument nd = new NodeDocument();
            nd.setName(recycleDocument.getName());
            nd.setNbs_uuid(recycleDocument.getNbs_uuid());
            nd.setUuid(recycleDocument.getUuid());
            nd.setCreatedBy(recycleDocument.getCreatedBy());
            nd.setParentId(recycleDocument.getParentId());
            nd.setCreatedDate(recycleDocument.getCreatedDate());
            nd.setExt(recycleDocument.getExt());
            recycleRepository.deleteById(uuid);
            documentRepository.saveAndFlush(nd);
            response.setStatus("1");
            response.setMessage("Document Recycle Succesfully");
        }
        return response;
    }
}

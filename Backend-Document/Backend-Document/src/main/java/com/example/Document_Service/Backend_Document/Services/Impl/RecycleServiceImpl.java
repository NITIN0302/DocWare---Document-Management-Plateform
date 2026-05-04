package com.example.Document_Service.Backend_Document.Services.Impl;

import com.example.Document_Service.Backend_Document.Entity.DocumentAccess;
import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import com.example.Document_Service.Backend_Document.Entity.RecycledDocument;
import com.example.Document_Service.Backend_Document.Pojo.DeleteDocument;
import com.example.Document_Service.Backend_Document.Services.GetRole;
import com.example.Document_Service.Backend_Document.Services.RecycleService;
import com.example.Document_Service.Backend_Document.Services.RoleService;
import com.example.Document_Service.Backend_Document.repository.DocumentRepository;
import com.example.Document_Service.Backend_Document.repository.RecycleRepository;
import org.hibernate.sql.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    @Autowired
    private GetRole userRole;

    @Autowired
    private RoleService roleService;

    @Override
    public List<RecycledDocument> getAllDeletedDocument(String username) {
        List<RecycledDocument> allDocuments =  recycleRepository.findAll();
        List<RecycledDocument> accessedDocument = new ArrayList<RecycledDocument>();
        List<String> userRoles = userRole.getRole(username);
        for (RecycledDocument nd : allDocuments) {
            List<DocumentAccess> accessRights = roleService.getAccessByuuid(nd.getUuid());
            for (DocumentAccess fa : accessRights) {
                if (userRoles.contains(fa.getRole())) {
                    accessedDocument.add(nd);
                }
            }
        }
        return accessedDocument;
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
            nd.setIsDeleted("0");
            documentRepository.save(nd);
            response.setStatus("1");
            response.setMessage("Document Recycle Succesfully");
        }
        return response;
    }
}

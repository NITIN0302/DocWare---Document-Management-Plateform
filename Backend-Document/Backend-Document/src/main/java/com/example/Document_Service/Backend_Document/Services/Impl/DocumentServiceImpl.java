package com.example.Document_Service.Backend_Document.Services.Impl;

import com.example.Document_Service.Backend_Document.Entity.Config;
import com.example.Document_Service.Backend_Document.Entity.DocumentAccess;
import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import com.example.Document_Service.Backend_Document.Entity.RecycledDocument;
import com.example.Document_Service.Backend_Document.FileModule.CreateFileName;
import com.example.Document_Service.Backend_Document.FileModule.FileStreamHandler;
import com.example.Document_Service.Backend_Document.Pojo.DeleteDocument;
import com.example.Document_Service.Backend_Document.Pojo.GetDocument;
import com.example.Document_Service.Backend_Document.Pojo.UploadResponse;
import com.example.Document_Service.Backend_Document.Services.ConfigService;
import com.example.Document_Service.Backend_Document.Services.DocumentService;
import com.example.Document_Service.Backend_Document.Services.GetRole;
import com.example.Document_Service.Backend_Document.Services.RoleService;
import com.example.Document_Service.Backend_Document.repository.DocumentRepository;
import com.example.Document_Service.Backend_Document.repository.RecycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class DocumentServiceImpl implements DocumentService {


    @Autowired
    public DocumentRepository documentRepository;

    @Autowired
    private ConfigService configService;

    @Autowired
    private RoleService roleService;
    @Autowired
    private GetRole userRole;
    @Autowired
    private RecycleRepository recycleRepository;

    @Override
    public UploadResponse uploadDocument(NodeDocument nodeDocument) {
        UploadResponse response = new UploadResponse();
        String fileString = nodeDocument.getFileString();
        List<String> roles = nodeDocument.getRoles();
        String encodedName = CreateFileName.createName(nodeDocument);
        nodeDocument.setNbs_uuid(encodedName);
        Config cf = configService.getConfigValue();
        String Location = cf.getVolumn() + nodeDocument.getName() + "-" + encodedName + ".txt";
        FileStreamHandler.createAndWriteToFile(fileString, Location);
        NodeDocument nd = documentRepository.save(nodeDocument);
        for (String role : roles) {
            DocumentAccess da = new DocumentAccess();
            da.setUuid(nd.getUuid());
            da.setRole(role);
            roleService.addAccessRights(da);
        }
        response.setStatus(1);
        response.setUuid(nd.getUuid());
        response.setMessage("Document Uploaded Succesfully");
        return response;
    }

    @Override
    public GetDocument getDocumentContent(String username, Long uuid) {
        GetDocument response = new GetDocument();
        List<DocumentAccess> accessRights = roleService.getAccessByuuid(uuid);
        List<String> userRoles = userRole.getRole(username);
        boolean isAccessible = false;
        for (DocumentAccess da : accessRights) {
            if (userRoles.contains(da.getRole())) {
                isAccessible = true;
                break;
            }
        }
        NodeDocument nd = documentRepository.findById(uuid).orElseThrow();
        Config cf = configService.getConfigValue();
        String filePath = cf.getVolumn() + nd.getName() + "-" + nd.getNbs_uuid() + ".txt";
        String fileString = FileStreamHandler.readFile(filePath);
        if (isAccessible) {
            if (fileString == "") {
                response.setMessage("File Not Found");
            } else {
                response.setMessage("Success");
            }
            response.setFileString(fileString);
            response.setStatus(1);
            response.setUuid(nd.getUuid());
            response.setName(nd.getName());
            response.setExt(nd.getExt());
        } else {
            response.setStatus(0);
            response.setMessage("ACCESS DENIED");
        }
        return response;
    }

    @Override
    public List<NodeDocument> getDocument(String username, Long parentId) {
        List<NodeDocument> allDocument = documentRepository.getDocumentByParentId(parentId);
        List<NodeDocument> accessedDocument = new ArrayList<NodeDocument>();
        List<String> userRoles = userRole.getRole(username);
        if (userRoles.contains("ROLE_ADMIN")) {
            for (NodeDocument nd : allDocument) {
                if (nd.getIsDeleted().equalsIgnoreCase("0")) {
                    accessedDocument.add(nd);
                }
            }
        } else {
            for (NodeDocument nd : allDocument) {
                List<DocumentAccess> accessRights = roleService.getAccessByuuid(nd.getUuid());
                for (DocumentAccess fa : accessRights) {
                    if (userRoles.contains(fa.getRole()) && nd.getIsDeleted().equalsIgnoreCase("0")) {
                        accessedDocument.add(nd);
                    }
                }

            }
        }
        return accessedDocument;
    }

    @Override
    public List<NodeDocument> getDocumentByName(String username, String docname) {
        List<NodeDocument> allDocument = documentRepository.getDocumentByName(docname);
        List<NodeDocument> accessedDocument = new ArrayList<NodeDocument>();
        List<String> userRoles = userRole.getRole(username);
        if (userRoles.contains("ROLE_ADMIN")) {
            for (NodeDocument nd : allDocument) {
                if (nd.getIsDeleted().equalsIgnoreCase("0")) {
                    accessedDocument.add(nd);
                }
            }
        } else {
            for (NodeDocument nd : allDocument) {
                List<DocumentAccess> accessRights = roleService.getAccessByuuid(nd.getUuid());
                for (DocumentAccess fa : accessRights) {
                    if (userRoles.contains(fa.getRole()) && nd.getIsDeleted().equalsIgnoreCase("0")) {
                        accessedDocument.add(nd);
                    }
                }

            }
        }
        return accessedDocument;
    }

    @Override
    public List<NodeDocument> getDocumentByUuid(String username, Long uuid) {
        Optional<NodeDocument> document = documentRepository.findById(uuid);
        List<NodeDocument> accessedDocument = new ArrayList<NodeDocument>();
        List<String> userRoles = userRole.getRole(username);
        List<DocumentAccess> da = roleService.getAccessByuuid(document.get().getUuid());
        for (DocumentAccess documentAccess : da) {
            if (userRoles.contains(documentAccess.getRole()) && document.get().getIsDeleted().equalsIgnoreCase("0")) {
                accessedDocument.add(document.get());
                break;
            }
        }
        return accessedDocument;
    }

    @Override
    public ResponseEntity<DeleteDocument> deleteDocumentByUuid(String username, Long uuid) {
        Optional<NodeDocument> document = documentRepository.findById(uuid);
        DeleteDocument response = new DeleteDocument();
        List<NodeDocument> accessedDocument = new ArrayList<NodeDocument>();
        List<String> userRoles = userRole.getRole(username);
        List<DocumentAccess> da = roleService.getAccessByuuid(document.get().getUuid());
        for (DocumentAccess documentAccess : da) {
            if (userRoles.contains(documentAccess.getRole())) {
                accessedDocument.add(document.get());
                break;
            }
        }
        if (accessedDocument.isEmpty()) {
            response.setStatus("0");
            response.setMessage("Access Denied");
        } else {
            for (NodeDocument nd : accessedDocument) {
                RecycledDocument rd = new RecycledDocument();
                rd.setUuid(nd.getUuid());
                rd.setName(nd.getName());
                rd.setCreatedBy(nd.getCreatedBy());
                rd.setCreatedDate(nd.getCreatedDate());
                rd.setParentId(nd.getParentId());
                rd.setExt(nd.getExt());
                rd.setNbs_uuid(nd.getNbs_uuid());
                recycleRepository.save(rd);
                nd.setIsDeleted("1");
                documentRepository.save(nd);
            }
            response.setStatus("1");
            response.setMessage("Document Deleted Succesfully");
        }
        return ResponseEntity.ok(response);
    }

}

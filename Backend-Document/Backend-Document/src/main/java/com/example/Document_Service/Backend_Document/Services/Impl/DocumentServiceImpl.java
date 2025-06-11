package com.example.Document_Service.Backend_Document.Services.Impl;

import com.example.Document_Service.Backend_Document.Entity.Config;
import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import com.example.Document_Service.Backend_Document.FileModule.CreateFileName;
import com.example.Document_Service.Backend_Document.FileModule.FileStreamHandler;
import com.example.Document_Service.Backend_Document.Pojo.GetDocument;
import com.example.Document_Service.Backend_Document.Pojo.UploadResponse;
import com.example.Document_Service.Backend_Document.Services.ConfigService;
import com.example.Document_Service.Backend_Document.Services.DocumentService;
import com.example.Document_Service.Backend_Document.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DocumentServiceImpl implements DocumentService {


    @Autowired
    public DocumentRepository documentRepository;

    @Autowired
    private ConfigService configService;

    @Override
    public UploadResponse uploadDocument(NodeDocument nodeDocument) {
        UploadResponse response = new UploadResponse();
        String fileString = nodeDocument.getFileString();
        String encodedName = CreateFileName.createName(nodeDocument);
        nodeDocument.setNbs_uuid(encodedName);
        Config cf = configService.getConfigValue();
        String Location = cf.getVolumn() + nodeDocument.getName() + "-" + encodedName + ".txt";
        FileStreamHandler.createAndWriteToFile(fileString, Location);
        NodeDocument nd = documentRepository.save(nodeDocument);
        response.setStatus(1);
        response.setUuid(nd.getUuid());
        response.setMessage("Document Uploaded Succesfully");
        return response;
    }

    @Override
    public GetDocument getDocumentContent(Long uuid) {
        GetDocument response = new GetDocument();
        NodeDocument nd = documentRepository.findById(uuid).orElseThrow();
        Config cf = configService.getConfigValue();
        String filePath = cf.getVolumn() + nd.getName() + "-" + nd.getNbs_uuid() + ".txt";
        String fileString = FileStreamHandler.readFile(filePath);
        if(fileString == ""){
            response.setMessage("File Not Found");
        }
        else{
            response.setMessage("Success");
        }
        response.setFileString(fileString);
        response.setStatus(1);
        response.setUuid(nd.getUuid());
        response.setName(nd.getName());
        response.setExt(nd.getExt());
        return response;
    }

    @Override
    public List<NodeDocument> getDocument(Long parentId) {
        List<NodeDocument> nd = documentRepository.getDocumentByParentId(parentId);
        return nd;
    }

}

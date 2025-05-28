package com.DocumentService.Backend_Document.Services.Impl;

import com.Document.Backend_Document.Entity.NodeDocument;
import com.Document.Backend_Document.Pojo.GetDocument;
import com.Document.Backend_Document.Pojo.UploadResponse;
import com.Document.Backend_Document.Services.DocumentService;
import com.Document.Backend_Document.repository.DocumentRepository;
import com.DocumentService.Backend_Document.FileModule.CreateFileName;
import com.DocumentService.Backend_Document.FileModule.FileStreamHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class DocumentServiceImpl implements DocumentService{


    @Autowired
    public DocumentRepository documentRepository;
    @Override
    public UploadResponse uploadDocument(NodeDocument nodeDocument) {
        NodeDocument nd = documentRepository.save(nodeDocument);
        UploadResponse response = new UploadResponse();
        String fileString = nodeDocument.getFileString();
        String Location = "C:/local_folder/" + CreateFileName.createName(nodeDocument);
        FileStreamHandler.createAndWriteToFile(fileString,Location);
        response.setStatus(1);
        response.setMessage("Document Uploaded Succesfully");
        response.setUuid(nd.getUuid());
        return response;
    }

    @Override
    public GetDocument getDocument(Long uuid) {
        return null;
    }
}

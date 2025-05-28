package com.DocumentService.Backend_Document.Controller;

import com.Document.Backend_Document.Entity.NodeDocument;
import com.Document.Backend_Document.Pojo.UploadResponse;
import com.DocumentService.Backend_Document.Services.Impl.DocumentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/DocumentService")
public class DocumentController {

    @Autowired
    public DocumentServiceImpl documentService;

    @PostMapping("/uploadDocument")
    public ResponseEntity<?> uploadDocument(@RequestBody NodeDocument nodeDocument){
        UploadResponse response = new UploadResponse();
        response = documentService.uploadDocument(nodeDocument);
        return ResponseEntity.ok(response);
    }

}

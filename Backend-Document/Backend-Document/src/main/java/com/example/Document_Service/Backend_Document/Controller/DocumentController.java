package com.example.Document_Service.Backend_Document.Controller;
import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import com.example.Document_Service.Backend_Document.Pojo.GetDocument;
import com.example.Document_Service.Backend_Document.Pojo.UploadResponse;
import com.example.Document_Service.Backend_Document.Services.Impl.DocumentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/getDocumentContent/{id}")
    public ResponseEntity<GetDocument> getDocumentContent(@PathVariable Long id){
        GetDocument response = new GetDocument();
        response = documentService.getDocumentContent(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getDocument/{parentId}")
    public ResponseEntity<List<NodeDocument>> getDocument(@PathVariable Long parentId){
        List <NodeDocument> response = documentService.getDocument(parentId);
        return ResponseEntity.ok(response);
    }

}

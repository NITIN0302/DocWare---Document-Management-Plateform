package com.example.Document_Service.Backend_Document.Controller;

import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import com.example.Document_Service.Backend_Document.Pojo.GetDocument;
import com.example.Document_Service.Backend_Document.Pojo.ResultResponse;
import com.example.Document_Service.Backend_Document.Pojo.UploadResponse;
import com.example.Document_Service.Backend_Document.Services.GetUser;
import com.example.Document_Service.Backend_Document.Services.Impl.DocumentServiceImpl;
import com.example.Document_Service.Backend_Document.Services.ValidateUser;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/DocumentService")
public class DocumentController {

    @Autowired
    public DocumentServiceImpl documentService;

    @Autowired
    public ValidateUser validateUser;

    @Autowired
    public GetUser getUser;


    public DocumentController(DocumentServiceImpl documentService, ValidateUser validateUser) {
        this.documentService = documentService;
        this.validateUser = validateUser;
    }

    @PostMapping("/uploadDocument")
    public ResponseEntity<?> uploadDocument(HttpServletRequest request, @RequestBody NodeDocument nodeDocument) {
        UploadResponse response = new UploadResponse();
        String token = request.getHeader("Authorization");
        ResultResponse responseResult = validateUser.validateToken(token).getBody();
        if (responseResult.getStatus().equalsIgnoreCase("1")) {
            response = documentService.uploadDocument(nodeDocument);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.ok(responseResult);
        }
    }

    @GetMapping("/getDocumentContent/{id}")
    public ResponseEntity<?> getDocumentContent(HttpServletRequest request, @PathVariable Long id) {
        GetDocument response = new GetDocument();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        ResultResponse responseResult = validateUser.validateToken(token).getBody();
        if (responseResult.getStatus().equalsIgnoreCase("1")) {
            response = documentService.getDocumentContent(username,id);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.ok(responseResult);
        }
    }

    @GetMapping("/getDocument/{parentId}")
    public ResponseEntity<?> getDocument(HttpServletRequest request, @PathVariable Long parentId) {
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        ResultResponse responseResult = validateUser.validateToken(token).getBody();
        if (responseResult.getStatus().equalsIgnoreCase("1")) {
            List<NodeDocument> response = documentService.getDocument(username,parentId);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.ok(responseResult);
        }
    }

    @GetMapping("/getDocumentByName/{docname}")
    public ResponseEntity<?> getDocumentByName(HttpServletRequest request,@PathVariable String docname){
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        ResultResponse responseResult = validateUser.validateToken(token).getBody();
        if (responseResult.getStatus().equalsIgnoreCase("1")) {
            List<NodeDocument> response = documentService.getDocumentByName(username,docname);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.ok(responseResult);
        }
    }

    @GetMapping("/getDocumetnById/{uuid}")
    public ResponseEntity<?> getDocumentByUuid(HttpServletRequest request,@PathVariable Long uuid){
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        ResultResponse responseResult = validateUser.validateToken(token).getBody();
        if (responseResult.getStatus().equalsIgnoreCase("1")) {
            List<NodeDocument> response = documentService.getDocumentByUuid(username,uuid);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.ok(responseResult);
        }
    }

}

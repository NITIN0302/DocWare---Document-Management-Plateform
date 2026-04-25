package com.example.Document_Service.Backend_Document.Controller;

import com.example.Document_Service.Backend_Document.Entity.MetaData;
import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import com.example.Document_Service.Backend_Document.Entity.RecycledDocument;
import com.example.Document_Service.Backend_Document.Pojo.*;
import com.example.Document_Service.Backend_Document.Services.GetUser;
import com.example.Document_Service.Backend_Document.Services.Impl.DocumentServiceImpl;
import com.example.Document_Service.Backend_Document.Services.Impl.RecycleServiceImpl;
import com.example.Document_Service.Backend_Document.Services.SaveMetaData;
import com.example.Document_Service.Backend_Document.session.JwtUtils;
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
    public GetUser getUser;

    @Autowired
    public RecycleServiceImpl recycleService;

    @Autowired
    public JwtUtils jwtUtils;


    public DocumentController(DocumentServiceImpl documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/uploadDocument")
    public ResponseEntity<?> uploadDocument(HttpServletRequest request, @RequestBody NodeDocument nodeDocument) throws Exception {
        UploadResponse response = new UploadResponse();
        String token = request.getHeader("Authorization");
        boolean isValid = jwtUtils.validateJwtToken(token);
        if (isValid) {
            response = documentService.uploadDocument(nodeDocument);
            return ResponseEntity.ok(response);
        } else {
            response.setStatus(0);
            response.setMessage("USER SESSION EXPIRED");
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getDocumentContent/{id}")
    public ResponseEntity<?> getDocumentContent(HttpServletRequest request, @PathVariable Long id) throws Exception {
        GetDocument response = new GetDocument();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean isValid = jwtUtils.validateJwtToken(token);
        if (isValid) {
            response = documentService.getDocumentContent(username,id);
        } else {
            response.setStatus(0);
            response.setMessage("USER SESSION EXPIRED");
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getDocument/{parentId}")
    public ResponseEntity<?> getDocument(HttpServletRequest request, @PathVariable Long parentId) throws Exception {
        GetDocument respons = new GetDocument();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean isValid = jwtUtils.validateJwtToken(token);
        if (isValid) {
            List<NodeDocument> response = documentService.getDocument(username,parentId);
            return ResponseEntity.ok(response);
        } else {
            respons.setStatus(0);
            respons.setMessage("USER SESSION EXPIRED");
        }
        return ResponseEntity.ok(respons);
    }

    @GetMapping("/getDocumentByName/{docname}")
    public ResponseEntity<?> getDocumentByName(HttpServletRequest request,@PathVariable String docname) throws Exception {
        ResultResponse resResponse = new ResultResponse();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean isValid = jwtUtils.validateJwtToken(token);
        if (isValid) {
            List<NodeDocument> response = documentService.getDocumentByName(username,docname);
            return ResponseEntity.ok(response);
        } else {
            resResponse.setStatus("0");
            resResponse.setMessage("USER SESSION EXPIRED");

        }
        return ResponseEntity.ok(resResponse);
    }

    @GetMapping("/getDocumentById/{uuid}")
    public ResponseEntity<?> getDocumentByUuid(HttpServletRequest request,@PathVariable Long uuid) throws Exception {
        GetDocument resp = new GetDocument();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean isValid = jwtUtils.validateJwtToken(token);
        if (isValid) {
            List<NodeDocument> response = documentService.getDocumentByUuid(username,uuid);
            return ResponseEntity.ok(response);
        } else {
            resp.setStatus(0);
            resp.setMessage("USER SESSION EXPIRED");
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/deleteDocumentById/{uuid}")
    public ResponseEntity<?> deleteDocumentByUuid(HttpServletRequest request,@PathVariable Long uuid) throws Exception {
        ResultResponse resp = new ResultResponse();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean isValid = jwtUtils.validateJwtToken(token.substring(7));
        if (isValid) {
            DeleteDocument response = documentService.deleteDocumentByUuid(username,uuid).getBody();
            return ResponseEntity.ok(response);
        } else {
            resp.setStatus("0");
            resp.setMessage("USER SESSION EXPIRED");
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/getAllRecycledDocument")
    public ResponseEntity<?> getAllRecycleDocument(HttpServletRequest request) throws Exception {
        ResultResponse resp = new ResultResponse();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean isValid = jwtUtils.validateJwtToken(token.substring(7));
        if (isValid) {
            List<RecycledDocument> response = recycleService.getAllDeletedDocument(username);
            return ResponseEntity.ok(response);
        } else {
            resp.setStatus("0");
            resp.setMessage("USER SESSION EXPIRED");
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/recycleDocument/{uuid}")
    public ResponseEntity<?> recycleDocument(HttpServletRequest request,@PathVariable Long uuid) throws Exception {
        ResultResponse resp = new ResultResponse();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean isValid = jwtUtils.validateJwtToken(token.substring(7));
        if (isValid) {
            DeleteDocument response = recycleService.recycleDocument(username,uuid);
            return ResponseEntity.ok(response);
        } else {
            resp.setStatus("0");
            resp.setMessage("USER SESSION EXPIRED");
        }
        return ResponseEntity.ok(resp);
    }

}

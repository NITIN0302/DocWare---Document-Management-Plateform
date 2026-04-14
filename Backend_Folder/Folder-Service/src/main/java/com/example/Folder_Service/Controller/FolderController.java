package com.example.Folder_Service.Controller;

import com.example.Folder_Service.Entity.NodeFolder;
import com.example.Folder_Service.Pojo.CreateFolder;
import com.example.Folder_Service.Pojo.FolderInfo;
import com.example.Folder_Service.Pojo.Response;
import com.example.Folder_Service.Pojo.ResultResponse;
import com.example.Folder_Service.Services.FolderService;
import com.example.Folder_Service.Services.GetUser;
import com.example.Folder_Service.Services.ValidateUser;
import com.example.Folder_Service.Services.impl.FolderServiceImpl;
import com.example.Folder_Service.Session.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/FolderService")
public class FolderController {

    @Autowired
    public final FolderServiceImpl folderService;
    public final ValidateUser validateUser;
    @Autowired
    private GetUser getUser;
    private JwtUtils jwtUtils;

    public FolderController(FolderServiceImpl folderService, ValidateUser validateUser, JwtUtils jwtUtils) {
        this.folderService = folderService;
        this.validateUser = validateUser;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/getFolderByName/{name}")
    public ResponseEntity<?> getFolderByName(HttpServletRequest request, @PathVariable String name) {
        ResultResponse resultResponse = new ResultResponse();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean validToken = jwtUtils.validateJwtToken(token);
        if (validToken) {
            List<NodeFolder> folders = folderService.getFolderByName(username, name);
            return ResponseEntity.ok(folders);
        } else {
            resultResponse.setStatus("0");
            resultResponse.setMessage("USER SESSION EXPIRED");
        }
        return ResponseEntity.ok(resultResponse);
    }

    @PostMapping("/createFolder")
    public ResponseEntity<?> createFolder(HttpServletRequest request, @RequestBody NodeFolder nodeFolder) {
        CreateFolder response;
        ResultResponse resultResponse = new ResultResponse();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean validToken = jwtUtils.validateJwtToken(token);
        if (validToken) {
            List<NodeFolder> folders = folderService.getFolderByName(username, nodeFolder.getName());
            if (!folders.isEmpty()) {
                response = new CreateFolder(0, "Folder Already Exists", "", folders);
                return ResponseEntity.ok(response);
            }
            NodeFolder newFolder = folderService.createFolder(nodeFolder);
            FolderInfo fm = new FolderInfo(1, newFolder.getUuid());
            response = new CreateFolder(1, "Folder Created Successfully", "", fm);
            return ResponseEntity.ok(response);
        } else {
            resultResponse.setStatus("0");
            resultResponse.setMessage("USER SESSION EXPIRED");
        }
        return ResponseEntity.ok(resultResponse);
    }

    @GetMapping("/getFolder/{parentId}")
    public ResponseEntity<?> getFolder(HttpServletRequest request, @PathVariable int parentId) {
        ResultResponse resultResponse = new ResultResponse();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean validToken = jwtUtils.validateJwtToken(token);
        if (validToken) {
            List<NodeFolder> folders = folderService.getFolder(username, parentId);
            return ResponseEntity.ok(folders);
        } else {
            resultResponse.setStatus("0");
            resultResponse.setMessage("USER SESSION EXPIRED");
        }
        return ResponseEntity.ok(resultResponse);
    }

    @PostMapping("/getFolderById/{id}")
    public ResponseEntity<?> getFolderById(HttpServletRequest request, @PathVariable int id) {
        ResultResponse resultResponse = new ResultResponse();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean validToken = jwtUtils.validateJwtToken(token);
        Optional<NodeFolder> folder;
        if (validToken) {
            folder = folderService.getFolderById(username, id);
        } else {
            resultResponse.setStatus("0");
            resultResponse.setMessage("USER SESSION EXPIRED");
            return ResponseEntity.ok(resultResponse);
        }
        return folder.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null));
    }

    @PostMapping("/freezeFolder/{id}")
    public ResponseEntity<?> freezeFolderById(HttpServletRequest request, @PathVariable int id) {
        Response resultset = new Response();
        ResultResponse resultResponse = new ResultResponse();
        String token = request.getHeader("Authorization");
        String username = getUser.getUserByJwtToken(token);
        boolean validToken = jwtUtils.validateJwtToken(token);
        if (validToken) {
            Optional<NodeFolder> folder = folderService.getFolderById(username, id);
            int freezeStatus = folder.get().getFreeze();
            folder.get().setFreeze(freezeStatus == 1 ? 0 : 1);
            folderService.freezeFolder(folder.get());
            if (freezeStatus == 1) {
                resultset = new Response(1, "Folder is UnFreezed", "");
            } else {
                resultset = new Response(1, "Folder is Freezed", "");
            }
        } else {
            resultResponse.setStatus("0");
            resultResponse.setMessage("USER SESSION EXPIRED");
            return ResponseEntity.ok(resultResponse);
        }

        return ResponseEntity.ok(resultset);
    }

    @GetMapping("/isfreezeFolder/{id}")
    public ResponseEntity<?> isFolderFreeze(@PathVariable int id) {
        CreateFolder response;
        boolean isFreeze = folderService.isFolderFreeze(id);
        if (isFreeze) {
            response = new CreateFolder(1, "Parent Folder is Freeze", "");
        } else {
            response = new CreateFolder(0, "Parent Folder is Not Freeze", "");
        }

        return ResponseEntity.ok(response);
    }
}

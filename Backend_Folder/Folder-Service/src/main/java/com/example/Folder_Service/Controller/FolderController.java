package com.example.Folder_Service.Controller;

import com.example.Folder_Service.Entity.NodeFolder;
import com.example.Folder_Service.Pojo.CreateFolder;
import com.example.Folder_Service.Pojo.FolderInfo;
import com.example.Folder_Service.Pojo.Response;
import com.example.Folder_Service.Pojo.ResultResponse;
import com.example.Folder_Service.Services.FolderService;
import com.example.Folder_Service.Services.ValidateUser;
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
    public final FolderService folderService;
    public final ValidateUser validateUser;

    public FolderController(FolderService folderService, ValidateUser validateUser) {
        this.folderService = folderService;
        this.validateUser = validateUser;
    }

    @PostMapping("/getFolderByName/{name}")
    public ResponseEntity<?> getFolderByName(HttpServletRequest request, @PathVariable String name) {
        String token = request.getHeader("Authorization");
        ResultResponse response = validateUser.validateToken(token).getBody();
        if (response.getStatus().equalsIgnoreCase("1")) {
            List<NodeFolder> folders = folderService.findByName(name);
            return ResponseEntity.ok(folders);
        }
        else{
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/createFolder")
    public ResponseEntity<?> createFolder(HttpServletRequest request, @RequestBody NodeFolder nodeFolder) {
        CreateFolder response;
        String token = request.getHeader("Authorization");
        ResultResponse responseResult = validateUser.validateToken(token).getBody();
        if (responseResult.getStatus().equalsIgnoreCase("1")) {
            List<NodeFolder> folders = folderService.findByName(nodeFolder.getName());
            if (!folders.isEmpty()) {
                response = new CreateFolder(0, "Folder Already Exists", "", folders);
                return ResponseEntity.ok(response);
            }
            NodeFolder newFolder = folderService.save(nodeFolder);
            FolderInfo fm = new FolderInfo(1, newFolder.getUuid());
            response = new CreateFolder(1, "Folder Created Successfully", "", fm);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.ok(responseResult);
        }
    }

    @GetMapping("/getFolder/{parentId}")
    public ResponseEntity<?> getFolder(HttpServletRequest request, @PathVariable int parentId) {
        String token = request.getHeader("Authorization");
        ResultResponse response = validateUser.validateToken(token).getBody();
        if (response.getStatus().equalsIgnoreCase("1")) {
            List<NodeFolder> folders = folderService.findByParentId(parentId);
            return ResponseEntity.ok(folders);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/getFolderById/{id}")
    public ResponseEntity<?> getFolderById(HttpServletRequest request, @PathVariable int id) {
        String token = request.getHeader("Authorization");
        ResultResponse response = validateUser.validateToken(token).getBody();
        Optional<NodeFolder> folder;
        if (response.getStatus().equalsIgnoreCase("1")) {
            folder = folderService.findById(id);
        } else {
            return ResponseEntity.ok(response);
        }
        return folder.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null));
    }

    @PostMapping("/freezeFolder/{id}")
    public ResponseEntity<?> freezeFolderById(HttpServletRequest request, @PathVariable int id) {
        Response resultset = new Response();
        String token = request.getHeader("Authorization");
        ResultResponse response = validateUser.validateToken(token).getBody();
        if (response.getStatus().equalsIgnoreCase("1")) {
            Optional<NodeFolder> folder = folderService.findById(id);
            int freezeStatus = folder.get().getFreeze();
            folder.get().setFreeze(freezeStatus == 1 ? 0 : 1);
            folderService.save(folder.get());
            if (freezeStatus == 1) {
                resultset = new Response(1, "Folder is UnFreezed", "");
            } else {
                resultset = new Response(1, "Folder is Freezed", "");
            }
        } else {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(resultset);
    }

}

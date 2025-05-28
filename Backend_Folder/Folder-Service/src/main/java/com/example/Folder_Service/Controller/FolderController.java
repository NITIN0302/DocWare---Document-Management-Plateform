package com.example.Folder_Service.Controller;
import com.example.Folder_Service.Entity.NodeFolder;
import com.example.Folder_Service.Pojo.CreateFolder;
import com.example.Folder_Service.Pojo.FolderInfo;
import com.example.Folder_Service.Pojo.Response;
import com.example.Folder_Service.Services.FolderService;
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

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @PostMapping("/getFolderByName/{name}")
    public ResponseEntity<List<NodeFolder>> getFolderByName(@PathVariable String name) {
        List<NodeFolder> folders = folderService.findByName(name);
        return ResponseEntity.ok(folders);
    }

    @PostMapping("/createFolder")
    public ResponseEntity<?> createFolder(@RequestBody NodeFolder nodeFolder) {
        CreateFolder response;
        List<NodeFolder> folders = folderService.findByName(nodeFolder.getName());
        if (!folders.isEmpty()) {
            response = new CreateFolder(0, "Folder Already Exists", "", folders);
            return ResponseEntity.ok(response);
        }
        NodeFolder newFolder = folderService.save(nodeFolder);
        FolderInfo fm = new FolderInfo(1, newFolder.getUuid());
        response = new CreateFolder(1, "Folder Created Successfully", "", fm);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getFolder/{parentId}")
    public ResponseEntity<List<NodeFolder>> getFolder(@PathVariable int parentId) {
        List<NodeFolder> folders = folderService.findByParentId(parentId);
        return ResponseEntity.ok(folders);
    }

    @PostMapping("/getFolderById/{id}")
    public ResponseEntity<NodeFolder> getFolderById(@PathVariable int id) {
        Optional<NodeFolder> folder = folderService.findById(id);

        return folder.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null));
    }

    @PostMapping("/freezeFolder/{id}")
    public ResponseEntity<?> freezeFolderById(@PathVariable int id) {
        Response response;
        Optional<NodeFolder> folder = folderService.findById(id);
        int freezeStatus = folder.get().getFreeze();
        folder.get().setFreeze(freezeStatus == 1 ? 0 : 1);
        folderService.save(folder.get());
        if (freezeStatus == 1) {
            response = new Response(1, "Folder is UnFreezed", "");
        } else {
            response = new Response(1, "Folder is Freezed", "");
        }
        return ResponseEntity.ok(response);
    }

}

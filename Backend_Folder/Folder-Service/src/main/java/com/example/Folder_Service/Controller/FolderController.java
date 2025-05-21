package com.example.Folder_Service.Controller;
import com.example.Folder_Service.Entity.NodeFolder;
import com.example.Folder_Service.Services.FolderService;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.apache.bcel.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.events.Event;

import java.util.List;

@RestController
@RequestMapping("/FolderService")
public class FolderController {

    @Autowired
    public final FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @PostMapping("/createFolder")
    public ResponseEntity<?> createFolder(@RequestBody NodeFolder nodeFolder)
    {
        folderService.save(nodeFolder);
        return ResponseEntity.ok("Folder Created");
    }

    @GetMapping("/getFolder/{parentId}")
    public ResponseEntity<List<NodeFolder>> getFolder(@PathVariable int parentId) {
        List<NodeFolder> folders = folderService.findByParentId(parentId);
        return ResponseEntity.ok(folders);
    }

}

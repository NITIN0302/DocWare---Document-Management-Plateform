package com.example.Folder_Service.Services;
import com.example.Folder_Service.Entity.NodeFolder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FolderService extends JpaRepository<NodeFolder,Integer>
{
    List<NodeFolder> findByParentId(int parentId);
}

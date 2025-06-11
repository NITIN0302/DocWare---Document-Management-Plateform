package com.example.Folder_Service.Repository;
import com.example.Folder_Service.Entity.NodeFolder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FolderRepository extends JpaRepository<NodeFolder, Integer> {
    List<NodeFolder> findByName(String Name);

    List<NodeFolder> findByParentId(int parentId);
}

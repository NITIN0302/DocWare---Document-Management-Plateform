package com.example.Folder_Service.Entity;


import jakarta.persistence.*;

@Entity
@Table(name="SDM_FOLDER_METADATA_RIGHTS")
public class FolderMetaMap
{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    public int id;
    public int folderId;
    public int metaDataId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFolderId() {
        return folderId;
    }

    public void setFolderId(int folderId) {
        this.folderId = folderId;
    }

    public int getMetaDataId() {
        return metaDataId;
    }

    public void setMetaDataId(int metaDataId) {
        this.metaDataId = metaDataId;
    }
}

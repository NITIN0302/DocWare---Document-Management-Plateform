package com.EntitlementService.AccessRights.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="SDM_USER_META_RIGHTS",
uniqueConstraints = {
        @UniqueConstraint(columnNames = {"userId", "metadataId"})
})
public class MetaUserMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;
    private int metadataId;
    private String readRights;
    private String writeRights;
    private String deleteRights;
    private String uploadRights;
    private String downloadRights;

    public MetaUserMapping(int userId, int metadataId, String read, String write, String delete, String upload, String download) {
        this.userId = userId;
        this.metadataId = metadataId;
        this.readRights = read;
        this.writeRights = write;
        this.deleteRights = delete;
        this.uploadRights = upload;
        this.downloadRights = download;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMetadataId() {
        return metadataId;
    }

    public void setMetadataId(int metadataId) {
        this.metadataId = metadataId;
    }

    public String getReadRights() {
        return readRights;
    }

    public void setReadRights(String readRights) {
        this.readRights = readRights;
    }

    public String getWriteRights() {
        return writeRights;
    }

    public void setWriteRights(String writeRights) {
        this.writeRights = writeRights;
    }

    public String getDeleteRights() {
        return deleteRights;
    }

    public void setDeleteRights(String deleteRights) {
        this.deleteRights = deleteRights;
    }

    public String getUploadRights() {
        return uploadRights;
    }

    public void setUploadRights(String uploadRights) {
        this.uploadRights = uploadRights;
    }

    public String getDownloadRights() {
        return downloadRights;
    }

    public void setDownloadRights(String downloadRights) {
        this.downloadRights = downloadRights;
    }
}

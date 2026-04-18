package com.EntitlementService.AccessRights.Entity;

import jakarta.persistence.*;
import org.springframework.data.jpa.repository.Meta;

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
    @ManyToOne
    @JoinColumn(name = "metadataId", referencedColumnName = "id")
    private MetaData metaData;
    private String readRights;
    private String deleteRights;
    private String uploadRights;
    private String downloadRights;

    public MetaUserMapping() {}
    public MetaUserMapping(int userId, MetaData metadata, String read, String delete, String upload, String download) {
        this.userId = userId;
        this.readRights = read;
        this.metaData = metadata;
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

    public String getReadRights() {
        return readRights;
    }

    public void setReadRights(String readRights) {
        this.readRights = readRights;
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

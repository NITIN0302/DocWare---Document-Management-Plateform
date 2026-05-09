package com.EntitlementService.AccessRights.Pojo;

import com.EntitlementService.AccessRights.Entity.MetaData;
import jakarta.persistence.*;

public class AccessRight {
    private String userName;
    private String metadataId;
    private String readRights;
    private String deleteRights;
    private String uploadRights;
    private String downloadRights;

    public AccessRight(){

    }

    public AccessRight(String userName, String metadataId, String readRights, String deleteRights, String uploadRights, String downloadRights) {
        this.userName = userName;
        this.metadataId = metadataId;
        this.readRights = readRights;
        this.deleteRights = deleteRights;
        this.uploadRights = uploadRights;
        this.downloadRights = downloadRights;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMetadataId() {
        return metadataId;
    }

    public void setMetadataId(String metadataId) {
        this.metadataId = metadataId;
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

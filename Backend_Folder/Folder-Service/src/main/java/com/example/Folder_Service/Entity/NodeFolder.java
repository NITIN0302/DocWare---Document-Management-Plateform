package com.example.Folder_Service.Entity;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;

@Entity
@Table(name = "SDM_NODE_FOLDER")
public class NodeFolder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int uuid;
    public String name;
    public int parentId;
    public String createdBy;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    public int freeze;
    @Transient
    private List<String> roles;

    public List<String> getRoles() {
        return roles;
    }
    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
    
    @PrePersist
    protected void onCreate() {
        createdDate = new Date();
    }

    public int getUuid() {
        return uuid;
    }

    public void setUuid(int uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public int getFreeze() {
        return freeze;
    }

    public void setFreeze(int freeze) {
        this.freeze = freeze;
    }

}

package com.example.Document_Service.Backend_Document.Entity;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "SDM_NODE_DOCUMENT")
public class NodeDocument
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long uuid;
    public String name;
    public int parentId;
    public String ext;
    public String createdBy;
    @Temporal(TemporalType.TIMESTAMP)
    public Date createdDate;
    public String nbs_uuid;
    @Transient
    public String fileString;
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
    public String getName() {
        return name;
    }

    public String getExt() { return ext; }

    public void setExt(String ext) { this.ext = ext; }

    public void setName(String name) {
        this.name = name;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentid) {
        this.parentId = parentid;
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

    public String getNbs_uuid() {
        return nbs_uuid;
    }

    public void setNbs_uuid(String nbs_uuid) {
        this.nbs_uuid = nbs_uuid;
    }

    public String getFileString() {
        return fileString;
    }

    public void setFileString(String fileString) {
        this.fileString = fileString;
    }

    public Long getUuid() {
        return uuid;
    }

    public void setUuid(Long uuid) {
        this.uuid = uuid;
    }



}

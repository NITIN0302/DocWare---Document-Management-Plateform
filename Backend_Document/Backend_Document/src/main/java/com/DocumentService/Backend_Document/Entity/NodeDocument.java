package com.Document.Backend_Document.Entity;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "SDM_NODE_DOCUMENT")
public class NodeDocument
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long uuid;
    public String name;
    public int parentId;
    public String createdBy;
    @Temporal(TemporalType.TIMESTAMP)
    public Date createdDate;
    public String nbs_uuid;
    @Transient
    public String fileString;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getParentid() {
        return parentId;
    }

    public void setParentid(int parentid) {
        this.parentId = parentid;
    }

    public String getCreatedby() {
        return createdBy;
    }

    public void setCreatedby(String createdby) {
        this.createdBy = createdby;
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

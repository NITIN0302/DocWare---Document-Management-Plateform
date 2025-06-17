package com.example.Document_Service.Backend_Document.Entity;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "SDM_NODE_RECYCLED")
public class RecycledDocument
{
    @Id
    public Long uuid;
    public String name;
    public int parentId;
    public String ext;
    public String createdBy;
    public Date createdDate;
    public String nbs_uuid;

    public Long getUuid() {
        return uuid;
    }

    public void setUuid(Long uuid) {
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

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
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


}

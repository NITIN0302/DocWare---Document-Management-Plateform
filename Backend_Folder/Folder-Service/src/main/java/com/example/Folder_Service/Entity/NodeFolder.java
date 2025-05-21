package com.example.Folder_Service.Entity;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "SDM_NODE_FOLDER")
public class NodeFolder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int uuid;
    public String Name;
    public int parentId;
    public String createdBy;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    public int freeze;

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
        return Name;
    }

    public void setName(String name) {
        Name = name;
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

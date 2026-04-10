package com.EntitlementService.AccessRights.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "SDM_METADATA")
public class MetaData {
    @Id
    private int id;
    private String name;
    private Date createdDate;
    @Transient
    List<MetaProperties> metaData;
    public MetaData(){}
    public MetaData(String name,Date createdDate){
        this.name = name;
        this.createdDate = createdDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public List<MetaProperties> getMetaData() {
        return metaData;
    }

    public void setMetaDate(List<MetaProperties> metaData) {
        this.metaData = metaData;
    }
}

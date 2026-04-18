package com.example.Folder_Service.Entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

public class MetaData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true, nullable = false)
    private String name;
    private Date createdDate;
    @Transient
    List<MetaProperties> metaDataProp;
    @Transient
    private String docid;


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

    public List<MetaProperties> getMetaDataProp() {
        return metaDataProp;
    }

    public void setMetaDateProp(List<MetaProperties> metaData) {
        this.metaDataProp = metaData;
    }

    public String getDocid() {
        return docid;
    }
    public void setDocid(String docid) {
        this.docid = docid;
    }
}


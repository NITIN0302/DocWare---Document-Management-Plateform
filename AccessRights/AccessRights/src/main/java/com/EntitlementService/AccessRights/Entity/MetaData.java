package com.EntitlementService.AccessRights.Entity;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "SDM_METADATA")
public class MetaData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true, nullable = false)
    private String name;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    @Transient
    List<MetaProperties> metaDataProp;
    @Transient
    private String docid;
    @OneToMany(mappedBy = "metaData")
    private List<MetaUserMapping> userMappings;



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

    @PrePersist
    public void setCreatedDate() {
        this.createdDate = new Date();
    }

    public List<MetaProperties> getMetaDataProp() {
        return metaDataProp;
    }

    public void setMetaDataProp(List<MetaProperties> metaDataProp) {
        this.metaDataProp = metaDataProp;
    }

    public String getDocid() {
        return docid;
    }
    public void setDocid(String docid) {
        this.docid = docid;
    }
}

package com.example.Document_Service.Backend_Document.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="SDM_DOCUMENT_METADATA_RIGHTS")
public class DocMetaMap {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    public int id;
    public long docId;
    public int metaDataId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getDocId() {
        return docId;
    }

    public void setDocId(long docId) {
        this.docId = docId;
    }

    public int getMetaDataId() {
        return metaDataId;
    }

    public void setMetaDataId(int metaDataId) {
        this.metaDataId = metaDataId;
    }
}

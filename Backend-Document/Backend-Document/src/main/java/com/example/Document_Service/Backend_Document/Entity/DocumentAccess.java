package com.example.Document_Service.Backend_Document.Entity;
import jakarta.persistence.*;

@Entity
@Table(name="SDM_DOCUMENT_ACCESS_RIGHTS")
public class DocumentAccess
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Long uuid;
    private String role;

    public Long getUuid() {
        return uuid;
    }

    public void setUuid(Long uuid) {
        this.uuid = uuid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

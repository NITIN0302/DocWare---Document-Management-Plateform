package com.example.Folder_Service.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "SDM_ACCESS_RIGHTS")
public class FolderAccess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int uuid;
    private String role;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUuid() {
        return uuid;
    }

    public void setUuid(int uuid) {
        this.uuid = uuid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

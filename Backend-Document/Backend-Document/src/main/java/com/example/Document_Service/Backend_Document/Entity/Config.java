package com.example.Document_Service.Backend_Document.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sdm_volumn")
public class Config {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String volumn;

    public String getVolumn() {
        return volumn;
    }

    public void setVolumn(String volumn) {
        this.volumn = volumn;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // Getters and Setters
}


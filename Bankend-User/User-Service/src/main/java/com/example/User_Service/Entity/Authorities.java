package com.example.User_Service.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Authorities {
    @Id
    public String username;
    public String authority;

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }




    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}

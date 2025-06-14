package com.example.User_Service.Repository;

import com.example.User_Service.Entity.Authorities;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<Authorities,String> {
    public List<Authorities> findByUsername(String username);

}

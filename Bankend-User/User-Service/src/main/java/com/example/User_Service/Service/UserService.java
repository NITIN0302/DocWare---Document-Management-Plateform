package com.example.User_Service.Service;

import com.example.User_Service.Entity.UserInfo;
import com.example.User_Service.Pojo.UserDetailDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @PersistenceContext
    private EntityManager entityManager;

    public List<String> getAllUsers(){
        String query = "SELECT USERNAME FROM USERS WHERE ENABLED=?";
        List<String> users = entityManager
                .createNativeQuery(query.toString())
                .setParameter(1, 1)
                .getResultList();
        return users;
    }

}

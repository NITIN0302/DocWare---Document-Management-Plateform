package com.EntitlementService.AccessRights.DbUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class InsertUtils {

    public static Query createInsertQuery(EntityManager entityManager,String tableName,HashMap<String,String> paramMap){
        StringBuilder query = new StringBuilder();
        List<Object> values = new ArrayList<>();
        query.append("INSERT INTO ").append(tableName).append(" (");
        for(HashMap.Entry<String,String> entry:paramMap.entrySet()){
            query.append(entry.getKey()).append(",");
        }
        query.deleteCharAt(query.length()-1).append(") VALUES (");
        for(HashMap.Entry<String,String> entry:paramMap.entrySet()){
            query.append("?,");
            values.add(entry.getValue());
        }
        query.deleteCharAt(query.length()-1).append(")");
        Query nativeQuery = entityManager.createNativeQuery(query.toString());
        for (int i = 0; i < values.size(); i++) {
            nativeQuery.setParameter(i + 1, values.get(i));
        }
        System.out.println("nativeQuery:"+nativeQuery);
        return nativeQuery;
    }
}

package com.EntitlementService.AccessRights.Service.Impl;

import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaProperties;
import com.EntitlementService.AccessRights.Service.DynamicCreation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DynamicCreationImpl implements DynamicCreation {
    @PersistenceContext
    public EntityManager entityManager;

    private StringBuilder createQueryForMetadata(MetaData metaData) {
        StringBuilder query = new StringBuilder();
        query.append("CREATE TABLE ");
        query.append(metaData.getName() + "(RecordId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ");
        query.append("DocId INT NOT NULL, ");
        for(MetaProperties prop:metaData.getMetaDataProp()){
            query.append(prop.getPropName() + " ");
            if(prop.getType().equalsIgnoreCase("INT")){
                query.append("INT, ");
            }
            else if(prop.getType().equalsIgnoreCase("STRING")){
                query.append("NVARCHAR("+prop.getSize()+"), ");
            }
            else if(prop.getType().equalsIgnoreCase("DATE")){
                query.append("DATETIME("+prop.getSize()+"), ");
            }
        }
        query.deleteCharAt(query.length()-2).append(")");
        return query;
    }

    @Override
    @Transactional
    public boolean createMetadataTable(MetaData metaData) {
        boolean result = false;
        try {
            StringBuilder query = createQueryForMetadata(metaData);
            System.out.println("Query to Create Table:" + query.toString());
            entityManager.createNativeQuery(query.toString()).executeUpdate();
            result = true;
        }catch(Exception ex){
            ex.printStackTrace();
        }finally{
            return result;
        }
    }

    private String validate(String input) {
        return input.replaceAll("[^a-zA-Z0-9_]", "");
    }

    public Query insertMetadataDocInfo(MetaData metaData) {

        StringBuilder query = new StringBuilder();
        List<Object> values = new ArrayList<>();
        String tableName = validate(metaData.getName());
        query.append("INSERT INTO ").append(tableName).append(" (");
        for (MetaProperties prop : metaData.getMetaDataProp()) {
            String colName = validate(prop.getPropName());
            query.append(colName).append(", ");
        }
        query.append("docid) VALUES (");
        for (MetaProperties prop : metaData.getMetaDataProp()) {
            query.append("?, ");
            values.add(prop.getPropValue());
        }
        query.append("?)");
        values.add(metaData.getDocid());
        int lastCommaIndex = query.lastIndexOf(", ");
        query.delete(lastCommaIndex, lastCommaIndex + 2);
        Query nativeQuery = entityManager.createNativeQuery(query.toString());
        for (int i = 0; i < values.size(); i++) {
            nativeQuery.setParameter(i + 1, values.get(i));
        }

        return nativeQuery;
    }

    @Override
    @Transactional
    public boolean saveMetadataDoc(MetaData metaData) {
        boolean result = false;
        try{
            Query query = insertMetadataDocInfo(metaData);
            System.out.println("Query to Save DocMetadata:" + query.toString());
            query.executeUpdate();
            result = true;
        }catch(Exception ex){
            ex.printStackTrace();
        }finally{
            return result;
        }
    }


}

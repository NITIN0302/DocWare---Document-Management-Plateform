package com.EntitlementService.AccessRights.Service.Impl;

import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaProperties;
import com.EntitlementService.AccessRights.Service.DynamicCreation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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


}

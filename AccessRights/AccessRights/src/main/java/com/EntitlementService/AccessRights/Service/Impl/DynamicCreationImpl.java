package com.EntitlementService.AccessRights.Service.Impl;

import com.EntitlementService.AccessRights.DbUtils.InsertUtils;
import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaProperties;
import com.EntitlementService.AccessRights.Entity.MetaUserMapping;
import com.EntitlementService.AccessRights.Service.DynamicCreation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.servlet.Registration;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
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
            entityManager.createNativeQuery(query.toString()).executeUpdate();
            result = true;
        }catch(Exception ex){
            ex.printStackTrace();
        }finally{
            return result;
        }
    }

    @Override
    @Transactional
    public boolean saveMetadataDoc(MetaData metaData) {
        boolean result = false;
        try{
            HashMap<String,String> paramMap = new HashMap<>();
            String tableName = metaData.getName();
            paramMap.put("docid",metaData.getDocid());
            for(MetaProperties prop:metaData.getMetaDataProp()){
                paramMap.put(prop.getPropName(),prop.getPropValue());
            }
            Query query = InsertUtils.createInsertQuery(entityManager,tableName,paramMap);
            query.executeUpdate();
            result = true;
        }catch(Exception ex){
            ex.printStackTrace();
        }finally{
            return result;
        }
    }

    @Override
    @Transactional
    public boolean saveMetaProp(List<MetaProperties> metaProps,int id){
        boolean result = false;
        try{
            for(MetaProperties prop:metaProps){
                StringBuilder query = new StringBuilder();
                query.append("INSERT INTO SDM_METADATA_PROPERTIES(METADATA_ID,PROP_NAME,SIZE,TYPE) VALUES (");
                query.append(id + ", ");
                query.append("'" + prop.getPropName() + "', ");
                query.append(prop.getSize() + ", ");
                query.append("'" + prop.getType() + "') ");
                entityManager.createNativeQuery(query.toString()).executeUpdate();
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }finally{
            return result;
        }
    }

    @Override
    @Transactional
    public List<MetaProperties> getAllProps(int id) {
        List<MetaProperties> metaDataList = new ArrayList<>();
        try{
            StringBuilder query = new StringBuilder();
            query.append("SELECT * FROM SDM_METADATA_PROPERTIES WHERE METADATA_ID = ?");
            metaDataList = entityManager
                    .createNativeQuery(query.toString(), MetaProperties.class)
                    .setParameter(1, id)
                    .getResultList();
        }catch(Exception ex){
            ex.printStackTrace();
        }finally{
            return metaDataList;
        }
    }

    @Override
    public boolean getAllMappedUser(int id,String username) {
        boolean result = false;
        try{
            StringBuilder query = new StringBuilder();
            query.append("SELECT USERNAME from SDM_USER_META_RIGHTS WHERE METADATA_ID = ? AND USERNAME = ?");
            result = entityManager
                    .createNativeQuery(query.toString(), MetaUserMapping.class)
                    .setParameter(1, id)
                    .setParameter(2, username)
                    .getResultList().size() > 0;

        }catch(Exception ex){
            ex.printStackTrace();
        }finally{
            return result;
        }
    }


}

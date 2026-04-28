package com.EntitlementService.AccessRights.Repository;
import com.EntitlementService.AccessRights.Entity.MetaData;
import com.EntitlementService.AccessRights.Entity.MetaUserMapping;
import com.EntitlementService.AccessRights.Pojo.MetaDataDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccessRepository extends JpaRepository<MetaData,Integer> {
    @Query("SELECT new com.EntitlementService.AccessRights.Pojo.MetaDataDTO(m.name,m.id) FROM MetaData m")
    public List<MetaDataDTO> getAllmetaData();

    @Query("SELECT m FROM MetaUserMapping m JOIN FETCH m.metaData where m.id=:id")
    List<MetaUserMapping> getAllWithMetadata(@Param("id")int id);

    public MetaData findByName(String name);
}

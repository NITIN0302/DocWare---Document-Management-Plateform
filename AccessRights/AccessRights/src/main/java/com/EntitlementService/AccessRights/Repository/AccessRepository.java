package com.EntitlementService.AccessRights.Repository;
import com.EntitlementService.AccessRights.Entity.MetaData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessRepository extends JpaRepository<MetaData,Integer> {

}

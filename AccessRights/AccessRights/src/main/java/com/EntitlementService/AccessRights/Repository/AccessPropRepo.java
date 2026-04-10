package com.EntitlementService.AccessRights.Repository;
import com.EntitlementService.AccessRights.Entity.MetaProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccessPropRepo extends JpaRepository<MetaProperties,Integer> {

}

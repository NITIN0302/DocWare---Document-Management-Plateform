package com.EntitlementService.AccessRights.Repository;
import com.EntitlementService.AccessRights.Entity.MetaUserMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MetaUserMap extends JpaRepository<MetaUserMapping,Integer> {
}

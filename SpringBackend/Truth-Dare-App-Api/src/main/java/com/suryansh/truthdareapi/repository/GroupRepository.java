package com.suryansh.truthdareapi.repository;

import com.suryansh.truthdareapi.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group,Long> {
    Optional<Group> findByName(String groupName);
    @Query(value = "SELECT * FROM public.group_tbl WHERE name ILIKE %:name% LIMIT 5", nativeQuery = true)
    List<Group> getForNavSearch(@Param("name") String name);
}

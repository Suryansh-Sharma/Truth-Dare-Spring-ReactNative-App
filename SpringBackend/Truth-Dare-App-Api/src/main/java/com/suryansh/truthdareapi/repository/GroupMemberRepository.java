package com.suryansh.truthdareapi.repository;

import com.suryansh.truthdareapi.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {
}
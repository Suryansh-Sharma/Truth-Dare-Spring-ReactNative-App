package com.suryansh.truthdareapi.service.impl;

import com.suryansh.truthdareapi.dto.GroupDto;
import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.UserDto;
import com.suryansh.truthdareapi.entity.Group;
import com.suryansh.truthdareapi.entity.GroupMember;
import com.suryansh.truthdareapi.entity.User;
import com.suryansh.truthdareapi.exception.TruthDareException;
import com.suryansh.truthdareapi.model.JoinGroupModel;
import com.suryansh.truthdareapi.repository.GroupMemberRepository;
import com.suryansh.truthdareapi.repository.GroupRepository;
import com.suryansh.truthdareapi.repository.UserRepository;
import com.suryansh.truthdareapi.service.GroupService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.ocpsoft.prettytime.PrettyTime;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Slf4j
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupMemberRepository groupMemberRepository;
    public GroupServiceImpl(GroupRepository groupRepository, UserRepository userRepository, GroupMemberRepository groupMemberRepository){
        this.groupRepository=groupRepository;
        this.userRepository = userRepository;
        this.groupMemberRepository = groupMemberRepository;
    }
    @Override
    @Transactional
    public void saveNewGroup(String groupName, String userEmail) {
        if (groupName.length()==0)
            throw new TruthDareException("Unable to save group :saveNewGroup");
        int randomNum = ThreadLocalRandom.current().nextInt(1000, 10000);
        Group group = new Group();
        group.setName(groupName);
        group.setCreatedOn(Instant.now());
        group.setCode(randomNum);
        try{
            groupRepository.save(group);
            log.info("Group Saved successfully of name : - "+groupName);
            addUserToNewGroup(groupName,userEmail);
        }catch (Exception e){
            log.info("Unable to save group",e);
            throw new TruthDareException("Unable to save group :saveNewGroup");
        }
    }
    public void addUserToNewGroup(String groupName,String userEmail){
        var group=groupRepository.findByName(groupName)
                .orElseThrow(()->new TruthDareException("Unable to find group of name "+groupName));
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(()->
                        new TruthDareException("Unable to find user "+userEmail+":addUserToNewGroup "));
        GroupMember groupMember = new GroupMember();
        groupMember.setGroup(group);
        groupMember.setUser(user);
        try{
            groupMemberRepository.save(groupMember);
            log.info("User {} is added to group {}",user.getUserAppName(),group.getName()+":addUserToNewGroup");
        }catch (Exception e){
            log.error("Unable to save user to group :addUserToNewGroup",e);
            throw new TruthDareException("Unable to add user "+user+":addUserToNewGroup ");
        }
    }

    @Override
    @Transactional
    public void addUserToGroup(JoinGroupModel model) {
        Group group = groupRepository.findById(model.getGroupId())
                .orElseThrow(()->
                        new TruthDareException("Unable to find Group "+model.getGroupId()+":addUserToGroup"));
        if (group.getCode()!= model.getCode())
            throw new TruthDareException("Group code is not matched you are not permitted to join group");
        for(GroupMember groupUser :group.getUsers()){
            if (groupUser.getUser().getEmail().equals(model.getUserEmail()))
                throw new TruthDareException("User is already present in this group");
        }
        User user = userRepository.findByEmail(model.getUserEmail())
                .orElseThrow(()->
                        new TruthDareException("Unable to find user "+model.getUserEmail()+":addUserToGroup "));
        GroupMember groupMember = new GroupMember();
        groupMember.setGroup(group);
        groupMember.setUser(user);
        try{
            groupMemberRepository.save(groupMember);
            log.info("User {} is added to group {}",user.getUserAppName(),group.getName());
        }catch (Exception e){
            log.error("Unable to save user to group ",e);
            throw new TruthDareException("Unable to add user "+model.getUserEmail()+":addUserToGroup ");
        }
    }

    @Override
    public List<UserDto> getAllUsers(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(()->new TruthDareException("Unable to find group of id "+groupId));
        return group.getUsers().stream()
                .map((val)-> new UserDto(val.getId(), val.getUser().getUserAppName()))
                .toList();
    }

    @Override
    public List<QuizDto> getAllQuizzes(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(()->new TruthDareException("Unable to find group of id "+groupId));
        return group.getQuizzes().stream()
                .map((val)->new QuizDto(val.getId(), val.getQuizName(), val.getCreatedDate()
                , val.getTotalMarks(), val.getShowResultToAll(),val.getCreatedBy()))
                .toList();
    }

    @Override
    @Transactional
    public GroupDto changeGroupCode(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(()->new TruthDareException("Unable to find group of id "+groupId));
        int randomNum = ThreadLocalRandom.current().nextInt(1000, 10000);
        group.setCode(randomNum);
        try{
            groupRepository.save(group);
            log.info("Group of id: {} code changed successfully",groupId);
        }catch (Exception e){
            log.info("Unable to change Group code of id : {}",groupId,e);
            throw new TruthDareException("Unable to change Group code :changeGroupCode");
        }
        PrettyTime prettyTime = new PrettyTime();
        return new GroupDto(group.getId(),group.getName(),
                prettyTime.format(group.getCreatedOn()), group.getCode());
    }

    @Override
    public GroupDto getGroupById(Long groupId) {
        var group = groupRepository.findById(groupId)
                .orElseThrow(()->new TruthDareException("Unable to find group of id "+groupId));
        PrettyTime prettyTime = new PrettyTime();
        return new GroupDto(group.getId(),group.getName(),
                prettyTime.format(group.getCreatedOn()), group.getCode());
    }

    @Override
    public List<GroupDto> getAllGroupsLike(String name) {
        var group = groupRepository.getForNavSearch(name);
        return group.stream()
                .map((val)->new GroupDto(val.getId(),val.getName(),
                       "", val.getCode()))
                .toList();
    }
}

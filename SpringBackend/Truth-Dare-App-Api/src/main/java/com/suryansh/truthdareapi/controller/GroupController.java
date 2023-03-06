package com.suryansh.truthdareapi.controller;

import com.suryansh.truthdareapi.dto.GroupDto;
import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.UserDto;
import com.suryansh.truthdareapi.model.JoinGroupModel;
import com.suryansh.truthdareapi.service.GroupService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/group")
@CrossOrigin("*")
public class GroupController {
    private final GroupService groupService;
    public GroupController(GroupService groupService){
        this.groupService=groupService;
    }
    @PostMapping("/addNewGroup/{groupName}/{userEmail}")
    public void addNewGroup(@PathVariable String groupName,@PathVariable String userEmail){
        groupService.saveNewGroup(groupName,userEmail);
    }
    @PostMapping("/joinGroup")
    public void addUserToGroup(@RequestBody @Valid JoinGroupModel model){
        groupService.addUserToGroup(model);
    }
    @GetMapping("/getUsers/{groupId}")
    public List<UserDto>getAllUserOfGroup(@PathVariable Long groupId){
        return groupService.getAllUsers(groupId);
    }
    @GetMapping("/getQuizzes/{groupId}")
    public List<QuizDto> getAllQuizzesOfGroup(@PathVariable Long groupId){
        return groupService.getAllQuizzes(groupId);
    }
    @PostMapping("/changeGroupCode/{groupId}")
    public GroupDto changeGroupCode(@PathVariable Long groupId){
        return groupService.changeGroupCode(groupId);
    }
    @GetMapping("/getById/{groupId}")
    public GroupDto getGroupBy(@PathVariable Long groupId){
        return groupService.getGroupById(groupId);
    }
    @GetMapping("/getForNavSearch/{name}")
    public List<GroupDto> getForNavSearch(@PathVariable String name){
        return groupService.getAllGroupsLike(name);
    }
}

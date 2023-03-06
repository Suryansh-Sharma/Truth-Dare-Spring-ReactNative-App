package com.suryansh.truthdareapi.service;

import com.suryansh.truthdareapi.dto.GroupDto;
import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.UserDto;
import com.suryansh.truthdareapi.model.JoinGroupModel;

import java.util.List;

public interface GroupService {
    void saveNewGroup(String groupName, String userEmail);

    void addUserToGroup(JoinGroupModel model);

    List<UserDto> getAllUsers(Long groupId);

    List<QuizDto> getAllQuizzes(Long groupId);

    GroupDto changeGroupCode(Long groupId);

    GroupDto getGroupById(Long groupId);

    List<GroupDto> getAllGroupsLike(String name);
}

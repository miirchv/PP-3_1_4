package ru.mii.springboot.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.mii.springboot.model.User;
import ru.mii.springboot.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/rest")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminRestController {

    private UserService userService;
    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/activeuser")
    public User getActiveUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        return user;
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable("id") long id) {
        return userService.getUserById(id);
    }

    @PostMapping()
    public User createUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }


    @PatchMapping("/{id}")
    public User updateUser(@RequestBody User user, @PathVariable("id") int id) {
        userService.updateUser(id, user);
        return user;
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return "{\"User" + id + "\": \"deleted\"}";
    }


}

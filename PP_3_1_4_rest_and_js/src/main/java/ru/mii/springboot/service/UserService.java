package ru.mii.springboot.service;

import ru.mii.springboot.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();

    Optional<User> getUserById(long id);

    void saveUser(User user);

    void updateUser(long id, User user);

    void deleteUser(long id);
}

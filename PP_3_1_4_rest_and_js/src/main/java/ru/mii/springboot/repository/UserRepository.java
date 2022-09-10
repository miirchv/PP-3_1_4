package ru.mii.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mii.springboot.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}

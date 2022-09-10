package ru.mii.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.mii.springboot.model.User;
import ru.mii.springboot.service.UserService;

@Controller
@RequestMapping("/")
public class UserController {

	private UserService userService;
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}


	@GetMapping("/user")
	public String user() {
		return "user";
	}


	// ДЛЯ РЕГИСТРАЦИИ ПЕРВОГО ПОЛЬЗОВАТЕЛЯ
	@GetMapping("/registration")
	public String newUser(@ModelAttribute("newuser") User user) {
		return "registration";
	}

	@PostMapping("/registration")
	public String createUser(@ModelAttribute("newuser") User user) {
		userService.saveUser(user);
		return "redirect:/login";
	}

}
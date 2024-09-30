package com.sudipdas.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class AppController {

    @GetMapping("/message")
    public String getMessage() {
        return "Hello from App1!";
    }
}

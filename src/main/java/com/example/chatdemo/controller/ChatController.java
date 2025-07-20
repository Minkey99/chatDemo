package com.example.chatdemo.controller;

import com.example.chatdemo.dto.ChatMessage;
import com.example.chatdemo.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
//@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/chat")
    public void enter() {
        chatService.enterRoom();
    }

    @MessageMapping("/abc")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        chatService.sendMessage(chatMessage);
    }
}

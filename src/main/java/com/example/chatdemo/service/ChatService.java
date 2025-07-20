package com.example.chatdemo.service;

import com.example.chatdemo.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {
    private final SimpMessagingTemplate simpMessagingTemplate;
    public void enterRoom() {

    }
    public void sendMessage(ChatMessage chatMessage) {
        log.info("{}",chatMessage);
        simpMessagingTemplate.convertAndSend("/pub", chatMessage);
    }
}

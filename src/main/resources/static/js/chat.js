// 1) SockJS로 WS 연결, STOMP 래핑
const socket = new SockJS('/ws-chat');       // WebSocketConfig#addEndpoint("/ws-chat")
const stompClient = Stomp.over(socket);

let userId = sessionStorage.getItem('chatUserId');
if (!userId) {
    userId = generateUUID();
    sessionStorage.setItem('chatUserId', userId);
}

// 2) 연결 및 구독
stompClient.connect({}, frame => {
    console.log('Connected:', frame);
    // 서버 @SendTo("/topic/abc") 로 브로드캐스트된 메시지 받기
    stompClient.subscribe('/pub', msg => {
        const payload = JSON.parse(msg.body);
        const history = document.getElementById('chatHistory');
        // 예: { username: "...", text: "..." }
        // 내 메시지인지 판별
        const cls = (payload.username === userId) ? 'self' : 'other';

        history.innerHTML += `
        <div class="chat-message ${cls}">
        <span class="user">${payload.username}</span>:
        <span class="text">${payload.text}</span>
        </div>
        `;
        history.scrollTop = history.scrollHeight;
    });
}, error => {
    console.error('STOMP error:', error);
});

// 3) 메시지 전송 함수
function sendMessage() {
    const input = document.querySelector('.chat-input');
    const text = input.value.trim();
    if (!text) return;

    // @MessageMapping("/abc") 로 매핑된 경로로 전송
    stompClient.send('/app/abc', {}, JSON.stringify({
        username: userId,   // 실제 로그인 사용자명으로 대체
        text: text
    }));
    input.value = '';
}

// 4) Form submit event handler (handles both click and Enter)
const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    sendMessage();
});

function generateUUID() {
    // RFC4122 version 4 compliant
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const voiceBtn = document.getElementById("voice-btn");
const toggleThemeBtn = document.getElementById("toggle-theme");

let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

function appendMessage(sender, message) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    chatHistory.push({ sender, message });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

function botReply(input) {
    const responses = [
        "Why did the developer go broke? Because he used up all his cache! 😂",
        "I'm ChuckleBot! Ask me anything — or hit me with a roast request! 🔥",
        "Can’t help you with dating advice, but I can debug your heartbreak! 💔🤖",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (text) {
        appendMessage("You", text);
        const reply = botReply(text);
        setTimeout(() => appendMessage("ChuckleBot", reply), 500);
        userInput.value = "";
    }
});

toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
});

voiceBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendBtn.click();
    };
});

// Load chat history
chatHistory.forEach(msg => appendMessage(msg.sender, msg.message));

let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function(event) {
        let transcription = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcription += event.results[i][0].transcript;
        }
        document.getElementById('transcription').textContent = transcription;
    };
} else {
    alert('Speech recognition is not supported in this browser');
}

let darkMode = false;

function toggleTheme() {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
}

function startListening() {
    recognition.start();
}

function showLoading() {
    document.getElementById('loadingScreen').style.visibility = 'visible';
}

function hideLoading() {
    document.getElementById('loadingScreen').style.visibility = 'hidden';
}

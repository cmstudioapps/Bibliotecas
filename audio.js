class AudioRecorder { constructor() { this.mediaRecorder = null; this.audioChunks = []; this.audioBlob = null; this.audioUrl = null; this.audio = new Audio(); this.stream = null; }

async startRecording() { this.stream = await navigator.mediaDevices.getUserMedia({ audio: true }); this.mediaRecorder = new MediaRecorder(this.stream); this.audioChunks = [];

this.mediaRecorder.ondataavailable = (event) => {
  this.audioChunks.push(event.data);
};

this.mediaRecorder.onstop = () => {
  this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
  this.audioUrl = URL.createObjectURL(this.audioBlob);
  this.audio.src = this.audioUrl;
};

this.mediaRecorder.start();

}

stopRecording() { if (this.mediaRecorder) { this.mediaRecorder.stop(); this.stream.getTracks().forEach(track => track.stop()); } }

playRecording() { if (this.audioUrl) { this.audio.play(); } }

downloadRecording(filename = 'recording.wav') { if (this.audioBlob) { const link = document.createElement('a'); link.href = this.audioUrl; link.download = filename; document.body.appendChild(link); link.click(); document.body.removeChild(link); } }

async transcribeAudio() { if (!this.audioBlob) return null;

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'pt-BR';
recognition.interimResults = false;

return new Promise((resolve, reject) => {
  recognition.onresult = (event) => {
    resolve(event.results[0][0].transcript);
  };
  recognition.onerror = (event) => {
    reject(event.error);
  };
  recognition.start();
});

} }

export default AudioRecorder;


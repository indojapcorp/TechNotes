let speech = new SpeechSynthesisUtterance();
speech.lang = "en";
speech.rate = 1;
speech.volume = 1;
speech.pitch = 1;

  
let voices = [];



document.querySelector("#start").addEventListener("click", () => {
  //speech.text = document.querySelector("textarea").value;
  speech.text = window.getSelection().toString();
  speakVoice(0);
  window.speechSynthesis.speak(speech);
});

document.querySelector("#jap").addEventListener("click", () => {
  //speech.text = document.querySelector("textarea").value;
  speech.text = window.getSelection().toString();
  speakVoice(18);
  window.speechSynthesis.speak(speech);
});

document.querySelector("#pause").addEventListener("click", () => {
  window.speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});


function speakVoice(num) {
voices = window.speechSynthesis.getVoices();
  speech.voice = voices[num];
};

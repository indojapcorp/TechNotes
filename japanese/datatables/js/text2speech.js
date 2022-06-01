let speech = new SpeechSynthesisUtterance();
speech.lang = "en";
speech.rate = 1;
speech.volume = 1;
speech.pitch = 1;

  
let voices = [];

//window.addEventListener("dblclick", event => {
  //  speech.text = window.getSelection().toString();
  //speakVoice(18);
   // console.log("Double-click detected" + speech.text)
 // window.speechSynthesis.speak(speech);

  // Double-click detected
//})

var selectionEndTimeout;
var selectedText;
var pagelang;
document.onselectionchange = userSelectionChanged;

function userSelectionChanged() {

    // wait 500 ms after the last selection change event
    if (selectionEndTimeout) {
        clearTimeout(selectionEndTimeout);
    }

    selectionEndTimeout = setTimeout(function () {

        $(window).trigger('selectionEnd');
    }, 500);
}

$(window).bind('selectionEnd', function () {

    selectionEndTimeout = null;

    // TODO: Do your cool stuff here........

    selectedText = window.getSelection().toString();
    if(selectedText != ''){
speech.text = selectedText;

pagelang=$( "html" ).attr("lang");
    if(pagelang == ''){
    	pagelang = 'en';
      speakVoice(0);
    }else if(pagelang == 'en'){
      speakVoice(0);
    }else if(pagelang == 'jp'){
      speakVoice(18);
    }
    else{
          speakVoice(0);
    	  pagelang = 'en';
    }

//    console.log("selectedText=" + selectedText);
//	console.log(selectedText.split(/\r?\n/));

//  speakVoice(18);

speakMessage(selectedText,500,pagelang)

//  window.speechSynthesis.speak(speech);    
  }else{
        
}

});

function speakVoice(num) {
voices = window.speechSynthesis.getVoices();
  speech.voice = voices[num];
};

function speakMessage(message, PAUSE_MS = 500,lang) {
  try {
    const messageParts = message.split(/\r?\n/)

    let currentIndex = 0
    const speak = (textToSpeak) => {
      const msg = new SpeechSynthesisUtterance();
      const voices = window.speechSynthesis.getVoices();
      msg.voice = voices[0];
      msg.volume = 1; // 0 to 1
      msg.rate = 1; // 0.1 to 10
      msg.pitch = 1; // 0 to 2
      msg.text = textToSpeak;
      msg.lang = lang;

      msg.onend = function() {
        currentIndex++;
        if (currentIndex < messageParts.length) {
          setTimeout(() => {
            speak(messageParts[currentIndex])
          }, PAUSE_MS)
        }
      };
      speechSynthesis.speak(msg);
    }
    speak(messageParts[0])
  } catch (e) {
    console.error(e)
  }
}


function run(pause) {
  speakMessage('Testing 1,2,3', pause)
}

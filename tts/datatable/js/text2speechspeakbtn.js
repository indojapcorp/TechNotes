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
    }, 5);
}

$(window).bind('selectionEnd', function () {

    selectionEndTimeout = null;

    // TODO: Do your cool stuff here........

    selectedText = window.getSelection().toString();
        console.log("selectionEnd detected" + selectedText)
    if(selectedText != ''){
speech.text = selectedText;

pagelang=$( "html" ).attr("lang");
    if(pagelang == ''){
      speakVoice(0);
    }else if(pagelang == 'en'){
      speakVoice(0);
    }else if(pagelang == 'jp'){
      speakVoice(18);
    }
    else{
          speakVoice(0);
    }

    console.log("lang detected" + pagelang);

//  speakVoice(18);
    console.log("Double-click detected" + selectedText)
  window.speechSynthesis.speak(speech);    }else{
        
}

});


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

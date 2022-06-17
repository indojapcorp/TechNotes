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
var fclang;
var sclang;
var everyline;
var times;
play=false;

document.onselectionchange = userSelectionChanged;

function userSelectionChanged() {

	play=true;
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
    selectedText = window.getSelection().toString();
    if(selectedText != ''){
speech.text = selectedText;

fclang=$( "#fclang" ).val();
sclang=$( "#sclang" ).val();

times=$( "#times" ).val();
everyline=$( "#everyline" ).val();


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

var length =selectedText.split(/\r?\n/).length;

//if(length==1){
//console.log("len=1");
//speakMessage(selectedText,500,fclang)
//}else{
//console.log("len="+length);
//speakTwoMessages(selectedText,500);
//}

//speakMessage(selectedText,500,pagelang)
speakTwoMessages(selectedText,500,times,everyline);

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
      msg.voice = voices[lang];
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


function speakTwoMessages(message, PAUSE_MS = 500 , TIMES = 1 , EVERYLINE = 0) {
  try {
  	
  	console.log('times='+times);
  	console.log('EVERYLINE='+EVERYLINE);
  	  	
  	var sb = "";
  	var sbfull = "";
  	var sbeachline = "";  	  	

	
	if(EVERYLINE==1){
		const messageLineParts = message.split(/\r?\n/)
		for (let i = 0; i < messageLineParts.length; i++) {
  			sbeachline = sbeachline + messageLineParts[i] + '\n' + messageLineParts[i] + '\n'  ;
		}
		sb=sbeachline;
	}else{
	  	for (let i = 0; i < TIMES; i++) {
  		sbfull = sbfull + message + '\n' ;
		}
		sb=sbfull;
	}
	
	//console.log(sbeachline);

	console.log(sb);


    const messageParts = sb.split(/\r?\n/)

    let currentIndex = 0
    const speak = (textToSpeak1,textToSpeak2) => {
    
    //  const messagetabParts = message.split(/\t/);

       msg = new SpeechSynthesisUtterance();
      const voices = window.speechSynthesis.getVoices();
      msg.voice = voices[fclang];
      msg.volume = 1; // 0 to 1
      msg.rate = 1; // 0.1 to 10
      msg.pitch = 1; // 0 to 2
      msg.text = textToSpeak1;
      msg.lang = fclang;
      speechSynthesis.speak(msg);


		if(textToSpeak2 != undefined){
       msg = new SpeechSynthesisUtterance();
      msg.voice = voices[sclang];
      msg.volume = 1; // 0 to 1
      msg.rate = 1; // 0.1 to 10
      msg.pitch = 1; // 0 to 2
      msg.text = textToSpeak2;
      msg.lang = sclang;
      speechSynthesis.speak(msg);
      }


      msg.onend = function() {
        currentIndex++;
        if (currentIndex < messageParts.length) {
          setTimeout(() => {
          if(play){
            const messagetabParts = messageParts[currentIndex].split(/\t/);
            speak(messagetabParts[0],messagetabParts[1])
            }
          }, PAUSE_MS);
        }
      };
//      speechSynthesis.speak(msg);
      
      
      
    }
    
        
//      const messagetabParts = message.split(/\t/);
      
      const messagetabParts = messageParts[0].split(/\t/);

    speak(messagetabParts[0],messagetabParts[1])
  } catch (e) {
    console.error(e)
  }
}

function run(pause) {
  speakMessage('Testing 1,2,3', pause)
}


try {

document.querySelector("#start").addEventListener("click", () => {
	userSelectionChanged();
});

document.querySelector("#pause").addEventListener("click", () => {
  window.speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
  play=false;
  window.speechSynthesis.cancel();
});
}
catch(err) {
  console.log(' pause/resume button not found');
}


function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    console.log('file:'+file);
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}



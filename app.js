const axios = require('axios');
const readline = require('readline');

// Function to display ASCII banner
function displayBanner() {
  console.log(`
  ██░ ██  ██▓ ██▀███  ▓█████     ███▄ ▄███▓▓█████     ██▀███   ▒█████   ██▓  █████   █    ██  ▄▄▄       ███▄    █ ▄▄▄█████▓
  ▓██░ ██▒▓██▒▓██ ▒ ██▒▓█   ▀    ▓██▒▀█▀ ██▒▓█   ▀    ▓██ ▒ ██▒▒██▒  ██▒▓██▒▒██▓  ██▒ ██  ▓██▒▒████▄     ██ ▀█   █ ▓  ██▒ ▓▒
  ▒██▀▀██░▒██▒▓██ ░▄█ ▒▒███      ▓██    ▓██░▒███      ▓██ ░▄█ ▒▒██░  ██▒▒██▒▒██▒  ██░▓██  ▒██░▒██  ▀█▄  ▓██  ▀█ ██▒▒ ▓██░ ▒░
  ░▓█ ░██ ░██░▒██▀▀█▄  ▒▓█  ▄    ▒██    ▒██ ▒▓█  ▄    ▒██▀▀█▄  ▒██   ██░░██░░██  █▀ ░▓▓█  ░██░░██▄▄▄▄██ ▓██▒  ▐▌██▒░ ▓██▓ ░ 
  ░▓█▒░██▓░██░░██▓ ▒██▒░▒████▒   ▒██▒   ░██▒░▒████▒   ░██▓ ▒██▒░ ████▓▒░░██░░▒███▒█▄ ▒▒█████▓  ▓█   ▓██▒▒██░   ▓██░  ▒██▒ ░ 
   ▒ ░░▒░▒░▓  ░ ▒▓ ░▒▓░░░ ▒░ ░   ░ ▒░   ░  ░░░ ▒░ ░   ░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░▓  ░░ ▒▒░ ▒ ░▒▓▒ ▒ ▒  ▒▒   ▓▒█░░ ▒░   ▒ ▒   ▒ ░░   
   ▒ ░▒░ ░ ▒ ░  ░▒ ░ ▒░ ░ ░  ░   ░  ░      ░ ░ ░  ░     ░▒ ░ ▒░  ░ ▒ ▒░  ▒ ░ ░ ▒░  ░ ░░▒░ ░ ░   ▒   ▒▒ ░░ ░░   ░ ▒░    ░    
   ░  ░░ ░ ▒ ░  ░░   ░    ░      ░      ░      ░        ░░   ░ ░ ░ ░ ▒   ▒ ░   ░   ░  ░░░ ░ ░   ░   ▒      ░   ░ ░   ░      
   ░  ░  ░ ░     ░        ░  ░          ░      ░  ░      ░         ░ ░   ░      ░       ░           ░  ░         ░          
                                                                                                                                                
  `);
}

const axiosOptions = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '68ab79a5d0msh391d736bf3b9ca2p12cbd0jsn9679c8ca2be5',
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  },
};

const apiUrl = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const languageDetectionUrl = 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function countSentences(input) {
  // Split the input into sentences based on punctuation marks.
  const sentences = input.split(/[.?!]/).filter(sentence => sentence.trim() !== '');
  return sentences.length;
}

function handleUserInput() {
  rl.question('Enter your sentence: ', async (sentence) => {
    if (!sentence) {
      console.log('NO INPUTS');
      handleUserInput();
      return;
    }

    // Check if the input contains more than one sentence.
    if (countSentences(sentence) > 1) {
      console.log('YOU HAVE ENTERED MORE THAN ONE SENTENCE. TRY AGAIN.');
      handleUserInput();
      return;
    }

    // Detect the language of the input sentence.
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set('q', sentence);

      const detectionResponse = await axios.post(languageDetectionUrl, encodedParams, axiosOptions);
      const detectedLanguage = detectionResponse.data.data.detections[0][0].language;

      // If the detected language is not English, prompt "salah tu" and return.
      if (detectedLanguage !== 'en') {
        console.log('THE GIVEN SENTENCE WAS NOT IN ENGLISH');
        handleUserInput();
        return;
      }

      const sentenceLength = sentence.length;
      if (sentenceLength > 160) {
        console.log('THE GIVEN SENTENCE EXCEEDED THE CHARACTER LIMIT');
        handleUserInput();
        return;
      }

      encodedParams.set('source', 'en');
      encodedParams.set('target', 'id');

      const translationResponse = await axios.post(apiUrl, encodedParams, axiosOptions);
      const translation = translationResponse.data.data.translations[0].translatedText;
      console.log("Translation in Bahasa Indonesia:", translation);

      rl.question('Do you want to continue with another translation? (Y/N): ', (answer) => {
        if (answer.toLowerCase() === 'y') {
          handleUserInput();
        } else {
          console.log('Thank you for using ROIQUANT Translator. Goodbye!');
          rl.close();
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(`GOOGLE TRANSLATE RESPONDED WITH ERROR CODE ${error.response.status}. MESSAGE: ${error.response.data.message}`);
      } else {
        console.error(error);
      }
      handleUserInput();
    }
  });
}

// Start the program by displaying the main menu
displayBanner();
handleUserInput();

# roiquantnodejsassignment
 
ROIQUANT Translator

AUTHOR : MUHAMMAD KAMAL HAJI KIFLI

Introduction : This project is an interview assignment test for the vacant positions at ROIQUANT. It is designed for the evaluation for candidates' programming skills, problem-solving abilities, and familiarity with APIs and Node.js according to the instructions given by the Company.

NOTE TO EVALUATOR : This project using Google Translate API on Basic Plan, which means it is on 500 characters limit only. Please do not spam sentences more than the limit given. 

Requirements
Node.js: This program requires Node.js to be installed on your machine to run the translation logic and make API calls.
NPM Packages: The code utilizes the axios package to make HTTP requests to the Google Translate API and readline for user input handling. These packages need to be installed before running the program. You can install them using the following command:

npm install axios readline

Translation Logic
The ROIQUANT Translator is a Node.js-based application that allows users to translate English sentences to Bahasa Indonesia using the Google Translate API. It displays an ASCII banner at the start for aesthetics.

1. User Input: The program prompts the user to enter a sentence in English for translation.
2. Language Detection: Upon receiving the user input, the program detects the language of the input sentence using the Google Translate API. If the detected language is not English (language code: 'en'), it displays a message indicating that the given sentence was not in English and prompts the user to enter another sentence.
3. Character Limit: It checks if the input sentence exceeds the character limit of 160 characters (the Google Translate API limit). If the input is too long, it displays a message indicating that the given sentence has exceeded the character limit and prompts the user to enter a shorter sentence.
4. Translation: If the input passes the above checks, the program proceeds to translate the input sentence from English to Bahasa Indonesia using the Google Translate API. The translated text is then displayed to the user.
5. Continuation: After displaying the translation, the program asks the user if they want to continue with another translation. If the user enters 'Y' or 'y', the process starts again, and if the user enters 'N' or 'n', the program displays a goodbye message and exits.

Limitations
1. Internet Connection: This program requires a stable internet connection to make API calls to the Google Translate service. Without an internet connection, the translation process will not work.
2. Language Support: The program is designed to handle English sentences and translate them to Bahasa Indonesia. It may not provide accurate translations for other languages.
3. Character Limit: The Google Translate API has a character limit of 160 characters per translation request. Sentences longer than this limit will not be translated accurately and may result in incomplete or incorrect translations.
4. Sentence Detection: The program uses simple punctuation-based sentence detection, which may not be perfect for all cases. Complex sentences with unusual punctuation may not be handled correctly, leading to translation errors.

Usage
1. Ensure you have Node.js and the required NPM packages (axios and readline) installed on your machine.
2. Copy the code into a new file named app.js.
3. Open your terminal or command prompt and navigate to the folder containing app.js.
4. Run the program using the following command:

     node app.js

5. The program will display the ASCII banner and prompt you to enter an English sentence for translation. Follow the prompts and continue with translations or exit as desired.

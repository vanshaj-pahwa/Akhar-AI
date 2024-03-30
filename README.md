# Akhar AI

Akhar AI is an intelligent chatbot powered by the ChatGPT API key to generate responses based on natural language inputs.

## Features

- **Natural Language Understanding:** Akhar AI can understand and respond to natural language inputs, making conversations with the chatbot feel more human-like.
- **Dynamic Responses:** The chatbot can provide dynamic and context-aware responses based on user input and conversation history.
- **Code Snippet Handling:** Akhar AI can handle code snippets intelligently, displaying them in a formatted code box for easy reading and copying.
- **User-Friendly Interface:** The chatbot interface is user-friendly, allowing users to type messages, press Enter to send, and receive responses in real-time.
- **Copy Code Functionality:** Users can easily copy code snippets displayed by the chatbot with a click of a button.
- **Next Line Handling:** Akhar AI handles next line breaks (\n) in messages, ensuring that messages with line breaks are displayed correctly in the chat interface.
- **Usage as a Node.js Chatbot (Terminal):** Akhar AI can also be used as a Node.js chatbot in the terminal. Simply install the dependencies using `npm install` and start the chatbot after adding your API_KEY in .env with `node index.js`. You can then enter messages in the terminal and receive responses from Akhar AI.


## Usage as a Web Chatbot

To use Akhar AI chatbot in a web interface:

1. Enter your message in the input field.
2. Press Enter or click the Send button to send your message.
3. The chatbot will process your message using the ChatGPT API key and provide a response.
4. If the response includes a code snippet, it will be displayed in a formatted code box with a copy icon. Click the copy icon to copy the code snippet to your clipboard.

## Usage as a Node.js Chatbot (Terminal)

To use Akhar AI chatbot as a Node.js chatbot in the terminal:

1. Clone the repository to your local machine.
2. Navigate to the (`backend`) directory.
3. Create a `.env` file in the root directory and add your OpenAI API key: `OPENAI_API_KEY=your_openai_api_key_here`
4. Install dependencies using `npm install`.
5. Start the chatbot in the terminal using `node index.js`.
6. Enter your messages in the terminal and press Enter to send.
7. The chatbot will process your messages using the ChatGPT API key and provide responses.



## Technologies Used

- React: Frontend development and user interface.
- Chakra UI: Styling and UI components.
- Axios: HTTP client for making API requests.
- Node.js: Backend server for handling chatbot requests.
- Express.js: Framework for building the backend server.
- ChatGPT API Key: Integration for generating dynamic responses.

## Setup

1. Clone the repository to your local machine.
2. Navigate to the (`backend`) directory.
3. Create a `.env` file in the root directory and add your OpenAI API key: `OPENAI_API_KEY=your_openai_api_key_here`
4. Navigate to the backend directory using (`cd backend`) in your terminal.
5. Install backend dependencies using `npm install`.
6. Start the backend server using `node server.js`.
7. Navigate to the project's (`frontend`) directory.
8. Install frontend dependencies using `npm install`.
9. Start the development server for the frontend using `npm start`.
10. Access the chatbot interface in your web browser at `http://localhost:3000`.

This setup ensures that your OpenAI API key is securely stored in the .env file and used by the backend server to interact with the ChatGPT API. Make sure to replace `your_openai_api_key_here` with your actual OpenAI API key.

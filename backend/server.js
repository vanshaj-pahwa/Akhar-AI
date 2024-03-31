import express from 'express';
import colors from 'colors';
import cors from 'cors';
import openai from './config/open-ai.js';

const app = express();

const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Endpoint for handling chatbot requests
app.post('/ask-akhar', async (req, res) => {
  const userInput = req.body.userInput;
  const chatHistory = req.body.chatHistory || [];

  try {
    const messages = chatHistory.map(([role, content]) => ({ role, content }));
    messages.push({ role: 'user', content: userInput });

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const completionText = completion.data.choices[0].message.content;

    const response = {
      botResponse: completionText,
      chatHistory: [...chatHistory, ['user', userInput], ['assistant', completionText]],
    };

    res.json(response);
  } catch (error) {
    console.error(colors.red(error));
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

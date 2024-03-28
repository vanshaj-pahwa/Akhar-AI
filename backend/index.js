import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.bold.green('Welcome to Akhar AI!'));
  console.log(colors.bold.green('How can I help you today?'));

  const chatHistory = []; // Store conversation history

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      const messages = [...chatHistory.map(([role, content]) => ({ role, content })), { role: 'user', content: userInput }];

      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      const completionText = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.green('Akhar: ') + completionText);
        return;
      }

      console.log(colors.green('Akhar: ') + completionText);

      chatHistory.push(['user', userInput], ['assistant', completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();

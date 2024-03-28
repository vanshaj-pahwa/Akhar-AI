import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AkharBotContainer from './components/AkharBotContainer/AkharBotContainer';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <AkharBotContainer />
      </div>
    </ChakraProvider>
  );
}

export default App;
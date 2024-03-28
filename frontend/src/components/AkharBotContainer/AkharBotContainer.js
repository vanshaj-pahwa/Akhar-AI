import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Input,
  Button,
  Text,
  Box,
  Tooltip,
  CircularProgress,
  Code,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons"

const AkharBotContainer = () => {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const sendMessageToBot = async () => {
    setIsLoading(true);
    setUserInput("");
    try {
      const response = await axios.post("http://localhost:3001/chatbot", {
        userInput,
        chatHistory,
      });
      const { botResponse, chatHistory: updatedHistory } = response.data;
      setBotResponse(botResponse);
      setChatHistory(updatedHistory);
      setUserInput(""); // Reset text field after sending message
    } catch (error) {
      console.error("Error sending message to bot:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessageToBot();
    }
  };

  const handleSendClick = () => {
    sendMessageToBot();
  };

  // Scroll to bottom of chat container when new message is added
  useEffect(() => {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  const SegregateCode = ({ text }) => {
    const segments = text.split("```");
    const elements = segments.map((segment, index) => {
      if (index % 2 === 0) {
        return (
          <Text
            key={index}
            textAlign="left"
            bgColor="gray.200"
            p={2}
            borderRadius="md"
            maxWidth="80%"
            mb={2}
          >
            {segment}
          </Text>
        );
      } else {
        const trimmedSegment = segment.trim();
        const handleCopyCode = () => {
            navigator.clipboard.writeText(trimmedSegment);
            alert('Copied to clipboard')
        };
        return (
          <pre key={index}>
            <Box
              key={index}
              bgColor="gray.200"
              color={'white'}
              p={2}
              borderRadius="md"
              overflowX="auto"
              maxWidth="80%"
              margin={"1rem 0 1rem 0"}
            >
            <Tooltip label="Copy code" aria-label="Copy code">
              <CopyIcon color="gray.800" onClick={handleCopyCode} cursor={'pointer'} margin={'1rem'}/>
            </Tooltip>
              <Code display={'flex'}>{segment.trim()}</Code>
            </Box>
          </pre>
        );
      }
    });

    return <div>{elements}</div>;
  };

  return (
    <Flex
      direction="column"
      maxW="800px"
      m="auto"
      p={4}
      h="100vh"
      overflowY="auto"
    >
      <Box flex="1" ref={chatContainerRef} mb={4}>
        {chatHistory.map((message, index) => (
          <Flex
            key={index}
            justifyContent={
              message[0] === "assistant" ? "flex-start" : "flex-end"
            }
            mb={2}
          >
            {message[0] === "assistant" ? (
              message[1].includes("```") ? (
                <SegregateCode key={index} text={message[1]} />
              ) : (
                <Text
                  textAlign="left"
                  bgColor="gray.200"
                  p={2}
                  borderRadius="md"
                  maxWidth="80%"
                  mb={2}
                >
                  {message[1]}
                </Text>
              )
            ) : (
              <Text
                textAlign="right"
                bgColor="blue.500"
                color="white"
                p={2}
                borderRadius="md"
                maxWidth="80%"
                mb={2}
              >
                {message[1]}
              </Text>
            )}
          </Flex>
        ))}
      </Box>
      <Flex>
        <Input
          flex="1"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          mr={2}
        />
        <Button onClick={handleSendClick} disabled={isLoading}>
          {isLoading ? (
            <CircularProgress
              size="30px"
              color="blue.500"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              isIndeterminate
            />
          ) : (
            "Send"
          )}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AkharBotContainer;

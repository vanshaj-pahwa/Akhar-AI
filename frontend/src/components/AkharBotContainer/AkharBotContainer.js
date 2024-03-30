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
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { allSuggestions } from "../../constants/constants";

const AkharBotContainer = () => {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHeading, setShowHeading] = useState(true);
  const chatContainerRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const toast = useToast();

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
      setShowHeading(false);
    }
  };

  const handleSendClick = () => {
    sendMessageToBot();
    setShowHeading(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
  };

  const replaceNewlinesWithBreaks = (text) => {
    return text.replace(/\n/g, "<br>");
  };

  // Scroll to bottom of chat container when new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory, isLoading]);

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
          // Show toast message for "Copied to clipboard"
          toast({
            title: "Copied to clipboard",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        };
        return (
          <pre key={index}>
            <Box
              key={index}
              bgColor="gray.200"
              color={"white"}
              p={2}
              borderRadius="md"
              overflowX="auto"
              maxWidth="80%"
              margin={"1rem 0 1rem 0"}
            >
              <Tooltip label="Copy code" aria-label="Copy code">
                <CopyIcon
                  color="gray.800"
                  onClick={handleCopyCode}
                  cursor={"pointer"}
                  margin={"1rem"}
                />
              </Tooltip>
              <Code display={"flex"}>{segment.trim()}</Code>
            </Box>
          </pre>
        );
      }
    });

    return <div>{elements}</div>;
  };

  useEffect(() => {
    const getRandomSuggestions = (suggestions, count) => {
      const shuffled = suggestions.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setSuggestions(getRandomSuggestions(allSuggestions, 4));
  }, []);

  return (
    <Flex
      direction="column"
      maxW="800px"
      m="auto"
      p={4}
      h="100vh"
      overflowY="auto"
    >
      {/* Conditionally render the heading */}
      {!showHeading ? null : (
        <React.Fragment>
          <Box mb={4} textAlign={"center"}>
            <Text fontSize="3xl" fontWeight="bold">
              Welcome to Akhar AI!
            </Text>
            <Text fontSize="2xl">How can I help you today?</Text>
          </Box>

          <Box mb={4} marginTop={"20%"}>
            <SimpleGrid columns={2} spacing={4} mb={4}>
              {suggestions.map((suggestion, index) => (
                <Box
                  key={index}
                  p={4}
                  border="1px solid #E2E8F0"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                  _hover={{
                    bg: "gray.100",
                    borderColor: "gray.200",
                  }}
                >
                  <Text>{suggestion}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </React.Fragment>
      )}

      <Box flex="1" ref={chatContainerRef} mb={4} overflowY={'auto'}>
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
                  dangerouslySetInnerHTML={{
                    __html: replaceNewlinesWithBreaks(message[1]),
                  }}
                />
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
                dangerouslySetInnerHTML={{
                  __html: replaceNewlinesWithBreaks(message[1]),
                }}
              />
            )}
          </Flex>
        ))}
        {isLoading && <Text>Akhar is typing...</Text>}
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
        <Button
          onClick={handleSendClick}
          disabled={isLoading}
          backgroundColor={"blue.500"}
          color={"white"}
          _hover={{
            bg: "blue.300",
            color: "white",
          }}
        >
          {isLoading ? (
            <CircularProgress
              size="30px"
              color="white"
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

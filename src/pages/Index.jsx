// Chat application similar to Claude or GPT using Chakra UI
import { Box, VStack, Text, Input, Button, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Cannot send empty message.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (typeof inputValue === "string") {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
    } else {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setMessages([...messages, { text: e.target.result, sender: "user", type: "file" }]);
      };
      fileReader.readAsDataURL(inputValue);
    }
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: `Echo: ${inputValue}`, sender: "ai" }]);
    }, 1000);
  };

  return (
    <VStack spacing={4} p={5}>
      <Text fontSize="2xl" fontWeight="bold">
        Chat with AI
      </Text>
      <Box w="100%" h="500px" bg="gray.100" overflowY="auto" p={3}>
        {messages.map((message, index) => (
          <Box key={index} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"} bg="teal.100" p={3} borderRadius="lg" m={1}>
            {message.type === "file" ? <img src={message.text} alt="Uploaded file" style={{ maxWidth: "100%" }} /> : <Text>{message.text}</Text>}
          </Box>
        ))}
      </Box>
      <Input placeholder="Type your message here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
      <Input type="file" onChange={(e) => setInputValue(e.target.files[0])} />
      <Button rightIcon={<FaPaperPlane />} colorScheme="teal" onClick={() => handleSendMessage(inputValue instanceof File ? "file" : "text")}>
        Send
      </Button>
    </VStack>
  );
};

export default Index;

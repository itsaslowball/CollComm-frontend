import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import ChatLoading from './miscellaneous/ChatLoading';
import { getSender, getSenderStars } from "../config/ChatLogic";
import { AddIcon } from '@chakra-ui/icons';
import GroupChatModal from './miscellaneous/GroupChatModal';


const MyChats = ({fetchAgain, setFetchAgain}) => {

  // const [loggedUser, setLoggedUser] = useState();
    const [loggedUser, setLoggedUser] = useState(() => {
      return JSON.parse(localStorage.getItem("userInfo")) || [];
    });
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      setLoading(false);
    }
    catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      })
    }
  };




  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);



  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={"3"}
      bg="rgb(36,37,38)"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        width={"100%"}
        justifyContent="space-between"
        alignItems="center"
        color={"white"}
      >
        My Chats
        <GroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} >
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            bg={"#343651"}
            _hover={{
              background: "#38B2AC",
              color: "black",
            }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display={"flex"}
        flexDir="column"
        p={3}
        bg="rgb(41,42,42)"
        width={"100%"}
        height={"100%"}
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "rgb(52,54,55)"}
                color={selectedChat === chat ? "black" : "white"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                <Text>
                  
                  {!chat.isGroupChat
                    ? getSenderStars(loggedUser, chat.users)
                    : null}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats
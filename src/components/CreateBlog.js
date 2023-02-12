import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';

const CreateBlog = ({ fetchAgain, setFetchAgain }) => {
    
const { user, blogs, setBlogs } = ChatState();
const [title, setTitle] = useState();
const [content, setContent] = useState();


const submitHandler = async () => {
  try {
    const { data } = await axios.post("/api/blogs/compose", {
      title: title,
      postContent: content,
      user: user,
    });
    setTitle();
    setContent();
    setFetchAgain(!fetchAgain);
  } catch (error) {
    console.error(error.response.data);
  }
  };
  
  


  return (
    <Box
      width={"100%"}
      //   margin={"20px"}
      padding="20px"
    >
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Textarea
          placeholder="Title of the blog"
          background={"#242526"}
          marginBottom={"20px"}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormLabel>Content</FormLabel>
        <Textarea
          placeholder="Content of the Blog"
          background={"#242526"}
          marginBottom={"20px"}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
        />
        <Button
          background={"blue"}
          color={"white"}
          _hover={{ background: "#953845" }}
          onClick={submitHandler}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}

export default CreateBlog
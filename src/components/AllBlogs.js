import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Card, CardBody} from "@chakra-ui/react";
import ProfileModal from "../components/miscellaneous/ProfileModal";


const AllBlogs = ({ fetchAgain, setFetchAgain }) => {
const url = "https://colcom-api.onrender.com";
  const {  blogs, setBlogs } = ChatState();
  const [search, setSearch] = useState();
  const [allblogs, setAllBlogs] = useState(true)

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const showBlogs = async () => {
    const { data } = await axios.get("/api/blogs");
    setBlogs(data);
    setAllBlogs(true);
  };




  const deleteHandler = (e) => {
    const blogId = e.target.value;
    console.log(blogId);
    axios.post('/api/blogs/deleteblog', { blogId } );
    setFetchAgain(!fetchAgain)
  }




  useEffect(() => {
    showBlogs();
  }, [fetchAgain]);

  const handleSearch = async() => {
    const { data } = await axios.get(`/api/blogs?search=${search}`);
    setBlogs(data);
    setAllBlogs(false);
  }
    const handleSearch2 = async () => {
      const { data } = await axios.get(`/api/blogs`);
      setBlogs(data);
      setAllBlogs(true);
    };

  return (
    <div>
      <Box display={"flex"} pb={2}>
        <Input
          placeholder="Search blogs based on blog title"
          mr={2}
          value={search}
          color="white"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          bg={"#343645"}
          variant="outline"
          color="white"
          _hover={{
            background: "#38B2AC",
            color: "black",
          }}
          onClick={handleSearch}
        >
          Go
        </Button>
      </Box>

      {!allblogs
        ?
        (<Button
          bg={"#343645"}
          variant="outline"
          color="white"
          _hover={{
            background: "#38B2AC",
            color: "black",
          }}
          onClick={handleSearch2}
        >
          Get all blogs
        </Button>) : null}
      
      
      <Box
        width={"100%"}
        border={"3px"}
        padding={"10px"}
        alignContent={"center"}
        alignItems={"center"}
      >
        {blogs.map((blog) => (
          <Card
            width={"100%"}
            margin="6px"
            key={blog._id}
            background={"#242526"}
            color="white"
          >
            <Stack>
              <CardBody>
                <Box padding={"0px"}>
                  <ProfileModal user={blog.user}>
                    <Avatar
                      size="sm"
                      curson="pointer"
                      name={blog.user.name}
                      src={blog.user.pic}
                    ></Avatar>
                    {blog.user.name}
                  </ProfileModal>
                </Box>
                <Divider />
                <Box
                  alignItems={"center"}
                  justifyContent="center"
                  alignContent={"center"}
                >
                  <Heading
                    alignItems={"center"}
                    justifyContent="center"
                    alignContent={"center"}
                    marginTop={"20px"}
                    size="md"
                  >
                    {blog.title}
                  </Heading>

                  <Text py="2">{blog.postContent}</Text>

                  {user._id === blog.user._id ? (
                    <Button
                      background={"blue"}
                      _hover={{
                        background: "red"
                      }}
                      color={"white"}
                      value={blog._id}
                      onClick={deleteHandler}
                    >
                      delete
                    </Button>
                  ) : (
                    <></>
                  )}
                </Box>
              </CardBody>
            </Stack>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default AllBlogs;

import {
  FormControl,
  FormLabel,
  VStack,
  Button,
  Select,
  Container,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const UpdateProfile = () => {

        const user = JSON.parse(localStorage.getItem("userInfo"));
        console.log(user);
        const [name, setName] = useState();
        const [email] = useState(user.email);
        const [pic, setPic] = useState();
        const [skills, setSkills] = useState([]);
        const [skillRating, setSkillRating] = useState();
        const [picLoading, setPicLoading] = useState(false);
        const toast = useToast();
        const history = useHistory();
    

      const { fetchAgain, setFetchAgain } = ChatState();

    const postDetails = (pics) => {
      setPicLoading(true);
      if (pics === undefined) {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      console.log(pics);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chatApp");
        data.append("cloud_name", "dyp1jkmgz");
        fetch("https://api.cloudinary.com/v1_1/dyp1jkmgz/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPic(data.url.toString());
            console.log(data.url.toString());
            setPicLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setPicLoading(false);
          });
      } else {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
        return;
      }
    };

    
  

 

    const submitHandler = async () => {
          
        try {
          const config = {
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            "/api/user/updateprofile",
            {name,email, pic, skills, skillRating},
            config
          );
          toast({
            title: "Profile Updated",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          setPicLoading(false);
          setFetchAgain(!fetchAgain);
          history.push("/chats");
        } catch (error) {
          toast({
            title: "Error occured!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
        }
      };


  return (
    <Container maxW="xl" centerContent marginTop={"15px"}>

      <Box bg={"#343645"} w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="100%">
              Update My Profile
              <br></br>
              Enter in only those fields which you want to update
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing="5px" color="white">
                <FormControl id="first-name">
                  <FormLabel>Update My Name</FormLabel>
                  <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder={user.email}
                    disabled
                  />
                </FormControl>

              

                <FormControl id="pic">
                  <FormLabel>Update My DP</FormLabel>
                  <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </FormControl>

                <FormControl id="skill">
                  <FormLabel>Update My skill</FormLabel>

                  <Select
                    placeholder="Select Your Skill"
                    onChange={(e) => setSkills(e.target.value)}
                    color="black"
                  >
                    <option value="React">React</option>
                    <option value="Javascript">Javascript</option>
                    <option value="DSA">DSA</option>
                    <option value="DBMS(sql)">DBMS(SQL)</option>
                    <option value="DBMS(mongodb)">DBMS(MONGODB)</option>
                    <option value="SQL">SQL</option>
                    <option value="Mongodb">MONGODB</option>
                    <option value="Web Development">WEB DEVELOPMENT</option>
                    <option value="ML">ML</option>
                    <option value="AI">AI</option>
                    <option value="Java">JAVA</option>
                    <option value="C++">C++</option>
                    <option value="C">C</option>
                    <option value="Python">PYTHON</option>
                  </Select>
                </FormControl>

                <FormControl id="skillRating">
                  <FormLabel>Update My Skill Rating</FormLabel>

                  <Select
                    placeholder="Rate your skill"
                    onChange={(e) => setSkillRating(e.target.value)}
                    color="black"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Select>
                </FormControl>

                <Button
                  colorScheme="blue"
                  width="100%"
                  style={{ marginTop: 15 }}
                  onClick={submitHandler}
                  isLoading={picLoading}
                >
                  Update
                </Button>
                <Link to="/chats">Go to Chat Page</Link>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default UpdateProfile;

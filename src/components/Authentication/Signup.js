import { FormControl, FormLabel, InputGroup, InputRightElement, VStack, Button , Select } from '@chakra-ui/react'

import React, {useState} from 'react'
import { Input, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Signup = () => {
  

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [skills, setSkills] = useState([]);
    const [skillRating, setSkillRating] = useState();
    const [show, setShow] = useState(false);
    const [picLoading, setPicLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick = () => setShow(!show);


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
    if (!name || !email || !password || !confirmpassword || !skills || !skillRating) {
        toast({
          title: "Please re enter the field!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
       toast({
         title: "Please re enter the password!",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
       
       return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post( "/api/user",{ name, email, password, pic, skills, skillRating },config);
       toast({
         title: "Registration Successfull!",
         status: "success",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setPicLoading(false);
      history.push('/chats');
       return;
    }
    catch (error) {
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
    <VStack spacing="5px" color="white">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              bg=""
              _hover={{ background: "white", color: "black" }}
              h="1.75rem"
              size="5m"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password Again"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              bg=""
              _hover={{ background: "white", color: "black" }}
              h="1.75rem"
              size="5m"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <FormControl id="skill">
        <FormLabel>Your skills</FormLabel>

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
        <FormLabel>Rate your skill</FormLabel>

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
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup
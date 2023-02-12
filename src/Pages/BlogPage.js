import {
  Avatar,
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, {useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "../components/miscellaneous/ProfileModal";

import AllBlogs from "../components/AllBlogs";
import CreateBlog from "../components/CreateBlog";

const BlogPage = () => {
  const { user } = ChatState();
  const newUser = JSON.parse(localStorage.getItem("userInfo"));

    const [fetchAgain, setFetchAgain] = useState(false);

    const history = useHistory();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };
    
    const goToChat = () => {
        history.push("/chats")
    }    

  return (
    <div style={{ width: "100%" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"#242526"}
        w="100%"
        p={"10px 10px 5px 10px"}
      >
        {/* App Name*/}
        <Text fontSize={"2xl"} fontFamily="Work sans">
          ColComm
        </Text>

        <div>
          <Menu>
           

            <Button
              bg={"#343651"}
              _hover={{
                background: "#38B2AC",
                color: "black",
              }}
              marginRight={"9px"}
              onClick={goToChat}
            >
              Chats
            </Button>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              color={"white"}
              bg={"#343651"}
              _hover={{
                background: "#38B2AC",
                color: "black",
              }}
            >
              <Avatar
                size="sm"
                curson="pointer"
                name={newUser.name}
                src={newUser.pic}
              />
            </MenuButton>

            {/* Show Profile and Logout*/}
            <MenuList bg={"#343651"}>
              {/*Profile Modal is used to show user profile when My Profile is Clicked*/}
              <ProfileModal user={newUser}>
                <MenuItem bg={"#343651"}>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler} bg={"#343651"}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>





      

      <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
        <Box width={"60%"}>
          {<AllBlogs fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>

        <Box width={"40%"}>
          {<CreateBlog fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>
      </Box>
    </div>
  );
};

export default BlogPage;

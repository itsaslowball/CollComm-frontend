import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
  Tab,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {


  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat, chats, setChats } = ChatState(); // This is coming from context api
  const { isOpen, onOpen, onClose } = useDisclosure(); // This is coming from chakra ui for the drawer
  const history = useHistory(); //To navigate
  const toast = useToast(); //To create simple pop up
const url = "https://colcom-api.onrender.com";
  //-----------------Logout Function-------------------------//

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    
    history.push("/");
  };

  //-------------------Handle Search ---------------------------//

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        //This config sends user token to the backend for the authorization
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/user?search=${search}`,
        config
      ); /*This fetches the data from the given route and config
      is also send for the user authentication*/

      setLoading(false);
      setSearchResult(data); //Whatever result comes after the searching => set that result in setSearchReault useState hook
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // ------------------------access chat ---------------------------------------//

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      //-----if the chat is found in the chatState then just append the chats and don't create a new chat--------------//
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const updateProfile = async (req, res) => {
    history.push("/updateprofile");
  };

  const goToBlog = async (req, res) => {
    history.push("/blogs")
  };

  // useEffect(() => {
  //   user = JSON.parse(localStorage.getItem("userInfo"));
  // }, [])
  // user = JSON.parse(localStorage.getItem("userInfo"));
  const newUser = JSON.parse(localStorage.getItem("userInfo"));
  

  return (
    <>
      {/* //---------------------------------------NavBar-------------------------------------------------// */}

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"#242526"}
        w="100%"
        p={"10px 10px 5px 10px"}
      >
        {/* Tooltip is Used to pop up a message when we hover on the search*/}
        <Tooltip label="Seach User To Chat" hasArrow placement="bottom-end">
          <Button
            variant="solid"
            onClick={onOpen}
            colorScheme="#343651"
            _hover={{
              background: "#38B2AC",
              color: "black",
            }}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: "none", md: "flex" }} px="4">
              Search User Based on Skill
            </Text>
          </Button>
        </Tooltip>

        {/* App Name*/}
        <Text fontSize={"2xl"} fontFamily="Work sans">
          ColComm
        </Text>

        {/* Div for Bell Icon and User Profile*/}
        <div>
          {/* Bell Icon*/}
          <Menu>
            <Button
              bg={"#343651"}
              _hover={{
                background: "#38B2AC",
                color: "black",
              }}
              marginRight={"9px"}
              onClick={goToBlog}
            >
              Blogs
            </Button>
            <Button
              bg={"#343651"}
              _hover={{
                background: "#38B2AC",
                color: "black",
              }}
              onClick={updateProfile}
            >
              Update Profile
            </Button>

            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
          </Menu>

          <Menu>
            {/* Set the avatar*/}
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

      {/* //-----------------------------side drwarer ------------------------------------------------------------// */}

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={"#343645"}>
          <DrawerHeader borderBottomWidth="1px" color="white">
            Search Users
          </DrawerHeader>
          <DrawerBody bg={"#343645"}>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
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
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((newUser) => (
                <UserListItem
                  key={newUser._id}
                  user={newUser}
                  handleFunction={() => accessChat(newUser._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

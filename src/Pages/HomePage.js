import React, { useEffect } from 'react'
import { Container, Box , Text, Tab, Tabs, TabList, TabPanel,TabPanels} from '@chakra-ui/react'
import Login from "../components/Authentication/Login";
import Signup from '../components/Authentication/Signup';
import { useHistory } from 'react-router-dom';





const HomePage = () => {

  const history = useHistory();

  useEffect(() => {
    const user =  JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      history.push("/chats");
    } 
  }, [history]);
  

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        paddingLeft={"50px"}
        p={3}
        bg={"#343645"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        bordereWidth="1px"
        alignItems="center"
      >
        <Text justifyContent={"center"} fontSize="4xl" fontFamily="Work sans" color="white">
          ColComm
        </Text>
      </Box>

      <Box
        bg={"#343645"}
        w="100%"
        p={4}
        borderRadius="lg"
        color="white"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab color="white" width="50%">
              Login
            </Tab>
            <Tab color="white" width="50%">
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage
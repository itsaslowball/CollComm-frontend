import { ViewIcon } from '@chakra-ui/icons';
import { background, Button, IconButton, Image, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react'
    import {
      Modal,
      ModalOverlay,
      ModalContent,
      ModalHeader,
      ModalFooter,
      ModalBody,
      ModalCloseButton,
} from "@chakra-ui/react";
import SkillStars from './SkillStars';
import { useHistory } from 'react-router-dom';



const ProfileModal = ({user, children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();



  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          bg={"#343645"}
          onClick={onOpen}
          _hover={{
            background: "#38B2AC",
            color: "white",
          }}
        />
      )}

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={"#343645"} color="white">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent={"center"}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Image
              borderRadius={"full"}
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              {<SkillStars user={user} />}
            </Text>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal
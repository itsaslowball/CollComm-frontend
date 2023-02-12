import { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
    const history = useHistory();

  
  
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) {
            history.push("/");
        }
    }, [history]);
  

    return (
      <ChatContext.Provider
        value={{
          user,
          setUser,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
          blogs,
          setBlogs,
          fetchAgain,
          setFetchAgain
        }}
      >
        {children}
      </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};


export default ChatProvider;
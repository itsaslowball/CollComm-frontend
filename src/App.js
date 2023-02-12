import { Button } from "@chakra-ui/react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import { Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import UpdateProfile from "./Pages/UpdateProfile";
import BlogPage from "./Pages/BlogPage";
import NotFound from './Pages/NotFound'


function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage}  />
      <Route path="/updateprofile" component={UpdateProfile} />
      <Route path="/blogs" component={BlogPage}  />
      {/* <Route path="*" component={NotFound} /> */}
    </div>
  );
}

export default App;

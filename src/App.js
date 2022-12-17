import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Channel, ChannelHeader, ChannelList, Chat, MessageInput, MessageList, Window } from "stream-chat-react";
import 'stream-chat-react/dist/css/index.css';
import styled from "styled-components";
import CustomChannelList from "./components/CustomChannelList";

const Container = styled.div`
  
  display : flex;

  .left-column{
    width: 300px;
  }

  .right-column{
    flex : 1;
  }

`

const API_KEY = process.env.REACT_APP_API_KEY

const USER1 = {
  id: "user1",
  name: "user1",
  image: "https://picsum.photos/id/64/200/300"
}
const USER2 = {
  id: "user2",
  name: "user2",
  image: "https://picsum.photos/id/65/200/300"
}
const USER3 = {
  id: "user3",
  name: "user3",
  image: "https://picsum.photos/id/73/200/300"
}

const users = [USER1, USER2, USER3];

//Generating random index to select random user
const getRandomUser = () => {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
};


function App() {
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function initChat() {
      const client = StreamChat.getInstance(API_KEY);

      //connecting to user
      const user = getRandomUser();

      client.connectUser(user, client.devToken(user.id));

      //creatiing Channels
      const channel = client.channel('team', 'general', {
        name: "General", //channel name
        image: "https://picsum.photos/id/75/200/300",
      })

      await channel.create();
      channel.addMembers([user.id]);
      setChannel(channel);


      setChatClient(client);

    }

    initChat();

    //Cleanup function...once done..disconnect the user
    return () => {
      if (chatClient) chatClient.disconnectUser();
    }
  }, [])

  if (!chatClient || !channel) return <></>

  return (
    <div>
      <Chat client={chatClient} theme={'messaging light'}>
        <Container>
          <div class ="left-column">
             <CustomChannelList/>
          </div>
          <div class ="right-column">

          </div>
        </Container>
      </Chat>
    </div>
  );
}

export default App;

import { ChannelHeader, MessageInput, MessageList } from "stream-chat-react";
import styled from "styled-components";


const Container = styled.div`
    width: 100%;
    height: 100vh;

    .str-chat-header-livestream {
        width: 100%;
        height: 70px;
    }

    .str-chat__list {
        height: calc(100vh - 70px);
    }

    .str-chat__input-flat-wrapper {
        position: absolute;
        bottom: 20px;
        width: 100%;
    }
`

export default function ChannelBody() {
    return (
        <Container>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
        </Container>
    );
}
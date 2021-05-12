import React, { useEffect, useState, FC } from 'react'
import styled, { css } from 'styled-components'
import MyChat from './utils/MyChat'
import OtherChat from './utils/OtherChat'
import socketio from 'socket.io-client'
import axios from 'axios'
const ChatCnt = styled.div`
width : 100%;
height : 100%;
display : flex;
flex-direction : column;
align-items : center;
`

const ChatContentCnt = styled.div`
width : 100%;
height : 31vh;
overflow-y : scroll;
::-webkit-scrollbar {
    display: none;
}
`

const ChatInputCnt = styled.div`
width : 100%;
height : 5vh;
display : flex;
justify-content : space-between;
align-items : center;
`

const ChatInput = styled.input`
width: 80%;
border: 1px solid #D4D4D4; 
border-radius: 5px;
`

const ChatSubmitBtn = styled.button`
font-size :8px;
width : 20%;
text-align : center;
font-weight : bold;
color : #A6C5F3;
`

const ChatFlexBox = styled.div`
width : 100%;
height : fit-content;
display : flex;
flex-direction : column-reverse;
min-height : 31vh;
`

function Index(props: any) {
    const socket = props.socket;
    const [msgs, setmsgs] = useState<Array<any>>([]);
    const [arr, setarr] = useState<Array<number>>([]);
    const [io, setio] = useState<any>(null);
    const [num, setnum] = useState<number>(0);
    const [clientRef, setClientRef] = useState<any>(React.createRef());
    const [userId, setuserId] = useState<string>("");
    const [ioSet, setioSet] = useState<boolean>(false);
    const [update, setupdate] = useState<boolean>(false);

    useEffect(() => {
        console.log('use effect!!');
        console.log("socket : ", socket);
        socket.on('sendMsg', function (data: any) {
            console.log(data);
            setmsgs([<OtherChat msg={data.content}></OtherChat>].concat(msgs));
        });

    }, [msgs])

    useEffect(() => {
        console.log(msgs.length);
    }, [msgs])

    function mySubmit() {
        console.log('my submit');
        const chatInput = document.querySelector('#chatInput') as HTMLInputElement;
        if (chatInput.value) {
            socket.emit('msg', {
                time: '19:20',
                content: chatInput.value
            })
            setmsgs([<MyChat msg={chatInput.value}></MyChat>].concat(msgs));
        }
    }
    
    /*     function otherSubmit(content: any) {
            setmsgs([<OtherChat msg="reandom text"></OtherChat>].concat(msgs));
        } */

    return (
        <ChatCnt>
            <ChatContentCnt id="chatContentContainer">
                <ChatFlexBox>
                    {msgs}
                </ChatFlexBox>
            </ChatContentCnt>
            <ChatInputCnt>
                <ChatInput id="chatInput" type="TextArea" placeholder="채팅내용을 입력해주세요" />
                <ChatSubmitBtn onClick={mySubmit}>내전송</ChatSubmitBtn>
            </ChatInputCnt>
        </ChatCnt>
    )
}

export default Index

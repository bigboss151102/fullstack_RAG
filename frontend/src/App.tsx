import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchEventSource } from '@microsoft/fetch-event-source';

interface Message {
  message: string;
  isUser: boolean;
  sources?: string[];
}

function App() {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([]);

  const setPartialMessage = (chunk: string, sources: string[] = []) => {
    setMessages(prevMessages => {
      let lastMessage = prevMessages[prevMessages.length - 1];
      if (prevMessages.length == 0 || !lastMessage.isUser) {
        return [...prevMessages.slice(0, -1), {
          message: lastMessage.message + chunk,
          isUser: false,
          sources: lastMessage.sources ? [...lastMessage.sources, ...sources] : sources
        }];
      }
      return [...prevMessages, { message: chunk, isUser: false, sources }];
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/ChatProvider";




createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvider>

      <ChakraProvider >
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
);

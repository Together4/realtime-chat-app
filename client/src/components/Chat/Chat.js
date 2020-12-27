import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  /**
   * Retrieves the users params
   */
  useEffect(() => {
    // gets the url params from the link.
    const { name, room } = queryString.parse(location.search);

    // setting up socket connection on client side.
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // emits the join event, which is transfered to the server.
    socket.emit("join", { name, room });
  }, [ENDPOINT, location.search]);

  return (
    <div>
      <h1>{name}</h1>
      <h2>{room}</h2>
    </div>
  );
};

export default Chat;

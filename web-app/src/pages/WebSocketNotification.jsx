// import React, { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';
// import { over } from 'stompjs';

// const WebSocketNotification = ({ token, userId }) => {
//   const [stompClient, setStompClient] = useState(null);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const connect = () => {
//       const sock = new SockJS('http://localhost:8080/ws');
//       const temp = over(sock);
//       setStompClient(temp);

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       temp.connect(headers, () => {
//         temp.subscribe(`/user/${userId}/queue/notifications`, onMessageReceived);
//       }, onError);
//     };

//     const onMessageReceived = (message) => {
//       setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
//     };

//     const onError = (error) => {
//       console.log('Error:', error);
//     };

//     connect();
//   }, [token, userId]);

//   return (
//     <div>
//       <h2>WebSocket Notifications</h2>
//       {messages.length > 0 ? (
//         messages.map((message, index) => (
//           <div key={index}>
//             <p>{message.content}</p>
//             <p>{new Date(message.timestamp).toLocaleString()}</p>
//           </div>
//         ))
//       ) : (
//         <p>No notifications</p>
//       )}
//     </div>
//   );
// };

// export default WebSocketNotification;

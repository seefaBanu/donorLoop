import React from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


const Notification = ({ title, message, type }) => {
    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false
        }
      });
    
      return null;
}

export default Notification
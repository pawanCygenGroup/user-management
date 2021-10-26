import React, { useState } from 'react';
import StatusNotifier from '../components/StatusNotifier';

export const NotificationDataContext = React.createContext();

export const NotificationDataContextProvider = ({ children }) => {
    const [ status, setStatus ] = useState({
        notifyStatus: false,
        notificationMessage: '',
        notificationType: ''
    });
    const setNotificationData = (notificationObject) => {
        setStatus({
            notifyStatus: true,
            notificationMessage: notificationObject.message,
            notificationType: notificationObject.type, 
          
        });
        setTimeout(() => {
          setStatus({
              notifyStatus: false,
              notificationMessage: '',
              notificationType: 'success'
          });
        }, 2000);
      };
    return (
        <NotificationDataContext.Provider
            value={ { setNotificationData } }
        >
                {children}
            <StatusNotifier
                showNotification={ status.notifyStatus }
                message={ status.notificationMessage } 
                actionType={ status.notificationType } />
        </NotificationDataContext.Provider>
    );
};

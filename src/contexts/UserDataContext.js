import React, { useState, useEffect, useContext } from 'react';
import UserProfileDialog from '../components/UserProfileDialog';
import UserService from '../services/UserService';
import { NotificationDataContext } from './NotificationDataContext';

export const UserDataContext = React.createContext();

export const UserDataContextProvider = ({ children }) => {
    const { setNotificationData } = useContext(NotificationDataContext)
    const [displayProfileDialog, setDisplayProfileDialog] = useState(false);
    const [profileUpdate, setProfileUpdate] = useState(false)
    const [profileDetails, setProfileDetails] = useState()
    const openProfileDialog = (profileData, isUpdate) => {
        setProfileUpdate(isUpdate)
        setProfileDetails(profileData)
        setDisplayProfileDialog(true);
    };
    const closeProfileDialog = () => {
        setDisplayProfileDialog(false);
    };
    const [ userList, setUserList ] = useState([])
    const userService = new UserService()
    useEffect(() => {
        loadUserList()
        // eslint-disable-next-line
    }, [ ] )
    const loadUserList = (pageNumber) => {
        userService.getUsers(pageNumber).then(response => {
            setUserList(response.data)
        })
    }
    const deleteUserByID = (userID) => {
        userService.deleteUser(userID).then(response => {
            if (response.status === 200) {
                setNotificationData({ message: 'User deleted successfully'})
            }
        })
    }
    const addNewUser = (userData) => {
        userService.addUser(userData).then(response => {
            if (response.status === 201) {
                setNotificationData({ message: 'User added successfully' })
                }
            })
    }
    const updateUserDetails = (userData) => {
        userService.updateUser(userData).then(response => {
            console.log(response,'oooo')
            if (response.status === 200) {
                setNotificationData({ message: 'User details updated successfully' })
                }
            })
    }
    return (
        <UserDataContext.Provider
            value={ { loadUserList, userList, openProfileDialog, deleteUserByID, addNewUser, profileDetails, updateUserDetails } }
        >
            {children}
            <UserProfileDialog update={ profileUpdate } openDialog={ displayProfileDialog } handleClose={ closeProfileDialog } />
        </UserDataContext.Provider>
    );
};

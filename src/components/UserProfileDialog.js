import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, FormControl, DialogTitle, OutlinedInput, InputLabel, Grid, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import { UserDataContext } from '../contexts/UserDataContext';
import { NotificationDataContext } from '../contexts/NotificationDataContext';

export default function UserProfileDialog({ openDialog, handleClose, update }) {
    const { addNewUser, profileDetails, updateUserDetails } = useContext(UserDataContext)
    const { setNotificationData } = useContext(NotificationDataContext)
    const imageInputRef = useRef(null)
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        avatar: ''
    })
    useEffect(() => {
        if (profileDetails) {
            setUserDetails(profileDetails)
        }
    }, [ profileDetails ])
    const [isInvalidEmail, setIsInvalidEmail] = useState(false)
    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === 'email') {
            !isValidEmail(value) ? setIsInvalidEmail(true) : setIsInvalidEmail(false)
        }
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }
    const isValidEmail = (inputValue) => {
        const emailPattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return emailPattern.test(inputValue) ? true : false
    }
    const areUserDetailsValid = () => {
        return userDetails.first_name !== '' && userDetails.last_name && !isInvalidEmail
    }
    const registerUser = () => {
        if (areUserDetailsValid()) {
            addNewUser(userDetails)
            handleDialogClose()
        } else {
            setNotificationData({
                message: 'Please enter valid details to register',
                type: 'warning'
            })
        }
    }
    const updateUser = () => {
        if (areUserDetailsValid()) {
            updateUserDetails(userDetails)
            handleDialogClose()
        } else {
            setNotificationData({
                message: 'Please enter valid details to update',
                type: 'warning'
            })
        }
    }
    const handleDialogClose = () => {
        setUserDetails({
            first_name: '',
            last_name: '',
            email: '',
            avatar: ''
        })
        setIsInvalidEmail(false)
        handleClose()
    }
    const handleImageSelection = (event) => {
        setUserDetails({ ...userDetails, avatar: URL.createObjectURL(event.target.files[0]) })
    }
    return (
        <div>
            <Dialog maxWidth='md' open={openDialog} onClose={handleClose}>
                <DialogTitle color='primary'>{update ? 'Update Profile' : 'Add User'}</DialogTitle>
                <DialogContent>
                    <Box paddingTop={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3} align='center'>
                                <Box align='center'>
                                    <Avatar src={ userDetails.avatar } sx={{ width: 100, height: 100, border: '2px solid lightgray' }}/>
                                </Box>
                                <Box>
                                <input
                                        style={ { display: 'none' } }
                                        id='imageID'
                                        type='file'
                                        accept="images/*"
                                        onChange={ handleImageSelection }
                                        ref={ imageInputRef }
                                    />
                                    <Button onClick={() => imageInputRef.current.click() }>{ update ? 'change' : 'upload' }</Button>
                                </Box>
                            </Grid>
                            <Grid container item xs={12} sm={ 9 } spacing={ 2 }>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel htmlFor='component-outlined'>First name</InputLabel>
                                    <OutlinedInput
                                        autoFocus
                                        id='component-outlined'
                                        value={userDetails.first_name}
                                        name='first_name'
                                        onChange={handleChange}
                                        label='First name'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel htmlFor='component-outlined'>Last name</InputLabel>
                                    <OutlinedInput
                                        id='component-outlined'
                                        value={userDetails.last_name}
                                        onChange={handleChange}
                                        name='last_name'
                                        label='Last name'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth required>
                                    <InputLabel htmlFor='component-outlined'>E-mail</InputLabel>
                                    <OutlinedInput
                                        id='component-outlined'
                                        value={userDetails.email}
                                        onChange={handleChange}
                                        name='email'
                                        label='E-mail'
                                        error={isInvalidEmail ? true : false}
                                    />
                                </FormControl>
                            </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box paddingRight={2} marginBottom={2} >
                        {update ? <Button variant='contained' onClick={updateUser}>Update</Button>
                            : <Button variant='contained' onClick={registerUser}>Register</Button>}
                        <Button sx={{ marginLeft: 2 }} variant='outlined' onClick={ handleDialogClose }>{update ? 'Cancel' : 'Close'}</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
}

import React, { useState, useContext } from 'react';
import { Card, IconButton, Avatar, CardHeader, Tooltip, Button, Popover, List, ListItem,  } from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { UserDataContext } from '../contexts/UserDataContext';
import DeleteDialog from './DeleteDialog';


function UserCard({ userDetails }) {
    const { openProfileDialog, deleteUserByID } = useContext(UserDataContext)
    const [ displayConfirmationDialog, setDisplayConfirmationDialog] = React.useState(false);
    const handleProfileDialogOpen = () => {
        setAnchorElement(null)
        openProfileDialog(userDetails, true )
    }
    const handleConfirmationDialogOpen = () => {
        setAnchorElement(null)
        setDisplayConfirmationDialog(true);
    };
    const handleConfirmationDialogClose = () => {
        setDisplayConfirmationDialog(false);
    };
    const [anchorElement, setAnchorElement] = useState(null)
    const handleOptionClick = (event) => {
        setAnchorElement(event.currentTarget);
    }
    const handleOptionClose = () => {
        setAnchorElement(null);
    }
    const displayOption = Boolean(anchorElement);
    const id = displayOption ? 'simple-popover' : undefined;
    const deleteUser = () => {
        deleteUserByID(userDetails.id)
        handleConfirmationDialogClose()
    }
    
    return (
        <React.Fragment>
            <Card sx={{ margin: 1 }}>
                <CardHeader
                    avatar={
                        <Avatar src={userDetails.avatar} sx={{ width: 58, height: 58, border: '2px solid lightgray' }} />
                    }
                    action={
                        <Tooltip title='actions'>
                            <IconButton onClick={handleOptionClick}>
                                <MoreVertRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    title={`${userDetails.first_name} ${userDetails.last_name}`}
                    subheader={userDetails.email}
                />
            </Card>
            <Popover
                id={id}
                open={displayOption}
                anchorEl={anchorElement}
                onClose={handleOptionClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List >
                    <ListItem sx={ { padding: '0px 6px' } } onClick={ handleProfileDialogOpen }><Button> update </Button></ListItem>
                    <ListItem sx={ { padding: '0px 6px' } }><Button onClick={ handleConfirmationDialogOpen } color='error'> delete </Button></ListItem>
                </List>
            </Popover>
            <DeleteDialog onConfirm={ deleteUser } displayConfirmDialog={ displayConfirmationDialog } onCancel={ handleConfirmationDialogClose } />
        </React.Fragment>
    )
}

export default UserCard

import React, { useContext } from 'react';
import { Grid, Typography, Box, Divider, Button } from '@mui/material';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import UsersList from './UsersList';
import { UserDataContext } from '../contexts/UserDataContext';

function Dashboard() {
    const { openProfileDialog } = useContext(UserDataContext)
    return (
        <Box paddingY={{ xs: 2, sm: 4 }}>
            <Grid container spacing={ 2 } justify='space-between'>
                <Grid item xs={6} sm={6} >
                    <Typography  variant='h5' color='primary'> User management </Typography>
                </Grid>
                <Grid item xs={6} sm={6} align='right'>
                    <Button onClick={ openProfileDialog } variant='contained' startIcon={ <PersonAddRoundedIcon /> }>Add user</Button>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <UsersList />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard

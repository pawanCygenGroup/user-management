import React, { useContext } from 'react';
import { Typography, Grid, Pagination } from '@mui/material';
import UserCard from './UserCard';
import { UserDataContext } from '../contexts/UserDataContext';

function UsersList({ openProfileDialog }) {
    const { loadUserList, userList } = useContext(UserDataContext)
    const [page, setPage] = React.useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
        loadUserList(value)
    };
    return (
        <div>
            <Grid container >
                <Grid item xs={12} >
                    <Typography color='textSecondary' variant='subtitle2'>Available users</Typography>
                </Grid>
                {
                    userList.data?.map( userEntry => {
                      return <Grid key={ userEntry.id } item xs={ 12 } sm={ 6 } md={ 4 }>
                                <UserCard userDetails={ userEntry } />
                            </Grid>
                  })
                }
                <Grid item xs={12} >
                    <Pagination sx={ { marginTop: 4 } }  count={ userList?.total_pages } variant='outlined' page={page} onChange={ handlePageChange } />
                </Grid>
            </Grid>
        </div>
    )
}

export default UsersList

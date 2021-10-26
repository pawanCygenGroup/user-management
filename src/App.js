import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboard from './components/Dashboard';
import { NotificationDataContextProvider } from './contexts/NotificationDataContext';
import { UserDataContextProvider } from './contexts/UserDataContext';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <NotificationDataContextProvider>
          <UserDataContextProvider>
            <Dashboard />
          </UserDataContextProvider>
        </NotificationDataContextProvider>
      </Container>
    </React.Fragment>
  );
}
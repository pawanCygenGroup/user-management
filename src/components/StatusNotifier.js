import React, { useState , useEffect } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const  StatusNotifier = (props)=> {
  const { showNotification, message, actionType } = props
  const [ displayMessage,setDisplayMessage ] = useState(showNotification)
  useEffect(() => {
    setDisplayMessage(showNotification)
  }, [ showNotification ])
  return (  
      <Snackbar autoHideDuration={ 3000 }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
        open={ displayMessage } onClose={ ()=>setDisplayMessage(false) }>
          <Alert sx={{ width: '100%' }} severity={ actionType }>{message}</Alert>
      </Snackbar>
  );
}

export default StatusNotifier;
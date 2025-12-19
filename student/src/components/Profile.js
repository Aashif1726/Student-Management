import React from 'react';
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import { Avatar, Paper, Tooltip, Typography } from '@mui/material';
import { useAuth } from './utils/Auth';

function Profile() {
    const auth = useAuth();

    if (!auth.user) {
        return <p>Please login to see profile</p>; // Prevent crash if no user
    }

    const username = auth.user.username;
    const initials = username
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();

    return (
        <>
            <Tooltip title="This page shows user details">
                <InfoOutlineRoundedIcon />
            </Tooltip>
            
            <span style={{ padding: "4px" }}>
                <b>Profile Page</b>
            </span>
            <br/><br/>

           
                <Avatar sx={{ width: 80, height: 80 }}>{initials}</Avatar>
                <Typography variant="h6" >{username}</Typography>
           
        </>
    );
}

export default Profile;

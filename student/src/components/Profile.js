import React from 'react'
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import { Tooltip } from '@mui/material';

function Profile() {
    return (
        <>
       <Tooltip title="This page show user details"><InfoOutlineRoundedIcon /></Tooltip>  <span style={{padding:"4px"}}><b>Profile Page</b></span>
        
        </>
    )
}

export default Profile

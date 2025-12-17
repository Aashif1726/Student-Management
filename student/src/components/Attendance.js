import React from 'react'
import { Tooltip } from '@mui/material'
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';

function Attendance() {
    return (
        <>
         <Tooltip title="This page show user details"><InfoOutlineRoundedIcon /></Tooltip>  <span style={{padding:"4px"}}><b>Attendance Page</b></span>
        </>
    )
}

export default Attendance

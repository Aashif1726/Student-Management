import React from 'react'
import { Tooltip } from '@mui/material';
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';

function Students() {
    return (
        <>
            <Tooltip title="This page shows Students details"><InfoOutlineRoundedIcon /></Tooltip>  <span style={{padding:"4px"}}><b>Students Page</b></span>
        </>
    )
}

export default Students

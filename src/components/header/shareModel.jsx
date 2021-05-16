import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import CopyTextBox from "../copyField";

import { useSelector } from 'react-redux';


export default function ShareModel() {

    const state = useSelector(state => state.mainPage);
    

    return (
        <div>
            <Typography variant="h6">
                Share your model
            </Typography>
            {/* <Divider /> */}

            <CopyTextBox text={"asoidaosidoadjio address"} />

        </div>
    );
}
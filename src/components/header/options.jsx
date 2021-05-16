import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import CopyTextBox from "../copyField";
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';


const useStyles = makeStyles({
    root: {
        flex: 1,
        paddingBottom: "15px"
    },
    separator: {
        marginLeft: "0px",
        marginRight: "0px",
        borderBottom: "1px solid #ced0d4"
    },
    separatorVert: {
        marginLeft: "10px",
        // marginRight: "10px",
        borderRight: "1px solid #ced0d4"
    },

    title: {
        alignItems: 'center',
    },
    titleTypography: {
        marginLeft: "15px",
        // marginBottom: "px"
    },
    titleDiv: {
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: 'center'
    }

});


export default function Options() {

    const classes = useStyles();
    const state = useSelector(state => state.mainPage);
    const dispatch = useDispatch();


    return (
        <div>
            <Grid container>
                <Typography variant="h6">
                    Properties
                </Typography>
            </Grid>
        </div>

    );
}
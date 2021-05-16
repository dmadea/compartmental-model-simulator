import React, { useState, TextField } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const useStyles = makeStyles({
    root: {
        flex: 1,
        paddingBottom: "15px"
    },

    header: {
        flex: 1,
        fontSize: "22px",
        fontFamily: "Maiandra GD",
        fontWeight: 'bold'
    },
    underline: {
        fontSize: "20px",
        textDecoration: 'underline',
        // fontWeight: 'bold'
    },
    textMargin: {
        marginLeft: "5px"
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

export default function AboutPage() {
    const classes = useStyles();

    const theme = useTheme();

    return (
        <div className={classes.root}>
            {"about page"}
            <BlockMath math={"a = b = c = d"} errorColor={'#cc0000'} />
        </div>
    )
}
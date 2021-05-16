import React, { useState, TextField } from 'react';
import { AppBar, Toolbar, Typography, Divider } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BtcIcon from '../btcLogo';
import RichTooltip from '../RichTooltip';
import ClickableRichTooltip from '../ClickableRichTooltip';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';


import { Link, Redirect } from 'react-router-dom';
import ShareModel from './shareModel';
import Donate from './donate';
import Options from './options';


// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';


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
    linkHeader: {
        textDecoration: 'none',
        color: 'inherit'
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

});

export default function Header() {
    const classes = useStyles();
    const projectUrl = "https://github.com/dmadea/compartmental-model-simulator";

    function openInNewTab(url) {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    // const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography className={classes.header}><Link to="/" className={classes.linkHeader}>Compartmental Model Simulator</Link></Typography>

                    <Tooltip title="About">
                        <Link to="/about" className={classes.linkHeader}>
                            <IconButton color="inherit">
                                <InfoIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>


                    <ClickableRichTooltip arrow={true} content={<ShareModel />} placement="bottom">
                        <Tooltip title="Share">
                            <IconButton color="inherit" >
                                <ShareIcon />
                                {/* <Typography className={classes.textMargin}>Share</Typography> */}
                            </IconButton>
                        </Tooltip>
                    </ClickableRichTooltip>


                    <ClickableRichTooltip arrow={true} content={<Donate />} placement="bottom">
                        <Tooltip title="Donate">
                            <IconButton color="inherit" >
                                <BtcIcon />
                                {/* <Typography className={classes.textMargin}>Donate</Typography> */}
                            </IconButton>
                        </Tooltip>

                    </ClickableRichTooltip>

                    <Tooltip title="Contribute">
                        <IconButton color="inherit" onClick={() => openInNewTab(projectUrl)}>
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>


                    {/* <IconButton color="inherit">
                        <Brightness4Icon/>
                    </IconButton> */}

                    <ClickableRichTooltip arrow={true} content={<Options />} placement="bottom">
                        <IconButton color="inherit">
                            <MoreVertIcon />
                        </IconButton>
                    </ClickableRichTooltip>

                    {/* <IconButton color="inherit">
                        <MoreVertIcon />
                    </IconButton> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}
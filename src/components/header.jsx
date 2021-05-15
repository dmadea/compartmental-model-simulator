import React, { useState, TextField } from 'react';
import { AppBar, Toolbar, Typography, Divider } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BtcIcon from './btcLogo';
import RichTooltip from './RichTooltip';
import ClickableRichTooltip from './ClickableRichTooltip';

import Input from '@material-ui/core/Input';
import { QRCode } from 'react-qrcode-logo';
import btcImage from '../img/btc-orange.png';
import ethImage from '../img/eth.png';
import ltcImage from '../img/litecoin-seeklogo.com.png';
import Grid from '@material-ui/core/Grid';
import { Icon } from "@material-ui/core";
import CopyTextBox from "./copyField";
import { useTheme } from '@material-ui/core/styles';

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

export default function Header() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    // const [text, settE] = useState("text to copy");
    const qrSize = 180;
    const quietZone = 2;
    const iconSize = 50;
    const theme = useTheme();
    // console.log(theme.breakpoints.up('sm'));

    const data = [
        {
            name: 'Bitcoin',
            address: 'bc1qldlaatw852utqdfu53tdz2ku49rhuxl8t3vxf3',
            icon: btcImage,
            iconSize: iconSize
        },
        {
            name: 'Ethereum',
            address: '0x95cfB0535bcA3ca5F48a7935557655d0E9888fcb',
            icon: ethImage,
            iconSize: iconSize
        },
        {
            name: 'Litecoin',
            address: 'ltc1qtnl6ytnak5tzslfg2rcgqpm73g87qp2h9aaj9t',
            icon: ltcImage,
            iconSize: iconSize
        },
    ];


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.header}>Compartmental Model Simulator</Typography>

                    <ClickableRichTooltip arrow={true} content={
                        <div>
                            <Typography variant="h6">
                                Share your model
                            </Typography>
                            {/* <Divider /> */}

                            <CopyTextBox text={"asoidaosidoadjio address"} />

                        </div>
                    } placement="bottom">
                        <IconButton color="inherit" >
                            <ShareIcon />
                            <Typography className={classes.textMargin}>Share</Typography>
                        </IconButton>
                    </ClickableRichTooltip>


                    <ClickableRichTooltip arrow={true} content={
                        <div>
                            <Grid container spacing={3} direction={theme.breakpoints.up("sm") ? "row" : "column"} justify="space-around">
                                {
                                    data.map((entry, i) => (
                                        // className={i < data.length - 1 ? classes.separatorVert : null}
                                        <Grid item xs={12} sm={12 / data.length} container spacing={1} direction="column" >
                                            <Grid item >  {/*container direction="row" alignItems="center"*/}

                                                <div className={classes.titleDiv}>
                                                    <img src={entry.icon} height={entry.iconSize} width={entry.iconSize} />
                                                    <Typography variant="h6" className={classes.titleTypography}>{entry.name}</Typography>
                                                </div>
                                            </Grid>

                                            <Grid item>
                                                <QRCode quietZone={quietZone} size={qrSize} value={entry.address} />
                                            </Grid>
                                            <Grid item>
                                                <CopyTextBox text={entry.address} />
                                            </Grid>
                                        </Grid>
                                    ))}
                            </Grid>
                        </div>


                    } placement="bottom">
                        <IconButton color="inherit" onClick={() => console.log('clicked')}>
                            <BtcIcon />
                            <Typography className={classes.textMargin}>Donate</Typography>
                        </IconButton>
                    </ClickableRichTooltip>

                    {/* 
                    <RichTooltip
                        content={"Test content"}
                        open={open}
                        placement="bottom"
                        onClose={() => setOpen(false)}
                    >
                        <IconButton color="inherit" onClick={() => {
                            setOpen(true);
                            console.log(open);
                        }}>
                            <BtcIcon/>
                            <Typography className={classes.textMargin}>Donate</Typography>
                        </IconButton>
                    </RichTooltip>
          */}

                    {/* <IconButton color="inherit">
                        <BtcIcon/>
                        <Typography className={classes.textMargin}>Donate</Typography>
                    </IconButton> */}
                    <IconButton color="inherit">
                        <GitHubIcon />
                    </IconButton>

                    {/* <IconButton color="inherit">
                        <Brightness4Icon/>
                    </IconButton> */}
                    <IconButton color="inherit">
                        <MoreVertIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}
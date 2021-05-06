import React, { useState, TextField } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BtcIcon from './btcLogo.js';
import RichTooltip from './RichTooltip.js';
import ClickableRichTooltip from './ClickableRichTooltip.js';
import { FaRegCopy, FaRegClipboard } from "react-icons/fa";
import Input from '@material-ui/core/Input';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { QRCode } from 'react-qrcode-logo';
import btcImage from './btc-orange.png';
import ethImage from './eth.png';
import ltcImage from './litecoin-seeklogo.com.png';
import Grid from '@material-ui/core/Grid';
import { Icon } from "@material-ui/core";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


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
        marginLeft: "8px"
    },
    copyParentDiv: {
        position: "relative"
    },
    copyButton: {
        position: "absolute",
        right: "6px",
        top: "9px",
        "&:hover": "#aaaaaa"
    },
    textField: {
        paddingTop: "1px",
        paddingBottom: "1px",
        paddingLeft: "5px",
        paddingRight: "30px",
        fontSize: "13px",
        fontFamily: "SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace",
        margin: "0px 0px"
    },
    centeredLabel: {
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'bottom'
    }

});

export default function Header() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    // const [text, settE] = useState("text to copy");
    const qrSize = 150;
    const quietZone = 5;
    const iconSize = 50;

    const data = [
        {
            name: 'Bitcoin',
            address: '3GaKss6KqnwubUj1TtHfj7vjfVwGeopZgd',
            icon:  btcImage,
            iconSize:  iconSize
        },
        {
            name: 'Ethereum',
            address: '156843535asdasdas wasd',
            icon:  ethImage,
            iconSize:  iconSize
        },
        {
            name: 'Litecoin',
            address: 'LYqaqYfrVT484kqtKgyJvsRzshXVG9nDU5',
            icon:  ltcImage,
            iconSize:  iconSize
        },
    ];
    

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.header}>Compartmental Model Simulator</Typography>

                    <ClickableRichTooltip arrow={true} content={
                        'asdas'
                            
                        } placement="bottom">
                            <IconButton color="inherit" >
                                <ShareIcon/> 
                                <Typography className={classes.textMargin}>Share</Typography>
                            </IconButton>
                    </ClickableRichTooltip>
                    

                    <ClickableRichTooltip arrow={true} content={
                        <div>
                            {/* <Typography className={classes.underline}>Thank youour model</Typography> */}

                            <Grid container spacing={2}>
                                {
                                    data.map(entry => (
                                        <Grid item xs={12} sm={12 / data.length}>
                                            {/* <Card className={classes.root}>
                                                <CardHeader
                                                    avatar={
                                                    <Icon>
                                                        <img src={entry.icon} height={entry.iconSize} width={entry.iconSize}/>
                                                    </Icon>
                                                    }
                                                    title={entry.name}
                                                />
                                                <CardContent>
                                                    <QRCode quietZone={quietZone} size={qrSize} value={entry.address}/>
                                                    <div className={classes.copyParentDiv}>
                                                        <Input className={classes.textField} readOnly={true} value={entry.address} inputProps={{ 'aria-label': 'description' }} />
                                                        <CopyToClipboard className={classes.copyButton} text={entry.address}>
                                                            <FaRegCopy/>
                                                        </CopyToClipboard>
                                                     </div>
                                                </CardContent>


                                            </Card> */}
                                            
                                            <div className={classes.centeredLabel}>
                                                <Icon>
                                                    <img src={entry.icon} height={entry.iconSize} width={entry.iconSize}/>
                                                </Icon>
                                                <Typography styles={{margin: "10 10px"}}>{entry.name}</Typography>
                                                
                                            </div>
                                            <QRCode quietZone={quietZone} size={qrSize} value={entry.address}/>

                                            <div className={classes.copyParentDiv}>
                                                <Input className={classes.textField} readOnly={true} value={entry.address} inputProps={{ 'aria-label': 'description' }} />
                                                <CopyToClipboard className={classes.copyButton} text={entry.address}>
                                                    <FaRegCopy/>
                                                </CopyToClipboard>
                                            </div>
                                    
                                        </Grid>

                                    /* <div className={classes.copyParentDiv}>
                                            <Input className={classes.textField} readOnly={true} value={text} inputProps={{ 'aria-label': 'description' }} />
                                            <CopyToClipboard className={classes.copyButton} text={text}>
                                                <FaRegCopy/>
                                            </CopyToClipboard>
                                    </div> */
                                    ))}
                            </Grid>
                       </div>
                    
                    
                    } placement="bottom">
                        <IconButton color="inherit" onClick={() => console.log('clicked')}>
                            <BtcIcon/>
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
                        <GitHubIcon/>
                    </IconButton>

                    <IconButton color="inherit">
                        <Brightness4Icon/>
                    </IconButton>
                    <IconButton color="inherit">
                        <MoreVertIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar> 
        </div>
    )
}
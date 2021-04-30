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




const useStyles = makeStyles({
    root: {
        flex: 1
    },

    typgraphyStyles: {
        flex: 1,
        fontSize: "22px",
        fontFamily: "Maiandra GD",
        fontWeight: 'bold'
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
    }

});

export default function Header() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    // const [text, settE] = useState("text to copy");
    const text = "https://link-to-webpage.com";
    const size = 50;
    const qrSize = 200;
    const quietZone = 15;
    


    return (
        <div classes={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.typgraphyStyles}>Compartmental Model Simulator</Typography>
                    <ClickableRichTooltip arrow={true} content={
                        <div>
                            <Typography>Share your model</Typography>
                            <QRCode quietZone={quietZone} size={qrSize} logoWidth={size} logoHeight={size}
                             logoImage={btcImage} value="1MZ9mDeq3Jx4Cu6KojAwHfx221nKCixAnY"/>
                            <QRCode quietZone={quietZone} size={qrSize} logoWidth={size} logoHeight={size}
                             logoImage={ethImage} value="0x7cDC8B46C24776f993D4B5BdB1871F20590f3026"/>
                            <QRCode quietZone={quietZone} size={qrSize} logoWidth={size} logoHeight={size}
                             logoImage={ltcImage} value="LYqaqYfrVT484kqtKgyJvsRzshXVG9nDU5"/>



                            <div className={classes.copyParentDiv}>
                                <Input className={classes.textField} readOnly={true} value={text} inputProps={{ 'aria-label': 'description' }} />
                                <CopyToClipboard className={classes.copyButton} text={text}>
                                    <FaRegCopy/>
                                </CopyToClipboard>
                            </div>
                        </div>
                        } placement="bottom">
                            <IconButton color="inherit" >
                                <ShareIcon/> 
                                <Typography className={classes.textMargin}>Share</Typography>
                            </IconButton>
                    </ClickableRichTooltip>
                    

                    <ClickableRichTooltip arrow={true} content={<Typography>Test text</Typography>} placement="bottom">
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
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CopyTextBox from "../copyField";
import { QRCode } from 'react-qrcode-logo';
import btcImage from '../../img/btc-orange.png';
import ethImage from '../../img/eth.png';
import ltcImage from '../../img/litecoin-seeklogo.com.png';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';

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


export default function Donate() {

    const classes = useStyles();

    const qrSize = 180;
    const quietZone = 2;
    const iconSize = 50;
    const theme = useTheme();

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
        <div>
            <Grid container spacing={3} direction={theme.breakpoints.up("sm") ? "row" : "column"} justify="space-around">
                {data.map((entry, i) => (
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

    );
}
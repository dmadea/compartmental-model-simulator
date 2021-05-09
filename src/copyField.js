import React from "react";
import { Input } from "@material-ui/core";
import { FaRegCopy, FaRegClipboard } from "react-icons/fa";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    // root: {
    //     flex: 1,
    //     paddingBottom: "15px"
    // },

    copyParentDiv: {
        position: "relative"
    },
    copyButton: {
        position: "absolute",
        right: "12px",
        top: "7px",
        transition: "color 300ms",
        "&:hover": {
            color: "#371BF1"
        }
    },
    textField: {
        padding: "2px 35px 2px 10px",  // top, right, bottom, left
        fontSize: "11px",
        fontFamily: "SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace",
        backgroundColor: "#fafafa",
        border: "1px solid #ced0d4",
        borderRadius: "15px",
        width: "100%"

    },
});


const CopyTextBox = ({
    text = "some text",
}) => {

    const classes = useStyles();

    return (
        <div className={classes.copyParentDiv}>
            <Input disableUnderline
                className={classes.textField}
                readOnly={true}
                value={text} />

             <CopyToClipboard className={classes.copyButton} text={text}>
                <FaRegCopy/>
            </CopyToClipboard>
        </div>
    );
};

export default CopyTextBox;

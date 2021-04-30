import React from 'react'
import { Icon } from "@material-ui/core";
import logo from './bitcoin-white.svg';

export default function BtcIcon() {
    return (
        <Icon>
            <img src={logo} height={22} width={22}/>
        </Icon>
    )
};
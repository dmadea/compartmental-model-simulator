import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputSlider from './Slider'

import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import { useSelector } from 'react-redux';
import * as type from '../redux/types';


// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });


// {data, sliderChangedCallback, sliderLogToggledCallback}
export default function InitCondTable() {
  //   const classes = useStyles();
  const initConds = useSelector(state => state.mainPage.initConds);  // selector = (state) => state.mainPage.initConds


  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Compartment</TableCell>
            <TableCell align="center">Initial conditions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initConds.map((entry, index) => (
            <TableRow>
              <TableCell align="center"><InlineMath math={entry.texName} errorColor={'#cc0000'} /></TableCell>
              <TableCell align="center">
                <InputSlider
                  log={entry.log}
                  steps={100}
                  min={entry.min}
                  max={entry.max}
                  value={entry.value}
                  typeHandeValue={type.INITIAL_CONDITION_CHANGED}
                  typeHandleVars={type.INIT_SLIDER_VARS_CHANGED}
                  index={index}
                  color='primary'
                // sliderChangedCallback={sliderChangedCallback}
                // sliderLogToggledCallback={sliderLogToggledCallback}
                >
                </InputSlider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


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


export default function RatesTable() {
  //   const classes = useStyles();

  const forwardRates = useSelector(state => state.mainPage.forwardRates);
  const backwardRates = useSelector(state => state.mainPage.backwardRates);
  const cbNonZero = useSelector(state => state.mainPage.cbNonZero);


  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Rate constant</TableCell>
            <TableCell align="center">Forward rates</TableCell>
            <TableCell align="center">Backward rates</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forwardRates.map((entry, index) => (
            <TableRow>
              <TableCell align="center">
                <InlineMath math={entry.texName} errorColor={'#cc0000'} />
              </TableCell>
              <TableCell align="center">
                <InputSlider log={entry.log}
                  steps={100}
                  min={entry.min}
                  max={entry.max}
                  value={entry.value}
                  typeHandeValue={type.FORWARD_RATE_CHANGED}
                  typeHandleVars={type.FORWARD_SLIDER_VARS_CHANGED}
                  index={index}
                  // sliderChangedCallback={sliderChangedCallback}
                  // sliderLogToggledCallback={sliderLogToggledCallback}
                  color="primary"
                />
              </TableCell>
              <TableCell align="center">
                <InputSlider log={backwardRates[index].log}
                  steps={100}
                  min={backwardRates[index].min}
                  max={backwardRates[index].max}
                  value={backwardRates[index].value}
                  typeHandeValue={type.BACKWARD_RATE_CHANGED}
                  typeHandleVars={type.BACKWARD_SLIDER_VARS_CHANGED}
                  index={index}
                  // sliderChangedCallback={sliderChangedCallback}
                  // sliderLogToggledCallback={sliderLogToggledCallback}
                  disabled={!cbNonZero}
                  color="secondary"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
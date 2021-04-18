import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputSlider from './Slider.js'
import './App.css';

import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function InitCondTable( {data, sliderChangedCallback, sliderLogToggledCallback} ) {
//   const classes = useStyles();

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
          {data.map((entry, index) => (
            <TableRow>
              <TableCell align="center"><InlineMath math={entry.texName} errorColor={'#cc0000'}/></TableCell>
              <TableCell align="center">
                <InputSlider 
                  log={entry.log}
                  steps={100} 
                  min={entry.min}
                  max={entry.max} 
                  value={entry.init}
                  type='init'
                  index={index}
                  color='primary'
                  sliderChangedCallback={sliderChangedCallback}
                  sliderLogToggledCallback={sliderLogToggledCallback}>
                </InputSlider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


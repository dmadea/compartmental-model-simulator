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

import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';


export default function RatesTable({data, disabled, sliderChangedCallback, sliderLogToggledCallback}) {
    //   const classes = useStyles();
  
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
              {data.map((entry, index) => (
                  <TableRow>
                    <TableCell align="center">
                      <InlineMath math={entry.texName} errorColor={'#cc0000'}/>
                    </TableCell>
                      <TableCell align="center">
                        <InputSlider log={entry.log_fr} 
                          steps={100} 
                          min={entry.min_fr}
                          max={entry.max_fr} 
                          value={entry.fr}
                          type="fr"
                          index={index} 
                          sliderChangedCallback={sliderChangedCallback}
                          sliderLogToggledCallback={sliderLogToggledCallback}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <InputSlider log={entry.log_br} 
                          steps={100} 
                          min={entry.min_br} 
                          max={entry.max_br} 
                          value={entry.br} 
                          type="br"
                          index={index} 
                          sliderChangedCallback={sliderChangedCallback}
                          sliderLogToggledCallback={sliderLogToggledCallback}
                          disabled={disabled}
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
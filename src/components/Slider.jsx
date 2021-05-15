import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import ToggleButton from '@material-ui/lab/ToggleButton';
// import VolumeUp from '@material-ui/icons/VolumeUp';
import { sliderValueChanged, sliderVarsChanged } from '../redux/actions/mainPage';

import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 100,
  },
});

// const useStyles = makeStyles({
//   root: {
//         color: '#ff0000',
//   },
//   thumb: {
//        backgroundColor: '#fff',
//        border: '3px solid currentColor',
//      },

// })


const MySlider = withStyles({
  thumb: {
    backgroundColor: '#ffffff',
    border: '3px solid currentColor',
  },
  active: {},
})(Slider);

function round(value, digits) {
  return Math.round((value + Number.EPSILON) * 10 ** digits) / 10 ** digits
}

// https://stackoverflow.com/questions/202302/rounding-to-an-arbitrary-number-of-significant-digits
function roundToSignificantFigures(num, n) {
  if (num == 0) {
    return 0;
  }

  let d = Math.ceil(Math.log10(num < 0 ? -num : num));
  let power = n - Math.floor(d);

  let magnitude = 10 ** power;
  let shifted = Math.round(num * magnitude);
  return shifted / magnitude;
}


// const RedSlider = withStyles({
//   root: {
//     color: '#ff0000',
//     // height: 8,
//   },
//   thumb: {
//     // height: 24,
//     // width: 24,
//     backgroundColor: '#fff',
//     border: '3px solid currentColor',
//     // marginTop: -8,
//     // marginLeft: -12,
//     // '&:focus, &:hover, &$active': {
//     //   boxShadow: 'inherit',
//     // },
//   },
//   active: {},
//   // valueLabel: {
//   //   left: 'calc(-50% + 4px)',
//   // },
//   // track: {
//   //   height: 8,
//   //   borderRadius: 4,
//   // },
//   // rail: {
//   //   height: 8,
//   //   borderRadius: 4,
//   // },
// })(Slider);

export default function InputSlider({ value, log, min, max, steps, color, typeHandeValue, typeHandleVars, index, disabled }) {
  const classes = useStyles();

  // const { texName, value, log, min, max } = useSelector(state => selector(state)[index]);  // selector = (state) => state.mainPage.initConds
  const dispatch = useDispatch();

  // const [value, setValue] = React.useState(typeof defaultValue === 'undefined' ? 0 : defaultValue);

  // const [toggled, setToggled] = React.useState(false);

  const sigDigits = 3;

  const handleSliderChange = (event, newValue) => {
    if (value !== newValue) {
      // setValue(newValue);
      let val = (log === true) ? Math.exp(newValue) : newValue;
      // sliderChangedCallback(type, index, roundToSignificantFigures(new_val, sigDigits));
      dispatch(sliderValueChanged(typeHandeValue, index, roundToSignificantFigures(val, sigDigits)))

    }
  };

  const handleInputChange = (event) => {
    let newValue = event.target.value === '' ? 0 : Number(event.target.value);

    if (value !== newValue) {
      // sliderChangedCallback(type, index, roundToSignificantFigures(newValue, sigDigits));
      dispatch(sliderValueChanged(typeHandeValue, index, roundToSignificantFigures(newValue, sigDigits)))

      // setValue(newValue);
    }
  };


  // const handleBlur = () => {
  //   if (value < 0) {
  //     setValue(0);
  //   } else if (value > 100) {
  //     setValue(100);
  //   }
  // };

  value = typeof value === 'number' ? value : 0;
  if (log)
    min = (min <= 0) ? max * 1e-6 : min;  // make min value 6 orders of magnitude lower from maximum value 

  let linStep = (max - min) / steps;
  let logStep = (Math.log(max) - Math.log(min)) / steps;

  // calculates the linear step for input field
  let inputStep = log ? Math.exp(Math.log(value) + logStep) - value : linStep;
  inputStep = roundToSignificantFigures(inputStep, 3)

  // console.log(inputStep);

  //   function valueLabelFormat(value) {
  //     const [coefficient, exponent] = value
  //       .toExponential()
  //       .split('e')
  //       .map((item) => Number(item));
  //     return `${Math.round(coefficient)}e^${exponent}`;
  //   }

  return (
    <div >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <ToggleButton
            // value='check'
            selected={log}
            disabled={disabled}
            onChange={() => dispatch(sliderVarsChanged(typeHandleVars, index, min, max, !log))}

          >Log</ToggleButton>
        </Grid>
        <Grid item xs>
          <MySlider
            value={log ? Math.log(value) : value}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={log ? Math.log(min) : min}
            max={log ? Math.log(max) : max}
            step={log ? logStep : linStep}
            //className={classes.root}
            color={color}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            margin="dense"
            className={classes.input}
            // multiline={true}
            onChange={handleInputChange}
            // onBlur={handleBlur}
            inputProps={{
              min: min,
              max: max,
              step: inputStep,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </div>
  );

  // return (
  //   <div >
  //     <Grid container spacing={2} alignItems="center">
  //       <Grid item xs>
  //         {forwardRateSlider ? (
  //         <BlueSlider
  //           value={typeof value === 'number' ? value : 0}
  //           onChange={handleSliderChange}
  //           aria-labelledby="input-slider"
  //           min={typeof min === 'undefined' ? 0 : min}
  //           max={typeof max === 'undefined' ? 100 : max}
  //           step={typeof step === 'undefined' ? 1 : step}
  //         />)
  //         : (
  //           <RedSlider
  //           value={typeof value === 'number' ? value : 0}
  //           onChange={handleSliderChange}
  //           aria-labelledby="input-slider"
  //           min={typeof min === 'undefined' ? 0 : min}
  //           max={typeof max === 'undefined' ? 100 : max}
  //           step={typeof step === 'undefined' ? 1 : step}
  //           disabled={disabled}
  //         />
  //         )}
  //       </Grid>
  //       <Grid item>
  //         <Input
  //           value={value}
  //           margin="dense"
  //           // multiline={true}
  //           onChange={handleInputChange}
  //           onBlur={handleBlur}
  //           inputProps={{
  //               min: typeof min === 'undefined' ? 0 : min,
  //               max: typeof max === 'undefined' ? 100 : max,
  //               step: typeof step === 'undefined' ? 1 : step,
  //             type: 'number',
  //             'aria-labelledby': 'input-slider',
  //           }}
  //           disabled={disabled}
  //         />
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
}


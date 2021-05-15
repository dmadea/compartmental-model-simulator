import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { schemeChanged } from '../redux/actions/mainPage';


// export default class TextArea extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             text: typeof props.text === 'undefined' ? "" : props.text
//         }
//         // this.callBack = props.modelSubmitCallback;
//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange (event) {
//         this.setState(state => ({text: event.target.value}));
//     };

//     render() {
//         return (
//             <div>
//                 <TextareaAutosize onChange={this.handleChange} aria-label="empty textarea" placeholder="Model..." value={this.state.text}></TextareaAutosize>
//                 <br/>
//                 <Button variant="contained" 
//                     onClick={() => this.props.modelSubmitCallback(this.state.text)} 
//                     color="primary">Submit</Button>
//             </div>
//         );
//     }
// }


export default function TextArea({ modelSubmitCallback }) {
  // const [text, setValue] = React.useState(typeof props.schemeText === 'undefined' ? "" : props.schemeText);
  const schemeText = useSelector(state => state.mainPage.schemeText);
  const dispatch = useDispatch();


  return (
    <div>
      <div className="text-area">
        <TextareaAutosize
          onChange={event => dispatch(schemeChanged(event.target.value))}
          aria-label="empty textarea"
          placeholder=">> Place kinetic model here <<"
          style={{ fontSize: 18, fontFamily: 'Palatino' }}
          value={schemeText}>
        </TextareaAutosize>
      </div>
      <Button variant="contained"
        onClick={() => modelSubmitCallback()}
        color="primary">Submit</Button>
    </div>
  );
}

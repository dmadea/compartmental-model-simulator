import { useState, React } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';


export default function PlotlyGraph() {

    const state = useSelector(state => state.mainPage.figure);

    return (
      <Plot
        data={state.data}
        layout={ state.layout }
        config={state.config}
        frames={state.frames}
        // onUpdate={figure => console.log('on update')}
        revision={state.revision}
        useResizeHandler={true}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    );
}

/*export default function PlotlyGraph(props) {

  // const [data, setData] = React.useState(props.graphData);
  // const [frames, setFrames] = React.useState([]);
  // const [layout, setLayout] = React.useState(layout);
  // const [config, setConfig] = React.useState({scrollZoom: true, responsive: false});

  const [figure, setFigure] = useState({
    data: [],
    layout: {
      xaxis: {
        title: 'Time',
        showgrid: true,
        zeroline: false,
        linecolor: 'black',
        linewidth: 1,
        mirror: true
      },
      yaxis: {
          title: 'Concentration',
          showgrid: true,
          zeroline: false,
          // type: 'log',
          linecolor: 'black',
          linewidth: 1,
          mirror: true
      }
    },
    frames: [], 
    config: {scrollZoom: true, responsive: false}
  });

  console.log('function called');
  
  function onUpdate(figure) {
    console.log('on update');

    figure.data = props.graphData

    setFigure(figure)
  }

  function onInitialized(figure) {
    console.log("on initialized")
    setFigure(figure)
  }

  return (
    <Plot
      data={figure.data}
      layout={figure.layout}
      frames={figure.frames}
      config={figure.config}
      onInitialized={onInitialized}
      onUpdate={onUpdate}
      //onHover={console.log('onHover')}
    />
  );
}*/
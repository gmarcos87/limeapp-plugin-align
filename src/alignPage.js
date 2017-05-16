import { h, Component } from 'preact';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { changeInterface, changeStation, startAlign, stopTimer } from './alignActions';

import { getAll, getSelectedHost } from './alignSelectors';

import colorScale from 'simple-color-scale';
colorScale.setConfig({
  outputStart:1,
  outputEnd:85,
  inputStart:65,
  inputEnd:100
});

const style = {
  signal: {
    fontSize: '20vh',
    margin: '0.5rem',
    display: 'block',
    textAlign: 'center'
  },
  bar: {
    display: 'block',
    height: '5px'
  },
  hostname: {
    display: 'block',
    textAlign: 'center'
  },
  block: {
    width:'100%'
  }
};

class Align extends Component {

  componentWillMount() {
    this.props.startAlign();
  }

  componentWillUnmount() {
    this.props.stopAlign();
  }

  render(state) {
    return (
      <div className="container" style={{paddingTop:'100px'}}>
        <div className="row">
          <div className="six columns">
            <span style={style.hostname}>
              {this.props.selectedHost || ''}
            </span>
            <h1 style={style.signal}>
              {state.alignData.currentReading.signal || 0}
              <span style={Object.assign(style.bar,{backgroundColor:colorScale.getColor(state.alignData.currentReading.signal || 0)})}></span>
            </h1>
            <span style={style.hostname}>
              {state.alignData.currentReading.hostname || ''}
            </span>
          </div>
          <div className="six columns">
            <label>{I18n.t('Intefaces')}</label>
            <select style={style.block} onChange={(e)=>{ this.props.changeInterface(e.target.value); }} value={state.alignData.currentReading.iface ? state.alignData.currentReading.iface : null }>
              {state.alignData.ifaces.map((iface)=> {
                return <option value={iface.name}>{iface.name}</option>;
              })}
            </select>
            <label>{I18n.t('Stations')}</label>
            <select  style={style.block} onChange={(e) => { this.props.changeStation(e.target.value); }} value={state.alignData.currentReading.mac ? state.alignData.currentReading.mac : null }>
              {state.alignData.stations.map((station)=> {
                return <option value={station.mac}>{station.hostname}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    alignData: getAll(state),
    selectedHost: getSelectedHost(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeInterface : bindActionCreators(changeInterface, dispatch),
    changeStation : bindActionCreators(changeStation, dispatch),
    startAlign: bindActionCreators(startAlign, dispatch),
    stopAlign: bindActionCreators(stopTimer,dispatch)
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Align);

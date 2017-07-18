import { getInterfaces, getStations, getIfaceStation, getStationSignal} from './alignApi';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
  IFACES_LOAD,
  IFACES_LOAD_SUCCESS,
  IFACE_SET,
  IFACE_CHANGE,
  STATIONS_LOAD,
  STATIONS_LOAD_SUCCESS,
  STATION_SET,
  TIMER_START,
  TIMER_STOP,
  SIGNAL_GET,
  SIGNAL_GET_SUCCESS,
  INIT_ALIGN
} from './alignConstants';


// LOAD INTERFACES -> Dispatch success and stations loads
const ifaceLoad = ( action$, { getState }, { wsAPI } ) =>
  action$.ofType(...[IFACES_LOAD])
    .mergeMap((action) => getInterfaces(wsAPI, getState().meta.sid))
      .mergeMap((payload) => Observable.from([
        ({ type: IFACES_LOAD_SUCCESS, payload }),
        ({ type: STATIONS_LOAD })
      ]));


// LOAD ALL STATIONS -> Dispatch success and Init Align
const allStationsLoad = (action$, { getState }, { wsAPI }  ) =>
  action$.ofType(STATIONS_LOAD)
    .mergeMap(() => getStations(wsAPI, getState().meta.sid))
      .map((payload) => ({ type: STATIONS_LOAD_SUCCESS, payload }))
      .catch(error => Observable.of({
        type: 'NOTIFICATION',
        payload: { msg: 'Not stations in interfaces' },
        error: true
      }));

// CHANGE INTEFACE -> DIspatch get station by interface and select best signal
const ifaceChange = (action$, { getState }, { wsAPI } ) =>
  action$.ofType(IFACE_CHANGE)
    .mergeMap((action) => getIfaceStation(wsAPI, getState().meta.sid, action.payload.iface))
    .map( payload => payload.nodes)
    .map((payload) => ({ type: STATIONS_LOAD_SUCCESS, payload }))
    .catch(error => Observable.of({
      type: 'NOTIFICATION',
      payload: { msg: 'Not stations in interface' },
      error: true
    }));

// INIT ALIGN -> Select best node, interface and start timer
const initAlign = (action$ ) =>
  action$.ofType(STATIONS_LOAD_SUCCESS)
    .map(action => action.payload)
    .map(payload => {
      return payload.sort((x, y) => x.signal + y.signal)[0];
    })
    .mergeMap((res) => Observable.from([
          ({ type: STATION_SET, payload: res }),
          ({ type: IFACE_SET, payload: res.iface }),
          ({ type: TIMER_START })]));


// GET_SIGNAL -> Update current signal and nodes
const getSignal = ( action$, { getState}, { wsAPI } ) =>
  action$.ofType(SIGNAL_GET)
    .switchMap(() => getStationSignal(wsAPI, getState().meta.sid, getState().align.currentReading))
      .map( signal => ({ type: SIGNAL_GET_SUCCESS, payload: signal }));

// TIMER MANAGER
const runTimer = ( action$, { getState} ) =>
  action$.ofType(TIMER_START)
    .mergeMap((actions) => {
      return Observable.interval(getState().meta.interval)
        .takeUntil(action$.ofType(TIMER_STOP))
        .map(() => ({ type: SIGNAL_GET }));
    });

export default { ifaceLoad, allStationsLoad, ifaceChange, initAlign, getSignal, runTimer};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alignApi = require('./alignApi');

var _Rx = require('rxjs/Rx');

require('rxjs/add/observable/from');

require('rxjs/add/observable/of');

require('rxjs/add/observable/interval');

require('rxjs/add/operator/takeUntil');

require('rxjs/add/operator/mergeMap');

require('rxjs/add/operator/switchMap');

require('rxjs/add/operator/mapTo');

require('rxjs/add/operator/map');

require('rxjs/add/operator/catch');

var _alignConstants = require('./alignConstants');

// LOAD INTERFACES -> Dispatch success and stations loads
var ifaceLoad = function ifaceLoad(action$, _ref, _ref2) {
  var getState = _ref.getState;
  var wsAPI = _ref2.wsAPI;
  return action$.ofType.apply(action$, [_alignConstants.IFACES_LOAD]).mergeMap(function (action) {
    return (0, _alignApi.getInterfaces)(wsAPI, getState().meta.sid);
  }).mergeMap(function (payload) {
    return _Rx.Observable.from([{ type: _alignConstants.IFACES_LOAD_SUCCESS, payload: payload }, { type: _alignConstants.STATIONS_LOAD }]);
  });
};

// LOAD ALL STATIONS -> Dispatch success and Init Align
var allStationsLoad = function allStationsLoad(action$, _ref3, _ref4) {
  var getState = _ref3.getState;
  var wsAPI = _ref4.wsAPI;
  return action$.ofType(_alignConstants.STATIONS_LOAD).mergeMap(function () {
    return (0, _alignApi.getStations)(wsAPI, getState().meta.sid);
  }).map(function (payload) {
    return { type: _alignConstants.STATIONS_LOAD_SUCCESS, payload: payload };
  }).catch(function (error) {
    return _Rx.Observable.of({
      type: 'NOTIFICATION',
      payload: { msg: 'Not stations in interfaces' },
      error: true
    });
  });
};

// CHANGE INTEFACE -> DIspatch get station by interface and select best signal
var ifaceChange = function ifaceChange(action$, _ref5, _ref6) {
  var getState = _ref5.getState;
  var wsAPI = _ref6.wsAPI;
  return action$.ofType(_alignConstants.IFACE_CHANGE).mergeMap(function (action) {
    return (0, _alignApi.getIfaceStation)(wsAPI, getState().meta.sid, action.payload.iface);
  }).map(function (payload) {
    return payload.nodes;
  }).map(function (payload) {
    return { type: _alignConstants.STATIONS_LOAD_SUCCESS, payload: payload };
  }).catch(function (error) {
    return _Rx.Observable.of({
      type: 'NOTIFICATION',
      payload: { msg: 'Not stations in interface' },
      error: true
    });
  });
};

// INIT ALIGN -> Select best node, interface and start timer
var initAlign = function initAlign(action$) {
  return action$.ofType(_alignConstants.STATIONS_LOAD_SUCCESS).map(function (action) {
    return action.payload;
  }).map(function (payload) {
    return payload.sort(function (x, y) {
      return x.signal + y.signal;
    })[0];
  }).mergeMap(function (res) {
    return _Rx.Observable.from([{ type: _alignConstants.STATION_SET, payload: res }, { type: _alignConstants.IFACE_SET, payload: res.iface }, { type: _alignConstants.TIMER_START }]);
  });
};

// GET_SIGNAL -> Update current signal and nodes
var getSignal = function getSignal(action$, _ref7, _ref8) {
  var getState = _ref7.getState;
  var wsAPI = _ref8.wsAPI;
  return action$.ofType(_alignConstants.SIGNAL_GET).switchMap(function () {
    return (0, _alignApi.getStationSignal)(wsAPI, getState().meta.sid, getState().align.currentReading);
  }).map(function (signal) {
    return { type: _alignConstants.SIGNAL_GET_SUCCESS, payload: signal };
  });
};

// TIMER MANAGER
var runTimer = function runTimer(action$, _ref9) {
  var getState = _ref9.getState;
  return action$.ofType(_alignConstants.TIMER_START).mergeMap(function (actions) {
    return _Rx.Observable.interval(getState().meta.interval).takeUntil(action$.ofType(_alignConstants.TIMER_STOP)).map(function () {
      return { type: _alignConstants.SIGNAL_GET };
    });
  });
};

exports.default = { ifaceLoad: ifaceLoad, allStationsLoad: allStationsLoad, ifaceChange: ifaceChange, initAlign: initAlign, getSignal: getSignal, runTimer: runTimer };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbGlnbkVwaWNzLmpzIl0sIm5hbWVzIjpbImlmYWNlTG9hZCIsImFjdGlvbiQiLCJnZXRTdGF0ZSIsIndzQVBJIiwib2ZUeXBlIiwibWVyZ2VNYXAiLCJhY3Rpb24iLCJtZXRhIiwic2lkIiwicGF5bG9hZCIsImZyb20iLCJ0eXBlIiwiYWxsU3RhdGlvbnNMb2FkIiwibWFwIiwiY2F0Y2giLCJvZiIsIm1zZyIsImVycm9yIiwiaWZhY2VDaGFuZ2UiLCJpZmFjZSIsIm5vZGVzIiwiaW5pdEFsaWduIiwic29ydCIsIngiLCJ5Iiwic2lnbmFsIiwicmVzIiwiZ2V0U2lnbmFsIiwic3dpdGNoTWFwIiwiYWxpZ24iLCJjdXJyZW50UmVhZGluZyIsInJ1blRpbWVyIiwiYWN0aW9ucyIsImludGVydmFsIiwidGFrZVVudGlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFnQkE7QUFDQSxJQUFNQSxZQUFZLFNBQVpBLFNBQVksQ0FBRUMsT0FBRjtBQUFBLE1BQWFDLFFBQWIsUUFBYUEsUUFBYjtBQUFBLE1BQTJCQyxLQUEzQixTQUEyQkEsS0FBM0I7QUFBQSxTQUNoQkYsUUFBUUcsTUFBUixnQkFBa0IsNkJBQWxCLEVBQ0dDLFFBREgsQ0FDWSxVQUFDQyxNQUFEO0FBQUEsV0FBWSw2QkFBY0gsS0FBZCxFQUFxQkQsV0FBV0ssSUFBWCxDQUFnQkMsR0FBckMsQ0FBWjtBQUFBLEdBRFosRUFFS0gsUUFGTCxDQUVjLFVBQUNJLE9BQUQ7QUFBQSxXQUFhLGVBQVdDLElBQVgsQ0FBZ0IsQ0FDcEMsRUFBRUMseUNBQUYsRUFBNkJGLGdCQUE3QixFQURvQyxFQUVwQyxFQUFFRSxtQ0FBRixFQUZvQyxDQUFoQixDQUFiO0FBQUEsR0FGZCxDQURnQjtBQUFBLENBQWxCOztBQVNBO0FBQ0EsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFD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TUFBYUMsUUFBYixTQUFhQSxRQUFiO0FBQUEsU0FDZkQsUUFBUUcsTUFBUiw4QkFDR0MsUUFESCxDQUNZLFVBQUMyQixPQUFELEVBQWE7QUFDckIsV0FBTyxlQUFXQyxRQUFYLENBQW9CL0IsV0FBV0ssSUFBWCxDQUFnQjBCLFFBQXBDLEVBQ0pDLFNBREksQ0FDTWpDLFFBQVFHLE1BQVIsNEJBRE4sRUFFSlMsR0FGSSxDQUVBO0FBQUEsYUFBTyxFQUFFRixnQ0FBRixFQUFQO0FBQUEsS0FGQSxDQUFQO0FBR0QsR0FMSCxDQURlO0FBQUEsQ0FBakI7O2tCQVFlLEVBQUVYLG9CQUFGLEVBQWFZLGdDQUFiLEVBQThCTSx3QkFBOUIsRUFBMkNHLG9CQUEzQyxFQUFzRE0sb0JBQXRELEVBQWlFSSxrQkFBakUsRSIsImZpbGUiOiJhbGlnbkVwaWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0SW50ZXJmYWNlcywgZ2V0U3RhdGlvbnMsIGdldElmYWNlU3RhdGlvbiwgZ2V0U3RhdGlvblNpZ25hbH0gZnJvbSAnLi9hbGlnbkFwaSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvaW50ZXJ2YWwnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90YWtlVW50aWwnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tZXJnZU1hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3N3aXRjaE1hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcFRvJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuXG5pbXBvcnQge1xuICBJRkFDRVNfTE9BRCxcbiAgSUZBQ0VTX0xPQURfU1VDQ0VTUyxcbiAgSUZBQ0VfU0VULFxuICBJRkFDRV9DSEFOR0UsXG4gIFNUQVRJT05TX0xPQUQsXG4gIFNUQVRJT05TX0xPQURfU1VDQ0VTUyxcbiAgU1RBVElPTl9TRVQsXG4gIFRJTUVSX1NUQVJULFxuICBUSU1FUl9TVE9QLFxuICBTSUdOQUxfR0VULFxuICBTSUdOQUxfR0VUX1NVQ0NFU1MsXG4gIElOSVRfQUxJR05cbn0gZnJvbSAnLi9hbGlnbkNvbnN0YW50cyc7XG5cblxuLy8gTE9BRCBJTlRFUkZBQ0VTIC0+IERpc3BhdGNoIHN1Y2Nlc3MgYW5kIHN0YXRpb25zIGxvYWRzXG5jb25zdCBpZmFjZUxvYWQgPSAoIGFjdGlvbiQsIHsgZ2V0U3RhdGUgfSwgeyB3c0FQSSB9ICkgPT5cbiAgYWN0aW9uJC5vZlR5cGUoLi4uW0lGQUNFU19MT0FEXSlcbiAgICAubWVyZ2VNYXAoKGFjdGlvbikgPT4gZ2V0SW50ZXJmYWNlcyh3c0FQSSwgZ2V0U3RhdGUoKS5tZXRhLnNpZCkpXG4gICAgICAubWVyZ2VNYXAoKHBheWxvYWQpID0+IE9ic2VydmFibGUuZnJvbShbXG4gICAgICAgICh7IHR5cGU6IElGQUNFU19MT0FEX1NVQ0NFU1MsIHBheWxvYWQgfSksXG4gICAgICAgICh7IHR5cGU6IFNUQVRJT05TX0xPQUQgfSlcbiAgICAgIF0pKTtcblxuXG4vLyBMT0FEIEFMTCBTVEFUSU9OUyAtPiBEaXNwYXRjaCBzdWNjZXNzIGFuZCBJbml0IEFsaWduXG5jb25zdCBhbGxTdGF0aW9uc0xvYWQgPSAoYWN0aW9uJCwgeyBnZXRTdGF0ZSB9LCB7IHdzQVBJIH0gICkgPT5cbiAgYWN0aW9uJC5vZlR5cGUoU1RBVElPTlNfTE9BRClcbiAgICAubWVyZ2VNYXAoKCkgPT4gZ2V0U3RhdGlvbnMod3NBUEksIGdldFN0YXRlKCkubWV0YS5zaWQpKVxuICAgICAgLm1hcCgocGF5bG9hZCkgPT4gKHsgdHlwZTogU1RBVElPTlNfTE9BRF9TVUNDRVNTLCBwYXlsb2FkIH0pKVxuICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2Yoe1xuICAgICAgICB0eXBlOiAnTk9USUZJQ0FUSU9OJyxcbiAgICAgICAgcGF5bG9hZDogeyBtc2c6ICdOb3Qgc3RhdGlvbnMgaW4gaW50ZXJmYWNlcycgfSxcbiAgICAgICAgZXJyb3I6IHRydWVcbiAgICAgIH0pKTtcblxuLy8gQ0hBTkdFIElOVEVGQUNFIC0+IERJc3BhdGNoIGdldCBzdGF0aW9uIGJ5IGludGVyZmFjZSBhbmQgc2VsZWN0IGJlc3Qgc2lnbmFsXG5jb25zdCBpZmFjZUNoYW5nZSA9IChhY3Rpb24kLCB7IGdldFN0YXRlIH0sIHsgd3NBUEkgfSApID0+XG4gIGFjdGlvbiQub2ZUeXBlKElGQUNFX0NIQU5HRSlcbiAgICAubWVyZ2VNYXAoKGFjdGlvbikgPT4gZ2V0SWZhY2VTdGF0aW9uKHdzQVBJLCBnZXRTdGF0ZSgpLm1ldGEuc2lkLCBhY3Rpb24ucGF5bG9hZC5pZmFjZSkpXG4gICAgLm1hcCggcGF5bG9hZCA9PiBwYXlsb2FkLm5vZGVzKVxuICAgIC5tYXAoKHBheWxvYWQpID0+ICh7IHR5cGU6IFNUQVRJT05TX0xPQURfU1VDQ0VTUywgcGF5bG9hZCB9KSlcbiAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih7XG4gICAgICB0eXBlOiAnTk9USUZJQ0FUSU9OJyxcbiAgICAgIHBheWxvYWQ6IHsgbXNnOiAnTm90IHN0YXRpb25zIGluIGludGVyZmFjZScgfSxcbiAgICAgIGVycm9yOiB0cnVlXG4gICAgfSkpO1xuXG4vLyBJTklUIEFMSUdOIC0+IFNlbGVjdCBiZXN0IG5vZGUsIGludGVyZmFjZSBhbmQgc3RhcnQgdGltZXJcbmNvbnN0IGluaXRBbGlnbiA9IChhY3Rpb24kICkgPT5cbiAgYWN0aW9uJC5vZlR5cGUoU1RBVElPTlNfTE9BRF9TVUNDRVNTKVxuICAgIC5tYXAoYWN0aW9uID0+IGFjdGlvbi5wYXlsb2FkKVxuICAgIC5tYXAocGF5bG9hZCA9PiB7XG4gICAgICByZXR1cm4gcGF5bG9hZC5zb3J0KCh4LCB5KSA9PiB4LnNpZ25hbCArIHkuc2lnbmFsKVswXTtcbiAgICB9KVxuICAgIC5tZXJnZU1hcCgocmVzKSA9PiBPYnNlcnZhYmxlLmZyb20oW1xuICAgICAgICAgICh7IHR5cGU6IFNUQVRJT05fU0VULCBwYXlsb2FkOiByZXMgfSksXG4gICAgICAgICAgKHsgdHlwZTogSUZBQ0VfU0VULCBwYXlsb2FkOiByZXMuaWZhY2UgfSksXG4gICAgICAgICAgKHsgdHlwZTogVElNRVJfU1RBUlQgfSldKSk7XG5cblxuLy8gR0VUX1NJR05BTCAtPiBVcGRhdGUgY3VycmVudCBzaWduYWwgYW5kIG5vZGVzXG5jb25zdCBnZXRTaWduYWwgPSAoIGFjdGlvbiQsIHsgZ2V0U3RhdGV9LCB7IHdzQVBJIH0gKSA9PlxuICBhY3Rpb24kLm9mVHlwZShTSUdOQUxfR0VUKVxuICAgIC5zd2l0Y2hNYXAoKCkgPT4gZ2V0U3RhdGlvblNpZ25hbCh3c0FQSSwgZ2V0U3RhdGUoKS5tZXRhLnNpZCwgZ2V0U3RhdGUoKS5hbGlnbi5jdXJyZW50UmVhZGluZykpXG4gICAgICAubWFwKCBzaWduYWwgPT4gKHsgdHlwZTogU0lHTkFMX0dFVF9TVUNDRVNTLCBwYXlsb2FkOiBzaWduYWwgfSkpO1xuXG4vLyBUSU1FUiBNQU5BR0VSXG5jb25zdCBydW5UaW1lciA9ICggYWN0aW9uJCwgeyBnZXRTdGF0ZX0gKSA9PlxuICBhY3Rpb24kLm9mVHlwZShUSU1FUl9TVEFSVClcbiAgICAubWVyZ2VNYXAoKGFjdGlvbnMpID0+IHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmludGVydmFsKGdldFN0YXRlKCkubWV0YS5pbnRlcnZhbClcbiAgICAgICAgLnRha2VVbnRpbChhY3Rpb24kLm9mVHlwZShUSU1FUl9TVE9QKSlcbiAgICAgICAgLm1hcCgoKSA9PiAoeyB0eXBlOiBTSUdOQUxfR0VUIH0pKTtcbiAgICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgeyBpZmFjZUxvYWQsIGFsbFN0YXRpb25zTG9hZCwgaWZhY2VDaGFuZ2UsIGluaXRBbGlnbiwgZ2V0U2lnbmFsLCBydW5UaW1lcn07Il19
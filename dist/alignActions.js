'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopTimer = exports.startAlign = exports.changeStation = exports.changeInterface = undefined;

var _alignConstants = require('./alignConstants');

var changeInterface = exports.changeInterface = function changeInterface(iface) {
  return function (dispatch, getState) {
    if (iface === getState().align.currentReading.iface) {
      return;
    }
    dispatch({
      type: _alignConstants.IFACE_CHANGE,
      payload: {
        iface: iface
      }
    });
  };
};

var changeStation = exports.changeStation = function changeStation(mac) {
  return function (dispatch, getState) {
    if (mac === getState().align.currentReading.mac) {
      return;
    }
    dispatch({
      type: _alignConstants.STATION_SET,
      payload: getState().align.stations.filter(function (x) {
        return x.mac === mac;
      })[0]
    });
  };
};

var startAlign = exports.startAlign = function startAlign() {
  return function (dispatch) {
    dispatch({
      type: _alignConstants.IFACES_LOAD
    });
  };
};

var stopTimer = exports.stopTimer = function stopTimer() {
  return function (dispatch) {
    dispatch({
      type: _alignConstants.TIMER_STOP
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbGlnbkFjdGlvbnMuanMiXSwibmFtZXMiOlsiY2hhbmdlSW50ZXJmYWNlIiwiaWZhY2UiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiYWxpZ24iLCJjdXJyZW50UmVhZGluZyIsInR5cGUiLCJwYXlsb2FkIiwiY2hhbmdlU3RhdGlvbiIsIm1hYyIsInN0YXRpb25zIiwiZmlsdGVyIiwieCIsInN0YXJ0QWxpZ24iLCJzdG9wVGltZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFPTyxJQUFNQSw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQ7QUFBQSxTQUFXLFVBQUNDLFFBQUQsRUFBV0MsUUFBWCxFQUF3QjtBQUNoRSxRQUFJRixVQUFVRSxXQUFXQyxLQUFYLENBQWlCQyxjQUFqQixDQUFnQ0osS0FBOUMsRUFBcUQ7QUFDbkQ7QUFDRDtBQUNEQyxhQUFTO0FBQ1BJLHdDQURPO0FBRVBDLGVBQVM7QUFDUE47QUFETztBQUZGLEtBQVQ7QUFNRCxHQVY4QjtBQUFBLENBQXhCOztBQVlBLElBQU1PLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ0MsR0FBRDtBQUFBLFNBQVMsVUFBQ1AsUUFBRCxFQUFXQyxRQUFYLEVBQXdCO0FBQzVELFFBQUlNLFFBQVFOLFdBQVdDLEtBQVgsQ0FBaUJDLGNBQWpCLENBQWdDSSxHQUE1QyxFQUFpRDtBQUMvQztBQUNEO0FBQ0RQLGFBQVM7QUFDUEksdUNBRE87QUFFUEMsZUFBU0osV0FBV0MsS0FBWCxDQUFpQk0sUUFBakIsQ0FBMEJDLE1BQTFCLENBQWlDO0FBQUEsZUFBS0MsRUFBRUgsR0FBRixLQUFVQSxHQUFmO0FBQUEsT0FBakMsRUFBcUQsQ0FBckQ7QUFGRixLQUFUO0FBSUQsR0FSNEI7QUFBQSxDQUF0Qjs7QUFVQSxJQUFNSSxrQ0FBYSxTQUFiQSxVQUFhO0FBQUEsU0FBTSxVQUFDWCxRQUFELEVBQWM7QUFDNUNBLGFBQVM7QUFDUEk7QUFETyxLQUFUO0FBR0QsR0FKeUI7QUFBQSxDQUFuQjs7QUFNQSxJQUFNUSxnQ0FBWSxTQUFaQSxTQUFZO0FBQUEsU0FBTSxVQUFDWixRQUFELEVBQWM7QUFDM0NBLGFBQVM7QUFDUEk7QUFETyxLQUFUO0FBR0QsR0FKd0I7QUFBQSxDQUFsQiIsImZpbGUiOiJhbGlnbkFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJRkFDRV9DSEFOR0UsXG4gIFNUQVRJT05fU0VULFxuICBJRkFDRVNfTE9BRCxcbiAgVElNRVJfU1RPUFxufSBmcm9tICcuL2FsaWduQ29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IGNoYW5nZUludGVyZmFjZSA9IChpZmFjZSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBpZiAoaWZhY2UgPT09IGdldFN0YXRlKCkuYWxpZ24uY3VycmVudFJlYWRpbmcuaWZhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IElGQUNFX0NIQU5HRSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBpZmFjZVxuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2hhbmdlU3RhdGlvbiA9IChtYWMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgaWYgKG1hYyA9PT0gZ2V0U3RhdGUoKS5hbGlnbi5jdXJyZW50UmVhZGluZy5tYWMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFNUQVRJT05fU0VULFxuICAgIHBheWxvYWQ6IGdldFN0YXRlKCkuYWxpZ24uc3RhdGlvbnMuZmlsdGVyKHggPT4geC5tYWMgPT09IG1hYylbMF1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3RhcnRBbGlnbiA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTpJRkFDRVNfTE9BRFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzdG9wVGltZXIgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6VElNRVJfU1RPUFxuICB9KTtcbn07Il19
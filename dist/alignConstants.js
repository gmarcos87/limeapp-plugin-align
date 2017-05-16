'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var IFACES_LOAD = exports.IFACES_LOAD = 'align/IFACES_LOAD';
var IFACES_LOAD_SUCCESS = exports.IFACES_LOAD_SUCCESS = 'align/IFACES_LOAD_SUCCESS';
var IFACE_SET = exports.IFACE_SET = 'align/IFACE_SET';
var IFACE_CHANGE = exports.IFACE_CHANGE = 'align/IFACE_CHANGE';

var STATIONS_LOAD = exports.STATIONS_LOAD = 'align/STATIONS_LOAD';
var STATIONS_LOAD_SUCCESS = exports.STATIONS_LOAD_SUCCESS = 'align/STATIONS_LOAD_SUCCESS';
var STATION_SET = exports.STATION_SET = 'align/STATION_SET';

var SIGNAL_GET = exports.SIGNAL_GET = 'align/SIGNAL_GET';
var SIGNAL_GET_SUCCESS = exports.SIGNAL_GET_SUCCESS = 'align/SIGNAL_GET_SUCCESS';

var TIMER_START = exports.TIMER_START = 'align/TIMER_START';
var TIMER_STOP = exports.TIMER_STOP = 'align/TIMER_STOP';

var INIT_ALIGN = exports.INIT_ALIGN = 'align/INIT_ALIGN';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbGlnbkNvbnN0YW50cy5qcyJdLCJuYW1lcyI6WyJJRkFDRVNfTE9BRCIsIklGQUNFU19MT0FEX1NVQ0NFU1MiLCJJRkFDRV9TRVQiLCJJRkFDRV9DSEFOR0UiLCJTVEFUSU9OU19MT0FEIiwiU1RBVElPTlNfTE9BRF9TVUNDRVNTIiwiU1RBVElPTl9TRVQiLCJTSUdOQUxfR0VUIiwiU0lHTkFMX0dFVF9TVUNDRVNTIiwiVElNRVJfU1RBUlQiLCJUSU1FUl9TVE9QIiwiSU5JVF9BTElHTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxJQUFNQSxvQ0FBYyxtQkFBcEI7QUFDQSxJQUFNQyxvREFBc0IsMkJBQTVCO0FBQ0EsSUFBTUMsZ0NBQVksaUJBQWxCO0FBQ0EsSUFBTUMsc0NBQWUsb0JBQXJCOztBQUVBLElBQU1DLHdDQUFnQixxQkFBdEI7QUFDQSxJQUFNQyx3REFBd0IsNkJBQTlCO0FBQ0EsSUFBTUMsb0NBQWMsbUJBQXBCOztBQUVBLElBQU1DLGtDQUFhLGtCQUFuQjtBQUNBLElBQU1DLGtEQUFxQiwwQkFBM0I7O0FBRUEsSUFBTUMsb0NBQWMsbUJBQXBCO0FBQ0EsSUFBTUMsa0NBQWEsa0JBQW5COztBQUVBLElBQU1DLGtDQUFhLGtCQUFuQiIsImZpbGUiOiJhbGlnbkNvbnN0YW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBJRkFDRVNfTE9BRCA9ICdhbGlnbi9JRkFDRVNfTE9BRCc7XG5leHBvcnQgY29uc3QgSUZBQ0VTX0xPQURfU1VDQ0VTUyA9ICdhbGlnbi9JRkFDRVNfTE9BRF9TVUNDRVNTJztcbmV4cG9ydCBjb25zdCBJRkFDRV9TRVQgPSAnYWxpZ24vSUZBQ0VfU0VUJztcbmV4cG9ydCBjb25zdCBJRkFDRV9DSEFOR0UgPSAnYWxpZ24vSUZBQ0VfQ0hBTkdFJztcblxuZXhwb3J0IGNvbnN0IFNUQVRJT05TX0xPQUQgPSAnYWxpZ24vU1RBVElPTlNfTE9BRCc7XG5leHBvcnQgY29uc3QgU1RBVElPTlNfTE9BRF9TVUNDRVNTID0gJ2FsaWduL1NUQVRJT05TX0xPQURfU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgU1RBVElPTl9TRVQgPSAnYWxpZ24vU1RBVElPTl9TRVQnO1xuXG5leHBvcnQgY29uc3QgU0lHTkFMX0dFVCA9ICdhbGlnbi9TSUdOQUxfR0VUJztcbmV4cG9ydCBjb25zdCBTSUdOQUxfR0VUX1NVQ0NFU1MgPSAnYWxpZ24vU0lHTkFMX0dFVF9TVUNDRVNTJztcblxuZXhwb3J0IGNvbnN0IFRJTUVSX1NUQVJUID0gJ2FsaWduL1RJTUVSX1NUQVJUJztcbmV4cG9ydCBjb25zdCBUSU1FUl9TVE9QID0gJ2FsaWduL1RJTUVSX1NUT1AnO1xuXG5leHBvcnQgY29uc3QgSU5JVF9BTElHTiA9ICdhbGlnbi9JTklUX0FMSUdOJztcblxuIl19
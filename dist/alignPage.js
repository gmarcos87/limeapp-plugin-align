'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _redux = require('redux');

var _preactRedux = require('preact-redux');

var _alignActions = require('./alignActions');

var _alignSelectors = require('./alignSelectors');

var _simpleColorScale = require('simple-color-scale');

var _simpleColorScale2 = _interopRequireDefault(_simpleColorScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_simpleColorScale2.default.setConfig({
  outputStart: 1,
  outputEnd: 85,
  inputStart: 65,
  inputEnd: 100
});

//Eperimental text-to-speech
var synth = window.speechSynthesis;
var voices = synth.getVoices();

var speech = function speech(text, lang, voices, synth) {
  var utterThis = new SpeechSynthesisUtterance(text);
  utterThis.pitch = 0.9;
  utterThis.rate = 2.2;
  utterThis.voice = voices.filter(function (x) {
    return x.name === lang;
  })[0];
  synth.speak(utterThis);
};

var style = {
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
    width: '100%'
  }
};

var Align = function (_Component) {
  _inherits(Align, _Component);

  function Align() {
    _classCallCheck(this, Align);

    return _possibleConstructorReturn(this, (Align.__proto__ || Object.getPrototypeOf(Align)).apply(this, arguments));
  }

  _createClass(Align, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.startAlign();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.stopAlign();
    }
  }, {
    key: 'render',
    value: function render(state) {
      var _this2 = this;

      speech(state.alignData.currentReading.signal * -1 || 0, 'es-ES', voices, synth);
      return (0, _preact.h)(
        'div',
        { className: 'container', style: { paddingTop: '100px' } },
        (0, _preact.h)(
          'div',
          { className: 'row' },
          (0, _preact.h)(
            'div',
            { className: 'six columns' },
            (0, _preact.h)(
              'span',
              { style: style.hostname },
              this.props.selectedHost || ''
            ),
            (0, _preact.h)(
              'h1',
              { style: style.signal },
              state.alignData.currentReading.signal || 0,
              (0, _preact.h)('span', { style: Object.assign(style.bar, { backgroundColor: _simpleColorScale2.default.getColor(state.alignData.currentReading.signal || 0) }) })
            ),
            (0, _preact.h)(
              'span',
              { style: style.hostname },
              state.alignData.currentReading.hostname || ''
            )
          ),
          (0, _preact.h)(
            'div',
            { className: 'six columns' },
            (0, _preact.h)(
              'label',
              null,
              I18n.t('Intefaces')
            ),
            (0, _preact.h)(
              'select',
              { style: style.block, onChange: function onChange(e) {
                  _this2.props.changeInterface(e.target.value);
                }, value: state.alignData.currentReading.iface ? state.alignData.currentReading.iface : null },
              state.alignData.ifaces.map(function (iface) {
                return (0, _preact.h)(
                  'option',
                  { value: iface.name },
                  iface.name
                );
              })
            ),
            (0, _preact.h)(
              'label',
              null,
              I18n.t('Stations')
            ),
            (0, _preact.h)(
              'select',
              { style: style.block, onChange: function onChange(e) {
                  _this2.props.changeStation(e.target.value);
                }, value: state.alignData.currentReading.mac ? state.alignData.currentReading.mac : null },
              state.alignData.stations.map(function (station) {
                return (0, _preact.h)(
                  'option',
                  { value: station.mac },
                  station.hostname
                );
              })
            )
          )
        )
      );
    }
  }]);

  return Align;
}(_preact.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    alignData: (0, _alignSelectors.getAll)(state),
    selectedHost: (0, _alignSelectors.getSelectedHost)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    changeInterface: (0, _redux.bindActionCreators)(_alignActions.changeInterface, dispatch),
    changeStation: (0, _redux.bindActionCreators)(_alignActions.changeStation, dispatch),
    startAlign: (0, _redux.bindActionCreators)(_alignActions.startAlign, dispatch),
    stopAlign: (0, _redux.bindActionCreators)(_alignActions.stopTimer, dispatch)
  };
};

exports.default = (0, _preactRedux.connect)(mapStateToProps, mapDispatchToProps)(Align);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbGlnblBhZ2UuanMiXSwibmFtZXMiOlsic2V0Q29uZmlnIiwib3V0cHV0U3RhcnQiLCJvdXRwdXRFbmQiLCJpbnB1dFN0YXJ0IiwiaW5wdXRFbmQiLCJzeW50aCIsIndpbmRvdyIsInNwZWVjaFN5bnRoZXNpcyIsInZvaWNlcyIsImdldFZvaWNlcyIsInNwZWVjaCIsInRleHQiLCJsYW5nIiwidXR0ZXJUaGlzIiwiU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlIiwicGl0Y2giLCJyYXRlIiwidm9pY2UiLCJmaWx0ZXIiLCJ4IiwibmFtZSIsInNwZWFrIiwic3R5bGUiLCJzaWduYWwiLCJmb250U2l6ZSIsIm1hcmdpbiIsImRpc3BsYXkiLCJ0ZXh0QWxpZ24iLCJiYXIiLCJoZWlnaHQiLCJob3N0bmFtZSIsImJsb2NrIiwid2lkdGgiLCJBbGlnbiIsInByb3BzIiwic3RhcnRBbGlnbiIsInN0b3BBbGlnbiIsInN0YXRlIiwiYWxpZ25EYXRhIiwiY3VycmVudFJlYWRpbmciLCJwYWRkaW5nVG9wIiwic2VsZWN0ZWRIb3N0IiwiT2JqZWN0IiwiYXNzaWduIiwiYmFja2dyb3VuZENvbG9yIiwiZ2V0Q29sb3IiLCJJMThuIiwidCIsImUiLCJjaGFuZ2VJbnRlcmZhY2UiLCJ0YXJnZXQiLCJ2YWx1ZSIsImlmYWNlIiwiaWZhY2VzIiwibWFwIiwiY2hhbmdlU3RhdGlvbiIsIm1hYyIsInN0YXRpb25zIiwic3RhdGlvbiIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFDQSwyQkFBV0EsU0FBWCxDQUFxQjtBQUNuQkMsZUFBWSxDQURPO0FBRW5CQyxhQUFVLEVBRlM7QUFHbkJDLGNBQVcsRUFIUTtBQUluQkMsWUFBUztBQUpVLENBQXJCOztBQU9BO0FBQ0EsSUFBSUMsUUFBUUMsT0FBT0Ms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QVcsd0RBQTZCeUIsUUFBN0I7QUFKTixHQUFQO0FBTUQsQ0FQRDs7a0JBV2UsMEJBQVFGLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2QzNCLEtBQTdDLEMiLCJmaWxlIjoiYWxpZ25QYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBjaGFuZ2VJbnRlcmZhY2UsIGNoYW5nZVN0YXRpb24sIHN0YXJ0QWxpZ24sIHN0b3BUaW1lciB9IGZyb20gJy4vYWxpZ25BY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0QWxsLCBnZXRTZWxlY3RlZEhvc3QgfSBmcm9tICcuL2FsaWduU2VsZWN0b3JzJztcblxuaW1wb3J0IGNvbG9yU2NhbGUgZnJvbSAnc2ltcGxlLWNvbG9yLXNjYWxlJztcbmNvbG9yU2NhbGUuc2V0Q29uZmlnKHtcbiAgb3V0cHV0U3RhcnQ6MSxcbiAgb3V0cHV0RW5kOjg1LFxuICBpbnB1dFN0YXJ0OjY1LFxuICBpbnB1dEVuZDoxMDBcbn0pO1xuXG4vL0VwZXJpbWVudGFsIHRleHQtdG8tc3BlZWNoXG5sZXQgc3ludGggPSB3aW5kb3cuc3BlZWNoU3ludGhlc2lzO1xubGV0IHZvaWNlcyA9IHN5bnRoLmdldFZvaWNlcygpO1xuXG5jb25zdCBzcGVlY2ggPSAodGV4dCwgbGFuZywgdm9pY2VzLCBzeW50aCkgPT4ge1xuICBsZXQgdXR0ZXJUaGlzID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSh0ZXh0KTtcbiAgdXR0ZXJUaGlzLnBpdGNoID0gMC45O1xuICB1dHRlclRoaXMucmF0ZSA9IDIuMjtcbiAgdXR0ZXJUaGlzLnZvaWNlID0gdm9pY2VzLmZpbHRlcih4ID0+IHgubmFtZSA9PT0gbGFuZylbMF07XG4gIHN5bnRoLnNwZWFrKHV0dGVyVGhpcyk7XG59O1xuXG5cbmNvbnN0IHN0eWxlID0ge1xuICBzaWduYWw6IHtcbiAgICBmb250U2l6ZTogJzIwdmgnLFxuICAgIG1hcmdpbjogJzAuNXJlbScsXG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gIH0sXG4gIGJhcjoge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgaGVpZ2h0OiAnNXB4J1xuICB9LFxuICBob3N0bmFtZToge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICB9LFxuICBibG9jazoge1xuICAgIHdpZHRoOicxMDAlJ1xuICB9XG59O1xuXG5jbGFzcyBBbGlnbiBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMuc3RhcnRBbGlnbigpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5zdG9wQWxpZ24oKTtcbiAgfVxuXG4gIHJlbmRlcihzdGF0ZSkge1xuICAgIHNwZWVjaChzdGF0ZS5hbGlnbkRhdGEuY3VycmVudFJlYWRpbmcuc2lnbmFsKi0xIHx8IDAsICdlcy1FUycsIHZvaWNlcywgc3ludGgpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIHN0eWxlPXt7cGFkZGluZ1RvcDonMTAwcHgnfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaXggY29sdW1uc1wiPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlLmhvc3RuYW1lfT5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMuc2VsZWN0ZWRIb3N0IHx8ICcnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGgxIHN0eWxlPXtzdHlsZS5zaWduYWx9PlxuICAgICAgICAgICAgICB7c3RhdGUuYWxpZ25EYXRhLmN1cnJlbnRSZWFkaW5nLnNpZ25hbCB8fCAwfVxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17T2JqZWN0LmFzc2lnbihzdHlsZS5iYXIse2JhY2tncm91bmRDb2xvcjpjb2xvclNjYWxlLmdldENvbG9yKHN0YXRlLmFsaWduRGF0YS5jdXJyZW50UmVhZGluZy5zaWduYWwgfHwgMCl9KX0+PC9zcGFuPlxuICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZS5ob3N0bmFtZX0+XG4gICAgICAgICAgICAgIHtzdGF0ZS5hbGlnbkRhdGEuY3VycmVudFJlYWRpbmcuaG9zdG5hbWUgfHwgJyd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaXggY29sdW1uc1wiPlxuICAgICAgICAgICAgPGxhYmVsPntJMThuLnQoJ0ludGVmYWNlcycpfTwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXtzdHlsZS5ibG9ja30gb25DaGFuZ2U9eyhlKT0+eyB0aGlzLnByb3BzLmNoYW5nZUludGVyZmFjZShlLnRhcmdldC52YWx1ZSk7IH19IHZhbHVlPXtzdGF0ZS5hbGlnbkRhdGEuY3VycmVudFJlYWRpbmcuaWZhY2UgPyBzdGF0ZS5hbGlnbkRhdGEuY3VycmVudFJlYWRpbmcuaWZhY2UgOiBudWxsIH0+XG4gICAgICAgICAgICAgIHtzdGF0ZS5hbGlnbkRhdGEuaWZhY2VzLm1hcCgoaWZhY2UpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8b3B0aW9uIHZhbHVlPXtpZmFjZS5uYW1lfT57aWZhY2UubmFtZX08L29wdGlvbj47XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8bGFiZWw+e0kxOG4udCgnU3RhdGlvbnMnKX08L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdCAgc3R5bGU9e3N0eWxlLmJsb2NrfSBvbkNoYW5nZT17KGUpID0+IHsgdGhpcy5wcm9wcy5jaGFuZ2VTdGF0aW9uKGUudGFyZ2V0LnZhbHVlKTsgfX0gdmFsdWU9e3N0YXRlLmFsaWduRGF0YS5jdXJyZW50UmVhZGluZy5tYWMgPyBzdGF0ZS5hbGlnbkRhdGEuY3VycmVudFJlYWRpbmcubWFjIDogbnVsbCB9PlxuICAgICAgICAgICAgICB7c3RhdGUuYWxpZ25EYXRhLnN0YXRpb25zLm1hcCgoc3RhdGlvbik9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxvcHRpb24gdmFsdWU9e3N0YXRpb24ubWFjfT57c3RhdGlvbi5ob3N0bmFtZX08L29wdGlvbj47XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGFsaWduRGF0YTogZ2V0QWxsKHN0YXRlKSxcbiAgICBzZWxlY3RlZEhvc3Q6IGdldFNlbGVjdGVkSG9zdChzdGF0ZSlcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNoYW5nZUludGVyZmFjZSA6IGJpbmRBY3Rpb25DcmVhdG9ycyhjaGFuZ2VJbnRlcmZhY2UsIGRpc3BhdGNoKSxcbiAgICBjaGFuZ2VTdGF0aW9uIDogYmluZEFjdGlvbkNyZWF0b3JzKGNoYW5nZVN0YXRpb24sIGRpc3BhdGNoKSxcbiAgICBzdGFydEFsaWduOiBiaW5kQWN0aW9uQ3JlYXRvcnMoc3RhcnRBbGlnbiwgZGlzcGF0Y2gpLFxuICAgIHN0b3BBbGlnbjogYmluZEFjdGlvbkNyZWF0b3JzKHN0b3BUaW1lcixkaXNwYXRjaClcbiAgfTtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShBbGlnbik7XG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbGlnblBhZ2UuanMiXSwibmFtZXMiOlsic2V0Q29uZmlnIiwib3V0cHV0U3RhcnQiLCJvdXRwdXRFbmQiLCJpbnB1dFN0YXJ0IiwiaW5wdXRFbmQiLCJzdHlsZSIsInNpZ25hbCIsImZvbnRTaXplIiwibWFyZ2luIiwiZGlzcGxheSIsInRleHRBbGlnbiIsImJhciIsImhlaWdodCIsImhvc3RuYW1lIiwiYmxvY2siLCJ3aWR0aCIsIkFsaWduIiwicHJvcHMiLCJzdGFydEFsaWduIiwic3RvcEFsaWduIiwic3RhdGUiLCJwYWRkaW5nVG9wIiwic2VsZWN0ZWRIb3N0IiwiYWxpZ25EYXRhIiwiY3VycmVudFJlYWRpbmciLCJPYmplY3QiLCJhc3NpZ24iLCJiYWNrZ3JvdW5kQ29sb3IiLCJnZXRDb2xvciIsIkkxOG4iLCJ0IiwiZSIsImNoYW5nZUludGVyZmFjZSIsInRhcmdldCIsInZhbHVlIiwiaWZhY2UiLCJpZmFjZXMiLCJtYXAiLCJuYW1lIiwiY2hhbmdlU3RhdGlvbiIsIm1hYyIsInN0YXRpb25zIiwic3RhdGlvbiIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFDQSwyQkFBV0EsU0FBWCxDQUFxQjtBQUNuQkMsZUFBWSxDQURPO0FBRW5CQyxhQUFVLEVBRlM7QUFHbkJDLGNBQVcsRUFIUTtBQUluQkMsWUFBUztBQUpVLENBQXJCOztBQU9BLElBQU1DLFFBQVE7QUFDWkMsVUFBUTtBQUNOQyxjQUFVLE1BREo7QUFFTkMsWUFBUSxRQUZGO0FBR05DLGFBQVMsT0FISDtBQUlOQyxlQUFXO0FBSkwsR0FESTtBQU9aQyxPQUFLO0FBQ0hGLGFBQVMsT0FETjtBQUVIRyxZQUFRO0FBRkwsR0FQTztBQVdaQyxZQUFVO0FBQ1JKLGFBQVMsT0FERDtBQUVSQyxlQUFXO0FBRkgsR0FYRTtBQWVaSSxTQUFPO0FBQ0xDLFdBQU07QUFERDtBQWZLLENBQWQ7O0lBb0JNQyxLOzs7Ozs7Ozs7Ozt5Q0FFaUI7QUFDbkIsV0FBS0MsS0FBTCxDQUFXQyxVQUFYO0FBQ0Q7OzsyQ0FFc0I7QUFDckIsV0FBS0QsS0FBTCxDQUFXRSxTQUFYO0FBQ0Q7OzsyQkFFTUMsSyxFQUFPO0FBQUE7O0FBQ1osYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFdBQWYsRUFBMkIsT0FBTyxFQUFDQyxZQUFXLE9BQVosRUFBbEM7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGFBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQU0sT0FBT2hCLE1BQU1RLFFBQW5CO0FBQ0csbUJBQUtJLEtBQUwsQ0FBV0ssWUFBWCxJQUEyQjtBQUQ5QixhQURGO0FBSUU7QUFBQTtBQUFBLGdCQUFJLE9BQU9qQixNQUFNQyxNQUFqQjtBQUNHYyxvQkFBTUcsU0FBTixDQUFnQkMsY0FBaEIsQ0FBK0JsQixNQUEvQixJQUF5QyxDQUQ1QztBQUVFLHVDQUFNLE9BQU9tQixPQUFPQyxNQUFQLENBQWNyQixNQUFNTSxHQUFwQixFQUF3QixFQUFDZ0IsaUJBQWdCLDJCQUFXQyxRQUFYLENBQW9CUixNQUFNRyxTQUFOLENBQWdCQyxjQUFoQixDQUErQmxCLE1BQS9CLElBQXlDLENBQTdELENBQWpCLEVBQXhCLENBQWI7QUFGRixhQUpGO0FBUUU7QUFBQTtBQUFBLGdCQUFNLE9BQU9ELE1BQU1RLFFBQW5CO0FBQ0dPLG9CQUFNRyxTQUFOLENBQWdCQyxjQUFoQixDQUErQlgsUUFBL0IsSUFBMkM7QUFEOUM7QUFSRixXQURGO0FBYUU7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQVFnQixtQkFBS0MsQ0FBTCxDQUFPLFdBQVA7QUFBUixhQURGO0FBRUU7QUFBQTtBQUFBLGdCQUFRLE9BQU96QixNQUFNUyxLQUFyQixFQUE0QixVQUFVLGtCQUFDaUIsQ0FBRCxFQUFLO0FBQUUseUJBQUtkLEtBQUwsQ0FBV2UsZUFBWCxDQUEyQkQsRUFBRUUsTUFBRixDQUFTQyxLQUFwQztBQUE2QyxpQkFBMUYsRUFBNEYsT0FBT2QsTUFBTUcsU0FBTixDQUFnQkMsY0FBaEIsQ0FBK0JXLEtBQS9CLEdBQXVDZixNQUFNRyxTQUFOLENBQWdCQyxjQUFoQixDQUErQlcsS0FBdEUsR0FBOEUsSUFBakw7QUFDR2Ysb0JBQU1HLFNBQU4sQ0FBZ0JhLE1BQWhCLENBQXVCQyxHQUF2QixDQUEyQixVQUFDRixLQUFELEVBQVU7QUFDcEMsdUJBQU87QUFBQTtBQUFBLG9CQUFRLE9BQU9BLE1BQU1HLElBQXJCO0FBQTRCSCx3QkFBTUc7QUFBbEMsaUJBQVA7QUFDRCxlQUZBO0FBREgsYUFGRjtBQU9FO0FBQUE7QUFBQTtBQUFRVCxtQkFBS0MsQ0FBTCxDQUFPLFVBQVA7QUFBUixhQVBGO0FBUUU7QUFBQTtBQUFBLGdCQUFTLE9BQU96QixNQUFNUyxLQUF0QixFQUE2QixVQUFVLGtCQUFDaUIsQ0FBRCxFQUFPO0FBQUUseUJBQUtkLEtBQUwsQ0FBV3NCLGFBQVgsQ0FBeUJSLEVBQUVFLE1BQUYsQ0FBU0MsS0FBbEM7QUFBMkMsaUJBQTNGLEVBQTZGLE9BQU9kLE1BQU1HLFNBQU4sQ0FBZ0JDLGNBQWhCLENBQStCZ0IsR0FBL0IsR0FBcUNwQixNQUFNRyxTQUFOLENBQWdCQyxjQUFoQixDQUErQmdCLEdBQXBFLEdBQTBFLElBQTlLO0FBQ0dwQixvQkFBTUcsU0FBTixDQUFnQmtCLFFBQWhCLENBQXlCSixHQUF6QixDQUE2QixVQUFDSyxPQUFELEVBQVk7QUFDeEMsdUJBQU87QUFBQTtBQUFBLG9CQUFRLE9BQU9BLFFBQVFGLEdBQXZCO0FBQTZCRSwwQkFBUTdCO0FBQXJDLGlCQUFQO0FBQ0QsZUFGQTtBQURIO0FBUkY7QUFiRjtBQURGLE9BREY7QUFnQ0Q7Ozs7OztBQUlILElBQU04QixrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUN2QixLQUFELEVBQVc7QUFDakMsU0FBTztBQUNMRyxlQUFXLDRCQUFPSCxLQUFQLENBRE47QUFFTEUsa0JBQWMscUNBQWdCRixLQUFoQjtBQUZULEdBQVA7QUFJRCxDQUxEOztBQU9BLElBQU13QixxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFDQyxRQUFELEVBQWM7QUFDdkMsU0FBTztBQUNMYixxQkFBa0IsOERBQW9DYSxRQUFwQyxDQURiO0FBRUxOLG1CQUFnQiw0REFBa0NNLFFBQWxDLENBRlg7QUFHTDNCLGdCQUFZLHlEQUErQjJCLFFBQS9CLENBSFA7QUFJTDFCLGVBQVcsd0RBQTZCMEIsUUFBN0I7QUFKTixHQUFQO0FBTUQsQ0FQRDs7a0JBV2UsMEJBQVFGLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2QzVCLEtBQTdDLEMiLCJmaWxlIjoiYWxpZ25QYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBjaGFuZ2VJbnRlcmZhY2UsIGNoYW5nZVN0YXRpb24sIHN0YXJ0QWxpZ24sIHN0b3BUaW1lciB9IGZyb20gJy4vYWxpZ25BY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0QWxsLCBnZXRTZWxlY3RlZEhvc3QgfSBmcm9tICcuL2FsaWduU2VsZWN0b3JzJztcblxuaW1wb3J0IGNvbG9yU2NhbGUgZnJvbSAnc2ltcGxlLWNvbG9yLXNjYWxlJztcbmNvbG9yU2NhbGUuc2V0Q29uZmlnKHtcbiAgb3V0cHV0U3RhcnQ6MSxcbiAgb3V0cHV0RW5kOjg1LFxuICBpbnB1dFN0YXJ0OjY1LFxuICBpbnB1dEVuZDoxMDBcbn0pO1xuXG5jb25zdCBzdHlsZSA9IHtcbiAgc2lnbmFsOiB7XG4gICAgZm9udFNpemU6ICcyMHZoJyxcbiAgICBtYXJnaW46ICcwLjVyZW0nLFxuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICB9LFxuICBiYXI6IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIGhlaWdodDogJzVweCdcbiAgfSxcbiAgaG9zdG5hbWU6IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIHRleHRBbGlnbjogJ2NlbnRlcidcbiAgfSxcbiAgYmxvY2s6IHtcbiAgICB3aWR0aDonMTAwJSdcbiAgfVxufTtcblxuY2xhc3MgQWxpZ24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnN0YXJ0QWxpZ24oKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMucHJvcHMuc3RvcEFsaWduKCk7XG4gIH1cblxuICByZW5kZXIoc3RhdGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIiBzdHlsZT17e3BhZGRpbmdUb3A6JzEwMHB4J319PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2l4IGNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZS5ob3N0bmFtZX0+XG4gICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNlbGVjdGVkSG9zdCB8fCAnJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxoMSBzdHlsZT17c3R5bGUuc2lnbmFsfT5cbiAgICAgICAgICAgICAge3N0YXRlLmFsaWduRGF0YS5jdXJyZW50UmVhZGluZy5zaWduYWwgfHwgMH1cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e09iamVjdC5hc3NpZ24oc3R5bGUuYmFyLHtiYWNrZ3JvdW5kQ29sb3I6Y29sb3JTY2FsZS5nZXRDb2xvcihzdGF0ZS5hbGlnbkRhdGEuY3VycmVudFJlYWRpbmcuc2lnbmFsIHx8IDApfSl9Pjwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGUuaG9zdG5hbWV9PlxuICAgICAgICAgICAgICB7c3RhdGUuYWxpZ25EYXRhLmN1cnJlbnRSZWFkaW5nLmhvc3RuYW1lIHx8ICcnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2l4IGNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxsYWJlbD57STE4bi50KCdJbnRlZmFjZXMnKX08L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17c3R5bGUuYmxvY2t9IG9uQ2hhbmdlPXsoZSk9PnsgdGhpcy5wcm9wcy5jaGFuZ2VJbnRlcmZhY2UoZS50YXJnZXQudmFsdWUpOyB9fSB2YWx1ZT17c3RhdGUuYWxpZ25EYXRhLmN1cnJlbnRSZWFkaW5nLmlmYWNlID8gc3RhdGUuYWxpZ25EYXRhLmN1cnJlbnRSZWFkaW5nLmlmYWNlIDogbnVsbCB9PlxuICAgICAgICAgICAgICB7c3RhdGUuYWxpZ25EYXRhLmlmYWNlcy5tYXAoKGlmYWNlKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPG9wdGlvbiB2YWx1ZT17aWZhY2UubmFtZX0+e2lmYWNlLm5hbWV9PC9vcHRpb24+O1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPGxhYmVsPntJMThuLnQoJ1N0YXRpb25zJyl9PC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgIHN0eWxlPXtzdHlsZS5ibG9ja30gb25DaGFuZ2U9eyhlKSA9PiB7IHRoaXMucHJvcHMuY2hhbmdlU3RhdGlvbihlLnRhcmdldC52YWx1ZSk7IH19IHZhbHVlPXtzdGF0ZS5hbGlnbkRhdGEuY3VycmVudFJlYWRpbmcubWFjID8gc3RhdGUuYWxpZ25EYXRhLmN1cnJlbnRSZWFkaW5nLm1hYyA6IG51bGwgfT5cbiAgICAgICAgICAgICAge3N0YXRlLmFsaWduRGF0YS5zdGF0aW9ucy5tYXAoKHN0YXRpb24pPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8b3B0aW9uIHZhbHVlPXtzdGF0aW9uLm1hY30+e3N0YXRpb24uaG9zdG5hbWV9PC9vcHRpb24+O1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhbGlnbkRhdGE6IGdldEFsbChzdGF0ZSksXG4gICAgc2VsZWN0ZWRIb3N0OiBnZXRTZWxlY3RlZEhvc3Qoc3RhdGUpXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjaGFuZ2VJbnRlcmZhY2UgOiBiaW5kQWN0aW9uQ3JlYXRvcnMoY2hhbmdlSW50ZXJmYWNlLCBkaXNwYXRjaCksXG4gICAgY2hhbmdlU3RhdGlvbiA6IGJpbmRBY3Rpb25DcmVhdG9ycyhjaGFuZ2VTdGF0aW9uLCBkaXNwYXRjaCksXG4gICAgc3RhcnRBbGlnbjogYmluZEFjdGlvbkNyZWF0b3JzKHN0YXJ0QWxpZ24sIGRpc3BhdGNoKSxcbiAgICBzdG9wQWxpZ246IGJpbmRBY3Rpb25DcmVhdG9ycyhzdG9wVGltZXIsZGlzcGF0Y2gpXG4gIH07XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQWxpZ24pO1xuIl19
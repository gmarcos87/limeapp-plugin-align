'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alignEpics = require('./alignEpics');

var _alignEpics2 = _interopRequireDefault(_alignEpics);

var _alignReducer = require('./alignReducer');

var _alignSelectors = require('./alignSelectors');

var selector = _interopRequireWildcard(_alignSelectors);

var _alignConstants = require('./alignConstants');

var constants = _interopRequireWildcard(_alignConstants);

var _alignPage = require('./alignPage');

var _alignPage2 = _interopRequireDefault(_alignPage);

var _alignMenu = require('./alignMenu');

var _es = require('../i18n/translations/es.json');

var _es2 = _interopRequireDefault(_es);

var _en = require('../i18n/translations/en.json');

var _en2 = _interopRequireDefault(_en);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Align',
  page: _alignPage2.default,
  menu: _alignMenu.AlignMenu,
  store: {
    name: 'align',
    epics: _alignEpics2.default,
    reducer: _alignReducer.reducer,
    selector: selector,
    constants: constants
  },
  translations: Object.assign(_en2.default, _es2.default)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJzZWxlY3RvciIsImNvbnN0YW50cyIsIm5hbWUiLCJwYWdlIiwibWVudSIsInN0b3JlIiwiZXBpY3MiLCJyZWR1Y2VyIiwidHJhbnNsYXRpb25zIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztJQUFZQSxROztBQUNaOztJQUFZQyxTOztBQUNaOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7a0JBRWU7QUFDYkMsUUFBTSxPQURPO0FBRWJDLDJCQUZhO0FBR2JDLDRCQUhhO0FBSWJDLFNBQU87QUFDTEgsVUFBTSxPQUREO0FBRUxJLCtCQUZLO0FBR0xDLGtDQUhLO0FBSUxQLHNCQUpLO0FBS0xDO0FBTEssR0FKTTtBQVdiTyxnQkFBY0MsT0FBT0MsTUFBUDtBQVhELEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgIGVwaWNzIGZyb20gJy4vYWxpZ25FcGljcyc7XG5pbXBvcnQgeyByZWR1Y2VyIH0gZnJvbSAnLi9hbGlnblJlZHVjZXInO1xuaW1wb3J0ICogYXMgc2VsZWN0b3IgZnJvbSAnLi9hbGlnblNlbGVjdG9ycyc7XG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi9hbGlnbkNvbnN0YW50cyc7XG5pbXBvcnQgUGFnZSBmcm9tICcuL2FsaWduUGFnZSc7XG5pbXBvcnQgeyBBbGlnbk1lbnUgfSBmcm9tICcuL2FsaWduTWVudSc7XG5cbmltcG9ydCBpMThuRXMgZnJvbSAnLi4vaTE4bi90cmFuc2xhdGlvbnMvZXMuanNvbic7XG5pbXBvcnQgaTE4bkVuIGZyb20gJy4uL2kxOG4vdHJhbnNsYXRpb25zL2VuLmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdBbGlnbicsXG4gIHBhZ2U6IFBhZ2UsXG4gIG1lbnU6IEFsaWduTWVudSxcbiAgc3RvcmU6IHtcbiAgICBuYW1lOiAnYWxpZ24nLFxuICAgIGVwaWNzLFxuICAgIHJlZHVjZXIsXG4gICAgc2VsZWN0b3IsXG4gICAgY29uc3RhbnRzXG4gIH0sXG4gIHRyYW5zbGF0aW9uczogT2JqZWN0LmFzc2lnbihcbiAgICBpMThuRW4sXG4gICAgaTE4bkVzXG4gIClcbn07XG4iXX0=
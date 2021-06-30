'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var LocalizationContext = require('./LocalizationContext-96132df1.js');
var React = require('react');
var React__default = _interopDefault(React);
var index$2 = require('./index-944fbc98.js');
var utils = require('./utils-6aedec02.js');

var Context = React__default.createContext({
  opened: '',
  setOpened: utils.noop
});
var Consumer = Context.Consumer;
var Provider = Context.Provider;

// Wraps all the accordions in an accordion set
function AccordionGroup(_a) {
  var children = _a.children,
      _b = _a.className,
      className = _b === void 0 ? '' : _b;

  var _c = React.useState(''),
      opened = _c[0],
      setOpened = _c[1];

  return React__default.createElement(Provider, {
    value: {
      opened: opened,
      setOpened: setOpened
    }
  }, React__default.createElement("div", {
    className: className
  }, children));
}

function Accordion(_a) {
  var className = _a.className,
      id = _a.id,
      renderTitle = _a.renderTitle,
      renderContent = _a.renderContent,
      renderFooter = _a.renderFooter;

  var _b = React.useState(false),
      showAccordion = _b[0],
      setShowAccordion = _b[1];

  return React__default.createElement(Consumer, null, // Function is considered like a react component
  function (value) {
    var opened = value.opened,
        setOpened = value.setOpened; // props from Provider

    if (id === opened) {
      setShowAccordion(true);
    } else {
      setShowAccordion(false);
    }

    var handleClick = function handleClick() {
      if (showAccordion) {
        setOpened('');
      } else {
        setOpened(id);
      }
    };

    return React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
      className: LocalizationContext.__spreadArrays(Array.isArray(className) ? className : [className], ['sendbird-accordion__panel-header']).join(' '),
      id: id,
      role: "switch",
      "aria-checked": false,
      onClick: handleClick,
      onKeyDown: handleClick,
      tabIndex: 0
    }, renderTitle(), React__default.createElement(index$2.Icon, {
      type: index$2.IconTypes.CHEVRON_RIGHT,
      className: ['sendbird-accordion__panel-icon-right', 'sendbird-accordion__panel-icon--chevron', showAccordion ? 'sendbird-accordion__panel-icon--open' : ''].join(' '),
      height: "24px",
      width: "24px"
    })), showAccordion && React__default.createElement("div", {
      className: "sendbird-accordion"
    }, React__default.createElement("div", {
      className: "sendbird-accordion__list"
    }, renderContent()), renderFooter && React__default.createElement("div", {
      className: "sendbird-accordion__footer"
    }, renderFooter())));
  });
}
var AccordionGroup$1 = AccordionGroup;

exports.Accordion = Accordion;
exports.AccordionGroup = AccordionGroup$1;
//# sourceMappingURL=index-c092ddb7.js.map

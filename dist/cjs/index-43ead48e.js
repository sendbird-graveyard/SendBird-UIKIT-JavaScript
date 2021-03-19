'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var index = require('./index-43aca630.js');
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
  var id = _a.id,
      renderTitle = _a.renderTitle,
      renderContent = _a.renderContent,
      renderFooter = _a.renderFooter,
      className = _a.className;

  var _b = React.useState(false),
      showAccordion = _b[0],
      setShowAccordion = _b[1];

  return React__default.createElement(Consumer, null, function (value) {
    var opened = value.opened,
        setOpened = value.setOpened;

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
      id: id,
      role: "switch",
      "aria-checked": false,
      tabIndex: 0,
      onKeyDown: handleClick,
      className: "sendbird-accordion__panel-heder " + className,
      onClick: handleClick
    }, renderTitle(), React__default.createElement(index.Icon, {
      type: index.IconTypes.CHEVRON_RIGHT,
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
//# sourceMappingURL=index-43ead48e.js.map

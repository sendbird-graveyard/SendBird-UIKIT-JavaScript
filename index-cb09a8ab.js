import React, { useState } from 'react';
import { I as Icon, a as IconTypes } from './index-79d744e1.js';
import { n as noop } from './utils-53ba1773.js';

var Context = React.createContext({
  opened: '',
  setOpened: noop
});
var Consumer = Context.Consumer;
var Provider = Context.Provider;

// Wraps all the accordions in an accordion set
function AccordionGroup(_a) {
  var children = _a.children,
      _b = _a.className,
      className = _b === void 0 ? '' : _b;

  var _c = useState(''),
      opened = _c[0],
      setOpened = _c[1];

  return React.createElement(Provider, {
    value: {
      opened: opened,
      setOpened: setOpened
    }
  }, React.createElement("div", {
    className: className
  }, children));
}

function Accordion(_a) {
  var id = _a.id,
      renderTitle = _a.renderTitle,
      renderContent = _a.renderContent,
      renderFooter = _a.renderFooter,
      className = _a.className;

  var _b = useState(false),
      showAccordion = _b[0],
      setShowAccordion = _b[1];

  return React.createElement(Consumer, null, function (value) {
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

    return React.createElement(React.Fragment, null, React.createElement("div", {
      id: id,
      role: "switch",
      "aria-checked": false,
      tabIndex: 0,
      onKeyDown: handleClick,
      className: "sendbird-accordion__panel-heder " + className,
      onClick: handleClick
    }, renderTitle(), React.createElement(Icon, {
      type: IconTypes.CHEVRON_RIGHT,
      className: ['sendbird-accordion__panel-icon-right', 'sendbird-accordion__panel-icon--chevron', showAccordion ? 'sendbird-accordion__panel-icon--open' : ''].join(' '),
      height: "24px",
      width: "24px"
    })), showAccordion && React.createElement("div", {
      className: "sendbird-accordion"
    }, React.createElement("div", {
      className: "sendbird-accordion__list"
    }, renderContent()), renderFooter && React.createElement("div", {
      className: "sendbird-accordion__footer"
    }, renderFooter())));
  });
}
var AccordionGroup$1 = AccordionGroup;

export { AccordionGroup$1 as A, Accordion as a };
//# sourceMappingURL=index-cb09a8ab.js.map

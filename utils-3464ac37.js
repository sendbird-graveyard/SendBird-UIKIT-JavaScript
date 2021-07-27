import { M as MessageStatusType } from './type-cfe68896.js';

var truncate = function truncate(fullStr, strLen) {
  if (fullStr === null || fullStr === undefined) return '';
  if (fullStr.length <= strLen) return fullStr;
  var separator = '...';
  var sepLen = separator.length;
  var charsToShow = strLen - sepLen;
  var frontChars = Math.ceil(charsToShow / 2);
  var backChars = Math.floor(charsToShow / 2);
  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};
var getIsSentFromStatus = function getIsSentFromStatus(status) {
  return status === MessageStatusType.SENT || status === MessageStatusType.DELIVERED || status === MessageStatusType.READ;
};
var getIsSentFromSendingStatus = function getIsSentFromSendingStatus() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (message.sendingStatus && typeof message.sendingStatus === 'string') {
    return message.sendingStatus === 'none' || message.sendingStatus === 'succeeded';
  }

  return false;
};

export { getIsSentFromStatus as a, getIsSentFromSendingStatus as g, truncate as t };
//# sourceMappingURL=utils-3464ac37.js.map

"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/vscode-jsonrpc/lib/is.js
var require_is = __commonJS({
  "node_modules/vscode-jsonrpc/lib/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
  }
});

// node_modules/vscode-jsonrpc/lib/messages.js
var require_messages = __commonJS({
  "node_modules/vscode-jsonrpc/lib/messages.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var is = require_is();
    var ErrorCodes;
    (function(ErrorCodes2) {
      ErrorCodes2.ParseError = -32700;
      ErrorCodes2.InvalidRequest = -32600;
      ErrorCodes2.MethodNotFound = -32601;
      ErrorCodes2.InvalidParams = -32602;
      ErrorCodes2.InternalError = -32603;
      ErrorCodes2.serverErrorStart = -32099;
      ErrorCodes2.serverErrorEnd = -32e3;
      ErrorCodes2.ServerNotInitialized = -32002;
      ErrorCodes2.UnknownErrorCode = -32001;
      ErrorCodes2.RequestCancelled = -32800;
      ErrorCodes2.ContentModified = -32801;
      ErrorCodes2.MessageWriteError = 1;
      ErrorCodes2.MessageReadError = 2;
    })(ErrorCodes = exports2.ErrorCodes || (exports2.ErrorCodes = {}));
    var ResponseError = class _ResponseError extends Error {
      constructor(code, message, data) {
        super(message);
        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, _ResponseError.prototype);
      }
      toJson() {
        return {
          code: this.code,
          message: this.message,
          data: this.data
        };
      }
    };
    exports2.ResponseError = ResponseError;
    var AbstractMessageType = class {
      constructor(_method, _numberOfParams) {
        this._method = _method;
        this._numberOfParams = _numberOfParams;
      }
      get method() {
        return this._method;
      }
      get numberOfParams() {
        return this._numberOfParams;
      }
    };
    exports2.AbstractMessageType = AbstractMessageType;
    var RequestType0 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 0);
      }
    };
    exports2.RequestType0 = RequestType0;
    var RequestType = class extends AbstractMessageType {
      constructor(method) {
        super(method, 1);
      }
    };
    exports2.RequestType = RequestType;
    var RequestType1 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 1);
      }
    };
    exports2.RequestType1 = RequestType1;
    var RequestType2 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 2);
      }
    };
    exports2.RequestType2 = RequestType2;
    var RequestType3 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 3);
      }
    };
    exports2.RequestType3 = RequestType3;
    var RequestType4 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 4);
      }
    };
    exports2.RequestType4 = RequestType4;
    var RequestType5 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 5);
      }
    };
    exports2.RequestType5 = RequestType5;
    var RequestType6 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 6);
      }
    };
    exports2.RequestType6 = RequestType6;
    var RequestType7 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 7);
      }
    };
    exports2.RequestType7 = RequestType7;
    var RequestType8 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 8);
      }
    };
    exports2.RequestType8 = RequestType8;
    var RequestType9 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 9);
      }
    };
    exports2.RequestType9 = RequestType9;
    var NotificationType = class extends AbstractMessageType {
      constructor(method) {
        super(method, 1);
        this._ = void 0;
      }
    };
    exports2.NotificationType = NotificationType;
    var NotificationType0 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 0);
      }
    };
    exports2.NotificationType0 = NotificationType0;
    var NotificationType1 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 1);
      }
    };
    exports2.NotificationType1 = NotificationType1;
    var NotificationType2 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 2);
      }
    };
    exports2.NotificationType2 = NotificationType2;
    var NotificationType3 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 3);
      }
    };
    exports2.NotificationType3 = NotificationType3;
    var NotificationType4 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 4);
      }
    };
    exports2.NotificationType4 = NotificationType4;
    var NotificationType5 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 5);
      }
    };
    exports2.NotificationType5 = NotificationType5;
    var NotificationType6 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 6);
      }
    };
    exports2.NotificationType6 = NotificationType6;
    var NotificationType7 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 7);
      }
    };
    exports2.NotificationType7 = NotificationType7;
    var NotificationType8 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 8);
      }
    };
    exports2.NotificationType8 = NotificationType8;
    var NotificationType9 = class extends AbstractMessageType {
      constructor(method) {
        super(method, 9);
      }
    };
    exports2.NotificationType9 = NotificationType9;
    function isRequestMessage(message) {
      let candidate = message;
      return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
    }
    exports2.isRequestMessage = isRequestMessage;
    function isNotificationMessage(message) {
      let candidate = message;
      return candidate && is.string(candidate.method) && message.id === void 0;
    }
    exports2.isNotificationMessage = isNotificationMessage;
    function isResponseMessage(message) {
      let candidate = message;
      return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
    }
    exports2.isResponseMessage = isResponseMessage;
  }
});

// node_modules/vscode-jsonrpc/lib/events.js
var require_events = __commonJS({
  "node_modules/vscode-jsonrpc/lib/events.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Disposable;
    (function(Disposable2) {
      function create(func) {
        return {
          dispose: func
        };
      }
      Disposable2.create = create;
    })(Disposable = exports2.Disposable || (exports2.Disposable = {}));
    var Event;
    (function(Event2) {
      const _disposable = { dispose() {
      } };
      Event2.None = function() {
        return _disposable;
      };
    })(Event = exports2.Event || (exports2.Event = {}));
    var CallbackList = class {
      add(callback, context = null, bucket) {
        if (!this._callbacks) {
          this._callbacks = [];
          this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
          bucket.push({ dispose: () => this.remove(callback, context) });
        }
      }
      remove(callback, context = null) {
        if (!this._callbacks) {
          return;
        }
        var foundCallbackWithDifferentContext = false;
        for (var i = 0, len = this._callbacks.length; i < len; i++) {
          if (this._callbacks[i] === callback) {
            if (this._contexts[i] === context) {
              this._callbacks.splice(i, 1);
              this._contexts.splice(i, 1);
              return;
            } else {
              foundCallbackWithDifferentContext = true;
            }
          }
        }
        if (foundCallbackWithDifferentContext) {
          throw new Error("When adding a listener with a context, you should remove it with the same context");
        }
      }
      invoke(...args) {
        if (!this._callbacks) {
          return [];
        }
        var ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (var i = 0, len = callbacks.length; i < len; i++) {
          try {
            ret.push(callbacks[i].apply(contexts[i], args));
          } catch (e) {
            console.error(e);
          }
        }
        return ret;
      }
      isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
      }
      dispose() {
        this._callbacks = void 0;
        this._contexts = void 0;
      }
    };
    var Emitter = class _Emitter {
      constructor(_options) {
        this._options = _options;
      }
      /**
       * For the public to allow to subscribe
       * to events from this Emitter
       */
      get event() {
        if (!this._event) {
          this._event = (listener, thisArgs, disposables) => {
            if (!this._callbacks) {
              this._callbacks = new CallbackList();
            }
            if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
              this._options.onFirstListenerAdd(this);
            }
            this._callbacks.add(listener, thisArgs);
            let result;
            result = {
              dispose: () => {
                this._callbacks.remove(listener, thisArgs);
                result.dispose = _Emitter._noop;
                if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                  this._options.onLastListenerRemove(this);
                }
              }
            };
            if (Array.isArray(disposables)) {
              disposables.push(result);
            }
            return result;
          };
        }
        return this._event;
      }
      /**
       * To be kept private to fire an event to
       * subscribers
       */
      fire(event) {
        if (this._callbacks) {
          this._callbacks.invoke.call(this._callbacks, event);
        }
      }
      dispose() {
        if (this._callbacks) {
          this._callbacks.dispose();
          this._callbacks = void 0;
        }
      }
    };
    exports2.Emitter = Emitter;
    Emitter._noop = function() {
    };
  }
});

// node_modules/vscode-jsonrpc/lib/messageReader.js
var require_messageReader = __commonJS({
  "node_modules/vscode-jsonrpc/lib/messageReader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var events_1 = require_events();
    var Is = require_is();
    var DefaultSize = 8192;
    var CR = Buffer.from("\r", "ascii")[0];
    var LF = Buffer.from("\n", "ascii")[0];
    var CRLF = "\r\n";
    var MessageBuffer = class {
      constructor(encoding = "utf8") {
        this.encoding = encoding;
        this.index = 0;
        this.buffer = Buffer.allocUnsafe(DefaultSize);
      }
      append(chunk) {
        var toAppend = chunk;
        if (typeof chunk === "string") {
          var str = chunk;
          var bufferLen = Buffer.byteLength(str, this.encoding);
          toAppend = Buffer.allocUnsafe(bufferLen);
          toAppend.write(str, 0, bufferLen, this.encoding);
        }
        if (this.buffer.length - this.index >= toAppend.length) {
          toAppend.copy(this.buffer, this.index, 0, toAppend.length);
        } else {
          var newSize = (Math.ceil((this.index + toAppend.length) / DefaultSize) + 1) * DefaultSize;
          if (this.index === 0) {
            this.buffer = Buffer.allocUnsafe(newSize);
            toAppend.copy(this.buffer, 0, 0, toAppend.length);
          } else {
            this.buffer = Buffer.concat([this.buffer.slice(0, this.index), toAppend], newSize);
          }
        }
        this.index += toAppend.length;
      }
      tryReadHeaders() {
        let result = void 0;
        let current = 0;
        while (current + 3 < this.index && (this.buffer[current] !== CR || this.buffer[current + 1] !== LF || this.buffer[current + 2] !== CR || this.buffer[current + 3] !== LF)) {
          current++;
        }
        if (current + 3 >= this.index) {
          return result;
        }
        result = /* @__PURE__ */ Object.create(null);
        let headers = this.buffer.toString("ascii", 0, current).split(CRLF);
        headers.forEach((header) => {
          let index = header.indexOf(":");
          if (index === -1) {
            throw new Error("Message header must separate key and value using :");
          }
          let key = header.substr(0, index);
          let value = header.substr(index + 1).trim();
          result[key] = value;
        });
        let nextStart = current + 4;
        this.buffer = this.buffer.slice(nextStart);
        this.index = this.index - nextStart;
        return result;
      }
      tryReadContent(length) {
        if (this.index < length) {
          return null;
        }
        let result = this.buffer.toString(this.encoding, 0, length);
        let nextStart = length;
        this.buffer.copy(this.buffer, 0, nextStart);
        this.index = this.index - nextStart;
        return result;
      }
      get numberOfBytes() {
        return this.index;
      }
    };
    var MessageReader;
    (function(MessageReader2) {
      function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) && Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
      }
      MessageReader2.is = is;
    })(MessageReader = exports2.MessageReader || (exports2.MessageReader = {}));
    var AbstractMessageReader = class {
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
        this.partialMessageEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error) {
        this.errorEmitter.fire(this.asError(error));
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      get onPartialMessage() {
        return this.partialMessageEmitter.event;
      }
      firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports2.AbstractMessageReader = AbstractMessageReader;
    var StreamMessageReader = class extends AbstractMessageReader {
      constructor(readable, encoding = "utf8") {
        super();
        this.readable = readable;
        this.buffer = new MessageBuffer(encoding);
        this._partialMessageTimeout = 1e4;
      }
      set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
      }
      get partialMessageTimeout() {
        return this._partialMessageTimeout;
      }
      listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = void 0;
        this.callback = callback;
        this.readable.on("data", (data) => {
          this.onData(data);
        });
        this.readable.on("error", (error) => this.fireError(error));
        this.readable.on("close", () => this.fireClose());
      }
      onData(data) {
        this.buffer.append(data);
        while (true) {
          if (this.nextMessageLength === -1) {
            let headers = this.buffer.tryReadHeaders();
            if (!headers) {
              return;
            }
            let contentLength = headers["Content-Length"];
            if (!contentLength) {
              throw new Error("Header must provide a Content-Length property.");
            }
            let length = parseInt(contentLength);
            if (isNaN(length)) {
              throw new Error("Content-Length value must be a number.");
            }
            this.nextMessageLength = length;
          }
          var msg = this.buffer.tryReadContent(this.nextMessageLength);
          if (msg === null) {
            this.setPartialMessageTimer();
            return;
          }
          this.clearPartialMessageTimer();
          this.nextMessageLength = -1;
          this.messageToken++;
          var json = JSON.parse(msg);
          this.callback(json);
        }
      }
      clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
          clearTimeout(this.partialMessageTimer);
          this.partialMessageTimer = void 0;
        }
      }
      setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
          return;
        }
        this.partialMessageTimer = setTimeout((token, timeout) => {
          this.partialMessageTimer = void 0;
          if (token === this.messageToken) {
            this.firePartialMessage({ messageToken: token, waitingTime: timeout });
            this.setPartialMessageTimer();
          }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
      }
    };
    exports2.StreamMessageReader = StreamMessageReader;
    var IPCMessageReader = class extends AbstractMessageReader {
      constructor(process2) {
        super();
        this.process = process2;
        let eventEmitter = this.process;
        eventEmitter.on("error", (error) => this.fireError(error));
        eventEmitter.on("close", () => this.fireClose());
      }
      listen(callback) {
        this.process.on("message", callback);
      }
    };
    exports2.IPCMessageReader = IPCMessageReader;
    var SocketMessageReader = class extends StreamMessageReader {
      constructor(socket, encoding = "utf-8") {
        super(socket, encoding);
      }
    };
    exports2.SocketMessageReader = SocketMessageReader;
  }
});

// node_modules/vscode-jsonrpc/lib/messageWriter.js
var require_messageWriter = __commonJS({
  "node_modules/vscode-jsonrpc/lib/messageWriter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var events_1 = require_events();
    var Is = require_is();
    var ContentLength = "Content-Length: ";
    var CRLF = "\r\n";
    var MessageWriter;
    (function(MessageWriter2) {
      function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) && Is.func(candidate.onError) && Is.func(candidate.write);
      }
      MessageWriter2.is = is;
    })(MessageWriter = exports2.MessageWriter || (exports2.MessageWriter = {}));
    var AbstractMessageWriter = class {
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports2.AbstractMessageWriter = AbstractMessageWriter;
    var StreamMessageWriter = class extends AbstractMessageWriter {
      constructor(writable, encoding = "utf8") {
        super();
        this.writable = writable;
        this.encoding = encoding;
        this.errorCount = 0;
        this.writable.on("error", (error) => this.fireError(error));
        this.writable.on("close", () => this.fireClose());
      }
      write(msg) {
        let json = JSON.stringify(msg);
        let contentLength = Buffer.byteLength(json, this.encoding);
        let headers = [
          ContentLength,
          contentLength.toString(),
          CRLF,
          CRLF
        ];
        try {
          this.writable.write(headers.join(""), "ascii");
          this.writable.write(json, this.encoding);
          this.errorCount = 0;
        } catch (error) {
          this.errorCount++;
          this.fireError(error, msg, this.errorCount);
        }
      }
    };
    exports2.StreamMessageWriter = StreamMessageWriter;
    var IPCMessageWriter = class extends AbstractMessageWriter {
      constructor(process2) {
        super();
        this.process = process2;
        this.errorCount = 0;
        this.queue = [];
        this.sending = false;
        let eventEmitter = this.process;
        eventEmitter.on("error", (error) => this.fireError(error));
        eventEmitter.on("close", () => this.fireClose);
      }
      write(msg) {
        if (!this.sending && this.queue.length === 0) {
          this.doWriteMessage(msg);
        } else {
          this.queue.push(msg);
        }
      }
      doWriteMessage(msg) {
        try {
          if (this.process.send) {
            this.sending = true;
            this.process.send(msg, void 0, void 0, (error) => {
              this.sending = false;
              if (error) {
                this.errorCount++;
                this.fireError(error, msg, this.errorCount);
              } else {
                this.errorCount = 0;
              }
              if (this.queue.length > 0) {
                this.doWriteMessage(this.queue.shift());
              }
            });
          }
        } catch (error) {
          this.errorCount++;
          this.fireError(error, msg, this.errorCount);
        }
      }
    };
    exports2.IPCMessageWriter = IPCMessageWriter;
    var SocketMessageWriter = class extends AbstractMessageWriter {
      constructor(socket, encoding = "utf8") {
        super();
        this.socket = socket;
        this.queue = [];
        this.sending = false;
        this.encoding = encoding;
        this.errorCount = 0;
        this.socket.on("error", (error) => this.fireError(error));
        this.socket.on("close", () => this.fireClose());
      }
      dispose() {
        super.dispose();
        this.socket.destroy();
      }
      write(msg) {
        if (!this.sending && this.queue.length === 0) {
          this.doWriteMessage(msg);
        } else {
          this.queue.push(msg);
        }
      }
      doWriteMessage(msg) {
        let json = JSON.stringify(msg);
        let contentLength = Buffer.byteLength(json, this.encoding);
        let headers = [
          ContentLength,
          contentLength.toString(),
          CRLF,
          CRLF
        ];
        try {
          this.sending = true;
          this.socket.write(headers.join(""), "ascii", (error) => {
            if (error) {
              this.handleError(error, msg);
            }
            try {
              this.socket.write(json, this.encoding, (error2) => {
                this.sending = false;
                if (error2) {
                  this.handleError(error2, msg);
                } else {
                  this.errorCount = 0;
                }
                if (this.queue.length > 0) {
                  this.doWriteMessage(this.queue.shift());
                }
              });
            } catch (error2) {
              this.handleError(error2, msg);
            }
          });
        } catch (error) {
          this.handleError(error, msg);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
    };
    exports2.SocketMessageWriter = SocketMessageWriter;
  }
});

// node_modules/vscode-jsonrpc/lib/cancellation.js
var require_cancellation = __commonJS({
  "node_modules/vscode-jsonrpc/lib/cancellation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var events_1 = require_events();
    var Is = require_is();
    var CancellationToken;
    (function(CancellationToken2) {
      CancellationToken2.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
      });
      CancellationToken2.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
      });
      function is(value) {
        let candidate = value;
        return candidate && (candidate === CancellationToken2.None || candidate === CancellationToken2.Cancelled || Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
      }
      CancellationToken2.is = is;
    })(CancellationToken = exports2.CancellationToken || (exports2.CancellationToken = {}));
    var shortcutEvent = Object.freeze(function(callback, context) {
      let handle = setTimeout(callback.bind(context), 0);
      return { dispose() {
        clearTimeout(handle);
      } };
    });
    var MutableToken = class {
      constructor() {
        this._isCancelled = false;
      }
      cancel() {
        if (!this._isCancelled) {
          this._isCancelled = true;
          if (this._emitter) {
            this._emitter.fire(void 0);
            this.dispose();
          }
        }
      }
      get isCancellationRequested() {
        return this._isCancelled;
      }
      get onCancellationRequested() {
        if (this._isCancelled) {
          return shortcutEvent;
        }
        if (!this._emitter) {
          this._emitter = new events_1.Emitter();
        }
        return this._emitter.event;
      }
      dispose() {
        if (this._emitter) {
          this._emitter.dispose();
          this._emitter = void 0;
        }
      }
    };
    var CancellationTokenSource = class {
      get token() {
        if (!this._token) {
          this._token = new MutableToken();
        }
        return this._token;
      }
      cancel() {
        if (!this._token) {
          this._token = CancellationToken.Cancelled;
        } else {
          this._token.cancel();
        }
      }
      dispose() {
        if (!this._token) {
          this._token = CancellationToken.None;
        } else if (this._token instanceof MutableToken) {
          this._token.dispose();
        }
      }
    };
    exports2.CancellationTokenSource = CancellationTokenSource;
  }
});

// node_modules/vscode-jsonrpc/lib/linkedMap.js
var require_linkedMap = __commonJS({
  "node_modules/vscode-jsonrpc/lib/linkedMap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Touch;
    (function(Touch2) {
      Touch2.None = 0;
      Touch2.First = 1;
      Touch2.Last = 2;
    })(Touch = exports2.Touch || (exports2.Touch = {}));
    var LinkedMap = class {
      constructor() {
        this._map = /* @__PURE__ */ new Map();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
      }
      clear() {
        this._map.clear();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
      }
      isEmpty() {
        return !this._head && !this._tail;
      }
      get size() {
        return this._size;
      }
      has(key) {
        return this._map.has(key);
      }
      get(key) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        return item.value;
      }
      set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
          item.value = value;
          if (touch !== Touch.None) {
            this.touch(item, touch);
          }
        } else {
          item = { key, value, next: void 0, previous: void 0 };
          switch (touch) {
            case Touch.None:
              this.addItemLast(item);
              break;
            case Touch.First:
              this.addItemFirst(item);
              break;
            case Touch.Last:
              this.addItemLast(item);
              break;
            default:
              this.addItemLast(item);
              break;
          }
          this._map.set(key, item);
          this._size++;
        }
      }
      delete(key) {
        const item = this._map.get(key);
        if (!item) {
          return false;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return true;
      }
      shift() {
        if (!this._head && !this._tail) {
          return void 0;
        }
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      forEach(callbackfn, thisArg) {
        let current = this._head;
        while (current) {
          if (thisArg) {
            callbackfn.bind(thisArg)(current.value, current.key, this);
          } else {
            callbackfn(current.value, current.key, this);
          }
          current = current.next;
        }
      }
      forEachReverse(callbackfn, thisArg) {
        let current = this._tail;
        while (current) {
          if (thisArg) {
            callbackfn.bind(thisArg)(current.value, current.key, this);
          } else {
            callbackfn(current.value, current.key, this);
          }
          current = current.previous;
        }
      }
      values() {
        let result = [];
        let current = this._head;
        while (current) {
          result.push(current.value);
          current = current.next;
        }
        return result;
      }
      keys() {
        let result = [];
        let current = this._head;
        while (current) {
          result.push(current.key);
          current = current.next;
        }
        return result;
      }
      /* JSON RPC run on es5 which has no Symbol.iterator
          public keys(): IterableIterator<K> {
              let current = this._head;
              let iterator: IterableIterator<K> = {
                  [Symbol.iterator]() {
                      return iterator;
                  },
                  next():IteratorResult<K> {
                      if (current) {
                          let result = { value: current.key, done: false };
                          current = current.next;
                          return result;
                      } else {
                          return { value: undefined, done: true };
                      }
                  }
              };
              return iterator;
          }
      
          public values(): IterableIterator<V> {
              let current = this._head;
              let iterator: IterableIterator<V> = {
                  [Symbol.iterator]() {
                      return iterator;
                  },
                  next():IteratorResult<V> {
                      if (current) {
                          let result = { value: current.value, done: false };
                          current = current.next;
                          return result;
                      } else {
                          return { value: undefined, done: true };
                      }
                  }
              };
              return iterator;
          }
          */
      addItemFirst(item) {
        if (!this._head && !this._tail) {
          this._tail = item;
        } else if (!this._head) {
          throw new Error("Invalid list");
        } else {
          item.next = this._head;
          this._head.previous = item;
        }
        this._head = item;
      }
      addItemLast(item) {
        if (!this._head && !this._tail) {
          this._head = item;
        } else if (!this._tail) {
          throw new Error("Invalid list");
        } else {
          item.previous = this._tail;
          this._tail.next = item;
        }
        this._tail = item;
      }
      removeItem(item) {
        if (item === this._head && item === this._tail) {
          this._head = void 0;
          this._tail = void 0;
        } else if (item === this._head) {
          this._head = item.next;
        } else if (item === this._tail) {
          this._tail = item.previous;
        } else {
          const next = item.next;
          const previous = item.previous;
          if (!next || !previous) {
            throw new Error("Invalid list");
          }
          next.previous = previous;
          previous.next = next;
        }
      }
      touch(item, touch) {
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        if (touch !== Touch.First && touch !== Touch.Last) {
          return;
        }
        if (touch === Touch.First) {
          if (item === this._head) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._tail) {
            previous.next = void 0;
            this._tail = previous;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.previous = void 0;
          item.next = this._head;
          this._head.previous = item;
          this._head = item;
        } else if (touch === Touch.Last) {
          if (item === this._tail) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._head) {
            next.previous = void 0;
            this._head = next;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.next = void 0;
          item.previous = this._tail;
          this._tail.next = item;
          this._tail = item;
        }
      }
    };
    exports2.LinkedMap = LinkedMap;
  }
});

// node_modules/vscode-jsonrpc/lib/pipeSupport.js
var require_pipeSupport = __commonJS({
  "node_modules/vscode-jsonrpc/lib/pipeSupport.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var path_1 = require("path");
    var os_1 = require("os");
    var crypto_1 = require("crypto");
    var net_1 = require("net");
    var messageReader_1 = require_messageReader();
    var messageWriter_1 = require_messageWriter();
    function generateRandomPipeName() {
      const randomSuffix = crypto_1.randomBytes(21).toString("hex");
      if (process.platform === "win32") {
        return `\\\\.\\pipe\\vscode-jsonrpc-${randomSuffix}-sock`;
      } else {
        return path_1.join(os_1.tmpdir(), `vscode-${randomSuffix}.sock`);
      }
    }
    exports2.generateRandomPipeName = generateRandomPipeName;
    function createClientPipeTransport(pipeName, encoding = "utf-8") {
      let connectResolve;
      let connected = new Promise((resolve, _reject) => {
        connectResolve = resolve;
      });
      return new Promise((resolve, reject) => {
        let server = net_1.createServer((socket) => {
          server.close();
          connectResolve([
            new messageReader_1.SocketMessageReader(socket, encoding),
            new messageWriter_1.SocketMessageWriter(socket, encoding)
          ]);
        });
        server.on("error", reject);
        server.listen(pipeName, () => {
          server.removeListener("error", reject);
          resolve({
            onConnected: () => {
              return connected;
            }
          });
        });
      });
    }
    exports2.createClientPipeTransport = createClientPipeTransport;
    function createServerPipeTransport(pipeName, encoding = "utf-8") {
      const socket = net_1.createConnection(pipeName);
      return [
        new messageReader_1.SocketMessageReader(socket, encoding),
        new messageWriter_1.SocketMessageWriter(socket, encoding)
      ];
    }
    exports2.createServerPipeTransport = createServerPipeTransport;
  }
});

// node_modules/vscode-jsonrpc/lib/socketSupport.js
var require_socketSupport = __commonJS({
  "node_modules/vscode-jsonrpc/lib/socketSupport.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var net_1 = require("net");
    var messageReader_1 = require_messageReader();
    var messageWriter_1 = require_messageWriter();
    function createClientSocketTransport(port, encoding = "utf-8") {
      let connectResolve;
      let connected = new Promise((resolve, _reject) => {
        connectResolve = resolve;
      });
      return new Promise((resolve, reject) => {
        let server = net_1.createServer((socket) => {
          server.close();
          connectResolve([
            new messageReader_1.SocketMessageReader(socket, encoding),
            new messageWriter_1.SocketMessageWriter(socket, encoding)
          ]);
        });
        server.on("error", reject);
        server.listen(port, "127.0.0.1", () => {
          server.removeListener("error", reject);
          resolve({
            onConnected: () => {
              return connected;
            }
          });
        });
      });
    }
    exports2.createClientSocketTransport = createClientSocketTransport;
    function createServerSocketTransport(port, encoding = "utf-8") {
      const socket = net_1.createConnection(port, "127.0.0.1");
      return [
        new messageReader_1.SocketMessageReader(socket, encoding),
        new messageWriter_1.SocketMessageWriter(socket, encoding)
      ];
    }
    exports2.createServerSocketTransport = createServerSocketTransport;
  }
});

// node_modules/vscode-jsonrpc/lib/main.js
var require_main = __commonJS({
  "node_modules/vscode-jsonrpc/lib/main.js"(exports2) {
    "use strict";
    function __export(m) {
      for (var p in m) if (!exports2.hasOwnProperty(p)) exports2[p] = m[p];
    }
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Is = require_is();
    var messages_1 = require_messages();
    exports2.RequestType = messages_1.RequestType;
    exports2.RequestType0 = messages_1.RequestType0;
    exports2.RequestType1 = messages_1.RequestType1;
    exports2.RequestType2 = messages_1.RequestType2;
    exports2.RequestType3 = messages_1.RequestType3;
    exports2.RequestType4 = messages_1.RequestType4;
    exports2.RequestType5 = messages_1.RequestType5;
    exports2.RequestType6 = messages_1.RequestType6;
    exports2.RequestType7 = messages_1.RequestType7;
    exports2.RequestType8 = messages_1.RequestType8;
    exports2.RequestType9 = messages_1.RequestType9;
    exports2.ResponseError = messages_1.ResponseError;
    exports2.ErrorCodes = messages_1.ErrorCodes;
    exports2.NotificationType = messages_1.NotificationType;
    exports2.NotificationType0 = messages_1.NotificationType0;
    exports2.NotificationType1 = messages_1.NotificationType1;
    exports2.NotificationType2 = messages_1.NotificationType2;
    exports2.NotificationType3 = messages_1.NotificationType3;
    exports2.NotificationType4 = messages_1.NotificationType4;
    exports2.NotificationType5 = messages_1.NotificationType5;
    exports2.NotificationType6 = messages_1.NotificationType6;
    exports2.NotificationType7 = messages_1.NotificationType7;
    exports2.NotificationType8 = messages_1.NotificationType8;
    exports2.NotificationType9 = messages_1.NotificationType9;
    var messageReader_1 = require_messageReader();
    exports2.MessageReader = messageReader_1.MessageReader;
    exports2.StreamMessageReader = messageReader_1.StreamMessageReader;
    exports2.IPCMessageReader = messageReader_1.IPCMessageReader;
    exports2.SocketMessageReader = messageReader_1.SocketMessageReader;
    var messageWriter_1 = require_messageWriter();
    exports2.MessageWriter = messageWriter_1.MessageWriter;
    exports2.StreamMessageWriter = messageWriter_1.StreamMessageWriter;
    exports2.IPCMessageWriter = messageWriter_1.IPCMessageWriter;
    exports2.SocketMessageWriter = messageWriter_1.SocketMessageWriter;
    var events_1 = require_events();
    exports2.Disposable = events_1.Disposable;
    exports2.Event = events_1.Event;
    exports2.Emitter = events_1.Emitter;
    var cancellation_1 = require_cancellation();
    exports2.CancellationTokenSource = cancellation_1.CancellationTokenSource;
    exports2.CancellationToken = cancellation_1.CancellationToken;
    var linkedMap_1 = require_linkedMap();
    __export(require_pipeSupport());
    __export(require_socketSupport());
    var CancelNotification;
    (function(CancelNotification2) {
      CancelNotification2.type = new messages_1.NotificationType("$/cancelRequest");
    })(CancelNotification || (CancelNotification = {}));
    var ProgressNotification;
    (function(ProgressNotification2) {
      ProgressNotification2.type = new messages_1.NotificationType("$/progress");
    })(ProgressNotification || (ProgressNotification = {}));
    var ProgressType = class {
      constructor() {
      }
    };
    exports2.ProgressType = ProgressType;
    exports2.NullLogger = Object.freeze({
      error: () => {
      },
      warn: () => {
      },
      info: () => {
      },
      log: () => {
      }
    });
    var Trace;
    (function(Trace2) {
      Trace2[Trace2["Off"] = 0] = "Off";
      Trace2[Trace2["Messages"] = 1] = "Messages";
      Trace2[Trace2["Verbose"] = 2] = "Verbose";
    })(Trace = exports2.Trace || (exports2.Trace = {}));
    (function(Trace2) {
      function fromString(value) {
        if (!Is.string(value)) {
          return Trace2.Off;
        }
        value = value.toLowerCase();
        switch (value) {
          case "off":
            return Trace2.Off;
          case "messages":
            return Trace2.Messages;
          case "verbose":
            return Trace2.Verbose;
          default:
            return Trace2.Off;
        }
      }
      Trace2.fromString = fromString;
      function toString(value) {
        switch (value) {
          case Trace2.Off:
            return "off";
          case Trace2.Messages:
            return "messages";
          case Trace2.Verbose:
            return "verbose";
          default:
            return "off";
        }
      }
      Trace2.toString = toString;
    })(Trace = exports2.Trace || (exports2.Trace = {}));
    var TraceFormat;
    (function(TraceFormat2) {
      TraceFormat2["Text"] = "text";
      TraceFormat2["JSON"] = "json";
    })(TraceFormat = exports2.TraceFormat || (exports2.TraceFormat = {}));
    (function(TraceFormat2) {
      function fromString(value) {
        value = value.toLowerCase();
        if (value === "json") {
          return TraceFormat2.JSON;
        } else {
          return TraceFormat2.Text;
        }
      }
      TraceFormat2.fromString = fromString;
    })(TraceFormat = exports2.TraceFormat || (exports2.TraceFormat = {}));
    var SetTraceNotification;
    (function(SetTraceNotification2) {
      SetTraceNotification2.type = new messages_1.NotificationType("$/setTraceNotification");
    })(SetTraceNotification = exports2.SetTraceNotification || (exports2.SetTraceNotification = {}));
    var LogTraceNotification;
    (function(LogTraceNotification2) {
      LogTraceNotification2.type = new messages_1.NotificationType("$/logTraceNotification");
    })(LogTraceNotification = exports2.LogTraceNotification || (exports2.LogTraceNotification = {}));
    var ConnectionErrors;
    (function(ConnectionErrors2) {
      ConnectionErrors2[ConnectionErrors2["Closed"] = 1] = "Closed";
      ConnectionErrors2[ConnectionErrors2["Disposed"] = 2] = "Disposed";
      ConnectionErrors2[ConnectionErrors2["AlreadyListening"] = 3] = "AlreadyListening";
    })(ConnectionErrors = exports2.ConnectionErrors || (exports2.ConnectionErrors = {}));
    var ConnectionError = class _ConnectionError extends Error {
      constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, _ConnectionError.prototype);
      }
    };
    exports2.ConnectionError = ConnectionError;
    var ConnectionStrategy;
    (function(ConnectionStrategy2) {
      function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.cancelUndispatched);
      }
      ConnectionStrategy2.is = is;
    })(ConnectionStrategy = exports2.ConnectionStrategy || (exports2.ConnectionStrategy = {}));
    var ConnectionState;
    (function(ConnectionState2) {
      ConnectionState2[ConnectionState2["New"] = 1] = "New";
      ConnectionState2[ConnectionState2["Listening"] = 2] = "Listening";
      ConnectionState2[ConnectionState2["Closed"] = 3] = "Closed";
      ConnectionState2[ConnectionState2["Disposed"] = 4] = "Disposed";
    })(ConnectionState || (ConnectionState = {}));
    function _createMessageConnection(messageReader, messageWriter, logger2, strategy) {
      let sequenceNumber = 0;
      let notificationSquenceNumber = 0;
      let unknownResponseSquenceNumber = 0;
      const version = "2.0";
      let starRequestHandler = void 0;
      let requestHandlers = /* @__PURE__ */ Object.create(null);
      let starNotificationHandler = void 0;
      let notificationHandlers = /* @__PURE__ */ Object.create(null);
      let progressHandlers = /* @__PURE__ */ new Map();
      let timer;
      let messageQueue = new linkedMap_1.LinkedMap();
      let responsePromises = /* @__PURE__ */ Object.create(null);
      let requestTokens = /* @__PURE__ */ Object.create(null);
      let trace = Trace.Off;
      let traceFormat = TraceFormat.Text;
      let tracer;
      let state = ConnectionState.New;
      let errorEmitter = new events_1.Emitter();
      let closeEmitter = new events_1.Emitter();
      let unhandledNotificationEmitter = new events_1.Emitter();
      let unhandledProgressEmitter = new events_1.Emitter();
      let disposeEmitter = new events_1.Emitter();
      function createRequestQueueKey(id) {
        return "req-" + id.toString();
      }
      function createResponseQueueKey(id) {
        if (id === null) {
          return "res-unknown-" + (++unknownResponseSquenceNumber).toString();
        } else {
          return "res-" + id.toString();
        }
      }
      function createNotificationQueueKey() {
        return "not-" + (++notificationSquenceNumber).toString();
      }
      function addMessageToQueue(queue, message) {
        if (messages_1.isRequestMessage(message)) {
          queue.set(createRequestQueueKey(message.id), message);
        } else if (messages_1.isResponseMessage(message)) {
          queue.set(createResponseQueueKey(message.id), message);
        } else {
          queue.set(createNotificationQueueKey(), message);
        }
      }
      function cancelUndispatched(_message) {
        return void 0;
      }
      function isListening() {
        return state === ConnectionState.Listening;
      }
      function isClosed() {
        return state === ConnectionState.Closed;
      }
      function isDisposed() {
        return state === ConnectionState.Disposed;
      }
      function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
          state = ConnectionState.Closed;
          closeEmitter.fire(void 0);
        }
      }
      function readErrorHandler(error) {
        errorEmitter.fire([error, void 0, void 0]);
      }
      function writeErrorHandler(data) {
        errorEmitter.fire(data);
      }
      messageReader.onClose(closeHandler);
      messageReader.onError(readErrorHandler);
      messageWriter.onClose(closeHandler);
      messageWriter.onError(writeErrorHandler);
      function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
          return;
        }
        timer = setImmediate(() => {
          timer = void 0;
          processMessageQueue();
        });
      }
      function processMessageQueue() {
        if (messageQueue.size === 0) {
          return;
        }
        let message = messageQueue.shift();
        try {
          if (messages_1.isRequestMessage(message)) {
            handleRequest(message);
          } else if (messages_1.isNotificationMessage(message)) {
            handleNotification(message);
          } else if (messages_1.isResponseMessage(message)) {
            handleResponse(message);
          } else {
            handleInvalidMessage(message);
          }
        } finally {
          triggerMessageQueue();
        }
      }
      let callback = (message) => {
        try {
          if (messages_1.isNotificationMessage(message) && message.method === CancelNotification.type.method) {
            let key = createRequestQueueKey(message.params.id);
            let toCancel = messageQueue.get(key);
            if (messages_1.isRequestMessage(toCancel)) {
              let response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
              if (response && (response.error !== void 0 || response.result !== void 0)) {
                messageQueue.delete(key);
                response.id = toCancel.id;
                traceSendingResponse(response, message.method, Date.now());
                messageWriter.write(response);
                return;
              }
            }
          }
          addMessageToQueue(messageQueue, message);
        } finally {
          triggerMessageQueue();
        }
      };
      function handleRequest(requestMessage) {
        if (isDisposed()) {
          return;
        }
        function reply(resultOrError, method, startTime2) {
          let message = {
            jsonrpc: version,
            id: requestMessage.id
          };
          if (resultOrError instanceof messages_1.ResponseError) {
            message.error = resultOrError.toJson();
          } else {
            message.result = resultOrError === void 0 ? null : resultOrError;
          }
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message);
        }
        function replyError(error, method, startTime2) {
          let message = {
            jsonrpc: version,
            id: requestMessage.id,
            error: error.toJson()
          };
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message);
        }
        function replySuccess(result, method, startTime2) {
          if (result === void 0) {
            result = null;
          }
          let message = {
            jsonrpc: version,
            id: requestMessage.id,
            result
          };
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message);
        }
        traceReceivedRequest(requestMessage);
        let element = requestHandlers[requestMessage.method];
        let type;
        let requestHandler;
        if (element) {
          type = element.type;
          requestHandler = element.handler;
        }
        let startTime = Date.now();
        if (requestHandler || starRequestHandler) {
          let cancellationSource = new cancellation_1.CancellationTokenSource();
          let tokenKey = String(requestMessage.id);
          requestTokens[tokenKey] = cancellationSource;
          try {
            let handlerResult;
            if (requestMessage.params === void 0 || type !== void 0 && type.numberOfParams === 0) {
              handlerResult = requestHandler ? requestHandler(cancellationSource.token) : starRequestHandler(requestMessage.method, cancellationSource.token);
            } else if (Is.array(requestMessage.params) && (type === void 0 || type.numberOfParams > 1)) {
              handlerResult = requestHandler ? requestHandler(...requestMessage.params, cancellationSource.token) : starRequestHandler(requestMessage.method, ...requestMessage.params, cancellationSource.token);
            } else {
              handlerResult = requestHandler ? requestHandler(requestMessage.params, cancellationSource.token) : starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
            }
            let promise = handlerResult;
            if (!handlerResult) {
              delete requestTokens[tokenKey];
              replySuccess(handlerResult, requestMessage.method, startTime);
            } else if (promise.then) {
              promise.then((resultOrError) => {
                delete requestTokens[tokenKey];
                reply(resultOrError, requestMessage.method, startTime);
              }, (error) => {
                delete requestTokens[tokenKey];
                if (error instanceof messages_1.ResponseError) {
                  replyError(error, requestMessage.method, startTime);
                } else if (error && Is.string(error.message)) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                } else {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                }
              });
            } else {
              delete requestTokens[tokenKey];
              reply(handlerResult, requestMessage.method, startTime);
            }
          } catch (error) {
            delete requestTokens[tokenKey];
            if (error instanceof messages_1.ResponseError) {
              reply(error, requestMessage.method, startTime);
            } else if (error && Is.string(error.message)) {
              replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
            } else {
              replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
            }
          }
        } else {
          replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
      }
      function handleResponse(responseMessage) {
        if (isDisposed()) {
          return;
        }
        if (responseMessage.id === null) {
          if (responseMessage.error) {
            logger2.error(`Received response message without id: Error is: 
${JSON.stringify(responseMessage.error, void 0, 4)}`);
          } else {
            logger2.error(`Received response message without id. No further error information provided.`);
          }
        } else {
          let key = String(responseMessage.id);
          let responsePromise = responsePromises[key];
          traceReceivedResponse(responseMessage, responsePromise);
          if (responsePromise) {
            delete responsePromises[key];
            try {
              if (responseMessage.error) {
                let error = responseMessage.error;
                responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
              } else if (responseMessage.result !== void 0) {
                responsePromise.resolve(responseMessage.result);
              } else {
                throw new Error("Should never happen.");
              }
            } catch (error) {
              if (error.message) {
                logger2.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
              } else {
                logger2.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
              }
            }
          }
        }
      }
      function handleNotification(message) {
        if (isDisposed()) {
          return;
        }
        let type = void 0;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
          notificationHandler = (params) => {
            let id = params.id;
            let source = requestTokens[String(id)];
            if (source) {
              source.cancel();
            }
          };
        } else {
          let element = notificationHandlers[message.method];
          if (element) {
            notificationHandler = element.handler;
            type = element.type;
          }
        }
        if (notificationHandler || starNotificationHandler) {
          try {
            traceReceivedNotification(message);
            if (message.params === void 0 || type !== void 0 && type.numberOfParams === 0) {
              notificationHandler ? notificationHandler() : starNotificationHandler(message.method);
            } else if (Is.array(message.params) && (type === void 0 || type.numberOfParams > 1)) {
              notificationHandler ? notificationHandler(...message.params) : starNotificationHandler(message.method, ...message.params);
            } else {
              notificationHandler ? notificationHandler(message.params) : starNotificationHandler(message.method, message.params);
            }
          } catch (error) {
            if (error.message) {
              logger2.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
            } else {
              logger2.error(`Notification handler '${message.method}' failed unexpectedly.`);
            }
          }
        } else {
          unhandledNotificationEmitter.fire(message);
        }
      }
      function handleInvalidMessage(message) {
        if (!message) {
          logger2.error("Received empty message.");
          return;
        }
        logger2.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(message, null, 4)}`);
        let responseMessage = message;
        if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
          let key = String(responseMessage.id);
          let responseHandler = responsePromises[key];
          if (responseHandler) {
            responseHandler.reject(new Error("The received response has neither a result nor an error property."));
          }
        }
      }
      function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose && message.params) {
            data = `Params: ${JSON.stringify(message.params, null, 4)}

`;
          }
          tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("send-request", message);
        }
      }
      function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose) {
            if (message.params) {
              data = `Params: ${JSON.stringify(message.params, null, 4)}

`;
            } else {
              data = "No parameters provided.\n\n";
            }
          }
          tracer.log(`Sending notification '${message.method}'.`, data);
        } else {
          logLSPMessage("send-notification", message);
        }
      }
      function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose) {
            if (message.error && message.error.data) {
              data = `Error data: ${JSON.stringify(message.error.data, null, 4)}

`;
            } else {
              if (message.result) {
                data = `Result: ${JSON.stringify(message.result, null, 4)}

`;
              } else if (message.error === void 0) {
                data = "No result returned.\n\n";
              }
            }
          }
          tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
        } else {
          logLSPMessage("send-response", message);
        }
      }
      function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose && message.params) {
            data = `Params: ${JSON.stringify(message.params, null, 4)}

`;
          }
          tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("receive-request", message);
        }
      }
      function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose) {
            if (message.params) {
              data = `Params: ${JSON.stringify(message.params, null, 4)}

`;
            } else {
              data = "No parameters provided.\n\n";
            }
          }
          tracer.log(`Received notification '${message.method}'.`, data);
        } else {
          logLSPMessage("receive-notification", message);
        }
      }
      function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose) {
            if (message.error && message.error.data) {
              data = `Error data: ${JSON.stringify(message.error.data, null, 4)}

`;
            } else {
              if (message.result) {
                data = `Result: ${JSON.stringify(message.result, null, 4)}

`;
              } else if (message.error === void 0) {
                data = "No result returned.\n\n";
              }
            }
          }
          if (responsePromise) {
            let error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
            tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
          } else {
            tracer.log(`Received response ${message.id} without active response promise.`, data);
          }
        } else {
          logLSPMessage("receive-response", message);
        }
      }
      function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
          return;
        }
        const lspMessage = {
          isLSPMessage: true,
          type,
          message,
          timestamp: Date.now()
        };
        tracer.log(lspMessage);
      }
      function throwIfClosedOrDisposed() {
        if (isClosed()) {
          throw new ConnectionError(ConnectionErrors.Closed, "Connection is closed.");
        }
        if (isDisposed()) {
          throw new ConnectionError(ConnectionErrors.Disposed, "Connection is disposed.");
        }
      }
      function throwIfListening() {
        if (isListening()) {
          throw new ConnectionError(ConnectionErrors.AlreadyListening, "Connection is already listening");
        }
      }
      function throwIfNotListening() {
        if (!isListening()) {
          throw new Error("Call listen() first.");
        }
      }
      function undefinedToNull(param) {
        if (param === void 0) {
          return null;
        } else {
          return param;
        }
      }
      function computeMessageParams(type, params) {
        let result;
        let numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
          case 0:
            result = null;
            break;
          case 1:
            result = undefinedToNull(params[0]);
            break;
          default:
            result = [];
            for (let i = 0; i < params.length && i < numberOfParams; i++) {
              result.push(undefinedToNull(params[i]));
            }
            if (params.length < numberOfParams) {
              for (let i = params.length; i < numberOfParams; i++) {
                result.push(null);
              }
            }
            break;
        }
        return result;
      }
      let connection2 = {
        sendNotification: (type, ...params) => {
          throwIfClosedOrDisposed();
          let method;
          let messageParams;
          if (Is.string(type)) {
            method = type;
            switch (params.length) {
              case 0:
                messageParams = null;
                break;
              case 1:
                messageParams = params[0];
                break;
              default:
                messageParams = params;
                break;
            }
          } else {
            method = type.method;
            messageParams = computeMessageParams(type, params);
          }
          let notificationMessage = {
            jsonrpc: version,
            method,
            params: messageParams
          };
          traceSendingNotification(notificationMessage);
          messageWriter.write(notificationMessage);
        },
        onNotification: (type, handler) => {
          throwIfClosedOrDisposed();
          if (Is.func(type)) {
            starNotificationHandler = type;
          } else if (handler) {
            if (Is.string(type)) {
              notificationHandlers[type] = { type: void 0, handler };
            } else {
              notificationHandlers[type.method] = { type, handler };
            }
          }
        },
        onProgress: (_type, token, handler) => {
          if (progressHandlers.has(token)) {
            throw new Error(`Progress handler for token ${token} already registered`);
          }
          progressHandlers.set(token, handler);
          return {
            dispose: () => {
              progressHandlers.delete(token);
            }
          };
        },
        sendProgress: (_type, token, value) => {
          connection2.sendNotification(ProgressNotification.type, { token, value });
        },
        onUnhandledProgress: unhandledProgressEmitter.event,
        sendRequest: (type, ...params) => {
          throwIfClosedOrDisposed();
          throwIfNotListening();
          let method;
          let messageParams;
          let token = void 0;
          if (Is.string(type)) {
            method = type;
            switch (params.length) {
              case 0:
                messageParams = null;
                break;
              case 1:
                if (cancellation_1.CancellationToken.is(params[0])) {
                  messageParams = null;
                  token = params[0];
                } else {
                  messageParams = undefinedToNull(params[0]);
                }
                break;
              default:
                const last = params.length - 1;
                if (cancellation_1.CancellationToken.is(params[last])) {
                  token = params[last];
                  if (params.length === 2) {
                    messageParams = undefinedToNull(params[0]);
                  } else {
                    messageParams = params.slice(0, last).map((value) => undefinedToNull(value));
                  }
                } else {
                  messageParams = params.map((value) => undefinedToNull(value));
                }
                break;
            }
          } else {
            method = type.method;
            messageParams = computeMessageParams(type, params);
            let numberOfParams = type.numberOfParams;
            token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : void 0;
          }
          let id = sequenceNumber++;
          let result = new Promise((resolve, reject) => {
            let requestMessage = {
              jsonrpc: version,
              id,
              method,
              params: messageParams
            };
            let responsePromise = { method, timerStart: Date.now(), resolve, reject };
            traceSendingRequest(requestMessage);
            try {
              messageWriter.write(requestMessage);
            } catch (e) {
              responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, e.message ? e.message : "Unknown reason"));
              responsePromise = null;
            }
            if (responsePromise) {
              responsePromises[String(id)] = responsePromise;
            }
          });
          if (token) {
            token.onCancellationRequested(() => {
              connection2.sendNotification(CancelNotification.type, { id });
            });
          }
          return result;
        },
        onRequest: (type, handler) => {
          throwIfClosedOrDisposed();
          if (Is.func(type)) {
            starRequestHandler = type;
          } else if (handler) {
            if (Is.string(type)) {
              requestHandlers[type] = { type: void 0, handler };
            } else {
              requestHandlers[type.method] = { type, handler };
            }
          }
        },
        trace: (_value, _tracer, sendNotificationOrTraceOptions) => {
          let _sendNotification = false;
          let _traceFormat = TraceFormat.Text;
          if (sendNotificationOrTraceOptions !== void 0) {
            if (Is.boolean(sendNotificationOrTraceOptions)) {
              _sendNotification = sendNotificationOrTraceOptions;
            } else {
              _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
              _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
            }
          }
          trace = _value;
          traceFormat = _traceFormat;
          if (trace === Trace.Off) {
            tracer = void 0;
          } else {
            tracer = _tracer;
          }
          if (_sendNotification && !isClosed() && !isDisposed()) {
            connection2.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
          }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        dispose: () => {
          if (isDisposed()) {
            return;
          }
          state = ConnectionState.Disposed;
          disposeEmitter.fire(void 0);
          let error = new Error("Connection got disposed.");
          Object.keys(responsePromises).forEach((key) => {
            responsePromises[key].reject(error);
          });
          responsePromises = /* @__PURE__ */ Object.create(null);
          requestTokens = /* @__PURE__ */ Object.create(null);
          messageQueue = new linkedMap_1.LinkedMap();
          if (Is.func(messageWriter.dispose)) {
            messageWriter.dispose();
          }
          if (Is.func(messageReader.dispose)) {
            messageReader.dispose();
          }
        },
        listen: () => {
          throwIfClosedOrDisposed();
          throwIfListening();
          state = ConnectionState.Listening;
          messageReader.listen(callback);
        },
        inspect: () => {
          console.log("inspect");
        }
      };
      connection2.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        tracer.log(params.message, trace === Trace.Verbose ? params.verbose : void 0);
      });
      connection2.onNotification(ProgressNotification.type, (params) => {
        const handler = progressHandlers.get(params.token);
        if (handler) {
          handler(params.value);
        } else {
          unhandledProgressEmitter.fire(params);
        }
      });
      return connection2;
    }
    function isMessageReader(value) {
      return value.listen !== void 0 && value.read === void 0;
    }
    function isMessageWriter(value) {
      return value.write !== void 0 && value.end === void 0;
    }
    function createMessageConnection(input, output, logger2, strategy) {
      if (!logger2) {
        logger2 = exports2.NullLogger;
      }
      let reader = isMessageReader(input) ? input : new messageReader_1.StreamMessageReader(input);
      let writer = isMessageWriter(output) ? output : new messageWriter_1.StreamMessageWriter(output);
      return _createMessageConnection(reader, writer, logger2, strategy);
    }
    exports2.createMessageConnection = createMessageConnection;
  }
});

// node_modules/vscode-languageserver-types/lib/umd/main.js
var require_main2 = __commonJS({
  "node_modules/vscode-languageserver-types/lib/umd/main.js"(exports2, module2) {
    (function(factory) {
      if (typeof module2 === "object" && typeof module2.exports === "object") {
        var v = factory(require, exports2);
        if (v !== void 0) module2.exports = v;
      } else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
      }
    })(function(require2, exports3) {
      "use strict";
      Object.defineProperty(exports3, "__esModule", { value: true });
      var Position;
      (function(Position2) {
        function create(line, character) {
          return { line, character };
        }
        Position2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
        }
        Position2.is = is;
      })(Position = exports3.Position || (exports3.Position = {}));
      var Range;
      (function(Range2) {
        function create(one, two, three, four) {
          if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
          } else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
          } else {
            throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
          }
        }
        Range2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
        }
        Range2.is = is;
      })(Range = exports3.Range || (exports3.Range = {}));
      var Location;
      (function(Location2) {
        function create(uri, range) {
          return { uri, range };
        }
        Location2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
        }
        Location2.is = is;
      })(Location = exports3.Location || (exports3.Location = {}));
      var LocationLink;
      (function(LocationLink2) {
        function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
          return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
        }
        LocationLink2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange)) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
        }
        LocationLink2.is = is;
      })(LocationLink = exports3.LocationLink || (exports3.LocationLink = {}));
      var Color;
      (function(Color2) {
        function create(red, green, blue, alpha) {
          return {
            red,
            green,
            blue,
            alpha
          };
        }
        Color2.create = create;
        function is(value) {
          var candidate = value;
          return Is.number(candidate.red) && Is.number(candidate.green) && Is.number(candidate.blue) && Is.number(candidate.alpha);
        }
        Color2.is = is;
      })(Color = exports3.Color || (exports3.Color = {}));
      var ColorInformation;
      (function(ColorInformation2) {
        function create(range, color) {
          return {
            range,
            color
          };
        }
        ColorInformation2.create = create;
        function is(value) {
          var candidate = value;
          return Range.is(candidate.range) && Color.is(candidate.color);
        }
        ColorInformation2.is = is;
      })(ColorInformation = exports3.ColorInformation || (exports3.ColorInformation = {}));
      var ColorPresentation;
      (function(ColorPresentation2) {
        function create(label, textEdit, additionalTextEdits) {
          return {
            label,
            textEdit,
            additionalTextEdits
          };
        }
        ColorPresentation2.create = create;
        function is(value) {
          var candidate = value;
          return Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
        }
        ColorPresentation2.is = is;
      })(ColorPresentation = exports3.ColorPresentation || (exports3.ColorPresentation = {}));
      var FoldingRangeKind;
      (function(FoldingRangeKind2) {
        FoldingRangeKind2["Comment"] = "comment";
        FoldingRangeKind2["Imports"] = "imports";
        FoldingRangeKind2["Region"] = "region";
      })(FoldingRangeKind = exports3.FoldingRangeKind || (exports3.FoldingRangeKind = {}));
      var FoldingRange;
      (function(FoldingRange2) {
        function create(startLine, endLine, startCharacter, endCharacter, kind) {
          var result = {
            startLine,
            endLine
          };
          if (Is.defined(startCharacter)) {
            result.startCharacter = startCharacter;
          }
          if (Is.defined(endCharacter)) {
            result.endCharacter = endCharacter;
          }
          if (Is.defined(kind)) {
            result.kind = kind;
          }
          return result;
        }
        FoldingRange2.create = create;
        function is(value) {
          var candidate = value;
          return Is.number(candidate.startLine) && Is.number(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.number(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.number(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
        }
        FoldingRange2.is = is;
      })(FoldingRange = exports3.FoldingRange || (exports3.FoldingRange = {}));
      var DiagnosticRelatedInformation;
      (function(DiagnosticRelatedInformation2) {
        function create(location, message) {
          return {
            location,
            message
          };
        }
        DiagnosticRelatedInformation2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
        }
        DiagnosticRelatedInformation2.is = is;
      })(DiagnosticRelatedInformation = exports3.DiagnosticRelatedInformation || (exports3.DiagnosticRelatedInformation = {}));
      var DiagnosticSeverity;
      (function(DiagnosticSeverity2) {
        DiagnosticSeverity2.Error = 1;
        DiagnosticSeverity2.Warning = 2;
        DiagnosticSeverity2.Information = 3;
        DiagnosticSeverity2.Hint = 4;
      })(DiagnosticSeverity = exports3.DiagnosticSeverity || (exports3.DiagnosticSeverity = {}));
      var DiagnosticTag;
      (function(DiagnosticTag2) {
        DiagnosticTag2.Unnecessary = 1;
        DiagnosticTag2.Deprecated = 2;
      })(DiagnosticTag = exports3.DiagnosticTag || (exports3.DiagnosticTag = {}));
      var Diagnostic;
      (function(Diagnostic2) {
        function create(range, message, severity, code, source, relatedInformation) {
          var result = { range, message };
          if (Is.defined(severity)) {
            result.severity = severity;
          }
          if (Is.defined(code)) {
            result.code = code;
          }
          if (Is.defined(source)) {
            result.source = source;
          }
          if (Is.defined(relatedInformation)) {
            result.relatedInformation = relatedInformation;
          }
          return result;
        }
        Diagnostic2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
        }
        Diagnostic2.is = is;
      })(Diagnostic = exports3.Diagnostic || (exports3.Diagnostic = {}));
      var Command;
      (function(Command2) {
        function create(title, command) {
          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
          }
          var result = { title, command };
          if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
          }
          return result;
        }
        Command2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
        }
        Command2.is = is;
      })(Command = exports3.Command || (exports3.Command = {}));
      var TextEdit;
      (function(TextEdit2) {
        function replace(range, newText) {
          return { range, newText };
        }
        TextEdit2.replace = replace;
        function insert(position, newText) {
          return { range: { start: position, end: position }, newText };
        }
        TextEdit2.insert = insert;
        function del(range) {
          return { range, newText: "" };
        }
        TextEdit2.del = del;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
        }
        TextEdit2.is = is;
      })(TextEdit = exports3.TextEdit || (exports3.TextEdit = {}));
      var TextDocumentEdit;
      (function(TextDocumentEdit2) {
        function create(textDocument, edits) {
          return { textDocument, edits };
        }
        TextDocumentEdit2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && VersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
        }
        TextDocumentEdit2.is = is;
      })(TextDocumentEdit = exports3.TextDocumentEdit || (exports3.TextDocumentEdit = {}));
      var CreateFile;
      (function(CreateFile2) {
        function create(uri, options) {
          var result = {
            kind: "create",
            uri
          };
          if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
          }
          return result;
        }
        CreateFile2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists)));
        }
        CreateFile2.is = is;
      })(CreateFile = exports3.CreateFile || (exports3.CreateFile = {}));
      var RenameFile;
      (function(RenameFile2) {
        function create(oldUri, newUri, options) {
          var result = {
            kind: "rename",
            oldUri,
            newUri
          };
          if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
          }
          return result;
        }
        RenameFile2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists)));
        }
        RenameFile2.is = is;
      })(RenameFile = exports3.RenameFile || (exports3.RenameFile = {}));
      var DeleteFile;
      (function(DeleteFile2) {
        function create(uri, options) {
          var result = {
            kind: "delete",
            uri
          };
          if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
            result.options = options;
          }
          return result;
        }
        DeleteFile2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists)));
        }
        DeleteFile2.is = is;
      })(DeleteFile = exports3.DeleteFile || (exports3.DeleteFile = {}));
      var WorkspaceEdit;
      (function(WorkspaceEdit2) {
        function is(value) {
          var candidate = value;
          return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every(function(change) {
            if (Is.string(change.kind)) {
              return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
            } else {
              return TextDocumentEdit.is(change);
            }
          }));
        }
        WorkspaceEdit2.is = is;
      })(WorkspaceEdit = exports3.WorkspaceEdit || (exports3.WorkspaceEdit = {}));
      var TextEditChangeImpl = (
        /** @class */
        (function() {
          function TextEditChangeImpl2(edits) {
            this.edits = edits;
          }
          TextEditChangeImpl2.prototype.insert = function(position, newText) {
            this.edits.push(TextEdit.insert(position, newText));
          };
          TextEditChangeImpl2.prototype.replace = function(range, newText) {
            this.edits.push(TextEdit.replace(range, newText));
          };
          TextEditChangeImpl2.prototype.delete = function(range) {
            this.edits.push(TextEdit.del(range));
          };
          TextEditChangeImpl2.prototype.add = function(edit) {
            this.edits.push(edit);
          };
          TextEditChangeImpl2.prototype.all = function() {
            return this.edits;
          };
          TextEditChangeImpl2.prototype.clear = function() {
            this.edits.splice(0, this.edits.length);
          };
          return TextEditChangeImpl2;
        })()
      );
      var WorkspaceChange = (
        /** @class */
        (function() {
          function WorkspaceChange2(workspaceEdit) {
            var _this = this;
            this._textEditChanges = /* @__PURE__ */ Object.create(null);
            if (workspaceEdit) {
              this._workspaceEdit = workspaceEdit;
              if (workspaceEdit.documentChanges) {
                workspaceEdit.documentChanges.forEach(function(change) {
                  if (TextDocumentEdit.is(change)) {
                    var textEditChange = new TextEditChangeImpl(change.edits);
                    _this._textEditChanges[change.textDocument.uri] = textEditChange;
                  }
                });
              } else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function(key) {
                  var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                  _this._textEditChanges[key] = textEditChange;
                });
              }
            }
          }
          Object.defineProperty(WorkspaceChange2.prototype, "edit", {
            /**
             * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
             * use to be returned from a workspace edit operation like rename.
             */
            get: function() {
              return this._workspaceEdit;
            },
            enumerable: true,
            configurable: true
          });
          WorkspaceChange2.prototype.getTextEditChange = function(key) {
            if (VersionedTextDocumentIdentifier.is(key)) {
              if (!this._workspaceEdit) {
                this._workspaceEdit = {
                  documentChanges: []
                };
              }
              if (!this._workspaceEdit.documentChanges) {
                throw new Error("Workspace edit is not configured for document changes.");
              }
              var textDocument = key;
              var result = this._textEditChanges[textDocument.uri];
              if (!result) {
                var edits = [];
                var textDocumentEdit = {
                  textDocument,
                  edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[textDocument.uri] = result;
              }
              return result;
            } else {
              if (!this._workspaceEdit) {
                this._workspaceEdit = {
                  changes: /* @__PURE__ */ Object.create(null)
                };
              }
              if (!this._workspaceEdit.changes) {
                throw new Error("Workspace edit is not configured for normal text edit changes.");
              }
              var result = this._textEditChanges[key];
              if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
              }
              return result;
            }
          };
          WorkspaceChange2.prototype.createFile = function(uri, options) {
            this.checkDocumentChanges();
            this._workspaceEdit.documentChanges.push(CreateFile.create(uri, options));
          };
          WorkspaceChange2.prototype.renameFile = function(oldUri, newUri, options) {
            this.checkDocumentChanges();
            this._workspaceEdit.documentChanges.push(RenameFile.create(oldUri, newUri, options));
          };
          WorkspaceChange2.prototype.deleteFile = function(uri, options) {
            this.checkDocumentChanges();
            this._workspaceEdit.documentChanges.push(DeleteFile.create(uri, options));
          };
          WorkspaceChange2.prototype.checkDocumentChanges = function() {
            if (!this._workspaceEdit || !this._workspaceEdit.documentChanges) {
              throw new Error("Workspace edit is not configured for document changes.");
            }
          };
          return WorkspaceChange2;
        })()
      );
      exports3.WorkspaceChange = WorkspaceChange;
      var TextDocumentIdentifier;
      (function(TextDocumentIdentifier2) {
        function create(uri) {
          return { uri };
        }
        TextDocumentIdentifier2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri);
        }
        TextDocumentIdentifier2.is = is;
      })(TextDocumentIdentifier = exports3.TextDocumentIdentifier || (exports3.TextDocumentIdentifier = {}));
      var VersionedTextDocumentIdentifier;
      (function(VersionedTextDocumentIdentifier2) {
        function create(uri, version) {
          return { uri, version };
        }
        VersionedTextDocumentIdentifier2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.number(candidate.version));
        }
        VersionedTextDocumentIdentifier2.is = is;
      })(VersionedTextDocumentIdentifier = exports3.VersionedTextDocumentIdentifier || (exports3.VersionedTextDocumentIdentifier = {}));
      var TextDocumentItem;
      (function(TextDocumentItem2) {
        function create(uri, languageId, version, text) {
          return { uri, languageId, version, text };
        }
        TextDocumentItem2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.number(candidate.version) && Is.string(candidate.text);
        }
        TextDocumentItem2.is = is;
      })(TextDocumentItem = exports3.TextDocumentItem || (exports3.TextDocumentItem = {}));
      var MarkupKind;
      (function(MarkupKind2) {
        MarkupKind2.PlainText = "plaintext";
        MarkupKind2.Markdown = "markdown";
      })(MarkupKind = exports3.MarkupKind || (exports3.MarkupKind = {}));
      (function(MarkupKind2) {
        function is(value) {
          var candidate = value;
          return candidate === MarkupKind2.PlainText || candidate === MarkupKind2.Markdown;
        }
        MarkupKind2.is = is;
      })(MarkupKind = exports3.MarkupKind || (exports3.MarkupKind = {}));
      var MarkupContent;
      (function(MarkupContent2) {
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
        }
        MarkupContent2.is = is;
      })(MarkupContent = exports3.MarkupContent || (exports3.MarkupContent = {}));
      var CompletionItemKind;
      (function(CompletionItemKind2) {
        CompletionItemKind2.Text = 1;
        CompletionItemKind2.Method = 2;
        CompletionItemKind2.Function = 3;
        CompletionItemKind2.Constructor = 4;
        CompletionItemKind2.Field = 5;
        CompletionItemKind2.Variable = 6;
        CompletionItemKind2.Class = 7;
        CompletionItemKind2.Interface = 8;
        CompletionItemKind2.Module = 9;
        CompletionItemKind2.Property = 10;
        CompletionItemKind2.Unit = 11;
        CompletionItemKind2.Value = 12;
        CompletionItemKind2.Enum = 13;
        CompletionItemKind2.Keyword = 14;
        CompletionItemKind2.Snippet = 15;
        CompletionItemKind2.Color = 16;
        CompletionItemKind2.File = 17;
        CompletionItemKind2.Reference = 18;
        CompletionItemKind2.Folder = 19;
        CompletionItemKind2.EnumMember = 20;
        CompletionItemKind2.Constant = 21;
        CompletionItemKind2.Struct = 22;
        CompletionItemKind2.Event = 23;
        CompletionItemKind2.Operator = 24;
        CompletionItemKind2.TypeParameter = 25;
      })(CompletionItemKind = exports3.CompletionItemKind || (exports3.CompletionItemKind = {}));
      var InsertTextFormat;
      (function(InsertTextFormat2) {
        InsertTextFormat2.PlainText = 1;
        InsertTextFormat2.Snippet = 2;
      })(InsertTextFormat = exports3.InsertTextFormat || (exports3.InsertTextFormat = {}));
      var CompletionItemTag;
      (function(CompletionItemTag2) {
        CompletionItemTag2.Deprecated = 1;
      })(CompletionItemTag = exports3.CompletionItemTag || (exports3.CompletionItemTag = {}));
      var CompletionItem;
      (function(CompletionItem2) {
        function create(label) {
          return { label };
        }
        CompletionItem2.create = create;
      })(CompletionItem = exports3.CompletionItem || (exports3.CompletionItem = {}));
      var CompletionList;
      (function(CompletionList2) {
        function create(items, isIncomplete) {
          return { items: items ? items : [], isIncomplete: !!isIncomplete };
        }
        CompletionList2.create = create;
      })(CompletionList = exports3.CompletionList || (exports3.CompletionList = {}));
      var MarkedString;
      (function(MarkedString2) {
        function fromPlainText(plainText) {
          return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
        }
        MarkedString2.fromPlainText = fromPlainText;
        function is(value) {
          var candidate = value;
          return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
        }
        MarkedString2.is = is;
      })(MarkedString = exports3.MarkedString || (exports3.MarkedString = {}));
      var Hover;
      (function(Hover2) {
        function is(value) {
          var candidate = value;
          return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
        }
        Hover2.is = is;
      })(Hover = exports3.Hover || (exports3.Hover = {}));
      var ParameterInformation;
      (function(ParameterInformation2) {
        function create(label, documentation) {
          return documentation ? { label, documentation } : { label };
        }
        ParameterInformation2.create = create;
      })(ParameterInformation = exports3.ParameterInformation || (exports3.ParameterInformation = {}));
      var SignatureInformation;
      (function(SignatureInformation2) {
        function create(label, documentation) {
          var parameters = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
          }
          var result = { label };
          if (Is.defined(documentation)) {
            result.documentation = documentation;
          }
          if (Is.defined(parameters)) {
            result.parameters = parameters;
          } else {
            result.parameters = [];
          }
          return result;
        }
        SignatureInformation2.create = create;
      })(SignatureInformation = exports3.SignatureInformation || (exports3.SignatureInformation = {}));
      var DocumentHighlightKind;
      (function(DocumentHighlightKind2) {
        DocumentHighlightKind2.Text = 1;
        DocumentHighlightKind2.Read = 2;
        DocumentHighlightKind2.Write = 3;
      })(DocumentHighlightKind = exports3.DocumentHighlightKind || (exports3.DocumentHighlightKind = {}));
      var DocumentHighlight;
      (function(DocumentHighlight2) {
        function create(range, kind) {
          var result = { range };
          if (Is.number(kind)) {
            result.kind = kind;
          }
          return result;
        }
        DocumentHighlight2.create = create;
      })(DocumentHighlight = exports3.DocumentHighlight || (exports3.DocumentHighlight = {}));
      var SymbolKind;
      (function(SymbolKind2) {
        SymbolKind2.File = 1;
        SymbolKind2.Module = 2;
        SymbolKind2.Namespace = 3;
        SymbolKind2.Package = 4;
        SymbolKind2.Class = 5;
        SymbolKind2.Method = 6;
        SymbolKind2.Property = 7;
        SymbolKind2.Field = 8;
        SymbolKind2.Constructor = 9;
        SymbolKind2.Enum = 10;
        SymbolKind2.Interface = 11;
        SymbolKind2.Function = 12;
        SymbolKind2.Variable = 13;
        SymbolKind2.Constant = 14;
        SymbolKind2.String = 15;
        SymbolKind2.Number = 16;
        SymbolKind2.Boolean = 17;
        SymbolKind2.Array = 18;
        SymbolKind2.Object = 19;
        SymbolKind2.Key = 20;
        SymbolKind2.Null = 21;
        SymbolKind2.EnumMember = 22;
        SymbolKind2.Struct = 23;
        SymbolKind2.Event = 24;
        SymbolKind2.Operator = 25;
        SymbolKind2.TypeParameter = 26;
      })(SymbolKind = exports3.SymbolKind || (exports3.SymbolKind = {}));
      var SymbolTag;
      (function(SymbolTag2) {
        SymbolTag2.Deprecated = 1;
      })(SymbolTag = exports3.SymbolTag || (exports3.SymbolTag = {}));
      var SymbolInformation;
      (function(SymbolInformation2) {
        function create(name, kind, range, uri, containerName) {
          var result = {
            name,
            kind,
            location: { uri, range }
          };
          if (containerName) {
            result.containerName = containerName;
          }
          return result;
        }
        SymbolInformation2.create = create;
      })(SymbolInformation = exports3.SymbolInformation || (exports3.SymbolInformation = {}));
      var DocumentSymbol;
      (function(DocumentSymbol2) {
        function create(name, detail, kind, range, selectionRange, children) {
          var result = {
            name,
            detail,
            kind,
            range,
            selectionRange
          };
          if (children !== void 0) {
            result.children = children;
          }
          return result;
        }
        DocumentSymbol2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children));
        }
        DocumentSymbol2.is = is;
      })(DocumentSymbol = exports3.DocumentSymbol || (exports3.DocumentSymbol = {}));
      var CodeActionKind;
      (function(CodeActionKind2) {
        CodeActionKind2.Empty = "";
        CodeActionKind2.QuickFix = "quickfix";
        CodeActionKind2.Refactor = "refactor";
        CodeActionKind2.RefactorExtract = "refactor.extract";
        CodeActionKind2.RefactorInline = "refactor.inline";
        CodeActionKind2.RefactorRewrite = "refactor.rewrite";
        CodeActionKind2.Source = "source";
        CodeActionKind2.SourceOrganizeImports = "source.organizeImports";
        CodeActionKind2.SourceFixAll = "source.fixAll";
      })(CodeActionKind = exports3.CodeActionKind || (exports3.CodeActionKind = {}));
      var CodeActionContext;
      (function(CodeActionContext2) {
        function create(diagnostics, only) {
          var result = { diagnostics };
          if (only !== void 0 && only !== null) {
            result.only = only;
          }
          return result;
        }
        CodeActionContext2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
        }
        CodeActionContext2.is = is;
      })(CodeActionContext = exports3.CodeActionContext || (exports3.CodeActionContext = {}));
      var CodeAction;
      (function(CodeAction2) {
        function create(title, commandOrEdit, kind) {
          var result = { title };
          if (Command.is(commandOrEdit)) {
            result.command = commandOrEdit;
          } else {
            result.edit = commandOrEdit;
          }
          if (kind !== void 0) {
            result.kind = kind;
          }
          return result;
        }
        CodeAction2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
        }
        CodeAction2.is = is;
      })(CodeAction = exports3.CodeAction || (exports3.CodeAction = {}));
      var CodeLens;
      (function(CodeLens2) {
        function create(range, data) {
          var result = { range };
          if (Is.defined(data)) {
            result.data = data;
          }
          return result;
        }
        CodeLens2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
        }
        CodeLens2.is = is;
      })(CodeLens = exports3.CodeLens || (exports3.CodeLens = {}));
      var FormattingOptions;
      (function(FormattingOptions2) {
        function create(tabSize, insertSpaces) {
          return { tabSize, insertSpaces };
        }
        FormattingOptions2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.number(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
        }
        FormattingOptions2.is = is;
      })(FormattingOptions = exports3.FormattingOptions || (exports3.FormattingOptions = {}));
      var DocumentLink;
      (function(DocumentLink2) {
        function create(range, target, data) {
          return { range, target, data };
        }
        DocumentLink2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
        }
        DocumentLink2.is = is;
      })(DocumentLink = exports3.DocumentLink || (exports3.DocumentLink = {}));
      var SelectionRange;
      (function(SelectionRange2) {
        function create(range, parent) {
          return { range, parent };
        }
        SelectionRange2.create = create;
        function is(value) {
          var candidate = value;
          return candidate !== void 0 && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
        }
        SelectionRange2.is = is;
      })(SelectionRange = exports3.SelectionRange || (exports3.SelectionRange = {}));
      exports3.EOL = ["\n", "\r\n", "\r"];
      var TextDocument;
      (function(TextDocument2) {
        function create(uri, languageId, version, content) {
          return new FullTextDocument(uri, languageId, version, content);
        }
        TextDocument2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.number(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
        }
        TextDocument2.is = is;
        function applyEdits(document, edits) {
          var text = document.getText();
          var sortedEdits = mergeSort(edits, function(a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
              return a.range.start.character - b.range.start.character;
            }
            return diff;
          });
          var lastModifiedOffset = text.length;
          for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
              text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            } else {
              throw new Error("Overlapping edit");
            }
            lastModifiedOffset = startOffset;
          }
          return text;
        }
        TextDocument2.applyEdits = applyEdits;
        function mergeSort(data, compare) {
          if (data.length <= 1) {
            return data;
          }
          var p = data.length / 2 | 0;
          var left = data.slice(0, p);
          var right = data.slice(p);
          mergeSort(left, compare);
          mergeSort(right, compare);
          var leftIdx = 0;
          var rightIdx = 0;
          var i = 0;
          while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
              data[i++] = left[leftIdx++];
            } else {
              data[i++] = right[rightIdx++];
            }
          }
          while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
          }
          while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
          }
          return data;
        }
      })(TextDocument = exports3.TextDocument || (exports3.TextDocument = {}));
      var FullTextDocument = (
        /** @class */
        (function() {
          function FullTextDocument2(uri, languageId, version, content) {
            this._uri = uri;
            this._languageId = languageId;
            this._version = version;
            this._content = content;
            this._lineOffsets = void 0;
          }
          Object.defineProperty(FullTextDocument2.prototype, "uri", {
            get: function() {
              return this._uri;
            },
            enumerable: true,
            configurable: true
          });
          Object.defineProperty(FullTextDocument2.prototype, "languageId", {
            get: function() {
              return this._languageId;
            },
            enumerable: true,
            configurable: true
          });
          Object.defineProperty(FullTextDocument2.prototype, "version", {
            get: function() {
              return this._version;
            },
            enumerable: true,
            configurable: true
          });
          FullTextDocument2.prototype.getText = function(range) {
            if (range) {
              var start = this.offsetAt(range.start);
              var end = this.offsetAt(range.end);
              return this._content.substring(start, end);
            }
            return this._content;
          };
          FullTextDocument2.prototype.update = function(event, version) {
            this._content = event.text;
            this._version = version;
            this._lineOffsets = void 0;
          };
          FullTextDocument2.prototype.getLineOffsets = function() {
            if (this._lineOffsets === void 0) {
              var lineOffsets = [];
              var text = this._content;
              var isLineStart = true;
              for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                  lineOffsets.push(i);
                  isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = ch === "\r" || ch === "\n";
                if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
                  i++;
                }
              }
              if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
              }
              this._lineOffsets = lineOffsets;
            }
            return this._lineOffsets;
          };
          FullTextDocument2.prototype.positionAt = function(offset) {
            offset = Math.max(Math.min(offset, this._content.length), 0);
            var lineOffsets = this.getLineOffsets();
            var low = 0, high = lineOffsets.length;
            if (high === 0) {
              return Position.create(0, offset);
            }
            while (low < high) {
              var mid = Math.floor((low + high) / 2);
              if (lineOffsets[mid] > offset) {
                high = mid;
              } else {
                low = mid + 1;
              }
            }
            var line = low - 1;
            return Position.create(line, offset - lineOffsets[line]);
          };
          FullTextDocument2.prototype.offsetAt = function(position) {
            var lineOffsets = this.getLineOffsets();
            if (position.line >= lineOffsets.length) {
              return this._content.length;
            } else if (position.line < 0) {
              return 0;
            }
            var lineOffset = lineOffsets[position.line];
            var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
            return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
          };
          Object.defineProperty(FullTextDocument2.prototype, "lineCount", {
            get: function() {
              return this.getLineOffsets().length;
            },
            enumerable: true,
            configurable: true
          });
          return FullTextDocument2;
        })()
      );
      var Is;
      (function(Is2) {
        var toString = Object.prototype.toString;
        function defined(value) {
          return typeof value !== "undefined";
        }
        Is2.defined = defined;
        function undefined2(value) {
          return typeof value === "undefined";
        }
        Is2.undefined = undefined2;
        function boolean(value) {
          return value === true || value === false;
        }
        Is2.boolean = boolean;
        function string(value) {
          return toString.call(value) === "[object String]";
        }
        Is2.string = string;
        function number(value) {
          return toString.call(value) === "[object Number]";
        }
        Is2.number = number;
        function func(value) {
          return toString.call(value) === "[object Function]";
        }
        Is2.func = func;
        function objectLiteral(value) {
          return value !== null && typeof value === "object";
        }
        Is2.objectLiteral = objectLiteral;
        function typedArray(value, check) {
          return Array.isArray(value) && value.every(check);
        }
        Is2.typedArray = typedArray;
      })(Is || (Is = {}));
    });
  }
});

// node_modules/vscode-languageserver-protocol/lib/utils/is.js
var require_is2 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/utils/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    exports2.typedArray = typedArray;
    function objectLiteral(value) {
      return value !== null && typeof value === "object";
    }
    exports2.objectLiteral = objectLiteral;
  }
});

// node_modules/vscode-languageserver-protocol/lib/messages.js
var require_messages2 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/messages.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_jsonrpc_1 = require_main();
    var ProtocolRequestType0 = class extends vscode_jsonrpc_1.RequestType0 {
      constructor(method) {
        super(method);
      }
    };
    exports2.ProtocolRequestType0 = ProtocolRequestType0;
    var ProtocolRequestType = class extends vscode_jsonrpc_1.RequestType {
      constructor(method) {
        super(method);
      }
    };
    exports2.ProtocolRequestType = ProtocolRequestType;
    var ProtocolNotificationType = class extends vscode_jsonrpc_1.NotificationType {
      constructor(method) {
        super(method);
      }
    };
    exports2.ProtocolNotificationType = ProtocolNotificationType;
    var ProtocolNotificationType0 = class extends vscode_jsonrpc_1.NotificationType0 {
      constructor(method) {
        super(method);
      }
    };
    exports2.ProtocolNotificationType0 = ProtocolNotificationType0;
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.implementation.js
var require_protocol_implementation = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.implementation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var ImplementationRequest;
    (function(ImplementationRequest2) {
      ImplementationRequest2.method = "textDocument/implementation";
      ImplementationRequest2.type = new messages_1.ProtocolRequestType(ImplementationRequest2.method);
      ImplementationRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(ImplementationRequest = exports2.ImplementationRequest || (exports2.ImplementationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.typeDefinition.js
var require_protocol_typeDefinition = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.typeDefinition.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var TypeDefinitionRequest;
    (function(TypeDefinitionRequest2) {
      TypeDefinitionRequest2.method = "textDocument/typeDefinition";
      TypeDefinitionRequest2.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest2.method);
      TypeDefinitionRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(TypeDefinitionRequest = exports2.TypeDefinitionRequest || (exports2.TypeDefinitionRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.workspaceFolders.js
var require_protocol_workspaceFolders = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.workspaceFolders.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var messages_1 = require_messages2();
    var WorkspaceFoldersRequest;
    (function(WorkspaceFoldersRequest2) {
      WorkspaceFoldersRequest2.type = new messages_1.ProtocolRequestType0("workspace/workspaceFolders");
    })(WorkspaceFoldersRequest = exports2.WorkspaceFoldersRequest || (exports2.WorkspaceFoldersRequest = {}));
    var DidChangeWorkspaceFoldersNotification;
    (function(DidChangeWorkspaceFoldersNotification2) {
      DidChangeWorkspaceFoldersNotification2.type = new messages_1.ProtocolNotificationType("workspace/didChangeWorkspaceFolders");
    })(DidChangeWorkspaceFoldersNotification = exports2.DidChangeWorkspaceFoldersNotification || (exports2.DidChangeWorkspaceFoldersNotification = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.configuration.js
var require_protocol_configuration = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var messages_1 = require_messages2();
    var ConfigurationRequest;
    (function(ConfigurationRequest2) {
      ConfigurationRequest2.type = new messages_1.ProtocolRequestType("workspace/configuration");
    })(ConfigurationRequest = exports2.ConfigurationRequest || (exports2.ConfigurationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.colorProvider.js
var require_protocol_colorProvider = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.colorProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var DocumentColorRequest;
    (function(DocumentColorRequest2) {
      DocumentColorRequest2.method = "textDocument/documentColor";
      DocumentColorRequest2.type = new messages_1.ProtocolRequestType(DocumentColorRequest2.method);
      DocumentColorRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(DocumentColorRequest = exports2.DocumentColorRequest || (exports2.DocumentColorRequest = {}));
    var ColorPresentationRequest;
    (function(ColorPresentationRequest2) {
      ColorPresentationRequest2.type = new messages_1.ProtocolRequestType("textDocument/colorPresentation");
    })(ColorPresentationRequest = exports2.ColorPresentationRequest || (exports2.ColorPresentationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.foldingRange.js
var require_protocol_foldingRange = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.foldingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var FoldingRangeKind;
    (function(FoldingRangeKind2) {
      FoldingRangeKind2["Comment"] = "comment";
      FoldingRangeKind2["Imports"] = "imports";
      FoldingRangeKind2["Region"] = "region";
    })(FoldingRangeKind = exports2.FoldingRangeKind || (exports2.FoldingRangeKind = {}));
    var FoldingRangeRequest;
    (function(FoldingRangeRequest2) {
      FoldingRangeRequest2.method = "textDocument/foldingRange";
      FoldingRangeRequest2.type = new messages_1.ProtocolRequestType(FoldingRangeRequest2.method);
      FoldingRangeRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(FoldingRangeRequest = exports2.FoldingRangeRequest || (exports2.FoldingRangeRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.declaration.js
var require_protocol_declaration = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.declaration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var DeclarationRequest;
    (function(DeclarationRequest2) {
      DeclarationRequest2.method = "textDocument/declaration";
      DeclarationRequest2.type = new messages_1.ProtocolRequestType(DeclarationRequest2.method);
      DeclarationRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(DeclarationRequest = exports2.DeclarationRequest || (exports2.DeclarationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.selectionRange.js
var require_protocol_selectionRange = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.selectionRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var SelectionRangeRequest;
    (function(SelectionRangeRequest2) {
      SelectionRangeRequest2.method = "textDocument/selectionRange";
      SelectionRangeRequest2.type = new messages_1.ProtocolRequestType(SelectionRangeRequest2.method);
      SelectionRangeRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(SelectionRangeRequest = exports2.SelectionRangeRequest || (exports2.SelectionRangeRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.progress.js
var require_protocol_progress = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.progress.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var WorkDoneProgress;
    (function(WorkDoneProgress2) {
      WorkDoneProgress2.type = new vscode_jsonrpc_1.ProgressType();
    })(WorkDoneProgress = exports2.WorkDoneProgress || (exports2.WorkDoneProgress = {}));
    var WorkDoneProgressCreateRequest;
    (function(WorkDoneProgressCreateRequest2) {
      WorkDoneProgressCreateRequest2.type = new messages_1.ProtocolRequestType("window/workDoneProgress/create");
    })(WorkDoneProgressCreateRequest = exports2.WorkDoneProgressCreateRequest || (exports2.WorkDoneProgressCreateRequest = {}));
    var WorkDoneProgressCancelNotification;
    (function(WorkDoneProgressCancelNotification2) {
      WorkDoneProgressCancelNotification2.type = new messages_1.ProtocolNotificationType("window/workDoneProgress/cancel");
    })(WorkDoneProgressCancelNotification = exports2.WorkDoneProgressCancelNotification || (exports2.WorkDoneProgressCancelNotification = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.js
var require_protocol = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Is = require_is2();
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var protocol_implementation_1 = require_protocol_implementation();
    exports2.ImplementationRequest = protocol_implementation_1.ImplementationRequest;
    var protocol_typeDefinition_1 = require_protocol_typeDefinition();
    exports2.TypeDefinitionRequest = protocol_typeDefinition_1.TypeDefinitionRequest;
    var protocol_workspaceFolders_1 = require_protocol_workspaceFolders();
    exports2.WorkspaceFoldersRequest = protocol_workspaceFolders_1.WorkspaceFoldersRequest;
    exports2.DidChangeWorkspaceFoldersNotification = protocol_workspaceFolders_1.DidChangeWorkspaceFoldersNotification;
    var protocol_configuration_1 = require_protocol_configuration();
    exports2.ConfigurationRequest = protocol_configuration_1.ConfigurationRequest;
    var protocol_colorProvider_1 = require_protocol_colorProvider();
    exports2.DocumentColorRequest = protocol_colorProvider_1.DocumentColorRequest;
    exports2.ColorPresentationRequest = protocol_colorProvider_1.ColorPresentationRequest;
    var protocol_foldingRange_1 = require_protocol_foldingRange();
    exports2.FoldingRangeRequest = protocol_foldingRange_1.FoldingRangeRequest;
    var protocol_declaration_1 = require_protocol_declaration();
    exports2.DeclarationRequest = protocol_declaration_1.DeclarationRequest;
    var protocol_selectionRange_1 = require_protocol_selectionRange();
    exports2.SelectionRangeRequest = protocol_selectionRange_1.SelectionRangeRequest;
    var protocol_progress_1 = require_protocol_progress();
    exports2.WorkDoneProgress = protocol_progress_1.WorkDoneProgress;
    exports2.WorkDoneProgressCreateRequest = protocol_progress_1.WorkDoneProgressCreateRequest;
    exports2.WorkDoneProgressCancelNotification = protocol_progress_1.WorkDoneProgressCancelNotification;
    var DocumentFilter;
    (function(DocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern);
      }
      DocumentFilter2.is = is;
    })(DocumentFilter = exports2.DocumentFilter || (exports2.DocumentFilter = {}));
    var DocumentSelector;
    (function(DocumentSelector2) {
      function is(value) {
        if (!Array.isArray(value)) {
          return false;
        }
        for (let elem of value) {
          if (!Is.string(elem) && !DocumentFilter.is(elem)) {
            return false;
          }
        }
        return true;
      }
      DocumentSelector2.is = is;
    })(DocumentSelector = exports2.DocumentSelector || (exports2.DocumentSelector = {}));
    var RegistrationRequest;
    (function(RegistrationRequest2) {
      RegistrationRequest2.type = new messages_1.ProtocolRequestType("client/registerCapability");
    })(RegistrationRequest = exports2.RegistrationRequest || (exports2.RegistrationRequest = {}));
    var UnregistrationRequest;
    (function(UnregistrationRequest2) {
      UnregistrationRequest2.type = new messages_1.ProtocolRequestType("client/unregisterCapability");
    })(UnregistrationRequest = exports2.UnregistrationRequest || (exports2.UnregistrationRequest = {}));
    var ResourceOperationKind;
    (function(ResourceOperationKind2) {
      ResourceOperationKind2.Create = "create";
      ResourceOperationKind2.Rename = "rename";
      ResourceOperationKind2.Delete = "delete";
    })(ResourceOperationKind = exports2.ResourceOperationKind || (exports2.ResourceOperationKind = {}));
    var FailureHandlingKind;
    (function(FailureHandlingKind2) {
      FailureHandlingKind2.Abort = "abort";
      FailureHandlingKind2.Transactional = "transactional";
      FailureHandlingKind2.TextOnlyTransactional = "textOnlyTransactional";
      FailureHandlingKind2.Undo = "undo";
    })(FailureHandlingKind = exports2.FailureHandlingKind || (exports2.FailureHandlingKind = {}));
    var StaticRegistrationOptions;
    (function(StaticRegistrationOptions2) {
      function hasId(value) {
        const candidate = value;
        return candidate && Is.string(candidate.id) && candidate.id.length > 0;
      }
      StaticRegistrationOptions2.hasId = hasId;
    })(StaticRegistrationOptions = exports2.StaticRegistrationOptions || (exports2.StaticRegistrationOptions = {}));
    var TextDocumentRegistrationOptions;
    (function(TextDocumentRegistrationOptions2) {
      function is(value) {
        const candidate = value;
        return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
      }
      TextDocumentRegistrationOptions2.is = is;
    })(TextDocumentRegistrationOptions = exports2.TextDocumentRegistrationOptions || (exports2.TextDocumentRegistrationOptions = {}));
    var WorkDoneProgressOptions;
    (function(WorkDoneProgressOptions2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (candidate.workDoneProgress === void 0 || Is.boolean(candidate.workDoneProgress));
      }
      WorkDoneProgressOptions2.is = is;
      function hasWorkDoneProgress(value) {
        const candidate = value;
        return candidate && Is.boolean(candidate.workDoneProgress);
      }
      WorkDoneProgressOptions2.hasWorkDoneProgress = hasWorkDoneProgress;
    })(WorkDoneProgressOptions = exports2.WorkDoneProgressOptions || (exports2.WorkDoneProgressOptions = {}));
    var InitializeRequest;
    (function(InitializeRequest2) {
      InitializeRequest2.type = new messages_1.ProtocolRequestType("initialize");
    })(InitializeRequest = exports2.InitializeRequest || (exports2.InitializeRequest = {}));
    var InitializeError;
    (function(InitializeError2) {
      InitializeError2.unknownProtocolVersion = 1;
    })(InitializeError = exports2.InitializeError || (exports2.InitializeError = {}));
    var InitializedNotification;
    (function(InitializedNotification2) {
      InitializedNotification2.type = new messages_1.ProtocolNotificationType("initialized");
    })(InitializedNotification = exports2.InitializedNotification || (exports2.InitializedNotification = {}));
    var ShutdownRequest;
    (function(ShutdownRequest2) {
      ShutdownRequest2.type = new messages_1.ProtocolRequestType0("shutdown");
    })(ShutdownRequest = exports2.ShutdownRequest || (exports2.ShutdownRequest = {}));
    var ExitNotification;
    (function(ExitNotification2) {
      ExitNotification2.type = new messages_1.ProtocolNotificationType0("exit");
    })(ExitNotification = exports2.ExitNotification || (exports2.ExitNotification = {}));
    var DidChangeConfigurationNotification;
    (function(DidChangeConfigurationNotification2) {
      DidChangeConfigurationNotification2.type = new messages_1.ProtocolNotificationType("workspace/didChangeConfiguration");
    })(DidChangeConfigurationNotification = exports2.DidChangeConfigurationNotification || (exports2.DidChangeConfigurationNotification = {}));
    var MessageType;
    (function(MessageType2) {
      MessageType2.Error = 1;
      MessageType2.Warning = 2;
      MessageType2.Info = 3;
      MessageType2.Log = 4;
    })(MessageType = exports2.MessageType || (exports2.MessageType = {}));
    var ShowMessageNotification;
    (function(ShowMessageNotification2) {
      ShowMessageNotification2.type = new messages_1.ProtocolNotificationType("window/showMessage");
    })(ShowMessageNotification = exports2.ShowMessageNotification || (exports2.ShowMessageNotification = {}));
    var ShowMessageRequest;
    (function(ShowMessageRequest2) {
      ShowMessageRequest2.type = new messages_1.ProtocolRequestType("window/showMessageRequest");
    })(ShowMessageRequest = exports2.ShowMessageRequest || (exports2.ShowMessageRequest = {}));
    var LogMessageNotification;
    (function(LogMessageNotification2) {
      LogMessageNotification2.type = new messages_1.ProtocolNotificationType("window/logMessage");
    })(LogMessageNotification = exports2.LogMessageNotification || (exports2.LogMessageNotification = {}));
    var TelemetryEventNotification;
    (function(TelemetryEventNotification2) {
      TelemetryEventNotification2.type = new messages_1.ProtocolNotificationType("telemetry/event");
    })(TelemetryEventNotification = exports2.TelemetryEventNotification || (exports2.TelemetryEventNotification = {}));
    var TextDocumentSyncKind;
    (function(TextDocumentSyncKind2) {
      TextDocumentSyncKind2.None = 0;
      TextDocumentSyncKind2.Full = 1;
      TextDocumentSyncKind2.Incremental = 2;
    })(TextDocumentSyncKind = exports2.TextDocumentSyncKind || (exports2.TextDocumentSyncKind = {}));
    var DidOpenTextDocumentNotification;
    (function(DidOpenTextDocumentNotification2) {
      DidOpenTextDocumentNotification2.method = "textDocument/didOpen";
      DidOpenTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification2.method);
    })(DidOpenTextDocumentNotification = exports2.DidOpenTextDocumentNotification || (exports2.DidOpenTextDocumentNotification = {}));
    var DidChangeTextDocumentNotification;
    (function(DidChangeTextDocumentNotification2) {
      DidChangeTextDocumentNotification2.method = "textDocument/didChange";
      DidChangeTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification2.method);
    })(DidChangeTextDocumentNotification = exports2.DidChangeTextDocumentNotification || (exports2.DidChangeTextDocumentNotification = {}));
    var DidCloseTextDocumentNotification;
    (function(DidCloseTextDocumentNotification2) {
      DidCloseTextDocumentNotification2.method = "textDocument/didClose";
      DidCloseTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification2.method);
    })(DidCloseTextDocumentNotification = exports2.DidCloseTextDocumentNotification || (exports2.DidCloseTextDocumentNotification = {}));
    var DidSaveTextDocumentNotification;
    (function(DidSaveTextDocumentNotification2) {
      DidSaveTextDocumentNotification2.method = "textDocument/didSave";
      DidSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification2.method);
    })(DidSaveTextDocumentNotification = exports2.DidSaveTextDocumentNotification || (exports2.DidSaveTextDocumentNotification = {}));
    var TextDocumentSaveReason;
    (function(TextDocumentSaveReason2) {
      TextDocumentSaveReason2.Manual = 1;
      TextDocumentSaveReason2.AfterDelay = 2;
      TextDocumentSaveReason2.FocusOut = 3;
    })(TextDocumentSaveReason = exports2.TextDocumentSaveReason || (exports2.TextDocumentSaveReason = {}));
    var WillSaveTextDocumentNotification;
    (function(WillSaveTextDocumentNotification2) {
      WillSaveTextDocumentNotification2.method = "textDocument/willSave";
      WillSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification2.method);
    })(WillSaveTextDocumentNotification = exports2.WillSaveTextDocumentNotification || (exports2.WillSaveTextDocumentNotification = {}));
    var WillSaveTextDocumentWaitUntilRequest;
    (function(WillSaveTextDocumentWaitUntilRequest2) {
      WillSaveTextDocumentWaitUntilRequest2.method = "textDocument/willSaveWaitUntil";
      WillSaveTextDocumentWaitUntilRequest2.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest2.method);
    })(WillSaveTextDocumentWaitUntilRequest = exports2.WillSaveTextDocumentWaitUntilRequest || (exports2.WillSaveTextDocumentWaitUntilRequest = {}));
    var DidChangeWatchedFilesNotification;
    (function(DidChangeWatchedFilesNotification2) {
      DidChangeWatchedFilesNotification2.type = new messages_1.ProtocolNotificationType("workspace/didChangeWatchedFiles");
    })(DidChangeWatchedFilesNotification = exports2.DidChangeWatchedFilesNotification || (exports2.DidChangeWatchedFilesNotification = {}));
    var FileChangeType;
    (function(FileChangeType2) {
      FileChangeType2.Created = 1;
      FileChangeType2.Changed = 2;
      FileChangeType2.Deleted = 3;
    })(FileChangeType = exports2.FileChangeType || (exports2.FileChangeType = {}));
    var WatchKind;
    (function(WatchKind2) {
      WatchKind2.Create = 1;
      WatchKind2.Change = 2;
      WatchKind2.Delete = 4;
    })(WatchKind = exports2.WatchKind || (exports2.WatchKind = {}));
    var PublishDiagnosticsNotification;
    (function(PublishDiagnosticsNotification2) {
      PublishDiagnosticsNotification2.type = new messages_1.ProtocolNotificationType("textDocument/publishDiagnostics");
    })(PublishDiagnosticsNotification = exports2.PublishDiagnosticsNotification || (exports2.PublishDiagnosticsNotification = {}));
    var CompletionTriggerKind;
    (function(CompletionTriggerKind2) {
      CompletionTriggerKind2.Invoked = 1;
      CompletionTriggerKind2.TriggerCharacter = 2;
      CompletionTriggerKind2.TriggerForIncompleteCompletions = 3;
    })(CompletionTriggerKind = exports2.CompletionTriggerKind || (exports2.CompletionTriggerKind = {}));
    var CompletionRequest;
    (function(CompletionRequest2) {
      CompletionRequest2.method = "textDocument/completion";
      CompletionRequest2.type = new messages_1.ProtocolRequestType(CompletionRequest2.method);
      CompletionRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(CompletionRequest = exports2.CompletionRequest || (exports2.CompletionRequest = {}));
    var CompletionResolveRequest;
    (function(CompletionResolveRequest2) {
      CompletionResolveRequest2.method = "completionItem/resolve";
      CompletionResolveRequest2.type = new messages_1.ProtocolRequestType(CompletionResolveRequest2.method);
    })(CompletionResolveRequest = exports2.CompletionResolveRequest || (exports2.CompletionResolveRequest = {}));
    var HoverRequest;
    (function(HoverRequest2) {
      HoverRequest2.method = "textDocument/hover";
      HoverRequest2.type = new messages_1.ProtocolRequestType(HoverRequest2.method);
    })(HoverRequest = exports2.HoverRequest || (exports2.HoverRequest = {}));
    var SignatureHelpTriggerKind;
    (function(SignatureHelpTriggerKind2) {
      SignatureHelpTriggerKind2.Invoked = 1;
      SignatureHelpTriggerKind2.TriggerCharacter = 2;
      SignatureHelpTriggerKind2.ContentChange = 3;
    })(SignatureHelpTriggerKind = exports2.SignatureHelpTriggerKind || (exports2.SignatureHelpTriggerKind = {}));
    var SignatureHelpRequest;
    (function(SignatureHelpRequest2) {
      SignatureHelpRequest2.method = "textDocument/signatureHelp";
      SignatureHelpRequest2.type = new messages_1.ProtocolRequestType(SignatureHelpRequest2.method);
    })(SignatureHelpRequest = exports2.SignatureHelpRequest || (exports2.SignatureHelpRequest = {}));
    var DefinitionRequest;
    (function(DefinitionRequest2) {
      DefinitionRequest2.method = "textDocument/definition";
      DefinitionRequest2.type = new messages_1.ProtocolRequestType(DefinitionRequest2.method);
      DefinitionRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(DefinitionRequest = exports2.DefinitionRequest || (exports2.DefinitionRequest = {}));
    var ReferencesRequest;
    (function(ReferencesRequest2) {
      ReferencesRequest2.method = "textDocument/references";
      ReferencesRequest2.type = new messages_1.ProtocolRequestType(ReferencesRequest2.method);
      ReferencesRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(ReferencesRequest = exports2.ReferencesRequest || (exports2.ReferencesRequest = {}));
    var DocumentHighlightRequest;
    (function(DocumentHighlightRequest2) {
      DocumentHighlightRequest2.method = "textDocument/documentHighlight";
      DocumentHighlightRequest2.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest2.method);
      DocumentHighlightRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(DocumentHighlightRequest = exports2.DocumentHighlightRequest || (exports2.DocumentHighlightRequest = {}));
    var DocumentSymbolRequest;
    (function(DocumentSymbolRequest2) {
      DocumentSymbolRequest2.method = "textDocument/documentSymbol";
      DocumentSymbolRequest2.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest2.method);
      DocumentSymbolRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(DocumentSymbolRequest = exports2.DocumentSymbolRequest || (exports2.DocumentSymbolRequest = {}));
    var CodeActionRequest;
    (function(CodeActionRequest2) {
      CodeActionRequest2.method = "textDocument/codeAction";
      CodeActionRequest2.type = new messages_1.ProtocolRequestType(CodeActionRequest2.method);
      CodeActionRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(CodeActionRequest = exports2.CodeActionRequest || (exports2.CodeActionRequest = {}));
    var WorkspaceSymbolRequest;
    (function(WorkspaceSymbolRequest2) {
      WorkspaceSymbolRequest2.method = "workspace/symbol";
      WorkspaceSymbolRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest2.method);
      WorkspaceSymbolRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(WorkspaceSymbolRequest = exports2.WorkspaceSymbolRequest || (exports2.WorkspaceSymbolRequest = {}));
    var CodeLensRequest;
    (function(CodeLensRequest2) {
      CodeLensRequest2.type = new messages_1.ProtocolRequestType("textDocument/codeLens");
      CodeLensRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(CodeLensRequest = exports2.CodeLensRequest || (exports2.CodeLensRequest = {}));
    var CodeLensResolveRequest;
    (function(CodeLensResolveRequest2) {
      CodeLensResolveRequest2.type = new messages_1.ProtocolRequestType("codeLens/resolve");
    })(CodeLensResolveRequest = exports2.CodeLensResolveRequest || (exports2.CodeLensResolveRequest = {}));
    var DocumentLinkRequest;
    (function(DocumentLinkRequest2) {
      DocumentLinkRequest2.method = "textDocument/documentLink";
      DocumentLinkRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkRequest2.method);
      DocumentLinkRequest2.resultType = new vscode_jsonrpc_1.ProgressType();
    })(DocumentLinkRequest = exports2.DocumentLinkRequest || (exports2.DocumentLinkRequest = {}));
    var DocumentLinkResolveRequest;
    (function(DocumentLinkResolveRequest2) {
      DocumentLinkResolveRequest2.type = new messages_1.ProtocolRequestType("documentLink/resolve");
    })(DocumentLinkResolveRequest = exports2.DocumentLinkResolveRequest || (exports2.DocumentLinkResolveRequest = {}));
    var DocumentFormattingRequest;
    (function(DocumentFormattingRequest2) {
      DocumentFormattingRequest2.method = "textDocument/formatting";
      DocumentFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest2.method);
    })(DocumentFormattingRequest = exports2.DocumentFormattingRequest || (exports2.DocumentFormattingRequest = {}));
    var DocumentRangeFormattingRequest;
    (function(DocumentRangeFormattingRequest2) {
      DocumentRangeFormattingRequest2.method = "textDocument/rangeFormatting";
      DocumentRangeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest2.method);
    })(DocumentRangeFormattingRequest = exports2.DocumentRangeFormattingRequest || (exports2.DocumentRangeFormattingRequest = {}));
    var DocumentOnTypeFormattingRequest;
    (function(DocumentOnTypeFormattingRequest2) {
      DocumentOnTypeFormattingRequest2.method = "textDocument/onTypeFormatting";
      DocumentOnTypeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest2.method);
    })(DocumentOnTypeFormattingRequest = exports2.DocumentOnTypeFormattingRequest || (exports2.DocumentOnTypeFormattingRequest = {}));
    var RenameRequest;
    (function(RenameRequest2) {
      RenameRequest2.method = "textDocument/rename";
      RenameRequest2.type = new messages_1.ProtocolRequestType(RenameRequest2.method);
    })(RenameRequest = exports2.RenameRequest || (exports2.RenameRequest = {}));
    var PrepareRenameRequest;
    (function(PrepareRenameRequest2) {
      PrepareRenameRequest2.method = "textDocument/prepareRename";
      PrepareRenameRequest2.type = new messages_1.ProtocolRequestType(PrepareRenameRequest2.method);
    })(PrepareRenameRequest = exports2.PrepareRenameRequest || (exports2.PrepareRenameRequest = {}));
    var ExecuteCommandRequest;
    (function(ExecuteCommandRequest2) {
      ExecuteCommandRequest2.type = new messages_1.ProtocolRequestType("workspace/executeCommand");
    })(ExecuteCommandRequest = exports2.ExecuteCommandRequest || (exports2.ExecuteCommandRequest = {}));
    var ApplyWorkspaceEditRequest;
    (function(ApplyWorkspaceEditRequest2) {
      ApplyWorkspaceEditRequest2.type = new messages_1.ProtocolRequestType("workspace/applyEdit");
    })(ApplyWorkspaceEditRequest = exports2.ApplyWorkspaceEditRequest || (exports2.ApplyWorkspaceEditRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.callHierarchy.proposed.js
var require_protocol_callHierarchy_proposed = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.callHierarchy.proposed.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var messages_1 = require_messages2();
    var CallHierarchyPrepareRequest;
    (function(CallHierarchyPrepareRequest2) {
      CallHierarchyPrepareRequest2.method = "textDocument/prepareCallHierarchy";
      CallHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest2.method);
    })(CallHierarchyPrepareRequest = exports2.CallHierarchyPrepareRequest || (exports2.CallHierarchyPrepareRequest = {}));
    var CallHierarchyIncomingCallsRequest;
    (function(CallHierarchyIncomingCallsRequest2) {
      CallHierarchyIncomingCallsRequest2.method = "callHierarchy/incomingCalls";
      CallHierarchyIncomingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest2.method);
    })(CallHierarchyIncomingCallsRequest = exports2.CallHierarchyIncomingCallsRequest || (exports2.CallHierarchyIncomingCallsRequest = {}));
    var CallHierarchyOutgoingCallsRequest;
    (function(CallHierarchyOutgoingCallsRequest2) {
      CallHierarchyOutgoingCallsRequest2.method = "callHierarchy/outgoingCalls";
      CallHierarchyOutgoingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest2.method);
    })(CallHierarchyOutgoingCallsRequest = exports2.CallHierarchyOutgoingCallsRequest || (exports2.CallHierarchyOutgoingCallsRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/protocol.sematicTokens.proposed.js
var require_protocol_sematicTokens_proposed = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/protocol.sematicTokens.proposed.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var messages_1 = require_messages2();
    var SemanticTokenTypes;
    (function(SemanticTokenTypes2) {
      SemanticTokenTypes2["comment"] = "comment";
      SemanticTokenTypes2["keyword"] = "keyword";
      SemanticTokenTypes2["string"] = "string";
      SemanticTokenTypes2["number"] = "number";
      SemanticTokenTypes2["regexp"] = "regexp";
      SemanticTokenTypes2["operator"] = "operator";
      SemanticTokenTypes2["namespace"] = "namespace";
      SemanticTokenTypes2["type"] = "type";
      SemanticTokenTypes2["struct"] = "struct";
      SemanticTokenTypes2["class"] = "class";
      SemanticTokenTypes2["interface"] = "interface";
      SemanticTokenTypes2["enum"] = "enum";
      SemanticTokenTypes2["typeParameter"] = "typeParameter";
      SemanticTokenTypes2["function"] = "function";
      SemanticTokenTypes2["member"] = "member";
      SemanticTokenTypes2["property"] = "property";
      SemanticTokenTypes2["macro"] = "macro";
      SemanticTokenTypes2["variable"] = "variable";
      SemanticTokenTypes2["parameter"] = "parameter";
      SemanticTokenTypes2["label"] = "label";
    })(SemanticTokenTypes = exports2.SemanticTokenTypes || (exports2.SemanticTokenTypes = {}));
    var SemanticTokenModifiers;
    (function(SemanticTokenModifiers2) {
      SemanticTokenModifiers2["documentation"] = "documentation";
      SemanticTokenModifiers2["declaration"] = "declaration";
      SemanticTokenModifiers2["definition"] = "definition";
      SemanticTokenModifiers2["reference"] = "reference";
      SemanticTokenModifiers2["static"] = "static";
      SemanticTokenModifiers2["abstract"] = "abstract";
      SemanticTokenModifiers2["deprecated"] = "deprecated";
      SemanticTokenModifiers2["async"] = "async";
      SemanticTokenModifiers2["volatile"] = "volatile";
      SemanticTokenModifiers2["readonly"] = "readonly";
    })(SemanticTokenModifiers = exports2.SemanticTokenModifiers || (exports2.SemanticTokenModifiers = {}));
    var SemanticTokens;
    (function(SemanticTokens2) {
      function is(value) {
        const candidate = value;
        return candidate !== void 0 && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
      }
      SemanticTokens2.is = is;
    })(SemanticTokens = exports2.SemanticTokens || (exports2.SemanticTokens = {}));
    var SemanticTokensRequest;
    (function(SemanticTokensRequest2) {
      SemanticTokensRequest2.method = "textDocument/semanticTokens";
      SemanticTokensRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRequest2.method);
    })(SemanticTokensRequest = exports2.SemanticTokensRequest || (exports2.SemanticTokensRequest = {}));
    var SemanticTokensEditsRequest;
    (function(SemanticTokensEditsRequest2) {
      SemanticTokensEditsRequest2.method = "textDocument/semanticTokens/edits";
      SemanticTokensEditsRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensEditsRequest2.method);
    })(SemanticTokensEditsRequest = exports2.SemanticTokensEditsRequest || (exports2.SemanticTokensEditsRequest = {}));
    var SemanticTokensRangeRequest;
    (function(SemanticTokensRangeRequest2) {
      SemanticTokensRangeRequest2.method = "textDocument/semanticTokens/range";
      SemanticTokensRangeRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest2.method);
    })(SemanticTokensRangeRequest = exports2.SemanticTokensRangeRequest || (exports2.SemanticTokensRangeRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/main.js
var require_main3 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/main.js"(exports2) {
    "use strict";
    function __export(m) {
      for (var p in m) if (!exports2.hasOwnProperty(p)) exports2[p] = m[p];
    }
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_jsonrpc_1 = require_main();
    exports2.ErrorCodes = vscode_jsonrpc_1.ErrorCodes;
    exports2.ResponseError = vscode_jsonrpc_1.ResponseError;
    exports2.CancellationToken = vscode_jsonrpc_1.CancellationToken;
    exports2.CancellationTokenSource = vscode_jsonrpc_1.CancellationTokenSource;
    exports2.Disposable = vscode_jsonrpc_1.Disposable;
    exports2.Event = vscode_jsonrpc_1.Event;
    exports2.Emitter = vscode_jsonrpc_1.Emitter;
    exports2.Trace = vscode_jsonrpc_1.Trace;
    exports2.TraceFormat = vscode_jsonrpc_1.TraceFormat;
    exports2.SetTraceNotification = vscode_jsonrpc_1.SetTraceNotification;
    exports2.LogTraceNotification = vscode_jsonrpc_1.LogTraceNotification;
    exports2.RequestType = vscode_jsonrpc_1.RequestType;
    exports2.RequestType0 = vscode_jsonrpc_1.RequestType0;
    exports2.NotificationType = vscode_jsonrpc_1.NotificationType;
    exports2.NotificationType0 = vscode_jsonrpc_1.NotificationType0;
    exports2.MessageReader = vscode_jsonrpc_1.MessageReader;
    exports2.MessageWriter = vscode_jsonrpc_1.MessageWriter;
    exports2.ConnectionStrategy = vscode_jsonrpc_1.ConnectionStrategy;
    exports2.StreamMessageReader = vscode_jsonrpc_1.StreamMessageReader;
    exports2.StreamMessageWriter = vscode_jsonrpc_1.StreamMessageWriter;
    exports2.IPCMessageReader = vscode_jsonrpc_1.IPCMessageReader;
    exports2.IPCMessageWriter = vscode_jsonrpc_1.IPCMessageWriter;
    exports2.createClientPipeTransport = vscode_jsonrpc_1.createClientPipeTransport;
    exports2.createServerPipeTransport = vscode_jsonrpc_1.createServerPipeTransport;
    exports2.generateRandomPipeName = vscode_jsonrpc_1.generateRandomPipeName;
    exports2.createClientSocketTransport = vscode_jsonrpc_1.createClientSocketTransport;
    exports2.createServerSocketTransport = vscode_jsonrpc_1.createServerSocketTransport;
    exports2.ProgressType = vscode_jsonrpc_1.ProgressType;
    __export(require_main2());
    __export(require_protocol());
    var callHierarchy = require_protocol_callHierarchy_proposed();
    var st = require_protocol_sematicTokens_proposed();
    var Proposed;
    (function(Proposed2) {
      let CallHierarchyPrepareRequest;
      (function(CallHierarchyPrepareRequest2) {
        CallHierarchyPrepareRequest2.method = callHierarchy.CallHierarchyPrepareRequest.method;
        CallHierarchyPrepareRequest2.type = callHierarchy.CallHierarchyPrepareRequest.type;
      })(CallHierarchyPrepareRequest = Proposed2.CallHierarchyPrepareRequest || (Proposed2.CallHierarchyPrepareRequest = {}));
      let CallHierarchyIncomingCallsRequest;
      (function(CallHierarchyIncomingCallsRequest2) {
        CallHierarchyIncomingCallsRequest2.method = callHierarchy.CallHierarchyIncomingCallsRequest.method;
        CallHierarchyIncomingCallsRequest2.type = callHierarchy.CallHierarchyIncomingCallsRequest.type;
      })(CallHierarchyIncomingCallsRequest = Proposed2.CallHierarchyIncomingCallsRequest || (Proposed2.CallHierarchyIncomingCallsRequest = {}));
      let CallHierarchyOutgoingCallsRequest;
      (function(CallHierarchyOutgoingCallsRequest2) {
        CallHierarchyOutgoingCallsRequest2.method = callHierarchy.CallHierarchyOutgoingCallsRequest.method;
        CallHierarchyOutgoingCallsRequest2.type = callHierarchy.CallHierarchyOutgoingCallsRequest.type;
      })(CallHierarchyOutgoingCallsRequest = Proposed2.CallHierarchyOutgoingCallsRequest || (Proposed2.CallHierarchyOutgoingCallsRequest = {}));
      Proposed2.SemanticTokenTypes = st.SemanticTokenTypes;
      Proposed2.SemanticTokenModifiers = st.SemanticTokenModifiers;
      Proposed2.SemanticTokens = st.SemanticTokens;
      let SemanticTokensRequest;
      (function(SemanticTokensRequest2) {
        SemanticTokensRequest2.method = st.SemanticTokensRequest.method;
        SemanticTokensRequest2.type = st.SemanticTokensRequest.type;
      })(SemanticTokensRequest = Proposed2.SemanticTokensRequest || (Proposed2.SemanticTokensRequest = {}));
      let SemanticTokensEditsRequest;
      (function(SemanticTokensEditsRequest2) {
        SemanticTokensEditsRequest2.method = st.SemanticTokensEditsRequest.method;
        SemanticTokensEditsRequest2.type = st.SemanticTokensEditsRequest.type;
      })(SemanticTokensEditsRequest = Proposed2.SemanticTokensEditsRequest || (Proposed2.SemanticTokensEditsRequest = {}));
      let SemanticTokensRangeRequest;
      (function(SemanticTokensRangeRequest2) {
        SemanticTokensRangeRequest2.method = st.SemanticTokensRangeRequest.method;
        SemanticTokensRangeRequest2.type = st.SemanticTokensRangeRequest.type;
      })(SemanticTokensRangeRequest = Proposed2.SemanticTokensRangeRequest || (Proposed2.SemanticTokensRangeRequest = {}));
    })(Proposed = exports2.Proposed || (exports2.Proposed = {}));
    function createProtocolConnection(reader, writer, logger2, strategy) {
      return vscode_jsonrpc_1.createMessageConnection(reader, writer, logger2, strategy);
    }
    exports2.createProtocolConnection = createProtocolConnection;
  }
});

// node_modules/vscode-languageserver/lib/utils/is.js
var require_is3 = __commonJS({
  "node_modules/vscode-languageserver/lib/utils/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    exports2.typedArray = typedArray;
    function thenable(value) {
      return value && func(value.then);
    }
    exports2.thenable = thenable;
  }
});

// node_modules/vscode-languageserver/lib/configuration.js
var require_configuration = __commonJS({
  "node_modules/vscode-languageserver/lib/configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_languageserver_protocol_1 = require_main3();
    var Is = require_is3();
    exports2.ConfigurationFeature = (Base) => {
      return class extends Base {
        getConfiguration(arg) {
          if (!arg) {
            return this._getConfiguration({});
          } else if (Is.string(arg)) {
            return this._getConfiguration({ section: arg });
          } else {
            return this._getConfiguration(arg);
          }
        }
        _getConfiguration(arg) {
          let params = {
            items: Array.isArray(arg) ? arg : [arg]
          };
          return this.connection.sendRequest(vscode_languageserver_protocol_1.ConfigurationRequest.type, params).then((result) => {
            return Array.isArray(arg) ? result : result[0];
          });
        }
      };
    };
  }
});

// node_modules/vscode-languageserver/lib/workspaceFolders.js
var require_workspaceFolders = __commonJS({
  "node_modules/vscode-languageserver/lib/workspaceFolders.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_languageserver_protocol_1 = require_main3();
    exports2.WorkspaceFoldersFeature = (Base) => {
      return class extends Base {
        initialize(capabilities) {
          let workspaceCapabilities = capabilities.workspace;
          if (workspaceCapabilities && workspaceCapabilities.workspaceFolders) {
            this._onDidChangeWorkspaceFolders = new vscode_languageserver_protocol_1.Emitter();
            this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type, (params) => {
              this._onDidChangeWorkspaceFolders.fire(params.event);
            });
          }
        }
        getWorkspaceFolders() {
          return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkspaceFoldersRequest.type);
        }
        get onDidChangeWorkspaceFolders() {
          if (!this._onDidChangeWorkspaceFolders) {
            throw new Error("Client doesn't support sending workspace folder change events.");
          }
          if (!this._unregistration) {
            this._unregistration = this.connection.client.register(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type);
          }
          return this._onDidChangeWorkspaceFolders.event;
        }
      };
    };
  }
});

// node_modules/vscode-languageserver/lib/utils/uuid.js
var require_uuid = __commonJS({
  "node_modules/vscode-languageserver/lib/utils/uuid.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ValueUUID = class {
      constructor(_value) {
        this._value = _value;
      }
      asHex() {
        return this._value;
      }
      equals(other) {
        return this.asHex() === other.asHex();
      }
    };
    var V4UUID = class _V4UUID extends ValueUUID {
      constructor() {
        super([
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          "4",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._oneOf(_V4UUID._timeHighBits),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex()
        ].join(""));
      }
      static _oneOf(array) {
        return array[Math.floor(array.length * Math.random())];
      }
      static _randomHex() {
        return _V4UUID._oneOf(_V4UUID._chars);
      }
    };
    V4UUID._chars = ["0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    V4UUID._timeHighBits = ["8", "9", "a", "b"];
    exports2.empty = new ValueUUID("00000000-0000-0000-0000-000000000000");
    function v4() {
      return new V4UUID();
    }
    exports2.v4 = v4;
    var _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    function isUUID(value) {
      return _UUIDPattern.test(value);
    }
    exports2.isUUID = isUUID;
    function parse(value) {
      if (!isUUID(value)) {
        throw new Error("invalid uuid");
      }
      return new ValueUUID(value);
    }
    exports2.parse = parse;
    function generateUuid() {
      return v4().asHex();
    }
    exports2.generateUuid = generateUuid;
  }
});

// node_modules/vscode-languageserver/lib/progress.js
var require_progress = __commonJS({
  "node_modules/vscode-languageserver/lib/progress.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_languageserver_protocol_1 = require_main3();
    var uuid_1 = require_uuid();
    var WorkDoneProgressImpl = class _WorkDoneProgressImpl {
      constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
        _WorkDoneProgressImpl.Instances.set(this._token, this);
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
      }
      get token() {
        return this._source.token;
      }
      begin(title, percentage, message, cancellable) {
        let param = {
          kind: "begin",
          title,
          percentage,
          message,
          cancellable
        };
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
      }
      report(arg0, arg1) {
        let param = {
          kind: "report"
        };
        if (typeof arg0 === "number") {
          param.percentage = arg0;
          if (arg1 !== void 0) {
            param.message = arg1;
          }
        } else {
          param.message = arg0;
        }
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
      }
      done() {
        _WorkDoneProgressImpl.Instances.delete(this._token);
        this._source.dispose();
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, { kind: "end" });
      }
      cancel() {
        this._source.cancel();
      }
    };
    WorkDoneProgressImpl.Instances = /* @__PURE__ */ new Map();
    var NullProgress = class {
      constructor() {
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
      }
      get token() {
        return this._source.token;
      }
      begin() {
      }
      report() {
      }
      done() {
      }
    };
    function attachWorkDone(connection2, params) {
      if (params === void 0 || params.workDoneToken === void 0) {
        return new NullProgress();
      }
      const token = params.workDoneToken;
      delete params.workDoneToken;
      return new WorkDoneProgressImpl(connection2, token);
    }
    exports2.attachWorkDone = attachWorkDone;
    exports2.ProgressFeature = (Base) => {
      return class extends Base {
        initialize(capabilities) {
          var _a;
          if (((_a = capabilities === null || capabilities === void 0 ? void 0 : capabilities.window) === null || _a === void 0 ? void 0 : _a.workDoneProgress) === true) {
            this._progressSupported = true;
            this.connection.onNotification(vscode_languageserver_protocol_1.WorkDoneProgressCancelNotification.type, (params) => {
              let progress = WorkDoneProgressImpl.Instances.get(params.token);
              if (progress !== void 0) {
                progress.cancel();
              }
            });
          }
        }
        attachWorkDoneProgress(token) {
          if (token === void 0) {
            return new NullProgress();
          } else {
            return new WorkDoneProgressImpl(this.connection, token);
          }
        }
        createWorkDoneProgress() {
          if (this._progressSupported) {
            const token = uuid_1.generateUuid();
            return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkDoneProgressCreateRequest.type, { token }).then(() => {
              const result = new WorkDoneProgressImpl(this.connection, token);
              return result;
            });
          } else {
            return Promise.resolve(new NullProgress());
          }
        }
      };
    };
    var ResultProgress;
    (function(ResultProgress2) {
      ResultProgress2.type = new vscode_languageserver_protocol_1.ProgressType();
    })(ResultProgress || (ResultProgress = {}));
    var ResultProgressImpl = class {
      constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
      }
      report(data) {
        this._connection.sendProgress(ResultProgress.type, this._token, data);
      }
    };
    function attachPartialResult(connection2, params) {
      if (params === void 0 || params.partialResultToken === void 0) {
        return void 0;
      }
      const token = params.partialResultToken;
      delete params.partialResultToken;
      return new ResultProgressImpl(connection2, token);
    }
    exports2.attachPartialResult = attachPartialResult;
  }
});

// node_modules/vscode-languageserver/lib/files.js
var require_files = __commonJS({
  "node_modules/vscode-languageserver/lib/files.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var url = require("url");
    var path = require("path");
    var fs = require("fs");
    var child_process_1 = require("child_process");
    function uriToFilePath(uri) {
      let parsed = url.parse(uri);
      if (parsed.protocol !== "file:" || !parsed.path) {
        return void 0;
      }
      let segments = parsed.path.split("/");
      for (var i = 0, len = segments.length; i < len; i++) {
        segments[i] = decodeURIComponent(segments[i]);
      }
      if (process.platform === "win32" && segments.length > 1) {
        let first = segments[0];
        let second = segments[1];
        if (first.length === 0 && second.length > 1 && second[1] === ":") {
          segments.shift();
        }
      }
      return path.normalize(segments.join("/"));
    }
    exports2.uriToFilePath = uriToFilePath;
    function isWindows() {
      return process.platform === "win32";
    }
    function resolve(moduleName, nodePath, cwd, tracer) {
      const nodePathKey = "NODE_PATH";
      const app = [
        "var p = process;",
        "p.on('message',function(m){",
        "if(m.c==='e'){",
        "p.exit(0);",
        "}",
        "else if(m.c==='rs'){",
        "try{",
        "var r=require.resolve(m.a);",
        "p.send({c:'r',s:true,r:r});",
        "}",
        "catch(err){",
        "p.send({c:'r',s:false});",
        "}",
        "}",
        "});"
      ].join("");
      return new Promise((resolve2, reject) => {
        let env = process.env;
        let newEnv = /* @__PURE__ */ Object.create(null);
        Object.keys(env).forEach((key) => newEnv[key] = env[key]);
        if (nodePath && fs.existsSync(nodePath)) {
          if (newEnv[nodePathKey]) {
            newEnv[nodePathKey] = nodePath + path.delimiter + newEnv[nodePathKey];
          } else {
            newEnv[nodePathKey] = nodePath;
          }
          if (tracer) {
            tracer(`NODE_PATH value is: ${newEnv[nodePathKey]}`);
          }
        }
        newEnv["ELECTRON_RUN_AS_NODE"] = "1";
        try {
          let cp = child_process_1.fork("", [], {
            cwd,
            env: newEnv,
            execArgv: ["-e", app]
          });
          if (cp.pid === void 0) {
            reject(new Error(`Starting process to resolve node module  ${moduleName} failed`));
            return;
          }
          cp.on("error", (error) => {
            reject(error);
          });
          cp.on("message", (message2) => {
            if (message2.c === "r") {
              cp.send({ c: "e" });
              if (message2.s) {
                resolve2(message2.r);
              } else {
                reject(new Error(`Failed to resolve module: ${moduleName}`));
              }
            }
          });
          let message = {
            c: "rs",
            a: moduleName
          };
          cp.send(message);
        } catch (error) {
          reject(error);
        }
      });
    }
    exports2.resolve = resolve;
    function resolveGlobalNodePath(tracer) {
      let npmCommand = "npm";
      const env = /* @__PURE__ */ Object.create(null);
      Object.keys(process.env).forEach((key) => env[key] = process.env[key]);
      env["NO_UPDATE_NOTIFIER"] = "true";
      const options = {
        encoding: "utf8",
        env
      };
      if (isWindows()) {
        npmCommand = "npm.cmd";
        options.shell = true;
      }
      let handler = () => {
      };
      try {
        process.on("SIGPIPE", handler);
        let stdout = child_process_1.spawnSync(npmCommand, ["config", "get", "prefix"], options).stdout;
        if (!stdout) {
          if (tracer) {
            tracer(`'npm config get prefix' didn't return a value.`);
          }
          return void 0;
        }
        let prefix = stdout.trim();
        if (tracer) {
          tracer(`'npm config get prefix' value is: ${prefix}`);
        }
        if (prefix.length > 0) {
          if (isWindows()) {
            return path.join(prefix, "node_modules");
          } else {
            return path.join(prefix, "lib", "node_modules");
          }
        }
        return void 0;
      } catch (err) {
        return void 0;
      } finally {
        process.removeListener("SIGPIPE", handler);
      }
    }
    exports2.resolveGlobalNodePath = resolveGlobalNodePath;
    function resolveGlobalYarnPath(tracer) {
      let yarnCommand = "yarn";
      let options = {
        encoding: "utf8"
      };
      if (isWindows()) {
        yarnCommand = "yarn.cmd";
        options.shell = true;
      }
      let handler = () => {
      };
      try {
        process.on("SIGPIPE", handler);
        let results = child_process_1.spawnSync(yarnCommand, ["global", "dir", "--json"], options);
        let stdout = results.stdout;
        if (!stdout) {
          if (tracer) {
            tracer(`'yarn global dir' didn't return a value.`);
            if (results.stderr) {
              tracer(results.stderr);
            }
          }
          return void 0;
        }
        let lines = stdout.trim().split(/\r?\n/);
        for (let line of lines) {
          try {
            let yarn = JSON.parse(line);
            if (yarn.type === "log") {
              return path.join(yarn.data, "node_modules");
            }
          } catch (e) {
          }
        }
        return void 0;
      } catch (err) {
        return void 0;
      } finally {
        process.removeListener("SIGPIPE", handler);
      }
    }
    exports2.resolveGlobalYarnPath = resolveGlobalYarnPath;
    var FileSystem;
    (function(FileSystem2) {
      let _isCaseSensitive = void 0;
      function isCaseSensitive() {
        if (_isCaseSensitive !== void 0) {
          return _isCaseSensitive;
        }
        if (process.platform === "win32") {
          _isCaseSensitive = false;
        } else {
          _isCaseSensitive = !fs.existsSync(__filename.toUpperCase()) || !fs.existsSync(__filename.toLowerCase());
        }
        return _isCaseSensitive;
      }
      FileSystem2.isCaseSensitive = isCaseSensitive;
      function isParent(parent, child) {
        if (isCaseSensitive()) {
          return path.normalize(child).indexOf(path.normalize(parent)) === 0;
        } else {
          return path.normalize(child).toLowerCase().indexOf(path.normalize(parent).toLowerCase()) === 0;
        }
      }
      FileSystem2.isParent = isParent;
    })(FileSystem = exports2.FileSystem || (exports2.FileSystem = {}));
    function resolveModulePath(workspaceRoot, moduleName, nodePath, tracer) {
      if (nodePath) {
        if (!path.isAbsolute(nodePath)) {
          nodePath = path.join(workspaceRoot, nodePath);
        }
        return resolve(moduleName, nodePath, nodePath, tracer).then((value) => {
          if (FileSystem.isParent(nodePath, value)) {
            return value;
          } else {
            return Promise.reject(new Error(`Failed to load ${moduleName} from node path location.`));
          }
        }).then(void 0, (_error) => {
          return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
        });
      } else {
        return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
      }
    }
    exports2.resolveModulePath = resolveModulePath;
  }
});

// node_modules/vscode-languageserver/lib/callHierarchy.proposed.js
var require_callHierarchy_proposed = __commonJS({
  "node_modules/vscode-languageserver/lib/callHierarchy.proposed.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_languageserver_protocol_1 = require_main3();
    exports2.CallHierarchyFeature = (Base) => {
      return class extends Base {
        get callHierarchy() {
          return {
            onPrepare: (handler) => {
              this.connection.onRequest(vscode_languageserver_protocol_1.Proposed.CallHierarchyPrepareRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
              });
            },
            onIncomingCalls: (handler) => {
              const type = vscode_languageserver_protocol_1.Proposed.CallHierarchyIncomingCallsRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onOutgoingCalls: (handler) => {
              const type = vscode_languageserver_protocol_1.Proposed.CallHierarchyOutgoingCallsRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
  }
});

// node_modules/vscode-languageserver/lib/sematicTokens.proposed.js
var require_sematicTokens_proposed = __commonJS({
  "node_modules/vscode-languageserver/lib/sematicTokens.proposed.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_languageserver_protocol_1 = require_main3();
    exports2.SemanticTokensFeature = (Base) => {
      return class extends Base {
        get semanticTokens() {
          return {
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.Proposed.SemanticTokensRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onEdits: (handler) => {
              const type = vscode_languageserver_protocol_1.Proposed.SemanticTokensEditsRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onRange: (handler) => {
              const type = vscode_languageserver_protocol_1.Proposed.SemanticTokensRangeRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    var SemanticTokensBuilder = class {
      constructor() {
        this._prevData = void 0;
        this.initialize();
      }
      initialize() {
        this._id = Date.now();
        this._prevLine = 0;
        this._prevChar = 0;
        this._data = [];
        this._dataLen = 0;
      }
      push(line, char, length, tokenType, tokenModifiers) {
        let pushLine = line;
        let pushChar = char;
        if (this._dataLen > 0) {
          pushLine -= this._prevLine;
          if (pushLine === 0) {
            pushChar -= this._prevChar;
          }
        }
        this._data[this._dataLen++] = pushLine;
        this._data[this._dataLen++] = pushChar;
        this._data[this._dataLen++] = length;
        this._data[this._dataLen++] = tokenType;
        this._data[this._dataLen++] = tokenModifiers;
        this._prevLine = line;
        this._prevChar = char;
      }
      get id() {
        return this._id.toString();
      }
      previousResult(id) {
        if (this.id === id) {
          this._prevData = this._data;
        }
        this.initialize();
      }
      build() {
        this._prevData = void 0;
        return {
          resultId: this.id,
          data: this._data
        };
      }
      canBuildEdits() {
        return this._prevData !== void 0;
      }
      buildEdits() {
        if (this._prevData !== void 0) {
          const prevDataLength = this._prevData.length;
          const dataLength = this._data.length;
          let startIndex = 0;
          while (startIndex < dataLength && startIndex < prevDataLength && this._prevData[startIndex] === this._data[startIndex]) {
            startIndex++;
          }
          if (startIndex < dataLength && startIndex < prevDataLength) {
            let endIndex = 0;
            while (endIndex < dataLength && endIndex < prevDataLength && this._prevData[prevDataLength - 1 - endIndex] === this._data[dataLength - 1 - endIndex]) {
              endIndex++;
            }
            const newData = this._data.slice(startIndex, dataLength - endIndex);
            const result = {
              resultId: this.id,
              edits: [
                { start: startIndex, deleteCount: prevDataLength - endIndex - startIndex, data: newData }
              ]
            };
            return result;
          } else if (startIndex < dataLength) {
            return { resultId: this.id, edits: [
              { start: startIndex, deleteCount: 0, data: this._data.slice(startIndex) }
            ] };
          } else if (startIndex < prevDataLength) {
            return { resultId: this.id, edits: [
              { start: startIndex, deleteCount: prevDataLength - startIndex }
            ] };
          } else {
            return { resultId: this.id, edits: [] };
          }
        } else {
          return this.build();
        }
      }
    };
    exports2.SemanticTokensBuilder = SemanticTokensBuilder;
  }
});

// node_modules/vscode-languageserver/lib/main.js
var require_main4 = __commonJS({
  "node_modules/vscode-languageserver/lib/main.js"(exports2) {
    "use strict";
    function __export(m) {
      for (var p in m) if (!exports2.hasOwnProperty(p)) exports2[p] = m[p];
    }
    Object.defineProperty(exports2, "__esModule", { value: true });
    var vscode_languageserver_protocol_1 = require_main3();
    exports2.Event = vscode_languageserver_protocol_1.Event;
    var configuration_1 = require_configuration();
    var workspaceFolders_1 = require_workspaceFolders();
    var progress_1 = require_progress();
    var Is = require_is3();
    var UUID = require_uuid();
    __export(require_main3());
    var fm = require_files();
    var Files;
    (function(Files2) {
      Files2.uriToFilePath = fm.uriToFilePath;
      Files2.resolveGlobalNodePath = fm.resolveGlobalNodePath;
      Files2.resolveGlobalYarnPath = fm.resolveGlobalYarnPath;
      Files2.resolve = fm.resolve;
      Files2.resolveModulePath = fm.resolveModulePath;
    })(Files = exports2.Files || (exports2.Files = {}));
    var shutdownReceived = false;
    var exitTimer = void 0;
    function setupExitTimer() {
      const argName = "--clientProcessId";
      function runTimer(value) {
        try {
          let processId = parseInt(value);
          if (!isNaN(processId)) {
            exitTimer = setInterval(() => {
              try {
                process.kill(processId, 0);
              } catch (ex) {
                process.exit(shutdownReceived ? 0 : 1);
              }
            }, 3e3);
          }
        } catch (e) {
        }
      }
      for (let i = 2; i < process.argv.length; i++) {
        let arg = process.argv[i];
        if (arg === argName && i + 1 < process.argv.length) {
          runTimer(process.argv[i + 1]);
          return;
        } else {
          let args = arg.split("=");
          if (args[0] === argName) {
            runTimer(args[1]);
          }
        }
      }
    }
    setupExitTimer();
    function null2Undefined(value) {
      if (value === null) {
        return void 0;
      }
      return value;
    }
    var TextDocuments = class {
      /**
       * Create a new text document manager.
       */
      constructor(configuration) {
        this._documents = /* @__PURE__ */ Object.create(null);
        this._configuration = configuration;
        this._onDidChangeContent = new vscode_languageserver_protocol_1.Emitter();
        this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
        this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
        this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
        this._onWillSave = new vscode_languageserver_protocol_1.Emitter();
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been opened or the content changes.
       */
      get onDidChangeContent() {
        return this._onDidChangeContent.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been opened.
       */
      get onDidOpen() {
        return this._onDidOpen.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * will be saved.
       */
      get onWillSave() {
        return this._onWillSave.event;
      }
      /**
       * Sets a handler that will be called if a participant wants to provide
       * edits during a text document save.
       */
      onWillSaveWaitUntil(handler) {
        this._willSaveWaitUntil = handler;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been saved.
       */
      get onDidSave() {
        return this._onDidSave.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been closed.
       */
      get onDidClose() {
        return this._onDidClose.event;
      }
      /**
       * Returns the document for the given URI. Returns undefined if
       * the document is not mananged by this instance.
       *
       * @param uri The text document's URI to retrieve.
       * @return the text document or `undefined`.
       */
      get(uri) {
        return this._documents[uri];
      }
      /**
       * Returns all text documents managed by this instance.
       *
       * @return all text documents.
       */
      all() {
        return Object.keys(this._documents).map((key) => this._documents[key]);
      }
      /**
       * Returns the URIs of all text documents managed by this instance.
       *
       * @return the URI's of all text documents.
       */
      keys() {
        return Object.keys(this._documents);
      }
      /**
       * Listens for `low level` notification on the given connection to
       * update the text documents managed by this instance.
       *
       * @param connection The connection to listen on.
       */
      listen(connection2) {
        connection2.__textDocumentSync = vscode_languageserver_protocol_1.TextDocumentSyncKind.Full;
        connection2.onDidOpenTextDocument((event) => {
          let td = event.textDocument;
          let document = this._configuration.create(td.uri, td.languageId, td.version, td.text);
          this._documents[td.uri] = document;
          let toFire = Object.freeze({ document });
          this._onDidOpen.fire(toFire);
          this._onDidChangeContent.fire(toFire);
        });
        connection2.onDidChangeTextDocument((event) => {
          let td = event.textDocument;
          let changes = event.contentChanges;
          if (changes.length === 0) {
            return;
          }
          let document = this._documents[td.uri];
          const { version } = td;
          if (version === null || version === void 0) {
            throw new Error(`Received document change event for ${td.uri} without valid version identifier`);
          }
          document = this._configuration.update(document, changes, version);
          this._documents[td.uri] = document;
          this._onDidChangeContent.fire(Object.freeze({ document }));
        });
        connection2.onDidCloseTextDocument((event) => {
          let document = this._documents[event.textDocument.uri];
          if (document) {
            delete this._documents[event.textDocument.uri];
            this._onDidClose.fire(Object.freeze({ document }));
          }
        });
        connection2.onWillSaveTextDocument((event) => {
          let document = this._documents[event.textDocument.uri];
          if (document) {
            this._onWillSave.fire(Object.freeze({ document, reason: event.reason }));
          }
        });
        connection2.onWillSaveTextDocumentWaitUntil((event, token) => {
          let document = this._documents[event.textDocument.uri];
          if (document && this._willSaveWaitUntil) {
            return this._willSaveWaitUntil(Object.freeze({ document, reason: event.reason }), token);
          } else {
            return [];
          }
        });
        connection2.onDidSaveTextDocument((event) => {
          let document = this._documents[event.textDocument.uri];
          if (document) {
            this._onDidSave.fire(Object.freeze({ document }));
          }
        });
      }
    };
    exports2.TextDocuments = TextDocuments;
    var ErrorMessageTracker = class {
      constructor() {
        this._messages = /* @__PURE__ */ Object.create(null);
      }
      /**
       * Add a message to the tracker.
       *
       * @param message The message to add.
       */
      add(message) {
        let count = this._messages[message];
        if (!count) {
          count = 0;
        }
        count++;
        this._messages[message] = count;
      }
      /**
       * Send all tracked messages to the connection's window.
       *
       * @param connection The connection established between client and server.
       */
      sendErrors(connection2) {
        Object.keys(this._messages).forEach((message) => {
          connection2.window.showErrorMessage(message);
        });
      }
    };
    exports2.ErrorMessageTracker = ErrorMessageTracker;
    var RemoteConsoleImpl = class {
      constructor() {
      }
      rawAttach(connection2) {
        this._rawConnection = connection2;
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      fillServerCapabilities(_capabilities) {
      }
      initialize(_capabilities) {
      }
      error(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Error, message);
      }
      warn(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Warning, message);
      }
      info(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Info, message);
      }
      log(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Log, message);
      }
      send(type, message) {
        if (this._rawConnection) {
          this._rawConnection.sendNotification(vscode_languageserver_protocol_1.LogMessageNotification.type, { type, message });
        }
      }
    };
    var _RemoteWindowImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      showErrorMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Error, message, actions };
        return this._connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
      showWarningMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Warning, message, actions };
        return this._connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
      showInformationMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Info, message, actions };
        return this._connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
    };
    var RemoteWindowImpl = progress_1.ProgressFeature(_RemoteWindowImpl);
    var BulkRegistration;
    (function(BulkRegistration2) {
      function create() {
        return new BulkRegistrationImpl();
      }
      BulkRegistration2.create = create;
    })(BulkRegistration = exports2.BulkRegistration || (exports2.BulkRegistration = {}));
    var BulkRegistrationImpl = class {
      constructor() {
        this._registrations = [];
        this._registered = /* @__PURE__ */ new Set();
      }
      add(type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        if (this._registered.has(method)) {
          throw new Error(`${method} is already added to this registration`);
        }
        const id = UUID.generateUuid();
        this._registrations.push({
          id,
          method,
          registerOptions: registerOptions || {}
        });
        this._registered.add(method);
      }
      asRegistrationParams() {
        return {
          registrations: this._registrations
        };
      }
    };
    var BulkUnregistration;
    (function(BulkUnregistration2) {
      function create() {
        return new BulkUnregistrationImpl(void 0, []);
      }
      BulkUnregistration2.create = create;
    })(BulkUnregistration = exports2.BulkUnregistration || (exports2.BulkUnregistration = {}));
    var BulkUnregistrationImpl = class {
      constructor(_connection, unregistrations) {
        this._connection = _connection;
        this._unregistrations = /* @__PURE__ */ new Map();
        unregistrations.forEach((unregistration) => {
          this._unregistrations.set(unregistration.method, unregistration);
        });
      }
      get isAttached() {
        return !!this._connection;
      }
      attach(connection2) {
        this._connection = connection2;
      }
      add(unregistration) {
        this._unregistrations.set(unregistration.method, unregistration);
      }
      dispose() {
        let unregistrations = [];
        for (let unregistration of this._unregistrations.values()) {
          unregistrations.push(unregistration);
        }
        let params = {
          unregisterations: unregistrations
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(void 0, (_error) => {
          this._connection.console.info(`Bulk unregistration failed.`);
        });
      }
      disposeSingle(arg) {
        const method = Is.string(arg) ? arg : arg.method;
        const unregistration = this._unregistrations.get(method);
        if (!unregistration) {
          return false;
        }
        let params = {
          unregisterations: [unregistration]
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(() => {
          this._unregistrations.delete(method);
        }, (_error) => {
          this._connection.console.info(`Unregistering request handler for ${unregistration.id} failed.`);
        });
        return true;
      }
    };
    var RemoteClientImpl = class {
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      register(typeOrRegistrations, registerOptionsOrType, registerOptions) {
        if (typeOrRegistrations instanceof BulkRegistrationImpl) {
          return this.registerMany(typeOrRegistrations);
        } else if (typeOrRegistrations instanceof BulkUnregistrationImpl) {
          return this.registerSingle1(typeOrRegistrations, registerOptionsOrType, registerOptions);
        } else {
          return this.registerSingle2(typeOrRegistrations, registerOptionsOrType);
        }
      }
      registerSingle1(unregistration, type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        const id = UUID.generateUuid();
        let params = {
          registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        if (!unregistration.isAttached) {
          unregistration.attach(this._connection);
        }
        return this._connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
          unregistration.add({ id, method });
          return unregistration;
        }, (_error) => {
          this.connection.console.info(`Registering request handler for ${method} failed.`);
          return Promise.reject(_error);
        });
      }
      registerSingle2(type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        const id = UUID.generateUuid();
        let params = {
          registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        return this._connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
          return vscode_languageserver_protocol_1.Disposable.create(() => {
            this.unregisterSingle(id, method);
          });
        }, (_error) => {
          this.connection.console.info(`Registering request handler for ${method} failed.`);
          return Promise.reject(_error);
        });
      }
      unregisterSingle(id, method) {
        let params = {
          unregisterations: [{ id, method }]
        };
        return this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(void 0, (_error) => {
          this.connection.console.info(`Unregistering request handler for ${id} failed.`);
        });
      }
      registerMany(registrations) {
        let params = registrations.asRegistrationParams();
        return this._connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(() => {
          return new BulkUnregistrationImpl(this._connection, params.registrations.map((registration) => {
            return { id: registration.id, method: registration.method };
          }));
        }, (_error) => {
          this.connection.console.info(`Bulk registration failed.`);
          return Promise.reject(_error);
        });
      }
    };
    var _RemoteWorkspaceImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      applyEdit(paramOrEdit) {
        function isApplyWorkspaceEditParams(value) {
          return value && !!value.edit;
        }
        let params = isApplyWorkspaceEditParams(paramOrEdit) ? paramOrEdit : { edit: paramOrEdit };
        return this._connection.sendRequest(vscode_languageserver_protocol_1.ApplyWorkspaceEditRequest.type, params);
      }
    };
    var RemoteWorkspaceImpl = workspaceFolders_1.WorkspaceFoldersFeature(configuration_1.ConfigurationFeature(_RemoteWorkspaceImpl));
    var TelemetryImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      logEvent(data) {
        this._connection.sendNotification(vscode_languageserver_protocol_1.TelemetryEventNotification.type, data);
      }
    };
    var TracerImpl = class {
      constructor() {
        this._trace = vscode_languageserver_protocol_1.Trace.Off;
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      set trace(value) {
        this._trace = value;
      }
      log(message, verbose) {
        if (this._trace === vscode_languageserver_protocol_1.Trace.Off) {
          return;
        }
        this._connection.sendNotification(vscode_languageserver_protocol_1.LogTraceNotification.type, {
          message,
          verbose: this._trace === vscode_languageserver_protocol_1.Trace.Verbose ? verbose : void 0
        });
      }
    };
    var LanguagesImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      attachWorkDoneProgress(params) {
        return progress_1.attachWorkDone(this.connection, params);
      }
      attachPartialResultProgress(_type, params) {
        return progress_1.attachPartialResult(this.connection, params);
      }
    };
    exports2.LanguagesImpl = LanguagesImpl;
    function combineConsoleFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineConsoleFeatures = combineConsoleFeatures;
    function combineTelemetryFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineTelemetryFeatures = combineTelemetryFeatures;
    function combineTracerFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineTracerFeatures = combineTracerFeatures;
    function combineClientFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineClientFeatures = combineClientFeatures;
    function combineWindowFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineWindowFeatures = combineWindowFeatures;
    function combineWorkspaceFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineWorkspaceFeatures = combineWorkspaceFeatures;
    function combineLanguagesFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineLanguagesFeatures = combineLanguagesFeatures;
    function combineFeatures(one, two) {
      function combine(one2, two2, func) {
        if (one2 && two2) {
          return func(one2, two2);
        } else if (one2) {
          return one2;
        } else {
          return two2;
        }
      }
      let result = {
        __brand: "features",
        console: combine(one.console, two.console, combineConsoleFeatures),
        tracer: combine(one.tracer, two.tracer, combineTracerFeatures),
        telemetry: combine(one.telemetry, two.telemetry, combineTelemetryFeatures),
        client: combine(one.client, two.client, combineClientFeatures),
        window: combine(one.window, two.window, combineWindowFeatures),
        workspace: combine(one.workspace, two.workspace, combineWorkspaceFeatures)
      };
      return result;
    }
    exports2.combineFeatures = combineFeatures;
    function createConnection(arg1, arg2, arg3, arg4) {
      let factories;
      let input;
      let output;
      let strategy;
      if (arg1 !== void 0 && arg1.__brand === "features") {
        factories = arg1;
        arg1 = arg2;
        arg2 = arg3;
        arg3 = arg4;
      }
      if (vscode_languageserver_protocol_1.ConnectionStrategy.is(arg1)) {
        strategy = arg1;
      } else {
        input = arg1;
        output = arg2;
        strategy = arg3;
      }
      return _createConnection(input, output, strategy, factories);
    }
    exports2.createConnection = createConnection;
    function _createConnection(input, output, strategy, factories) {
      if (!input && !output && process.argv.length > 2) {
        let port = void 0;
        let pipeName = void 0;
        let argv = process.argv.slice(2);
        for (let i = 0; i < argv.length; i++) {
          let arg = argv[i];
          if (arg === "--node-ipc") {
            input = new vscode_languageserver_protocol_1.IPCMessageReader(process);
            output = new vscode_languageserver_protocol_1.IPCMessageWriter(process);
            break;
          } else if (arg === "--stdio") {
            input = process.stdin;
            output = process.stdout;
            break;
          } else if (arg === "--socket") {
            port = parseInt(argv[i + 1]);
            break;
          } else if (arg === "--pipe") {
            pipeName = argv[i + 1];
            break;
          } else {
            var args = arg.split("=");
            if (args[0] === "--socket") {
              port = parseInt(args[1]);
              break;
            } else if (args[0] === "--pipe") {
              pipeName = args[1];
              break;
            }
          }
        }
        if (port) {
          let transport = vscode_languageserver_protocol_1.createServerSocketTransport(port);
          input = transport[0];
          output = transport[1];
        } else if (pipeName) {
          let transport = vscode_languageserver_protocol_1.createServerPipeTransport(pipeName);
          input = transport[0];
          output = transport[1];
        }
      }
      var commandLineMessage = "Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
      if (!input) {
        throw new Error("Connection input stream is not set. " + commandLineMessage);
      }
      if (!output) {
        throw new Error("Connection output stream is not set. " + commandLineMessage);
      }
      if (Is.func(input.read) && Is.func(input.on)) {
        let inputStream = input;
        inputStream.on("end", () => {
          process.exit(shutdownReceived ? 0 : 1);
        });
        inputStream.on("close", () => {
          process.exit(shutdownReceived ? 0 : 1);
        });
      }
      const logger2 = factories && factories.console ? new (factories.console(RemoteConsoleImpl))() : new RemoteConsoleImpl();
      const connection2 = vscode_languageserver_protocol_1.createProtocolConnection(input, output, logger2, strategy);
      logger2.rawAttach(connection2);
      const tracer = factories && factories.tracer ? new (factories.tracer(TracerImpl))() : new TracerImpl();
      const telemetry = factories && factories.telemetry ? new (factories.telemetry(TelemetryImpl))() : new TelemetryImpl();
      const client = factories && factories.client ? new (factories.client(RemoteClientImpl))() : new RemoteClientImpl();
      const remoteWindow = factories && factories.window ? new (factories.window(RemoteWindowImpl))() : new RemoteWindowImpl();
      const workspace = factories && factories.workspace ? new (factories.workspace(RemoteWorkspaceImpl))() : new RemoteWorkspaceImpl();
      const languages = factories && factories.languages ? new (factories.languages(LanguagesImpl))() : new LanguagesImpl();
      const allRemotes = [logger2, tracer, telemetry, client, remoteWindow, workspace, languages];
      function asPromise(value) {
        if (value instanceof Promise) {
          return value;
        } else if (Is.thenable(value)) {
          return new Promise((resolve, reject) => {
            value.then((resolved) => resolve(resolved), (error) => reject(error));
          });
        } else {
          return Promise.resolve(value);
        }
      }
      let shutdownHandler = void 0;
      let initializeHandler = void 0;
      let exitHandler = void 0;
      let protocolConnection = {
        listen: () => connection2.listen(),
        sendRequest: (type, ...params) => connection2.sendRequest(Is.string(type) ? type : type.method, ...params),
        onRequest: (type, handler) => connection2.onRequest(type, handler),
        sendNotification: (type, param) => {
          const method = Is.string(type) ? type : type.method;
          if (arguments.length === 1) {
            connection2.sendNotification(method);
          } else {
            connection2.sendNotification(method, param);
          }
        },
        onNotification: (type, handler) => connection2.onNotification(type, handler),
        onProgress: connection2.onProgress,
        sendProgress: connection2.sendProgress,
        onInitialize: (handler) => initializeHandler = handler,
        onInitialized: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.InitializedNotification.type, handler),
        onShutdown: (handler) => shutdownHandler = handler,
        onExit: (handler) => exitHandler = handler,
        get console() {
          return logger2;
        },
        get telemetry() {
          return telemetry;
        },
        get tracer() {
          return tracer;
        },
        get client() {
          return client;
        },
        get window() {
          return remoteWindow;
        },
        get workspace() {
          return workspace;
        },
        get languages() {
          return languages;
        },
        onDidChangeConfiguration: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, handler),
        onDidChangeWatchedFiles: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type, handler),
        __textDocumentSync: void 0,
        onDidOpenTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, handler),
        onDidChangeTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, handler),
        onDidCloseTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, handler),
        onWillSaveTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type, handler),
        onWillSaveTextDocumentWaitUntil: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type, handler),
        onDidSaveTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, handler),
        sendDiagnostics: (params) => connection2.sendNotification(vscode_languageserver_protocol_1.PublishDiagnosticsNotification.type, params),
        onHover: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.HoverRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        onCompletion: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CompletionRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onCompletionResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, handler),
        onSignatureHelp: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        onDeclaration: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onDefinition: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onTypeDefinition: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onImplementation: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onReferences: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onDocumentHighlight: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onDocumentSymbol: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onWorkspaceSymbol: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onCodeAction: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onCodeLens: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onCodeLensResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentFormatting: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        onDocumentRangeFormatting: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        onDocumentOnTypeFormatting: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onRenameRequest: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.RenameRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        onPrepareRename: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentLinks: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onDocumentLinkResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentColor: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentColorRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onColorPresentation: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onFoldingRanges: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onSelectionRanges: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.SelectionRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onExecuteCommand: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        dispose: () => connection2.dispose()
      };
      for (let remote of allRemotes) {
        remote.attach(protocolConnection);
      }
      connection2.onRequest(vscode_languageserver_protocol_1.InitializeRequest.type, (params) => {
        const processId = params.processId;
        if (Is.number(processId) && exitTimer === void 0) {
          setInterval(() => {
            try {
              process.kill(processId, 0);
            } catch (ex) {
              process.exit(shutdownReceived ? 0 : 1);
            }
          }, 3e3);
        }
        if (Is.string(params.trace)) {
          tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.trace);
        }
        for (let remote of allRemotes) {
          remote.initialize(params.capabilities);
        }
        if (initializeHandler) {
          let result = initializeHandler(params, new vscode_languageserver_protocol_1.CancellationTokenSource().token, progress_1.attachWorkDone(connection2, params), void 0);
          return asPromise(result).then((value) => {
            if (value instanceof vscode_languageserver_protocol_1.ResponseError) {
              return value;
            }
            let result2 = value;
            if (!result2) {
              result2 = { capabilities: {} };
            }
            let capabilities = result2.capabilities;
            if (!capabilities) {
              capabilities = {};
              result2.capabilities = capabilities;
            }
            if (capabilities.textDocumentSync === void 0 || capabilities.textDocumentSync === null) {
              capabilities.textDocumentSync = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
            } else if (!Is.number(capabilities.textDocumentSync) && !Is.number(capabilities.textDocumentSync.change)) {
              capabilities.textDocumentSync.change = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
            }
            for (let remote of allRemotes) {
              remote.fillServerCapabilities(capabilities);
            }
            return result2;
          });
        } else {
          let result = { capabilities: { textDocumentSync: vscode_languageserver_protocol_1.TextDocumentSyncKind.None } };
          for (let remote of allRemotes) {
            remote.fillServerCapabilities(result.capabilities);
          }
          return result;
        }
      });
      connection2.onRequest(vscode_languageserver_protocol_1.ShutdownRequest.type, () => {
        shutdownReceived = true;
        if (shutdownHandler) {
          return shutdownHandler(new vscode_languageserver_protocol_1.CancellationTokenSource().token);
        } else {
          return void 0;
        }
      });
      connection2.onNotification(vscode_languageserver_protocol_1.ExitNotification.type, () => {
        try {
          if (exitHandler) {
            exitHandler();
          }
        } finally {
          if (shutdownReceived) {
            process.exit(0);
          } else {
            process.exit(1);
          }
        }
      });
      connection2.onNotification(vscode_languageserver_protocol_1.SetTraceNotification.type, (params) => {
        tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.value);
      });
      return protocolConnection;
    }
    var callHierarchy_proposed_1 = require_callHierarchy_proposed();
    var st = require_sematicTokens_proposed();
    var ProposedFeatures;
    (function(ProposedFeatures2) {
      ProposedFeatures2.all = {
        __brand: "features",
        languages: combineLanguagesFeatures(callHierarchy_proposed_1.CallHierarchyFeature, st.SemanticTokensFeature)
      };
      ProposedFeatures2.SemanticTokensBuilder = st.SemanticTokensBuilder;
    })(ProposedFeatures = exports2.ProposedFeatures || (exports2.ProposedFeatures = {}));
  }
});

// node_modules/vscode-languageserver-textdocument/lib/umd/main.js
var require_main5 = __commonJS({
  "node_modules/vscode-languageserver-textdocument/lib/umd/main.js"(exports2, module2) {
    (function(factory) {
      if (typeof module2 === "object" && typeof module2.exports === "object") {
        var v = factory(require, exports2);
        if (v !== void 0) module2.exports = v;
      } else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
      }
    })(function(require2, exports3) {
      "use strict";
      Object.defineProperty(exports3, "__esModule", { value: true });
      var FullTextDocument = (
        /** @class */
        (function() {
          function FullTextDocument2(uri, languageId, version, content) {
            this._uri = uri;
            this._languageId = languageId;
            this._version = version;
            this._content = content;
            this._lineOffsets = void 0;
          }
          Object.defineProperty(FullTextDocument2.prototype, "uri", {
            get: function() {
              return this._uri;
            },
            enumerable: true,
            configurable: true
          });
          Object.defineProperty(FullTextDocument2.prototype, "languageId", {
            get: function() {
              return this._languageId;
            },
            enumerable: true,
            configurable: true
          });
          Object.defineProperty(FullTextDocument2.prototype, "version", {
            get: function() {
              return this._version;
            },
            enumerable: true,
            configurable: true
          });
          FullTextDocument2.prototype.getText = function(range) {
            if (range) {
              var start = this.offsetAt(range.start);
              var end = this.offsetAt(range.end);
              return this._content.substring(start, end);
            }
            return this._content;
          };
          FullTextDocument2.prototype.update = function(changes, version) {
            for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
              var change = changes_1[_i];
              if (FullTextDocument2.isIncremental(change)) {
                var range = getWellformedRange(change.range);
                var startOffset = this.offsetAt(range.start);
                var endOffset = this.offsetAt(range.end);
                this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
                var startLine = Math.max(range.start.line, 0);
                var endLine = Math.max(range.end.line, 0);
                var lineOffsets = this._lineOffsets;
                var addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
                if (endLine - startLine === addedLineOffsets.length) {
                  for (var i = 0, len = addedLineOffsets.length; i < len; i++) {
                    lineOffsets[i + startLine + 1] = addedLineOffsets[i];
                  }
                } else {
                  if (addedLineOffsets.length < 1e4) {
                    lineOffsets.splice.apply(lineOffsets, [startLine + 1, endLine - startLine].concat(addedLineOffsets));
                  } else {
                    this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
                  }
                }
                var diff = change.text.length - (endOffset - startOffset);
                if (diff !== 0) {
                  for (var i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
                    lineOffsets[i] = lineOffsets[i] + diff;
                  }
                }
              } else if (FullTextDocument2.isFull(change)) {
                this._content = change.text;
                this._lineOffsets = void 0;
              } else {
                throw new Error("Unknown change event received");
              }
            }
            this._version = version;
          };
          FullTextDocument2.prototype.getLineOffsets = function() {
            if (this._lineOffsets === void 0) {
              this._lineOffsets = computeLineOffsets(this._content, true);
            }
            return this._lineOffsets;
          };
          FullTextDocument2.prototype.positionAt = function(offset) {
            offset = Math.max(Math.min(offset, this._content.length), 0);
            var lineOffsets = this.getLineOffsets();
            var low = 0, high = lineOffsets.length;
            if (high === 0) {
              return { line: 0, character: offset };
            }
            while (low < high) {
              var mid = Math.floor((low + high) / 2);
              if (lineOffsets[mid] > offset) {
                high = mid;
              } else {
                low = mid + 1;
              }
            }
            var line = low - 1;
            return { line, character: offset - lineOffsets[line] };
          };
          FullTextDocument2.prototype.offsetAt = function(position) {
            var lineOffsets = this.getLineOffsets();
            if (position.line >= lineOffsets.length) {
              return this._content.length;
            } else if (position.line < 0) {
              return 0;
            }
            var lineOffset = lineOffsets[position.line];
            var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
            return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
          };
          Object.defineProperty(FullTextDocument2.prototype, "lineCount", {
            get: function() {
              return this.getLineOffsets().length;
            },
            enumerable: true,
            configurable: true
          });
          FullTextDocument2.isIncremental = function(event) {
            var candidate = event;
            return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
          };
          FullTextDocument2.isFull = function(event) {
            var candidate = event;
            return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
          };
          return FullTextDocument2;
        })()
      );
      var TextDocument;
      (function(TextDocument2) {
        function create(uri, languageId, version, content) {
          return new FullTextDocument(uri, languageId, version, content);
        }
        TextDocument2.create = create;
        function update(document, changes, version) {
          if (document instanceof FullTextDocument) {
            document.update(changes, version);
            return document;
          } else {
            throw new Error("TextDocument.update: document must be created by TextDocument.create");
          }
        }
        TextDocument2.update = update;
        function applyEdits(document, edits) {
          var text = document.getText();
          var sortedEdits = mergeSort(edits.map(getWellformedEdit), function(a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
              return a.range.start.character - b.range.start.character;
            }
            return diff;
          });
          var lastModifiedOffset = 0;
          var spans = [];
          for (var _i = 0, sortedEdits_1 = sortedEdits; _i < sortedEdits_1.length; _i++) {
            var e = sortedEdits_1[_i];
            var startOffset = document.offsetAt(e.range.start);
            if (startOffset < lastModifiedOffset) {
              throw new Error("Overlapping edit");
            } else if (startOffset > lastModifiedOffset) {
              spans.push(text.substring(lastModifiedOffset, startOffset));
            }
            if (e.newText.length) {
              spans.push(e.newText);
            }
            lastModifiedOffset = document.offsetAt(e.range.end);
          }
          spans.push(text.substr(lastModifiedOffset));
          return spans.join("");
        }
        TextDocument2.applyEdits = applyEdits;
      })(TextDocument = exports3.TextDocument || (exports3.TextDocument = {}));
      function mergeSort(data, compare) {
        if (data.length <= 1) {
          return data;
        }
        var p = data.length / 2 | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
          var ret = compare(left[leftIdx], right[rightIdx]);
          if (ret <= 0) {
            data[i++] = left[leftIdx++];
          } else {
            data[i++] = right[rightIdx++];
          }
        }
        while (leftIdx < left.length) {
          data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
          data[i++] = right[rightIdx++];
        }
        return data;
      }
      function computeLineOffsets(text, isAtLineStart, textOffset) {
        if (textOffset === void 0) {
          textOffset = 0;
        }
        var result = isAtLineStart ? [textOffset] : [];
        for (var i = 0; i < text.length; i++) {
          var ch = text.charCodeAt(i);
          if (ch === 13 || ch === 10) {
            if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
              i++;
            }
            result.push(textOffset + i + 1);
          }
        }
        return result;
      }
      function getWellformedRange(range) {
        var start = range.start;
        var end = range.end;
        if (start.line > end.line || start.line === end.line && start.character > end.character) {
          return { start: end, end: start };
        }
        return range;
      }
      function getWellformedEdit(textEdit) {
        var range = getWellformedRange(textEdit.range);
        if (range !== textEdit.range) {
          return { newText: textEdit.newText, range };
        }
        return textEdit;
      }
    });
  }
});

// out/utilities/builtins.js
var require_builtins = __commonJS({
  "out/utilities/builtins.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.builtin_command = exports2.builtin_function = exports2.builtin_variable = void 0;
    exports2.builtin_variable = [
      ["A_Space", "\u6B64\u53D8\u91CF\u5305\u542B\u5355\u4E2A\u7A7A\u683C\u5B57\u7B26. \u8BF7\u53C2\u9605AutoTrim\u4E86\u89E3\u8BE6\u60C5."],
      ["A_Tab", "\u6B64\u53D8\u91CF\u5305\u542B\u5355\u4E2A tab \u5B57\u7B26. \u8BF7\u53C2\u9605AutoTrim\u4E86\u89E3\u8BE6\u60C5."],
      ["A_Args", "[v1.1.27+] \u8BFB/\u5199: \u5305\u542B\u4E00\u4E2A\u547D\u4EE4\u884C\u53C2\u6570\u6570\u7EC4. \u6709\u5173\u8BE6\u7EC6\u4FE1\u606F, \u8BF7\u53C2\u9605\u5411\u811A\u672C\u4F20\u9012\u547D\u4EE4\u884C\u53C2\u6570."],
      ["A_WorkingDir", "\u811A\u672C\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55, \u8FD9\u662F\u811A\u672C\u8BBF\u95EE\u6587\u4EF6\u7684\u9ED8\u8BA4\u8DEF\u5F84. \u9664\u975E\u662F\u6839\u76EE\u5F55, \u5426\u5219\u8DEF\u5F84\u672B\u5C3E\u4E0D\u5305\u542B\u53CD\u659C\u6760. \u4E24\u4E2A\u793A\u4F8B: C:\\ \u548C C:\\My Documents. \u4F7F\u7528 SetWorkingDir \u53EF\u4EE5\u6539\u53D8\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55."],
      ["A_ScriptDir", "\u5F53\u524D\u811A\u672C\u6240\u5728\u76EE\u5F55\u7684\u7EDD\u5BF9\u8DEF\u5F84. \u4E0D\u5305\u542B\u6700\u540E\u7684\u53CD\u659C\u6760(\u6839\u76EE\u5F55\u540C\u6837\u5982\u6B64)."],
      ["A_ScriptName", "\u5F53\u524D\u811A\u672C\u7684\u6587\u4EF6\u540D\u79F0, \u4E0D\u542B\u8DEF\u5F84, \u4F8B\u5982 MyScript.ahk."],
      ["A_ScriptFullPath", "\u4E0A\u9762\u4E24\u4E2A\u53D8\u91CF\u7684\u7EC4\u5408, \u5305\u542B\u4E86\u5F53\u524D\u811A\u672C\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0, \u4F8B\u5982 C:\\My Documents\\My Script.ahk"],
      ["A_ScriptHwnd", "[v1.1.01+] \u811A\u672C\u7684\u9690\u85CF\u4E3B\u7A97\u53E3\u7684\u552F\u4E00 ID(HWND/\u53E5\u67C4)."],
      ["A_LineNumber", "\u5F53\u524D\u811A\u672C\u4E2D\u6B63\u5728\u6267\u884C\u7684\u884C\u6240\u5728\u7684\u884C\u53F7(\u6216\u5176 #Include \u6587\u4EF6\u7684\u884C\u53F7). \u8FD9\u4E2A\u884C\u53F7\u4E0E ListLines \u663E\u793A\u7684\u4E00\u81F4; \u5B83\u53EF\u4EE5\u7528\u5728\u62A5\u544A\u9519\u8BEF\u7684\u65F6\u5019, \u4F8B\u5982: MsgBox Could not write to log file (line number %A_LineNumber%).\u7531\u4E8E\u5DF2\u7F16\u8BD1\u811A\u672C\u5DF2\u7ECF\u628A\u5B83\u6240\u6709\u7684 #Include \u6587\u4EF6\u5408\u5E76\u6210\u4E00\u4E2A\u5927\u811A\u672C, \u6240\u4EE5\u5B83\u7684\u884C\u53F7\u53EF\u80FD\u4E0E\u5B83\u5728\u672A\u7F16\u8BD1\u6A21\u5F0F\u8FD0\u884C\u65F6\u4E0D\u4E00\u6837."],
      ["A_LineFile", "A_LineNumber \u6240\u5C5E\u6587\u4EF6\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0, \u9664\u975E\u5F53\u524D\u884C\u5C5E\u4E8E\u672A\u7F16\u8BD1\u811A\u672C\u7684\u67D0\u4E2A #Include \u6587\u4EF6, \u5426\u5219\u5B83\u5C06\u548C A_ScriptFullPath \u76F8\u540C."],
      ["A_ThisFunc", "[v1.0.46.16+] \u5F53\u524D\u6B63\u5728\u6267\u884C\u7684\u81EA\u5B9A\u4E49\u51FD\u6570\u7684\u540D\u79F0(\u6CA1\u6709\u5219\u4E3A\u7A7A); \u4F8B\u5982: MyFunction. \u53E6\u8BF7\u53C2\u9605: IsFunc()"],
      ["A_ThisLabel", '[v1.0.46.16+] \u5F53\u524D\u6B63\u5728\u6267\u884C\u7684\u6807\u7B7E(\u5B50\u7A0B\u5E8F) \u7684\u540D\u79F0(\u6CA1\u6709\u5219\u4E3A\u7A7A); \u4F8B\u5982: MyLabel. \u6BCF\u5F53\u811A\u672C\u6267\u884C Gosub/Return \u6216 Goto \u65F6\u4F1A\u66F4\u65B0\u6B64\u53D8\u91CF\u7684\u503C. \u6267\u884C\u81EA\u52A8\u8C03\u7528\u7684\u6807\u7B7E\u65F6\u4E5F\u4F1A\u66F4\u65B0\u6B64\u53D8\u91CF\u7684\u503C, \u4F8B\u5982\u8BA1\u65F6\u5668, GUI \u7EBF\u7A0B, \u83DC\u5355\u9879, \u70ED\u952E, \u70ED\u5B57\u4E32, OnClipboardChange \u548C OnExit. \u4E0D\u8FC7, \u5F53\u6267\u884C\u4ECE\u524D\u9762\u7684\u8BED\u53E5"\u8FDB\u5165"\u4E00\u4E2A\u6807\u7B7E\u65F6\u4E0D\u4F1A\u66F4\u65B0 A_ThisLabel \u7684\u503C, \u5373\u6B64\u65F6\u5B83\u8FD8\u662F\u4FDD\u6301\u539F\u6765\u7684\u503C. \u53E6\u8BF7\u53C2\u9605: A_ThisHotkey \u548C IsLabel()'],
      ["A_AhkVersion", "\u5728 [1.0.22] \u4E4B\u524D\u7684\u7248\u672C, \u6B64\u53D8\u91CF\u4E3A\u7A7A. \u5426\u5219, \u5B83\u5305\u542B\u4E86\u8FD0\u884C\u5F53\u524D\u811A\u672C\u7684 AutoHotkey \u4E3B\u7A0B\u5E8F\u7684\u7248\u672C\u53F7, \u4F8B\u5982 1.0.22. \u5728\u5DF2\u7F16\u8BD1\u811A\u672C\u4E2D, \u5B83\u5305\u542B\u4E86\u539F\u6765\u7F16\u8BD1\u65F6\u4F7F\u7528\u7684\u4E3B\u7A0B\u5E8F\u7684\u7248\u672C\u53F7. \u683C\u5F0F\u5316\u7684\u7248\u672C\u53F7\u4F7F\u5F97\u811A\u672C\u53EF\u4EE5\u4F7F\u7528 > \u6216 >= \u6765\u68C0\u67E5 A_AhkVersion \u662F\u5426\u5927\u4E8E\u67D0\u4E2A\u6700\u5C0F\u7684\u7248\u672C\u53F7, \u4F8B\u5982: if A_AhkVersion >= 1.0.25.07."],
      ["A_AhkPath", "\u5BF9\u4E8E\u672A\u7F16\u8BD1\u811A\u672C: \u5B9E\u9645\u8FD0\u884C\u5F53\u524D\u811A\u672C\u7684 EXE \u6587\u4EF6\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0. \u4F8B\u5982: C:\\Program Files\\AutoHotkey\\AutoHotkey.exe. \u5BF9\u4E8E\u5DF2\u7F16\u8BD1\u811A\u672C: \u9664\u4E86\u901A\u8FC7\u6CE8\u518C\u8868\u6761\u76EE HKLM\\SOFTWARE\\AutoHotkey\\InstallDir \u83B7\u53D6 AutoHotkey \u76EE\u5F55\u5916, \u5176\u4ED6\u7684\u548C\u4E0A\u9762\u76F8\u540C. \u5982\u679C\u627E\u4E0D\u5230\u8FD9\u4E2A\u6CE8\u518C\u8868\u6761\u76EE, \u5219 A_AhkPath \u4E3A\u7A7A."],
      ["A_IsUnicode", "\u5F53\u5B57\u7B26\u4E32\u4E3A Unicode(16 \u4F4D) \u65F6\u503C\u4E3A 1, \u5B57\u7B26\u4E32\u4E3A ANSI(8 \u4F4D) \u65F6\u4E3A\u7A7A\u5B57\u7B26\u4E32(\u8FD9\u4F1A\u88AB\u89C6\u4E3A false). \u5B57\u7B26\u4E32\u7684\u683C\u5F0F\u53D6\u51B3\u4E8E\u7528\u6765\u8FD0\u884C\u5F53\u524D\u811A\u672C\u7684 AutoHotkey.exe, \u5982\u679C\u4E3A\u5DF2\u7F16\u8BD1\u811A\u672C, \u5219\u53D6\u51B3\u4E8E\u7528\u6765\u7F16\u8BD1\u5B83\u7684\u4E3B\u7A0B\u5E8F."],
      ["A_IsCompiled", "\u5982\u679C\u5F53\u524D\u8FD0\u884C\u7684\u811A\u672C\u4E3A\u5DF2\u7F16\u8BD1 EXE \u65F6\u6B64\u53D8\u91CF\u503C\u4E3A 1, \u5426\u5219\u4E3A\u7A7A\u5B57\u7B26\u4E32(\u8FD9\u4F1A\u88AB\u89C6\u4E3A false)."],
      ["A_ExitReason", "\u6700\u8FD1\u4E00\u6B21\u8981\u6C42\u811A\u672C\u7EC8\u6B62\u7684\u539F\u56E0. \u9664\u975E\u811A\u672C\u542B\u6709 OnExit \u5B50\u7A0B\u5E8F\u5E76\u4E14\u6B64\u5B50\u7A0B\u5E8F\u5F53\u524D\u6B63\u5728\u8FD0\u884C\u6216\u88AB\u9000\u51FA\u5C1D\u8BD5\u81F3\u5C11\u8C03\u7528\u8FC7\u4E00\u6B21, \u5426\u5219\u6B64\u53D8\u91CF\u4E3A\u7A7A. \u8BF7\u53C2\u9605 OnExit \u4E86\u89E3\u8BE6\u60C5."],
      ["A_YYYY", "4 \u4F4D\u6570\u8868\u793A\u7684\u5F53\u524D\u5E74\u4EFD(\u4F8B\u5982 2004). \u4E0E A_Year \u542B\u4E49\u76F8\u540C. \u6CE8\u610F: \u8981\u83B7\u53D6\u7B26\u5408\u60A8\u533A\u57DF\u8BBE\u7F6E\u548C\u8BED\u8A00\u7684\u683C\u5F0F\u5316\u65F6\u95F4\u6216\u65E5\u671F, \u8BF7\u4F7F\u7528 FormatTime, OutputVar(\u65F6\u95F4\u548C\u957F\u65E5\u671F) \u6216 FormatTime, OutputVar,, LongDate(\u83B7\u53D6\u957F\u683C\u5F0F\u65E5\u671F)."],
      ["A_MM", "2 \u4F4D\u6570\u8868\u793A\u7684\u5F53\u524D\u6708\u4EFD(01-12). \u4E0E A_Mon \u542B\u4E49\u76F8\u540C."],
      ["A_DD", "2 \u4F4D\u6570\u8868\u793A\u7684\u5F53\u524D\u6708\u4EFD\u7684\u65E5\u671F(01-31). \u4E0E A_MDay \u542B\u4E49\u76F8\u540C."],
      ["A_MMMM", "\u4F7F\u7528\u5F53\u524D\u7528\u6237\u8BED\u8A00\u8868\u793A\u7684\u5F53\u524D\u6708\u4EFD\u7684\u5168\u79F0, \u4F8B\u5982 July"],
      ["A_MMM", "\u4F7F\u7528\u5F53\u524D\u7528\u6237\u8BED\u8A00\u8868\u793A\u7684\u5F53\u524D\u6708\u4EFD\u7684\u7B80\u79F0, \u4F8B\u5982 Jul"],
      ["A_DDDD", "\u4F7F\u7528\u5F53\u524D\u7528\u6237\u8BED\u8A00\u8868\u793A\u7684\u5F53\u524D\u661F\u671F\u51E0\u7684\u5168\u79F0, \u4F8B\u5982 Sunday"],
      ["A_DDD", "\u4F7F\u7528\u5F53\u524D\u7528\u6237\u8BED\u8A00\u8868\u793A\u7684\u5F53\u524D\u661F\u671F\u51E0\u7684\u7B80\u79F0, \u4F8B\u5982 Sun"],
      ["A_WDay", "1 \u4F4D\u6570\u8868\u793A\u7684\u5F53\u524D\u661F\u671F\u7ECF\u8FC7\u7684\u5929\u6570(1-7). \u5728\u6240\u6709\u533A\u57DF\u8BBE\u7F6E\u4E2D 1 \u90FD\u8868\u793A\u661F\u671F\u5929."],
      ["A_YDay", "\u5F53\u524D\u5E74\u4EFD\u4E2D\u7ECF\u8FC7\u7684\u5929\u6570(1-366). \u4E0D\u4F1A\u4F7F\u7528\u96F6\u5BF9\u53D8\u91CF\u7684\u503C\u8FDB\u884C\u586B\u5145, \u4F8B\u5982\u4F1A\u83B7\u53D6\u5230 9, \u800C\u4E0D\u662F 009. \u8981\u5BF9\u53D8\u91CF\u7684\u503C\u8FDB\u884C\u96F6\u586B\u5145, \u8BF7\u4F7F\u7528: FormatTime, OutputVar, , YDay0."],
      ["A_YWeek", "\u7B26\u5408 ISO 8601 \u6807\u51C6\u7684\u5F53\u524D\u7684\u5E74\u4EFD\u548C\u5468\u6570(\u4F8B\u5982 200453). \u8981\u5206\u79BB\u5E74\u4EFD\u548C\u5468\u6570, \u8BF7\u4F7F\u7528 StringLeft, Year, A_YWeek, 4 \u548C StringRight, Week, A_YWeek, 2. A_YWeek \u7684\u51C6\u786E\u5B9A\u4E49\u4E3A: \u5982\u679C\u542B\u6709 1 \u6708 1 \u65E5\u7684\u661F\u671F\u6709\u56DB\u5929\u4EE5\u4E0A\u5728\u65B0\u5E74\u91CC, \u5219\u5B83\u88AB\u8BA4\u4E3A\u662F\u65B0\u5E74\u7684\u7B2C\u4E00\u4E2A\u661F\u671F. \u5426\u5219, \u5B83\u4E3A\u524D\u4E00\u5E74\u7684\u6700\u540E\u4E00\u4E2A\u661F\u671F, \u800C\u4E0B\u4E00\u661F\u671F\u4E3A\u65B0\u5E74\u7684\u7B2C\u4E00\u661F\u671F."],
      ["A_Hour", "\u5728 24 \u5C0F\u65F6\u5236(\u4F8B\u5982, 17 \u8868\u793A 5pm) \u4E2D 2 \u4F4D\u6570\u8868\u793A\u7684\u5F53\u524D\u5C0F\u65F6\u6570(00-23). \u8981\u83B7\u53D6\u5E26 AM/PM \u63D0\u793A\u7684 12 \u5C0F\u65F6\u5236\u7684\u65F6\u95F4, \u8BF7\u53C2\u7167\u6B64\u4F8B: FormatTime, OutputVar, , h:mm:ss tt"],
      ["A_Min", "2 \u4F4D\u6570\u8868\u793A\u7684\u5F53\u524D\u5206\u949F\u6570(00-59)."],
      ["A_Sec", "2 \u4F4D\u6570\u8868\u793A\u7684\u5F53\u524D\u79D2\u6570(00-59)."],
      ["A_MSec", "3 \u4F4D\u6570\u8868\u793A\u7684\u5F53\u524D\u6BEB\u79D2\u6570(000-999). \u8981\u79FB\u9664\u524D\u5BFC\u96F6, \u8BF7\u53C2\u7167\u6B64\u4F8B: Milliseconds := A_MSec + 0."],
      ["A_Now", "YYYYMMDDHH24MISS \u683C\u5F0F\u7684\u5F53\u524D\u672C\u5730\u65F6\u95F4.\u6CE8\u610F: \u4F7F\u7528 EnvAdd \u548C EnvSub \u53EF\u4EE5\u5BF9\u65E5\u671F\u548C\u65F6\u95F4\u8FDB\u884C\u8BA1\u7B97. \u6B64\u5916, \u4F7F\u7528 FormatTime \u53EF\u4EE5\u6839\u636E\u60A8\u7684\u533A\u57DF\u8BBE\u7F6E\u6216\u9009\u9879\u6765\u683C\u5F0F\u5316\u65E5\u671F\u548C/\u6216\u65F6\u95F4."],
      ["A_NowUTC", "YYYYMMDDHH24MISS \u683C\u5F0F\u7684\u5F53\u524D\u7684\u534F\u8C03\u4E16\u754C\u65F6(UTC). UTC \u672C\u8D28\u4E0A\u548C\u683C\u6797\u5A01\u6CBB\u6807\u51C6\u65F6\u95F4(GMT) \u4E00\u81F4."],
      ["A_TickCount", "\u8BA1\u7B97\u673A\u91CD\u542F\u540E\u7ECF\u8FC7\u7684\u6BEB\u79D2\u6570. \u901A\u8FC7\u628A A_TickCount \u4FDD\u5B58\u5230\u53D8\u91CF\u4E2D, \u7ECF\u8FC7\u4E00\u6BB5\u65F6\u95F4\u540E\u4ECE\u6700\u8FD1\u7684 A_TickCount \u503C\u4E2D\u51CF\u53BB\u90A3\u4E2A\u53D8\u91CF, \u53EF\u4EE5\u8BA1\u7B97\u51FA\u6240\u7ECF\u8FC7\u7684\u65F6\u95F4. \u4F8B\u5982:StartTime := A_TickCount  \n Sleep, 1000  \n ElapsedTime := A_TickCount - StartTime  \n MsgBox, %ElapsedTime% milliseconds have elapsed.  \n \u5982\u679C\u60A8\u9700\u8981\u6BD4 A_TickCount \u7684 10ms \u66F4\u9AD8\u7684\u7CBE\u786E\u5EA6, \u8BF7\u4F7F\u7528 QueryPerformanceCounter()(\u9AD8\u7CBE\u5EA6\u8BA1\u65F6\u5668)."],
      ["A_IsSuspended", "\u5F53\u811A\u672C\u6302\u8D77\u65F6\u503C\u4E3A 1, \u5426\u5219\u4E3A 0."],
      ["A_IsPaused", "[v1.0.48+] \u5F53\u7D27\u968F\u5F53\u524D\u7EBF\u7A0B\u7684\u7EBF\u7A0B\u88AB\u6682\u505C\u65F6\u503C\u4E3A 1. \u5426\u5219\u4E3A 0."],
      ["A_IsCritical", "[v1.0.48+] \u5F53\u524D\u7EBF\u7A0B\u7684 Critical \u8BBE\u7F6E\u5173\u95ED\u65F6\u503C\u4E3A 0. \u5426\u5219\u5B83\u5305\u542B\u5927\u4E8E\u96F6\u7684\u6574\u6570, \u5373 Critical \u4F7F\u7528\u7684\u6D88\u606F\u68C0\u67E5\u9891\u7387. \u56E0\u4E3A Critical 0 \u5173\u95ED\u4E86\u5F53\u524D\u7EBF\u7A0B\u7684\u5173\u952E\u6027, \u6240\u4EE5 Critical \u7684\u5F53\u524D\u72B6\u6001\u53EF\u4EE5\u8FD9\u6837\u6765\u4FDD\u5B58\u548C\u6062\u590D: Old_IsCritical := A_IsCritical, \u540E\u6765\u6267\u884C Critical %Old_IsCritical%."],
      ["A_BatchLines", "(\u540C\u4E49\u4E8E A_NumBatchLines) \u7531 SetBatchLines \u8BBE\u7F6E\u7684\u5F53\u524D\u503C. \u4F8B\u5982: 200 \u6216 10ms(\u53D6\u51B3\u4E8E\u683C\u5F0F)."],
      ["A_ListLines", "[v1.1.28+] ListLines \u6FC0\u6D3B\u65F6\u503C\u4E3A 1. \u5426\u5219\u4E3A 0."],
      ["A_TitleMatchMode", "\u7531 SetTitleMatchMode \u8BBE\u7F6E\u7684\u5F53\u524D\u6A21\u5F0F: 1, 2, 3 \u6216 RegEx."],
      ["A_TitleMatchModeSpeed", "\u7531 SetTitleMatchMode \u8BBE\u7F6E\u7684\u5F53\u524D\u5339\u914D\u901F\u5EA6(fast \u6216 slow)."],
      ["A_DetectHiddenWindows", "\u7531 DetectHiddenWindows \u8BBE\u7F6E\u7684\u5F53\u524D\u6A21\u5F0F(On \u6216 Off)."],
      ["A_DetectHiddenText", "\u7531 DetectHiddenText \u8BBE\u7F6E\u7684\u5F53\u524D\u6A21\u5F0F(On \u6216 Off)."],
      ["A_AutoTrim", "\u7531 AutoTrim \u8BBE\u7F6E\u7684\u5F53\u524D\u6A21\u5F0F(On \u6216 Off)."],
      ["A_StringCaseSense", "\u7531 StringCaseSense \u8BBE\u7F6E\u7684\u5F53\u524D\u6A21\u5F0F(On, Off \u6216 Locale)."],
      ["A_FileEncoding", "[v1.0.90+]: \u5305\u542B\u4E86\u591A\u4E2A\u547D\u4EE4\u4F7F\u7528\u7684\u9ED8\u8BA4\u7F16\u7801; \u8BF7\u53C2\u9605 FileEncoding."],
      ["A_FormatInteger", "\u7531 SetFormat \u8BBE\u7F6E\u7684\u5F53\u524D\u6574\u6570\u683C\u5F0F(H \u6216 D). [v1.0.90+]: \u6B64\u53D8\u91CF\u8FD8\u53EF\u80FD\u4E3A\u5C0F\u5199\u5B57\u6BCD h."],
      ["A_FormatFloat", "\u7531 SetFormat \u8BBE\u7F6E\u7684\u5F53\u524D\u6D6E\u70B9\u6570\u683C\u5F0F."],
      ["A_SendMode", "[v1.1.23+]: \u7531 SendMode \u8BBE\u7F6E\u7684\u5F53\u524D\u6A21\u5F0F\u5B57\u7B26\u4E32(\u53EF\u80FD\u7684\u503C\u4E3A: Event, Input, Play \u6216 InputThenPlay)."],
      ["A_SendLevel", "[v1.1.23+]: \u5F53\u524D SendLevel \u7684\u8BBE\u7F6E(\u53EF\u80FD\u7684\u503C\u4E3A: 0 \u5230 100 \u4E4B\u95F4\u7684\u6574\u6570, \u5305\u62EC 0 \u548C 100)."],
      ["A_StoreCapsLockMode", "[v1.1.23+]: \u7531 SetStoreCapsLockMode \u8BBE\u7F6E\u7684\u5F53\u524D\u6A21\u5F0F\u5B57\u7B26\u4E32(\u53EF\u80FD\u7684\u503C\u4E3A: On \u6216 Off)."],
      ["A_KeyDelay", "\u7531 SetKeyDelay \u8BBE\u7F6E\u7684\u5F53\u524D\u5EF6\u8FDF(\u603B\u662F\u5341\u8FDB\u5236\u6570, \u4E0D\u662F\u5341\u516D\u8FDB\u5236). A_KeyDuration \u4F9D\u8D56 [v1.1.23+] ."],
      ["A_KeyDuration", "\u7531 SetKeyDelay \u8BBE\u7F6E\u7684\u5F53\u524D\u5EF6\u8FDF(\u603B\u662F\u5341\u8FDB\u5236\u6570, \u4E0D\u662F\u5341\u516D\u8FDB\u5236). A_KeyDuration \u4F9D\u8D56 [v1.1.23+] ."],
      ["A_KeyDelayPlay", "\u8868\u793A\u7531 SetKeyDelay \u8BBE\u7F6E SendPlay \u6A21\u5F0F\u7684\u5EF6\u8FDF\u6216\u6301\u7EED\u65F6\u95F4(\u603B\u662F\u5341\u8FDB\u5236\u6570, \u4E0D\u662F\u5341\u516D\u8FDB\u5236). \u4F9D\u8D56 [v1.1.23+]. "],
      ["A_KeyDurationPlay", "\u8868\u793A\u7531 SetKeyDelay \u8BBE\u7F6E SendPlay \u6A21\u5F0F\u7684\u5EF6\u8FDF\u6216\u6301\u7EED\u65F6\u95F4(\u603B\u662F\u5341\u8FDB\u5236\u6570, \u4E0D\u662F\u5341\u516D\u8FDB\u5236). \u4F9D\u8D56 [v1.1.23+]."],
      ["A_WinDelay", "\u7531 SetWinDelay \u8BBE\u7F6E\u7684\u5F53\u524D\u5EF6\u8FDF(\u603B\u662F\u5341\u8FDB\u5236\u6570, \u4E0D\u662F\u5341\u516D\u8FDB\u5236)."],
      ["A_ControlDelay", "\u7531 SetControlDelay \u8BBE\u7F6E\u7684\u5F53\u524D\u5EF6\u8FDF(\u603B\u662F\u5341\u8FDB\u5236\u6570, \u4E0D\u662F\u5341\u516D\u8FDB\u5236)."],
      ["A_MouseDelay", "\u7531 SetMouseDelay \u8BBE\u7F6E\u7684\u5F53\u524D\u5EF6\u8FDF(\u603B\u662F\u5341\u8FDB\u5236\u6570, \u4E0D\u662F\u5341\u516D\u8FDB\u5236). A_MouseDelay \u8868\u793A\u4F20\u7EDF\u7684 SendEvent \u6A21\u5F0F. "],
      ["A_MouseDelayPlay", "\u7531 SetMouseDelay \u8BBE\u7F6E\u7684\u5F53\u524D\u5EF6\u8FDF(\u603B\u662F\u5341\u8FDB\u5236\u6570, \u4E0D\u662F\u5341\u516D\u8FDB\u5236). A_MouseDelayPlay \u8868\u793A SendPlay. A_MouseDelayPlay \u4F9D\u8D56 [v1.1.23+]."],
      ["A_DefaultMouseSpeed", "\u7531 SetDefaultMouseSpeed \u8BBE\u7F6E\u7684\u5F53\u524D\u901F\u5EA6(\u603B\u662F\u5341\u8FDB\u5236\u6570, \u4E0D\u662F\u5341\u516D\u8FDB\u5236)."],
      ["A_CoordModeToolTip", "[v1.1.23+]: CoordMode \u7684\u5F53\u524D\u8BBE\u7F6E\u503C\u7684\u5B57\u7B26\u4E32. (\u53EF\u80FD\u7684\u503C\u4E3A: Window, Client \u6216 Screen)"],
      ["A_CoordModePixel", "[v1.1.23+]: CoordMode \u7684\u5F53\u524D\u8BBE\u7F6E\u503C\u7684\u5B57\u7B26\u4E32. (\u53EF\u80FD\u7684\u503C\u4E3A: Window, Client \u6216 Screen)"],
      ["A_CoordModeMouse", "[v1.1.23+]: CoordMode \u7684\u5F53\u524D\u8BBE\u7F6E\u503C\u7684\u5B57\u7B26\u4E32. (\u53EF\u80FD\u7684\u503C\u4E3A: Window, Client \u6216 Screen)"],
      ["A_CoordModeCaret", "[v1.1.23+]: CoordMode \u7684\u5F53\u524D\u8BBE\u7F6E\u503C\u7684\u5B57\u7B26\u4E32. (\u53EF\u80FD\u7684\u503C\u4E3A: Window, Client \u6216 Screen) "],
      ["A_CoordModeMenu", "[v1.1.23+]: CoordMode \u7684\u5F53\u524D\u8BBE\u7F6E\u503C\u7684\u5B57\u7B26\u4E32. (\u53EF\u80FD\u7684\u503C\u4E3A: Window, Client \u6216 Screen)"],
      ["A_RegView", "[v1.1.08+]: \u7531 SetRegView \u8BBE\u7F6E\u7684\u5F53\u524D\u6CE8\u518C\u8868\u89C6\u56FE."],
      ["A_IconHidden", "\u6258\u76D8\u56FE\u6807\u5F53\u524D\u9690\u85CF\u65F6\u503C\u4E3A 1, \u5426\u5219\u4E3A 0. \u6B64\u56FE\u6807\u53EF\u4EE5\u4F7F\u7528 #NoTrayIcon \u6216 Menu \u547D\u4EE4\u8FDB\u884C\u9690\u85CF."],
      ["A_IconTip", "\u5982\u679C\u4F7F\u7528 Menu, Tray, Tip \u4E3A\u6258\u76D8\u56FE\u6807\u6307\u5B9A\u4E86\u81EA\u5B9A\u4E49\u7684\u5DE5\u5177\u63D0\u793A\u65F6, \u53D8\u91CF\u7684\u503C\u4E3A\u8FD9\u4E2A\u63D0\u793A\u7684\u6587\u672C, \u5426\u5219\u4E3A\u7A7A."],
      ["A_IconFile", "\u5982\u679C\u4F7F\u7528 Menu, tray, icon \u6307\u5B9A\u4E86\u81EA\u5B9A\u4E49\u7684\u6258\u76D8\u56FE\u6807\u65F6, \u53D8\u91CF\u7684\u503C\u4E3A\u56FE\u6807\u6587\u4EF6\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0, \u5426\u5219\u4E3A\u7A7A."],
      ["A_IconNumber", "\u5F53 A_IconFile \u4E3A\u7A7A\u65F6\u6B64\u53D8\u91CF\u4E3A\u7A7A. \u5426\u5219, \u5B83\u7684\u503C\u4E3A A_IconFile \u4E2D\u7684\u56FE\u6807\u7F16\u53F7(\u901A\u5E38\u4E3A 1).\u7528\u6237\u7A7A\u95F2\u65F6\u95F4"],
      ["A_TimeIdle", "\u4ECE\u7CFB\u7EDF\u6700\u540E\u4E00\u6B21\u63A5\u6536\u5230\u952E\u76D8, \u9F20\u6807\u6216\u5176\u4ED6\u8F93\u5165\u540E\u6240\u7ECF\u8FC7\u7684\u6BEB\u79D2\u6570. \u8FD9\u53EF\u4EE5\u7528\u6765\u5224\u65AD\u7528\u6237\u662F\u5426\u79BB\u5F00. \u7528\u6237\u7684\u7269\u7406\u8F93\u5165\u548C\u7531 \u4EFB\u4F55 \u7A0B\u5E8F\u6216\u811A\u672C\u751F\u6210\u7684\u6A21\u62DF\u8F93\u5165(\u4F8B\u5982 Send \u6216 MouseMove \u547D\u4EE4)\u4F1A\u8BA9\u6B64\u53D8\u91CF\u91CD\u7F6E\u4E3A\u96F6. \u7531\u4E8E\u6B64\u53D8\u91CF\u7684\u503C\u8D8B\u5411\u4E8E\u4EE5 10 \u7684\u589E\u91CF\u589E\u52A0, \u6240\u4EE5\u4E0D\u5E94\u8BE5\u5224\u65AD\u5B83\u662F\u5426\u7B49\u4E8E\u53E6\u4E00\u4E2A\u503C. \u76F8\u53CD, \u5E94\u8BE5\u68C0\u67E5\u6B64\u53D8\u91CF\u662F\u5426\u5927\u4E8E\u6216\u5C0F\u4E8E\u53E6\u4E00\u4E2A\u503C. \u4F8B\u5982: IfGreater, A_TimeIdle, 600000, MsgBox, The last keyboard or mouse activity was at least 10 minutes ago."],
      ["A_TimeIdlePhysical", "\u4E0E\u4E0A\u9762\u7C7B\u4F3C, \u4F46\u5728\u5B89\u88C5\u4E86\u76F8\u5E94\u7684\u94A9\u5B50(\u952E\u76D8\u6216\u9F20\u6807) \u540E\u4F1A\u5FFD\u7565\u6A21\u62DF\u7684\u952E\u51FB\u548C/\u6216\u9F20\u6807\u70B9\u51FB; \u5373\u6B64\u53D8\u91CF\u4EC5\u53CD\u5E94\u7269\u7406\u4E8B\u4EF6. (\u8FD9\u6837\u907F\u514D\u4E86\u7531\u4E8E\u6A21\u62DF\u952E\u51FB\u548C\u9F20\u6807\u70B9\u51FB\u800C\u8BEF\u4EE5\u4E3A\u7528\u6237\u5B58\u5728.) \u5982\u679C\u4E24\u79CD\u94A9\u5B50\u90FD\u6CA1\u6709\u5B89\u88C5, \u5219\u6B64\u53D8\u91CF\u7B49\u540C\u4E8E A_TimeIdle. \u5982\u679C\u4EC5\u5B89\u88C5\u4E86\u4E00\u79CD\u94A9\u5B50, \u90A3\u4E48\u4EC5\u6B64\u7C7B\u578B\u7684\u7269\u7406\u8F93\u5165\u624D\u4F1A\u5BF9 A_TimeIdlePhysical \u8D77\u4F5C\u7528(\u53E6\u4E00\u79CD/\u672A\u5B89\u88C5\u94A9\u5B50\u7684\u8F93\u5165, \u5305\u62EC\u7269\u7406\u7684\u548C\u6A21\u62DF\u7684, \u90FD\u4F1A\u88AB\u5FFD\u7565)."],
      ["A_TimeIdleKeyboard", "[v1.1.28+] \u5982\u679C\u5B89\u88C5\u4E86\u952E\u76D8\u94A9\u5B50, \u8FD9\u662F\u81EA\u7CFB\u7EDF\u4E0A\u6B21\u63A5\u6536\u7269\u7406\u952E\u76D8\u8F93\u5165\u4EE5\u6765\u6240\u7ECF\u8FC7\u7684\u6BEB\u79D2\u6570. \u5426\u5219, \u8FD9\u4E2A\u53D8\u91CF\u5C31\u7B49\u4E8E A_TimeIdle."],
      ["A_TimeIdleMouse", "[v1.1.28+] \u5982\u679C\u5B89\u88C5\u4E86\u9F20\u6807\u94A9\u5B50, \u8FD9\u662F\u81EA\u7CFB\u7EDF\u4E0A\u6B21\u6536\u5230\u7269\u7406\u9F20\u6807\u8F93\u5165\u4EE5\u6765\u6240\u7ECF\u8FC7\u7684\u6BEB\u79D2\u6570. \u5426\u5219, \u8FD9\u4E2A\u53D8\u91CF\u5C31\u7B49\u4E8E A_TimeIdle."],
      ["A_DefaultGui", "[v1.1.23+] \u5F53\u524D\u7EBF\u7A0B\u7684 GUI \u540D\u79F0\u6216\u5E8F\u53F7."],
      ["A_DefaultListView", "[v1.1.23+] ListView \u63A7\u4EF6\u7684\u53D8\u91CF\u540D\u6216\u53E5\u67C4, \u8FD9\u53D6\u51B3\u4E0E\u4F7F\u7528\u4E86\u4F55\u79CD ListView \u51FD\u6570. \u5982\u679C\u9ED8\u8BA4 GUI \u4E2D\u6CA1\u6709 ListView \u63A7\u4EF6, \u6B64\u53D8\u91CF\u4E3A\u7A7A."],
      ["A_DefaultTreeView", "[v1.1.23+] TreeView \u63A7\u4EF6\u7684\u53D8\u91CF\u540D\u6216\u53E5\u67C4, \u8FD9\u53D6\u51B3\u4E0E\u4F7F\u7528\u4E86\u4F55\u79CD TreeView \u51FD\u6570. \u5982\u679C\u9ED8\u8BA4 GUI \u4E2D\u6CA1\u6709 TreeView \u63A7\u4EF6, \u6B64\u53D8\u91CF\u4E3A\u7A7A."],
      ["A_Gui", "\u542F\u52A8\u4E86\u5F53\u524D\u7EBF\u7A0B\u7684 GUI \u7684\u540D\u79F0\u6216\u7F16\u53F7. \u9664\u975E\u5F53\u524D\u7EBF\u7A0B\u662F\u7531 Gui \u63A7\u4EF6, \u83DC\u5355\u9879\u6216 Gui \u4E8B\u4EF6(\u4F8B\u5982 GuiClose/GuiEscape) \u542F\u52A8\u7684, \u5426\u5219\u6B64\u53D8\u91CF\u4E3A\u7A7A."],
      ["A_GuiControl", "\u542F\u52A8\u5F53\u524D\u7EBF\u7A0B\u7684 GUI \u63A7\u4EF6\u7684\u5173\u8054\u53D8\u91CF\u540D. \u5982\u679C\u90A3\u4E2A\u63A7\u4EF6\u6CA1\u6709\u5173\u8054\u53D8\u91CF, \u5219 A_GuiControl \u5305\u542B\u6B64\u63A7\u4EF6\u7684\u6587\u672C/\u6807\u9898\u4E2D\u524D 63 \u4E2A\u5B57\u7B26(\u8FD9\u5E38\u7528\u6765\u907F\u514D\u7ED9\u6BCF\u4E2A\u6309\u94AE\u5206\u914D\u53D8\u91CF\u540D). \u51FA\u73B0\u540E\u9762\u8FD9\u4E9B\u60C5\u51B5\u65F6 A_GuiControl \u4E3A\u7A7A: 1) A_Gui \u4E3A\u7A7A; 2) GUI \u83DC\u5355\u9879\u6216\u4E8B\u4EF6(\u4F8B\u5982 GuiClose/GuiEscape) \u542F\u52A8\u4E86\u5F53\u524D\u7EBF\u7A0B; 3) \u90A3\u4E2A\u63A7\u4EF6\u6CA1\u6709\u5173\u8054\u53D8\u91CF, \u4E5F\u6CA1\u6709\u6807\u9898; \u6216 4) \u6700\u521D\u542F\u52A8\u5F53\u524D\u7EBF\u7A0B\u7684\u63A7\u4EF6\u5DF2\u7ECF\u4E0D\u5B58\u5728(\u53EF\u80FD\u7531\u4E8E Gui Destroy \u7684\u539F\u56E0)."],
      ["A_GuiWidth", "\u5728 GuiSize \u5B50\u7A0B\u5E8F\u4E2D\u5F15\u7528\u65F6, \u5B83\u4EEC\u5206\u522B\u5305\u542B\u4E86 GUI \u7A97\u53E3\u7684\u5BBD\u5EA6\u548C\u9AD8\u5EA6. \u5B83\u4EEC\u5BF9\u5E94\u4E8E\u7A97\u53E3\u7684\u5DE5\u4F5C\u533A, \u8FD9\u662F\u7A97\u53E3\u4E2D\u4E0D\u5305\u62EC\u6807\u9898\u680F, \u83DC\u5355\u680F\u548C\u8FB9\u6846\u7684\u533A\u57DF. [v1.1.11+]: \u8FD9\u4E9B\u503C\u4F1A\u53D7 DPI \u7F29\u653E\u7684\u5F71\u54CD."],
      ["A_GuiHeight", "\u5728 GuiSize \u5B50\u7A0B\u5E8F\u4E2D\u5F15\u7528\u65F6, \u5B83\u4EEC\u5206\u522B\u5305\u542B\u4E86 GUI \u7A97\u53E3\u7684\u5BBD\u5EA6\u548C\u9AD8\u5EA6. \u5B83\u4EEC\u5BF9\u5E94\u4E8E\u7A97\u53E3\u7684\u5DE5\u4F5C\u533A, \u8FD9\u662F\u7A97\u53E3\u4E2D\u4E0D\u5305\u62EC\u6807\u9898\u680F, \u83DC\u5355\u680F\u548C\u8FB9\u6846\u7684\u533A\u57DF. [v1.1.11+]: \u8FD9\u4E9B\u503C\u4F1A\u53D7 DPI \u7F29\u653E\u7684\u5F71\u54CD."],
      ["A_GuiX", "\u5B83\u4EEC\u5305\u542B\u4E86 GuiContextMenu \u548C GuiDropFiles \u4E8B\u4EF6\u4E2D\u7684 X \u5750\u6807. \u8FD9\u91CC\u7684\u5750\u6807\u76F8\u5BF9\u4E8E\u7A97\u53E3\u7684\u5DE6\u4E0A\u89D2. [v1.1.11+]: \u8FD9\u4E9B\u503C\u4F1A\u53D7 DPI \u7F29\u653E\u7684\u5F71\u54CD."],
      ["A_GuiY", "\u5B83\u4EEC\u5305\u542B\u4E86 GuiContextMenu \u548C GuiDropFiles \u4E8B\u4EF6\u4E2D\u7684 Y \u5750\u6807. \u8FD9\u91CC\u7684\u5750\u6807\u76F8\u5BF9\u4E8E\u7A97\u53E3\u7684\u5DE6\u4E0A\u89D2. [v1.1.11+]: \u8FD9\u4E9B\u503C\u4F1A\u53D7 DPI \u7F29\u653E\u7684\u5F71\u54CD."],
      ["A_GuiEvent", "\u542F\u52A8\u5F53\u524D\u7EBF\u7A0B\u7684\u4E8B\u4EF6\u7C7B\u578B. \u5982\u679C\u5F53\u524D\u7EBF\u7A0B\u4E0D\u662F\u7531 GUI \u52A8\u4F5C\u542F\u52A8\u7684, \u5219\u6B64\u53D8\u91CF\u4E3A\u7A7A. \u5426\u5219, \u5B83\u4E3A\u4E0B\u5217\u5B57\u7B26\u4E32\u7684\u5176\u4E2D\u4E00\u4E2A:"],
      ["A_GuiControlEvent", "\u542F\u52A8\u5F53\u524D\u7EBF\u7A0B\u7684\u4E8B\u4EF6\u7C7B\u578B. \u5982\u679C\u5F53\u524D\u7EBF\u7A0B\u4E0D\u662F\u7531 GUI \u52A8\u4F5C\u542F\u52A8\u7684, \u5219\u6B64\u53D8\u91CF\u4E3A\u7A7A. \u5426\u5219, \u5B83\u4E3A\u4E0B\u5217\u5B57\u7B26\u4E32\u7684\u5176\u4E2D\u4E00\u4E2A: Normal: \u6B64\u4E8B\u4EF6\u662F\u7531\u5DE6\u952E\u5355\u51FB\u548C\u952E\u51FB(\u2191, \u2192, \u2193, \u2190, Tab, Space, \u5E26\u4E0B\u5212\u7EBF\u7684\u5FEB\u6377\u952E\u7B49) \u89E6\u53D1\u7684. \u6B64\u53D8\u91CF\u7684\u503C\u8FD8\u53EF\u4EE5\u7528\u4E8E\u83DC\u5355\u9879\u548C\u7279\u6B8A\u7684 Gui \u4E8B\u4EF6, \u4F8B\u5982 GuiClose \u548C GuiEscape. DoubleClick: \u6B64\u4E8B\u4EF6\u662F\u7531\u53CC\u51FB\u89E6\u53D1\u7684. \u6CE8\u610F: \u53CC\u51FB\u4E2D\u7684\u9996\u6B21\u70B9\u51FB\u4ECD\u4F1A\u5F15\u8D77 Normal \u4E8B\u4EF6\u9996\u5148\u88AB\u63A5\u6536\u5230. \u6362\u53E5\u8BDD\u8BF4, \u53CC\u51FB\u65F6\u5B50\u7A0B\u5E8F\u4F1A\u8FD0\u884C\u4E24\u6B21: \u4E00\u6B21\u5728\u9996\u6B21\u70B9\u51FB\u65F6, \u518D\u6B21\u662F\u5728\u7B2C\u4E8C\u6B21\u70B9\u51FB\u65F6. RightClick: \u4EC5\u51FA\u73B0\u5728 GuiContextMenu, ListViews \u548C TreeViews."],
      ["A_EventInfo", "\u5305\u542B\u4E0B\u5217\u4E8B\u4EF6\u7684\u989D\u5916\u4FE1\u606F:OnClipboardChange \u6807\u7B7E   \n \u9F20\u6807\u6EDA\u8F6E\u70ED\u952E(WheelDown/Up/Left/Right)  \n OnMessage()  \n RegisterCallback()  \n Regular Expression Callouts  \n GUI \u4E8B\u4EF6, \u5373 GuiContextMenu, GuiDropFiles, ListBox, ListView, TreeView \u548C StatusBar. \u5982\u679C\u4E00\u4E2A\u4E8B\u4EF6\u6CA1\u6709\u989D\u5916\u7684\u4FE1\u606F, \u90A3\u4E48 A_EventInfo \u7684\u503C\u4E3A 0.\u6CE8\u610F: \u4E0E\u7C7B\u4F3C A_ThisHotkey \u8FD9\u6837\u7684\u53D8\u91CF\u4E0D\u540C, \u6BCF\u4E2A\u7EBF\u7A0B\u4F1A\u4E3A A_Gui, A_GuiControl, A_GuiX/Y, A_GuiEvent \u548C A_EventInfo \u4FDD\u5B58\u5B83\u81EA\u5DF1\u672C\u8EAB\u7684\u503C. \u56E0\u6B64, \u5982\u679C\u4E00\u4E2A\u7EBF\u7A0B\u88AB\u53E6\u4E00\u4E2A\u4E2D\u65AD, \u5728\u8FD9\u4E2A\u7EBF\u7A0B\u6062\u590D\u65F6\u5B83\u4ECD\u5C06\u770B\u5230\u8FD9\u4E9B\u53D8\u91CF\u7684\u539F\u6765/\u6B63\u786E\u7684\u503C."],
      ["A_ThisMenuItem", "\u6700\u8FD1\u9009\u62E9\u7684\u81EA\u5B9A\u4E49\u83DC\u5355\u9879\u7684\u540D\u79F0(\u6CA1\u6709\u5219\u4E3A\u7A7A)."],
      ["A_ThisMenu", "A_ThisMenuItem \u6240\u5728\u83DC\u5355\u7684\u540D\u79F0."],
      ["A_ThisMenuItemPos", "\u8868\u793A A_ThisMenuItem \u5728 A_ThisMenu \u5F53\u524D \u4F4D\u7F6E\u7684\u7F16\u53F7. \u83DC\u5355\u4E2D\u9996\u4E2A\u9879\u76EE\u4E3A 1, \u7B2C\u4E8C\u9879\u4E3A 2, \u4F9D\u6B64\u7C7B\u63A8. \u83DC\u5355\u5206\u9694\u7EBF\u4E5F\u8BA1\u7B97\u5728\u5185. \u5982\u679C A_ThisMenuItem \u4E3A\u7A7A\u6216\u5DF2\u4E0D\u5B58\u5728\u4E8E A_ThisMenu \u4E2D, \u5219\u6B64\u53D8\u91CF\u4E3A\u7A7A. \u5982\u679C A_ThisMenu \u5DF2\u4E0D\u5B58\u5728, \u5219\u6B64\u53D8\u91CF\u4E5F\u4E3A\u7A7A."],
      ["A_ThisHotkey", "\u6700\u8FD1\u6267\u884C\u7684\u70ED\u952E\u6216\u975E\u81EA\u52A8\u66FF\u6362\u70ED\u5B57\u4E32\u7684\u6309\u952E\u540D\u79F0(\u5982\u679C\u6CA1\u6709\u5219\u4E3A\u7A7A), \u4F8B\u5982 #z. \u5982\u679C\u5F53\u524D\u7EBF\u7A0B\u88AB\u5176\u4ED6\u70ED\u952E\u4E2D\u65AD, \u90A3\u4E48\u6B64\u53D8\u91CF\u7684\u503C\u4F1A\u53D8\u5316, \u6240\u4EE5\u5982\u679C\u4E4B\u540E\u9700\u8981\u5728\u5B50\u7A0B\u5E8F\u4E2D\u4F7F\u7528\u539F\u6765\u7684\u503C, \u5219\u5FC5\u987B\u9A6C\u4E0A\u628A\u5B83\u590D\u5236\u5230\u53E6\u4E00\u4E2A\u53D8\u91CF\u4E2D.  \n \u9996\u6B21\u521B\u5EFA\u70ED\u952E\u65F6(\u901A\u8FC7 Hotkey \u547D\u4EE4\u6216\u53CC\u5192\u53F7\u6807\u7B7E), \u5176\u952E\u540D\u4EE5\u53CA\u4FEE\u9970\u7B26\u7684\u987A\u5E8F\u6210\u4E3A\u6B64\u70ED\u952E\u7684\u56FA\u5B9A\u540D\u79F0, \u88AB\u6240\u6709\u70ED\u952E variants \u53D8\u91CF\u5171\u4EAB. \u53E6\u8BF7\u53C2\u9605: A_ThisLabel"],
      ["A_PriorHotkey", "\u9664\u4E86\u4FDD\u5B58\u524D\u4E00\u6B21\u70ED\u952E\u7684\u540D\u79F0\u5916, \u5176\u4ED6\u7684\u4E0E\u4E0A\u9762\u76F8\u540C. \u5982\u679C\u6CA1\u6709\u5B83\u4F1A\u4E3A\u7A7A."],
      ["A_PriorKey", "[v1.1.01+]: \u5728\u6700\u8FD1\u6309\u952E\u6309\u4E0B\u6216\u6309\u952E\u91CA\u653E\u524D\u6700\u540E\u6309\u4E0B\u7684\u6309\u952E\u540D\u79F0, \u5982\u679C\u5728\u6309\u952E\u5386\u53F2\u4E2D\u6CA1\u6709\u9002\u7528\u7684\u6309\u952E\u6309\u4E0B\u5219\u4E3A\u7A7A. \u4E0D\u5305\u62EC\u7531 AutoHotkey \u811A\u672C\u751F\u6210\u7684\u6240\u6709\u8F93\u5165. \u8981\u4F7F\u7528\u6B64\u53D8\u91CF, \u9996\u5148\u5FC5\u987B\u5B89\u88C5\u952E\u76D8\u94A9\u5B50\u6216\u9F20\u6807\u94A9\u5B50\u540C\u65F6\u542F\u7528\u6309\u952E\u5386\u53F2."],
      ["A_TimeSinceThisHotkey", "\u4ECE A_ThisHotkey \u6309\u4E0B\u540E\u5230\u73B0\u5728\u7ECF\u8FC7\u7684\u6BEB\u79D2\u6570. \u5982\u679C A_ThisHotkey \u4E3A\u7A7A, \u5219\u6B64\u53D8\u91CF\u7684\u503C\u4E3A -1."],
      ["A_TimeSincePriorHotkey", "\u4ECE A_PriorHotkey \u6309\u4E0B\u540E\u5230\u73B0\u5728\u7ECF\u8FC7\u7684\u6BEB\u79D2\u6570. \u5982\u679C A_PriorHotkey \u4E3A\u7A7A, \u5219\u6B64\u53D8\u91CF\u7684\u503C\u4E3A -1."],
      ["A_EndChar", "\u7528\u6237\u6700\u8FD1\u6309\u4E0B\u7684\u89E6\u53D1\u4E86\u975E\u81EA\u52A8\u66FF\u6362\u70ED\u5B57\u4E32\u7684\u7EC8\u6B62\u7B26. \u5982\u679C\u4E0D\u9700\u8981\u7EC8\u6B62\u7B26(\u7531\u4E8E\u4F7F\u7528\u4E86 * \u9009\u9879), \u90A3\u4E48\u6B64\u53D8\u91CF\u5C06\u4E3A\u7A7A."],
      ["ComSpec", "[v1.0.43.08+] \u6B64\u53D8\u91CF\u7684\u503C\u4E0E\u7CFB\u7EDF\u73AF\u5883\u53D8\u91CF ComSpec \u4E00\u6837(\u4F8B\u5982 C:\\Windows\\system32\\cmd.exe). \u5E38\u4E0E Run/RunWait \u4E00\u8D77\u4F7F\u7528."],
      ["A_ComSpec", "[v1.1.28+] \u6B64\u53D8\u91CF\u7684\u503C\u4E0E\u7CFB\u7EDF\u73AF\u5883\u53D8\u91CF ComSpec \u4E00\u6837(\u4F8B\u5982 C:\\Windows\\system32\\cmd.exe). \u5E38\u4E0E Run/RunWait \u4E00\u8D77\u4F7F\u7528."],
      ["A_Temp", "[v1.0.43.09+] \u5B58\u653E\u4E34\u65F6\u6587\u4EF6\u7684\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0(\u4F8B\u5982 C:\\DOCUME~1\\<UserName>\\LOCALS~1\\Temp). \u5B83\u7684\u503C\u4ECE\u4E0B\u5217\u7684\u5176\u4E2D\u4E00\u4E2A\u4F4D\u7F6E\u83B7\u53D6(\u6309\u987A\u5E8F): 1) \u73AF\u5883\u53D8\u91CF TMP, TEMP \u6216 USERPROFILE; 2) Windows \u76EE\u5F55."],
      ["A_OSType", "\u6B63\u5728\u8FD0\u884C\u7684\u64CD\u4F5C\u7CFB\u7EDF\u7C7B\u578B. \u7531\u4E8E AutoHotkey 1.1 \u4EC5\u652F\u6301\u57FA\u4E8E NT \u7684\u64CD\u4F5C\u7CFB\u7EDF, \u6240\u4EE5\u6B64\u53D8\u91CF\u603B\u662F\u4E3A WIN32_NT. \u65E7\u7248\u672C\u7684 AutoHotkey \u8FD0\u884C\u5728 Windows 95/98/ME \u65F6\u4F1A\u8FD4\u56DE WIN32_WINDOWS."],
      ["A_OSVersion", '\u4E0B\u5217\u5B57\u7B26\u4E32\u4E2D\u7684\u4E00\u4E2A(\u5982\u679C\u5B58\u5728): WIN_7 [\u9700\u8981 v1.0.90+], WIN_8 [\u9700\u8981 v1.1.08+], WIN_8.1 [\u9700\u8981 v1.1.15+], WIN_VISTA, WIN_2003, WIN_XP, WIN_2000.  \n \u5728 AutoHotKey \u7684\u6267\u884C\u6587\u4EF6\u6216\u7F16\u8BD1\u540E\u7684\u811A\u672C\u5C5E\u6027\u91CC\u6DFB\u52A0\u517C\u5BB9\u6027\u8BBE\u7F6E\u4F1A\u8BA9\u64CD\u4F5C\u7CFB\u7EDF\u62A5\u544A\u4E0D\u540C\u7684\u7248\u672C\u4FE1\u606F, \u53EF\u4EE5\u95F4\u63A5\u5F97\u51FA A_OSVersion . [v1.1.20+]: \u5982\u679C\u7CFB\u7EDF\u7248\u672C\u6CA1\u6709\u88AB\u8BC6\u522B\u6210\u4E0A\u8FF0\u7248\u672C, \u4F1A\u8FD4\u56DE\u4E00\u4E2A"major.minor.build"\u5F62\u5F0F\u7684\u5B57\u7B26\u4E32. \u4F8B\u5982, 10.0.14393 \u4E3A Windows 10 build 14393, \u4E5F\u79F0\u4E3A 1607 \u7248.  \n ; \u8FD9\u4E2A\u793A\u4F8B\u5DF2\u8FC7\u65F6\u4E86, \u91CC\u9762\u7684\u8FD9\u4E9B\u64CD\u4F5C\u7CFB\u7EDF\u90FD\u4E0D\u518D\u53D7\u652F\u6301.  \n if A_OSVersion in WIN_NT4,WIN_95,WIN_98,WIN_ME  ; \u6CE8: \u9017\u53F7\u4E24\u8FB9\u6CA1\u6709\u7A7A\u683C.  \n {  \n    MsgBox This script requires Windows 2000/XP or later.  \n    ExitApp  \n }'],
      ["A_Is64bitOS", "[v1.1.08+]: \u5F53\u64CD\u4F5C\u7CFB\u7EDF\u4E3A 64 \u4F4D\u5219\u503C\u4E3A 1(\u771F), \u4E3A 32 \u4F4D\u5219\u4E3A 0(\u5047)."],
      ["A_PtrSize", "[v1.0.90+]: \u5305\u542B\u6307\u9488\u7684\u5927\u5C0F\u503C, \u5355\u4F4D\u4E3A\u5B57\u8282. \u503C\u4E3A 4(32 \u4F4D) \u6216 8(64 \u4F4D), \u53D6\u51B3\u4E8E\u8FD0\u884C\u5F53\u524D\u811A\u672C\u7684\u6267\u884C\u7A0B\u5E8F\u7684\u7C7B\u578B."],
      ["A_Language", "\u5F53\u524D\u7CFB\u7EDF\u7684\u9ED8\u8BA4\u8BED\u8A00, \u503C\u4E3A\u8FD9\u4E9B 4 \u4F4D\u6570\u5B57\u7F16\u7801\u7684\u5176\u4E2D\u4E00\u4E2A."],
      ["A_ComputerName", "\u5728\u7F51\u7EDC\u4E0A\u770B\u5230\u7684\u8BA1\u7B97\u673A\u540D\u79F0."],
      ["A_UserName", "\u8FD0\u884C\u5F53\u524D\u811A\u672C\u7684\u7528\u6237\u7684\u767B\u5F55\u540D."],
      ["A_WinDir", "Windows \u76EE\u5F55. \u4F8B\u5982: C:\\Windows"],
      ["A_ProgramFiles", "Program Files \u76EE\u5F55(\u4F8B\u5982 C:\\Program Files \u6216\u8005 C:\\Program Files (x86)). \u4E00\u822C\u6765\u8BF4\u548C ProgramFiles \u73AF\u5883\u53D8\u91CF\u4E00\u6837."],
      ["ProgramFiles", '**(\u4E0D\u5EFA\u8BAE\u4F7F\u7528\uFF0C\u4F7F\u7528\u540C\u4E49\u7684A_ProgramFiles)**  \nProgram Files \u76EE\u5F55(\u4F8B\u5982 C:\\Program Files \u6216\u8005 C:\\Program Files (x86)). \u4E00\u822C\u6765\u8BF4\u548C ProgramFiles \u73AF\u5883\u53D8\u91CF\u4E00\u6837.  \n \u5728 64 \u4F4D\u7CFB\u7EDF(\u975E 32 \u4F4D\u7CFB\u7EDF) \u4E0A\u9002\u7528:  \n \u5982\u679C\u53EF\u6267\u884C\u6587\u4EF6(EXE) \u4EE5 32 \u4F4D\u811A\u672C\u8FD0\u884C\u7684\u65F6\u5019, A_ProgramFiles \u8FD4\u56DE\u8DEF\u5F84\u4E3A "Program Files (x86)" \u76EE\u5F55.  \n \u5BF9\u4E8E 32 \u4F4D\u7684\u8FDB\u7A0B, \u8FD9\u4E2A ProgramW6432 \u73AF\u5883\u53D8\u91CF\u6307\u5411 64 \u4F4D Program Files \u76EE\u5F55. \u5728 Windows 7 \u548C\u66F4\u9AD8\u7248\u672C\u4E0A, \u5BF9\u4E8E 64 \u4F4D\u7684\u8FDB\u7A0B\u4E5F\u662F\u8FD9\u6837\u8BBE\u7F6E\u7684.  \n \u800C ProgramFiles(x86) \u73AF\u5883\u53D8\u91CF\u6307\u5411 32 \u4F4D Program Files \u76EE\u5F55.  \n [1.0.43.08+]: \u524D\u7F00 A_ \u53EF\u4EE5\u7701\u7565, \u8FD9\u6837\u6709\u52A9\u4E8E\u81EA\u7136\u8FC7\u6E21\u5230 #NoEnv.'],
      ["A_AppData", "[v1.0.43.09+] \u5F53\u524D\u7528\u6237\u7684\u5E94\u7528\u7A0B\u5E8F\u6570\u636E\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0. \u4F8B\u5982: C:\\Documents and Settings\\Username\\Application Data"],
      ["A_AppDataCommon", "[v1.0.43.09+] \u6240\u6709\u7528\u6237\u7684\u5E94\u7528\u7A0B\u5E8F\u6570\u636E\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0."],
      ["A_Desktop", "\u5F53\u524D\u7528\u6237\u7684\u684C\u9762\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0."],
      ["A_DesktopCommon", "\u6240\u6709\u7528\u6237\u7684\u684C\u9762\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0."],
      ["A_StartMenu", "\u5F53\u524D\u7528\u6237\u7684\u5F00\u59CB\u83DC\u5355\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0."],
      ["A_StartMenuCommon", "\u6240\u6709\u7528\u6237\u7684\u5F00\u59CB\u83DC\u5355\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0."],
      ["A_Programs", "\u5F53\u524D\u7528\u6237\u7684\u5F00\u59CB\u83DC\u5355\u4E2D\u7A0B\u5E8F\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0."],
      ["A_ProgramsCommon", "\u6240\u6709\u7528\u6237\u7684\u5F00\u59CB\u83DC\u5355\u4E2D\u7A0B\u5E8F\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0."],
      ["A_Startup", "\u5F53\u524D\u7528\u6237\u7684\u5F00\u59CB\u83DC\u5355\u4E2D\u542F\u52A8\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0."],
      ["A_StartupCommon", "\u6240\u6709\u7528\u6237\u7684\u5F00\u59CB\u83DC\u5355\u4E2D\u542F\u52A8\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0."],
      ["A_MyDocuments", '\u5F53\u524D\u7528\u6237 "\u6211\u7684\u6587\u6863" \u6587\u4EF6\u5939\u7684\u5B8C\u6574\u8DEF\u5F84\u548C\u540D\u79F0. \u4E0E\u5927\u591A\u6570\u7C7B\u4F3C\u53D8\u91CF\u4E0D\u540C, \u5F53\u6B64\u6587\u4EF6\u5939\u4E3A\u9A71\u52A8\u5668\u7684\u6839\u76EE\u5F55\u65F6, \u6B64\u53D8\u91CF\u7684\u503C\u4E0D\u5305\u542B\u6700\u540E\u7684\u53CD\u659C\u6760. \u4F8B\u5982, \u5B83\u7684\u503C\u662F M: \u800C\u4E0D\u662F M:\\'],
      ["A_IsAdmin", "\u5982\u679C\u5F53\u524D\u7528\u6237\u6709\u7BA1\u7406\u5458\u6743\u9650, \u5219\u6B64\u53D8\u91CF\u7684\u503C\u4E3A 1. \u5426\u5219\u4E3A 0.  \n \u8981\u4F7F\u811A\u672C\u4EE5\u7BA1\u7406\u5458\u6743\u9650\u91CD\u65B0\u542F\u52A8(\u6216\u663E\u793A\u63D0\u793A\u5411\u7528\u6237\u8BF7\u6C42\u7BA1\u7406\u5458\u6743\u9650), \u8BF7\u4F7F\u7528 Run *RunAs. \u4F46\u662F\u8BF7\u6CE8\u610F, \u4EE5\u7BA1\u7406\u5458\u6743\u9650\u8FD0\u884C\u811A\u672C\u4F1A\u5BFC\u81F4\u811A\u672C\u542F\u52A8\u7684\u6240\u6709\u7A0B\u5E8F\u4E5F\u4EE5\u7BA1\u7406\u5458\u6743\u9650\u8FD0\u884C. \u5BF9\u4E8E\u53EF\u80FD\u7684\u66FF\u4EE3\u65B9\u6848, \u8BF7\u53C2\u9605\u5E38\u89C1\u95EE\u9898(FAQ)."],
      ["A_ScreenWidth", "\u4E3B\u76D1\u89C6\u5668\u7684\u5BBD\u5EA6\u548C\u9AD8\u5EA6, \u5355\u4F4D\u4E3A\u50CF\u7D20(\u4F8B\u5982 1024 \u548C 768). \u8981\u83B7\u53D6\u591A\u663E\u793A\u5668\u7CFB\u7EDF\u4E2D\u5176\u4ED6\u663E\u793A\u5668\u7684\u5C3A\u5BF8, \u8BF7\u4F7F\u7528 SysGet."],
      ["A_ScreenHeight", "\u4E3B\u76D1\u89C6\u5668\u7684\u5BBD\u5EA6\u548C\u9AD8\u5EA6, \u5355\u4F4D\u4E3A\u50CF\u7D20(\u4F8B\u5982 1024 \u548C 768). \u8981\u83B7\u53D6\u591A\u663E\u793A\u5668\u7CFB\u7EDF\u4E2D\u5176\u4ED6\u663E\u793A\u5668\u7684\u5C3A\u5BF8, \u8BF7\u4F7F\u7528 SysGet.  \n \u8981\u83B7\u53D6\u6574\u4E2A\u684C\u9762(\u5373\u4F7F\u5B83\u6A2A\u8DE8\u591A\u4E2A\u663E\u793A\u5668)\u7684\u5BBD\u5EA6\u548C\u9AD8\u5EA6, \u8BF7\u4F7F\u7528\u4E0B\u9762\u7684\u4F8B\u5B50:\\n SysGet, VirtualWidth, 78  \n SysGet, VirtualHeight, 79  \n \u6B64\u5916, \u4F7F\u7528 SysGet \u53EF\u4EE5\u83B7\u53D6\u663E\u793A\u5668\u7684\u5DE5\u4F5C\u533A\u57DF, \u5B83\u6BD4\u663E\u793A\u5668\u7684\u6574\u4E2A\u533A\u57DF\u5C0F, \u56E0\u4E3A\u5B83\u4E0D\u5305\u62EC\u4EFB\u52A1\u680F\u548C\u5176\u4ED6\u6CE8\u518C\u7684\u684C\u9762\u5DE5\u5177\u680F."],
      ["A_ScreenDPI", "[v1.1.11+] \u5728\u5C4F\u5E55\u5BBD\u5EA6\u4E0A\u6BCF\u903B\u8F91\u5BF8\u7684\u50CF\u7D20\u6570. \u5728\u591A\u663E\u793A\u5668\u7684\u7CFB\u7EDF\u4E2D, \u8FD9\u4E2A\u503C\u5BF9\u4E8E\u6240\u6709\u7684\u663E\u793A\u5668\u90FD\u662F\u4E00\u6837\u7684. \u5728\u5927\u591A\u6570\u7CFB\u7EDF\u4E2D\u8BE5\u503C\u4E3A 96; \u5B83\u53D6\u51B3\u4E8E\u7CFB\u7EDF\u6587\u672C\u5927\u5C0F(DPI)\u8BBE\u7F6E. \u53E6\u8BF7\u53C2\u9605 Gui -DPIScale."],
      ["A_IPAddress1", "\u8BA1\u7B97\u673A\u4E2D\u524D 4 \u4E2A\u7F51\u5361\u7684 IP \u5730\u5740."],
      ["A_IPAddress2", "\u8BA1\u7B97\u673A\u4E2D\u524D 4 \u4E2A\u7F51\u5361\u7684 IP \u5730\u5740."],
      ["A_IPAddress3", "\u8BA1\u7B97\u673A\u4E2D\u524D 4 \u4E2A\u7F51\u5361\u7684 IP \u5730\u5740."],
      ["A_IPAddress4", "\u8BA1\u7B97\u673A\u4E2D\u524D 4 \u4E2A\u7F51\u5361\u7684 IP \u5730\u5740."],
      ["A_Cursor", "\u5F53\u524D\u663E\u793A\u7684\u9F20\u6807\u5149\u6807\u7C7B\u578B. \u5176\u503C\u4E3A\u4E0B\u5217\u5355\u8BCD\u7684\u5176\u4E2D\u4E00\u4E2A: AppStarting(\u7A0B\u5E8F\u542F\u52A8, \u540E\u53F0\u8FD0\u884C--\u7BAD\u5934+\u7B49\u5F85), Arrow(\u7BAD\u5934, \u6B63\u5E38\u9009\u62E9--\u6807\u51C6\u5149\u6807), Cross(\u5341\u5B57, \u7CBE\u786E\u9009\u62E9), Help(\u5E2E\u52A9, \u5E2E\u52A9\u9009\u62E9--\u7BAD\u5934+\u95EE\u53F7), IBeam(\u5DE5\u5B57\u5149\u6807, \u6587\u672C\u9009\u62E9--\u8F93\u5165), Icon, No(No, \u4E0D\u53EF\u7528--\u5706\u5708\u52A0\u53CD\u659C\u6760), Size, SizeAll(\u6240\u6709\u5C3A\u5BF8,\u79FB\u52A8--\u56DB\u5411\u7BAD\u5934), SizeNESW(\u4E1C\u5357\u548C\u897F\u5317\u5C3A\u5BF8, \u6CBF\u5BF9\u89D2\u7EBF\u8C03\u6574 2--\u53CC\u7BAD\u5934\u6307\u5411\u4E1C\u5357\u548C\u897F\u5317), SizeNS(\u5357\u5317\u5C3A\u5BF8, \u5782\u76F4\u8C03\u6574--\u53CC\u7BAD\u5934\u6307\u5411\u5357\u5317), SizeNWSE(\u897F\u5317\u548C\u4E1C\u5357\u5C3A\u5BF8, \u6CBF\u5BF9\u89D2\u7EBF\u8C03\u6574 1--\u53CC\u7BAD\u5934\u6307\u5411\u897F\u5317\u548C\u4E1C\u5357), SizeWE(\u4E1C\u897F\u5C3A\u5BF8, \u6C34\u5E73\u8C03\u6574--\u53CC\u7BAD\u5934\u6307\u5411\u4E1C\u897F), UpArrow(\u5411\u4E0A\u7BAD\u5934, \u5019\u9009--\u6307\u5411\u4E0A\u7684\u7BAD\u5934), Wait(\u7B49\u5F85, \u5FD9--\u6C99\u6F0F\u6216\u5706\u5708), Unknown(\u672A\u77E5). \u4E0E size \u6307\u9488\u7C7B\u578B\u4E00\u8D77\u7684\u9996\u5B57\u6BCD\u8868\u793A\u65B9\u5411, \u4F8B\u5982 NESW = NorthEast(\u4E1C\u5317)+SouthWest(\u897F\u5357). \u624B\u578B\u6307\u9488(\u70B9\u51FB\u548C\u6293\u53D6) \u5C5E\u4E8E Unknown \u7C7B\u522B."],
      ["A_CaretX", "\u5F53\u524D\u5149\u6807(\u6587\u672C\u63D2\u5165\u70B9) \u7684 X \u548C Y \u5750\u6807. \u5982\u679C\u6CA1\u6709\u4F7F\u7528 CoordMode \u4F7F\u5F97\u5750\u6807\u76F8\u5BF9\u4E8E\u6574\u4E2A\u5C4F\u5E55, \u9ED8\u8BA4\u5750\u6807\u76F8\u5BF9\u4E8E\u6D3B\u52A8\u7A97\u53E3. \u5982\u679C\u6CA1\u6709\u6D3B\u52A8\u7A97\u53E3\u6216\u65E0\u6CD5\u786E\u5B9A\u6587\u672C\u63D2\u5165\u70B9\u7684\u4F4D\u7F6E, \u5219\u8FD9\u4E24\u4E2A\u53D8\u91CF\u4E3A\u7A7A.  \n \u4E0B\u9762\u8FD9\u4E2A\u811A\u672C\u53EF\u4EE5\u8BA9\u60A8\u5728\u56DB\u5904\u79FB\u52A8\u6587\u672C\u63D2\u5165\u70B9\u65F6, \u67E5\u770B\u663E\u793A\u5728\u81EA\u52A8\u66F4\u65B0\u5DE5\u5177\u63D0\u793A\u4E0A\u7684\u5F53\u524D\u4F4D\u7F6E. \u6CE8\u610F\u5728\u67D0\u4E9B\u7A97\u53E3(\u4F8B\u5982\u67D0\u4E9B\u7248\u672C\u7684 MS Word) \u4F1A\u4E0D\u7BA1\u6587\u672C\u63D2\u5165\u70B9\u7684\u5B9E\u9645\u4F4D\u7F6E\u5982\u4F55\u90FD\u62A5\u544A\u540C\u6837\u7684\u4F4D\u7F6E. #Persistent  \n SetTimer, WatchCaret, 100  \n return  \n WatchCaret:  \n ToolTip, X%A_CaretX% Y%A_CaretY%, A_CaretX, A_CaretY - 20  \n return"],
      ["A_CaretY", "\u5F53\u524D\u5149\u6807(\u6587\u672C\u63D2\u5165\u70B9) \u7684 X \u548C Y \u5750\u6807. \u5982\u679C\u6CA1\u6709\u4F7F\u7528 CoordMode \u4F7F\u5F97\u5750\u6807\u76F8\u5BF9\u4E8E\u6574\u4E2A\u5C4F\u5E55, \u9ED8\u8BA4\u5750\u6807\u76F8\u5BF9\u4E8E\u6D3B\u52A8\u7A97\u53E3. \u5982\u679C\u6CA1\u6709\u6D3B\u52A8\u7A97\u53E3\u6216\u65E0\u6CD5\u786E\u5B9A\u6587\u672C\u63D2\u5165\u70B9\u7684\u4F4D\u7F6E, \u5219\u8FD9\u4E24\u4E2A\u53D8\u91CF\u4E3A\u7A7A.  \n  \u4E0B\u9762\u8FD9\u4E2A\u811A\u672C\u53EF\u4EE5\u8BA9\u60A8\u5728\u56DB\u5904\u79FB\u52A8\u6587\u672C\u63D2\u5165\u70B9\u65F6, \u67E5\u770B\u663E\u793A\u5728\u81EA\u52A8\u66F4\u65B0\u5DE5\u5177\u63D0\u793A\u4E0A\u7684\u5F53\u524D\u4F4D\u7F6E. \u6CE8\u610F\u5728\u67D0\u4E9B\u7A97\u53E3(\u4F8B\u5982\u67D0\u4E9B\u7248\u672C\u7684 MS Word) \u4F1A\u4E0D\u7BA1\u6587\u672C\u63D2\u5165\u70B9\u7684\u5B9E\u9645\u4F4D\u7F6E\u5982\u4F55\u90FD\u62A5\u544A\u540C\u6837\u7684\u4F4D\u7F6E. #Persistent  \n SetTimer, WatchCaret, 100  \n return  \n WatchCaret:  \n ToolTip, X%A_CaretX% Y%A_CaretY%, A_CaretX, A_CaretY - 20  \n return"],
      ["Clipboard", "\u53EF\u8BFB\u53D6/\u5199\u5165: \u64CD\u4F5C\u7CFB\u7EDF\u526A\u8D34\u677F\u7684\u5185\u5BB9, \u53EF\u4EE5\u4ECE\u4E2D\u8BFB\u53D6\u6216\u5199\u5165\u5185\u5BB9. \u8BF7\u53C2\u9605\u526A\u8D34\u677F\u7AE0\u8282."],
      ["ClipboardAll", "\u53EF\u8BFB\u53D6/\u5199\u5165: \u526A\u8D34\u677F\u4E2D\u7684\u5B8C\u6574\u5185\u5BB9(\u5305\u542B\u683C\u5F0F\u548C\u6587\u672C). \u8BF7\u53C2\u9605 ClipboardAll."],
      ["ErrorLevel", "\u53EF\u8BFB\u53D6/\u5199\u5165: \u8BF7\u53C2\u9605 ErrorLevel."],
      ["A_LastError", "\u64CD\u4F5C\u7CFB\u7EDF GetLastError() \u51FD\u6570\u6216\u6700\u8FD1 COM \u5BF9\u8C61\u8C03\u7528\u8FD4\u56DE\u7684\u7ED3\u679C. \u8981\u4E86\u89E3\u8BE6\u60C5, \u8BF7\u53C2\u9605 DllCall() \u548C Run/RunWait."],
      ["A_Index", "\u5F53\u524D\u5FAA\u73AF\u91CD\u590D\u7684\u6B21\u6570(64 \u4F4D\u6574\u6570). \u4F8B\u5982, \u5F53\u811A\u672C\u9996\u6B21\u6267\u884C\u6B64\u5FAA\u73AF\u4F53\u65F6, \u6B64\u53D8\u91CF\u7684\u503C\u4E3A 1. \u8981\u4E86\u89E3\u8BE6\u60C5\u8BF7\u53C2\u9605 Loop \u6216 While \u5FAA\u73AF."],
      ["A_LoopFileName", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u5F53\u524D\u83B7\u53D6\u7684\u6587\u4EF6\u6216\u6587\u4EF6\u5939\u7684\u540D\u79F0(\u4E0D\u542B\u8DEF\u5F84)."],
      ["A_LoopFileExt", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u5F53\u524D\u6587\u4EF6\u7684\u6269\u5C55\u540D(\u4F8B\u5982 TXT, DOC \u6216 EXE). \u4E0D\u542B\u53E5\u70B9(.)."],
      ["A_LoopFileFullPath", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u5F53\u524D\u83B7\u53D6\u7684\u6587\u4EF6/\u6587\u4EF6\u5939\u7684\u8DEF\u5F84\u548C\u540D\u79F0. \u5982\u679C FilePattern \u5305\u542B\u76F8\u5BF9\u8DEF\u5F84\u800C\u4E0D\u662F\u7EDD\u5BF9\u8DEF\u5F84, \u90A3\u4E48\u8FD9\u91CC\u7684\u8DEF\u5F84\u4E5F\u662F\u76F8\u5BF9\u8DEF\u5F84. \u6B64\u5916, FilePattern \u4E2D\u7684\u4EFB\u4F55\u77ED(8.3) \u6587\u4EF6\u5939\u540D\u79F0\u4ECD\u5C06\u4E3A\u77ED\u540D\u79F0(\u8BF7\u53C2\u9605\u4E0B\u4E00\u9879\u6765\u83B7\u53D6\u957F\u540D\u79F0).  \n A_LoopFilePath \u53EF\u4EE5\u5728 [v1.1.28+] \u4E2D\u4F7F\u7528, \u4F5C\u4E3A A_LoopFileFullPath \u7684\u522B\u540D, A_LoopFileFullPath \u662F\u4E00\u4E2A\u9519\u8BEF\u7684\u7528\u8BCD."],
      ["A_LoopFilePath", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u5F53\u524D\u83B7\u53D6\u7684\u6587\u4EF6/\u6587\u4EF6\u5939\u7684\u8DEF\u5F84\u548C\u540D\u79F0. \u5982\u679C FilePattern \u5305\u542B\u76F8\u5BF9\u8DEF\u5F84\u800C\u4E0D\u662F\u7EDD\u5BF9\u8DEF\u5F84, \u90A3\u4E48\u8FD9\u91CC\u7684\u8DEF\u5F84\u4E5F\u662F\u76F8\u5BF9\u8DEF\u5F84. \u6B64\u5916, FilePattern \u4E2D\u7684\u4EFB\u4F55\u77ED(8.3) \u6587\u4EF6\u5939\u540D\u79F0\u4ECD\u5C06\u4E3A\u77ED\u540D\u79F0(\u8BF7\u53C2\u9605\u4E0B\u4E00\u9879\u6765\u83B7\u53D6\u957F\u540D\u79F0).  \n A_LoopFilePath \u53EF\u4EE5\u5728 [v1.1.28+] \u4E2D\u4F7F\u7528, \u4F5C\u4E3A A_LoopFileFullPath \u7684\u522B\u540D, A_LoopFileFullPath \u662F\u4E00\u4E2A\u9519\u8BEF\u7684\u7528\u8BCD."],
      ["A_LoopFileLongPath", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u6B64\u53D8\u91CF\u4E0E A_LoopFileFullPath \u6709\u4EE5\u4E0B\u4E0D\u540C\u4E4B\u5904: 1) \u4E0D\u8BBA FilePattern \u5305\u542B\u7684\u662F\u5426\u4E3A\u76F8\u5BF9\u8DEF\u5F84, \u5B83\u603B\u662F\u5305\u542B\u6587\u4EF6\u7684\u7EDD\u5BF9/\u5B8C\u6574\u8DEF\u5F84; 2) \u5728 FilePattern \u4E2D\u7684\u4EFB\u4F55\u77ED(8.3) \u6587\u4EF6\u5939\u540D\u79F0\u88AB\u8F6C\u6362\u6210\u5B83\u4EEC\u7684\u957F\u540D\u79F0; 3) \u5728 FilePattern \u4E2D\u7684\u5B57\u7B26\u88AB\u8F6C\u6362\u6210\u4E0E\u6587\u4EF6\u7CFB\u7EDF\u4E2D\u5B58\u50A8\u7684\u540D\u79F0\u4E00\u81F4\u7684\u5927\u5C0F\u5199\u5F62\u5F0F. \u628A\u6587\u4EF6\u540D\u8F6C\u6362\u4E3A\u8D44\u6E90\u7BA1\u7406\u5668\u4E2D\u663E\u793A\u7684\u51C6\u786E\u8DEF\u5F84\u540D\u79F0\u65F6\u8FD9\u5F88\u6709\u7528, \u4F8B\u5982\u4F5C\u4E3A\u547D\u4EE4\u884C\u53C2\u6570\u4F20\u9012\u7ED9\u811A\u672C\u7684\u90A3\u4E9B."],
      ["A_LoopFileShortPath", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u5F53\u524D\u83B7\u53D6\u7684\u6587\u4EF6/\u6587\u4EF6\u5939\u7684 8.3 \u77ED\u8DEF\u5F84\u548C\u540D\u79F0. \u4F8B\u5982: C:\\MYDOCU~1\\ADDRES~1.txt. \u5982\u679C FilePattern \u5305\u542B\u76F8\u5BF9\u8DEF\u5F84\u800C\u4E0D\u662F\u7EDD\u5BF9\u8DEF\u5F84, \u90A3\u4E48\u8FD9\u91CC\u7684\u8DEF\u5F84\u4E5F\u662F\u76F8\u5BF9\u8DEF\u5F84. `n \u8981\u83B7\u53D6\u5355\u4E2A\u6587\u4EF6\u6216\u6587\u4EF6\u5939\u7684\u5B8C\u6574\u7684 8.3 \u8DEF\u5F84\u548C\u540D\u79F0, \u50CF\u8FD9\u4E2A\u4F8B\u5B50\u90A3\u6837\u5728 FilePattern \u4E2D\u6307\u5B9A\u5176\u540D\u79F0:  \n Loop, C:\\My Documents\\Address List.txt  \n    ShortPathName = %A_LoopFileShortPath%  \n \u6CE8\u610F: \u5982\u679C\u6587\u4EF6\u6CA1\u6709\u77ED\u540D\u79F0, \u90A3\u4E48\u6B64\u53D8\u91CF\u5C06\u4E3A \u7A7A, \u8FD9\u79CD\u60C5\u51B5\u4F1A\u53D1\u751F\u5728\u6CE8\u518C\u8868\u4E2D\u8BBE\u7F6E\u4E86 NtfsDisable8dot3NameCreation \u7684\u7CFB\u7EDF\u4E0A. \u5982\u679C FilePattern \u5305\u542B\u76F8\u5BF9\u8DEF\u5F84\u4E14\u5FAA\u73AF\u4F53\u4E2D\u4F7F\u7528 SetWorkingDir \u4ECE\u5F53\u524D\u5FAA\u73AF\u7684\u6709\u6548\u7684\u5DE5\u4F5C\u76EE\u5F55\u4E2D\u5207\u6362\u51FA\u6765, \u90A3\u4E48\u5B83\u4E5F\u5C06\u4E3A\u7A7A."],
      ["A_LoopFileShortName", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. 8.3 \u77ED\u540D\u79F0\u6216\u6587\u4EF6\u7684\u5907\u7528\u540D\u79F0. \u5982\u679C\u6587\u4EF6\u6CA1\u6709\u6B64\u540D\u79F0(\u7531\u4E8E\u957F\u540D\u79F0\u6BD4 8.3 \u5F62\u5F0F\u66F4\u77ED\u6216\u4E5F\u8BB8\u56E0\u4E3A\u5728 NTFS \u6587\u4EF6\u7CFB\u7EDF\u4E0A\u7981\u6B62\u751F\u6210\u77ED\u540D\u79F0), \u5C06\u83B7\u53D6 A_LoopFileName \u4F5C\u4E3A\u4EE3\u66FF."],
      ["A_LoopFileDir", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. A_LoopFileName \u6240\u5728\u76EE\u5F55\u7684\u8DEF\u5F84. \u5982\u679C FilePattern \u5305\u542B\u76F8\u5BF9\u8DEF\u5F84\u800C\u4E0D\u662F\u7EDD\u5BF9\u8DEF\u5F84, \u90A3\u4E48\u8FD9\u91CC\u7684\u8DEF\u5F84\u4E5F\u662F\u76F8\u5BF9\u8DEF\u5F84. \u6839\u76EE\u5F55\u5C06\u4E0D\u5305\u542B\u672B\u5C3E\u7684\u53CD\u659C\u6760. \u4F8B\u5982: C:"],
      ["A_LoopFileTimeModified", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u6587\u4EF6\u7684\u4E0A\u6B21\u4FEE\u6539\u65F6\u95F4. \u683C\u5F0F\u4E3A YYYYMMDDHH24MISS."],
      ["A_LoopFileTimeCreated", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u6587\u4EF6\u7684\u521B\u5EFA\u65F6\u95F4. \u683C\u5F0F\u4E3A YYYYMMDDHH24MISS."],
      ["A_LoopFileTimeAccessed", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u6587\u4EF6\u7684\u4E0A\u6B21\u8BBF\u95EE\u65F6\u95F4. \u683C\u5F0F\u4E3A YYYYMMDDHH24MISS."],
      ["A_LoopFileAttrib", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u5F53\u524D\u83B7\u53D6\u7684\u6587\u4EF6\u7684\u5C5E\u6027."],
      ["A_LoopFileSize", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u4EE5\u5B57\u8282\u4E3A\u5355\u4F4D\u7684\u5F53\u524D\u83B7\u53D6\u7684\u6587\u4EF6\u7684\u5927\u5C0F. \u540C\u6837\u652F\u6301\u5927\u4E8E 4 GB \u7684\u6587\u4EF6."],
      ["A_LoopFileSizeKB", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u4EE5 KB \u4E3A\u5355\u4F4D\u7684\u5F53\u524D\u83B7\u53D6\u7684\u6587\u4EF6\u7684\u5927\u5C0F, \u5411\u4E0B\u53D6\u6574\u5230\u6700\u8FD1\u7684\u6574\u6570."],
      ["A_LoopFileSizeMB", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6587\u4EF6\u5FAA\u73AF\u4E2D\u6709\u6548. \u4EE5 MB \u4E3A\u5355\u4F4D\u7684\u5F53\u524D\u83B7\u53D6\u7684\u6587\u4EF6\u7684\u5927\u5C0F, \u5411\u4E0B\u53D6\u6574\u5230\u6700\u8FD1\u7684\u6574\u6570."],
      ["A_LoopRegName", '\u6B64\u53D8\u91CF\u4EC5\u5728\u6CE8\u518C\u8868\u5FAA\u73AFLoop, Reg\u4E2D\u6709\u6548. \u5F53\u524D\u83B7\u53D6\u9879\u7684\u540D\u79F0, \u53EF\u4EE5\u662F\u503C\u540D\u6216\u5B50\u952E\u540D. \u5728 Windows \u6CE8\u518C\u8868\u7F16\u8F91\u5668\u4E2D, \u503C\u540D\u4E3A "(\u9ED8\u8BA4)" \u7684\u9879\u5982\u679C\u5206\u914D\u4E86\u503C, \u90A3\u4E48\u4E5F\u4F1A\u83B7\u53D6\u5B83\u7684\u503C, \u4E0D\u8FC7\u6B64\u65F6\u76F8\u5E94\u7684 A_LoopRegName \u5C06\u662F\u7A7A\u7684.'],
      ["A_LoopRegType", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6CE8\u518C\u8868\u5FAA\u73AFLoop, Reg\u4E2D\u6709\u6548. \u5F53\u524D\u83B7\u53D6\u9879\u7684\u7C7B\u578B, \u53EF\u4EE5\u662F\u4E0B\u5217\u5355\u8BCD\u7684\u5176\u4E2D\u4E00\u4E2A: KEY(\u5373\u5F53\u524D\u83B7\u53D6\u9879\u4E3A\u5B50\u952E\u800C\u4E0D\u662F\u503C), REG_SZ, REG_EXPAND_SZ, REG_MULTI_SZ, REG_DWORD, REG_QWORD, REG_BINARY, REG_LINK, REG_RESOURCE_LIST, REG_FULL_RESOURCE_DESCRIPTOR, REG_RESOURCE_REQUIREMENTS_LIST, REG_DWORD_BIG_ENDIAN(\u5728\u5927\u591A\u6570 Windows \u786C\u4EF6\u4E0A\u76F8\u5F53\u7F55\u89C1). \u5982\u679C\u5F53\u524D\u83B7\u53D6\u9879\u4E3A\u672A\u77E5\u7C7B\u578B, \u90A3\u4E48\u6B64\u53D8\u91CF\u5C06\u4E3A\u7A7A."],
      ["A_LoopRegKey", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6CE8\u518C\u8868\u5FAA\u73AFLoop, Reg\u4E2D\u6709\u6548. \u6B63\u5728\u8BBF\u95EE\u7684\u6839\u952E\u540D(HKEY_LOCAL_MACHINE, HKEY_USERS, HKEY_CURRENT_USER, HKEY_CLASSES_ROOT \u6216 HKEY_CURRENT_CONFIG). \u8BBF\u95EE\u8FDC\u7A0B\u6CE8\u518C\u8868\u65F6, \u6B64\u53D8\u91CF\u7684\u503C\u5C06\u4E0D\u5305\u542B\u8BA1\u7B97\u673A\u540D."],
      ["A_LoopRegSubKey", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6CE8\u518C\u8868\u5FAA\u73AFLoop, Reg\u4E2D\u6709\u6548. \u5F53\u524D\u5B50\u952E\u540D. \u5982\u679C\u6CA1\u6709\u4F7F\u7528 Recurse \u53C2\u6570\u4EE5\u9012\u5F52\u67E5\u8BE2\u5176\u4ED6\u5B50\u952E\u65F6, \u6B64\u53D8\u91CF\u7684\u503C\u4E0E Key \u53C2\u6570\u76F8\u540C. \u5728\u9012\u5F52\u67E5\u8BE2\u65F6, \u6B64\u53D8\u91CF\u7684\u503C\u5C06\u4E3A\u5F53\u524D\u83B7\u53D6\u9879\u7684\u5B8C\u6574\u8DEF\u5F84, \u5176\u4E2D\u4E0D\u5305\u542B\u6839\u952E. \u4F8B\u5982: Software\\SomeApplication\\My SubKey"],
      ["A_LoopRegTimeModified", "\u6B64\u53D8\u91CF\u4EC5\u5728\u6CE8\u518C\u8868\u5FAA\u73AFLoop, Reg\u4E2D\u6709\u6548. \u5F53\u524D\u5B50\u952E\u6216\u5176\u4E2D\u4EFB\u4F55\u4E00\u4E2A\u503C\u7684\u4E0A\u6B21\u4FEE\u6539\u65F6\u95F4. \u683C\u5F0F\u4E3A YYYYMMDDHH24MISS. \u5F53\u524D\u83B7\u53D6\u9879\u4E0D\u662F\u5B50\u952E(\u5373 A_LoopRegType \u4E0D\u662F\u5355\u8BCD KEY) \u65F6,\u6B64\u53D8\u91CF\u5C06\u4E3A\u7A7A."],
      ["A_LoopReadLine", "\u8BF7\u53C2\u9605\u6587\u4EF6\u8BFB\u53D6\u5FAA\u73AFloop, files. \u5F53\u524D\u83B7\u53D6\u7684\u6587\u4EF6\u6216\u6587\u4EF6\u5939\u7684\u540D\u79F0(\u4E0D\u542B\u8DEF\u5F84)."],
      ["A_LoopField", "\u8BF7\u53C2\u9605\u89E3\u6790\u5FAA\u73AFLoop, Parse. \u5B83\u5305\u542B\u4E86 InputVar \u4E2D\u5F53\u524D\u5B50\u5B57\u7B26\u4E32(\u7247\u6BB5) \u7684\u5185\u5BB9. \u5982\u679C\u4E00\u4E2A\u5185\u5C42\u89E3\u6790\u5FAA\u73AF\u5305\u542B\u5728\u4E00\u4E2A\u5916\u5C42\u89E3\u6790\u5FAA\u73AF\u4E2D, \u5219\u6700\u5185\u5C42\u5FAA\u73AF\u7684\u7247\u6BB5\u5C06\u5177\u6709\u4F18\u5148\u6743."],
      ["true", "\u5E03\u5C14\u503C true, \u5185\u7F6E\u53D8\u91CF\u503C\u4E3A 1"],
      ["false", "\u5E03\u5C14\u503C false, \u5185\u7F6E\u53D8\u91CF\u503C\u4E3A 0"]
    ];
    exports2.builtin_function = [
      {
        "name": "Abs",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ACos",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Asc",
        "params": [
          {
            "name": "String",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ASin",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ATan",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Ceil",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Chr",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Cos",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "DllCall",
        "params": [
          {
            "name": "DllFile\\Function",
            "isOptional": false
          },
          {
            "name": "Type1",
            "isOptional": true
          },
          {
            "name": "Arg1",
            "isOptional": true
          },
          {
            "name": "Type2",
            "isOptional": true
          },
          {
            "name": "Arg2",
            "isOptional": true
          },
          {
            "name": "...",
            "isOptional": true
          },
          {
            "name": '"Cdecl ReturnType"',
            "isOptional": true
          }
        ]
      },
      {
        "name": "Exception",
        "params": [
          {
            "name": "Message",
            "isOptional": false
          },
          {
            "name": "What",
            "isOptional": true
          },
          {
            "name": "Extra",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Exp",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "FileExist",
        "params": [
          {
            "name": "FilePattern",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Floor",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "GetKeyState",
        "params": [
          {
            "name": "KeyName",
            "isOptional": false
          },
          {
            "name": '"P" or "T"',
            "isOptional": true
          }
        ]
      },
      {
        "name": "IL_Add",
        "params": [
          {
            "name": "ImageListID",
            "isOptional": false
          },
          {
            "name": "Filename",
            "isOptional": false
          },
          {
            "name": "IconNumber",
            "isOptional": true
          },
          {
            "name": "ResizeNonIcon?",
            "isOptional": true
          }
        ]
      },
      {
        "name": "IL_Create",
        "params": [
          {
            "name": "nitialCount",
            "isOptional": true
          },
          {
            "name": "GrowCount",
            "isOptional": true
          },
          {
            "name": "LargeIcons?",
            "isOptional": true
          }
        ]
      },
      {
        "name": "IL_Destroy",
        "params": [
          {
            "name": "ImageListID",
            "isOptional": false
          }
        ]
      },
      {
        "name": "InStr",
        "params": [
          {
            "name": "Haystack",
            "isOptional": false
          },
          {
            "name": "Needle",
            "isOptional": false
          },
          {
            "name": "CaseSensitive?",
            "isOptional": true
          },
          {
            "name": "StartingPos",
            "isOptional": true
          },
          {
            "name": "Occurrence",
            "isOptional": true
          }
        ]
      },
      {
        "name": "IsFunc",
        "params": [
          {
            "name": "FunctionName",
            "isOptional": false
          }
        ]
      },
      {
        "name": "IsLabel",
        "params": [
          {
            "name": "LabelName",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Ln",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Log",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "LV_Add",
        "params": [
          {
            "name": "ptions",
            "isOptional": true
          },
          {
            "name": "Col*",
            "isOptional": true
          }
        ]
      },
      {
        "name": "LV_Delete",
        "params": [
          {
            "name": "owNumber",
            "isOptional": true
          }
        ]
      },
      {
        "name": "LV_DeleteCol",
        "params": [
          {
            "name": "ColumnNumber",
            "isOptional": false
          }
        ]
      },
      {
        "name": "LV_GetCount",
        "params": [
          {
            "name": '"S|C"',
            "isOptional": true
          }
        ]
      },
      {
        "name": "LV_GetNext",
        "params": [
          {
            "name": "tartingRowNumber",
            "isOptional": true
          },
          {
            "name": '"C|F"',
            "isOptional": true
          }
        ]
      },
      {
        "name": "LV_GetText",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "RowNumber",
            "isOptional": false
          },
          {
            "name": "ColumnNumber",
            "isOptional": true
          }
        ]
      },
      {
        "name": "LV_Insert",
        "params": [
          {
            "name": "RowNumber",
            "isOptional": false
          },
          {
            "name": "Options",
            "isOptional": true
          },
          {
            "name": "Col*",
            "isOptional": true
          }
        ]
      },
      {
        "name": "LV_InsertCol",
        "params": [
          {
            "name": "ColumnNumber",
            "isOptional": false
          },
          {
            "name": "Options",
            "isOptional": true
          },
          {
            "name": "ColumnTitle",
            "isOptional": true
          }
        ]
      },
      {
        "name": "LV_Modify",
        "params": [
          {
            "name": "RowNumber",
            "isOptional": false
          },
          {
            "name": "Options",
            "isOptional": false
          },
          {
            "name": "NewCol1*",
            "isOptional": true
          }
        ]
      },
      {
        "name": "LV_ModifyCol",
        "params": [
          {
            "name": "olumnNumber",
            "isOptional": true
          },
          {
            "name": "Options",
            "isOptional": true
          },
          {
            "name": "ColumnTitle",
            "isOptional": true
          }
        ]
      },
      {
        "name": "LV_SetImageList",
        "params": [
          {
            "name": "ImageListID",
            "isOptional": false
          },
          {
            "name": "0|1|2",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Max",
        "params": [
          {
            "name": "Number*",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Min",
        "params": [
          {
            "name": "Number*",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Mod",
        "params": [
          {
            "name": "Dividend",
            "isOptional": false
          },
          {
            "name": "Divisor",
            "isOptional": false
          }
        ]
      },
      {
        "name": "NumGet",
        "params": [
          {
            "name": "VarOrAddress",
            "isOptional": false
          },
          {
            "name": "Offset",
            "isOptional": true,
            "defaultVal": "0"
          },
          {
            "name": "Type",
            "isOptional": true,
            "defaultVal": '"UPtr"'
          }
        ]
      },
      {
        "name": "NumPut",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          },
          {
            "name": "VarOrAddress",
            "isOptional": false
          },
          {
            "name": "Offset",
            "isOptional": true,
            "defaultVal": "0"
          },
          {
            "name": "Type",
            "isOptional": true,
            "defaultVal": '"UPtr"'
          }
        ]
      },
      {
        "name": "OnMessage",
        "params": [
          {
            "name": "MsgNumber",
            "isOptional": false
          },
          {
            "name": "FunctionName",
            "isOptional": true
          }
        ]
      },
      {
        "name": "RegExMatch",
        "params": [
          {
            "name": "Haystack",
            "isOptional": false
          },
          {
            "name": "NeedleRegEx",
            "isOptional": false
          },
          {
            "name": "UnquotedOutputVar",
            "isOptional": true,
            "defaultVal": '""'
          },
          {
            "name": "StartingPos",
            "isOptional": true,
            "defaultVal": "1"
          }
        ]
      },
      {
        "name": "RegExReplace",
        "params": [
          {
            "name": "Haystack",
            "isOptional": false
          },
          {
            "name": "NeedleRegEx",
            "isOptional": false
          },
          {
            "name": "Replacement",
            "isOptional": true,
            "defaultVal": '""'
          },
          {
            "name": "OutputVarCount",
            "isOptional": true,
            "defaultVal": '""'
          },
          {
            "name": "Limit",
            "isOptional": true,
            "defaultVal": "-1"
          },
          {
            "name": "StartingPos",
            "isOptional": true,
            "defaultVal": "1"
          }
        ]
      },
      {
        "name": "RegisterCallback",
        "params": [
          {
            "name": "FunctionName",
            "isOptional": false
          },
          {
            "name": "Options",
            "isOptional": true,
            "defaultVal": '""'
          },
          {
            "name": "ParamCount",
            "isOptional": true,
            "defaultVal": "FormalCount"
          },
          {
            "name": "EventInfo",
            "isOptional": true,
            "defaultVal": "Address"
          }
        ]
      },
      {
        "name": "Round",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          },
          {
            "name": "Places",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SB_SetIcon",
        "params": [
          {
            "name": "Filename",
            "isOptional": false
          },
          {
            "name": "IconNumber",
            "isOptional": true
          },
          {
            "name": "PartNumber",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SB_SetParts",
        "params": [
          {
            "name": "idth*",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SB_SetText",
        "params": [
          {
            "name": "NewText",
            "isOptional": false
          },
          {
            "name": "PartNumber",
            "isOptional": true
          },
          {
            "name": "Style",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Sin",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Sqrt",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "StrLen",
        "params": [
          {
            "name": "String",
            "isOptional": false
          }
        ]
      },
      {
        "name": "StrReplace",
        "params": [
          {
            "name": "Haystack",
            "isOptional": false
          },
          {
            "name": "Needle",
            "isOptional": false
          },
          {
            "name": "ReplaceText",
            "isOptional": true
          },
          {
            "name": "OutputVarCount",
            "isOptional": true,
            "defaultVal": "0"
          },
          {
            "name": "Limit",
            "isOptional": true,
            "defaultVal": "-1"
          }
        ]
      },
      {
        "name": "SubStr",
        "params": [
          {
            "name": "String",
            "isOptional": false
          },
          {
            "name": "StartingPos",
            "isOptional": false
          },
          {
            "name": "Length",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StrSplit",
        "params": [
          {
            "name": "String",
            "isOptional": false
          },
          {
            "name": "Delimiters",
            "isOptional": true
          },
          {
            "name": "OmitChars",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Tan",
        "params": [
          {
            "name": "Number",
            "isOptional": false
          }
        ]
      },
      {
        "name": "TV_Add",
        "params": [
          {
            "name": "Name",
            "isOptional": false
          },
          {
            "name": "",
            "isOptional": false
          },
          {
            "name": "arentItemID",
            "isOptional": true
          },
          {
            "name": "Options",
            "isOptional": true
          }
        ]
      },
      {
        "name": "TV_Delete",
        "params": [
          {
            "name": "temID",
            "isOptional": true
          }
        ]
      },
      {
        "name": "TV_GetChild",
        "params": [
          {
            "name": "ParentItemID",
            "isOptional": false
          }
        ]
      },
      {
        "name": "TV_GetCount",
        "params": []
      },
      {
        "name": "TV_GetNext",
        "params": [
          {
            "name": "temID",
            "isOptional": true
          },
          {
            "name": '"Checked | Full"',
            "isOptional": true
          }
        ]
      },
      {
        "name": "TV_Get",
        "params": [
          {
            "name": "ItemID",
            "isOptional": false
          },
          {
            "name": '"Expand | Check | Bold"',
            "isOptional": false
          }
        ]
      },
      {
        "name": "TV_GetParent",
        "params": [
          {
            "name": "ItemID",
            "isOptional": false
          }
        ]
      },
      {
        "name": "TV_GetPrev",
        "params": [
          {
            "name": "ItemID",
            "isOptional": false
          }
        ]
      },
      {
        "name": "TV_GetSelection",
        "params": []
      },
      {
        "name": "TV_GetText",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "ItemID",
            "isOptional": false
          }
        ]
      },
      {
        "name": "TV_Modify",
        "params": [
          {
            "name": "ItemID",
            "isOptional": false
          },
          {
            "name": "Options",
            "isOptional": true
          },
          {
            "name": "NewName",
            "isOptional": true
          }
        ]
      },
      {
        "name": "TV_SetImageList",
        "params": [
          {
            "name": "ImageList",
            "isOptional": false
          },
          {
            "name": "0|2",
            "isOptional": true
          }
        ]
      },
      {
        "name": "VarSetCapacity",
        "params": [
          {
            "name": "Var",
            "isOptional": false
          },
          {
            "name": "RequestedCapacity",
            "isOptional": true
          },
          {
            "name": "FillByte",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinActive",
        "params": [
          {
            "name": 'WinTitle"',
            "isOptional": true
          },
          {
            "name": '"WinText"',
            "isOptional": true
          },
          {
            "name": '"ExcludeTitle"',
            "isOptional": true
          },
          {
            "name": '"ExcludeText"',
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinExist",
        "params": [
          {
            "name": 'WinTitle"',
            "isOptional": true
          },
          {
            "name": '"WinText"',
            "isOptional": true
          },
          {
            "name": '"ExcludeTitle"',
            "isOptional": true
          },
          {
            "name": '"ExcludeText"',
            "isOptional": true
          }
        ]
      },
      {
        "name": "Trim",
        "params": [
          {
            "name": "String",
            "isOptional": false
          },
          {
            "name": "OmitChars",
            "isOptional": true,
            "defaultVal": '" `t"'
          }
        ]
      },
      {
        "name": "LTrim",
        "params": [
          {
            "name": "String",
            "isOptional": false
          },
          {
            "name": "OmitChars",
            "isOptional": true,
            "defaultVal": '" `t"'
          }
        ]
      },
      {
        "name": "RTrim",
        "params": [
          {
            "name": "String",
            "isOptional": false
          },
          {
            "name": "OmitChars",
            "isOptional": true,
            "defaultVal": '" `t"'
          }
        ]
      },
      {
        "name": "FileOpen",
        "params": [
          {
            "name": "Filename",
            "isOptional": false
          },
          {
            "name": "Flags",
            "isOptional": false
          },
          {
            "name": "Encoding",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StrGet",
        "params": [
          {
            "name": "Address",
            "isOptional": false
          },
          {
            "name": "Max",
            "isOptional": true
          },
          {
            "name": "Encoding",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StrPut",
        "params": [
          {
            "name": "String",
            "isOptional": false
          },
          {
            "name": "Encoding",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StrPut",
        "params": [
          {
            "name": "String",
            "isOptional": false
          },
          {
            "name": "Address",
            "isOptional": false
          },
          {
            "name": "Max",
            "isOptional": true
          },
          {
            "name": "Encoding",
            "isOptional": true
          }
        ]
      },
      {
        "name": "GetKeyName",
        "params": [
          {
            "name": "Key",
            "isOptional": false
          }
        ]
      },
      {
        "name": "GetKeyVK",
        "params": [
          {
            "name": "Key",
            "isOptional": false
          }
        ]
      },
      {
        "name": "GetKeySC",
        "params": [
          {
            "name": "Key",
            "isOptional": false
          }
        ]
      },
      {
        "name": "IsByRef",
        "params": [
          {
            "name": "Var",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Object",
        "params": [
          {
            "name": "Obj",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Object",
        "params": [
          {
            "name": "Key*",
            "isOptional": true
          },
          {
            "name": "Value*",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Array",
        "params": [
          {
            "name": "Value*",
            "isOptional": true
          }
        ]
      },
      {
        "name": "IsObject",
        "params": [
          {
            "name": "Parameter",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ObjBindMethod",
        "params": [
          {
            "name": "Obj",
            "isOptional": false
          },
          {
            "name": "Method",
            "isOptional": false
          },
          {
            "name": "Params*",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ComObjCreate",
        "params": [
          {
            "name": "ProgIdOrCLSID",
            "isOptional": false
          },
          {
            "name": "IID",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ComObjGet",
        "params": [
          {
            "name": "Name",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ComObjConnect",
        "params": [
          {
            "name": "Obj",
            "isOptional": false
          },
          {
            "name": "FuncPrefixOrObj",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ComObjError",
        "params": [
          {
            "name": "nable",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ComObjActive",
        "params": [
          {
            "name": "ProgIdOrCLSID",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ComObjEnwrap",
        "params": [
          {
            "name": "Pdisp",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ComObjUnwrap",
        "params": [
          {
            "name": "Obj",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ComObjParameter",
        "params": [
          {
            "name": "VarType",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": false
          },
          {
            "name": "Flags",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ComObjType",
        "params": [
          {
            "name": "Obj",
            "isOptional": false
          },
          {
            "name": '"Name|IID"',
            "isOptional": true
          }
        ]
      },
      {
        "name": "ComObjValue",
        "params": [
          {
            "name": "Obj",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ComObjMissing",
        "params": []
      },
      {
        "name": "ComObjArray",
        "params": [
          {
            "name": "VarType",
            "isOptional": false
          },
          {
            "name": "Count*",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ComObjQuery",
        "params": [
          {
            "name": "ComObject",
            "isOptional": false
          },
          {
            "name": "SID",
            "isOptional": true
          },
          {
            "name": "IID",
            "isOptional": false
          }
        ]
      },
      {
        "name": "ComObjFlags",
        "params": [
          {
            "name": "ComObject",
            "isOptional": false
          },
          {
            "name": "NewFlags",
            "isOptional": true
          },
          {
            "name": "Mask",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Func",
        "params": [
          {
            "name": "Funcname",
            "isOptional": false
          }
        ]
      },
      {
        "name": "OnClipboardChange",
        "params": [
          {
            "name": "Func",
            "isOptional": false
          },
          {
            "name": "AddRemove",
            "isOptional": true,
            "defaultVal": "1"
          }
        ]
      },
      {
        "name": "Ord",
        "params": [
          {
            "name": "String",
            "isOptional": false
          }
        ]
      },
      {
        "name": "OnMessage",
        "params": [
          {
            "name": "MsgNumber",
            "isOptional": false
          },
          {
            "name": "Function",
            "isOptional": true
          },
          {
            "name": "MaxThreads",
            "isOptional": true
          }
        ]
      }
    ];
    exports2.builtin_command = [
      {
        "name": "AutoTrim",
        "params": [
          {
            "name": "On|Off",
            "isOptional": false
          }
        ]
      },
      {
        "name": "BlockInput",
        "params": [
          {
            "name": "On|Off|Send|Mouse|SendAndMouse|Default|MouseMove|MouseMoveOff",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Click",
        "params": [
          {
            "name": "Value1",
            "isOptional": true
          },
          {
            "name": "Value2",
            "isOptional": true
          },
          {
            "name": "Value3",
            "isOptional": true
          },
          {
            "name": "Value4",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ClipWait",
        "params": [
          {
            "name": "SecondsToWait",
            "isOptional": true
          },
          {
            "name": "1",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Control",
        "params": [
          {
            "name": "Cmd",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": false
          },
          {
            "name": "Control",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ControlClick",
        "params": [
          {
            "name": "Control-or-Pos",
            "isOptional": true
          },
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "WhichButton",
            "isOptional": true
          },
          {
            "name": "ClickCount",
            "isOptional": true
          },
          {
            "name": "NA|D|U|Pos|Xn|Yn",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ControlFocus",
        "params": [
          {
            "name": "Control",
            "isOptional": true
          },
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ControlGet",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Cmd",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": false
          },
          {
            "name": "Control",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ControlGetFocus",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ControlGetPos",
        "params": [
          {
            "name": "X",
            "isOptional": true
          },
          {
            "name": "Y",
            "isOptional": true
          },
          {
            "name": "Width",
            "isOptional": true
          },
          {
            "name": "Height",
            "isOptional": true
          },
          {
            "name": "Control",
            "isOptional": true
          },
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ControlGetText",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Control",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ControlMove",
        "params": [
          {
            "name": "Control",
            "isOptional": false
          },
          {
            "name": "X",
            "isOptional": false
          },
          {
            "name": "Y",
            "isOptional": false
          },
          {
            "name": "Width",
            "isOptional": false
          },
          {
            "name": "Height",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ControlSend",
        "params": [
          {
            "name": "Control",
            "isOptional": true
          },
          {
            "name": "Keys",
            "isOptional": true
          },
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ControlSendRaw",
        "params": [
          {
            "name": "Control",
            "isOptional": true
          },
          {
            "name": "Keys",
            "isOptional": true
          },
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ControlSetText",
        "params": [
          {
            "name": "Control",
            "isOptional": true
          },
          {
            "name": "NewText",
            "isOptional": true
          },
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "CoordMode",
        "params": [
          {
            "name": "ToolTip|Pixel|Mouse|Caret|Menu",
            "isOptional": false
          },
          {
            "name": "Screen|Relative|Window|Client",
            "isOptional": true
          }
        ]
      },
      {
        "name": "DetectHiddenText",
        "params": [
          {
            "name": "On|Off",
            "isOptional": false
          }
        ]
      },
      {
        "name": "DetectHiddenWindows",
        "params": [
          {
            "name": "On|Off",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Drive",
        "params": [
          {
            "name": "Label|Lock|Unlock|Eject",
            "isOptional": false
          },
          {
            "name": "Drive",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": true
          }
        ]
      },
      {
        "name": "DriveGet",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Cmd",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": true
          }
        ]
      },
      {
        "name": "DriveSpaceFree",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Path",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Edit",
        "params": []
      },
      {
        "name": "EnvAdd",
        "params": [
          {
            "name": "Var",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": false
          },
          {
            "name": "TimeUnits",
            "isOptional": true
          }
        ]
      },
      {
        "name": "EnvDiv",
        "params": [
          {
            "name": "Var",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": false
          }
        ]
      },
      {
        "name": "EnvGet",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "EnvVarName",
            "isOptional": false
          }
        ]
      },
      {
        "name": "EnvMult",
        "params": [
          {
            "name": "Var",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": false
          }
        ]
      },
      {
        "name": "EnvSet",
        "params": [
          {
            "name": "EnvVarName",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": false
          }
        ]
      },
      {
        "name": "EnvSub",
        "params": [
          {
            "name": "Var",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": false
          },
          {
            "name": "TimeUnits",
            "isOptional": true
          }
        ]
      },
      {
        "name": "EnvUpdate",
        "params": []
      },
      {
        "name": "FileAppend",
        "params": [
          {
            "name": "Text",
            "isOptional": true
          },
          {
            "name": "*Filename",
            "isOptional": true
          },
          {
            "name": "Encoding",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileCopy",
        "params": [
          {
            "name": "Source",
            "isOptional": false
          },
          {
            "name": "Dest",
            "isOptional": false
          },
          {
            "name": "0|1",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileCopyDir",
        "params": [
          {
            "name": "Source",
            "isOptional": false
          },
          {
            "name": "Dest",
            "isOptional": false
          },
          {
            "name": "0|1",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileCreateDir",
        "params": [
          {
            "name": "DirName",
            "isOptional": false
          }
        ]
      },
      {
        "name": "FileCreateShortcut",
        "params": [
          {
            "name": "Target",
            "isOptional": false
          },
          {
            "name": "LinkFile",
            "isOptional": false
          },
          {
            "name": "WorkingDir",
            "isOptional": false
          },
          {
            "name": "Args",
            "isOptional": false
          },
          {
            "name": "Description",
            "isOptional": false
          },
          {
            "name": "IconFile",
            "isOptional": false
          },
          {
            "name": "ShortcutKey",
            "isOptional": false
          },
          {
            "name": "IconNumber",
            "isOptional": false
          },
          {
            "name": "RunState",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileDelete",
        "params": [
          {
            "name": "FilePattern",
            "isOptional": false
          }
        ]
      },
      {
        "name": "FileEncoding",
        "params": [
          {
            "name": "UTF-8|UTF-16|UTF-8-RAW|UTF-16-RAW|CPnnn",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileGetAttrib",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Filename",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileGetShortcut",
        "params": [
          {
            "name": "LinkFile",
            "isOptional": false
          },
          {
            "name": "OutTarget",
            "isOptional": false
          },
          {
            "name": "OutDir",
            "isOptional": false
          },
          {
            "name": "OutArgs",
            "isOptional": false
          },
          {
            "name": "OutDescription",
            "isOptional": false
          },
          {
            "name": "OutIcon",
            "isOptional": false
          },
          {
            "name": "OutIconNum",
            "isOptional": false
          },
          {
            "name": "OutRunState",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileGetSize",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Filename",
            "isOptional": false
          },
          {
            "name": "K|M",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileGetTime",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Filename",
            "isOptional": false
          },
          {
            "name": "M|C|A",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileGetVersion",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Filename",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileInstall",
        "params": [
          {
            "name": "Source",
            "isOptional": false
          },
          {
            "name": "Dest",
            "isOptional": false
          },
          {
            "name": "0|1",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileMove",
        "params": [
          {
            "name": "Source",
            "isOptional": false
          },
          {
            "name": "Dest",
            "isOptional": false
          },
          {
            "name": "0|1",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileMoveDir",
        "params": [
          {
            "name": "Source",
            "isOptional": false
          },
          {
            "name": "Dest",
            "isOptional": false
          },
          {
            "name": "0|1|2|R",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileRead",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "*Filename",
            "isOptional": false
          }
        ]
      },
      {
        "name": "FileReadLine",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Filename",
            "isOptional": false
          },
          {
            "name": "LineNum",
            "isOptional": false
          }
        ]
      },
      {
        "name": "FileRecycle",
        "params": [
          {
            "name": "FilePattern",
            "isOptional": false
          }
        ]
      },
      {
        "name": "FileRecycleEmpty",
        "params": [
          {
            "name": "DriveLetter",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileRemoveDir",
        "params": [
          {
            "name": "DirName",
            "isOptional": false
          },
          {
            "name": "0|1",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileSelectFile",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Options",
            "isOptional": false
          },
          {
            "name": "RootDir\\\\Filename",
            "isOptional": false
          },
          {
            "name": "Prompt",
            "isOptional": false
          },
          {
            "name": "Filter",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileSelectFolder",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "StartingFolder",
            "isOptional": false
          },
          {
            "name": "Options",
            "isOptional": false
          },
          {
            "name": "Prompt",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileSetAttrib",
        "params": [
          {
            "name": "Attributes",
            "isOptional": false
          },
          {
            "name": "FilePattern",
            "isOptional": false
          },
          {
            "name": "0|1|2",
            "isOptional": false
          },
          {
            "name": "0|1",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FileSetTime",
        "params": [
          {
            "name": "YYYYMMDDHH24MISS",
            "isOptional": true
          },
          {
            "name": "FilePattern",
            "isOptional": true
          },
          {
            "name": "M|C|A",
            "isOptional": true
          },
          {
            "name": "0|1|2",
            "isOptional": true
          },
          {
            "name": "0|1",
            "isOptional": true
          }
        ]
      },
      {
        "name": "FormatTime",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "YYYYMMDDHH24MISS",
            "isOptional": false
          },
          {
            "name": "Format",
            "isOptional": true
          }
        ]
      },
      {
        "name": "GetKeyState",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "KeyName",
            "isOptional": false
          },
          {
            "name": "P|T",
            "isOptional": true
          }
        ]
      },
      {
        "name": "GroupActivate",
        "params": [
          {
            "name": "GroupName",
            "isOptional": false
          },
          {
            "name": "R",
            "isOptional": true
          }
        ]
      },
      {
        "name": "GroupAdd",
        "params": [
          {
            "name": "GroupName",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "Label",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "GroupClose",
        "params": [
          {
            "name": "GroupName",
            "isOptional": false
          },
          {
            "name": "A|R",
            "isOptional": true
          }
        ]
      },
      {
        "name": "GroupDeactivate",
        "params": [
          {
            "name": "GroupName",
            "isOptional": false
          },
          {
            "name": "R",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Gui",
        "params": [
          {
            "name": "Sub-command",
            "isOptional": false
          },
          {
            "name": "Param2",
            "isOptional": false
          },
          {
            "name": "Param3",
            "isOptional": false
          },
          {
            "name": "Param4",
            "isOptional": true
          }
        ]
      },
      {
        "name": "GuiControl",
        "params": [
          {
            "name": "Sub-command",
            "isOptional": false
          },
          {
            "name": "ControlID",
            "isOptional": false
          },
          {
            "name": "Param",
            "isOptional": true
          }
        ]
      },
      {
        "name": "GuiControlGet",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Sub-command",
            "isOptional": false
          },
          {
            "name": "ControlID",
            "isOptional": false
          },
          {
            "name": "Param",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Hotkey",
        "params": [
          {
            "name": "If",
            "isOptional": false
          },
          {
            "name": "Expression",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Hotkey",
        "params": [
          {
            "name": "IfWinActive|IfExist",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Hotkey",
        "params": [
          {
            "name": "KeyName",
            "isOptional": false
          },
          {
            "name": "Label",
            "isOptional": false
          },
          {
            "name": "Options",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ImageSearch",
        "params": [
          {
            "name": "OutputVarX",
            "isOptional": false
          },
          {
            "name": "OutputVarY",
            "isOptional": false
          },
          {
            "name": "X1",
            "isOptional": false
          },
          {
            "name": "Y1",
            "isOptional": false
          },
          {
            "name": "X2",
            "isOptional": false
          },
          {
            "name": "Y2",
            "isOptional": false
          },
          {
            "name": "*ImageFile",
            "isOptional": false
          }
        ]
      },
      {
        "name": "IniDelete",
        "params": [
          {
            "name": "Filename",
            "isOptional": false
          },
          {
            "name": "Section",
            "isOptional": false
          },
          {
            "name": "Key",
            "isOptional": true
          }
        ]
      },
      {
        "name": "IniRead",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Filename",
            "isOptional": false
          },
          {
            "name": "Section",
            "isOptional": false
          },
          {
            "name": "Key",
            "isOptional": false
          },
          {
            "name": "Default",
            "isOptional": true
          }
        ]
      },
      {
        "name": "IniWrite",
        "params": [
          {
            "name": "Value",
            "isOptional": false
          },
          {
            "name": "Filename",
            "isOptional": false
          },
          {
            "name": "Section",
            "isOptional": false
          },
          {
            "name": "Key",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Input",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": true
          },
          {
            "name": "Options",
            "isOptional": true
          },
          {
            "name": "EndKeys",
            "isOptional": true
          },
          {
            "name": "MatchList",
            "isOptional": true
          }
        ]
      },
      {
        "name": "InputBox",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Title",
            "isOptional": false
          },
          {
            "name": "Prompt",
            "isOptional": false
          },
          {
            "name": "HIDE",
            "isOptional": false
          },
          {
            "name": "Width",
            "isOptional": false
          },
          {
            "name": "Height",
            "isOptional": false
          },
          {
            "name": "X",
            "isOptional": false
          },
          {
            "name": "Y",
            "isOptional": false
          },
          {
            "name": "Locale",
            "isOptional": false
          },
          {
            "name": "Timeout",
            "isOptional": false
          },
          {
            "name": "Default",
            "isOptional": true
          }
        ]
      },
      {
        "name": "KeyHistory",
        "params": []
      },
      {
        "name": "KeyWait",
        "params": [
          {
            "name": "KeyName",
            "isOptional": false
          },
          {
            "name": "D|L|Tn",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ListHotkeys",
        "params": []
      },
      {
        "name": "ListLines",
        "params": [
          {
            "name": "On|Off",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ListVars",
        "params": []
      },
      {
        "name": "Menu",
        "params": [
          {
            "name": "MenuName",
            "isOptional": false
          },
          {
            "name": "Cmd",
            "isOptional": false
          },
          {
            "name": "P3",
            "isOptional": false
          },
          {
            "name": "P4",
            "isOptional": false
          },
          {
            "name": "P5",
            "isOptional": true
          }
        ]
      },
      {
        "name": "MouseClick",
        "params": [
          {
            "name": "WhichButton",
            "isOptional": true
          },
          {
            "name": "X",
            "isOptional": true
          },
          {
            "name": "Y",
            "isOptional": true
          },
          {
            "name": "ClickCount",
            "isOptional": true
          },
          {
            "name": "Speed",
            "isOptional": true
          },
          {
            "name": "D|U",
            "isOptional": true
          },
          {
            "name": "R",
            "isOptional": true
          }
        ]
      },
      {
        "name": "MouseClickDrag",
        "params": [
          {
            "name": "WhichButton",
            "isOptional": false
          },
          {
            "name": "X1",
            "isOptional": false
          },
          {
            "name": "Y1",
            "isOptional": false
          },
          {
            "name": "X2",
            "isOptional": false
          },
          {
            "name": "Y2",
            "isOptional": false
          },
          {
            "name": "Speed",
            "isOptional": false
          },
          {
            "name": "R",
            "isOptional": true
          }
        ]
      },
      {
        "name": "MouseGetPos",
        "params": [
          {
            "name": "OutputVarX",
            "isOptional": true
          },
          {
            "name": "OutputVarY",
            "isOptional": true
          },
          {
            "name": "OutputVarWin",
            "isOptional": true
          },
          {
            "name": "OutputVarControl",
            "isOptional": true
          },
          {
            "name": "1|2|3",
            "isOptional": true
          }
        ]
      },
      {
        "name": "MouseMove",
        "params": [
          {
            "name": "X",
            "isOptional": false
          },
          {
            "name": "Y",
            "isOptional": false
          },
          {
            "name": "Speed",
            "isOptional": false
          },
          {
            "name": "R",
            "isOptional": true
          }
        ]
      },
      {
        "name": "MsgBox",
        "params": [
          {
            "name": "Text",
            "isOptional": false
          }
        ]
      },
      {
        "name": "MsgBox",
        "params": [
          {
            "name": "Options",
            "isOptional": true
          },
          {
            "name": "Title",
            "isOptional": true
          },
          {
            "name": "Text",
            "isOptional": true
          },
          {
            "name": "Timeout",
            "isOptional": true
          }
        ]
      },
      {
        "name": "OutputDebug",
        "params": [
          {
            "name": "Text",
            "isOptional": false
          }
        ]
      },
      {
        "name": "PixelGetColor",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "X",
            "isOptional": false
          },
          {
            "name": "Y",
            "isOptional": false
          },
          {
            "name": "Alt|Slow|RGB",
            "isOptional": true
          }
        ]
      },
      {
        "name": "PixelSearch",
        "params": [
          {
            "name": "OutputVarX",
            "isOptional": false
          },
          {
            "name": "OutputVarY",
            "isOptional": false
          },
          {
            "name": "X1",
            "isOptional": false
          },
          {
            "name": "Y1",
            "isOptional": false
          },
          {
            "name": "X2",
            "isOptional": false
          },
          {
            "name": "Y2",
            "isOptional": false
          },
          {
            "name": "ColorID",
            "isOptional": false
          },
          {
            "name": "Variation",
            "isOptional": false
          },
          {
            "name": "Fast|RGB",
            "isOptional": true
          }
        ]
      },
      {
        "name": "PostMessage",
        "params": [
          {
            "name": "Msg",
            "isOptional": false
          },
          {
            "name": "wParam",
            "isOptional": false
          },
          {
            "name": "lParam",
            "isOptional": false
          },
          {
            "name": "Control",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Process",
        "params": [
          {
            "name": "Exist|Close|List|Priority|Wait|WaitClose",
            "isOptional": false
          },
          {
            "name": "PID-or-Name",
            "isOptional": false
          },
          {
            "name": "Param",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Progress",
        "params": [
          {
            "name": "Off|Param",
            "isOptional": false
          },
          {
            "name": "SubText",
            "isOptional": false
          },
          {
            "name": "MainText",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "FontName",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Random",
        "params": [
          {
            "name": "",
            "isOptional": false
          },
          {
            "name": "NewSeed",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Random",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Min",
            "isOptional": false
          },
          {
            "name": "Max",
            "isOptional": true
          }
        ]
      },
      {
        "name": "RegDelete",
        "params": [
          {
            "name": "HKLM|HKU|HKCU|HKCR|HKCC\\\\SubKey",
            "isOptional": false
          },
          {
            "name": "ValueName",
            "isOptional": true
          }
        ]
      },
      {
        "name": "RegRead",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "HKLM|HKU|HKCU|HKCR|HKCC\\\\SubKey",
            "isOptional": false
          },
          {
            "name": "ValueName",
            "isOptional": true
          }
        ]
      },
      {
        "name": "RegWrite",
        "params": [
          {
            "name": "REG_SZ|REG_EXPAND_SZ|REG_MULTI_SZ|REG_DWORD|REG_BINARY",
            "isOptional": false
          },
          {
            "name": "HKLM|HKU|HKCU|HKCR|HKCC\\\\SubKey",
            "isOptional": false
          },
          {
            "name": "ValueName",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Run",
        "params": [
          {
            "name": "Target",
            "isOptional": false
          },
          {
            "name": "WorkingDir",
            "isOptional": false
          },
          {
            "name": "Max|Min|Hide|UseErrorLevel",
            "isOptional": false
          },
          {
            "name": "OutputVarPID",
            "isOptional": true
          }
        ]
      },
      {
        "name": "RunAs",
        "params": [
          {
            "name": "User",
            "isOptional": true
          },
          {
            "name": "Password",
            "isOptional": true
          },
          {
            "name": "Domain",
            "isOptional": true
          }
        ]
      },
      {
        "name": "RunWait",
        "params": [
          {
            "name": "Target",
            "isOptional": false
          },
          {
            "name": "WorkingDir",
            "isOptional": false
          },
          {
            "name": "Max|Min|Hide|UseErrorLevel",
            "isOptional": false
          },
          {
            "name": "OutputVarPID",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Send",
        "params": [
          {
            "name": "Keys",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SendEvent",
        "params": [
          {
            "name": "Keys",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SendInput",
        "params": [
          {
            "name": "Keys",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SendLevel",
        "params": [
          {
            "name": "Level",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SendMessage",
        "params": [
          {
            "name": "Msg",
            "isOptional": false
          },
          {
            "name": "wParam",
            "isOptional": false
          },
          {
            "name": "lParam",
            "isOptional": false
          },
          {
            "name": "Control",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SendMode",
        "params": [
          {
            "name": "Input|Play|Event|InputThenPlay",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SendPlay",
        "params": [
          {
            "name": "Keys",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SendRaw",
        "params": [
          {
            "name": "Keys",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SetBatchLines",
        "params": [
          {
            "name": "-1|20ms|LineCount",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SetCapsLockState",
        "params": [
          {
            "name": "On|Off|AlwaysOn|AlwaysOff",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SetControlDelay",
        "params": [
          {
            "name": "Milliseconds",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SetDefaultMouseSpeed",
        "params": [
          {
            "name": "Speed",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SetEnv",
        "params": [
          {
            "name": "Var",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SetFormat",
        "params": [
          {
            "name": "IntegerFast|FloatFast",
            "isOptional": false
          },
          {
            "name": "TotalWidth.DecimalPlaces|H|D",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SetKeyDelay",
        "params": [
          {
            "name": "Milliseconds",
            "isOptional": true
          },
          {
            "name": "PressDuration",
            "isOptional": true
          },
          {
            "name": "Play",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SetMouseDelay",
        "params": [
          {
            "name": "Milliseconds",
            "isOptional": false
          },
          {
            "name": "Play",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SetNumLockState",
        "params": [
          {
            "name": "On|Off|AlwaysOn|AlwaysOff",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SetRegView",
        "params": [
          {
            "name": "32|64|Default",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SetScrollLockState",
        "params": [
          {
            "name": "On|Off|AlwaysOn|AlwaysOff",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SetStoreCapslockMode",
        "params": [
          {
            "name": "On|Off",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SetTitleMatchMode",
        "params": [
          {
            "name": "Fast|Slow|RegEx|1|2|3",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SetWinDelay",
        "params": [
          {
            "name": "Milliseconds",
            "isOptional": false
          }
        ]
      },
      {
        "name": "SetWorkingDir",
        "params": [
          {
            "name": "DirName",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Shutdown",
        "params": [
          {
            "name": "Code",
            "isOptional": false
          }
        ]
      },
      {
        "name": "Sort",
        "params": [
          {
            "name": "VarName",
            "isOptional": false
          },
          {
            "name": "Options",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SoundBeep",
        "params": [
          {
            "name": "37-to-32767",
            "isOptional": true
          },
          {
            "name": "Milliseconds",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SoundGet",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "ComponentType",
            "isOptional": false
          },
          {
            "name": "ControlType",
            "isOptional": false
          },
          {
            "name": "DeviceNumber",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SoundGetWaveVolume",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "DeviceNumber",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SoundPlay",
        "params": [
          {
            "name": "Filename",
            "isOptional": false
          },
          {
            "name": "Wait",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SoundSet",
        "params": [
          {
            "name": "NewSetting",
            "isOptional": false
          },
          {
            "name": "ComponentType",
            "isOptional": false
          },
          {
            "name": "ControlType",
            "isOptional": false
          },
          {
            "name": "DeviceNumber",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SoundSetWaveVolume",
        "params": [
          {
            "name": "Percent",
            "isOptional": false
          },
          {
            "name": "DeviceNumber",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SplashImage",
        "params": [
          {
            "name": "Off|ImageFile",
            "isOptional": true
          },
          {
            "name": "Options",
            "isOptional": true
          },
          {
            "name": "SubText",
            "isOptional": true
          },
          {
            "name": "MainText",
            "isOptional": true
          },
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "FontName",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SplashTextOff",
        "params": []
      },
      {
        "name": "SplashTextOn",
        "params": [
          {
            "name": "Width",
            "isOptional": true
          },
          {
            "name": "Height",
            "isOptional": true
          },
          {
            "name": "Title",
            "isOptional": true
          },
          {
            "name": "Text",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SplitPath",
        "params": [
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "OutFileName",
            "isOptional": false
          },
          {
            "name": "OutDir",
            "isOptional": false
          },
          {
            "name": "OutExtension",
            "isOptional": false
          },
          {
            "name": "OutNameNoExt",
            "isOptional": false
          },
          {
            "name": "OutDrive",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StatusBarGetText",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Part",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StatusBarWait",
        "params": [
          {
            "name": "BarText",
            "isOptional": true
          },
          {
            "name": "Seconds",
            "isOptional": true
          },
          {
            "name": "Part",
            "isOptional": true
          },
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "Interval",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StringCaseSense",
        "params": [
          {
            "name": "On|Off|Locale",
            "isOptional": false
          }
        ]
      },
      {
        "name": "StringGetPos",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "SearchText",
            "isOptional": false
          },
          {
            "name": "L|R|Ln|Rn",
            "isOptional": false
          },
          {
            "name": "Offset",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StringLeft",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "Count",
            "isOptional": false
          }
        ]
      },
      {
        "name": "StringLen",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          }
        ]
      },
      {
        "name": "StringLower",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "T",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StringMid",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "StartChar",
            "isOptional": false
          },
          {
            "name": "Count",
            "isOptional": false
          },
          {
            "name": "L",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StringReplace",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "SearchText",
            "isOptional": false
          },
          {
            "name": "ReplaceText",
            "isOptional": false
          },
          {
            "name": "All",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StringRight",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "Count",
            "isOptional": false
          }
        ]
      },
      {
        "name": "StringSplit",
        "params": [
          {
            "name": "OutputArray",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "Delimiters",
            "isOptional": false
          },
          {
            "name": "OmitChars",
            "isOptional": true
          }
        ]
      },
      {
        "name": "StringTrimLeft",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "Count",
            "isOptional": false
          }
        ]
      },
      {
        "name": "StringTrimRight",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "Count",
            "isOptional": false
          }
        ]
      },
      {
        "name": "StringUpper",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "InputVar",
            "isOptional": false
          },
          {
            "name": "T",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Suspend",
        "params": [
          {
            "name": "On|Off|Toggle|Permit",
            "isOptional": true
          }
        ]
      },
      {
        "name": "SysGet",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Sub-command",
            "isOptional": false
          },
          {
            "name": "Param",
            "isOptional": true
          }
        ]
      },
      {
        "name": "ToolTip",
        "params": [
          {
            "name": "Text",
            "isOptional": true
          },
          {
            "name": "X",
            "isOptional": true
          },
          {
            "name": "Y",
            "isOptional": true
          },
          {
            "name": "WhichToolTip",
            "isOptional": true
          }
        ]
      },
      {
        "name": "Transform",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Cmd",
            "isOptional": false
          },
          {
            "name": "Value1",
            "isOptional": false
          },
          {
            "name": "Value2",
            "isOptional": true
          }
        ]
      },
      {
        "name": "TrayTip",
        "params": [
          {
            "name": "Title",
            "isOptional": true
          },
          {
            "name": "Text",
            "isOptional": true
          },
          {
            "name": "Seconds",
            "isOptional": true
          },
          {
            "name": "Options",
            "isOptional": true
          }
        ]
      },
      {
        "name": "URLDownloadToFile",
        "params": [
          {
            "name": "URL",
            "isOptional": false
          },
          {
            "name": "Filename",
            "isOptional": false
          }
        ]
      },
      {
        "name": "WinActivate",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinActivateBottom",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinClose",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "SecondsToWait",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinGet",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "Cmd",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinGetActiveStats",
        "params": [
          {
            "name": "Title",
            "isOptional": false
          },
          {
            "name": "Width",
            "isOptional": false
          },
          {
            "name": "Height",
            "isOptional": false
          },
          {
            "name": "X",
            "isOptional": false
          },
          {
            "name": "Y",
            "isOptional": false
          }
        ]
      },
      {
        "name": "WinGetActiveTitle",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          }
        ]
      },
      {
        "name": "WinGetClass",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinGetPos",
        "params": [
          {
            "name": "X",
            "isOptional": true
          },
          {
            "name": "Y",
            "isOptional": true
          },
          {
            "name": "Width",
            "isOptional": true
          },
          {
            "name": "Height",
            "isOptional": true
          },
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinGetText",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinGetTitle",
        "params": [
          {
            "name": "OutputVar",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinHide",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinKill",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "SecondsToWait",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinMaximize",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinMenuSelectItem",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "Menu",
            "isOptional": false
          },
          {
            "name": "SubMenu1",
            "isOptional": false
          },
          {
            "name": "SubMenu2",
            "isOptional": false
          },
          {
            "name": "SubMenu3",
            "isOptional": false
          },
          {
            "name": "SubMenu4",
            "isOptional": false
          },
          {
            "name": "SubMenu5",
            "isOptional": false
          },
          {
            "name": "SubMenu6",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinMinimize",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinMinimizeAll",
        "params": []
      },
      {
        "name": "WinMinimizeAllUndo",
        "params": []
      },
      {
        "name": "WinMove",
        "params": [
          {
            "name": "X",
            "isOptional": false
          },
          {
            "name": "Y",
            "isOptional": false
          }
        ]
      },
      {
        "name": "WinMove",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "X",
            "isOptional": false
          },
          {
            "name": "Y",
            "isOptional": false
          },
          {
            "name": "Width",
            "isOptional": false
          },
          {
            "name": "Height",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinRestore",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinSet",
        "params": [
          {
            "name": "Attribute",
            "isOptional": false
          },
          {
            "name": "Value",
            "isOptional": false
          },
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinSetTitle",
        "params": [
          {
            "name": "NewTitle",
            "isOptional": false
          }
        ]
      },
      {
        "name": "WinSetTitle",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": false
          },
          {
            "name": "WinText",
            "isOptional": false
          },
          {
            "name": "NewTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeTitle",
            "isOptional": false
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinShow",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinWait",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "Seconds",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinWaitActive",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "Seconds",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinWaitClose",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "Seconds",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      },
      {
        "name": "WinWaitNotActive",
        "params": [
          {
            "name": "WinTitle",
            "isOptional": true
          },
          {
            "name": "WinText",
            "isOptional": true
          },
          {
            "name": "Seconds",
            "isOptional": true
          },
          {
            "name": "ExcludeTitle",
            "isOptional": true
          },
          {
            "name": "ExcludeText",
            "isOptional": true
          }
        ]
      }
    ];
  }
});

// out/utilities/constants.js
var require_constants = __commonJS({
  "out/utilities/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.buildBuiltinCommandNode = exports2.buildBuiltinFunctionNode = exports2.buildbuiltin_variable = exports2.buildKeyWordCompletions = exports2.keywords = exports2.languageServer = exports2.serverName = void 0;
    var vscode_languageserver_12 = require_main4();
    var builtins_12 = require_builtins();
    exports2.serverName = "mock-ahk-vscode";
    exports2.languageServer = "ahk-language-server";
    exports2.keywords = [
      "class",
      "extends",
      "if",
      "else",
      "while",
      "try",
      "loop",
      "until",
      "switch",
      "case",
      "break",
      "goto",
      "gosub",
      "return",
      "global",
      "local",
      "throw",
      "continue",
      "catch",
      "finally",
      "in",
      "for",
      "this",
      "new",
      "critical",
      "exit",
      "exitapp"
    ];
    function buildKeyWordCompletions() {
      return exports2.keywords.map((keyword) => ({
        kind: vscode_languageserver_12.CompletionItemKind.Keyword,
        label: keyword,
        data: 0
      }));
    }
    exports2.buildKeyWordCompletions = buildKeyWordCompletions;
    function buildbuiltin_variable() {
      return builtins_12.builtin_variable.map((bti_var_info, index) => {
        return {
          kind: vscode_languageserver_12.CompletionItemKind.Variable,
          detail: "Built-in Variable",
          label: bti_var_info[0],
          data: index
        };
      });
    }
    exports2.buildbuiltin_variable = buildbuiltin_variable;
    function buildBuiltinFunctionNode() {
      return builtins_12.builtin_function;
    }
    exports2.buildBuiltinFunctionNode = buildBuiltinFunctionNode;
    function buildBuiltinCommandNode() {
      return builtins_12.builtin_command;
    }
    exports2.buildBuiltinCommandNode = buildBuiltinCommandNode;
  }
});

// out/parser/regParser/types.js
var require_types = __commonJS({
  "out/parser/regParser/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReferenceInfomation = exports2.Parameter = exports2.Word = exports2.ClassNode = exports2.FuncNode = exports2.VariableNode = exports2.SymbolNode = exports2.createToken = exports2.TokenType = void 0;
    var TokenType;
    (function(TokenType2) {
      TokenType2[TokenType2["number"] = 0] = "number";
      TokenType2[TokenType2["string"] = 1] = "string";
      TokenType2[TokenType2["true"] = 2] = "true";
      TokenType2[TokenType2["false"] = 3] = "false";
      TokenType2[TokenType2["id"] = 4] = "id";
      TokenType2[TokenType2["aassign"] = 5] = "aassign";
      TokenType2[TokenType2["equal"] = 6] = "equal";
      TokenType2[TokenType2["pluseq"] = 7] = "pluseq";
      TokenType2[TokenType2["minuseq"] = 8] = "minuseq";
      TokenType2[TokenType2["multieq"] = 9] = "multieq";
      TokenType2[TokenType2["diveq"] = 10] = "diveq";
      TokenType2[TokenType2["idiveq"] = 11] = "idiveq";
      TokenType2[TokenType2["sconneq"] = 12] = "sconneq";
      TokenType2[TokenType2["oreq"] = 13] = "oreq";
      TokenType2[TokenType2["andeq"] = 14] = "andeq";
      TokenType2[TokenType2["xoreq"] = 15] = "xoreq";
      TokenType2[TokenType2["rshifteq"] = 16] = "rshifteq";
      TokenType2[TokenType2["lshifteq"] = 17] = "lshifteq";
      TokenType2[TokenType2["regeq"] = 18] = "regeq";
      TokenType2[TokenType2["question"] = 19] = "question";
      TokenType2[TokenType2["sconnect"] = 20] = "sconnect";
      TokenType2[TokenType2["plus"] = 21] = "plus";
      TokenType2[TokenType2["minus"] = 22] = "minus";
      TokenType2[TokenType2["multi"] = 23] = "multi";
      TokenType2[TokenType2["div"] = 24] = "div";
      TokenType2[TokenType2["idiv"] = 25] = "idiv";
      TokenType2[TokenType2["power"] = 26] = "power";
      TokenType2[TokenType2["and"] = 27] = "and";
      TokenType2[TokenType2["or"] = 28] = "or";
      TokenType2[TokenType2["xor"] = 29] = "xor";
      TokenType2[TokenType2["not"] = 30] = "not";
      TokenType2[TokenType2["logicand"] = 31] = "logicand";
      TokenType2[TokenType2["logicor"] = 32] = "logicor";
      TokenType2[TokenType2["notEqual"] = 33] = "notEqual";
      TokenType2[TokenType2["greaterEqual"] = 34] = "greaterEqual";
      TokenType2[TokenType2["greater"] = 35] = "greater";
      TokenType2[TokenType2["lessEqual"] = 36] = "lessEqual";
      TokenType2[TokenType2["less"] = 37] = "less";
      TokenType2[TokenType2["openBrace"] = 38] = "openBrace";
      TokenType2[TokenType2["closeBrace"] = 39] = "closeBrace";
      TokenType2[TokenType2["openBracket"] = 40] = "openBracket";
      TokenType2[TokenType2["closeBracket"] = 41] = "closeBracket";
      TokenType2[TokenType2["openParen"] = 42] = "openParen";
      TokenType2[TokenType2["closeParen"] = 43] = "closeParen";
      TokenType2[TokenType2["lineComment"] = 44] = "lineComment";
      TokenType2[TokenType2["openMultiComment"] = 45] = "openMultiComment";
      TokenType2[TokenType2["closeMultiComment"] = 46] = "closeMultiComment";
      TokenType2[TokenType2["sharp"] = 47] = "sharp";
      TokenType2[TokenType2["dot"] = 48] = "dot";
      TokenType2[TokenType2["comma"] = 49] = "comma";
      TokenType2[TokenType2["colon"] = 50] = "colon";
      TokenType2[TokenType2["hotkey"] = 51] = "hotkey";
      TokenType2[TokenType2["if"] = 52] = "if";
      TokenType2[TokenType2["else"] = 53] = "else";
      TokenType2[TokenType2["switch"] = 54] = "switch";
      TokenType2[TokenType2["case"] = 55] = "case";
      TokenType2[TokenType2["do"] = 56] = "do";
      TokenType2[TokenType2["loop"] = 57] = "loop";
      TokenType2[TokenType2["while"] = 58] = "while";
      TokenType2[TokenType2["until"] = 59] = "until";
      TokenType2[TokenType2["break"] = 60] = "break";
      TokenType2[TokenType2["continue"] = 61] = "continue";
      TokenType2[TokenType2["try"] = 62] = "try";
      TokenType2[TokenType2["catch"] = 63] = "catch";
      TokenType2[TokenType2["finally"] = 64] = "finally";
      TokenType2[TokenType2["gosub"] = 65] = "gosub";
      TokenType2[TokenType2["goto"] = 66] = "goto";
      TokenType2[TokenType2["return"] = 67] = "return";
      TokenType2[TokenType2["global"] = 68] = "global";
      TokenType2[TokenType2["local"] = 69] = "local";
      TokenType2[TokenType2["throw"] = 70] = "throw";
      TokenType2[TokenType2["class"] = 71] = "class";
      TokenType2[TokenType2["extends"] = 72] = "extends";
      TokenType2[TokenType2["new"] = 73] = "new";
      TokenType2[TokenType2["static"] = 74] = "static";
      TokenType2[TokenType2["keyand"] = 75] = "keyand";
      TokenType2[TokenType2["keyor"] = 76] = "keyor";
      TokenType2[TokenType2["keynot"] = 77] = "keynot";
      TokenType2[TokenType2["command"] = 78] = "command";
      TokenType2[TokenType2["drective"] = 79] = "drective";
      TokenType2[TokenType2["EOL"] = 80] = "EOL";
      TokenType2[TokenType2["EOF"] = 81] = "EOF";
      TokenType2[TokenType2["unknown"] = 82] = "unknown";
    })(TokenType = exports2.TokenType || (exports2.TokenType = {}));
    function createToken(type, content, start, end) {
      return { type, content, start, end };
    }
    exports2.createToken = createToken;
    var SymbolNode = class {
      constructor(name, kind, range, subnode) {
        this.name = name;
        this.kind = kind;
        this.range = range;
        if (subnode) {
          this.subnode = subnode;
        }
      }
    };
    exports2.SymbolNode = SymbolNode;
    var VariableNode = class extends SymbolNode {
      constructor(name, kind, range, refname, subnode) {
        super(name, kind, range, subnode);
        this.refname = refname;
      }
    };
    exports2.VariableNode = VariableNode;
    var FuncNode = class extends SymbolNode {
      constructor(name, kind, range, params, subnode) {
        super(name, kind, range, subnode);
        this.params = params;
      }
    };
    exports2.FuncNode = FuncNode;
    var ClassNode = class extends SymbolNode {
      constructor(name, kind, range, subnode, extendsName = ["prototype"]) {
        super(name, kind, range, subnode);
        this.extends = extendsName;
      }
    };
    exports2.ClassNode = ClassNode;
    var Word;
    (function(Word2) {
      function create(name, range) {
        return {
          name,
          range
        };
      }
      Word2.create = create;
    })(Word = exports2.Word || (exports2.Word = {}));
    var Parameter;
    (function(Parameter2) {
      function create(name) {
        return { name };
      }
      Parameter2.create = create;
    })(Parameter = exports2.Parameter || (exports2.Parameter = {}));
    var ReferenceInfomation;
    (function(ReferenceInfomation2) {
      function create(name, line) {
        return {
          name,
          line
        };
      }
      ReferenceInfomation2.create = create;
    })(ReferenceInfomation = exports2.ReferenceInfomation || (exports2.ReferenceInfomation = {}));
  }
});

// out/parser/regParser/tokenizer.js
var require_tokenizer = __commonJS({
  "out/parser/regParser/tokenizer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Tokenizer = void 0;
    var types_1 = require_types();
    var Tokenizer = class {
      constructor(document) {
        this.pos = 0;
        this.isLiteralToken = false;
        this.isLiteralDeref = false;
        this.document = document;
        this.currChar = document[this.pos];
      }
      setLiteralDeref(bool) {
        this.isLiteralDeref = bool;
      }
      Advance() {
        this.pos++;
        if (this.pos >= this.document.length) {
          this.currChar = "EOF";
        } else {
          this.currChar = this.document[this.pos];
        }
        return this;
      }
      Peek(len = 1, skipWhite = false) {
        if (this.pos >= this.document.length) {
          return "EOF";
        }
        if (skipWhite) {
          let nwp = 0;
          while (this.document[this.pos - nwp] && this.document[this.pos - nwp].trim().length === 0) {
            ++nwp;
          }
          return this.document[this.pos + nwp + len - 1];
        }
        return this.document[this.pos + len];
      }
      BackPeek(backstartlen = 1, skipWhite = false) {
        let pos = this.pos - backstartlen;
        if (pos === 0)
          return "\n";
        if (skipWhite) {
          let nwp = 1;
          while (this.document[pos - nwp] && this.document[pos - nwp].trim().length === 0) {
            ++nwp;
          }
          if (pos - nwp <= 0) {
            return "\n";
          }
          return this.document[pos - nwp];
        }
        return this.document[pos - 1];
      }
      NumberAdvance() {
        let sNum = "";
        while (this.isDigit(this.currChar)) {
          sNum += this.currChar;
          this.Advance();
        }
        return sNum;
      }
      GetNumber() {
        let offset = this.pos;
        let sNum = this.NumberAdvance();
        if (this.currChar === ".") {
          sNum += ".";
          this.Advance();
          sNum += this.NumberAdvance();
        }
        if (this.currChar === "e" || this.currChar === "E") {
          sNum += this.currChar;
          sNum += this.NumberAdvance();
        }
        return types_1.createToken(types_1.TokenType.number, sNum, offset, this.pos);
      }
      /**
       * If is a Escaped "
       */
      IsEscapeChar() {
        if (this.Peek() === '"') {
          this.Advance();
          return true;
        }
        return false;
      }
      GetString() {
        let str;
        let offset = this.pos;
        this.Advance();
        while (this.currChar !== '"' || this.IsEscapeChar()) {
          if (this.currChar === "EOF" || this.currChar === "\n" || this.currChar === "\r") {
            break;
          }
          this.Advance();
        }
        str = this.document.slice(offset + 1, this.pos);
        this.Advance();
        return types_1.createToken(types_1.TokenType.string, str, offset, this.pos);
      }
      GetId() {
        let value;
        let offset = this.pos;
        this.Advance();
        while (this.isAlphaNumeric(this.currChar) && this.currChar !== "EOF")
          this.Advance();
        value = this.document.slice(offset, this.pos);
        let keyword = RESERVED_KEYWORDS.get(value.toLowerCase());
        if (keyword) {
          return types_1.createToken(keyword, value, offset, this.pos);
        }
        if (this.BackPeek(value.length, true) === "\n" && this.Peek(1, true) === ",") {
          this.isLiteralToken = true;
          return types_1.createToken(types_1.TokenType.command, value, offset, this.pos);
        }
        return types_1.createToken(types_1.TokenType.id, value, offset, this.pos);
      }
      /**
       * If # is a Drective return drective,
       * else return # token
       */
      GetDrectivesOrSharp() {
        const start = this.pos;
        while (this.isAscii(this.currChar) && this.currChar !== "EOF")
          this.Advance();
        const d = this.document.slice(start, this.pos);
        if (DRECTIVE_TEST.has(d.toLowerCase()))
          return types_1.createToken(types_1.TokenType.drective, d, start - 1, this.pos);
        this.pos = start;
        return types_1.createToken(types_1.TokenType.sharp, "#", start - 1, this.pos);
      }
      GetMark() {
        let currstr = this.currChar;
        let offset = this.pos;
        const p1 = currstr + this.Peek();
        const p2 = p1 + this.Peek(2);
        let mark = OTHER_MARK.get(p2);
        if (mark) {
          this.Advance().Advance().Advance();
          return types_1.createToken(mark, p2, offset, this.pos);
        }
        mark = OTHER_MARK.get(p1);
        if (mark) {
          this.Advance().Advance();
          currstr += this.currChar;
          return types_1.createToken(mark, p1, offset, this.pos);
        }
        mark = OTHER_MARK.get(currstr);
        if (mark) {
          this.Advance();
          return types_1.createToken(mark, currstr, offset, this.pos);
        } else {
          this.Advance();
          return types_1.createToken(types_1.TokenType.unknown, currstr, offset, this.pos);
        }
      }
      LiteralToken() {
        let start = this.pos;
        while (this.Peek() !== "," && this.Peek() !== "%" && this.currChar !== "EOF") {
          this.Advance();
        }
        this.Advance();
        let end = this.pos;
        const value = this.document.substr(start, end - start).trim();
        return types_1.createToken(types_1.TokenType.string, value, start, end);
      }
      GetNextToken() {
        while (this.currChar !== "EOF") {
          if (this.isLiteralToken) {
            switch (this.currChar) {
              case " ":
              case "	":
              case "\r":
                this.Advance();
                continue;
              case "%":
                if (this.Peek() === " ") {
                  this.isLiteralDeref = true;
                  this.Advance();
                  break;
                }
                this.Advance();
                let token = this.GetId();
                this.Advance();
                return token;
              case ",":
                this.Advance();
                return types_1.createToken(types_1.TokenType.comma, ",", this.pos - 1, this.pos);
              default:
                if (this.isLiteralDeref)
                  break;
                return this.LiteralToken();
            }
          }
          switch (this.currChar) {
            case " ":
            case "	":
            case "\r":
              this.Advance();
              continue;
            case "\n":
              this.Advance();
              return types_1.createToken(types_1.TokenType.EOL, "\n", this.pos - 1, this.pos);
            case ".":
              if (this.isDigit(this.Peek())) {
                return this.GetNumber();
              } else {
                if (this.isWhiteSpace(this.Peek()) && this.isWhiteSpace(this.BackPeek())) {
                  this.Advance();
                  return types_1.createToken(types_1.TokenType.sconnect, " . ", this.pos - 1, this.pos);
                }
                this.Advance();
                return types_1.createToken(types_1.TokenType.dot, ".", this.pos - 1, this.pos);
              }
            case '"':
              return this.GetString();
            case "#":
              this.Advance();
              return this.GetDrectivesOrSharp();
            default:
              if (this.isDigit(this.currChar)) {
                return this.GetNumber();
              } else if (this.isAlpha(this.currChar)) {
                return this.GetId();
              } else {
                return this.GetMark();
              }
          }
        }
        return types_1.createToken(types_1.TokenType.EOF, "EOF", this.pos, this.pos);
      }
      isDigit(s) {
        return s >= "0" && s <= "9";
      }
      isAlpha(s) {
        return this.isAscii(s) || s === "_" || identifierTest.test(s);
      }
      isAlphaNumeric(s) {
        return this.isAlpha(s) || this.isDigit(s);
      }
      isAscii(s) {
        return s >= "A" && s <= "Z" || s >= "a" && s <= "z";
      }
      isWhiteSpace(s) {
        return s === " " || s === "	";
      }
      /**
       * reset tokenizer for new loop
       * @param document optional string to split
       */
      Reset(document) {
        this.pos = -1;
        if (document) {
          this.document = document;
        }
        this.Advance();
      }
    };
    exports2.Tokenizer = Tokenizer;
    var identifierTest = new RegExp("^[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*$");
    var RESERVED_KEYWORDS = /* @__PURE__ */ new Map([
      ["class", types_1.TokenType.class],
      ["extends", types_1.TokenType.extends],
      ["new", types_1.TokenType.new],
      ["if", types_1.TokenType.if],
      ["else", types_1.TokenType.else],
      ["while", types_1.TokenType.while],
      ["do", types_1.TokenType.do],
      ["loop", types_1.TokenType.loop],
      ["until", types_1.TokenType.until],
      ["switch", types_1.TokenType.switch],
      ["case", types_1.TokenType.case],
      ["break", types_1.TokenType.break],
      ["goto", types_1.TokenType.goto],
      ["gosub", types_1.TokenType.gosub],
      ["return", types_1.TokenType.return],
      ["global", types_1.TokenType.global],
      ["local", types_1.TokenType.local],
      ["throw", types_1.TokenType.throw],
      ["continue", types_1.TokenType.continue],
      ["and", types_1.TokenType.keyand],
      ["or", types_1.TokenType.keyor],
      ["not", types_1.TokenType.keynot],
      ["try", types_1.TokenType.try],
      ["catch", types_1.TokenType.catch],
      ["finally", types_1.TokenType.finally]
    ]);
    var OTHER_MARK = /* @__PURE__ */ new Map([
      ["{", types_1.TokenType.openBrace],
      ["}", types_1.TokenType.closeBrace],
      ["[", types_1.TokenType.openBracket],
      ["]", types_1.TokenType.closeBracket],
      ["(", types_1.TokenType.openParen],
      [")", types_1.TokenType.closeParen],
      ["/*", types_1.TokenType.openMultiComment],
      ["*/", types_1.TokenType.closeMultiComment],
      [";", types_1.TokenType.lineComment],
      ["=", types_1.TokenType.equal],
      ["#", types_1.TokenType.sharp],
      [",", types_1.TokenType.comma],
      [".", types_1.TokenType.dot],
      ["!", types_1.TokenType.not],
      ["&", types_1.TokenType.and],
      ["|", types_1.TokenType.or],
      ["^", types_1.TokenType.xor],
      ["&&", types_1.TokenType.logicand],
      ["||", types_1.TokenType.logicor],
      ["+", types_1.TokenType.plus],
      ["-", types_1.TokenType.minus],
      ["*", types_1.TokenType.multi],
      ["/", types_1.TokenType.div],
      ["//", types_1.TokenType.idiv],
      ["**", types_1.TokenType.power],
      [">", types_1.TokenType.greater],
      ["<", types_1.TokenType.less],
      [">=", types_1.TokenType.greaterEqual],
      ["<=", types_1.TokenType.lessEqual],
      ["?", types_1.TokenType.question],
      [":", types_1.TokenType.colon],
      ["::", types_1.TokenType.hotkey],
      // equals
      [":=", types_1.TokenType.aassign],
      ["= ", types_1.TokenType.equal],
      ["+=", types_1.TokenType.pluseq],
      ["-=", types_1.TokenType.minuseq],
      ["*=", types_1.TokenType.multieq],
      ["/=", types_1.TokenType.diveq],
      ["//=", types_1.TokenType.idiveq],
      [".=", types_1.TokenType.sconneq],
      ["|=", types_1.TokenType.oreq],
      ["&=", types_1.TokenType.andeq],
      ["^=", types_1.TokenType.xoreq],
      [">>=", types_1.TokenType.rshifteq],
      ["<<=", types_1.TokenType.lshifteq],
      ["~=", types_1.TokenType.regeq]
    ]);
    var DRECTIVE_TEST = /* @__PURE__ */ new Set([
      "allowsamelinecomments",
      "clipboardtimeout",
      "commentflag",
      "errorstdout",
      "escapechar",
      "hotkeyinterval",
      "hotkeymodifiertimeout",
      "hotstring",
      "if",
      "iftimeout",
      "ifwinactive",
      "ifwinactiveclose",
      "ifwinexist",
      "ifwinexistclose",
      "ifwinnotactive",
      "ifwinnotactiveclose",
      "ifwinnotexist",
      "include",
      "includeagain",
      "inputlevel",
      "installkeybdhook",
      "installmousehook",
      "keyhistory",
      "ltrim",
      "maxhotkeysperinterval",
      "maxmem",
      "maxthreads",
      "maxthreadsbuffer",
      "maxthreadsperhotkey",
      "menumaskkey",
      "noenv",
      "notrayicon",
      "persistent",
      "singleinstance",
      "usehook",
      "warn",
      "winactivateforce"
    ]);
  }
});

// out/utilities/logger.js
var require_logger = __commonJS({
  "out/utilities/logger.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mockLogger = exports2.Logger = void 0;
    var Logger = class {
      constructor(connection2) {
        this.connection = connection2;
      }
      error(message) {
        this.connection.warn(message);
      }
      warn(message) {
        this.connection.warn(message);
      }
      log(message) {
        this.connection.log(message);
      }
      info(message) {
        this.connection.info(message);
      }
    };
    exports2.Logger = Logger;
    exports2.mockLogger = {
      error: (_) => {
      },
      warn: (_) => {
      },
      info: (_) => {
      },
      log: (_) => {
      }
    };
  }
});

// out/parser/regParser/ahkparser.js
var require_ahkparser = __commonJS({
  "out/parser/regParser/ahkparser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Lexer = void 0;
    var vscode_languageserver_12 = require_main4();
    var path_1 = require("path");
    var types_1 = require_types();
    var tokenizer_1 = require_tokenizer();
    var logger_12 = require_logger();
    var Lexer = class {
      constructor(document, logger2 = logger_12.mockLogger) {
        this.line = -1;
        this.lineCommentFlag = false;
        this.includeFile = /* @__PURE__ */ new Set();
        this.document = document;
        this.symboltree = null;
        this.referenceTable = /* @__PURE__ */ new Map();
        this.logger = logger2;
      }
      advanceLine() {
        if (this.line < this.document.lineCount - 1) {
          this.line++;
          this.currentText = this.GetText();
        } else {
          this.currentText = void 0;
        }
      }
      Parse() {
        this.line = -1;
        this.advanceLine();
        this.referenceTable = /* @__PURE__ */ new Map();
        this.symboltree = this.Analyze();
        return {
          tree: this.symboltree,
          refTable: this.referenceTable,
          include: this.includeFile
        };
      }
      Analyze(isEndByBrace = false, maxLine = 1e4) {
        const lineCount = Math.min(this.document.lineCount, this.line + maxLine);
        let Symbol2;
        const result = [];
        let match;
        let unclosedBrace = 1;
        let varnames = /* @__PURE__ */ new Set();
        while (this.currentText && this.line <= lineCount - 1) {
          this.JumpMeanless();
          let startLine = this.line;
          try {
            if ((match = this.currentText.match(FuncReg)) && this.isVaildBlockStart(match[0].length)) {
              switch (match[1].toLowerCase()) {
                // skip if() and while()
                case "if":
                case "while":
                  unclosedBrace++;
                  break;
                default:
                  result.push(this.GetMethodInfo(match, startLine));
                  break;
              }
            } else if ((match = this.currentText.match(ClassReg)) && this.isVaildBlockStart(match[0].length)) {
              result.push(this.GetClassInfo(match, startLine));
            } else if (Symbol2 = this.GetLabelInfo()) {
              unclosedBrace += this.getUnclosedNum();
              result.push(Symbol2);
            } else if (match = this.currentText.match(VarReg)) {
              unclosedBrace += this.getUnclosedNum();
              for (let i = 0; i < match.length; i++) {
                let name = match[i].trim();
                if (varnames.has(name.toLowerCase())) {
                  continue;
                }
                varnames.add(name.toLowerCase());
                result.push(this.GetVarInfo(name));
              }
            } else {
              if (match = this.currentText.match(includeReg)) {
                this.checkInclude(this.currentText.slice(match[0].length).trim());
              }
              unclosedBrace += this.getUnclosedNum();
            }
          } catch (error) {
            continue;
          }
          if (isEndByBrace && unclosedBrace <= 0) {
            break;
          }
          this.advanceLine();
        }
        return result;
      }
      /**
       * verify is a vaild block start
       * if not is add reference of this symbol
       */
      isVaildBlockStart(startIndex) {
        let line = this.line;
        const text = this.currentText.slice(startIndex);
        if (text.search(/{/) >= 0) {
          this.advanceLine();
          return true;
        } else {
          this.advanceLine();
          this.JumpMeanless();
          if (this.currentText === void 0) {
            return false;
          }
          if (this.currentText.search(/^[ \t]*({)/) >= 0) {
            this.advanceLine();
            return true;
          }
        }
        return false;
      }
      getUnclosedNum() {
        let nextSearchStr = this.currentText;
        let unclosedPairNum = 0;
        let a_LPair = nextSearchStr.match(/[\s\t]*{/g);
        let a_RPair = nextSearchStr.match(/[\s\t]*}/g);
        if (a_LPair) {
          unclosedPairNum += a_LPair.length;
        }
        if (a_RPair) {
          unclosedPairNum -= a_RPair.length;
        }
        return unclosedPairNum;
      }
      /**
       * Add a normalized absolute include path
       * @param rawPath Raw include path of a ahk file
       */
      checkInclude(rawPath) {
        switch (path_1.extname(rawPath)) {
          case ".ahk":
            this.includeFile.add(rawPath);
            break;
          case "":
            if (rawPath[0] === "<" && rawPath[rawPath.length - 1] === ">")
              this.includeFile.add(rawPath);
            break;
          default:
            break;
        }
      }
      /**
      * @param match fullmatch array of a method
      * @param startLine start line of a method
      */
      GetMethodInfo(match, startLine) {
        let name = match["groups"]["funcname"];
        let sub = this.Analyze(true, 500);
        let endMatch;
        if (this.currentText && (endMatch = this.currentText.match(/^[ \t]*(})/))) {
          let endLine = this.line;
          let endIndex = endMatch[0].length;
          return new types_1.FuncNode(name, vscode_languageserver_12.SymbolKind.Function, vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(startLine, 0), vscode_languageserver_12.Position.create(endLine, endIndex)), this.PParams(match[2]), sub);
        }
        this.logger.error(`Method parse fail: ${name} at ${startLine + 1}-${this.line + 1}`);
        return new types_1.FuncNode(name, vscode_languageserver_12.SymbolKind.Function, vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(startLine, 0), vscode_languageserver_12.Position.create(startLine, 0)), this.PParams(match[2]));
      }
      /**
      * @param match match result
      * @param startLine startline of this symbol
      */
      GetClassInfo(match, startLine) {
        let name = match["groups"]["classname"];
        let sub = this.Analyze(true, 2e3);
        let endMatch;
        const invaildRange = vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(-1, -1), vscode_languageserver_12.Position.create(-1, -1));
        let propertyList = [
          new types_1.SymbolNode("base", vscode_languageserver_12.SymbolKind.Property, invaildRange),
          new types_1.SymbolNode("__class", vscode_languageserver_12.SymbolKind.Property, invaildRange)
        ];
        for (const fNode of sub) {
          if (fNode instanceof types_1.FuncNode && fNode.subnode) {
            let temp = [];
            for (const node of fNode.subnode) {
              if (node.kind === vscode_languageserver_12.SymbolKind.Property) {
                propertyList.push(node);
              } else
                temp.push(node);
            }
            fNode.subnode = temp;
          } else if (fNode.kind === vscode_languageserver_12.SymbolKind.Variable)
            fNode.kind = vscode_languageserver_12.SymbolKind.Property;
        }
        sub.push(...propertyList);
        if (this.currentText && (endMatch = this.currentText.match(/^[ \t]*(})/))) {
          let endLine = this.line;
          let endIndex = endMatch[0].length;
          return new types_1.ClassNode(name, vscode_languageserver_12.SymbolKind.Class, vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(startLine, 0), vscode_languageserver_12.Position.create(endLine, endIndex)), sub);
        }
        this.logger.error(`Class parse fail: ${name} at ${startLine + 1}-${this.line + 1}`);
        return new types_1.ClassNode(name, vscode_languageserver_12.SymbolKind.Class, vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(startLine, 0), vscode_languageserver_12.Position.create(startLine, 0)), sub);
      }
      GetLabelInfo() {
        let text = this.currentText;
        let match = text.match(/^\s*(?<labelname>[a-zA-Z\u4e00-\u9fa5#_@$][a-zA-Z0-9\u4e00-\u9fa5#_@$]*):\s*(\s;.*)?$/);
        let range = vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(this.line, 0), vscode_languageserver_12.Position.create(this.line, 0));
        if (match) {
          let labelname = match["groups"]["labelname"];
          return new types_1.SymbolNode(labelname, vscode_languageserver_12.SymbolKind.Null, range);
        } else if (match = text.match(/^\s*(?<labelname>[\x09\x20-\x7E]+)::/)) {
          let labelname = match["groups"]["labelname"];
          return new types_1.SymbolNode(labelname, vscode_languageserver_12.SymbolKind.Event, range);
        }
      }
      /**
       * Return variable symbol node
       * @param match matched variable name string
       */
      GetVarInfo(match) {
        const index = this.currentText.search(match);
        const s = this.currentText.slice(index + match.length);
        let ref;
        const tokenizer = new tokenizer_1.Tokenizer(s);
        let tokenStack = [];
        tokenStack.push(tokenizer.GetNextToken());
        tokenStack.push(tokenizer.GetNextToken());
        let t = tokenStack.pop();
        if (t && t.type === types_1.TokenType.new) {
          let token = tokenizer.GetNextToken();
          if (token.type === types_1.TokenType.id) {
            let perfix = [token.content];
            while (tokenizer.currChar === ".") {
              tokenizer.GetNextToken();
              token = tokenizer.GetNextToken();
              if (token.type === types_1.TokenType.id) {
                perfix.push(token.content);
              }
            }
            ref = perfix.join(".");
            this.addReference(match, perfix.join("."), this.line);
          }
        }
        if (match.search(/\./) >= 0) {
          let propertyList = match.split(".");
          if (propertyList[0] === "this") {
            return new types_1.VariableNode(propertyList[1], vscode_languageserver_12.SymbolKind.Property, vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(this.line, index), vscode_languageserver_12.Position.create(this.line, index)), ref);
          }
        }
        return new types_1.VariableNode(match, vscode_languageserver_12.SymbolKind.Variable, vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(this.line, index), vscode_languageserver_12.Position.create(this.line, index)), ref);
      }
      PParams(s_params) {
        s_params = s_params.slice(1, -1);
        let result = [];
        s_params.split(",").map((param) => {
          let paraminfo = types_1.Parameter.create(param.trim());
          let l = paraminfo.name.split(/:?=/);
          if (l.length > 1) {
            paraminfo.name = l[0].trim();
            paraminfo.isOptional = true;
            paraminfo.defaultVal = l[1];
          }
          result.push(paraminfo);
        });
        return result;
      }
      GetText() {
        let line = vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(this.line, 0), vscode_languageserver_12.Position.create(this.line + 1, 0));
        let text = this.document.getText(line);
        return text;
      }
      /**
       * Add reference infomation to referenceTable
       * @param variable var
       * @param symbol Class or function that a variable is refered
       * @param line Line of the variable
       */
      addReference(variable, symbol, line) {
        var _a;
        if (this.referenceTable.has(symbol)) {
          (_a = this.referenceTable.get(symbol)) === null || _a === void 0 ? void 0 : _a.push(types_1.ReferenceInfomation.create(variable, line));
        } else {
          this.referenceTable.set(symbol, [types_1.ReferenceInfomation.create(variable, line)]);
        }
      }
      PComment() {
        let text = this.currentText;
        if (this.lineCommentFlag === true) {
          if (text.search(/^[ \t]*\*\//) >= 0) {
            this.lineCommentFlag = false;
          }
          return true;
        } else if (text.search(/^[ \t]*[;]/) >= 0) {
          return true;
        } else if (text.search(/^[ \t]*\/\*/) >= 0) {
          this.lineCommentFlag = true;
          return true;
        }
        return false;
      }
      JumpMeanless() {
        while (this.currentText && this.currentText.trim() === "" || this.PComment()) {
          this.advanceLine();
          if (this.line >= this.document.lineCount - 1) {
            break;
          }
        }
        this.lineCommentFlag = false;
      }
    };
    exports2.Lexer = Lexer;
    var FuncReg = /^[ \t]*(?<funcname>[a-zA-Z0-9\u4e00-\u9fa5#_@\$\?\[\]]+)(\(.*?\))/;
    var ClassReg = /^[ \t]*class[ \t]+(?<classname>[a-zA-Z0-9\u4e00-\u9fa5#_@\$\?\[\]]+)/i;
    var VarReg = /\s*\b((?<!\.)[a-zA-Z\u4e00-\u9fa5#_@$][a-zA-Z0-9\u4e00-\u9fa5#_@$]*)(\.[a-zA-Z0-9\u4e00-\u9fa5#_@$]+)*?\s*(?=[+\-*/.:]=|\+\+|\-\-)/g;
    var includeReg = /^\s*#include[,]?/i;
  }
});

// node_modules/vscode-uri/lib/umd/index.js
var require_umd = __commonJS({
  "node_modules/vscode-uri/lib/umd/index.js"(exports2, module2) {
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    (function(factory) {
      if (typeof module2 === "object" && typeof module2.exports === "object") {
        var v = factory(require, exports2);
        if (v !== void 0) module2.exports = v;
      } else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
      }
    })(function(require2, exports3) {
      "use strict";
      var _a;
      Object.defineProperty(exports3, "__esModule", { value: true });
      var isWindows;
      if (typeof process === "object") {
        isWindows = process.platform === "win32";
      } else if (typeof navigator === "object") {
        var userAgent = navigator.userAgent;
        isWindows = userAgent.indexOf("Windows") >= 0;
      }
      function isHighSurrogate(charCode) {
        return 55296 <= charCode && charCode <= 56319;
      }
      function isLowSurrogate(charCode) {
        return 56320 <= charCode && charCode <= 57343;
      }
      function isLowerAsciiHex(code) {
        return code >= 97 && code <= 102;
      }
      function isLowerAsciiLetter(code) {
        return code >= 97 && code <= 122;
      }
      function isUpperAsciiLetter(code) {
        return code >= 65 && code <= 90;
      }
      function isAsciiLetter(code) {
        return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
      }
      var _schemePattern = /^\w[\w\d+.-]*$/;
      var _singleSlashStart = /^\//;
      var _doubleSlashStart = /^\/\//;
      function _validateUri(ret, _strict) {
        if (!ret.scheme && _strict) {
          throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "' + ret.authority + '", path: "' + ret.path + '", query: "' + ret.query + '", fragment: "' + ret.fragment + '"}');
        }
        if (ret.scheme && !_schemePattern.test(ret.scheme)) {
          throw new Error("[UriError]: Scheme contains illegal characters.");
        }
        if (ret.path) {
          if (ret.authority) {
            if (!_singleSlashStart.test(ret.path)) {
              throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            }
          } else {
            if (_doubleSlashStart.test(ret.path)) {
              throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
            }
          }
        }
      }
      function _schemeFix(scheme, _strict) {
        if (!scheme && !_strict) {
          return "file";
        }
        return scheme;
      }
      function _referenceResolution(scheme, path) {
        switch (scheme) {
          case "https":
          case "http":
          case "file":
            if (!path) {
              path = _slash;
            } else if (path[0] !== _slash) {
              path = _slash + path;
            }
            break;
        }
        return path;
      }
      var _empty = "";
      var _slash = "/";
      var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
      var URI = (
        /** @class */
        (function() {
          function URI2(schemeOrData, authority, path, query, fragment, _strict) {
            if (_strict === void 0) {
              _strict = false;
            }
            if (typeof schemeOrData === "object") {
              this.scheme = schemeOrData.scheme || _empty;
              this.authority = schemeOrData.authority || _empty;
              this.path = schemeOrData.path || _empty;
              this.query = schemeOrData.query || _empty;
              this.fragment = schemeOrData.fragment || _empty;
            } else {
              this.scheme = _schemeFix(schemeOrData, _strict);
              this.authority = authority || _empty;
              this.path = _referenceResolution(this.scheme, path || _empty);
              this.query = query || _empty;
              this.fragment = fragment || _empty;
              _validateUri(this, _strict);
            }
          }
          URI2.isUri = function(thing) {
            if (thing instanceof URI2) {
              return true;
            }
            if (!thing) {
              return false;
            }
            return typeof thing.authority === "string" && typeof thing.fragment === "string" && typeof thing.path === "string" && typeof thing.query === "string" && typeof thing.scheme === "string" && typeof thing.fsPath === "function" && typeof thing.with === "function" && typeof thing.toString === "function";
          };
          Object.defineProperty(URI2.prototype, "fsPath", {
            // ---- filesystem path -----------------------
            /**
             * Returns a string representing the corresponding file system path of this URI.
             * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
             * platform specific path separator.
             *
             * * Will *not* validate the path for invalid characters and semantics.
             * * Will *not* look at the scheme of this URI.
             * * The result shall *not* be used for display purposes but for accessing a file on disk.
             *
             *
             * The *difference* to `URI#path` is the use of the platform specific separator and the handling
             * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
             *
             * ```ts
                const u = URI.parse('file://server/c$/folder/file.txt')
                u.authority === 'server'
                u.path === '/shares/c$/file.txt'
                u.fsPath === '\\server\c$\folder\file.txt'
            ```
             *
             * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
             * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
             * with URIs that represent files on disk (`file` scheme).
             */
            get: function() {
              return uriToFsPath(this, false);
            },
            enumerable: true,
            configurable: true
          });
          URI2.prototype.with = function(change) {
            if (!change) {
              return this;
            }
            var scheme = change.scheme, authority = change.authority, path = change.path, query = change.query, fragment = change.fragment;
            if (scheme === void 0) {
              scheme = this.scheme;
            } else if (scheme === null) {
              scheme = _empty;
            }
            if (authority === void 0) {
              authority = this.authority;
            } else if (authority === null) {
              authority = _empty;
            }
            if (path === void 0) {
              path = this.path;
            } else if (path === null) {
              path = _empty;
            }
            if (query === void 0) {
              query = this.query;
            } else if (query === null) {
              query = _empty;
            }
            if (fragment === void 0) {
              fragment = this.fragment;
            } else if (fragment === null) {
              fragment = _empty;
            }
            if (scheme === this.scheme && authority === this.authority && path === this.path && query === this.query && fragment === this.fragment) {
              return this;
            }
            return new _URI(scheme, authority, path, query, fragment);
          };
          URI2.parse = function(value, _strict) {
            if (_strict === void 0) {
              _strict = false;
            }
            var match = _regexp.exec(value);
            if (!match) {
              return new _URI(_empty, _empty, _empty, _empty, _empty);
            }
            return new _URI(match[2] || _empty, percentDecode(match[4] || _empty), percentDecode(match[5] || _empty), percentDecode(match[7] || _empty), percentDecode(match[9] || _empty), _strict);
          };
          URI2.file = function(path) {
            var authority = _empty;
            if (isWindows) {
              path = path.replace(/\\/g, _slash);
            }
            if (path[0] === _slash && path[1] === _slash) {
              var idx = path.indexOf(_slash, 2);
              if (idx === -1) {
                authority = path.substring(2);
                path = _slash;
              } else {
                authority = path.substring(2, idx);
                path = path.substring(idx) || _slash;
              }
            }
            return new _URI("file", authority, path, _empty, _empty);
          };
          URI2.from = function(components) {
            return new _URI(components.scheme, components.authority, components.path, components.query, components.fragment);
          };
          URI2.prototype.toString = function(skipEncoding) {
            if (skipEncoding === void 0) {
              skipEncoding = false;
            }
            return _asFormatted(this, skipEncoding);
          };
          URI2.prototype.toJSON = function() {
            return this;
          };
          URI2.revive = function(data) {
            if (!data) {
              return data;
            } else if (data instanceof URI2) {
              return data;
            } else {
              var result = new _URI(data);
              result._formatted = data.external;
              result._fsPath = data._sep === _pathSepMarker ? data.fsPath : null;
              return result;
            }
          };
          return URI2;
        })()
      );
      exports3.URI = URI;
      var _pathSepMarker = isWindows ? 1 : void 0;
      var _URI = (
        /** @class */
        (function(_super) {
          __extends(_URI2, _super);
          function _URI2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._formatted = null;
            _this._fsPath = null;
            return _this;
          }
          Object.defineProperty(_URI2.prototype, "fsPath", {
            get: function() {
              if (!this._fsPath) {
                this._fsPath = uriToFsPath(this, false);
              }
              return this._fsPath;
            },
            enumerable: true,
            configurable: true
          });
          _URI2.prototype.toString = function(skipEncoding) {
            if (skipEncoding === void 0) {
              skipEncoding = false;
            }
            if (!skipEncoding) {
              if (!this._formatted) {
                this._formatted = _asFormatted(this, false);
              }
              return this._formatted;
            } else {
              return _asFormatted(this, true);
            }
          };
          _URI2.prototype.toJSON = function() {
            var res = {
              $mid: 1
            };
            if (this._fsPath) {
              res.fsPath = this._fsPath;
              res._sep = _pathSepMarker;
            }
            if (this._formatted) {
              res.external = this._formatted;
            }
            if (this.path) {
              res.path = this.path;
            }
            if (this.scheme) {
              res.scheme = this.scheme;
            }
            if (this.authority) {
              res.authority = this.authority;
            }
            if (this.query) {
              res.query = this.query;
            }
            if (this.fragment) {
              res.fragment = this.fragment;
            }
            return res;
          };
          return _URI2;
        })(URI)
      );
      var encodeTable = (_a = {}, _a[
        58
        /* Colon */
      ] = "%3A", _a[
        47
        /* Slash */
      ] = "%2F", _a[
        63
        /* QuestionMark */
      ] = "%3F", _a[
        35
        /* Hash */
      ] = "%23", _a[
        91
        /* OpenSquareBracket */
      ] = "%5B", _a[
        93
        /* CloseSquareBracket */
      ] = "%5D", _a[
        64
        /* AtSign */
      ] = "%40", _a[
        33
        /* ExclamationMark */
      ] = "%21", _a[
        36
        /* DollarSign */
      ] = "%24", _a[
        38
        /* Ampersand */
      ] = "%26", _a[
        39
        /* SingleQuote */
      ] = "%27", _a[
        40
        /* OpenParen */
      ] = "%28", _a[
        41
        /* CloseParen */
      ] = "%29", _a[
        42
        /* Asterisk */
      ] = "%2A", _a[
        43
        /* Plus */
      ] = "%2B", _a[
        44
        /* Comma */
      ] = "%2C", _a[
        59
        /* Semicolon */
      ] = "%3B", _a[
        61
        /* Equals */
      ] = "%3D", _a[
        32
        /* Space */
      ] = "%20", _a);
      function encodeURIComponentFast(uriComponent, allowSlash) {
        var res = void 0;
        var nativeEncodePos = -1;
        for (var pos = 0; pos < uriComponent.length; pos++) {
          var code = uriComponent.charCodeAt(pos);
          if (code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 48 && code <= 57 || code === 45 || code === 46 || code === 95 || code === 126 || allowSlash && code === 47) {
            if (nativeEncodePos !== -1) {
              res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
              nativeEncodePos = -1;
            }
            if (res !== void 0) {
              res += uriComponent.charAt(pos);
            }
          } else {
            if (res === void 0) {
              res = uriComponent.substr(0, pos);
            }
            var escaped = encodeTable[code];
            if (escaped !== void 0) {
              if (nativeEncodePos !== -1) {
                res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                nativeEncodePos = -1;
              }
              res += escaped;
            } else if (nativeEncodePos === -1) {
              nativeEncodePos = pos;
            }
          }
        }
        if (nativeEncodePos !== -1) {
          res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
        }
        return res !== void 0 ? res : uriComponent;
      }
      function encodeURIComponentMinimal(path) {
        var res = void 0;
        for (var pos = 0; pos < path.length; pos++) {
          var code = path.charCodeAt(pos);
          if (code === 35 || code === 63) {
            if (res === void 0) {
              res = path.substr(0, pos);
            }
            res += encodeTable[code];
          } else {
            if (res !== void 0) {
              res += path[pos];
            }
          }
        }
        return res !== void 0 ? res : path;
      }
      function uriToFsPath(uri, keepDriveLetterCasing) {
        var value;
        if (uri.authority && uri.path.length > 1 && uri.scheme === "file") {
          value = "//" + uri.authority + uri.path;
        } else if (uri.path.charCodeAt(0) === 47 && (uri.path.charCodeAt(1) >= 65 && uri.path.charCodeAt(1) <= 90 || uri.path.charCodeAt(1) >= 97 && uri.path.charCodeAt(1) <= 122) && uri.path.charCodeAt(2) === 58) {
          if (!keepDriveLetterCasing) {
            value = uri.path[1].toLowerCase() + uri.path.substr(2);
          } else {
            value = uri.path.substr(1);
          }
        } else {
          value = uri.path;
        }
        if (isWindows) {
          value = value.replace(/\//g, "\\");
        }
        return value;
      }
      exports3.uriToFsPath = uriToFsPath;
      function _asFormatted(uri, skipEncoding) {
        var encoder = !skipEncoding ? encodeURIComponentFast : encodeURIComponentMinimal;
        var res = "";
        var scheme = uri.scheme, authority = uri.authority, path = uri.path, query = uri.query, fragment = uri.fragment;
        if (scheme) {
          res += scheme;
          res += ":";
        }
        if (authority || scheme === "file") {
          res += _slash;
          res += _slash;
        }
        if (authority) {
          var idx = authority.indexOf("@");
          if (idx !== -1) {
            var userinfo = authority.substr(0, idx);
            authority = authority.substr(idx + 1);
            idx = userinfo.indexOf(":");
            if (idx === -1) {
              res += encoder(userinfo, false);
            } else {
              res += encoder(userinfo.substr(0, idx), false);
              res += ":";
              res += encoder(userinfo.substr(idx + 1), false);
            }
            res += "@";
          }
          authority = authority.toLowerCase();
          idx = authority.indexOf(":");
          if (idx === -1) {
            res += encoder(authority, false);
          } else {
            res += encoder(authority.substr(0, idx), false);
            res += authority.substr(idx);
          }
        }
        if (path) {
          if (path.length >= 3 && path.charCodeAt(0) === 47 && path.charCodeAt(2) === 58) {
            var code = path.charCodeAt(1);
            if (code >= 65 && code <= 90) {
              path = "/" + String.fromCharCode(code + 32) + ":" + path.substr(3);
            }
          } else if (path.length >= 2 && path.charCodeAt(1) === 58) {
            var code = path.charCodeAt(0);
            if (code >= 65 && code <= 90) {
              path = String.fromCharCode(code + 32) + ":" + path.substr(2);
            }
          }
          res += encoder(path, true);
        }
        if (query) {
          res += "?";
          res += encoder(query, false);
        }
        if (fragment) {
          res += "#";
          res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
        }
        return res;
      }
      function decodeURIComponentGraceful(str) {
        try {
          return decodeURIComponent(str);
        } catch (_a2) {
          if (str.length > 3) {
            return str.substr(0, 3) + decodeURIComponentGraceful(str.substr(3));
          } else {
            return str;
          }
        }
      }
      var _rEncodedAsHex = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
      function percentDecode(str) {
        if (!str.match(_rEncodedAsHex)) {
          return str;
        }
        return str.replace(_rEncodedAsHex, function(match) {
          return decodeURIComponentGraceful(match);
        });
      }
    });
  }
});

// out/parser/regParser/asttypes.js
var require_asttypes = __commonJS({
  "out/parser/regParser/asttypes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoOption = exports2.PropertCall = exports2.MethodCall = exports2.CommandCall = exports2.FunctionCall = exports2.FunctionDeclaration = exports2.ClassDeclaration = exports2.Offrange = void 0;
    var Offrange = class {
      constructor(start, end) {
        this.start = start;
        this.end = end;
      }
    };
    exports2.Offrange = Offrange;
    var ClassDeclaration = class {
      constructor(name, exts, token, block) {
        this.name = name;
        this.exts = exts;
        this.token = token;
        this.block = block;
        this.offrange = {
          start: token.start,
          end: token.end
        };
      }
    };
    exports2.ClassDeclaration = ClassDeclaration;
    var FunctionDeclaration = class {
      constructor(name, parameters, block, token) {
        this.name = name;
        this.parameters = parameters;
        this.block = block;
        this.token = token;
        this.offrange = {
          start: token.start,
          end: token.end
        };
      }
    };
    exports2.FunctionDeclaration = FunctionDeclaration;
    var FunctionCall = class {
      constructor(name, actualParams, token, offrange) {
        this.name = name;
        this.actualParams = actualParams;
        this.token = token;
        this.offrange = offrange;
      }
    };
    exports2.FunctionCall = FunctionCall;
    var CommandCall = class extends FunctionCall {
      constructor(name, actualParams, token, offrange) {
        super(name, actualParams, token, offrange);
      }
    };
    exports2.CommandCall = CommandCall;
    var MethodCall = class extends FunctionCall {
      constructor(name, actualParams, token, ref, offrange) {
        super(name, actualParams, token, offrange);
        this.ref = ref;
      }
    };
    exports2.MethodCall = MethodCall;
    var PropertCall = class {
      constructor(name, token, ref, offrange) {
        this.name = name;
        this.token = token;
        this.ref = ref;
        this.offrange = offrange;
      }
    };
    exports2.PropertCall = PropertCall;
    var NoOption = class {
      constructor(offrange) {
        this.none = null;
        this.offrange = offrange;
      }
    };
    exports2.NoOption = NoOption;
  }
});

// out/parser/regParser/semantic_stack.js
var require_semantic_stack = __commonJS({
  "out/parser/regParser/semantic_stack.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SemanticStack = exports2.isExpr = void 0;
    var types_1 = require_types();
    var tokenizer_1 = require_tokenizer();
    var asttypes_1 = require_asttypes();
    function isExpr(node) {
      if (node["right"] === void 0) {
        return false;
      }
      return true;
    }
    exports2.isExpr = isExpr;
    var SemanticStack = class {
      constructor(document) {
        this.tokenizer = new tokenizer_1.Tokenizer(document);
        this.currentToken = this.tokenizer.GetNextToken();
      }
      reset(document) {
        this.tokenizer.Reset(document);
        return this;
      }
      inType(actualt, expectts) {
        for (const t of expectts) {
          if (actualt === t) {
            return true;
          }
        }
        return false;
      }
      eat(type) {
        if (type === this.currentToken.type) {
          this.currentToken = this.tokenizer.GetNextToken();
        } else {
          throw new Error("Unexpect Token");
        }
      }
      variable() {
        let token = this.currentToken;
        this.eat(types_1.TokenType.id);
        return {
          errors: false,
          value: {
            name: token.content,
            token,
            offrange: new asttypes_1.Offrange(token.start, token.end)
          }
        };
      }
      literal() {
        let token = this.currentToken;
        if (this.currentToken.type === types_1.TokenType.string) {
          this.eat(types_1.TokenType.string);
        } else if (this.currentToken.type === types_1.TokenType.number) {
          this.eat(types_1.TokenType.number);
        }
        return {
          errors: false,
          value: {
            token,
            value: token.content,
            offrange: new asttypes_1.Offrange(token.start, token.end)
          }
        };
      }
      associativeArray() {
        const start = this.currentToken.start;
        let error = false;
        let pairs = [];
        this.eat(types_1.TokenType.openBrace);
        try {
          let key = this.expr();
          this.eat(types_1.TokenType.colon);
          let value = this.expr();
          pairs.push({
            key,
            value
          });
          while (this.currentToken.type === types_1.TokenType.comma) {
            this.eat(types_1.TokenType.comma);
            let key2 = this.expr();
            this.eat(types_1.TokenType.colon);
            let value2 = this.expr();
            pairs.push({
              key: key2,
              value: value2
            });
          }
          this.eat(types_1.TokenType.closeBrace);
        } catch (err) {
          error = true;
        }
        const end = error ? this.currentToken.start : this.currentToken.end;
        return {
          errors: error,
          value: {
            Pairs: pairs,
            offrange: new asttypes_1.Offrange(start, end)
          }
        };
      }
      array() {
        const start = this.currentToken.start;
        let error = false;
        let items = [];
        this.eat(types_1.TokenType.openBracket);
        try {
          let item = this.expr();
          items.push(item);
          while (this.currentToken.type === types_1.TokenType.comma) {
            this.eat(types_1.TokenType.comma);
            item = this.expr();
            items.push(item);
          }
          this.eat(types_1.TokenType.closeBracket);
        } catch (err) {
          error = true;
        }
        const end = error ? this.currentToken.start : this.currentToken.end;
        return {
          errors: error,
          value: {
            items,
            offrange: new asttypes_1.Offrange(start, end)
          }
        };
      }
      classNew() {
        this.eat(types_1.TokenType.new);
        const token = this.currentToken;
        if (this.tokenizer.currChar === "(") {
          let node = this.funcCall();
          return {
            errors: node.errors,
            value: new asttypes_1.MethodCall("__New", node.value.actualParams, node.value.token, [node.value.token], node.value.offrange)
          };
        } else if (this.tokenizer.currChar === ".") {
          let node = this.classCall();
          let vnode = node.value;
          vnode.ref.push(vnode.token);
          if (vnode instanceof asttypes_1.MethodCall) {
            return {
              errors: node.errors,
              value: new asttypes_1.MethodCall("__New", vnode.actualParams, vnode.token, vnode.ref, vnode.offrange)
            };
          } else {
            return {
              errors: node.errors,
              value: new asttypes_1.MethodCall(
                "__New",
                [],
                // new like property call does not have parameters
                vnode.token,
                vnode.ref,
                vnode.offrange
              )
            };
          }
        } else {
          if (token.type === types_1.TokenType.id) {
            this.eat(types_1.TokenType.id);
            return {
              errors: false,
              value: new asttypes_1.MethodCall(
                "__New",
                [],
                // new like property call does not have parameters
                token,
                [token],
                new asttypes_1.Offrange(token.start, token.end)
              )
            };
          } else {
            return {
              errors: true,
              value: new asttypes_1.MethodCall(
                "__New",
                [],
                // new like property call does not have parameters
                types_1.createToken(types_1.TokenType.unknown, "", token.start, token.end),
                [],
                new asttypes_1.Offrange(token.start, token.end)
              )
            };
          }
        }
      }
      // For this is simple parser, we don't care about operator level
      factor() {
        let token = this.currentToken;
        let node;
        switch (this.currentToken.type) {
          case types_1.TokenType.string:
          case types_1.TokenType.number:
            return this.literal();
          case types_1.TokenType.plus:
          case types_1.TokenType.minus:
            this.eat(this.currentToken.type);
            let exp = this.expr();
            return {
              errors: false,
              value: {
                operator: token,
                expr: exp,
                offrange: new asttypes_1.Offrange(token.start, exp.value.offrange.end)
              }
            };
          case types_1.TokenType.new:
            return this.classNew();
          case types_1.TokenType.openParen:
            this.eat(types_1.TokenType.openParen);
            node = this.expr();
            this.eat(types_1.TokenType.closeParen);
            return node;
          case types_1.TokenType.openBracket:
            return this.array();
          case types_1.TokenType.openBrace:
            return this.associativeArray();
          default:
            switch (this.tokenizer.currChar) {
              case "(":
                node = this.funcCall();
                break;
              case ".":
                node = this.classCall();
                break;
              default:
                node = this.variable();
                break;
            }
            return node;
        }
      }
      expr() {
        try {
          let left = this.factor();
          let node = {
            errors: left.errors,
            value: left.value
          };
          while (this.currentToken.type >= types_1.TokenType.number && // all allowed operator
          this.currentToken.type <= types_1.TokenType.less || this.currentToken.type === types_1.TokenType.dot || this.currentToken.type === types_1.TokenType.unknown) {
            let token = this.currentToken;
            if (this.currentToken.type >= types_1.TokenType.number && this.currentToken.type <= types_1.TokenType.id) {
              token = {
                content: "",
                type: types_1.TokenType.unknown,
                start: this.currentToken.start,
                end: this.currentToken.start
              };
            }
            if (this.currentToken.type === types_1.TokenType.question) {
              this.eat(types_1.TokenType.question);
              const right2 = this.expr();
              try {
                this.eat(types_1.TokenType.colon);
              } finally {
                node = {
                  errors: right2.errors,
                  value: {
                    left,
                    operator: token,
                    right: right2,
                    offrange: new asttypes_1.Offrange(token.start, right2.value.offrange.end)
                  }
                };
              }
            }
            this.eat(this.currentToken.type);
            const right = this.expr();
            node = {
              errors: right.errors,
              value: {
                left,
                operator: token,
                right,
                offrange: new asttypes_1.Offrange(token.start, right.value.offrange.end)
              }
            };
          }
          return node;
        } catch (err) {
          return {
            errors: true,
            value: new asttypes_1.NoOption(new asttypes_1.Offrange(this.currentToken.start, this.currentToken.end))
          };
        }
      }
      assignment() {
        let left;
        if (this.tokenizer.currChar === ".") {
          left = this.classCall();
        }
        left = this.variable();
        let isWrong = false;
        let token = this.currentToken;
        if (this.currentToken.type === types_1.TokenType.aassign) {
          this.eat(types_1.TokenType.aassign);
        }
        try {
          this.eat(types_1.TokenType.equal);
        } catch (err) {
          isWrong = true;
        }
        let exprNode = this.expr();
        return {
          errors: isWrong,
          value: {
            left,
            operator: token,
            right: exprNode,
            offrange: new asttypes_1.Offrange(token.start, exprNode.value.offrange.end)
          }
        };
      }
      commandCall() {
        let token = this.currentToken;
        let cmdName = token.content;
        let iserror = false;
        this.eat(types_1.TokenType.command);
        let actualParams = [];
        while (this.currentToken.type === types_1.TokenType.comma) {
          this.tokenizer.setLiteralDeref(false);
          this.eat(types_1.TokenType.comma);
          actualParams.push(this.expr());
        }
        const end = this.currentToken.end;
        return {
          errors: iserror,
          value: new asttypes_1.CommandCall(cmdName, actualParams, token, new asttypes_1.Offrange(token.start, end))
        };
      }
      funcCall() {
        let token = this.currentToken;
        let funcName = token.content;
        let iserror = false;
        this.eat(types_1.TokenType.id);
        this.eat(types_1.TokenType.openParen);
        let actualParams = [];
        if (this.currentToken.type !== types_1.TokenType.closeParen) {
          actualParams.push(this.expr());
        }
        while (this.currentToken.type === types_1.TokenType.comma) {
          this.eat(types_1.TokenType.comma);
          actualParams.push(this.expr());
        }
        const end = this.currentToken.end;
        try {
          this.eat(types_1.TokenType.closeParen);
        } catch (err) {
          iserror = true;
        }
        return {
          errors: iserror,
          value: new asttypes_1.FunctionCall(funcName, actualParams, token, new asttypes_1.Offrange(token.start, end))
        };
      }
      classCall() {
        let classref = [this.currentToken];
        this.eat(types_1.TokenType.id);
        this.eat(types_1.TokenType.dot);
        while (this.currentToken.type === types_1.TokenType.id && this.tokenizer.currChar === ".") {
          classref.push(this.currentToken);
          this.eat(types_1.TokenType.id);
          this.eat(types_1.TokenType.dot);
        }
        let token = this.currentToken;
        if (this.currentToken.type === types_1.TokenType.id) {
          if (this.tokenizer.currChar === "(") {
            let callNode = this.funcCall();
            callNode.value.offrange.start = classref[0].start;
            return {
              errors: callNode.errors,
              value: new asttypes_1.MethodCall(callNode.value.name, callNode.value.actualParams, callNode.value.token, classref, callNode.value.offrange)
            };
          }
          this.eat(types_1.TokenType.id);
          return {
            errors: false,
            value: new asttypes_1.PropertCall(token.content, token, classref, new asttypes_1.Offrange(classref[0].start, token.end))
          };
        }
        return {
          errors: true,
          value: new asttypes_1.PropertCall(this.currentToken.content, this.currentToken, classref, new asttypes_1.Offrange(classref[0].start, token.end))
        };
      }
      statement() {
        while (this.currentToken.type !== types_1.TokenType.id && this.currentToken.type !== types_1.TokenType.command) {
          if (this.currentToken.type === types_1.TokenType.EOF) {
            return void 0;
          }
          this.eat(this.currentToken.type);
        }
        switch (this.currentToken.type) {
          case types_1.TokenType.id:
            if (this.tokenizer.currChar === "(") {
              return this.funcCall();
            } else if (this.tokenizer.currChar === ".") {
              let left = this.classCall();
              if (left.value instanceof asttypes_1.PropertCall && this.inType(this.currentToken.type, [
                types_1.TokenType.equal,
                types_1.TokenType.aassign
              ])) {
                let token = this.currentToken;
                this.eat(this.currentToken.type);
                let exprNode = this.expr();
                return {
                  errors: false,
                  value: {
                    left,
                    operator: token,
                    right: exprNode,
                    offrange: new asttypes_1.Offrange(left.value.offrange.start, exprNode.value.offrange.end)
                  }
                };
              }
              return left;
            } else {
              return this.assignment();
            }
          case types_1.TokenType.command:
            return this.commandCall();
        }
      }
    };
    exports2.SemanticStack = SemanticStack;
  }
});

// out/services/ioService.js
var require_ioService = __commonJS({
  "out/services/ioService.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IoService = exports2.IoKind = void 0;
    var fs_1 = require("fs");
    var path_1 = require("path");
    var IoKind;
    (function(IoKind2) {
      IoKind2[IoKind2["file"] = 0] = "file";
      IoKind2[IoKind2["folder"] = 1] = "folder";
    })(IoKind = exports2.IoKind || (exports2.IoKind = {}));
    function readFileAsync(path, encoding) {
      return new Promise((resolve, reject) => {
        fs_1.readFile(path, { encoding }, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
    }
    var IoService = class {
      constructor() {
      }
      /**
       * Load a file from a given path
       * @param path the system path
       */
      load(path) {
        return readFileAsync(path, "utf-8");
      }
      fileExistsSync(path) {
        return fs_1.existsSync(path) && fs_1.lstatSync(path).isFile();
      }
      /**
       * What entities are in the relevant directory
       * @param path The full path of the request
       */
      statDirectory(path) {
        const isDirectory = fs_1.existsSync(path) && fs_1.lstatSync(path).isDirectory();
        if (!isDirectory) {
          return [];
        }
        const directory = path;
        if (!fs_1.existsSync(directory)) {
          return [];
        }
        const files = fs_1.readdirSync(directory);
        let entities = [];
        for (const file of files) {
          const path2 = path_1.join(directory, file);
          try {
            entities.push({
              path: file,
              kind: fs_1.statSync(path2).isDirectory() ? IoKind.folder : IoKind.file
            });
          } catch (error) {
            continue;
          }
        }
        return entities;
      }
    };
    exports2.IoService = IoService;
  }
});

// out/parser/regParser/scriptFinder.js
var require_scriptFinder = __commonJS({
  "out/parser/regParser/scriptFinder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NodeMatcher = exports2.ScriptFinder = void 0;
    var vscode_languageserver_types_1 = require_main2();
    var types_1 = require_types();
    var ScriptFinder = class {
      constructor(cond, syntaxNode, uri, includeTree) {
        this.pos = 0;
        this.issuffix = false;
        let Trees = [{
          nodes: syntaxNode,
          uri
        }].concat(includeTree);
        this.Trees = Trees;
        this.uri = uri;
        this.cond = cond;
      }
      /**
       * return if we need to search on deep node
       */
      needDeep() {
        this.pos++;
        if (this.pos >= this.cond.length)
          return false;
        else
          return true;
      }
      searchDeep(nodes) {
        for (const node of nodes) {
          let n = this.visit(node);
          if (n)
            return n;
        }
        return void 0;
      }
      visit(node) {
        if (node instanceof types_1.FuncNode)
          return this.visitFunc(node);
        if (node instanceof types_1.ClassNode)
          return this.visitClass(node);
        if (node instanceof types_1.VariableNode)
          return this.visitVar(node);
        return void 0;
      }
      visitFunc(node) {
        if (this.cond[this.pos].match(node)) {
          if (this.needDeep()) {
            if (node.subnode)
              return this.searchDeep(node.subnode);
            return void 0;
          }
          return node;
        }
        return void 0;
      }
      visitClass(node) {
        if (this.cond[this.pos].match(node)) {
          if (this.needDeep()) {
            if (node.subnode)
              return this.searchDeep(node.subnode);
            return void 0;
          }
          return node;
        }
        return void 0;
      }
      visitVar(node) {
        if (this.cond[this.pos].match(node)) {
          if (this.needDeep() || this.issuffix) {
            if (node.refname) {
              this.cond = this.cond.slice(this.pos);
              this.cond.unshift(new NodeMatcher(node.refname, vscode_languageserver_types_1.SymbolKind.Class));
              this.pos = 0;
              let temp = this.find();
              if (!temp)
                return void 0;
              this.uri = temp.uri;
              return temp.node;
            }
            return this.issuffix ? node : void 0;
          }
          return node;
        }
        return void 0;
      }
      find(issuffix = false) {
        this.issuffix = issuffix;
        for (const tree of this.Trees) {
          this.uri = tree.uri;
          for (const node of tree.nodes) {
            let n = this.visit(node);
            if (n)
              return {
                node: n,
                uri: this.uri
              };
          }
        }
        return void 0;
      }
    };
    exports2.ScriptFinder = ScriptFinder;
    var NodeMatcher = class {
      constructor(name, kind) {
        this.name = name;
        this.kind = kind;
      }
      /**
       * check if node matches the conditions
       * @param node node to match
       */
      match(node) {
        return this.kind ? node.name.toLowerCase() === this.name.toLowerCase() && node.kind === this.kind : node.name.toLowerCase() === this.name.toLowerCase();
      }
    };
    exports2.NodeMatcher = NodeMatcher;
  }
});

// out/services/treeManager.js
var require_treeManager = __commonJS({
  "out/services/treeManager.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TreeManager = void 0;
    var vscode_languageserver_12 = require_main4();
    var vscode_languageserver_textdocument_12 = require_main5();
    var vscode_uri_1 = require_umd();
    var types_1 = require_types();
    var asttypes_1 = require_asttypes();
    var semantic_stack_1 = require_semantic_stack();
    var constants_12 = require_constants();
    var path_1 = require("path");
    var os_1 = require("os");
    var ahkparser_12 = require_ahkparser();
    var ioService_1 = require_ioService();
    var scriptFinder_1 = require_scriptFinder();
    function isFuncNode(node) {
      return typeof node["params"] !== "undefined";
    }
    function setDiffSet(set1, set2) {
      let d12 = [], d21 = [];
      for (let item of set1) {
        if (!set2.has(item)) {
          d12.push(item);
        }
      }
      for (let item of set2) {
        if (!set1.has(item)) {
          d21.push(item);
        }
      }
      return [d12, d21];
    }
    var TreeManager = class {
      constructor(logger2) {
        this.serverDocs = /* @__PURE__ */ new Map();
        this.docsAST = /* @__PURE__ */ new Map();
        this.localAST = /* @__PURE__ */ new Map();
        this.incInfos = /* @__PURE__ */ new Map();
        this.ioService = new ioService_1.IoService();
        this.builtinFunction = constants_12.buildBuiltinFunctionNode();
        this.builtinCommand = constants_12.buildBuiltinCommandNode();
        this.serverConfigDoc = void 0;
        this.currentDocUri = "";
        this.SLibDir = "C:\\Program Files\\AutoHotkey\\Lib";
        this.ULibDir = os_1.homedir() + "\\Documents\\AutoHotkey\\Lib";
        this.logger = logger2;
      }
      /**
       * Initialize information of a just open document
       * @param uri Uri of initialized document
       * @param docinfo AST of initialized document
       * @param doc TextDocument of initialized documnet
       */
      initDocument(uri, docinfo, doc) {
        this.currentDocUri = uri;
        this.updateDocumentAST(uri, docinfo, doc);
      }
      /**
       * Select a document for next steps. For provide node infomation of client requests
       * @param uri Uri of document to be selected
       */
      selectDocument(uri) {
        this.currentDocUri = this.serverDocs.has(uri) ? uri : "";
        return this;
      }
      /**
       * Update infomation of a given document, will automatic load its includes
       * @param uri Uri of updated document
       * @param docinfo AST of updated document
       * @param doc TextDocument of update documnet
       */
      async updateDocumentAST(uri, docinfo, doc) {
        var _a, _b;
        this.serverDocs.set(uri, doc);
        const oldInclude = (_a = this.docsAST.get(uri)) === null || _a === void 0 ? void 0 : _a.include;
        let useneed, useless;
        this.docsAST.set(uri, docinfo);
        if (oldInclude) {
          [useless, useneed] = setDiffSet(oldInclude, docinfo.include);
        } else {
          useneed = docinfo.include;
          useless = [];
        }
        let incInfo = this.incInfos.get(doc.uri);
        if (incInfo) {
          let tempInfo = [];
          for (const uri2 of useless) {
            for (const [abs, raw] of incInfo) {
              if (raw === uri2)
                tempInfo.push(abs);
            }
          }
          for (const abs of tempInfo)
            incInfo.delete(abs);
        }
        let incQueue = [...useneed];
        let path = incQueue.shift();
        while (path) {
          const docDir = path_1.dirname(vscode_uri_1.URI.parse(this.currentDocUri).fsPath);
          let p = this.include2Path(path, docDir);
          if (!p) {
            path = incQueue.shift();
            continue;
          }
          const doc2 = await this.loadDocumnet(p);
          if (doc2) {
            let lexer = new ahkparser_12.Lexer(doc2, this.logger);
            this.serverDocs.set(doc2.uri, doc2);
            let incDocInfo = lexer.Parse();
            this.localAST.set(doc2.uri, incDocInfo);
            if (this.incInfos.has(uri))
              (_b = this.incInfos.get(uri)) === null || _b === void 0 ? void 0 : _b.set(p, path);
            else
              this.incInfos.set(uri, /* @__PURE__ */ new Map([[p, path]]));
            incQueue.push(...Array.from(incDocInfo.include));
          }
          path = incQueue.shift();
        }
      }
      /**
       * Load and parse a set of documents. Used for process ahk includes
       * @param documnets A set of documents' uri to be loaded and parsed
       */
      async loadDocumnet(path) {
        const uri = vscode_uri_1.URI.file(path);
        try {
          const c = await this.retrieveResource(uri);
          let document = vscode_languageserver_textdocument_12.TextDocument.create(uri.toString(), "ahk", 0, c);
          return document;
        } catch (err) {
          return void 0;
        }
      }
      deleteUnusedDocument(uri) {
        let incinfo = this.incInfos.get(uri);
        this.docsAST.delete(uri);
        this.incInfos.delete(uri);
        if (incinfo) {
          for (const [path, raw] of incinfo) {
            let isUseless = true;
            for (const [docuri, docinc] of this.incInfos) {
              if (docinc.has(path)) {
                isUseless = false;
                break;
              }
            }
            if (isUseless)
              this.localAST.delete(vscode_uri_1.URI.file(path).toString());
          }
        }
      }
      /**
      * Retrieve a resource from the provided uri
      * @param uri uri to load resources from
      */
      retrieveResource(uri) {
        const path = uri.fsPath;
        return this.ioService.load(path);
      }
      /**
       * Return a line of text up to the given position
       * @param position position of end mark
       */
      LineTextToPosition(position) {
        var _a;
        if (this.currentDocUri) {
          return (_a = this.serverDocs.get(this.currentDocUri)) === null || _a === void 0 ? void 0 : _a.getText(vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(position.line, 0), position)).trimRight();
        }
      }
      /**
       * Return the text of a given line
       * @param line line number
       */
      getLine(line) {
        var _a;
        if (this.currentDocUri) {
          return (_a = this.serverDocs.get(this.currentDocUri)) === null || _a === void 0 ? void 0 : _a.getText(vscode_languageserver_12.Range.create(vscode_languageserver_12.Position.create(line, 0), vscode_languageserver_12.Position.create(line + 1, 0))).trimRight();
        }
      }
      include2Path(rawPath, scriptPath) {
        const scriptDir = scriptPath;
        const normalized = path_1.normalize(rawPath);
        switch (path_1.extname(normalized)) {
          case ".ahk":
            if (path_1.dirname(normalized)[0] === ".")
              return path_1.normalize(scriptDir + "\\" + normalized);
            else
              return normalized;
          case "":
            if (rawPath[0] === "<" && rawPath[rawPath.length - 1] === ">") {
              let searchDir = [];
              const np = path_1.normalize(rawPath.slice(1, rawPath.length - 1) + ".ahk");
              const dir = path_1.normalize(scriptDir + "\\Lib\\" + np);
              const ULibDir = path_1.normalize(this.ULibDir + "\\" + np);
              const SLibDir = path_1.normalize(this.SLibDir + "\\" + np);
              searchDir.push(dir, ULibDir, SLibDir);
              for (const d of searchDir) {
                if (this.ioService.fileExistsSync(d))
                  return d;
              }
            }
            return void 0;
          default:
            return void 0;
        }
      }
      /**
       * A simple(vegetable) way to get all include AST of a document
       * @returns SymbolNode[]-ASTs, document uri
       */
      allIncludeTreeinfomation() {
        const docinfo = this.docsAST.get(this.currentDocUri);
        if (!docinfo)
          return void 0;
        const incInfo = this.incInfos.get(this.currentDocUri) || [];
        let r = [];
        for (const [path, raw] of incInfo) {
          const uri = vscode_uri_1.URI.file(path).toString();
          const incDocInfo = this.localAST.get(uri);
          if (incDocInfo) {
            r.push({
              nodes: incDocInfo.tree,
              uri
            });
          }
        }
        return r;
      }
      /**
       * Return the AST of current select document
       */
      getTree() {
        var _a;
        if (this.currentDocUri)
          return (_a = this.docsAST.get(this.currentDocUri)) === null || _a === void 0 ? void 0 : _a.tree;
        else
          return [];
      }
      /**
       * Returns a string in the form of the function node's definition
       * @param symbol Function node to be converted
       * @param cmdFormat If ture, return in format of command
       */
      getFuncPrototype(symbol, cmdFormat = false) {
        const paramStartSym = cmdFormat ? ", " : "(";
        const paramEndSym = cmdFormat ? "" : ")";
        let result = symbol.name + paramStartSym;
        symbol.params.map((param, index, array) => {
          result += param.name;
          if (param.isOptional)
            result += "[Optional]";
          if (param.defaultVal)
            result += " := " + param.defaultVal;
          if (array.length - 1 !== index)
            result += ", ";
        });
        return result + paramEndSym;
      }
      convertParamsCompletion(node) {
        if (node.kind === vscode_languageserver_12.SymbolKind.Function) {
          let params = node.params;
          return params.map((param) => {
            let pc = vscode_languageserver_12.CompletionItem.create(param.name);
            pc.kind = vscode_languageserver_12.CompletionItemKind.Variable;
            pc.detail = "(parameter) " + param.name;
            return pc;
          });
        }
        return [];
      }
      getGlobalCompletion() {
        var _a;
        let incCompletion = [];
        let docinfo;
        if (this.currentDocUri)
          docinfo = this.docsAST.get(this.currentDocUri);
        if (!docinfo)
          return [];
        const incInfo = this.incInfos.get(this.currentDocUri) || [];
        for (let [path, raw] of incInfo) {
          const incUri = vscode_uri_1.URI.file(path).toString();
          const tree = (_a = this.localAST.get(incUri)) === null || _a === void 0 ? void 0 : _a.tree;
          if (tree) {
            incCompletion.push(...tree.map((node) => {
              let c = this.convertNodeCompletion(node);
              c.data += "  \nInclude from " + raw;
              return c;
            }));
          }
        }
        return this.getTree().map((node) => this.convertNodeCompletion(node)).concat(this.builtinFunction.map((node) => {
          let ci = vscode_languageserver_12.CompletionItem.create(node.name);
          ci.data = this.getFuncPrototype(node);
          ci.kind = vscode_languageserver_12.CompletionItemKind.Function;
          return ci;
        })).concat(this.builtinCommand.map((node) => {
          let ci = vscode_languageserver_12.CompletionItem.create(node.name);
          ci.data = this.getFuncPrototype(node, true);
          ci.kind = vscode_languageserver_12.CompletionItemKind.Function;
          return ci;
        })).concat(incCompletion);
      }
      getScopedCompletion(pos) {
        let node = this.searchNodeAtPosition(pos, this.getTree());
        if (node && node.subnode) {
          return node.subnode.map((node2) => {
            return this.convertNodeCompletion(node2);
          }).concat(...this.convertParamsCompletion(node));
        } else {
          return [];
        }
      }
      includeDirCompletion(position) {
        const context = this.LineTextToPosition(position);
        const reg = /^\s*#include/i;
        if (!context)
          return void 0;
        let match = context.match(reg);
        if (!match)
          return void 0;
        const p = context.slice(match[0].length).trim();
        const docDir = path_1.dirname(vscode_uri_1.URI.parse(this.currentDocUri).fsPath);
        let searchDir = [];
        if (p[0] === "<") {
          const np = path_1.normalize(p.slice(1));
          const dir = path_1.normalize(docDir + "\\Lib\\" + np);
          const ULibDir = path_1.normalize(this.ULibDir + "\\" + np);
          const SLibDir = path_1.normalize(this.SLibDir + "\\" + np);
          searchDir.push(dir, ULibDir, SLibDir);
        } else {
          const dir = path_1.normalize(docDir + "\\" + path_1.normalize(p));
          searchDir.push(dir);
        }
        let completions = [];
        for (const dir of searchDir) {
          completions.push(...this.ioService.statDirectory(dir));
          if (completions.length > 0 && p !== "<")
            break;
        }
        return completions.map((completion) => {
          let c = vscode_languageserver_12.CompletionItem.create(completion.path);
          c.kind = completion.kind === ioService_1.IoKind.folder ? vscode_languageserver_12.CompletionItemKind.Folder : vscode_languageserver_12.CompletionItemKind.File;
          return c;
        });
      }
      /**
       * All words at a given position(top scope at last)
       * @param position
       */
      getLexemsAtPosition(position) {
        const context = this.getLine(position.line);
        if (!context)
          return void 0;
        let suffix = this.getWordAtPosition(position);
        let perfixs = [];
        let temppos = suffix.name === "" ? position.character - 1 : (
          // we need pre-character of empty suffix
          suffix.range.start.character - 1
        );
        while (this.getChar(context, temppos) === ".") {
          let word = this.getWordAtPosition(vscode_languageserver_12.Position.create(position.line, temppos - 1));
          perfixs.push(word.name);
          temppos = word.range.start.character - 1;
        }
        return [suffix.name].concat(perfixs);
      }
      /**
       * Get all nodes of a particular token.
       * return all possible nodes or empty list
       * @param position
       */
      getSuffixNodes(position) {
        let lexems = this.getLexemsAtPosition(position);
        if (!lexems)
          return void 0;
        return this.searchSuffix(lexems.slice(1), position);
      }
      /**
       * Get suffixs list of a given perfixs list
       * @param perfixs perfix list for search(top scope at last)
       */
      searchSuffix(perfixs, position) {
        if (!perfixs.length)
          return void 0;
        const find = this.searchNode(perfixs, position, true);
        if (!find)
          return void 0;
        const node = find.nodes[0];
        if (!node.subnode)
          return void 0;
        return {
          nodes: node.subnode,
          uri: find.uri
        };
      }
      /**
       * Get node of position and lexems
       * @param lexems all words strings(这次call，全部的分割词)
       * @param position position of qurey word(这个call的位置)
       */
      searchNode(lexems, position, issuffix = false) {
        let currTreeUri = this.currentDocUri;
        let nodeList = this.getTree();
        let incTreeMap = this.allIncludeTreeinfomation();
        if (lexems[lexems.length - 1] === "this") {
          let classNode = this.searchNodeAtPosition(position, this.getTree(), vscode_languageserver_12.SymbolKind.Class);
          if (classNode) {
            lexems[lexems.length - 1] = classNode.name;
            if (!lexems.length)
              return {
                nodes: [classNode],
                uri: currTreeUri
              };
          } else {
            return void 0;
          }
        }
        if (!nodeList)
          return void 0;
        let cond = [];
        lexems = lexems.reverse();
        for (const lexem of lexems) {
          cond.push(new scriptFinder_1.NodeMatcher(lexem));
        }
        let finder = new scriptFinder_1.ScriptFinder(cond, nodeList, currTreeUri, incTreeMap ? incTreeMap : []);
        let result = finder.find(issuffix);
        if (result) {
          return {
            nodes: [result.node],
            uri: result.uri
          };
        }
        return void 0;
      }
      /**
       * search at given tree to
       * find the deepest node that
       * covers the given condition
       *
       * @param pos position to search
       * @param tree AST tree for search
       * @param kind symbol kind of search item
       */
      searchNodeAtPosition(pos, tree, kind) {
        for (const node of tree) {
          if (pos.line > node.range.start.line && pos.line < node.range.end.line) {
            if (node.subnode) {
              if (kind && !(node.kind === kind)) {
                continue;
              }
              let subScopedNode = this.searchNodeAtPosition(pos, node.subnode, kind);
              if (subScopedNode) {
                return subScopedNode;
              } else {
                return node;
              }
            }
          }
        }
        return void 0;
      }
      /**
       * Convert a node to comletion item
       * @param info node to be converted
       */
      convertNodeCompletion(info) {
        let ci = vscode_languageserver_12.CompletionItem.create(info.name);
        if (isFuncNode(info)) {
          ci["kind"] = vscode_languageserver_12.CompletionItemKind.Function;
          ci.data = this.getFuncPrototype(info);
        } else if (info.kind === vscode_languageserver_12.SymbolKind.Variable) {
          ci.kind = vscode_languageserver_12.CompletionItemKind.Variable;
        } else if (info.kind === vscode_languageserver_12.SymbolKind.Class) {
          ci["kind"] = vscode_languageserver_12.CompletionItemKind.Class;
          ci.data = "";
        } else if (info.kind === vscode_languageserver_12.SymbolKind.Event) {
          ci["kind"] = vscode_languageserver_12.CompletionItemKind.Event;
        } else if (info.kind === vscode_languageserver_12.SymbolKind.Null) {
          ci["kind"] = vscode_languageserver_12.CompletionItemKind.Text;
        }
        return ci;
      }
      getFuncAtPosition(position) {
        let context = this.LineTextToPosition(position);
        if (!context)
          return void 0;
        const attachToPreviousTest = new RegExp("^[ 	]*,");
        if (attachToPreviousTest.test(context)) {
          let linenum = position.line - 1;
          let lines = this.getLine(linenum);
          context = lines + context;
          while (lines) {
            if (attachToPreviousTest.test(lines)) {
              linenum -= 1;
              lines = this.getLine(linenum);
              context = lines + context;
            } else
              lines = void 0;
          }
        }
        let stmtStack = new semantic_stack_1.SemanticStack(context);
        let stmt;
        try {
          stmt = stmtStack.statement();
        } catch (err) {
          return void 0;
        }
        if (!stmt) {
          return void 0;
        }
        let perfixs = [];
        let node = stmt;
        if (semantic_stack_1.isExpr(stmt.value)) {
          node = stmt.value.right;
          while (semantic_stack_1.isExpr(node.value)) {
            node = node.value.right;
          }
        }
        stmt = node;
        if (stmt.value instanceof asttypes_1.FunctionCall) {
          if (!stmt.errors && !(stmt.value instanceof asttypes_1.CommandCall)) {
            return void 0;
          }
          let lastnode = this.getUnfinishedFunc(stmt.value);
          if (!lastnode) {
            lastnode = stmt.value;
          }
          if (lastnode instanceof asttypes_1.MethodCall) {
            perfixs = lastnode.ref.map((r) => {
              return r.content;
            });
          }
          const funcName = lastnode.name;
          let index = lastnode.actualParams.length === 0 ? lastnode.actualParams.length : lastnode.actualParams.length - 1;
          if (lastnode instanceof asttypes_1.CommandCall) {
            const bfind = arrayFilter(this.builtinCommand, (item) => item.name.toLowerCase() === funcName.toLowerCase());
            if (!bfind)
              return void 0;
            return {
              func: bfind,
              index,
              isCmd: true
            };
          }
          let find = this.searchNode([funcName].concat(...perfixs.reverse()), position);
          if (!find) {
            const bfind = arrayFilter(this.builtinFunction, (item) => item.name.toLowerCase() === funcName.toLowerCase());
            if (!bfind)
              return void 0;
            return {
              func: bfind,
              index,
              isCmd: false
            };
          }
          return {
            func: find.nodes[0],
            index,
            isCmd: false
          };
        }
      }
      /**
       * Find the deepest unfinished Function of a AST node
       * @param node Node to be found
       */
      getUnfinishedFunc(node) {
        let perfixs;
        let lastParam = node.actualParams[node.actualParams.length - 1];
        if (!lastParam || !lastParam.errors) {
          return void 0;
        }
        if (lastParam.value instanceof asttypes_1.FunctionCall) {
          let lastnode = this.getUnfinishedFunc(lastParam.value);
          if (lastnode) {
            if (node instanceof asttypes_1.FunctionCall) {
              return lastnode;
            }
          }
          return lastParam.value;
        }
        return node;
      }
      getDefinitionAtPosition(position) {
        let lexems = this.getLexemsAtPosition(position);
        if (!lexems)
          return [];
        let find = this.searchNode(lexems, position);
        if (!find)
          return [];
        let locations = [];
        for (const node of find.nodes) {
          locations.push(vscode_languageserver_12.Location.create(find.uri, node.range));
        }
        return locations;
      }
      getWordAtPosition(position) {
        let reg = /[a-zA-Z0-9\u4e00-\u9fa5#_@\$\?]+/;
        const context = this.getLine(position.line);
        if (!context)
          return types_1.Word.create("", vscode_languageserver_12.Range.create(position, position));
        let wordName;
        let start;
        let end;
        let pos;
        pos = position.character;
        while (pos >= 0) {
          if (reg.test(this.getChar(context, pos - 1)))
            pos -= 1;
          else
            break;
        }
        start = vscode_languageserver_12.Position.create(position.line, pos);
        pos = position.character;
        while (pos <= context.length) {
          if (reg.test(this.getChar(context, pos)))
            pos += 1;
          else
            break;
        }
        end = vscode_languageserver_12.Position.create(position.line, pos);
        wordName = context.slice(start.character, end.character);
        return types_1.Word.create(wordName, vscode_languageserver_12.Range.create(start, end));
      }
      getChar(context, pos) {
        try {
          return context[pos] ? context[pos] : "";
        } catch (err) {
          return "";
        }
      }
      getReference() {
        var _a;
        if (this.currentDocUri) {
          const ref = (_a = this.docsAST.get(this.currentDocUri)) === null || _a === void 0 ? void 0 : _a.refTable;
          if (ref)
            return ref;
        }
        return /* @__PURE__ */ new Map();
      }
    };
    exports2.TreeManager = TreeManager;
    function arrayFilter(list, callback) {
      for (const item of list) {
        if (callback(item))
          return item;
      }
      return void 0;
    }
  }
});

// out/server.js
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_1 = require_main4();
var vscode_languageserver_textdocument_1 = require_main5();
var constants_1 = require_constants();
var builtins_1 = require_builtins();
var ahkparser_1 = require_ahkparser();
var treeManager_1 = require_treeManager();
var logger_1 = require_logger();
var connection = vscode_languageserver_1.createConnection(vscode_languageserver_1.ProposedFeatures.all);
var documents = new vscode_languageserver_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
var hasConfigurationCapability = false;
var hasWorkspaceFolderCapability = false;
var hasDiagnosticRelatedInformationCapability = false;
var logger = new logger_1.Logger(connection.console);
var keyWordCompletions = constants_1.buildKeyWordCompletions();
var builtinVariableCompletions = constants_1.buildbuiltin_variable();
var DOCManager = new treeManager_1.TreeManager(logger);
connection.onInitialize((params) => {
  let capabilities = params.capabilities;
  hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
  hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
  hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument && capabilities.textDocument.publishDiagnostics && capabilities.textDocument.publishDiagnostics.relatedInformation);
  const result = {
    serverInfo: {
      // The name of the server as defined by the server.
      name: constants_1.languageServer
    },
    capabilities: {
      textDocumentSync: vscode_languageserver_1.TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion.
      // `/` and `<` is only used for include compeltion
      completionProvider: {
        resolveProvider: true,
        triggerCharacters: [".", "/", "<"]
      },
      signatureHelpProvider: {
        triggerCharacters: ["(", ","]
      },
      documentSymbolProvider: true,
      definitionProvider: true
    }
  };
  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true
      }
    };
  }
  return result;
});
connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    connection.client.register(vscode_languageserver_1.DidChangeConfigurationNotification.type, void 0);
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {
      connection.console.log("Workspace folder change event received.");
    });
  }
});
var docLangName;
(function(docLangName2) {
  docLangName2["CN"] = "CN";
  docLangName2["NO"] = "no";
})(docLangName || (docLangName = {}));
var defaultSettings = {
  maxNumberOfProblems: 1e3,
  documentLanguage: docLangName.NO
};
var globalSettings = defaultSettings;
var documentSettings = /* @__PURE__ */ new Map();
connection.onDidChangeConfiguration((change) => {
  if (hasConfigurationCapability) {
    documentSettings.clear();
  } else {
    globalSettings = change.settings.languageServerExample || defaultSettings;
  }
  documents.all().forEach(validateTextDocument);
});
function getDocumentSettings(resource) {
  if (!hasConfigurationCapability) {
    return Promise.resolve(globalSettings);
  }
  let result = documentSettings.get(resource);
  if (!result) {
    result = connection.workspace.getConfiguration({
      scopeUri: resource,
      section: "AutohotkeyLanguageServer"
    });
    documentSettings.set(resource, result);
  }
  return result;
}
function flatTree(tree) {
  let result = [];
  tree.map((info) => {
    if (info.range.start.line !== -1)
      result.push(info);
    if (info.subnode)
      result.push(...flatTree(info.subnode));
  });
  return result;
}
connection.onDocumentSymbol((params) => {
  const tree = DOCManager.selectDocument(params.textDocument.uri).getTree();
  return flatTree(tree).map((info) => {
    return vscode_languageserver_1.SymbolInformation.create(info.name, info.kind, info.range, params.textDocument.uri);
  });
});
connection.onSignatureHelp(async (positionParams, cancellation) => {
  const { position } = positionParams;
  const { uri } = positionParams.textDocument;
  if (cancellation.isCancellationRequested) {
    return void 0;
  }
  let info = DOCManager.selectDocument(uri).getFuncAtPosition(position);
  if (info) {
    return {
      signatures: [
        vscode_languageserver_1.SignatureInformation.create(DOCManager.getFuncPrototype(info.func, info.isCmd), void 0, ...info.func.params.map((param) => {
          return vscode_languageserver_1.ParameterInformation.create(param.name);
        }))
      ],
      activeParameter: info.index,
      activeSignature: 0
    };
  } else {
    return void 0;
  }
});
connection.onDefinition(async (params, token) => {
  if (token.isCancellationRequested) {
    return void 0;
  }
  let { position } = params;
  let locations = DOCManager.selectDocument(params.textDocument.uri).getDefinitionAtPosition(position);
  if (locations.length) {
    return locations;
  }
  return void 0;
});
documents.onDidOpen(async (e) => {
  let lexer = new ahkparser_1.Lexer(e.document, logger);
  const docInfo = lexer.Parse();
  DOCManager.initDocument(e.document.uri, docInfo, e.document);
});
documents.onDidClose((e) => {
  documentSettings.delete(e.document.uri);
  DOCManager.deleteUnusedDocument(e.document.uri);
});
documents.onDidChangeContent((change) => {
  let lexer = new ahkparser_1.Lexer(change.document, logger);
  let docAST = lexer.Parse();
  DOCManager.updateDocumentAST(change.document.uri, docAST, change.document);
  validateTextDocument(change.document);
});
async function validateTextDocument(textDocument) {
  let result = await getDocumentSettings(textDocument.uri);
}
connection.onDidChangeWatchedFiles((_change) => {
  connection.console.log("We received an file change event");
});
connection.onCompletion(async (_compeltionParams, token) => {
  if (token.isCancellationRequested) {
    return void 0;
  }
  const { position, textDocument } = _compeltionParams;
  if (_compeltionParams.context && (_compeltionParams.context.triggerCharacter === "/" || _compeltionParams.context.triggerCharacter === "<")) {
    let result2 = DOCManager.selectDocument(textDocument.uri).includeDirCompletion(position);
    if (result2)
      return result2;
    else
      return void 0;
  }
  let result = DOCManager.selectDocument(textDocument.uri).getSuffixNodes(position);
  if (result) {
    return result.nodes.map(DOCManager.convertNodeCompletion.bind(DOCManager));
  }
  return DOCManager.getGlobalCompletion().concat(DOCManager.getScopedCompletion(_compeltionParams.position)).concat(keyWordCompletions).concat(builtinVariableCompletions);
});
connection.onCompletionResolve(async (item) => {
  switch (item.kind) {
    case vscode_languageserver_1.CompletionItemKind.Function:
    case vscode_languageserver_1.CompletionItemKind.Method:
    case vscode_languageserver_1.CompletionItemKind.Class:
      item.detail = item.data;
      break;
    case vscode_languageserver_1.CompletionItemKind.Variable:
      if (item.detail === "Built-in Variable") {
        let uri = documents.all()[0].uri;
        let cfg = await documentSettings.get(uri);
        if ((cfg === null || cfg === void 0 ? void 0 : cfg.documentLanguage) === docLangName.CN)
          item.documentation = {
            kind: "markdown",
            value: builtins_1.builtin_variable[item.data][1]
          };
      }
    default:
      break;
  }
  return item;
});
documents.listen(connection);
connection.listen();
connection.console.log("Starting AHK Server");

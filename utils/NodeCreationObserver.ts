/**
 * https://github.com/soufianesakhi/node-creation-observer-js
 * MIT licensed
 * Copyright (c) 2016 Soufiane Sakhi
 */
let mutationObserver: MutationObserver = null;
let observedNodeAttribute = 'observed';
let listeners: { [key: string]: ListenerContext } = {};
let options = {
  childList: true,
  subtree: true
};

class ListenerContext {
  callbacks: ((element: Element) => void)[];
  removeOnFirstMatch: boolean;
  constructor(removeOnFirstMatch) {
    this.callbacks = [];
    this.removeOnFirstMatch = removeOnFirstMatch == undefined ? false : removeOnFirstMatch;
  }
}

function onMutationCallback() {
  Object.keys(listeners).forEach(function (selector) {
    invokeCallbacks(selector);
  });
}

function invokeCallbacks(selector) {
  // console.log('Invoke callbacks of the selector: ' + selector);
  const callbacks = listeners[selector].callbacks;
  const elements = document.querySelectorAll(selector);
  const newElements = filterNewElements(elements);
  if (newElements.length > 0) {
    if (listeners[selector].removeOnFirstMatch) {
      removeListener(selector);
    }
    // console.log('Number of matched new elements: ' + newElements.length);
    newElements.forEach(function (element) {
      callbacks.forEach(function (callback) {
        callback.call(element, element);
      });
    });
  }
}

function filterNewElements(elements: NodeListOf<Element>): Element[] {
  const newElements: Element[] = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const attr = element.getAttribute(observedNodeAttribute);
    if (attr == null) {
      element.setAttribute(observedNodeAttribute, '1');
      newElements.push(element);
    }
  }
  return newElements;
}

function observe() {
  if (mutationObserver == null) {
    // console.log('Start observing document');
    mutationObserver = new MutationObserver(onMutationCallback);
    mutationObserver.observe(document.documentElement, options);
  }
}

function stopObserving() {
  if (mutationObserver != null) {
    mutationObserver.disconnect();
    mutationObserver = null;
    // console.log('Stopped observing document');
  }
}

export const init = (customObservedNodeAttribute: string) => {
  observedNodeAttribute = customObservedNodeAttribute;
};

export const onCreation = (
  selector: string,
  callback: (element: Element) => void,
  removeOnFirstMatch?: boolean
): (() => void) => {
  if (!listeners[selector]) {
    listeners[selector] = new ListenerContext(removeOnFirstMatch);
  }
  listeners[selector].callbacks.push(callback);
  observe();

  if (document.querySelector(selector) !== null) {
    invokeCallbacks(selector);
  }

  return () => {
    removeListener(selector, callback);
  };
};

function removeListener(selector, callback: (element: Element) => void) {
  // console.log('removing callback of the selector: ' + selector);
  if (listeners[selector]) {
    const callbacks = listeners[selector].callbacks;
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }
  if (listeners[selector].callbacks.length == 0) {
    delete listeners[selector];
  }

  if (Object.keys(listeners).length == 0) {
    stopObserving();
  }
}

export const stop = () => {
  listeners = {};
  stopObserving();
};

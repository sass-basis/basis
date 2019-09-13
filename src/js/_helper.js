'use strict';

export function show(element) {
  element.setAttribute('aria-hidden', 'false');
}

export function hide(element) {
  element.setAttribute('aria-hidden', 'true');
}

export function open(element) {
  element.setAttribute('aria-expanded', 'true');
}

export function close(element) {
  element.setAttribute('aria-expanded', 'false');
}

export function uniqueId(prefix) {
  const random = Math.floor((Math.random() * (9999999 - 1000000)) + 1000000);
  const time   = new Date().getTime();
  const id     = `${prefix}-${time}${random}`;
  return id;
}

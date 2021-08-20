import { createElement } from './utils.js';

export const StylesMixin = (CE, { styles, name }) => {
  const { base } = CE;
  CE.styles = styles;

  return async (el) => {
    // Await 1 tick here preventing this CustomElement error:
    // Uncaught DOMException: Failed to construct 'CustomElement': The result "must not have children"
    await Promise.resolve();

    if (styles) {
      const selector =
        base && base.extends ? `${base.extends}[is="${name}"]` : name;
      const sheet = getStyle(el);
      sheet.firstChild.data += styles(
        selector,
        base && base.styles ? base.styles(selector) : undefined
      );
    }
  };
};

export const css = function (strings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
  return str;
};

export function getStyle(target = document.head) {
  let style = target.querySelector('style');
  if (!style) {
    style = target.insertBefore(createElement('style'), target.firstChild);
    style.innerHTML = ' ';
  }
  return style;
}

export function addCssRule(selector, props = {}) {
  const rule = `${selector}{${Object.keys(props)
    .map((prop) => `${prop}:${cssNumber(props[prop], prop)};`)
    .join('')}}`;
  const sheet = getStyle().sheet;
  return sheet.cssRules[sheet.insertRule(rule, sheet.cssRules.length)];
}

export function deleteCssRule(rule) {
  const sheet = getStyle().sheet;
  const index = cssRuleIndex(rule);
  if (index >= 0) sheet.deleteRule(index);
}

export function cssRuleIndex(rule) {
  const sheet = getStyle().sheet;
  for (let i = 0; i < sheet.cssRules.length; i++) {
    if (sheet.cssRules[i] === rule) return i;
  }
  return -1;
}

export function cssNumber(number, property) {
  if (number === 0 || property === 'z-index' || property === 'opacity') {
    return '' + number;
  }
  if (parseInt(number) + '' == number) number += 'px';
  return number;
}

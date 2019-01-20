/*! (c) Andrea Giammarchi - ISC */
var templateLiteral = (function () {  var RAW = 'raw';
  var isNoOp = typeof document !== 'object';
  var templateLiteral = function (tl) {
    if (
      // for badly transpiled literals
      !(RAW in tl) ||
      // for some version of TypeScript
      tl.propertyIsEnumerable(RAW) ||
      // and some other version of TypeScript
      !Object.isFrozen(tl[RAW]) ||
      (
        // or for Firefox < 55
        /Firefox\/(\d+)/.test(
          (document.defaultView.navigator || {}).userAgent
        ) &&
        parseFloat(RegExp.$1) < 55
      )
    ) {
      var forever = {};
      templateLiteral = function (tl) {
        for (var key = '.', i = 0; i < tl.length; i++)
          key += tl[i].length + '.' + tl[i];
        return forever[key] || (forever[key] = tl);
      };
    } else {
      isNoOp = true;
    }
    return TL(tl);
  };
  return TL;
  function TL(tl) {
    return isNoOp ? tl : templateLiteral(tl);
  }
}());

function tta (template) {
  var length = arguments.length;
  var args = [templateLiteral(template)];
  var i = 1;
  while (i < length)
    args.push(arguments[i++]);
  return args;
}

/*! (c) Andrea Giammarchi - ISC */
var Wire = (function (slice, proto) {

  proto = Wire.prototype;

  proto.ELEMENT_NODE = 1;
  proto.nodeType = 111;

  proto.remove = function (keepFirst) {
    var childNodes = this.childNodes;
    var first = this.firstChild;
    var last = this.lastChild;
    this._ = null;
    if (keepFirst && childNodes.length === 2) {
      last.parentNode.removeChild(last);
    } else {
      var range = this.ownerDocument.createRange();
      range.setStartBefore(keepFirst ? childNodes[1] : first);
      range.setEndAfter(last);
      range.deleteContents();
    }
    return first;
  };

  proto.valueOf = function (forceAppend) {
    var fragment = this._;
    var noFragment = fragment == null;
    if (noFragment)
      fragment = (this._ = this.ownerDocument.createDocumentFragment());
    if (noFragment || forceAppend) {
      for (var n = this.childNodes, i = 0, l = n.length; i < l; i++)
        fragment.appendChild(n[i]);
    }
    return fragment;
  };

  return Wire;

  function Wire(childNodes) {
    var nodes = (this.childNodes = slice.call(childNodes, 0));
    this.firstChild = nodes[0];
    this.lastChild = nodes[nodes.length - 1];
    this.ownerDocument = nodes[0].ownerDocument;
    this._ = null;
  }

}([].slice));

const {isArray} = Array;
const wireType = Wire.prototype.nodeType;

/*! (c) Andrea Giammarchi - ISC */
var createContent = (function (document) {  var FRAGMENT = 'fragment';
  var TEMPLATE = 'template';
  var HAS_CONTENT = 'content' in create(TEMPLATE);

  var createHTML = HAS_CONTENT ?
    function (html) {
      var template = create(TEMPLATE);
      template.innerHTML = html;
      return template.content;
    } :
    function (html) {
      var content = create(FRAGMENT);
      var template = create(TEMPLATE);
      var childNodes = null;
      if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
        var selector = RegExp.$1;
        template.innerHTML = '<table>' + html + '</table>';
        childNodes = template.querySelectorAll(selector);
      } else {
        template.innerHTML = html;
        childNodes = template.childNodes;
      }
      append(content, childNodes);
      return content;
    };

  return function createContent(markup, type) {
    return (type === 'svg' ? createSVG : createHTML)(markup);
  };

  function append(root, childNodes) {
    var length = childNodes.length;
    while (length--)
      root.appendChild(childNodes[0]);
  }

  function create(element) {
    return element === FRAGMENT ?
      document.createDocumentFragment() :
      document.createElementNS('http://www.w3.org/1999/xhtml', element);
  }

  // it could use createElementNS when hasNode is there
  // but this fallback is equally fast and easier to maintain
  // it is also battle tested already in all IE
  function createSVG(svg) {
    var content = create(FRAGMENT);
    var template = create('div');
    template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
    append(content, template.firstChild.childNodes);
    return content;
  }

}(document));

/*! (c) Andrea Giammarchi - ISC */
var self$1 = undefined || /* istanbul ignore next */ {};
try { self$1.Map = Map; }
catch (Map) {
  self$1.Map = function Map() {
    var i = 0;
    var k = [];
    var v = [];
    return {
      delete: function (key) {
        var had = contains(key);
        if (had) {
          k.splice(i, 1);
          v.splice(i, 1);
        }
        return had;
      },
      get: function get(key) {
        return contains(key) ? v[i] : void 0;
      },
      has: function has(key) {
        return contains(key);
      },
      set: function set(key, value) {
        v[contains(key) ? i : (k.push(key) - 1)] = value;
        return this;
      }
    };
    function contains(v) {
      i = k.indexOf(v);
      return -1 < i;
    }
  };
}
var Map$1 = self$1.Map;

const append = (get, parent, children, start, end, before) => {
  if ((end - start) < 2)
    parent.insertBefore(get(children[start], 1), before);
  else {
    const fragment = parent.ownerDocument.createDocumentFragment();
    while (start < end)
      fragment.appendChild(get(children[start++], 1));
    parent.insertBefore(fragment, before);
  }
};

const eqeq = (a, b) => a == b;

const identity = O => O;

const indexOf = (
  moreNodes,
  moreStart,
  moreEnd,
  lessNodes,
  lessStart,
  lessEnd,
  compare
) => {
  const length = lessEnd - lessStart;
  /* istanbul ignore if */
  if (length < 1)
    return -1;
  while ((moreEnd - moreStart) >= length) {
    let m = moreStart;
    let l = lessStart;
    while (
      m < moreEnd &&
      l < lessEnd &&
      compare(moreNodes[m], lessNodes[l])
    ) {
      m++;
      l++;
    }
    if (l === lessEnd)
      return moreStart;
    moreStart = m + 1;
  }
  return -1;
};

const isReversed = (
  futureNodes,
  futureEnd,
  currentNodes,
  currentStart,
  currentEnd,
  compare
) => {
  while (
    currentStart < currentEnd &&
    compare(
      currentNodes[currentStart],
      futureNodes[futureEnd - 1]
    )) {
      currentStart++;
      futureEnd--;
    }  return futureEnd === 0;
};

const next = (get, list, i, length, before) => i < length ?
              get(list[i], 0) :
              (0 < i ?
                get(list[i - 1], -0).nextSibling :
                before);

const remove = (get, parent, children, start, end) => {
  if ((end - start) < 2)
    parent.removeChild(get(children[start], -1));
  else {
    const range = parent.ownerDocument.createRange();
    range.setStartBefore(get(children[start], -1));
    range.setEndAfter(get(children[end - 1], -1));
    range.deleteContents();
  }
};

// - - - - - - - - - - - - - - - - - - -
// diff related constants and utilities
// - - - - - - - - - - - - - - - - - - -

const DELETION = -1;
const INSERTION = 1;
const SKIP = 0;
const SKIP_OND = 50;

const HS = (
  futureNodes,
  futureStart,
  futureEnd,
  futureChanges,
  currentNodes,
  currentStart,
  currentEnd,
  currentChanges
) => {

  let k = 0;
  /* istanbul ignore next */
  let minLen = futureChanges < currentChanges ? futureChanges : currentChanges;
  const link = Array(minLen++);
  const tresh = Array(minLen);
  tresh[0] = -1;

  for (let i = 1; i < minLen; i++)
    tresh[i] = currentEnd;

  const keymap = new Map$1;
  for (let i = currentStart; i < currentEnd; i++)
    keymap.set(currentNodes[i], i);

  for (let i = futureStart; i < futureEnd; i++) {
    const idxInOld = keymap.get(futureNodes[i]);
    if (idxInOld != null) {
      k = findK(tresh, minLen, idxInOld);
      /* istanbul ignore else */
      if (-1 < k) {
        tresh[k] = idxInOld;
        link[k] = {
          newi: i,
          oldi: idxInOld,
          prev: link[k - 1]
        };
      }
    }
  }

  k = --minLen;
  --currentEnd;
  while (tresh[k] > currentEnd) --k;

  minLen = currentChanges + futureChanges - k;
  const diff = Array(minLen);
  let ptr = link[k];
  --futureEnd;
  while (ptr) {
    const {newi, oldi} = ptr;
    while (futureEnd > newi) {
      diff[--minLen] = INSERTION;
      --futureEnd;
    }
    while (currentEnd > oldi) {
      diff[--minLen] = DELETION;
      --currentEnd;
    }
    diff[--minLen] = SKIP;
    --futureEnd;
    --currentEnd;
    ptr = ptr.prev;
  }
  while (futureEnd >= futureStart) {
    diff[--minLen] = INSERTION;
    --futureEnd;
  }
  while (currentEnd >= currentStart) {
    diff[--minLen] = DELETION;
    --currentEnd;
  }
  return diff;
};

// this is pretty much the same petit-dom code without the delete map part
// https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L556-L561
const OND = (
  futureNodes,
  futureStart,
  rows,
  currentNodes,
  currentStart,
  cols,
  compare
) => {
  const length = rows + cols;
  const v = [];
  let d, k, r, c, pv, cv, pd;
  outer: for (d = 0; d <= length; d++) {
    /* istanbul ignore if */
    if (d > SKIP_OND)
      return null;
    pd = d - 1;
    /* istanbul ignore next */
    pv = d ? v[d - 1] : [0, 0];
    cv = v[d] = [];
    for (k = -d; k <= d; k += 2) {
      if (k === -d || (k !== d && pv[pd + k - 1] < pv[pd + k + 1])) {
        c = pv[pd + k + 1];
      } else {
        c = pv[pd + k - 1] + 1;
      }
      r = c - k;
      while (
        c < cols &&
        r < rows &&
        compare(
          currentNodes[currentStart + c],
          futureNodes[futureStart + r]
        )
      ) {
        c++;
        r++;
      }
      if (c === cols && r === rows) {
        break outer;
      }
      cv[d + k] = c;
    }
  }

  const diff = Array(d / 2 + length / 2);
  let diffIdx = diff.length - 1;
  for (d = v.length - 1; d >= 0; d--) {
    while (
      c > 0 &&
      r > 0 &&
      compare(
        currentNodes[currentStart + c - 1],
        futureNodes[futureStart + r - 1]
      )
    ) {
      // diagonal edge = equality
      diff[diffIdx--] = SKIP;
      c--;
      r--;
    }
    if (!d)
      break;
    pd = d - 1;
    /* istanbul ignore next */
    pv = d ? v[d - 1] : [0, 0];
    k = c - r;
    if (k === -d || (k !== d && pv[pd + k - 1] < pv[pd + k + 1])) {
      // vertical edge = insertion
      r--;
      diff[diffIdx--] = INSERTION;
    } else {
      // horizontal edge = deletion
      c--;
      diff[diffIdx--] = DELETION;
    }
  }
  return diff;
};

const applyDiff = (
  diff,
  get,
  parentNode,
  futureNodes,
  futureStart,
  currentNodes,
  currentStart,
  currentLength,
  before
) => {
  const live = new Map$1;
  const length = diff.length;
  let currentIndex = currentStart;
  let i = 0;
  while (i < length) {
    switch (diff[i++]) {
      case SKIP:
        futureStart++;
        currentIndex++;
        break;
      case INSERTION:
        // TODO: bulk appends for sequential nodes
        live.set(futureNodes[futureStart], 1);
        append(
          get,
          parentNode,
          futureNodes,
          futureStart++,
          futureStart,
          currentIndex < currentLength ?
            get(currentNodes[currentIndex], 0) :
            before
        );
        break;
      case DELETION:
        currentIndex++;
        break;
    }
  }
  i = 0;
  while (i < length) {
    switch (diff[i++]) {
      case SKIP:
        currentStart++;
        break;
      case DELETION:
        // TODO: bulk removes for sequential nodes
        if (live.has(currentNodes[currentStart]))
          currentStart++;
        else
          remove(
            get,
            parentNode,
            currentNodes,
            currentStart++,
            currentStart
          );
        break;
    }
  }
};

const findK = (ktr, length, j) => {
  let lo = 1;
  let hi = length;
  while (lo < hi) {
    const mid = ((lo + hi) / 2) >>> 0;
    if (j < ktr[mid])
      hi = mid;
    else
      lo = mid + 1;
  }
  return lo;
};

const smartDiff = (
  get,
  parentNode,
  futureNodes,
  futureStart,
  futureEnd,
  futureChanges,
  currentNodes,
  currentStart,
  currentEnd,
  currentChanges,
  currentLength,
  compare,
  before
) => {
  applyDiff(
    OND(
      futureNodes,
      futureStart,
      futureChanges,
      currentNodes,
      currentStart,
      currentChanges,
      compare
    ) ||
    HS(
      futureNodes,
      futureStart,
      futureEnd,
      futureChanges,
      currentNodes,
      currentStart,
      currentEnd,
      currentChanges
    ),
    get,
    parentNode,
    futureNodes,
    futureStart,
    currentNodes,
    currentStart,
    currentLength,
    before
  );
};

/*! (c) 2018 Andrea Giammarchi (ISC) */

const domdiff = (
  parentNode,     // where changes happen
  currentNodes,   // Array of current items/nodes
  futureNodes,    // Array of future items/nodes
  options         // optional object with one of the following properties
                  //  before: domNode
                  //  compare(generic, generic) => true if same generic
                  //  node(generic) => Node
) => {
  if (!options)
    options = {};

  const compare = options.compare || eqeq;
  const get = options.node || identity;
  const before = options.before == null ? null : get(options.before, 0);

  const currentLength = currentNodes.length;
  let currentEnd = currentLength;
  let currentStart = 0;

  let futureEnd = futureNodes.length;
  let futureStart = 0;

  // common prefix
  while (
    currentStart < currentEnd &&
    futureStart < futureEnd &&
    compare(currentNodes[currentStart], futureNodes[futureStart])
  ) {
    currentStart++;
    futureStart++;
  }

  // common suffix
  while (
    currentStart < currentEnd &&
    futureStart < futureEnd &&
    compare(currentNodes[currentEnd - 1], futureNodes[futureEnd - 1])
  ) {
    currentEnd--;
    futureEnd--;
  }

  const currentSame = currentStart === currentEnd;
  const futureSame = futureStart === futureEnd;

  // same list
  if (currentSame && futureSame)
    return futureNodes;

  // only stuff to add
  if (currentSame && futureStart < futureEnd) {
    append(
      get,
      parentNode,
      futureNodes,
      futureStart,
      futureEnd,
      next(get, currentNodes, currentStart, currentLength, before)
    );
    return futureNodes;
  }

  // only stuff to remove
  if (futureSame && currentStart < currentEnd) {
    remove(
      get,
      parentNode,
      currentNodes,
      currentStart,
      currentEnd
    );
    return futureNodes;
  }

  const currentChanges = currentEnd - currentStart;
  const futureChanges = futureEnd - futureStart;
  let i = -1;

  // 2 simple indels: the shortest sequence is a subsequence of the longest
  if (currentChanges < futureChanges) {
    i = indexOf(
      futureNodes,
      futureStart,
      futureEnd,
      currentNodes,
      currentStart,
      currentEnd,
      compare
    );
    // inner diff
    if (-1 < i) {
      append(
        get,
        parentNode,
        futureNodes,
        futureStart,
        i,
        get(currentNodes[currentStart], 0)
      );
      append(
        get,
        parentNode,
        futureNodes,
        i + currentChanges,
        futureEnd,
        next(get, currentNodes, currentEnd, currentLength, before)
      );
      return futureNodes;
    }
  }
  /* istanbul ignore else */
  else if (futureChanges < currentChanges) {
    i = indexOf(
      currentNodes,
      currentStart,
      currentEnd,
      futureNodes,
      futureStart,
      futureEnd,
      compare
    );
    // outer diff
    if (-1 < i) {
      remove(
        get,
        parentNode,
        currentNodes,
        currentStart,
        i
      );
      remove(
        get,
        parentNode,
        currentNodes,
        i + futureChanges,
        currentEnd
      );
      return futureNodes;
    }
  }

  // common case with one replacement for many nodes
  // or many nodes replaced for a single one
  /* istanbul ignore else */
  if ((currentChanges < 2 || futureChanges < 2)) {
    append(
      get,
      parentNode,
      futureNodes,
      futureStart,
      futureEnd,
      get(currentNodes[currentStart], 0)
    );
    remove(
      get,
      parentNode,
      currentNodes,
      currentStart,
      currentEnd
    );
    return futureNodes;
  }

  // the half match diff part has been skipped in petit-dom
  // https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L391-L397
  // accordingly, I think it's safe to skip in here too
  // if one day it'll come out like the speediest thing ever to do
  // then I might add it in here too

  // Extra: before going too fancy, what about reversed lists ?
  //        This should bail out pretty quickly if that's not the case.
  if (
    currentChanges === futureChanges &&
    isReversed(
      futureNodes,
      futureEnd,
      currentNodes,
      currentStart,
      currentEnd,
      compare
    )
  ) {
    append(
      get,
      parentNode,
      futureNodes,
      futureStart,
      futureEnd,
      next(get, currentNodes, currentEnd, currentLength, before)
    );
    return futureNodes;
  }

  // last resort through a smart diff
  smartDiff(
    get,
    parentNode,
    futureNodes,
    futureStart,
    futureEnd,
    futureChanges,
    currentNodes,
    currentStart,
    currentEnd,
    currentChanges,
    currentLength,
    compare,
    before
  );

  return futureNodes;
};

/*! (c) Andrea Giammarchi - ISC */
var self$2 = undefined || /* istanbul ignore next */ {};
try { self$2.WeakMap = WeakMap; }
catch (WeakMap) {
  // this could be better but 90% of the time
  // it's everything developers need as fallback
  self$2.WeakMap = (function (id, Object) {    var dP = Object.defineProperty;
    var hOP = Object.hasOwnProperty;
    var proto = WeakMap.prototype;
    proto.delete = function (key) {
      return this.has(key) && delete key[this._];
    };
    proto.get = function (key) {
      return this.has(key) ? key[this._] : void 0;
    };
    proto.has = function (key) {
      return hOP.call(key, this._);
    };
    proto.set = function (key, value) {
      dP(key, this._, {configurable: true, value: value});
      return this;
    };
    return WeakMap;
    function WeakMap(iterable) {
      dP(this, '_', {value: '_@ungap/weakmap' + id++});
      if (iterable)
        iterable.forEach(add, this);
    }
    function add(pair) {
      this.set(pair[0], pair[1]);
    }
  }(Math.random(), Object));
}
var WeakMap$1 = self$2.WeakMap;

/*! (c) Andrea Giammarchi - ISC */
var importNode = (function (
  document,
  appendChild,
  cloneNode,
  createTextNode,
  importNode
) {
  var native = importNode in document;
  // IE 11 has problems with cloning templates:
  // it "forgets" empty childNodes. This feature-detects that.
  var fragment = document.createDocumentFragment();
  fragment[appendChild](document[createTextNode]('g'));
  fragment[appendChild](document[createTextNode](''));
  var content = native ?
    document[importNode](fragment, true) :
    fragment[cloneNode](true);
  return content.childNodes.length < 2 ?
    function importNode(node, deep) {
      var clone = node[cloneNode]();
      for (var
        childNodes = node.childNodes || [],
        length = childNodes.length,
        i = 0; deep && i < length; i++
      ) {
        clone[appendChild](importNode(childNodes[i], deep));
      }
      return clone;
    } :
    (native ?
      document[importNode] :
      function (node, deep) {
        return node[cloneNode](!!deep);
      }
    );
}(
  document,
  'appendChild',
  'cloneNode',
  'createTextNode',
  'importNode'
));

var trim = ''.trim || function () {
  return String(this).replace(/^\s+|\s+/g, '');
};

// Custom
var UID = '-' + Math.random().toFixed(6) + '%';
//                           Edge issue!
if (!(function (template, content, tabindex) {
  return content in template && (
    (template.innerHTML = '<p ' + tabindex + '="' + UID + '"></p>'),
    template[content].childNodes[0].getAttribute(tabindex) == UID
  );
}(document.createElement('template'), 'content', 'tabindex'))) {
  UID = '_dt: ' + UID.slice(1, -1) + ';';
}
var UIDC = '<!--' + UID + '-->';

// DOM
var COMMENT_NODE = 8;
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;

var SHOULD_USE_TEXT_CONTENT = /^(?:style|textarea)$/i;
var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

function sanitize (template) {
  return template.join(UIDC)
          .replace(selfClosing, fullClosing)
          .replace(attrSeeker, attrReplacer);
}

var spaces = ' \\f\\n\\r\\t';
var almostEverything = '[^ ' + spaces + '\\/>"\'=]+';
var attrName = '[ ' + spaces + ']+' + almostEverything;
var tagName = '<([A-Za-z]+[A-Za-z0-9:_-]*)((?:';
var attrPartials = '(?:\\s*=\\s*(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything + '))?)';

var attrSeeker = new RegExp(tagName + attrName + attrPartials + '+)([ ' + spaces + ']*/?>)', 'g');
var selfClosing = new RegExp(tagName + attrName + attrPartials + '*)([ ' + spaces + ']*/>)', 'g');
var findAttributes = new RegExp('(' + attrName + '\\s*=\\s*)([\'"]?)' + UIDC + '\\2', 'gi');

function attrReplacer($0, $1, $2, $3) {
  return '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
}

function replaceAttributes($0, $1, $2) {
  return $1 + ($2 || '"') + UID + ($2 || '"');
}

function fullClosing($0, $1, $2) {
  return VOID_ELEMENTS.test($1) ? $0 : ('<' + $1 + $2 + '></' + $1 + '>');
}

function create(type, node, path, name) {
  return {name: name, node: node, path: path, type: type};
}

function find(node, path) {
  var length = path.length;
  var i = 0;
  while (i < length)
    node = node.childNodes[path[i++]];
  return node;
}

function parse(node, holes, parts, path) {
  var childNodes = node.childNodes;
  var length = childNodes.length;
  var i = 0;
  while (i < length) {
    var child = childNodes[i];
    switch (child.nodeType) {
      case ELEMENT_NODE:
        var childPath = path.concat(i);
        parseAttributes(child, holes, parts, childPath);
        parse(child, holes, parts, childPath);
        break;
      case COMMENT_NODE:
        if (child.textContent === UID) {
          parts.shift();
          holes.push(
            // basicHTML or other non standard engines
            // might end up having comments in nodes
            // where they shouldn't, hence this check.
            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ?
              create('text', node, path) :
              create('any', child, path.concat(i))
          );
        }
        break;
      case TEXT_NODE:
        // the following ignore is actually covered by browsers
        // only basicHTML ends up on previous COMMENT_NODE case
        // instead of TEXT_NODE because it knows nothing about
        // special style or textarea behavior
        /* istanbul ignore if */
        if (
          SHOULD_USE_TEXT_CONTENT.test(node.nodeName) &&
          trim.call(child.textContent) === UIDC
        ) {
          parts.shift();
          holes.push(create('text', node, path));
        }
        break;
    }
    i++;
  }
}

function parseAttributes(node, holes, parts, path) {
  var cache = new Map$1;
  var attributes = node.attributes;
  var remove = [];
  var array = remove.slice.call(attributes, 0);
  var length = array.length;
  var i = 0;
  while (i < length) {
    var attribute = array[i++];
    if (attribute.value === UID) {
      var name = attribute.name;
      // the following ignore is covered by IE
      // and the IE9 double viewBox test
      /* istanbul ignore else */
      if (!cache.has(name)) {
        var realName = parts.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/, '$1');
        var value = attributes[realName] ||
                      // the following ignore is covered by browsers
                      // while basicHTML is already case-sensitive
                      /* istanbul ignore next */
                      attributes[realName.toLowerCase()];
        cache.set(name, value);
        holes.push(create('attr', value, path, realName));
      }
      remove.push(attribute);
    }
  }
  length = remove.length;
  i = 0;
  while (i < length) {
    // Edge HTML bug #16878726
    var attr = remove[i++];
    if (/^id$/i.test(attr.name))
      node.removeAttribute(attr.name);
    // standard browsers would work just fine here
    else
      node.removeAttributeNode(attr);
  }

  // This is a very specific Firefox/Safari issue
  // but since it should be a not so common pattern,
  // it's probably worth patching regardless.
  // Basically, scripts created through strings are death.
  // You need to create fresh new scripts instead.
  // TODO: is there any other node that needs such nonsense?
  var nodeName = node.nodeName;
  if (/^script$/i.test(nodeName)) {
    // this used to be like that
    // var script = createElement(node, nodeName);
    // then Edge arrived and decided that scripts created
    // through template documents aren't worth executing
    // so it became this ... hopefully it won't hurt in the wild
    var script = document.createElement(nodeName);
    length = attributes.length;
    i = 0;
    while (i < length)
      script.setAttributeNode(attributes[i++].cloneNode(true));
    script.textContent = node.textContent;
    node.parentNode.replaceChild(script, node);
  }
}

// globals

var parsed = new WeakMap$1;
var referenced = new WeakMap$1;

function createInfo(options, template) {
  var markup = sanitize(template);
  var transform = options.transform;
  if (transform)
    markup = transform(markup);
  var content = createContent(markup, options.type);
  cleanContent(content);
  var holes = [];
  parse(content, holes, template.slice(0), []);
  var info = {
    content: content,
    updates: function (content) {
      var callbacks = [];
      var len = holes.length;
      var i = 0;
      while (i < len) {
        var info = holes[i++];
        var node = find(content, info.path);
        switch (info.type) {
          case 'any':
            callbacks.push(options.any(node, []));
            break;
          case 'attr':
            callbacks.push(options.attribute(node, info.name, info.node));
            break;
          case 'text':
            callbacks.push(options.text(node));
            node.textContent = '';
            break;
        }
      }
      return function () {
        var length = arguments.length;
        var values = length - 1;
        var i = 1;
        if (len !== values) {
          throw new Error(
            values + ' values instead of ' + len + '\n' +
            template.join(', ')
          );
        }
        while (i < length)
          callbacks[i - 1](arguments[i++]);
        return content;
      };
    }
  };
  parsed.set(template, info);
  return info;
}

function createDetails(options, template) {
  var info = parsed.get(template) || createInfo(options, template);
  var content = importNode.call(document, info.content, true);
  var details = {
    content: content,
    template: template,
    updates: info.updates(content)
  };
  referenced.set(options, details);
  return details;
}

function domtagger(options) {
  return function (template) {
    var details = referenced.get(options);
    if (details == null || details.template !== template)
      details = createDetails(options, template);
    details.updates.apply(null, arguments);
    return details.content;
  };
}

function cleanContent(fragment) {
  var childNodes = fragment.childNodes;
  var i = childNodes.length;
  while (i--) {
    var child = childNodes[i];
    if (
      child.nodeType !== 1 &&
      trim.call(child.textContent).length === 0
    ) {
      fragment.removeChild(child);
    }
  }
}

/*! (c) Andrea Giammarchi - ISC */
var hyperStyle = (function (){  // from https://github.com/developit/preact/blob/33fc697ac11762a1cb6e71e9847670d047af7ce5/src/varants.js
  var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
  var hyphen = /([^A-Z])([A-Z]+)/g;
  return function hyperStyle(node, original) {
    return 'ownerSVGElement' in node ? svg(node, original) : update(node.style, false);
  };
  function ized($0, $1, $2) {
    return $1 + '-' + $2.toLowerCase();
  }
  function svg(node, original) {
    var style;
    if (original)
      style = original.cloneNode(true);
    else {
      node.setAttribute('style', '--hyper:style;');
      style = node.getAttributeNode('style');
    }
    style.value = '';
    node.setAttributeNode(style);
    return update(style, true);
  }
  function toStyle(object) {
    var key, css = [];
    for (key in object)
      css.push(key.replace(hyphen, ized), ':', object[key], ';');
    return css.join('');
  }
  function update(style, isSVG) {
    var oldType, oldValue;
    return function (newValue) {
      var info, key, styleValue, value;
      switch (typeof newValue) {
        case 'object':
          if (newValue) {
            if (oldType === 'object') {
              if (!isSVG) {
                if (oldValue !== newValue) {
                  for (key in oldValue) {
                    if (!(key in newValue)) {
                      style[key] = '';
                    }
                  }
                }
              }
            } else {
              if (isSVG)
                style.value = '';
              else
                style.cssText = '';
            }
            info = isSVG ? {} : style;
            for (key in newValue) {
              value = newValue[key];
              styleValue = typeof value === 'number' &&
                                  !IS_NON_DIMENSIONAL.test(key) ?
                                  (value + 'px') : value;
              if (!isSVG && /^--/.test(key))
                info.setProperty(key, styleValue);
              else
                info[key] = styleValue;
            }
            oldType = 'object';
            if (isSVG)
              style.value = toStyle((oldValue = info));
            else
              oldValue = newValue;
            break;
          }
        default:
          if (oldValue != newValue) {
            oldType = 'string';
            oldValue = newValue;
            if (isSVG)
              style.value = newValue || '';
            else
              style.cssText = newValue || '';
          }
          break;
      }
    };
  }
}());

const OWNER_SVG_ELEMENT = 'ownerSVGElement';

// returns nodes from wires and components
const asNode = (item, i) => item.nodeType === wireType ?
  (
    (1 / i) < 0 ?
      (i ? item.remove(true) : item.lastChild) :
      (i ? item.valueOf(true) : item.firstChild)
  ) :
  item
;

// returns true if domdiff can handle the value
const canDiff = value => 'ELEMENT_NODE' in value;

// generic attributes helpers
const hyperAttribute = (node, attribute) => {
  let oldValue;
  let owner = false;
  return newValue => {
    if (oldValue !== newValue) {
      oldValue = newValue;
      if (attribute.value !== newValue) {
        if (newValue == null) {
          if (owner) {
            owner = false;
            node.removeAttributeNode(attribute);
          }
          attribute.value = newValue;
        } else {
          attribute.value = newValue;
          if (!owner) {
            owner = true;
            node.setAttributeNode(attribute);
          }
        }
      }
    }
  };
};

// events attributes helpers
const hyperEvent = (node, name) => {
  let oldValue;
  let type = name.slice(2);
  if (name.toLowerCase() in node)
    type = type.toLowerCase();
  return newValue => {
    if (oldValue !== newValue) {
      if (oldValue)
        node.removeEventListener(type, oldValue, false);
      oldValue = newValue;
      if (newValue)
        node.addEventListener(type, newValue, false);
    }
  };
};

// special attributes helpers
const hyperProperty = (node, name) => {
  let oldValue;
  return newValue => {
    if (oldValue !== newValue) {
      oldValue = newValue;
      if (node[name] !== newValue) {
        node[name] = newValue;
        if (newValue == null) {
          node.removeAttribute(name);
        }
      }
    }
  };
};

// special hooks helpers
const hyperRef = node => {
  return ref => {
    ref.current = node;
  };
};

// list of attributes that should not be directly assigned
const readOnly = /^(?:form|list)$/i;

// reused every slice time
const slice = [].slice;

// simplifies text node creation
const text = (node, text) => node.ownerDocument.createTextNode(text);

function Tagger(type) {
  this.type = type;
  return domtagger(this);
}

Tagger.prototype = {

  // there are four kind of attributes, and related behavior:
  //  * events, with a name starting with `on`, to add/remove event listeners
  //  * special, with a name present in their inherited prototype, accessed directly
  //  * regular, accessed through get/setAttribute standard DOM methods
  //  * style, the only regular attribute that also accepts an object as value
  //    so that you can style=${{width: 120}}. In this case, the behavior has been
  //    fully inspired by Preact library and its simplicity.
  attribute(node, name, original) {
    const isSVG = OWNER_SVG_ELEMENT in node;
    switch (true) {
      case name.slice(0, 2) === 'on':
        return hyperEvent(node, name);
      case name === 'style':
        return hyperStyle(node, original, isSVG);
      case name === 'ref':
        return hyperRef(node, original, isSVG);
      case name === 'data':
      case name === 'props':
      case !isSVG && name in node && !readOnly.test(name):
        return hyperProperty(node, name);
      default:
        return hyperAttribute(node, original.cloneNode(true));
    }
  },

  // in a hyper(node)`<div>${content}</div>` case
  // everything could happen:
  //  * it's a JS primitive, stored as text
  //  * it's null or undefined, the node should be cleaned
  //  * it's a promise, update the content once resolved
  //  * it's an explicit intent, perform the desired operation
  //  * it's an Array, resolve all values if Promises and/or
  //    update the node with the resulting list of content
  any(node, childNodes) {
    const diffOptions = {node: asNode, before: node};
    const nodeType = OWNER_SVG_ELEMENT in node ? /* istanbul ignore next */ 'svg' : 'html';
    let fastPath = false;
    let oldValue;
    const anyContent = value => {
      switch (typeof value) {
        case 'string':
        case 'number':
        case 'boolean':
          if (fastPath) {
            if (oldValue !== value) {
              oldValue = value;
              childNodes[0].textContent = value;
            }
          } else {
            fastPath = true;
            oldValue = value;
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              [text(node, value)],
              diffOptions
            );
          }
          break;
        case 'function':
          anyContent(value(node));
          break;
        case 'object':
        case 'undefined':
          if (value == null) {
            fastPath = false;
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              [],
              diffOptions
            );
            break;
          }
        default:
          fastPath = false;
          oldValue = value;
          if (isArray(value)) {
            if (value.length === 0) {
              if (childNodes.length) {
                childNodes = domdiff(
                  node.parentNode,
                  childNodes,
                  [],
                  diffOptions
                );
              }
            } else {
              switch (typeof value[0]) {
                case 'string':
                case 'number':
                case 'boolean':
                  anyContent(String(value));
                  break;
                case 'function':
                  anyContent(value.map(invoke, node));
                  break;
                case 'object':
                  if (isArray(value[0])) {
                    value = value.concat.apply([], value);
                  }
                default:
                  childNodes = domdiff(
                    node.parentNode,
                    childNodes,
                    value,
                    diffOptions
                  );
                  break;
              }
            }
          } else if (canDiff(value)) {
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              value.nodeType === 11 ?
                slice.call(value.childNodes) :
                [value],
              diffOptions
            );
          } else if ('text' in value) {
            anyContent(String(value.text));
          } else if ('any' in value) {
            anyContent(value.any);
          } else if ('html' in value) {
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              slice.call(
                createContent(
                  [].concat(value.html).join(''),
                  nodeType
                ).childNodes
              ),
              diffOptions
            );
          } else if ('length' in value) {
            anyContent(slice.call(value));
          }
          break;
      }
    };
    return anyContent;
  },

  // style or textareas don't accept HTML as content
  // it's pointless to transform or analyze anything
  // different from text there but it's worth checking
  // for possible defined intents.
  text(node) {
    let oldValue;
    const textContent = value => {
      if (oldValue !== value) {
        oldValue = value;
        const type = typeof value;
        if (type === 'object' && value) {
          if ('text' in value) {
            textContent(String(value.text));
          } else if ('any' in value) {
            textContent(value.any);
          } else if ('html' in value) {
            textContent([].concat(value.html).join(''));
          } else if ('length' in value) {
            textContent(slice.call(value).join(''));
          }
        } else if (type === 'function') {
          textContent(value(node));
        } else {
          node.textContent = value == null ? '' : value;
        }
      }
    };
    return textContent;
  }
};

function invoke(callback) {
  return callback(this);
}

const wm = new WeakMap;
const templateType = 0;

let current = null;

// generic content render
function render(node, callback) {
  const content = update.call(this, node, callback);
  if (content !== null)
    appendClean(node, content);
  return node;
}

// keyed render via render(node, () => html`...`)
// non keyed renders in the wild via html`...`
const html = outer$1('html');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function appendClean(node, fragment) {
  node.textContent = '';
  node.appendChild(fragment);
}

function asNode$1(result) {
  return result.nodeType === wireType ? result.valueOf(true) : result;
}

function outer$1($) {
  return function () {
    const _ = tta.apply(null, arguments);
    return current ?
      {nodeType: 0, valueOf, $, _} :
      new Tagger($).apply(null, _);
  };
}

function set(node) {
  const info = {i: 0, length: 0, stack: [], template: null};
  wm.set(node, info);
  return info;
}

function setTemplate(template) {
  if (current.template) {
    current.length = 0;
    current.stack.splice(0);
  }
  current.template = template;
}

function unroll(template) {
  const {$, _} = template;
  const {i, length, stack} = current;
  current.i++;
  if (i < length) {
    const {tagger, wire} = stack[i];
    tagger.apply(null, unrollArray(_, 1));
    return wire;
  }
  else {
    const tagger = new Tagger($);
    const stacked = {tagger, wire: null};
    current.length = stack.push(stacked);
    stacked.wire = wireContent(tagger.apply(null, unrollArray(_, 1)));
    return stacked.wire;
  }
}

function unrollArray(array, i) {
  for (let i = 0, {length} = array; i < length; i++) {
    const value = array[i];
    if (value) {
      if (value.nodeType === 0)
        array[i] = unroll(value);
      else if (isArray(value))
        array[i] = unrollArray(value, 0);
    }
  }
  return array;
}

function update(reference, callback) {
  const prev = current;
  current = wm.get(reference) || set(reference);
  current.i = 0;

  // TODO: perf measurement about guarding this
  const result = callback.call(this);

  let ret = null;
  if (result.nodeType === templateType) {
    const template = result._[0];

    // TODO: perf measurement about guarding this
    const content = unroll(result);

    const {i} = current;
    if (i < current.length) {
      current.length = i;
      current.stack.splice(i);
    }
    if (current.template !== template) {
      setTemplate(template);
      ret = asNode$1(content);
    }
  }
  else {
    setTemplate(null);
    ret = asNode$1(result);
  }

  current = prev;
  return ret;
}

function wireContent(node) {
  const childNodes = node.childNodes;
  const {length} = childNodes;
  return length === 1 ?
    childNodes[0] :
    (length ? new Wire(childNodes) : node);
}

let now = null;
const setup = [];

const $ = value => typeof value === typeof $ ? value() : value;

const stacked = id => runner => {
  const state = {i: 0, stack: []};
  runner[id] = state;
  runner.before.push(() => {
    state.i = 0;
  });
};

let id = 0;
const uid = () => '_$' + id++;

const unstacked = id => {
  const {[id]: state, update} = now;
  const {i, stack} = state;
  state.i++;
  return {i, stack, update, unknown: i === stack.length};
};

var augmentor = fn => {
  const current = runner($);
  each(setup, current);
  $.reset = () => {
    each(current.reset, current);
    for (const key in current) {
      if (/^_\$/.test(key))
        current[key].stack.splice(0);
    }
  };
  return $;
  function $() {
    const prev = now;
    now = current;
    const {_, before, after, external} = current;
    try {
      let result;
      do {
        _.$ = _._ = false;
        each(before, current);
        result = fn.apply(_.c = this, _.a = arguments);
        each(after, current);
        if (external.length)
          each(external.splice(0), result);
      } while (_._);
      return result;
    }
    finally {
      _.$ = true;
      now = prev;
    }
  }
};

const each = (arr, value) => {
  const {length} = arr;
  let i = 0;
  while (i < length)
    arr[i++](value);
};

const runner = $ => {
  const _ = {
    _: true,
    $: true,
    c: null,
    a: null
  };
  return {
    _: _,
    before: [],
    after: [],
    external: [],
    reset: [],
    update: () => _.$ ? $.apply(_.c, _.a) : (_._ = true)
  };
};

const id$1 = uid();

let cancel, request;

try {
  cancel = cancelAnimationFrame;
  request = requestAnimationFrame;
} catch (o_O) {
  // i.e. if you run this in NodeJS
  cancel = clearTimeout;
  request = setTimeout;
}

const set$1 = (info, clean) => {
  info.t = 0;
  info.clean = clean;
};

setup.push(runner => {
  const stack = [];
  const state = {i: 0, stack};
  runner[id$1] = state;
  const reset = () => {
    state.i = 0;
    for (let {length} = stack, i = 0; i < length; i++) {
      const {check, clean, raf, t} = stack[i];
      if (check) {
        if (raf && t)
          cancel(t);
        else if (clean)
          clean();
        set$1(stack[i], null);
      }
    }
  };
  runner.reset.push(reset);
  runner.before.push(reset);
  runner.after.push(() => {
    for (let {length} = stack, i = 0; i < length; i++) {
      const {fn, raf, update} = stack[i];
      if (update) {
        stack[i].update = false;
        if (raf)
          stack[i].t = request(fn);
        else
          fn();
      }
    }
  });
});

const id$2 = uid();

setup.push(stacked(id$2));

const id$3 = uid();

setup.push(stacked(id$3));

const id$4 = uid();

setup.push(stacked(id$4));

var useReducer = (reducer, value) => {
  const {i, stack, unknown, update} = unstacked(id$4);
  if (unknown)
    stack.push([
      $(value),
      action => {
        value = reducer(value, action);
        pair[0] = value;
        update();
      }
    ]);
  const pair = stack[i];
  return pair;
};

var state = value => useReducer(
  (_, value) => value,
  value
);

const id$5 = uid();

setup.push(stacked(id$5));

function isFunction(value) {
  return typeof value === 'function';
}

function getNativeConstructor(ext) {
  return ext ? document.createElement(ext).constructor : HTMLElement;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @param {...Function} fns - The functions to compose.
 * @return {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose(...fns) {
  return x => fns.filter(Boolean).reduceRight((y, f) => f(y), x);
}

function camelCase(name) {
  return name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}

function kebabCase(name) {
  return name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

function hasDash(name) {
  return name && name.indexOf('-') !== -1;
}

/**
 * Create a complete assign function with custom descriptors.
 * @param  {Object} options - The custom descriptor options.
 * @return {Function}
 */
function createCompleteAssign(options) {
  return (target, ...sources) => {
    sources.forEach(source => {
      for (const prop in source) {
        const descriptor = Object.getOwnPropertyDescriptor(source, prop);
        Object.defineProperty(target, prop, Object.assign(descriptor, options));
      }
    });
    return target;
  };
}

/**
 * Complete assign is used to copy the values of all enumerable own properties from one or more source objects to a target object, including getters and setters. It will return the target object. Properties are still allowed to be overridden.
 *
 * @param  {Object} target
 * @param  {...Object} sources
 * @return {Object} The target with assigned properties
 */
const completeAssign = createCompleteAssign({
  enumerable: false,
  configurable: true,
  writeable: false
});

function CustomEvent(name, params = {}) {
  if ('CustomEvent' in self && isFunction(self.CustomEvent)) {
    return new self.CustomEvent(name, params);
  }

  var newEvent = document.createEvent('CustomEvent');
  newEvent.initCustomEvent(name, params.bubbles, params.cancelable, params);
  return newEvent;
}

function extend(Base, init) {
  function Class(...args) {
    if (!(this instanceof Class)) {
      return new Class(...args);
    }
    this._super = (...args) => {
      return typeof Reflect !== 'undefined'
        ? Reflect.construct(Base, args, this.constructor)
        : Base.apply(this, args);
    };
    return init.apply(this, args);
  }

  Class.prototype = Object.create(Base.prototype);
  Class.prototype.constructor = Class;
  return Class;
}

function define(name, Element, options) {
  if (name) {
    self.customElements.define(name, Element, options);
  }
}

function findFreeTagName(name, suffix = null) {
  name = name || 's';
  const tag = kebabCase(suffix ? `${name}-${suffix}` : name);
  return isFreeTagName(tag) ? tag : findFreeTagName(tag, uniqueId());
}

function isFreeTagName(name) {
  return hasDash(name) && !self.customElements.get(name);
}

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @param {string} prefix The value to prefix the ID with.
 * @return {string} Returns the unique ID.
 * @example
 *
 *    uniqueId('contact_');
 *    // => 'contact_104'
 *
 *    uniqueId();
 *    // => '105'
 */
let idCounter = 0;
function uniqueId(prefix = '') {
  var id = ++idCounter;
  return `${prefix}${id}`;
}

const CONNECTED = 'connected';
const DISCONNECTED = 'disconnected';

function createElement(options, enhancer) {
  if (typeof enhancer !== 'undefined') {
    if (!isFunction(enhancer)) {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createElement)(options);
  }

  const { el, component } = options;

  const update = augmentor(() => {
    const fragment = component.call(el, el);
    return el.render.call(el, fragment);
  });

  function render(fragment) {
    el.renderer(el.renderRoot, () => fragment);
    return fragment;
  }

  function renderer(root, html) {
    root.innerHTML = html();
  }

  function connectedCallback() {
    update.call(el);
    el.dispatchEvent(new CustomEvent(CONNECTED));
  }

  function disconnectedCallback() {
    el.dispatchEvent(new CustomEvent(DISCONNECTED));
  }

  function attributeChangedCallback(name, oldValue, newValue) {
    if (el.shouldUpdate(oldValue, newValue)) {
      update.call(el);
    }
  }

  function shouldUpdate(oldValue, newValue) {
    return oldValue !== newValue;
  }

  return {
    render,
    renderer,
    connectedCallback,
    disconnectedCallback,
    attributeChangedCallback,
    shouldUpdate,
    get renderRoot() {
      return el.shadowRoot || el._shadowRoot || el;
    }
  };
}

/**
 * Defines a custom element in the `CustomElementRegistry` which renders the component which is passed as an argument.
 *
 * @param  {string} name The tag name for the custom element.
 * @param  {Function} component The component that is rendered in the element.
 * @param  {Function} [enhancer] The element enhancer. You may optionally specify it to enhance the element with third-party capabilities such as middleware, custom renderer, public API, etc. The only element enhancers that ship with Swiss Element are `applyMiddleware` and `renderer`.
 * @param  {Object} [options] An options object with 2 optional properties `observedAttributes` and `extends` (e.g. `extends: 'button'`).
 The options object is also passed to all the enhancers.
 *
 * @return {HTMLElement}
 */
function element(name, component, enhancer, options) {
  if (isFunction(name)) {
    options = enhancer;
    enhancer = component;
    component = name;
    name = undefined;
  }

  if (!isFunction(enhancer) && typeof options === 'undefined') {
    options = enhancer;
    enhancer = undefined;
  }

  options = options || {};
  name = options.name = findFreeTagName(name || options.name);

  const Native = getNativeConstructor(options && options.extends);
  const SwissElement = extend(Native, function() {
    const el = this._super();
    const opts = { ...options, component, el };
    const api = createElement(opts, enhancer);
    return completeAssign(el, api);
  });

  // Callbacks have to be on the prototype before construction.
  forwardCallbacks(SwissElement.prototype, [
    'connectedCallback',
    'disconnectedCallback',
    'attributeChangedCallback',
    'adoptedCallback'
  ]);

  SwissElement.observedAttributes = options.observedAttributes || [];
  addPropsToAttrs(SwissElement.prototype, SwissElement.observedAttributes);

  define(name, SwissElement, options);
  return SwissElement;
}

function forwardCallbacks(proto, callbacks) {
  callbacks.forEach(cb => {
    proto[cb] = function(...args) {
      if (cb in this) {
        this[cb](...args);
      }
    };
  });
}

function addPropsToAttrs(proto, attributes) {
  attributes.forEach(name => {
    // it is possible to redefine the behavior at any time
    // simply overwriting get prop() and set prop(value)
    if (!(name in proto)) {
      Object.defineProperty(proto, camelCase(name), {
        configurable: true,
        get() {
          return this.getAttribute(name);
        },
        set(value) {
          if (value == null) this.removeAttribute(name);
          else this.setAttribute(name, value);
        }
      });
    }
  });
}

function defaultRenderer(root, html) {
  root.innerHTML = html();
}

/**
 * Adds a simple way to define your own renderer.
 *
 * @param  {Function} customRenderer A function that takes the custom element root and a function `html` which once executed renders the created dom nodes to the root node of the custom element.
 *
 * @return {Function}
 */
function renderer(customRenderer = defaultRenderer) {
  return createElement => (...args) => {
    const element = createElement(...args);
    element.renderer = customRenderer;
    return element;
  };
}

/**
 * Middleware is the suggested way to extend Swiss Element with custom functionality. Middleware lets you wrap the element's render method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.
 *
 * @param  {...Function} middleware Functions that conform to the Swiss Element _middleware_ API. Each middleware receives `SwissElement`'s `render` function as a named argument, and returns a function. That function will be given the `next` middleware's render method, and is expected to return a function of `fragment` calling `next(fragment)` with a potentially different argument, or at a different time, or maybe not calling it at all. The last middleware in the chain will receive the real element's `render` method as the `next` parameter, thus ending the chain. So, the middleware signature is `({ render }) => next => fragment`.
 *
 * @return {Function}
 */
function applyMiddleware(...middleware) {
  return createElement => (...args) => {
    const element = createElement(...args);

    let render = () => {
      throw new Error(
        `Rendering while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this render.`
      );
    };

    const middlewareAPI = {
      render: (...args) => render(...args)
    };

    const chain = middleware.map(mw => mw(middlewareAPI));
    render = compose(...chain)(element.render.bind(element));

    element.render = render;
    return element;
  };
}

function createThunkMiddleware(extraArgument) {
  return ({ render: render$$1 }) => {
    return next => fragment => {
      if (typeof fragment === 'function') {
        return fragment(render$$1, extraArgument);
      }

      return next(fragment);
    };
  };
}

const logger = element$$1 => next => (fragment) => {
  console.log(element$$1, fragment);
  console.log(1, 'logger');
  const result = next(fragment);
  console.log(2, 'logger');
  return result;
};

function TodoApp(element$$1) {
  const [count, setCount] = state(0);

  return function(render$$1) {
    return Promise.resolve().then(() => {
      setTimeout(() => {
        render$$1(html`
          <a href="#" onclick="${() => setCount(count + 1)}">
            Check this out ${count} ${element$$1.value}
          </a>`);
      }, 1000);
    });
  };
}

const enhance = compose(
  renderer(render),
  applyMiddleware(logger, createThunkMiddleware())
);

element('todo-app', TodoApp, enhance, {
  observedAttributes: ['value']
});

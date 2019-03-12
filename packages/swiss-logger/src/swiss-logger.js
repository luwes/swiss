import beautify from 'js-beautify';
import DiffMatchPatch from 'diff-match-patch';

const defaults = {
  level: 'log',
  logger: console,
  collapsed: undefined,
  duration: true,
  timestamp: true,
  colors: {
    title: () => 'inherit',
    element: () => '#03A9F4'
  }
};

function createLogger(options = {}) {
  const loggerOptions = Object.assign({}, defaults, options);

  const { logger } = loggerOptions;

  // Return if 'console' object is not defined
  if (typeof logger === 'undefined') {
    return () => next => html => next(html);
  }

  const logBuffer = [];

  return ({ nodeName, getTree }) => next => html => {
    const logEntry = {};

    logBuffer.push(logEntry);

    logEntry.started = timer.now();
    logEntry.startedTime = new Date();
    logEntry.nodeName = nodeName;
    logEntry.prevHtml = getTree();

    const returnedValue = next(html);

    logEntry.nextHtml = getTree();
    logEntry.took = timer.now() - logEntry.started;

    printBuffer(logBuffer, Object.assign({}, loggerOptions));
    logBuffer.length = 0;

    return returnedValue;
  };
}

const defaultLogger = createLogger();
export default defaultLogger;

function defaultTitleFormatter(options) {
  const { timestamp, duration } = options;

  return (nodeName, time, took) => {
    const parts = ['element'];

    parts.push(`%c${String(nodeName)}`);
    if (timestamp) parts.push(`%c@ ${time}`);
    if (duration) parts.push(`%c(in ${took.toFixed(2)} ms)`);

    return parts.join(' ');
  };
}

function printBuffer(buffer, options) {
  const {
    logger,
    titleFormatter = defaultTitleFormatter(options),
    collapsed,
    colors
  } = options;

  const isUsingDefaultFormatter = typeof options.titleFormatter === 'undefined';

  buffer.forEach((logEntry, key) => {
    const { started, startedTime, prevHtml, nodeName } = logEntry;
    let { took, nextHtml } = logEntry;
    const nextEntry = buffer[key + 1];

    if (nextEntry) {
      nextHtml = nextEntry.prevHtml;
      took = nextEntry.started - started;
    }

    // Message
    const isCollapsed =
      typeof collapsed === 'function'
        ? collapsed(() => nextHtml, prevHtml, logEntry)
        : collapsed;

    const formattedTime = formatTime(startedTime);
    const titleCSS = colors.title ? `color: ${colors.title(nodeName)};` : '';
    const headerCSS = ['color: gray; font-weight: lighter;'];
    headerCSS.push(titleCSS);
    if (options.timestamp) headerCSS.push('color: gray; font-weight: lighter;');
    if (options.duration) headerCSS.push('color: gray; font-weight: lighter;');
    const title = titleFormatter(nodeName, formattedTime, took);

    // Render
    try {
      if (isCollapsed) {
        if (colors.title && isUsingDefaultFormatter) {
          logger.groupCollapsed(`%c ${title}`, ...headerCSS);
        } else logger.groupCollapsed(title);
      } else if (colors.title && isUsingDefaultFormatter) {
        logger.group(`%c ${title}`, ...headerCSS);
      } else {
        logger.group(title);
      }
    } catch (e) {
      logger.log(title);
    }

    if (logger.withTrace) {
      logger.groupCollapsed('TRACE');
      logger.trace();
      logger.groupEnd();
    }

    const linesDiff = diff_lineMode(formatHtml(prevHtml), formatHtml(nextHtml));
    linesDiff.forEach((current, index) => {
      let next = linesDiff[index + 1];
      if (current[0] === -1 && next[0] === 1) {
        const dmp = new DiffMatchPatch();
        const diff = dmp.diff_main(current[1], next[1], false);
        linesDiff[index] = [-2, diff.filter(d => d[0] <= 0)];
        linesDiff[index + 1] = [2, diff.filter(d => d[0] >= 0)];
      }
    });

    let strings = [];
    let styles = [];
    let hintOfGreen = '#E5FFED';
    let remyRed = '#FFEDF0';
    let madangGreen = '#ACF2BD';
    let lightPink = '#FCB8C0';

    linesDiff.forEach(part => {
      if (part[0] === -2) {
        strings.push(`%c`);
        styles.push(addSharedStyles(`background-color:${remyRed}`));
        part[1].forEach(piece => {
          strings.push(`%c${piece[1]}`);
          styles.push(
            piece[0] === -1
              ? addSharedStyles(`background-color:${lightPink}`)
              : addSharedStyles(`background-color:${remyRed}`)
          );
        });
      } else if (part[0] === 2) {
        strings.push(`%c`);
        styles.push(addSharedStyles(`background-color:${hintOfGreen}`));
        part[1].forEach(piece => {
          strings.push(`%c${piece[1]}`);
          styles.push(
            piece[0] === 1
              ? addSharedStyles(`background-color:${madangGreen}`)
              : addSharedStyles(`background-color:${hintOfGreen}`)
          );
        });
      } else {
        strings.push(`%c${part[1]}`);
        styles.push(
          part[0] === 1
            ? addSharedStyles(`background-color:${hintOfGreen}`)
            : part[0] === -1
            ? addSharedStyles(`background-color:${remyRed}`)
            : addSharedStyles('')
        );
      }
    });

    logger.log(strings.join(''), ...styles);

    try {
      logger.groupEnd();
    } catch (e) {
      logger.log('—— log end ——');
    }
  });
}

function addSharedStyles(style) {
  return `line-height: 16px; font-size: 11px; font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace; ${style}`;
}

export const repeat = (str, times) => new Array(times + 1).join(str);

export const pad = (num, maxLength) =>
  repeat('0', maxLength - num.toString().length) + num;

export const formatTime = time =>
  `${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(
    time.getSeconds(),
    2
  )}.${pad(time.getMilliseconds(), 3)}`;

// Use performance API if it's available in order to get better precision
export const timer =
  typeof performance !== 'undefined' &&
  performance !== null &&
  typeof performance.now === 'function'
    ? performance
    : Date;

function formatHtml(html) {
  return beautify.html(html, {
    indent_size: 2,
    end_with_newline: true
  });
}

function diff_lineMode(text1, text2) {
  const dmp = new DiffMatchPatch();
  var a = dmp.diff_linesToChars_(text1, text2);
  var lineText1 = a.chars1;
  var lineText2 = a.chars2;
  var lineArray = a.lineArray;
  var diffs = dmp.diff_main(lineText1, lineText2, false);
  dmp.diff_charsToLines_(diffs, lineArray);
  dmp.diff_cleanupSemantic(diffs);
  return diffs;
}

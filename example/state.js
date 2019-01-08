// import the library and its hooks
import augmentor, {useCallback, useRef, useState} from '../esm/index.js';

const test = (el) => {

  const counter = useRef(0);

  const [activated,  setActivated] = useState(() => false);
  const [firstTime,  setFirstTime] = useState(true);

  const onclick = useCallback(() => {
    counter.current++;
    if (firstTime)
      setFirstTime(false);
    setActivated(!activated);
  }, []);

  const handler = useRef({
    onmouseover(event) {
      console.log('over', event.currentTarget.id);
    },
    handleEvent(event) {
      this['on' + event.type](event);
    }
  });

  el.innerHTML = `
    <strong>#${el.id}</strong><br>
    activated: ${activated}<br>
    first time: ${firstTime}<br>
    clicked: ${counter.current} times<br>
  `;

  el.addEventListener('click', onclick);
  el.addEventListener('mouseover', handler.current);

};

const [one, two] = [test, test].map(augmentor);

addEventListener('load', () => {
  one(first);
  two(second);
});

// import the library and its hooks
import augmentor, {useRef, useState} from '../esm/index.js';

const test = (el) => {
  const counter = useRef(0);
  const [activated,  setActivated] = useState(() => false);
  const [firstTime,  setFirstTime] = useState(true);
  el.innerHTML = `
    <strong>#${el.id}</strong><br>
    activated: ${activated}<br>
    first time: ${firstTime}<br>
    clicked: ${counter.current} times<br>
  `;
  el.onclick = () => {
    counter.current++;
    if (firstTime)
      setFirstTime(false);
    setActivated(!activated);
  };
};

const [one, two] = [test, test].map(augmentor);

addEventListener('load', () => {
  one(first);
  two(second);
});

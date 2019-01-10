const {default: augmentor} = require('../');
const {useUpdate} = require('./use-update');

const zero = augmentor(increment);

zero({value: 0});

function increment(ref) {
  // used to invoke again the augmented function
  const update = useUpdate();
  setTimeout(update, 1000);

 // log and increment the reference value
  console.log(ref.value++);
}

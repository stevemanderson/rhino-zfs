'use-strict';

import zfs from 'zfs';

const z = (x, y = 3) => {
  const t = 1;
  return t * x * y;
};

console.log(z(1));

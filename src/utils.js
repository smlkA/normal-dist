import { jStat } from "jStat";

function* generator(mean, STD) {
  let x = mean - 4 * STD;
  const rightX = mean + 4 * STD;

  yield { x: mean - 5 * STD, y: 0 };
  while (x <= rightX) {
    const y = jStat.normal.pdf(x, mean, STD);
    yield { x, y };
    x += STD / 10;
  }
  yield { x: mean + 5 * STD, y: 0 };
}

export const generateNormalDist = (mean, STD) => {
  return Array.from(generator(mean, STD));
};

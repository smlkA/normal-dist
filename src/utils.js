import { jStat } from "jStat";

const pointFrequency = 10;

function* generator(mean, STD) {
  let x = mean - 3 * STD;
  const rightX = mean + 3 * STD;

  yield { x: mean - 4 * STD, y: 0 };
  while (x <= rightX) {
    const y = jStat.normal.pdf(x, mean, STD);
    yield { x, y };
    x += STD / pointFrequency;
  }
  yield { x: mean + 4 * STD, y: 0 };
}

export const generateNormalDist = (mean, STD) => {
  return Array.from(generator(mean, STD));
};

import * as d3 from "d3";

const xMarginCoeff = 2;
export const prepareLineData = (xScale, yScale) => {
  return d3
    .line()
    .x(function (d) {
      return xScale(d.x);
    })
    .y(function (d) {
      return yScale(d.y);
    });
};

export const calculateInitScale = (points, STD, scales) => {
  const { xScale, yScale } = scales;
  xScale.domain([
    points[0].x - xMarginCoeff * STD,
    points[points.length - 1].x + xMarginCoeff * STD,
  ]);
  yScale.domain(d3.extent(points, (d) => d.y));
  return { x: xScale, y: yScale };
};

export const recalculateScale = (points, STD, scales, plotSize) => {
  const { width, height } = plotSize;
  const { xScale, yScale } = scales;
  const [xMin, xMax] = d3.extent(points, (d) => d.x);
  const yMax = d3.max(points, (d) => d.y);

  if (
    (xScale(xMax) > width && xScale(xMin) < 0) ||
    Math.abs(yScale(yMax)) > height
  ) {
    xScale.domain([
      points[0].x - xMarginCoeff * STD,
      points[points.length - 1].x + xMarginCoeff * STD,
    ]);
    yScale.domain(
      d3.extent(points, function (d) {
        return d.y;
      })
    );
  } else if (xScale(xMax) > width || xScale(xMin) < 0) {
    xScale.domain([
      points[0].x - xMarginCoeff * STD,
      points[points.length - 1].x + xMarginCoeff * STD,
    ]);
  }
  return { x: xScale, y: yScale };
};

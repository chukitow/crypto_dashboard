export const mapDataToLineChart = data =>
  data.reduce((acc, val) => {
    acc[val.time] = val.USD;
    return acc;
  }, {})

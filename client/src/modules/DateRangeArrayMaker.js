module.exports = class DateRangeArrayMaker {
  getDateArray(startDate, endDate) {
    const arr = [];
    const dt = new Date(startDate);
    while (dt <= endDate) {
      arr.push(new Date(dt).toISOString().slice(0, 10));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }
};

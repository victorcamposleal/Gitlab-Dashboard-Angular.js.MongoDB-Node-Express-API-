let today = new Date();
today.setDate(today.getDate()-7);
isoDate = today.toISOString();

module.exports = isoDate;
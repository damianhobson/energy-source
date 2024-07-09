const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dateToday = () => {
  const nowDate = new Date();
  return nowDate.getDate()+'-'+(months[nowDate.getMonth()])+'-'+nowDate.getFullYear();
}

app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
 });

app.get("/api/fuelmix", (req, res) => {
  fetch(`https://smartgriddashboard.com/DashboardService.svc/data?area=fuelmix&region=ALL&datefrom=${dateToday()}+00%3A00&dateto=${dateToday()}+23%3A59`, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "priority": "u=1, i"
    },
    "body": null,
    "method": "GET"
  })
  .then((response) =>  response.json())
  .then((data) => {
    const cleanData = data.Rows
      .filter(row => {
        return (row.Value === null) ? false : row;
      })
      .map(row => {
        return {'date': Date.parse(row.EffectiveTime), 'name': row.FieldName, 'value': row.Value};
      })
    res.json(cleanData);
  })
  .catch((error) => console.log(error));
});
app.get("/api/graph", (req, res) => {
  fetch(`https://smartgriddashboard.com/DashboardService.svc/data?area=${req.query.type}&region=ALL&datefrom=${dateToday()}+00%3A00&dateto=${dateToday()}+23%3A59`, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "priority": "u=1, i"
    },
    "body": null,
    "method": "GET"
  })
  .then((response) => response.json())
  .then((data) => {
    const cleanData = data.Rows
      .filter(row => {
        return (row.Value === null) ? false : row;
      })
      .map(row => {
        return {'date': Date.parse(row.EffectiveTime), 'value': row.Value};
      })
    res.json(cleanData);
  })
  .catch((error) => console.log(error));
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
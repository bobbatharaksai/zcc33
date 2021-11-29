const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const axios = require('axios');

const countURL = 'https://zcc33.zendesk.com/api/v2/tickets/count'
const ticketURL = 'https://zcc33.zendesk.com/api/v2/tickets/';
const AuthStr = 'Basic IHRib2JiYUB1Y2kuZWR1OlF3ZXJ0eUAzMw==';
const headers = {'Authorization': AuthStr, 'Content-type': 'application/json'}

let data = [];

function getAllTickets(count) {
    let pagesCount = parseInt(count/100) + 1;
    let pageIndex = 1;
    let pa = [];
    while (pageIndex <= pagesCount) {
        pa.push(axios.get(ticketURL,{'headers': headers, params: {page: pageIndex}}));
        pageIndex += 1;
    }
    return pa;
}

app.get("/tickets", (req, resp) => {
    axios.get(countURL, {'headers': headers}).then(response => {
        Promise.all(getAllTickets(response.data.count.value)).then(value => {
            value = value.map(item => item.data.tickets);
            data = [];
            value.forEach(val => {
                data.push(...val);
            });
            resp.json({'tickets': data});
        });
    }).catch(error => {
        console.log(error);
        return resp.status(400).send({error: "Invalid Request"});
    });
});

app.get("/tickets/:id", (req, resp) => {
    axios.get(ticketURL + req.params.id, {'headers': headers}).then(response => {
            resp.json(response.data);
    }).catch(error => {
        console.log(error);
        return resp.status(400).send({error: "Invalid Request"});
    });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

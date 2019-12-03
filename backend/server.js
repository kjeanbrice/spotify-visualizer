var express = require('express');
var app = express();

const port = process.env.PORT || 3000;
app.get('/',(req,res) => {
    res.send("Hello from node");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
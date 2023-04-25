const express = require("express"); // import express

const app = express(); // create a new app

const cats = [];

app.use(express.json()); // parses request body from a json string then sets it into res.body

app.post("/create", (req, res) => {
    cats.push(req.body);
    res.json(cats[cats.length - 1]);
});

app.get("/getAll", (req, res) => res.json(cats));

app.patch("/update/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.query; // extracting the ?name=value from the request
    const toUpdate = cats[id];
    toUpdate.name = name;
    res.json(toUpdate);
})

app.delete("/remove/:id", (req, res) => {
    const { id } = req.params;
    const removed = cats.splice(id, 1);
    res.json(removed);
})



const server = app.listen(4494, () => console.log('Server successfully started on port', server.address().port));
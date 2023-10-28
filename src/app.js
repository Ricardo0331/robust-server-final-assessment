const express = require("express");
const urls = require("./data/urls-data"); //import URL data
const uses = require("./data/uses-data");


const app = express(); //initialize the express app

app.use(express.json()); //add Middleware

//GET route to retrieve all URLS
app.get("/urls", (req, res) => {
    res.json({ data: urls }); // use the imported urls data
});

// POST route to create a new URL 
app.post("/urls", (req,res) => {
    const { href } = req.body;
    const newUrlId = urls.length + 1; // assign new ID
    const newUrl = { id: newUrlId, href };
    urls.push(newUrl); // add to the urls array
    res.status(201).json({ data: newUrl }); //return new URL 
});


//GET route to retrieve a URL by its ID 
app.put("/urls/:urlId", (req, res) => {
    const { urlId } = req.params;
    const { href } = req.body;
    const foundUrl = urls.find((url) => url.id === Number(urlId));

    res.json({ data: foundUrl});
});


//PUT route to update URL by its ID
app.put("/urls/:urlId", (req, res) => {
    const { urlId } = req.params;
    const { href } = req.body;
    const foundUrl = urls.find((url) => url.id === Number(urlId));
    foundUrl.href = href; 

    res.json({ data: foundUrl });
}); 

//create a usage metric when a URL is accessed 
app.get("/urls/:urlId", (req, res) => {
    const { urlId } = req.params;
    const foundUrl = urls.find((url) => url.id === Number(urlId));
    const newUseId = uses.length + 1; // assign a new ID
    const newUse = { id: newUseId, urlId: Number(urlId), time: Date.now() };

    uses.push(newUse); // add to the uses array
    res.json({ data: foundUrl });
});


//GET route to retrieve usage metric by its ID 
app.get("/uses/:useId", (req, res) => {
    const { useId } = req.params;
    const foundUse = uses.find((use) => use.id === Number(useId));

    res.json({ data: foundUse }); 
});


// GET route to retrieve a list of all usage metrics
app.get("/uses", (req, res) => {
    res.json({ data: uses }); 
});


//DELETE route to delete a usage metric by its ID
app.delete("/uses/:useId", (req, res) => {
    const { useId } = req.params
    const index = uses.findIndex((use) => use.id === Number(useId));

    uses.splice(index, 1) // remove the usage metric
    res.sendStatus(204); // no content
});


//ERROR HANDLING

//Middleware for 404 errors
app.use((req, res, next) => {
    res.status(404).json({ error: "Resource not found" });
});


//405 for DELETE on /urls/:urlId
app.delete("/url/:urlId", (req, res) => {
    res.status(405).json({ error: "Method not allowed" }); 
});


//xport the app
module.exports = app;

const express = require("express");
const urls = require("./data/urls-data"); //import URL data

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
    const newUrl = { id: newUrl, href };

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

//xport the app
module.exports = app;

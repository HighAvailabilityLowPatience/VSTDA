const express = require('express');
const morgan = require('morgan');
const logic = require('./logic');

const app = express();


//Middleware
app.use(morgan('dev'));
app.use(express.json());


//Routes

//Base Route
app.get('/', (req, res) => {
    console.log('ROOT HIT');
    try {
        //call our healthyserver function
        const data = logic.healthyServer();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
//READ all to-do items route
app.get('/api/TodoItems', (req, res) => {
    try {
        //call our Readall  function
        const items = logic.readAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

//READ a specific to-do item route
app.get('/api/TodoItems/:id', (req, res) => {
    console.log('Finding your item.....',req.params.id);
    try {
        //Call our findatask function
        const id = Number(req.params.id);
        const findMe = logic.findTask(id); 
        res.status(200).json(findMe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//POST/CREATE a new item to the list route
app.post('/api/TodoItems', (req, res) => {
    console.log('Adding new item.....', req.body)
    try {
        //Call our additem function that is inside of logic
        const itemtoAdd = logic.addItem(req.body);
        //We also need to return what we posted to our array
        res.status(201).json(itemtoAdd);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
//DELETE and specific item from the list route
app.delete('/api/TodoItems/:id', (req, res) => {
    console.log('Id of item to be deleted',req.params.id)
  try {
    //Calling our function to delete items
    const id = Number(req.params.id);
    const deleted = logic.removeItem(id);

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Passing the phone
module.exports = app;

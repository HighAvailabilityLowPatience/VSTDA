const express = require('express');
const app = require('./app');

app.listen(8484, () => {
    console.log('Server running on port 8484');
});

module.exports = app;

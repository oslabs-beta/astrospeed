const express = require('express');
const app = express();
const PORT = 80;

app.use('/demo', express.static('demo'))
app.use(express.static('dist'));


app.listen(PORT);
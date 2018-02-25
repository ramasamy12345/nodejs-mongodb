'use strict'

const express    = require('express');
const path       = require('path');
const appDir     = require('./config/app');
const bodyParser = require('body-parser');
const ejs        = require('ejs');
const port       = appDir.serverLocation.port;
const app        = express();
const cors       = require('cors');
const mainRoutes = require('./routes/index');
const apiRoutes  = require('./routes/api');
const mongo      = require('./config/mongo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/', mainRoutes);
app.use('/api', apiRoutes)
app.set('views', __dirname + '/public/Views')
app.set('view engine', ejs);
app.engine('html', ejs.renderFile);
app.use(express.static(path.join(__dirname + 'public')));

app.listen(port, () => {
    console.log("listening at port #", port)
})


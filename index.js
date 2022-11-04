const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const logger = require('./Middleware/logger');
const members = require('./Members');

const app = express();

//initializing middleware
// app.use(logger);

//handlebars middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//homepage render
app.get('/', (req, res) => res.render('index', {
    title: "Member App",
    members 
}));

//setting a static folder 
app.use(express.static(path.join(__dirname, 'public')));

//member API routes
app.use('/api/members', require('./Routes/api/members'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes';)

const app = express();

const PORT = process.env.PORT || 8080;

// configurations for static, and routes middleware

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes)

// set up server listener

app.listen(PORT, () => {
    console.log("Server is listening on PORT: ${port");
})



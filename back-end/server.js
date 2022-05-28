const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.enable('trust proxy');

app.use('/', require('./api/index'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
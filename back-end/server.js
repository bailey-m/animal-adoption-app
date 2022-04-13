const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/helloworld', (req, res) => {
    let data = {data: "This is a message from the server!"}
    res.send(data)
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
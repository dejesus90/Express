const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());


app.use('/api',  require('./routes/index') );

app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
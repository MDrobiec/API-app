const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');

// Constants

// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('hello world')
  })
/* user  */

var register = require('./routes/user/registerUser');
var loginWeb = require('./routes/user/loginUserWeb');
var loginPhone = require('./routes/user/loginUserPhone');
var getUser = require('./routes/user/getUser');
var resetPassword = require('./routes/user/resetPassword');
var resetPin = require('./routes/user/resetPin');
var getMyUser = require('./routes/user/getMyUser');

app.use(register.routerInsert);
app.use(loginWeb.routerGet);
app.use(loginPhone.routerGet);
app.use(getUser.routerGet);
app.use(resetPassword.routerPost);
app.use(resetPin.routerPost);
app.use(getMyUser.routerGet);


/* ------------------------------------ */
/* privilages  */

var sDPrivilages = require('./routes/privilages/directoryPrivilages');
var sGetPrivilages = require('./routes/privilages/getPrivilages');
var sSetPrivilages = require('./routes/privilages/setPrivilages');

app.use(sDPrivilages.routerGet);
app.use(sDPrivilages.routerPost);
app.use(sGetPrivilages.routerGet);
app.use(sSetPrivilages.routerPost);

/* ------------------------------------ */
/* register  */


/* ------------------------------------ */
/* devices  */


/* ------------------------------------ */
/* logi  */


/* ------------------------------------ */

app.listen(port);
console.log(port)
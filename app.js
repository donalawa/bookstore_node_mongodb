const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var pug = require('pug');
 
const expressHbs  = require('express-handlebars')

const app = express();

const errorController = require('./controllers/error')

const mongoConnect = require('./util/database').mongoConnect;
//Bellow is needed for pug
// app.engine('pug', require('pug').__express)
// app.set('view engine', 'pug');
// app.set('views','views')


const roodDir = require('./util/path')

//Bellow is needed for handle bars
// app.engine('handlebars',expressHbs({layoutsDir: 'views/layouts',defaultLayout: 'main'}));
// app.set('view engine','handlebars');
// app.set('views','views')

//Bellow is needed for ejs
app.engine('ejs', require('ejs').__express);
app.set('view engine','ejs');
app.set('views','views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop') 

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)



mongoConnect((client) => {
    app.listen(7000,()=>{
        console.log('Sever listening on port 7000')
    })
})


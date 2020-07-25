const http = require('http');
const express = require('express')

const app = express();

app.use('/',(req,res,next) => {
    console.log('This always runs')
    next();//Allow the program to continue to the next midleware
})

app.use('/add-product', (req,res,next) => {
    res.send('<h1>This Is The Product Page')
})
app.use('/',(req,res,next) => {
    console.log('In another new midleware');
    // We can send a response
    res.send('<h1>Hello Express World</h1>')

})

app.listen(4000)
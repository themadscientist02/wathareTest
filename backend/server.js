// fileName : server.js 
// Example using the http module
// const http = require('http');
const express = require('express')
const cors =require('cors')

const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const machinerouter = require('./machine')
app.use('/machine',machinerouter)
app.listen(4000,'0.0.0.0',()=>{
    console.log('server started on port 4000')
})
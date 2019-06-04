const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const mongo = require("mongoose")
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongo://127.0.0.1:27017'
const databaseName = 'coding-challenge'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if (error)
        return console.log('Unable to connect to database!')
        console.log('Connected correctly!')
})
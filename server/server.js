//=============================================== Declare Variables =============================//
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const port = process.env.port || 8080;
const password = process.env.password || '';







//=============================================== Connect To DataBase =======================================//
mongoose.connect(`mongodb+srv://ITIMinia:${password}@cluster0.mz6gk.mongodb.net/book-store`).then(response=>{
    console.log(chalk.bold.green('Connected to database'));
    app.listen(port, ()=>console.log(chalk.bold.green('Server Up To Port', port)));
})

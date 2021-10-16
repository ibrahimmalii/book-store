const mongoose = require('mongoose');
const chalk = require('chalk');
const password = process.env.password || 'oE0DHMzPBXz06Hj7';



mongoose.connect(`mongodb+srv://ITIMinia:${password}@cluster0.mz6gk.mongodb.net/book-store`,{
    useNewUrlParser : true
}).then(()=>{
    console.log(chalk.bold.green('Connected to database'));
}).catch(console.error);



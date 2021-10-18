//=============================================== Declare Variables =============================//
const express = require('express');
const app = express();
require('./db/mongoose');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config()
const port = process.env.port || 8080;

//============================================== import routes =================================//
const authRouter = require('./routes/auth')
const userRoute = require('./routes/user')
const bookRoute = require('./routes/book')





// Middle wares
app.use(express.json())
app.use(bodyParser())
app.use('/api/auth', authRouter)
app.use('/api/users', userRoute)
app.use('/api/books', bookRoute)



//=============================================== Connect To Server ===========================//
app.listen(port, ()=>console.log(chalk.bold.green('Server is up on Port', port)));

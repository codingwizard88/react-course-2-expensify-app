const path = require('path')
//Create a new express application
//this is the 'node' way to imports something
const express  = require('express');
//create a new instance of express. So far we have a library in here but we don't have an app
const app = express();
// __dirname is the current directory
const publicPath = path.join(__dirname, '..', 'public');

//setup a dynamic port so that if 'process.env.PORT exists then we're on heroku, if not, then we default to port 3000 on our local machine
const port = process.env.PORT || 3000

//this is one way to customize our express server, which we will use to register some middlewear (something that runs for each request)
//take the return function from express.static() and pass it into app.use()
//static take the path of the folder we want to serve as an argument.
app.use(express.static(publicPath))

//when someone makes a get request to our server'
// use '*' to match all unmatched routes
//process all the unhandled requests
app.get('*', (req,res) => {
res.sendFile(path.join(publicPath, 'index.html'))
})
//listen on port 3000 (available in all operating systems), and activate the call back function once the port is being listeend to.
app.listen(port, () => {
    console.log('Server is up!')
})
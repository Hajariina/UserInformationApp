const express = require ('express');   // bash this when you use 'use', 'set', 'get' etc. // you can not change the var any more because of the const
const fs = require ('fs'); // bash when you use fs.readfile
const app = express();
const bodyParser = require ('body-parser'); // require node.js middleware parser
const pug = require ('pug');


app.use(bodyParser.urlencoded({ extended: true }))  // why is this true


// setting views folder (we pretend we have created a 'static folder', could also be another name)
app.use(express.static('/static'))


// setting view engine to pug
app.set ('view engine', 'pug');	
// set where the view engine is located. In this case that is the views folder. Ask melvin if it could also be another name
app.set ('views','./views')

// do a request
app.get('/', function (request, response){
	console.log ('about to render a pug page');
	fs.readFile('./users.json', 'utf-8', (error, data) => {
		console.log ('readfile is called');  // leave this next time, just a personal check
		if (error) {

		throw error; 
	}
	// we need to parse the json data

	const values= JSON.parse(data);

	// we want to render the page



	response.render ('index'); {people: values};  // this is our end

	});
	// anything that goes here is executed first
	//but also is probably useless, because ./database.json, which is not available here
});

app.listen(3000, () => {
	console.log ('server has started');
});

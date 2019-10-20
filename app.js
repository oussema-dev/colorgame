require('dotenv').config();
let express = require('express'),
	app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(process.env.PORT, process.env.IP, () => {
	console.log('Server started on port ' + process.env.PORT);
});

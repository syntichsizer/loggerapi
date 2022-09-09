const express = require('express');
const cors = require('cors');
const fs = require('fs');
const res = require('express/lib/response');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3002, () => {
	console.log('Listening on port 3002!');
});

app.get('/', (req, res) => {
	res.send('API is running!');
});

app.get('/data', (req, res) => {
	fs.readFile('./log.log', (err, data) => {
		if (err) res.status(400).json({ error: err });
		else res.send(data.toString());
	});
});

app.post('/data', (req, res) => {
	if (!req.body) {
		res.status(400).json({ error: 'Body not specified' });
	}

	const date = new Date(req.body.date);

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	console.log(req.body);

	const data = `${hours}:${minutes}:${seconds} [${req.body.level}]: ${req.body.data}</br>\n`;

	fs.appendFile('./log.log', data, (err) => {
		if (err) res.status(400).json({ error: err });
		else res.send('Success');
	});
});

app.get('/clear', (req, res) => {
	fs.writeFile('./log.log', '', (err) => {
		if (err) res.status(400).json({ error: err });
		else res.send('Success');
	});
});

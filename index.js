const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body ')
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
];

app.get('/info', (req, res) => {
  const timeStamp = new Date();
  const date = timeStamp.toTimeString();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> <br> <p>${date}</p>`
  );
});

app.get('/api/persons', (req, res) => res.json(persons));

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((pers) => {
    return pers.id === id;
  });
  if (person) {
    res.json(person);
  } else {
    res.status(404).end('Error 404: No person with this ID');
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((pers) => pers.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const randomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  const names = persons.filter(
    (el) => el.name.toLowerCase() === body.name.toLowerCase()
  );

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name and number missing' });
  }

  if (names.length > 0) {
    return res
      .status(406)
      .json({ error: 'Not acceptable: this name already exists' });
  }

  const person = {
    id: randomId,
    name: body.name,
    number: body.number
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

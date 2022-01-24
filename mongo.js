const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://grimmjow:${password}@cluster0.fzo0m.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: 'Mary Poppins',
  number: '39-23-642'
});

person.save().then((res) => {
  console.log('note saved!');
  mongoose.connection.close();
});

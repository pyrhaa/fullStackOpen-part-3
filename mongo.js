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

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });
  person.save().then((res) => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    mongoose.connection.close();
  });
} else if (process.argv.length < 5) {
  console.log('Error: You must add a name and a number');
  process.exit(1);
} else {
  Person.find({}).then((res) => {
    console.log('phonebook:');
    res.forEach((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
}

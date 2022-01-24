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

// if(process.argv[3] && process.argv[4]){

// }else{

// }

// const person = new Person({
//   name: 'Sarah Ait Tamazgha',
//   number: '33-56-345'
// });

// person.save().then((res) => {
//   console.log(`added ${} number ${} to phonebook`);
//   mongoose.connection.close();
// });

Person.find({}).then((res) => {
  console.log('phonebook:');
  res.forEach((person) => console.log(person.name, person.number));
  mongoose.connection.close();
});

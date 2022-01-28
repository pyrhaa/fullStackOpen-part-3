const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      minLength: 8,
      validator: (v) => /\d[2-3]-\d{5,}/.test(v),
      message: (props) =>
        `${props.value} is not a valid phone number, follow the phone standard ([2 or 3 numbers]-[minimum 5 numbers])!`
    },
    required: true
  }
});

personSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);

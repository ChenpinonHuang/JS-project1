// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/

const mongoose = require('mongoose');

const LibSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true 
  },
  author: {
    type: String,
    required: false
  },
  status: {  //record the status of books
    type: String,
    enum: ['Available', 'Lent out'], 
    default: 'Available'
  }
}, {
  timestamps: true
});

// Query Helpers
LibSchema.query.drafts = function () {
  return this.where({
    status: 'Available'
  })
};

LibSchema.query.published = function () {
  return this.where({
    status: 'Lent out'
  })
};

LibSchema.virtual('synopsis')
.get(function () {
  const post = this.content;
  return post
    .replace(/(<([^>]+)>)/ig,"")
    .substring(0, 250);
});

module.exports = mongoose.model('Resource', LibSchema);
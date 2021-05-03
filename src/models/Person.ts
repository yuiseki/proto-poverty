import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
});

export default mongoose.models.Person || mongoose.model('Person', PersonSchema);

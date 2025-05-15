import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  dueDate: Date,
  priority: { type: String, enum: ['high', 'medium', 'low'] },
  status: { type: String, enum: ['active', 'completed','to-do'] },
  isDeleted: { type: Boolean, default: false }
});

export default mongoose.model('Task', taskSchema);

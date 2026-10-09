import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters long'],
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: ''
    },
    completed: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      trim: true,
      enum: {
        values: ['Tech', 'Project', 'Fitness', 'Study', 'Shopping', 'Career', 'Personal', 'General'],
        message: '{VALUE} is not a supported category'
      },
      default: 'General'
    }
  },
  {
    timestamps: true
  }
);

// Virtual or helper transformation for consistent _id / id
TaskSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

export const Task = mongoose.model('Task', TaskSchema);

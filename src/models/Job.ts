import mongoose, { Document, Schema } from 'mongoose';

interface Job extends Document {
    job_id: string;
    nation_id: string;
    job_title: string;
    job_detail: string;
    salary: number;
    credit_rating: number;
    assigned_member: number;
    total_member: number;
}

// Create the Mongoose schema for the Job model
const jobSchema = new Schema<Job>({
    job_id: {
        type: String,
        required: false,
    },
    nation_id: {
        type: String,
        required: false,
    },
    job_title: {
        type: String,
        required: true,
    },
    job_detail: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    credit_rating: {
        type: Number,
        required: true,
    },
    assigned_member: { 
        type: Number, 
        default: 0 
    }, // default 0 for initial assignment
    total_member: { 
        type: Number, 
        required: true,
    },
});

jobSchema.pre('save', function (next) {
    if (!this.job_id) {
      this.job_id = `JOB-${new mongoose.Types.ObjectId().toString()}`;
    }
    next();
  });

// Export the Mongoose model
const JobModel = mongoose.model<Job>('Job', jobSchema);

export default JobModel;
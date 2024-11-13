import { Request, Response } from 'express';
import JobModel from '../models/Job';
import asyncHandler from 'express-async-handler';
import Teacher from '../models/Teacher';

// Get all jobs in the database according to nation_id
const getAllJob = asyncHandler(async (req: Request, res: Response) => {
  const { nation_id } = req.params;

  const jobs = await JobModel.find({ nation_id });

  if (jobs.length > 0) {
    res.status(200).json(jobs);
  } else {
    res.status(404).json({ message: 'No jobs found for this nation_id' });
  }
});

// Update a job by editing the database according to job_id
const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const { job_id } = req.params;
  const updates = req.body; // Make sure this contains only the fields to be updated

  const job = await JobModel.findOneAndUpdate({ job_id }, updates, {
    new: true,
  });

  if (job) {
    res.status(200).json({ message: 'Job updated successfully', job });
  } else {
    res.status(404).json({ message: 'Job not found with the given job_id' });
  }
});

// Delete a job from the database according to job_id
const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const { job_id } = req.params;

  const job = await JobModel.findOneAndDelete({ job_id });

  if (job) {
    res.status(200).json({ message: 'Job deleted successfully' });
  } else {
    res.status(404).json({ message: 'Job not found with the given job_id' });
  }
});

// Create new job data in the database
// const createJob = asyncHandler(async (req: Request, res: Response) => {
//   const userId = req.user?._id;

//   if (!userId) {
//     return res.status(400).json({ message: 'User ID is missing from user data' });
//   }

//   // Fetch the user's nation_id
//   const user = await Teacher.findById(userId, "nation_id");
//   if (!user || !user.nation_id) {
//     return res.status(404).json({ message: 'Nation ID not found for this user' });
//   }

//   const nation_id = user.nation_id;

//   // Destructure job details from the request body
//   const {
//     job_title,
//     job_detail,
//     salary,
//     credit_rating,
//     total_member,
//   } = req.body;

//   // Validate required fields
//   if (!job_title || !job_detail || !salary || !credit_rating || !total_member) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   // Check if the job already exists with the given job_title and nation_id
//   const existingJob = await JobModel.findOne({ job_title, nation_id });
//   if (existingJob) {
//     return res.status(400).json({ message: 'Job with this title already exists in this nation' });
//   }

//   // Create a new job using the found nation_id
//   const newJob = new JobModel({
//     nation_id, // Use the nation_id from the user data
//     job_title,
//     job_detail,
//     salary,
//     credit_rating,
//     assigned_member: 0, // Default to 0 since it's a new job
//     total_member,
//   });

  // Save the new job to the database
//   const createdJob = await newJob.save();
//   if (createdJob) {
//     return res.status(201).json({ message: 'Job created successfully', job: createdJob });
//   } else {
//     return res.status(500).json({ message: 'Failed to create job' });
//   }
// });


  
export { getAllJob, updateJob, deleteJob };

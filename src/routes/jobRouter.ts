import express from 'express';
import {
  getAllJob,
  updateJob,
  deleteJob,
  // createJob,
} from '../controllers/jobController';

const router = express.Router();

router.get('/job/getall/:nation_id', getAllJob);
router.put('/job/update/:job_id', updateJob);
router.delete('/job/delete/:job_id', deleteJob);
// router.post('/job/create', createJob);

export default router;

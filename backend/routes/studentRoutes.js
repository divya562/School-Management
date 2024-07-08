import express from 'express'
import { createStudent, getStudents, getStudentById, updateStudent, setStudentStatus, deleteStudent} from '../controllers/studentController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'backend/uploads/')
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


const upload = multer({storage})
router.route('/create' ).post( upload.single('photo'),createStudent)
router.route('/allStudents').get(getStudents)
router.route('/:id')
.get(getStudentById)
.put(upload.single('photo'), updateStudent)

router.route('/setStatus/:id').put(setStudentStatus)
router.route('/delete/:id').delete(deleteStudent)

export default router;
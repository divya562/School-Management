import Student from "../model/student.model.js";

const createStudent = async (req, res) => {
    const { firstName, lastName, grade, dateOfBirth, gender, email, phone, address } = req.body;
    const photo = req.file.path
    const student = new Student({
        firstName,
        lastName,
        grade,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        email,
        phone,
        address,
        photo
    })

    const studentCreated = student.save()
    res.status(200).json({ message: "Student Created Successfully", student: studentCreated });
}


const getStudents = async (req, res) => {
    const allStudents = await Student.find({})
    res.json(allStudents)
}

const getStudentById = async (req, res) => {
    const student = await Student.findById(req.params.id)
    if (student) {
        res.json(student)
    } else {
        res.status(404);
        throw new Error('Student not found');
    }

}
const updateStudent = async (req, res) => {
    try {
        const { firstName, lastName, grade, dateOfBirth, gender, email, phone, address } = req.body;
        const photo = req.file ? req.file.path : '';

        const student = await Student.findById(req.params.id);

        if (student) {
            // Update fields
            student.firstName = firstName;
            student.lastName = lastName;
            student.grade = grade;
            student.dateOfBirth = new Date(dateOfBirth); 
            student.gender = gender;
            student.email = email;
            student.phone = phone;
            student.address = address;
            student.photo = photo;

            const updatedStudent = await student.save();
            res.json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};




const setStudentStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);

        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }

        student.isActive = !student.isActive;
        await student.save();

        res.json({ message: 'Student status updated successfully', student });
    } catch (error) {
        console.error('Error updating student status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;
  
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
          return res.status(404).json({ message: 'Student not found' });
        }
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

export { createStudent, getStudents, getStudentById, updateStudent, setStudentStatus, deleteStudent}
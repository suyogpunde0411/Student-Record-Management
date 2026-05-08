import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Alert from './components/Alert';

// const API_URL = 'http://localhost:5000/api/students';

const API_URL = '/api/students';


function App() {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: '', message: '' });
    }, 3000);
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) {
        setStudents(res.data.data);
      }
    } catch (error) {
      showAlert('error', 'Failed to fetch students. Is the backend running?');
    }
  };

  const handleSave = async (studentData) => {
    try {
      if (currentStudent) {
        // Update
        const res = await axios.put(`${API_URL}/${currentStudent._id}`, studentData);
        if (res.data.success) {
          showAlert('success', 'Student updated successfully!');
          setCurrentStudent(null);
          fetchStudents();
        }
      } else {
        // Create
        const res = await axios.post(API_URL, studentData);
        if (res.data.success) {
          showAlert('success', 'Student added successfully!');
          fetchStudents();
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to save student';
      showAlert('error', errorMsg);
    }
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const res = await axios.delete(`${API_URL}/${id}`);
        if (res.data.success) {
          showAlert('success', 'Student deleted successfully!');
          fetchStudents();
        }
      } catch (error) {
        showAlert('error', 'Failed to delete student');
      }
    }
  };

  const clearCurrent = () => {
    setCurrentStudent(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Student Record Management </h1>
        <p>A simple and modern MERN CRUD application</p>
      </header>

      {alert.show && <Alert type={alert.type} message={alert.message} />}

      <main className="main-content">
        <div>
          <StudentForm
            currentStudent={currentStudent}
            onSave={handleSave}
            clearCurrent={clearCurrent}
          />
        </div>
        <div>
          <StudentList
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

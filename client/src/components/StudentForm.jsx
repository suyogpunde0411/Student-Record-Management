import React, { useState, useEffect } from 'react';

const StudentForm = ({ currentStudent, onSave, clearCurrent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    age: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentStudent) {
      setFormData({
        name: currentStudent.name,
        email: currentStudent.email,
        course: currentStudent.course,
        age: currentStudent.age
      });
      setErrors({});
    } else {
      setFormData({ name: '', email: '', course: '', age: '' });
    }
  }, [currentStudent]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 16 || formData.age > 60) {
      newErrors.age = 'Age must be between 16 and 60';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">{currentStudent ? 'Edit Student' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? 'error' : ''}`}
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'error' : ''}`}
            placeholder="e.g. john@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Course</label>
          <input
            type="text"
            name="course"
            className={`form-control ${errors.course ? 'error' : ''}`}
            placeholder="e.g. Computer Science"
            value={formData.course}
            onChange={handleChange}
          />
          {errors.course && <span className="error-text">{errors.course}</span>}
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            className={`form-control ${errors.age ? 'error' : ''}`}
            placeholder="e.g. 20"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          {currentStudent ? 'Update Student' : 'Save Student'}
        </button>
        {currentStudent && (
          <button 
            type="button" 
            className="btn btn-sm" 
            style={{ marginTop: '10px', width: '100%', backgroundColor: '#F3F4F6', color: '#111827' }}
            onClick={clearCurrent}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default StudentForm;

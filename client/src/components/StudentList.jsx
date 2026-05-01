import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div className="card" style={{ height: '100%' }}>
      <h2 className="card-title">Student Records</h2>
      {students.length === 0 ? (
        <div className="empty-state">
          <p>No students found. Add a new student to see them here.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{student.age}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-edit" 
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-delete" 
                      onClick={() => onDelete(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;

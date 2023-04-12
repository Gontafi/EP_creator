import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    dep_name_kz: '',
    dep_name_ru: '',
    dep_name_en: '',
  });
  const [editDepartment, setEditDepartment] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/department/').then((response) => {
      setDepartments(response.data);
    });
  }, []);

  const addDepartment = () => {
    axios
      .post('http://127.0.0.1:8000/api/department/', newDepartment)
      .then((response) => {
        setDepartments([...departments, response.data]);
        setNewDepartment({ dep_name_kz: '', dep_name_ru: '', dep_name_en: '' });
      });
  };

  const updateDepartment = () => {
    axios
      .put(`http://127.0.0.1:8000/api/department/${editDepartment.id}/`, editDepartment)
      .then((response) => {
        const index = departments.findIndex((d) => d.id === response.data.id);
        const updatedDepartments = [...departments];
        updatedDepartments[index] = response.data;
        setDepartments(updatedDepartments);
        setEditDepartment(null);
      });
  };

  const deleteDepartment = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/department/${id}/`).then(() => {
      setDepartments(departments.filter((d) => d.id !== id));
    });
  };

  return (
    <>
      <h1>Department Table</h1>
      <table>
        <thead>
          <tr>
            <th>Department Name (KZ)</th>
            <th>Department Name (RU)</th>
            <th>Department Name (EN)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.dep_name_kz}</td>
              <td>{department.dep_name_ru}</td>
              <td>{department.dep_name_en}</td>
              <td>
                <button onClick={() => setEditDepartment(department)}>Edit</button>
                <button onClick={() => deleteDepartment(department.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {editDepartment && (
            <tr>
              <td>
                <input
                  type="text"
                  value={editDepartment.dep_name_kz}
                  onChange={(e) =>
                    setEditDepartment({ ...editDepartment, dep_name_kz: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editDepartment.dep_name_ru}
                  onChange={(e) =>
                    setEditDepartment({ ...editDepartment, dep_name_ru: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editDepartment.dep_name_en}
                  onChange={(e) =>
                    setEditDepartment({ ...editDepartment, dep_name_en: e.target.value })
                  }
                />
              </td>
              <td>
                <button onClick={() => updateDepartment()}>Save</button>
                </td>
            </tr>
          )}
        <tr>
          <td>
            <input
              type="text"
              value={newDepartment.dep_name_kz}
              onChange={(e) =>
              setNewDepartment({ ...newDepartment, dep_name_kz: e.target.value })
            }
          />
          </td>
          <td>
            <input
            type="text"
            value={newDepartment.dep_name_ru}
            onChange={(e) =>
            setNewDepartment({ ...newDepartment, dep_name_ru: e.target.value })
            }
            />
          </td>
          <td>
            <input
            type="text"
            value={newDepartment.dep_name_en}
            onChange={(e) =>
            setNewDepartment({ ...newDepartment, dep_name_en: e.target.value })
            }
            />
          </td>
          <td>
            <button onClick={() => addDepartment()}>Add</button>
          </td>
      </tr>
      </tbody>
    </table>
  </>
  );
};

export default DepartmentTable;
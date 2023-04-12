import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

const SubjectToChoiceComponent = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectToChoice, setSubjectToChoice] = useState([]);
  const [editingSubjectToChoice, setEditingSubjectToChoice] = useState(null);

  const fetchSubjects = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/subject-all/');
    const jsonData = await response.json();
    setSubjects(jsonData);
  };

  const fetchSubjectToChoice = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/subject-to-choice/');
    const jsonData = await response.json();
    setSubjectToChoice(jsonData);
  };

  useEffect(() => {
    fetchSubjects();
    fetchSubjectToChoice();
  }, []);

  const columns = [
    {
      id: 'col0',
      Header: 'ID',
      accessor: 'id',
    },
    {
      id: 'col1',
      Header: 'Subjects',
      accessor: (item) => {
        return item.subject
            .map((subjectId) => subjects.find((subject) => subject.id === subjectId))
            .filter((subject) => subject !== undefined)
            .map((subject) => subject.name_en)
            .join(', ');
      },
    },
    {
      id: 'col2',
      Header: 'Module',
      accessor: (item) => {
        const firstSubject = item.subject
          .map((subjectId) => subjects.find((subject) => subject.id === subjectId))
          .filter((subject) => subject !== undefined)[0];
        return firstSubject ? firstSubject.module.module_name_en : '';
      },
    },
    {
      id: 'col3',
      Header: 'Actions',
      Cell: (row) => (
        <div>
          <button onClick={() => handleUpdate(row.original.id)}>Edit</button>
          <button onClick={() => handleDelete(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleUpdate = (id) => {
    const subjectChoice = subjectToChoice.find((choice) => choice.id === id);
    setEditingSubjectToChoice(subjectChoice);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/subject-to-choice/${id}/`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      setSubjectToChoice(subjectToChoice.filter((choice) => choice.id !== id));
    } else {
      console.error('Failed to delete the subject to choice.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const subjectIds = Array.from(formData.getAll('subjects')).map(Number);

    const newSubjectToChoice = {
      subject: subjectIds,
    };

    const requestOptions = {
      method: editingSubjectToChoice.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSubjectToChoice),
    };

    const url = editingSubjectToChoice.id
      ? `http://127.0.0.1:8000/api/subject-to-choice/${editingSubjectToChoice.id}/`
      : 'http://127.0.0.1:8000/api/subject-to-choice/';

    const response = await fetch(url, requestOptions);
    const jsonData = await response.json();

    if (editingSubjectToChoice.id) {
      setSubjectToChoice(
        subjectToChoice.map((choice) => (choice.id === jsonData.id ? jsonData : choice)),
      );
    } else {
      setSubjectToChoice([...subjectToChoice, jsonData]);
    }

    setEditingSubjectToChoice(null);
  };


  return (
    <div className="container">
      <h1>Subject To Choice</h1>
      <button onClick={() => setEditingSubjectToChoice({})}>Create</button>
      {editingSubjectToChoice && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="subjects">Subjects</label>
          <select id="subjects" name="subjects" multiple defaultValue={editingSubjectToChoice.subject}>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name_en}
              </option>
            ))}
          </select>
          <button type="submit">Save</button>
          <button onClick={() => setEditingSubjectToChoice(null)}>Cancel</button>
        </form>
      )}

      {!editingSubjectToChoice && (
        <ReactTable
          data={subjectToChoice}
          columns={columns}
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 20, 50]}
          className="-striped -highlight"
        />
      )}
    </div>
  );
};

export default SubjectToChoiceComponent;

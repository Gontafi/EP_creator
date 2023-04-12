import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import './Subject.css';
const Subject = () => {
  const [data, setData] = useState([]);
  const [modules, setModules] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [cycleComponents, setCycleComponents] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);


  const fetchData = async () => {
    const subjectResponse = await fetch('http://127.0.0.1:8000/api/subject-all/');
    const subjectJsonData = await subjectResponse.json();
    setData(subjectJsonData);

    const moduleResponse = await fetch('http://127.0.0.1:8000/api/module/');
    const moduleJsonData = await moduleResponse.json();
    setModules(moduleJsonData);

    const departmentResponse = await fetch('http://127.0.0.1:8000/api/department/');
    const departmentJsonData = await departmentResponse.json();
    setDepartments(departmentJsonData);

    const competenciesResponse = await fetch('http://127.0.0.1:8000/api/competencies/');
    const competenciesJsonData = await competenciesResponse.json();
    setCompetencies(competenciesJsonData);

    const cycleComponentResponse = await fetch('http://127.0.0.1:8000/api/cycle-component/');
    const cycleComponentJsonData = await cycleComponentResponse.json();
    setCycleComponents(cycleComponentJsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getModuleById = (moduleId) => {
    return modules.find(module => module.id === moduleId);
  };

  const getDepartmentById = (departmentId) => {
    return departments.find(department => department.id === departmentId);
  };

  const getCompetenciesByIds = (competencyOfSubject) => {
    const competencyIds = competencyOfSubject.map(competency => competency.id);
    return competencies.filter(competency => competencyIds.includes(competency.id));
  };

  const getCycleComponentById = (cycleComponentId) => {
    return cycleComponents.find(cycleComponent => cycleComponent.id === cycleComponentId);
  };

  const columns = [
    { id: 'col0', Header: 'ID', accessor: 'id' },
    {
      id: 'col1',
      Header: 'Department',
      accessor: row =>
        row.department && getDepartmentById(row.department.id)
          ? getDepartmentById(row.department.id).dep_name_en
          : '123',
    },
    {
      id: 'col2',
      Header: 'Module',
      accessor: row =>
        getModuleById(row.module.id) ? getModuleById(row.module.id).module_name_en : '',
    },
    { id: 'col3', Header: 'Name', accessor: 'name_en' },
    { id: 'col4', Header: 'Control Form', accessor: 'control_form_en' },
    { id: 'col5', Header: 'Course Code', accessor: 'course_code_en' },
    { id: 'col6', Header: 'Credits', accessor: 'credits' },
    { id: 'col7', Header: 'Prerequisites',
         accessor: row =>
          row.prerequisite && Array.isArray(row.prerequisite) ?
              row.prerequisite.map(subject => subject.name_en).join(", ")
              : ''
    },
    { id: 'col8', Header: 'Competencies', accessor: row =>
          row.competencies && Array.isArray(row.competencies) &&
          getCompetenciesByIds(row.competencies) ?
              getCompetenciesByIds(row.competencies).map(competency => competency.name_en).join(", ")
              : ''
    },
    {
      id: 'col9',
      Header: 'Cycle Component',
      accessor: row => {
        return row.cycle_component
            ? row.cycle_component.cycle_en
            + ' ' + row.cycle_component.component_en
            : '';
      }
    },
    { id: 'col10', Header: 'Actions', Cell: row => (
        <div>
            <button onClick={() => handleUpdate(row.original.id)}>Edit</button>
            <button onClick={() => handleDelete(row.original.id)}>Delete</button>
        </div>
      )
    },
  ];

  const handleUpdate = async (id) => {
    const subjectToEdit = data.find(subject => subject.id === id);
    setEditingSubject(subjectToEdit);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const prerequisiteOptions = Array.from(event.target.prerequisite.selectedOptions).map(option => parseInt(option.value));
    const competenciesOptions = Array.from(event.target.competencies.selectedOptions).map(option => parseInt(option.value));

    const payload = {
      department: editingSubject.department,
      module: editingSubject.module,
      name_kz: event.target.name_kz.value,
      name_ru: event.target.name_ru.value,
      name_en: event.target.name_en.value,
      control_form_kz: event.target.control_form_kz.value,
      control_form_ru: event.target.control_form_ru.value,
      control_form_en: event.target.control_form_en.value,
      course_code_kz: event.target.course_code_kz.value,
      course_code_ru: event.target.course_code_ru.value,
      course_code_en: event.target.course_code_en.value,
      credits: event.target.credits.value,
      prerequisite: prerequisiteOptions,
      competencies: competenciesOptions,
      cycle_component: parseInt(event.target.cycle_component.value),
    };

    if (isCreating) {
      const response = await fetch('http://127.0.0.1:8000/api/subject/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      setData([...data, responseData]);
    } else {
      const response = await fetch(`http://127.0.0.1:8000/api/subject/${editingSubject.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      setData(data.map(subject => subject.id === responseData.id ? responseData : subject));
    }

    setEditingSubject(null);
    setIsCreating(false);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/subject/${id}/`, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      setData(data.filter(subject => subject.id !== id));
    }
  };

  return (
    <div className="container">
      <h1>Subjects</h1>
      <button onClick={() => { setEditingSubject({}); setIsCreating(true); }}>Create</button>
      {editingSubject && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="module">Module</label>
          <select id="module" defaultValue={editingSubject.module} onChange={event => setEditingSubject({...editingSubject, module: parseInt(event.target.value)})}>
            <option key={""} value={""}>{"Выберите Модуль"}</option>
            {modules.map(module => (
              <option key={module.id} value={module.id}>{module.module_code}</option>
              ))}
          </select>
          <label htmlFor="cycle_component">Cycle Component</label>
          <select id="cycle_component" defaultValue={editingSubject.cycle_component} onChange={event => setEditingSubject({...editingSubject, cycle_component: parseInt(event.target.value)})}>
            <option key={""} value={""}>{"Выберите Цикл Компонент"}</option>
            {cycleComponents.map(cycleComponent => (
              <option key={cycleComponent.id} value={cycleComponent.id}>{`${cycleComponent.cycle_en} ${cycleComponent.component_en}`}</option>
              ))}
          </select>
          <label htmlFor="name_kz">Name (KZ)</label>
          <input type="text" id="name_kz" defaultValue={editingSubject.name_kz} />
          <label htmlFor="name_ru">Name (RU)</label>
          <input type="text" id="name_ru" defaultValue={editingSubject.name_ru} />
          <label htmlFor="name_en">Name (EN)</label>
          <input type="text" id="name_en" defaultValue={editingSubject.name_en} />
          <label htmlFor="course_code_kz">Course Code (KZ)</label>
          <input type="text" id="course_code_kz" defaultValue={editingSubject.course_code_kz} />
          <label htmlFor="course_code_ru">Course Code (RU)</label>
          <input type="text" id="course_code_ru" defaultValue={editingSubject.course_code_ru} />
          <label htmlFor="course_code_en">Course Code (EN)</label>
          <input type="text" id="course_code_en" defaultValue={editingSubject.course_code_en} />
          <label htmlFor="control_form_kz">Control Form (KZ)</label>
          <input type="text" id="control_form_kz" defaultValue={editingSubject.control_form_kz} />
          <label htmlFor="control_form_ru">Control Form (RU)</label>
          <input type="text" id="control_form_ru" defaultValue={editingSubject.control_form_ru} />
          <label htmlFor="control_form_en">Control Form (EN)</label>
          <input type="text" id="control_form_en" defaultValue={editingSubject.control_form_en} />
          <label htmlFor="credits">Credits</label>
          <input type="number" id="credits" defaultValue={editingSubject.credits} />
          <label htmlFor="prerequisite">Prerequisite</label>
          <select id="prerequisite" multiple defaultValue={editingSubject.prerequisite}>
            {data.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name_en}</option>
              ))}
          </select>
          <label htmlFor="competencies">Competencies</label>
          <select id="competencies" multiple defaultValue={editingSubject.competencies}>
            {competencies.map(competency => (
              <option key={competency.id} value={competency.id}>{competency.name_kz}</option>
              ))}
          </select>
          <label htmlFor="department">Department</label>
          <select id="department" defaultValue={editingSubject.department} onChange={event => setEditingSubject({...editingSubject, department: parseInt(event.target.value)})}>
            <option key={""} value={""}>{"Выберите Кафедру"}</option>
            {departments.map(department => (
                <option key={department.id} value={department.id}>{department.dep_name_en}</option>
            ))}
          </select>
          <button type="submit">Save</button>
          <button onClick={() => { setEditingSubject(null); setIsCreating(false); }}>Cancel</button>
        </form>
      )}
      {!editingSubject && (
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 20, 50]}
          className="-striped -highlight"
        />
      )}
    </div>
  );
};

export default Subject;
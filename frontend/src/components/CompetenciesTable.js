import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompetenciesTable.css';

const CompetenciesTable = () => {
  const [competencies, setCompetencies] = useState([]);
  const [newCompetency, setNewCompetency] = useState({
    name_kz: '',
    name_ru: '',
    name_en: '',
    text_kz: '',
    text_ru: '',
    text_en: '',
    type: '',
    professional_competencies: null,
  });

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/competencies/')
      .then(response => setCompetencies(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewCompetency(prevState => ({ ...prevState, [name]:  value }));
  };

  const handleAddCompetency = () => {
    axios
      .post('http://127.0.0.1:8000/api/competencies/', newCompetency)
      .then(response => setCompetencies(prevState => [...prevState, response.data]))
      .catch(error => console.log(error));
    setNewCompetency({
      name_kz: '',
      name_ru: '',
      name_en: '',
      text_kz: '',
      text_ru: '',
      text_en: '',
      type: '',
      professional_competencies: null,
    });
  };

  const handleDeleteCompetency = id => {
    axios
      .delete(`http://127.0.0.1:8000/api/competencies/${id}/`)
      .then(() => setCompetencies(prevState => prevState.filter(c => c.id !== id)))
      .catch(error => console.log(error));
  };

  const handleUpdateCompetency = competency => {
    axios
      .put(`http://127.0.0.1:8000/api/competencies/${competency.id}/`, competency)
      .then(() =>
        setCompetencies(prevState =>
          prevState.map(c => (c.id === competency.id ? competency : c)),
        ),
      )
      .catch(error => console.log(error));
  };

  return (
    <div className="CompetenciesTable">
      <h2>Competencies</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name (KZ)</th>
            <th>Name (RU)</th>
            <th>Name (EN)</th>
            <th>Text (KZ)</th>
            <th>Text (RU)</th>
            <th>Text (EN)</th>
            <th>Professional Competencies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {competencies.map(competency => (
            <tr key={competency.id}>
              <td>{competency.type}</td>
              <td>{competency.name_kz}</td>
              <td>{competency.name_ru}</td>
              <td>{competency.name_en}</td>
              <td>{competency.text_kz}</td>
              <td>{competency.text_ru}</td>
              <td>{competency.text_en}</td>
              <td>{competencies.find(
                  (currentCompetency) =>
                      currentCompetency.id === competency.professional_competencies
                  )?.name_en
              }
              </td>
              <td>
                <button onClick={() => handleDeleteCompetency(competency.id)}>Delete</button>
                <button onClick={() => handleUpdateCompetency(competency)}>Update</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <select name="type" value={newCompetency.type} onChange={handleInputChange}>
                <option value="">Выберите тип</option>
                <option value="General">Общий</option>
                <option value="Professional">Проф.</option>
                <option value="None">Пустой</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                name="name_kz"
                value={newCompetency.name_kz}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="name_ru"
                value={newCompetency.name_ru}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="name_en"
                value={newCompetency.name_en}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <textarea
                className="text-input"
                name="text_kz"
                value={newCompetency.text_kz}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <textarea
                className="text-input"
                name="text_ru"
                value={newCompetency.text_ru}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <textarea
                className="text-input"
                name="text_en"
                value={newCompetency.text_en}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <select
                  name="professional_competencies" value={newCompetency.professional_competencies}
                  onChange={handleInputChange}

              >
                <option value="">Проф. комп.</option>
                <option value="">Пустой</option>
                {competencies.map(competency => (
                  <option key={competency.id} value={competency.id}>{competency.name_kz}</option>
                ))}
              </select>
            </td>
            <td>
              <button onClick={handleAddCompetency}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default CompetenciesTable;

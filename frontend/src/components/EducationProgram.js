import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EducationalProgram.css';

const EducationalProgramForm = () => {
  const [educationalProgram, setEducationalProgram] = useState({
    name: '',
    level: '',
    description: '',
  });

  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [prerequisiteWarning, setPrerequisiteWarning] = useState('');
  const [subjectToChoices, setSubjectToChoices] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/subject-all/').then((response) => {
      setSubjects(response.data);
    });

    axios.get('http://127.0.0.1:8000/api/subject-to-choice/').then((response) => {
      setSubjectToChoices(response.data);
    });

  }, []);


  const getCompetencies = (currentCompetencies) => {
    if (currentCompetencies) {
      return currentCompetencies.map((competency) => competency.name_en).join(", ");
    }
    return '';
  };

  const getComponentBySubjectId = (subject) => {
    if (subject && subject.module && subject.module.cycle_component) {
      return subject.module.cycle_component.component_en;
    }
    return '';
};

  const getCycleBySubjectId = (subject) => {
    if (subject && subject.module && subject.module.cycle_component) {
      return subject.module.cycle_component.cycle_en;
    }
    return '';
  };

  const getPrerequisites = (currentPrerequisite) => {
    if (currentPrerequisite) {
      return currentPrerequisite.map((subject) => subject.name_en).join(", ");
    }
    return '';
  };

  const getModuleBySubjectToChoice = (subjectToChoice) => {
    if(subjectToChoice){
      const firstSubject = subjectToChoice.subject
          .map((subjectId) => subjects.find((subject) => subject.id === subjectId))
          .filter((subject) => subject !== undefined)[0];
      return firstSubject ? firstSubject.module.module_name_en : '';
    }
  }
  const validatePrerequisites = () => {
    for (const [semesterIndex, semester] of semesters.entries()) {
      for (const subjectId of semester) {
        const subject = subjects.find((s) => s.id === subjectId);
        if (subject && subject.prerequisite.length > 0) {
          const previousSemesterSubjects = semesters.slice(0, semesterIndex).flat();
          const unsatisfiedPrerequisites = subject.prerequisite.filter(
            (prerequisite) => !previousSemesterSubjects.includes(prerequisite)
          );

          if (unsatisfiedPrerequisites.length > 0) {
            const unsatisfiedSubjectNames = unsatisfiedPrerequisites
              .map((prerequisite) => subjects.find((s) => s.id === prerequisite)?.name_en)
              .join(', ');
            setPrerequisiteWarning(
              `Warning: "${subject.name_en}" has unsatisfied prerequisites: ${unsatisfiedSubjectNames}.`
            );
            return false;
          }
        }
      }
    }
    setPrerequisiteWarning('');
    return true;
  };
  const addSemester = () => {
    setSemesters([...semesters, []]);
  };

  const removeSemester = (semesterIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters.splice(semesterIndex, 1);
    setSemesters(updatedSemesters);
  };

  const addSubject = (semesterIndex, isSubjectToChoice = false) => {
    const updatedSemesters = [...semesters];
    if (isSubjectToChoice) {
      const firstSubjectToChoice = subjectToChoices[0];
      updatedSemesters[semesterIndex].push({
        subject: firstSubjectToChoice.id,
        module_name_en: firstSubjectToChoice.module_name_en,
        subjectToChoice: true,
      });
    } else {
      updatedSemesters[semesterIndex].push(null);
    }
    setSemesters(updatedSemesters);
  };



  const removeSubject = (semesterIndex, subjectIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].splice(subjectIndex, 1);
    setSemesters(updatedSemesters);
  };

  const updateSubject = (semesterIndex, subjectIndex, subjectId, isSubjectToChoice = false) => {
    const updatedSemesters = [...semesters];
    if (isSubjectToChoice) {
      const subjectToChoice = subjectToChoices.find((s) => s.id === parseInt(subjectId));
      updatedSemesters[semesterIndex][subjectIndex] = {
        subject: parseInt(subjectId),
        module_name_en: subjectToChoice.module_name_en,
        subjectToChoice: true,
      };
    } else {
      updatedSemesters[semesterIndex][subjectIndex] = parseInt(subjectId);
    }
    setSemesters(updatedSemesters);
  };

   const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/semester/api/educational-program/')
      .then((response) => {
        // Once the EducationalProgram instance is created, create the Semesters
        const educationalProgramId = response.data.id;
        const semesterPromises = semesters.map((semester, semesterIndex) => {
          const semesterData = {
            edu_program: educationalProgramId,
            semester_number: semesterIndex + 1,
            subject: [],
            subject_to_choice: [],
          };
          semester.forEach((subjectEntry) => {
            if (subjectEntry === null) {
              // Do nothing
            } else if (typeof subjectEntry === 'number') {
              // Regular subject
              semesterData.subject.push(subjectEntry);
            } else if (typeof subjectEntry === 'object' && subjectEntry.subjectToChoice) {
              // SubjectToChoice
              semesterData.subject_to_choice.push(subjectEntry.subject);
            }
          });
          return axios.post('http://127.0.0.1:8000/semester/api/semester/', semesterData);
        });
        // Wait for all the Semesters to be created
        Promise.all(semesterPromises)
          .then(() => {
            alert('Educational program submitted successfully!');
          })
          .catch((error) => {
            console.error('Error creating semesters:', error);
            alert('An error occurred while submitting the educational program.');
          });
      })
      .catch((error) => {
        console.error('Error creating educational program:', error);
        alert('An error occurred while submitting the educational program.');
      });
  };


  const handleInputChange = (e) => {
    setEducationalProgram({
      ...educationalProgram,
      [e.target.name]: e.target.value,
    });
  };

  const calculateSemesterCredits = (semesterIndex) => {
    const semester = semesters[semesterIndex];
    return semester.reduce((sum, subjectEntry) => {
      const isSubjectToChoice = subjectEntry !== null && typeof subjectEntry === 'object' && subjectEntry.subjectToChoice;
      const subjectId = isSubjectToChoice ? subjectEntry.subject : subjectEntry;
      const subject = subjects.find((subject) => subject.id === subjectId);
      return sum + (subject ? subject.credits : 0);
    }, 0);
  };

  const calculateTotalCredits = () => {
    return semesters.reduce((sum, _, semesterIndex) => {
      return sum + calculateSemesterCredits(semesterIndex);
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1 className="text-center my-4">Educational Program</h1>
      <div className="center-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={educationalProgram.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="level">Level:</label>
          <input
            type="text"
            id="level"
            name="level"
            className="form-control"
            value={educationalProgram.level}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={educationalProgram.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {semesters.map((semester, semesterIndex) => (
        <div key={semesterIndex} className="mb-5">
          <h3 className="mb-3">
            Semester {semesterIndex + 1}{' '}
            <button type="button" className="btn btn-primary" onClick={() => addSubject(semesterIndex)}>
              Add Subject
            </button>
            <button type="button" className="btn btn-primary" onClick={() => addSubject(semesterIndex, true)}>
              Add Subject To Choice
            </button>
          </h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Credits</th>
                <th>Cycle</th>
                <th>Component</th>
                <th>Competencies</th>
                <th>Prerequisites</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {semester.map((subjectEntry, subjectIndex) => {
                const isSubjectToChoice = subjectEntry !== null && typeof subjectEntry === 'object' && subjectEntry.subjectToChoice;
                const subjectId = isSubjectToChoice ? subjectEntry.subject : subjectEntry;

                return (
                  <tr key={subjectIndex}>
                    <td>
                      <select
                        className="form-control"
                        value={subjectId}
                        onChange={(e) =>
                          updateSubject(semesterIndex, subjectIndex, e.target.value, isSubjectToChoice)
                        }
                      >
                        <option value="">Select a subject</option>
                        {(isSubjectToChoice ? subjectToChoices : subjects).map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {isSubjectToChoice ? getModuleBySubjectToChoice(subject) : subject.name_en}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{subjects.find((subject) => subject.id === subjectId)?.credits || 0}</td>
                    <td>
                      {getCycleBySubjectId(subjects.find((subject) => subject.id === subjectId))}
                    </td>
                    <td>
                      {getComponentBySubjectId(subjects.find((subject) => subject.id === subjectId))}
                    </td>
                    <td>
                      {getCompetencies(
                        subjects.find((subject) => subject.id === subjectId)?.competencies
                      )}
                    </td>
                    <td>
                      {getPrerequisites(
                        subjects.find((subject) => subject.id === subjectId)?.prerequisite
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeSubject(semesterIndex, subjectIndex)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <strong
              style={{
                color: calculateSemesterCredits(semesterIndex) > 30 ? 'red' : 'black',
              }}
            >
              Semester {semesterIndex + 1} Total Credits: {calculateSemesterCredits(semesterIndex)}
            </strong>
          </div>
        </div>
      ))}
        <div className="text-center mb-3">
          <button type="button" className="btn btn-secondary mr-2" onClick={addSemester}>
            Add Semester
          </button>
          <button type="button" className="btn btn-secondary" onClick={removeSemester}>
            Remove Semester
          </button>
      </div>
      <div className="text-center mb-3">
        <strong
          style={{
            color: calculateTotalCredits() > 120 ? 'red' : 'black',
          }}
        >
          Grand Total Credits: {calculateTotalCredits()}
        </strong>
      </div>
      {prerequisiteWarning && (
        <div className="alert alert-danger" role="alert">
          {prerequisiteWarning}
        </div>
      )}
      <div className="text-center">
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </form>
  );

};

export default EducationalProgramForm;

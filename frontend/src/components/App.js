import React from 'react';
import {render} from "react-dom";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import "./App.css";

import Department from "./Department";
import CycleComponent from "./CycleComponent";
import CompetenciesTable from "./CompetenciesTable";
import Subject from './Subject';
import ModuleCRUDTable from "./Module";
import EducationalProgram from "./EducationProgram";
import SubjectToChoiceComponent from "./SubjectToChoice";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/department">Department</Link>
            </li>
            <li>
              <Link to="/cycle">Cycle</Link>
            </li>
            <li>
              <Link to="/module">Module</Link>
            </li>
            <li>
              <Link to="/competencies">Competencies</Link>
            </li>
            <li>
              <Link to="/subject">Subject</Link>
            </li>
            <li>
              <Link to="/subject-to-choice">Subject To Choice</Link>
            </li>
            <li>
              <Link to="/education-program">Educational Program</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/department" element={<Department />} />
          <Route path="/cycle" element={<CycleComponent />} />
          <Route path="/module" element={<ModuleCRUDTable />} />
          <Route path="/competencies" element={<CompetenciesTable />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/education-program" element={<EducationalProgram />} />
          <Route path="/subject-to-choice" element={<SubjectToChoiceComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
const appDiv = document.getElementById("app");
render(<App name="tim"/>, appDiv);

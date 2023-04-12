import React, { useState, useEffect } from "react";
import axios from "axios";
import './CycleComponent.css';

const CycleComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [newCycleComponent, setNewCycleComponent] = useState({
    is_practice: false,
    cycle_kz: '',
    cycle_ru: '',
    cycle_en: '',
    component_kz: '',
    component_ru: '',
    component_en: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/cycle-component/"
      );
      setData(response.data);
    } catch (error) {
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (editItemId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editItemId
            ? {
                ...item,
                [name]: value,
              }
            : item
        )
      );
    } else {
      if (name === "cycle_kz" || name === "cycle_ru" || name === "cycle_en") {
        setNewCycleComponent((prev) => ({
          ...prev,
          cycle_kz: value,
          cycle_ru: value,
          cycle_en: value,
        }));
      } else if (
        name === "component_kz" ||
        name === "component_ru" ||
        name === "component_en"
      ) {
        setNewCycleComponent((prev) => ({
          ...prev,
          component_kz: value,
          component_ru: value,
          component_en: value,
        }));
      } else {
        setNewCycleComponent((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };


  const handleCheckboxChange = () => {
    setNewCycleComponent((prev) => ({
      ...prev,
      is_practice: !prev.is_practice,
    }));
  };

  const handleAdd = async () => {
    try {
      if (editItemId !== null) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/cycle-component/${editItemId}/`,
          data.find((item) => item.id === editItemId)
        );
        setData((prev) =>
          prev.map((item) =>
            item.id === editItemId ? response.data : item
          )
        );
        setEditItemId(null);
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/cycle-component/",
          newCycleComponent
        );
        setData([...data, response.data]);
        setNewCycleComponent({
          is_practice: false,
          cycle_kz: "",
          cycle_ru: "",
          cycle_en: "",
          component_kz: "",
          component_ru: "",
          component_en: "",
        });
      }
    } catch (error) {
      setError("Error adding data");
    }
  };


   const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cycle-component/${id}/`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      setError("Error deleting data");
    }
  };


  return (
  <div>
    <h2>Cycle Component List</h2>
    {error && <p>{error}</p>}
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Is Practice</th>
          <th>Cycle KZ</th>
          <th>Cycle RU</th>
          <th>Cycle EN</th>
          <th>Component KZ</th>
          <th>Component RU</th>
          <th>Component EN</th>
          <th>Actions</th>
        </tr>
      </thead>
  <tbody>
    {data.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.is_practice ? "Yes" : "No"}</td>
        <td>{item.cycle_kz}</td>
        <td>{item.cycle_ru}</td>
        <td>{item.cycle_en}</td>
        <td>{item.component_kz}</td>
        <td>{item.component_ru}</td>
        <td>{item.component_en}</td>
        <td>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
          <button onClick={() => setEditItemId(item.id)}>Edit</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
<h3>{editItemId === null ? "Add" : "Edit"} Cycle Component</h3>
<form className="center-form">
  <label>
    Is Practice:
    <input
      type="checkbox"
      checked={newCycleComponent.is_practice}
      onChange={handleCheckboxChange}
    />
  </label>
  <br />
  <label>
    Cycle KZ:
    <select
      name="cycle_kz"
      value={
        editItemId !== null
          ? data.find((item) => item.id === editItemId).cycle_kz
          : newCycleComponent.cycle_kz || ""
      }
      onChange={handleInputChange}
    >
      <option value="">Empty</option>
      <option value="OOD">ООД</option>
      <option value="BD">БП</option>
      <option value="PD">КП</option>
      <option value="DVO">ДВО</option>
      <option value="IA">ҚА</option>
    </select>
  </label>
  <br />
  <label>
    Cycle RU:
    <select
      name="cycle_ru"
      value={
        editItemId !== null
          ? data.find((item) => item.id === editItemId).cycle_ru
          : newCycleComponent.cycle_ru || ""
      }
      onChange={handleInputChange}
    >
      <option value="">Empty</option>
      <option value="OOD">ООД</option>
      <option value="BD">БД</option>
      <option value="PD">ПД</option>
      <option value="DVO">ДВО</option>
      <option value="IA">ИА</option>
    </select>
  </label>
  <br />
  <label>
    Cycle EN:
    <select
      name="cycle_en"
      value={
        editItemId !== null
          ? data.find((item) => item.id === editItemId).cycle_en
          : newCycleComponent.cycle_en || ""
      }
      onChange={handleInputChange}
    >
      <option value="">Empty</option>
      <option value="OOD">OOD</option>
      <option value="BD">BD</option>
      <option value="PD">PD</option>
      <option value="DVO">DVI</option>
      <option value="IA">FA</option>
    </select>
  </label>
  <br />
  <label>
    Component KZ:
    <select
      name="component_kz"
      value={
        editItemId !== null
          ? data.find((item) => item.id === editItemId).component_kz
          : newCycleComponent.component_kz || ""
          }
        onChange={handleInputChange}
        >
        <option value="">Empty</option>
        <option value="VK">ЖООК</option>
        <option value="KV">ТК</option>
        </select>
        </label>
        <br />
        <label>
        Component RU:
        <select
        name="component_ru"
        value={
        editItemId !== null
        ? data.find((item) => item.id === editItemId).component_ru
        : newCycleComponent.component_ru || ""
        }
        onChange={handleInputChange}
        >
        <option value="">Empty</option>
        <option value="VK">ВК</option>
        <option value="KV">КВ</option>
        </select>
        </label>
        <br />
        <label>
        Component EN:
        <select
        name="component_en"
        value={
        editItemId !== null
        ? data.find((item) => item.id === editItemId).component_en
        : newCycleComponent.component_en || ""
        }
        onChange={handleInputChange}
        >
        <option value="">Empty</option>
        <option value="VK">UK</option>
        <option value="KV">EC</option>
        </select>
        </label>
        <br />
        <button type="button" onClick={handleAdd}>
        {editItemId === null ? "Add" : "Save"}
        </button>
        {editItemId !== null && (
        <button type="button" onClick={() => setEditItemId(null)}>
        Cancel
        </button>
        )}
        </form>

          </div>
        );
}
export default CycleComponent

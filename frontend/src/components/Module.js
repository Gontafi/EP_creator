import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

const ModuleCRUDTable = () => {
  const [data, setData] = useState([]);
  const [moduleData, setModuleData] = useState({
    module_name_kz: "",
    module_name_ru: "",
    module_name_en: "",
    module_code: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/module/");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModuleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/module/", moduleData);
      setModuleData({
        module_name_kz: "",
        module_name_ru: "",
        module_name_en: "",
        module_code: "",
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/module/${id}/`
      );
      setModuleData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/module/${moduleData.id}/`,
        moduleData
      );
      setModuleData({
        module_name_kz: "",
        module_name_ru: "",
        module_name_en: "",
        module_code: "",
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/module/${id}/`);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      id: "col0",
      Header: "ID",
      accessor: "id",
      minWidth: 50,
      filterable: true,
    },
    {
      id: "col6",
      Header: "Code",
      accessor: "module_code",
      minWidth: 100,
      filterable: true,
    },
    {
      id: "col1",
      Header: "Module Name (KZ)",
      accessor: "module_name_kz",
      minWidth: 150,
      filterable: true,
    },
    {
      id: "col2",
      Header: "Module Name (RU)",
      accessor: "module_name_ru",
      minWidth: 150,
      filterable: true,
    },
    {
      id: "col3",
      Header: "Module Name (EN)",
      accessor: "module_name_en",
      minWidth: 150,
      filterable: true,
    },
    {
      id: "col4",
      Header: "Actions",
      Cell: ({ row }) => (
        <div>
          <button onClick={() => handleEdit(row._original.id)}>Edit</button>{" "}
          <br></br>
          <button onClick={() => handleDelete(row._original.id)}>Delete</button>
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="module_name_kz">Module Name (KZ):</label>
          <input
            type="text"
            id="module_name_kz"
            name="module_name_kz"
            value={moduleData.module_name_kz}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter Module Name (KZ)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="module_name_ru">Module Name (RU):</label>
          <input
            type="text"
            id="module_name_ru"
            name="module_name_ru"
            value={moduleData.module_name_ru}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter Module Name (RU)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="module_name_en">Module Name (EN):</label>
          <input
            type="text"
            id="module_name_en"
            name="module_name_en"
            value={moduleData.module_name_en}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter Module Name (EN)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Code:</label>

          <input
            type="text"
            id="module_code"
            name="module_code"
            value={moduleData.module_code}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter Code"
          />
        </div>
        <div className="form-group">
          <br></br>
          <button type="submit" className="btn btn-primary">
            Add
          </button>{" "}
          {moduleData.id && (
            <button
              type="button"
              onClick={handleUpdate}
              className="btn btn-success"
            >
              Update
            </button>
          )}
        </div>
      </form>
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight"
        filterable={true}
        sortable={true}
      />
    </div>
  );
};

export default ModuleCRUDTable;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    group: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedRecord = {
      name: form.name,
      quantity: form.quantity,
      group: form.group,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedRecord),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the
  // user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            value={form.quantity}
            onChange={(e) => updateForm({ quantity: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="groupOptions"
              id="groupRawMaterials"
              value="Raw Materials"
              checked={form.group === "Raw Materials"}
              onChange={(e) => updateForm({ group: e.target.value })}
            />
            <label htmlFor="groupRawMaterials" className="form-check-label">
              Raw Materials
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="groupOptions"
              id="groupWorkInProgress"
              value="Work In Progress"
              checked={form.group === "Work In Progress"}
              onChange={(e) => updateForm({ group: e.target.value })}
            />
            <label htmlFor="groupWorkInProgress" className="form-check-label">
              Work In Progress
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="groupOptions"
              id="groupFinishedGoods"
              value="Finished Goods"
              checked={form.group === "Finished Goods"}
              onChange={(e) => updateForm({ group: e.target.value })}
            />
            <label htmlFor="groupFinishedGoods" className="form-check-label">
              Finished Goods
            </label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

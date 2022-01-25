import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    group: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to
    // the database.
    const newRecord = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecord),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", quantity: "", group: "" });
    navigate("/");
  }

  // This section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
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
        <div className="form-group">
          <input
            type="submit"
            value="Create Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

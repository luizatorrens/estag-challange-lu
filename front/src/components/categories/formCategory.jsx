import { useState } from "react";

export default function FormCategory() {
  const [name, setName] = useState("");
  const [tax, setTax] = useState("");

  const addCategory = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", name);
    data.append("tax", tax);
    fetch("http://localhost/routes/categories.php", {
      method: "POST",
      body: data,
    });
    window.location.reload();
  };

  return (
    <>
      <div className="col-lg-6">
        <form className="m-5" id="categorytax" onSubmit={addCategory}>
          <label className="label mt-2">Name</label>
          <input
            required
            className="input w-100 mb-2"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label className="label mt-2">Tax</label>
          <input
            required
            className="input w-100 mb-2"
            min="1"
            placeholder="Tax"
            type="number"
            value={tax}
            name="tax"
            onChange={(e) => setTax(e.target.value)}
          ></input>

          <button className="button mb-2 mt-2" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

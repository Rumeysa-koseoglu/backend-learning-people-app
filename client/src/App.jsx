import { useEffect, useState } from "react";
import "../src/App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  //when the component is loaded, pull the users from the backend
  useEffect(() => {
    fetch("http://localhost:5001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  //function to add a new user (will be called when the form is submitted)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      //UPDATE user
      const updateUser = { name, age: Number(age) };

      const res = await fetch(`http://localhost:5001/users/${editingUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUser),
      });

      const data = await res.json();

      //update frontend list
      setUsers(users.map((u) => (u.id === editingUserId ? data : u)));

      //clean the form
      setName("");
      setAge("");
      setEditingUserId(null);
      setIsEditing(false);
    } else {
      //CREATE user
      const newUser = { name, age: Number(age) };

      const res = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      //add the added user to the list
      setUsers([...users, data]);

      //clean the form
      setName("");
      setAge("");
    }
  };

  //delete user function
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5001/users/${id}`, {
      method: "DELETE",
    });

    //filter: just leave the ones with the different IDs
    setUsers(users.filter((u) => u.id !== id));
  };

  //function will work when user clicked the edit button
  const handleEdit = (user) => {
    setName(user.name);
    setAge(user.age);
    setEditingUserId(user.id);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <h1>USERS</h1>

      {/* new user addition form */}
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="name-input"
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="age-input"
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">{isEditing ? "Update User" : "Add User"}</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.age})
            <button className="edit-btn" onClick={() => handleEdit(u)}>
              edit
            </button>
            <button className="cln-btn" onClick={() => handleDelete(u.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

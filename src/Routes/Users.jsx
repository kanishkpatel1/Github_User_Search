import React, { useState, useRef } from "react";
import Loading from "../components/Loading";
import UsersContainer from "../components/UsersContainer";
import "./UsersStyle.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);
  const user = useRef("");
  const endPoint = "https://api.github.com/users";

  async function fetchUsers() {
    if (user.current.value === "") {
      setLoading(true);
      try {
        const res = await fetch(endPoint);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
  }

  async function findUser() {
    setLoading(true);
    if (user.current.value.trim() !== "") {
      try {
        const res = await fetch(`${endPoint}/${user.current.value}`);
        const data = await res.json();
        setUsers(data ? [data] : []);
        user.current.value = "";
      } catch (error) {
        console.error("Error fetching user:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleKeyPress(event) {
    // Check if Enter key (key code 13) is pressed
    if (event.key === "Enter") {
      findUser(); // Trigger search when Enter key is pressed
    }
  }

  return (
    <div>
      <div className="users-container">
        <input
          placeholder="Search GitHub username"
          ref={user}
          type="text"
          className="input-text"
          onKeyDown={handleKeyPress} // Attach key down event listener
        />
        <button
          onClick={findUser}
          className="search-button"
        >
          Search
        </button>
      </div>
      <div>{loading ? <Loading /> : <UsersContainer users={users} />}</div>
    </div>
  );
};

export default Users;

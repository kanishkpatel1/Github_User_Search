import React, { useState } from "react";
import "./RepoStyle.css";
const Repo = ({ users }) => {
  const [sortBy, setSortBy] = useState("name"); // State for sorting
  const [searchTerm, setSearchTerm] = useState(""); // State for search filter

  const sortUsers = (criteria) => {
    setSortBy(criteria);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedUsers = [...filteredUsers];

  if (sortBy === "name") {
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "stars") {
    sortedUsers.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sortBy === "forks") {
    sortedUsers.sort((a, b) => b.forks - a.forks);
  } else if (sortBy === "open_issues") {
    sortedUsers.sort((a, b) => b.open_issues - a.open_issues);
  }

  return (
    <div className="filters">
      <div className="mb-4 sortfltr">
      <select
      className="sml-2 p-2 sort"
        value={sortBy}
        onChange={(e) => sortUsers(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="open_issues">Open Issues</option>
      </select>
      </div>

      <div  className="search">
      <input
        type="text"
        placeholder="Search by repository name"
        value={searchTerm}
        className="mb-4 p-2 inp"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>

      {sortedUsers.map((user) => (
        <div key={user.id} className="bg-gray-900 p-3 leading-8 mb-4">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-teal-500 break-words font-semibold hover:underline">
            {user.name}
          </a>
          <div className="flex gap-x-5 mt-2">
          <h1 className="text-sm font-semibold">Language: {user.language ? `🟢 ${user.language}` : "Not Available"}</h1>

            <h1 className="text-sm font-semibold">Forks: {user.forks}</h1>
            <h1 className="text-sm font-semibold">Stars: {user.stargazers_count}</h1>
            <h1 className="text-sm font-semibold">Open Issues: {user.open_issues}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Repo;

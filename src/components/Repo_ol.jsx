import React, { useState, useEffect } from "react";

const Repo = ({ users }) => {
  const [sortBy, setSortBy] = useState("name"); // State for sorting
  const [searchTerm, setSearchTerm] = useState(""); // State for search filter
  const [repoContributors, setRepoContributors] = useState({}); // State for contributors

  useEffect(() => {
    const fetchContributors = async () => {
      const promises = users.map(async (user) => {
        const response = await fetch(`https://api.github.com/repos/${user.login}/${user.name}/contributors`);
        const data = await response.json();
        return { [user.name]: data };
      });
      const contributorsData = await Promise.all(promises);
      const contributorsMap = contributorsData.reduce((acc, contributors) => {
        return { ...acc, ...contributors };
      }, {});
      setRepoContributors(contributorsMap);
    };

    fetchContributors();
  }, [users]);

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
    <div>
      <select
        value={sortBy}
        onChange={(e) => sortUsers(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="open_issues">Open Issues</option>
      </select>

      <input
        type="text"
        placeholder="Search by repository name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {sortedUsers.map((user) => (
        <div key={user.id} className="bg-gray-900 p-3 leading-8 mb-4">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-teal-500 break-words font-semibold hover:underline">
            {user.name}
          </a>
          <div className="flex gap-x-5 mt-2">
            <h1 className="text-sm font-semibold">Language: {user.language}</h1>
            <h1 className="text-sm font-semibold">Forks: {user.forks}</h1>
            <h1 className="text-sm font-semibold">Stars: {user.stargazers_count}</h1>
            <h1 className="text-sm font-semibold">Open Issues: {user.open_issues}</h1>
          </div>
          <div>
            <h1 className="text-sm font-semibold">Contributors:</h1>
            <ul>
              {repoContributors[user.name]?.map((contributor) => (
                <li key={contributor.id}>
                  <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">{contributor.login}</a> - {contributor.contributions} contributions
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Repo;

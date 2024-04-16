import React, { useEffect, useState } from "react";

const ContributorsList = ({ repoOwner, repoName }) => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
        const response = await fetch(url);
        const data = await response.json();
        setContributors(data);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, [repoOwner, repoName]);

  return (
    <div>
      <h2>Contributors List</h2>
      <ul>
        {contributors.map((contributor) => (
          <li key={contributor.id}>
            <img
              src={contributor.avatar_url}
              alt={`Avatar of ${contributor.login}`}
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            <span style={{ marginLeft: 10 }}>
              {contributor.login} - Contributions: {contributor.contributions}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContributorsList;

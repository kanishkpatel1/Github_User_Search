import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Events from "../components/Events";
import Loading from "../components/Loading";
import Repo from "../components/Repo";
import Tabs from "../components/Tabs";
import UsersContainer from "../components/UsersContainer";

const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [type, setType] = useState("repos");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const EndPoint = "https://api.github.com/users";
  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function getUserInfo() {
    try {
      const res = await fetch(EndPoint + pathname);
      const data = await res.json();
      setUser([data]);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  async function getUrls() {
    setUsers([]);
    setLoading(true);

    let url;
    if (type === "repos" || type === "received_events" || type === "followers") {
      url = `${EndPoint}${pathname}/${type}`;
    } else if (type === "following") {
      url = `${EndPoint}${pathname}/following`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserInfo();
    getUrls();
  }, [pathname, type]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200"
      >
        BACK
      </button>
      {user &&
        user.map((uinfo, i) => (
          <div key={i} className="flex justify-center md:flex-row md:px-0 px-4 flex-col gap-10">
            <img
              src={uinfo.avatar_url}
              className="w-[350px] border-4 border-teal-400 md:mx-0 mx-auto"
              alt={`Avatar of ${uinfo.name}`}
            />
            <div className="text-lg leading-10 px-3">
              <h1 className="text-3xl pb-4">{uinfo.name}</h1>
              <h1>
                <span className="text-teal-400">Login Name:</span> {uinfo.login}
              </h1>
              <h1>
                <span className="text-teal-400">Followers:</span> {uinfo.followers}
              </h1>
              <h1>
                <span className="text-teal-400">Following:</span> {uinfo.following}
              </h1>
              <h1>
                <span className="text-teal-400">Public Repositories:</span> {uinfo.public_repos}
              </h1>
              <h1>
                <span className="text-teal-400">Join Date:</span>{" "}
                {new Date(uinfo.created_at).toLocaleDateString()}
              </h1>
              <a
                href={uinfo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-teal-600 my-3 tracking-wide"
              >
                Visit Profile
              </a>
            </div>
          </div>
        ))}
      <div className="flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl">
        <Tabs type={type} setType={setType} />
      </div>
      {loading && <Loading />}
      {type === "repos" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          <Repo users={users} />
        </div>
      )}
      {type === "received_events" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          {users && <Events data={users} />}
        </div>
      )}
      {(type === "followers" || type === "following") && <UsersContainer users={users} />}
    </div>
  );
};

export default UserInfo;

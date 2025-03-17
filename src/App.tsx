import React, { useState, useEffect } from "react";
import axios from "axios";
import {
 
  FaSun,
  FaMoon,
  FaMapMarkerAlt,
  FaLink,
  FaBuilding,
  FaTwitter,
} from "react-icons/fa";

interface GitHubUser {
  avatar_url: string;
  name: string | null;
  login: string;
  created_at: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  company: string | null;
}

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "dark"
  );
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = async () => {
    try {
      const res = await axios.get<GitHubUser>(
        `https://api.github.com/users/${search}`
      );
      setUser(res.data);
      setError(null);
    } catch (err) {
      setError("No results");
      setUser(null);
    }
  };

  return (
    <div className="min-h-screen font-mono bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center p-6">
      <header className="flex justify-between w-full max-w-xl mb-6">
        <h1 className="text-xl font-bold">devfinder</h1>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-2"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}{" "}
          {theme === "dark" ? "LIGHT" : "DARK"}
        </button>
      </header>

      <div className="flex w-full max-w-xl bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <input
          type="text"
          className="flex-grow bg-transparent outline-none text-lg"
          placeholder="Search GitHub username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mt-2.5">{error}</p>}

      {user && (
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-xl">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar_url}
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name || "No Name"}</h2>
              <p className="text-blue-500">@{user.login}</p>
              <p className="text-gray-500 dark:text-gray-400">
                Joined {new Date(user.created_at).toDateString()}
              </p>
            </div>
          </div>
          <p className="mt-4">{user.bio || "This profile has no bio"}</p>
          <div className="mt-4 flex justify-between bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
            <div>
              <p>Repos</p>
              <p className="text-lg font-bold">{user.public_repos}</p>
            </div>
            <div>
              <p>Followers</p>
              <p className="text-lg font-bold">{user.followers}</p>
            </div>
            <div>
              <p>Following</p>
              <p className="text-lg font-bold">{user.following}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 font-extralight">
            <p>
              <FaMapMarkerAlt className="inline" />{" "}
              {user.location || "Not Available"}
            </p>
            <p>
              <FaLink className="inline" />{" "}
              <a
                href={user.blog || "#"}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                {user.blog || "Not Available"}
              </a>
            </p>
            <p>
              <FaTwitter className="inline" />{" "}
              {user.twitter_username || "Not Available"}
            </p>
            <p>
              <FaBuilding className="inline" />{" "}
              {user.company || "Not Available"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

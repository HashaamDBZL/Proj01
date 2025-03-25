import React, { useState, useEffect } from "react";
import { Table, Tag, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Skill {
  name: string;
}
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  city: string;
  skills: Skill[];
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users/skills")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Bio",
      dataIndex: "bio",
      key: "bio",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills: Skill[]) => {
        const colors = ["blue", "green", "red"];
        return (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Tag
                color={colors[index % colors.length]}
                key={`${skill.name}-${index}`}
              >
                {skill.name}
              </Tag>
            ))}
          </div>
        );
      },
    },
  ];

  function handleSearch(): void {
    if (!searchText.trim()) {
      // If search bar is empty, fetch all users again
      fetch("http://localhost:5000/api/users/skills")
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching users:", err));
      return;
    }

    const query = `http://localhost:5000/api/search?query=${searchText}`;
    fetch(query)
      .then((res) => res.json())
      .then((data: { name: string; email: string; skills: string[] }[]) => {
        console.log("Search API Response:", data); // Debugging
        const formattedData = data.map((user, index) => ({
          id: index.toString(), // Assign a temporary ID if missing
          firstName: user.name.split(" ")[0] || "N/A",
          lastName: user.name.split(" ")[1] || "N/A",
          email: user.email,
          bio: "N/A", // Placeholder since API doesn't return bio
          city: "N/A", // Placeholder since API doesn't return city
          skills: user.skills.map((skill) => ({ name: skill })), // Convert string array to objects
        }));
        setUsers(formattedData);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }

  return (
    <div className="flex w-full flex-col">
      <Space className="mx-auto my-4">
        <Input
          placeholder="Search users..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
          className="w-64"
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          Search
        </Button>
      </Space>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default UsersTable;

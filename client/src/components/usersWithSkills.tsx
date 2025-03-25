// UsersTable.tsx
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getColumns } from "./userTableColumns";
import { fetchAllUsers, searchUsers } from "../api";
import SearchBar from "./Searchbar";
import { User } from "../types";

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchAllUsers()
      .then(setUsers)
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleSearch = (query: string) => {
    searchUsers(query)
      .then(setUsers)
      .catch((err) => console.error("Error fetching users:", err));
  };

  return (
    <div className="flex w-full flex-col">
      <SearchBar onSearch={handleSearch} />
      <Table
        dataSource={users}
        columns={getColumns()}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default UsersTable;

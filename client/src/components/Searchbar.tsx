import React, { useState } from "react";
import { Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => onSearch(searchText);

  return (
    <Space className="mx-auto my-4">
      <Input
        placeholder="Search users..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onPressEnter={handleSearch}
        style={{ width: 300 }}
      />
      <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
        Search
      </Button>
    </Space>
  );
};

export default SearchBar;

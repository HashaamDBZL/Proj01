import React, { useState } from "react";
import { Input, Space, Button, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  onSearch: (searchText: string, isPartial: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [isPartialSearch, setIsPartialSearch] = useState(false);

  const handleSearch = () => {
    onSearch(searchText, isPartialSearch);
  };

  return (
    <Space className="mx-auto my-4">
      Partial Search
      <Switch
        checked={isPartialSearch}
        onChange={(checked) => setIsPartialSearch(checked)}
      />
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

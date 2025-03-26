import React, { useState, useEffect, useCallback } from "react";
import { Input, Switch, Space } from "antd";

interface SearchBarProps {
  onSearch: (query: string, isPartial: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [isPartialSearch, setIsPartialSearch] = useState(false);

  const debouncedSearch = useCallback(() => {
    onSearch(searchText, isPartialSearch);
  }, [searchText, isPartialSearch, onSearch]);

  // Debounced search effect
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      debouncedSearch();
    }, 500); // 500ms debounce delay

    return () => clearTimeout(delaySearch); // Cleanup previous timeout
  }, [searchText, isPartialSearch, onSearch]);

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
        style={{ width: 300 }}
      />
    </Space>
  );
};

export default SearchBar;

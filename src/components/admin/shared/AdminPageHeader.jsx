import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";
import { useCallback, useEffect, useState } from "react";

const AdminPageHeader = ({
  title,
  onSearch,
  searchValue,
  onAdd,
  addText,
  searchPlaceholder,
}) => {
  const [rawValue, setRawValue] = useState(searchValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedValue = rawValue?.replace(/\s+/g, " ").trim();
      if (trimmedValue !== searchValue) {
        onSearch(trimmedValue || "");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [rawValue, onSearch, searchValue]);

  const handleSearchChange = useCallback(
    (e) => {
      setRawValue(e.target.value);
    },
    [setRawValue],
  );

  return (
    <Flex gap="large" justify="end" wrap align="center" className="mb-5">
      <h1 className="w-full font-bold ~text-xl/2xl">{title}</h1>
      <Flex gap="small" align="center" wrap justify="center">
        <Input
          size="small"
          placeholder={searchPlaceholder}
          prefix={<SearchOutlined />}
          value={rawValue}
          onChange={handleSearchChange}
          allowClear
          className="max-w-fit"
        />
        <Button
          size="small"
          icon={<PlusOutlined />}
          type="primary"
          onClick={onAdd}
        >
          {addText}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminPageHeader;

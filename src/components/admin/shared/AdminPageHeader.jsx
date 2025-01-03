import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";

const AdminPageHeader = ({
  title,
  onSearch,
  searchValue,
  onAdd,
  addText,
  searchPlaceholder,
}) => {
  return (
    <Flex gap="large" justify="end" wrap align="center" className="mb-5">
      <h1 className="w-full font-bold ~text-xl/2xl">{title}</h1>
      <Flex gap="small" align="center" wrap justify="center">
        <Input
          size="small"
          placeholder={searchPlaceholder}
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
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

// UsersTableColumns.tsx
import { Tag } from "antd";
import { Skill } from "../types";

export const getColumns = () => [
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
            <Tag color={colors[index % colors.length]} key={skill.name}>
              {skill.name}
            </Tag>
          ))}
        </div>
      );
    },
  },
];

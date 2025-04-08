import React, { useState } from "react";
import { Dropdown, Tag, Menu } from "antd";

const statusColor: Record<string, string> = {
  "Done": "green",
  "Working on it": "orange",
  "Stuck": "red",
  "Not Started": "gray",
};

const statusOptions = ["Done", "Working on it", "Stuck", "Not Started"];

const StatusDropdown: React.FC<{ value: string, onChange: (val: string) => void }> = ({ value, onChange }) => {

  const items = statusOptions.map(status => ({
    key: status,
    label: (
      <Tag color={statusColor[status]} style={{ width: '100%', textAlign: 'center', cursor: 'pointer' }}>
        {status}
      </Tag>
    ),
  }));

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => onChange(key),
      }}
      trigger={['click']}
    >
      <Tag color={statusColor[value]} style={{ cursor: 'pointer' }}>{value}</Tag>
    </Dropdown>
  );
};

export default StatusDropdown;

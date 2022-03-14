import { RollbackOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoBack() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Button
      type='link'
      onClick={goBack}
      style={{ fontSize: 20, color: '#001529', background: '#fff', height: 72, boxShadow: '0 3px 6px 0 rgb(62 70 98 / 10%)' }}
    >
      <Space direction='vertical' size={1}>
        <RollbackOutlined />
        返回
      </Space>
    </Button>
  );
}

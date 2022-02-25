import React from 'react';
import { AppleOutlined } from '@ant-design/icons';

const routes = [
  {
    path: 'calc',
    title: (
      <>
        <AppleOutlined />
        Calculator
      </>
    )
  },
  {
    path: 'comment',
    title: (
      <>
        <AppleOutlined />
        Comment
      </>
    )
  }
];

export default routes;

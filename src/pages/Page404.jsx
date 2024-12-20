import React from 'react';
import { Button, Result } from 'antd';
import { NavLink } from 'react-router';
const Page404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<a href="/"><Button type="primary">Back Home</Button></a>}
    />
  );
};

export default Page404;

import React from 'react';
import { Button, Card, Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { githubClientId } from '@/utils/env';

const Login = () => {
  return (
    <Card
      bodyStyle={{
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
      style={{
        height: '100%',
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        transform: 'translateY(-50%)',
      }}
    >
      <Space>
        <Button>
          <a href="https://liujiancn.cn/api/v1/user/touristLogin">游客登录</a>
        </Button>
        <Button>
          <a href="https://liujiancn.cn/api/v1/user/devLogin">开发登录</a>
        </Button>
        <Button>
          <a href={`https://github.com/login/oauth/authorize/?client_id=${githubClientId}`}>
            <GithubOutlined />
            github登录
          </a>
        </Button>
      </Space>
    </Card>
  );
};

export default Login;

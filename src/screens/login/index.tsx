import React from "react";
import { useAuth } from "context/auth-context";

export const LoginScreen = () => {
  // 登录
  const { login, user } = useAuth();
  // 处理提交数据
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 阻止默认行为
    e.preventDefault();
    // 获取表单数据
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    // 登录
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      {user ? (
        <div>
          登录成功，用户名：{user.name}, {user.token}
        </div>
      ) : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};

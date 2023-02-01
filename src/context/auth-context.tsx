import React, { ReactNode, useState } from "react";
import { User } from "screens/project-list/search-panel";
import * as auth from "auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
interface AuthForm {
  username: string;
  password: string;
}

// 初始化用户数据
const bootstrapUser = async () => {
  let user = null;
  // 获取token
  const token = auth.getToken();
  if (token) {
    // 获取用户信息
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

//devtools
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 登录
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  // 注册
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  // 登出
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// useAuth hook
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};

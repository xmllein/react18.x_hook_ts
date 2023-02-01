import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
// 请求地址
const apiUrl = process.env.REACT_APP_API_URL;

interface RequestConfig extends RequestInit {
  data?: object;
  token?: string;
}

export const http = (
  endpoint: string,
  { data, token, headers, ...customConfig }: RequestConfig = {}
) => {
  // 请求配置
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  // get请求
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  }

  // post请求
  if (config.method.toUpperCase() === "POST") {
    config.body = JSON.stringify(data || {});
  }

  // fetch与axios的表现不一致，axios会自动处理401，fetch不会
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 未登录
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        return Promise.reject(result);
      }
    });
};

// http hook
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// TS Utility Types 用法 （ts 工具）

// Partial，将一个类型的所有属性变为可选
// Pick，从一个类型中挑选出几个属性
// Omit，从一个类型中剔除几个属性
// Record，将一个类型的属性映射为另一个类型
// Exclude，从一个类型中剔除另一个类型
// Extract，从一个类型中提取另一个类型
// NonNullable，将一个类型中的 null 和 undefined 剔除
// ReturnType，获取函数返回值类型
// InstanceType，获取构造函数类型的实例类型
// Parameters，获取函数参数类型
// ConstructorParameters，获取构造函数参数类型

// https://www.typescriptlang.org/docs/handbook/utility-types.html

// type 与 interface 的区别
// type 可以定义联合类型，交叉类型，元组等， interface 只能定义对象
// type 可以定义别名， interface 不能

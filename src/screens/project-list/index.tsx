import React, { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";

import { useHttp } from "utils/http";
import { cleanObject, useDebounce, useMount } from "utils";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  // 参数
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // 负责人列表
  const [users, setUsers] = useState([]);
  // 表格数据
  const [list, setList] = useState([]);
  // loading
  const [isLoading, setIsLoading] = useState(false);
  // Error
  const [error, setError] = useState<null | Error>(null);
  // 防抖
  const debouncedParam = useDebounce(param, 200);
  // useHttp
  const client = useHttp();
  // 参数变化时触发
  useEffect(() => {
    setIsLoading(true);
    // 获取项目数据
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((error) => {
        console.log(error);
        setError(error);
        setList([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);
  //初始化负责人列表
  useMount(() => {
    client("users").then(setUsers);
  });

  // 作业
  // const Persons: { name: string; age: number }[] = [
  //   { name: "jack", age: 22 },
  //   { name: "tom", age: 25 },
  // ];

  // const { value, clear, removeIndex, add } = useArray(Persons);

  return (
    <div>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list} />
      {/* <button onClick={() => add({ name: "John", age: 22 })}>add John</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear</button>

      {value.map((person, index) => (
        <div>
          <span>{index}==</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))} */}
    </div>
  );
};

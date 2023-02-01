import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Row } from "components/lib";
// import softwareLogo from "assets/software-logo.svg";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
// import { Dropdown, Menu } from "antd";
// 登录后app
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <PageHeader>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          {/* <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>登出</Menu.Item>
              </Menu>
            }
          ></Dropdown> */}
          <button onClick={logout}>hi, {user?.name}</button>
        </HeaderRight>
      </PageHeader>
      <Nav>导航</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>侧边栏</Aside>
      <Footer>页脚</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  grid-gap: 10rem;
`;

const PageHeader = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3.2rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  height: 6.4rem;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
  overflow: hidden;
`;

const Nav = styled.nav`
  grid-area: nav;
`;

const Aside = styled.aside`
  grid-area: aside;
`;

const Footer = styled.footer`
  grid-area: footer;
`;

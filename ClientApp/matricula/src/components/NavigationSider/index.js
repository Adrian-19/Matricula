import { Link } from "react-router-dom";
import { Menu, Divider, Button, Layout } from "antd";
import useNavigationSider from "hooks/useNavigationSider"
import "./index.css"
import Typography from "components/Typography";
import { FaUniversity } from 'react-icons/fa';
import AvatarWithPerson from "./AvatarWithPerson";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { useState } from "react";

const { Sider } = Layout;

function NavigationSider() {
  const { routes, key } = useNavigationSider()
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };
  return (
    <Sider collapsed={collapsed} style={{ backgroundColor: "rgb(30,30,30)", height: '100%', userSelect: "none" }}>
      <div className="siderContainer">
        {collapsed === false ? <>
          <div>
            <div className="siderContainerTitle" >
              <Typography variant={"heading"} align="center" color="white" > <FaUniversity style={{ fontSize: "20px" }} />    Universidad</Typography>
            </div>
            <Divider className="dividerMenu" />
            <div className="avatarContainer">
              <AvatarWithPerson collapsed={collapsed} />
            </div>
            <Divider className="dividerMenu" />
            <Menu
              className="customMenu"
              style={{ backgroundColor: "rgb(30,30,30)" }}
              theme="dark"
              mode="inline"
              selectedKeys={[key]}
              inlineCollapsed={collapsed}
            >
              {routes.map((route) => (
                <Menu.Item className="menuItem" key={route.key} icon={route.icon}>
                  <Link to={`/${route.path}`}>
                    {route.name}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
            <Divider className="dividerMenu"  />
          </div>
        </> : <>
          <Menu
            className="customMenu"
            style={{ backgroundColor: "rgb(30,30,30)", height: "100%", width: "auto"}}
            theme="dark"
            mode="inline"
            selectedKeys={[key]}
            inlineCollapsed={collapsed}
          >
            {routes.map((route) => (
              <Menu.Item className="menuItem" key={route.key} icon={route.icon}>
                <Link to={`/${route.path}`}>
                  {route.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu>

        </>}
        <div className="siderCollapsed">
          <Button
            className="bottonCollapse"
            type="text"
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
              backgroundColor: "rgb(30,30,30)",
              border: "0px",
              color: "white",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined style={{ fontSize: "25px" }} /> : <MenuFoldOutlined style={{ fontSize: "25px" }} />}
          </Button>
        </div>
      </div>
    </Sider>
  )
}

export default NavigationSider
import { Link } from "react-router-dom";
import { Menu, Divider } from "antd";
import useNavigationSider from "hooks/useNavigationSider"
import "./index.css"
import Typography from "components/Typography";
import { FaUniversity } from 'react-icons/fa';
import AvatarWithPerson from "./AvatarWithPerson";
function NavigationSider() {
  const { routes, key } = useNavigationSider()

  return (
    <div className="siderContainer">
      <div className="siderContainerTitle" >
        <Typography variant={"heading"} align="center" color="white" > <FaUniversity style={{ fontSize: "20px" }} />    Universidad</Typography>
      </div>
      <Divider/>
      <div className="avatarContainer">
        <AvatarWithPerson />
      </div>
      <Divider/>

      <Menu
        className="customMenu"
        style={{ backgroundColor: "rgb(30,30,30)" }}
        theme="dark"
        mode="inline"
        selectedKeys={[key]}

      >
        {routes.map((route) => (
          <Menu.Item className="menuItem" key={route.key} icon={route.icon}>
            <Link to={`/${route.path}`}>
              {route.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      <Divider/>
    </div>
  )
}

export default NavigationSider
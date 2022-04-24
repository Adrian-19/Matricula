import { Card, Layout } from "antd";
import ContentHeader from "components/ContentHeader";
import NavigationSider from "components/NavigationSider";
import "./index.css"

const { Content, Sider} = Layout;

function MainLayout({ children }) {



  return (
    <Layout style={{ height: "100vh" }}>
      <Sider className="main-navigation-sider" width={240} style={{ backgroundColor: "rgb(30,30,30)", height: '100%', userSelect: "none" }}>
        <NavigationSider />
      </Sider>
      <Content className="mainContent" style={{ backgroundColor: "rgb(240,240,240)", padding: '20px', height: '100%', display: "flex", flexDirection: "column" }}>
        <ContentHeader title="Home Page" />
        <Card
          bordered={false}
          className="pageContent"
          style={{  height: "100%", overflowY: "auto", flex: "1 1 auto" }}
        >

          {children}

        </Card>

      </Content>


    </Layout>

  )
}

export default MainLayout

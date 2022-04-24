import { Card, Layout } from "antd";
import ContentHeader from "components/ContentHeader";
import NavigationSider from "components/NavigationSider";
import "./index.css"

const { Content } = Layout;

function MainLayout({ children }) {




  return (
    <Layout style={{ height: "100vh" }}>
      <NavigationSider />
      <Content className="mainContent" style={{ backgroundColor: "rgb(240,240,240)", padding: '20px', height: '100%', display: "flex", flexDirection: "column" }}>
        <ContentHeader title="Home Page" />
        <Card
          bordered={false}
          className="pageContent"
          style={{ height: "100%", overflowY: "auto", flex: "1 1 auto" }}
        >

          {children}

        </Card>

      </Content>


    </Layout>

  )
}

export default MainLayout

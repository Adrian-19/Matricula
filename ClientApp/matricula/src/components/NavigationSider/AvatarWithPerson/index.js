import { useState, useContext, useEffect } from "react";
import { Avatar, Button, Popover } from "antd";
import { AutenticacionContext } from "context/AutenticacionContext";
import Typography from "components/Typography";
import { LoadingOutlined, RightOutlined } from "@ant-design/icons"
import "./index.css"


export default function AvatarWithPerson({ collapsed }) {
  const { user, logout } = useContext(AutenticacionContext)
  //const [avatarType, setAvatarType] = useState(null);
  const [visible, setVisible] = useState(false);
  const [URL, setURL] = useState(null);

  useEffect(() => {
    if (Boolean(user)) {
      const API_KEY = "CpjXyqGE7ZZ2SoRJUl69N6Sw2faf2WKPzUck"
      let API_URL = `https://gender-api.com/get?name=${user.usuario.nombre}&key=${API_KEY}`
      try {
        fetch(API_URL)
          .then(res => res.json())
          .then(persona => {
            console.log("GENDER:", persona.gender)
            if (persona.gender === "unknown")
              setURL(`https://joeschmoe.io/api/v1/random`);
            else
              setURL(`https://joeschmoe.io/api/v1/${persona.gender}/random`);

            //setAvatarType(persona.gender)
          })
      }
      catch (e) {
        console.log('Error:', e);
      }

    }
  }, [user, collapsed])


  // if (avatarType === "unknown")
  //   refURL.current = `https://joeschmoe.io/api/v1/random`;
  // else
  //   refURL.current = `https://joeschmoe.io/api/v1/${avatarType}/random`;






  return (
    <>
      <Avatar
        size={150}
        style={URL ? { backgroundColor: "white", userSelect: "none", } : { userSelect: "none", }}
        src={URL ? URL : <LoadingOutlined style={{ fontSize: "70px", color: "white" }} />}>
      </Avatar>
      <div className="nameContainer" style={{ display: "flex", alignItems: "center", alingConten: "center", gap: "2px" }}>
        <div style={{ maxWidth: "125px", overflow: "hidden", display: "inline" }}>
          <Typography
            variant={"span"}
            align="center"
            color="#f6f7f9"
            ellipsis>
            {user && user.usuario.nombre}
          </Typography>
        </div>
        <Popover
          id="avatarPop"
          className="avatarPop"
          content={<Button className="botonCerrarSesion" type="link" style={{ color: "white" }} onClick={logout}>Cerrar Sesión</Button>}
          placement="right"
          trigger="click"
          visible={visible}
          overlayClassName="avatarPop"
          onVisibleChange={(visible) => setVisible(visible)}
        >
          <RightOutlined onClick={() => setVisible(true)} className="options" style={{ fontSize: "100%", color: "aqua", flex: "1 0 auto" }} />
        </Popover>
      </div>

    </>
  )
}

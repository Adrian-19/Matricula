import React from "react"
import { Col, Row } from "antd"
import { Link } from 'react-router-dom'
import Typography from "components/Typography"

function FormHeader({ title, question, textLink, to }) {
  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Typography
          variant="h2"
          size={'2rem'}
          weight={"bold"}
          color={'rgba(255, 255, 255, 0.8)'}
        >
          {title}
        </Typography>
      </Col>
      <Col span={24}>
        <Typography block={false} size={'1.18rem'} color={"#B4BCC3"}>
          {question} <Link to={to} style={{ color: "#47E2EA" }}>{textLink}</Link>
        </Typography>
      </Col>
    </Row>
  )
}

export default React.memo(FormHeader)
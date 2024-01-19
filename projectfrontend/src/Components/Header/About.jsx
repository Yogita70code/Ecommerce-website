import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

export default function About() {
  

  return (
    <div> 
      <div>
        <h2>Our Activity</h2>
      </div>
      <Row gutter={16}>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="Active User Statistics"
          value={99.9}
          precision={2}
          valueStyle={{
            color: '#3f8600',
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="Product Price"
          value={9.3}
          precision={2}
          valueStyle={{
            color: '#cf1322',
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>
  <div >
  <img src="intro.jpeg" style={{float:"left"}}></img>
  <p>OneTech+ is more than just an online store; we are a team of passionate individuals dedicated to providing you with the best shopping experience possible. Discover the story behind our brand and what sets us apart.</p>

  </div>
    </div>
  )
}

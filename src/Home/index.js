import React, { PureComponent, Fragment } from 'react'
import {Button,Divider,DatePicker } from "antd"
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import "./styles.less"

class Home extends PureComponent {
  state = {
    loading: false
  }
  render() {
    console.log(this.props)
    return (
      <Fragment key="Fragment">
        <div key="home" className="home">
          <h2>Hello my name is <strong className="name">{name}</strong></h2>
          <Button type="primary">刷新</Button>
        </div>
        <Divider>graphql 练习</Divider>
        <DatePicker/>
      </Fragment>
    )
  }
  componentDidMount() {
  }
}

// 发起 graphql 查询 拿到 id 为1 的  id,name,sex  三个字段
export default graphql(gql`
  query {
    user(assetId:"1"){
      id
      name
      sex
    }
  }
`)(Home)

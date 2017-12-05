//项目入口文件

import React from "react"
import ReactDOM from "react-dom"
import { AppContainer as HotLoader } from "react-hot-loader"     //react-hot-loader  热更新可以保存状态  
import { Provider } from "react-redux"
//antd3.0 默认英文 需要手动设置为中文
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

//graphql 相关配置
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo';

/**
 * 配置服务端请求接口
 * //https://github.com/lijinke666/GraphQL-Study/blob/master/demo/server.js
 */
const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:1996/graphql"
    }),
    cache: new InMemoryCache()
});

import App from "app"
import store from "store"
import "./style.less"


const render = (Component) => {
    ReactDOM.render(
        <HotLoader>
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <LocaleProvider locale={zhCN}>
                        <Component />
                    </LocaleProvider>
                </Provider>
            </ApolloProvider>
        </HotLoader>,
        document.getElementById('root')
    )
}
render(App)
//webpack内置对象
if (module.hot) {
    module.hot.accept("app", () => {
        render(App)
    });
}

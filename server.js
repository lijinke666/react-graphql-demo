const http = require("http")
const express = require("express")
const app = express()
const graphql = require("graphql")
const graphqlHTTP = require("express-graphql")
const bodyParser = require("body-parser")
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')
const webpackMiddleware = require("webpack-dev-middleware")
const {
    GRAPHQL_PORT
} = require('./config')
const schema = require("./server/data/schema")

const compiler = webpack(webpackConfig)
app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
},{
    stats: {
		colors: true
	},
}));

app.use('/', express.static(path.resolve(__dirname, 'dist')));
app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({ schema: schema, pretty: true, graphiql: true }))
// app.use("/graphiql", graphqlHTTP({endpointURL: "/graphql"}))           //新版本貌似废弃了...


app.get('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.post('graphql', (req, res) => {
    graphql(schema, req.body).then((result) => {
        res.send(JSON.stringify(result))
    })
})

app.set('port', process.env.PORT || GRAPHQL_PORT)
const PORT = app.get("port")
app.listen(PORT, () => console.log(`graphql server running ${PORT}`))
const path  = require('path')
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack中所有配置信息都应该写在module.exports中
module.exports = {
    stats: {
        // Configure the console output
        errorDetails: false, //this does show errors
        colors: false,
        modules: true,
        reasons: true
    },
    target: "node",
    mode: "production",
    // 入口文件
    entry:"./src/index.ts",
    //devtool: 'eval-cheap-module-source-map',
    devtool: 'nosources-source-map',
    // 指定打包文件输出的路径
    output: {
        path: path.resolve(__dirname,'./'),
        // 打包后的文件
        filename: 'index.js',
    },
    plugins: [
        //全局变量
        new webpack.DefinePlugin({
            REACT_APP_AUTH_INFO: JSON.stringify("WyJcbiIsIlxuIiwiICAgICAgICAgICAgICAgICAgIF9fXz09PT0tXyAgXy09PT09X19fXG4iLCIgICAgICAgICAgICAgXy0tXl5eIyMjIyMvLyAgICAgIFxcXFwjIyMjI15eXi0tX1xuIiwiICAgICAgICAgIF8tXiMjIyMjIyMjIyMvLyAoICAgICkgXFxcXCMjIyMjIyMjIyNeLV9cbiIsIiAgICAgICAgIC0jIyMjIyMjIyMjIyMvLyAgfFxcXl4vfCAgXFxcXCMjIyMjIyMjIyMjIy1cbiIsIiAgICAgICBfLyMjIyMjIyMjIyMjIy8vICAgKEA6OkApICAgXFxcXCMjIyMjIyMjIyMjI1xcX1xuIiwiICAgICAgLyMjIyMjIyMjIyMjIyMoKCAgICAgXFxcXC8vICAgICApKSMjIyMjIyMjIyMjIyNcXFxuIiwiICAgICAtIyMjIyMjIyMjIyMjIyMjXFxcXCAgICAob28pICAgIC8vIyMjIyMjIyMjIyMjIyMjLVxuIiwiICAgIC0jIyMjIyMjIyMjIyMjIyMjI1xcXFwgIC8gVlYgXFwgIC8vIyMjIyMjIyMjIyMjIyMjIyMtXG4iLCIgICAtIyMjIyMjIyMjIyMjIyMjIyMjI1xcXFwvICAgICAgXFwvLyMjIyMjIyMjIyMjIyMjIyMjIyMtXG4iLCIgIF8jL3wjIyMjIyMjIyMjL1xcIyMjIyMjKCAgIC9cXCAgICkjIyMjIyMvXFwjIyMjIyMjIyMjfFxcI19cbiIsIiAgfC8gfCMvXFwjL1xcIy9cXC8gIFxcIy9cXCMjXFwgIHwgIHwgIC8jIy9cXCMvICBcXC9cXCMvXFwjL1xcI3wgXFx8XG4iLCIgIGAgIHwvICBWICBWICBgICAgViAgXFwjXFx8IHwgIHwgfC8jLyAgViAgICcgIFYgIFYgIFxcfCAgJ1xuIiwiICAgICBgICAgYCAgYCAgICAgIGAgICAvIHwgfCAgfCB8IFxcICAgJyAgICAgICcgICcgICAnXG4iLCIgICAgICAgICAgICAgICAgICAgICAgKCAgfCB8ICB8IHwgIClcbiIsIiAgICAgICAgICAgICAgICAgICAgIF9fXFwgfCB8ICB8IHwgL19fXG4iLCIgICAgICAgICAgICAgICAgICAgICh2dnYoVlZWKShWVlYpdnZ2KVxuIiwiXG4iLCIgICAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4iLCJcbiIsIiAgICAgIEF1dGhvciAgICAgICA6IGNoZW5zaGVuZ2RhXG4iLCIgICAgICBFbWFpbCAgICAgICAgOiBzaGVuZ2RhY2hlbjE5OTFAZ21haWwuY29tXG4iLCIgICAgICBEYXRlICAgICAgICAgOiAyMDIzLTAzLTEzIDIxOjE4OjA4XG4iLCIgICAgICBHaXRIdWIgICAgICAgOiBodHRwczovL2dpdGh1Yi5jb20vY2hlbnNoZW5nZGEwL2NhcmRzLmdpdFxuIiwiICAgICAgTGVldENvZGUgICAgIDogaHR0cHM6Ly9sZWV0Y29kZS5jbi91L2NoZW5zaGVuZ2RhL1xuIiwiXG4iXQ=="),
        }),
        //报错
        new webpack.IgnorePlugin({
            resourceRegExp: /^electron$/
        }),
        /*
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
        */
    ],
    // 指定webpack打包时使用的模块
    module:{
        // 指定要加载的规则
        rules:[
            {
                // 指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: "ts-loader",
                // 要排除的文件
                exclude: /node_modules/gi,
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.ts'],
    },
    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    performance : {
        hints : false
    }
}
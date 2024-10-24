# 贡献指南 

## 开发设置

开发 eruda 需要 [Node.js](https://nodejs.org/zh-cn)。

在克隆仓库后，运行以下命令：

```bash
# 安装 npm 依赖。
npm install
# 将 jasmine 库从 node_modules 复制到 test 文件夹。
npm run setup
```

## 常用的 NPM 脚本

```bash
# 监视并自动重新构建。
npm run dev
# 构建 eruda.js
npm run build
# 代码检查、构建和测试。
npm run ci
```

## 项目结构

- **build**: webpack 配置和其他一些有用的脚本。 
- **src**: 源代码，使用 es2015 编写。
- **test**: 测试页面。

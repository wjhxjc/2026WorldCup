# 2026 世界杯预测

基于 FIFA 排名、ELO 评分和历史数据的 2026 美加墨世界杯夺冠概率预测展示项目。

## 功能特性

- 🏆 **夺冠概率仪表盘** - Top 10 球队夺冠概率可视化
- ⚽ **球队列表** - 48 支参赛球队详细信息展示
- 📊 **数据对比** - 两支球队多维数据雷达图对比
- 🏟️ **赛程对阵** - 小组赛积分表 + 淘汰赛 Bracket
- 🗳️ **投票预测** - 用户投票选择冠军

## 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **样式**: TailwindCSS
- **图表**: ECharts + vue-echarts
- **路由**: Vue Router 4
- **部署**: GitHub Pages

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署

项目配置了 GitHub Actions 自动部署到 GitHub Pages：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建并部署
3. 访问 `https://<username>.github.io/zuqiu/`

## 数据来源

- FIFA 排名和 ELO 评分基于公开数据
- 夺冠概率基于综合预测模型计算
- 球员信息基于最新国家队名单

## 项目结构

```
zuqiu/
├── public/
│   └── data/          # 静态数据 JSON 文件
├── src/
│   ├── components/    # Vue 组件
│   │   ├── layout/    # 布局组件
│   │   ├── dashboard/ # 仪表盘组件
│   │   ├── team/      # 球队相关组件
│   │   ├── compare/   # 对比组件
│   │   ├── bracket/   # 赛程组件
│   │   └── vote/      # 投票组件
│   ├── views/         # 页面视图
│   ├── composables/   # 组合式函数
│   ├── types/         # TypeScript 类型
│   └── utils/         # 工具函数
├── .github/workflows/ # GitHub Actions 配置
└── package.json
```

## 许可证

MIT License

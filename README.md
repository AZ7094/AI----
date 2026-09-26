# AI 助教答疑平台

这是“HTML5 表单增强”课程作业的前端项目。页面可直接在 IntelliJ IDEA 中打开和运行，不依赖 Node.js 或后端服务。

## 页面与功能

- `register.html`：注册页。使用 `email`、`tel`、`select`、`datalist`、`checkbox` 和密码确认等控件。
- `index.html`：登录页。支持邮箱或手机号登录、密码显示/隐藏、必填校验。
- `assistant.html`：登录后的 AI 答疑演示页。可输入问题并展示模拟的步骤化回答。
- `assets/app.js`：使用 `localStorage` 模拟注册数据，使用 `sessionStorage` 保存登录状态；不上传数据。

## 用 IDEA 运行

1. 在 IntelliJ IDEA 选择 **File → Open**，打开 `ai-tutoring-platform` 文件夹。
2. 在项目面板中右键 `index.html`，选择 **Open in Browser**（或用 IDEA 的内置浏览器预览）。
3. 先访问“立即注册”创建演示账号，然后回到登录页体验完整流程。

## HTML5 表单增强说明

| 能力 | 应用位置 | 作用 |
| --- | --- | --- |
| 语义化输入类型 | `email`、`tel`、`password`、`checkbox` | 浏览器可进行基础格式校验，手机端会弹出更匹配的输入键盘。 |
| 原生校验属性 | `required`、`minlength`、`maxlength`、`pattern` | 防止空提交，限制姓名和密码长度，校验中国大陆手机号及“字母+数字”密码规则。 |
| 自动填充 | `autocomplete` | 允许浏览器安全地填充姓名、邮箱、手机号和账号字段。 |
| 候选输入 | `datalist` | 为常用学科提供可选建议，也允许用户自行输入。 |
| 可访问性 | `label`、`aria-live`、`aria-describedby` | 让标签、错误提示和密码强度能够被辅助技术识别。 |
| 交互增强 | 密码强度提示、显示/隐藏密码、两次密码一致性检查 | 在浏览器原生校验之外提供更及时、明确的反馈。 |

## GitHub 提交步骤

在 IDEA 底部的 Terminal 中执行以下命令。先在 GitHub 网站创建一个空仓库，复制其 HTTPS 地址后替换 `<你的仓库地址>`：

```bash
git init
git add .
git commit -m "feat: 完成 AI 助教答疑平台注册和登录页面"
git branch -M main
git remote add origin <你的仓库地址>
git push -u origin main
```

也可以在 IDEA 中依次使用 **Git → Create Git Repository**、提交（Commit）和 **Git → Push** 图形化完成。提交后，将 GitHub 仓库链接填写到学习通即可。

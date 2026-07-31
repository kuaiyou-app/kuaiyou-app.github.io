# 快游大师 CLI 安装指南

以下步骤面向 AI Agent，部分步骤需要用户在手机上配合完成。

## 环境要求

开始安装之前，请确保环境中已具备：

- Node.js（npm/npx）
- Android 手机已安装快游大师 App：https://autoace.kuaiyou-app.com/download

## 第 1 步 安装

```shell
# 安装 CLI
npm install -g autoace-cli

# 安装 Agent Skill（推荐）
# 将下列 SKILL.md 安装到当前客户端的 Agent Skills 目录
# https://kuaiyou-app.github.io/agent-skills/autoace/SKILL.md
```

也可不全局安装，由 MCP 配置用 `npx -y autoace-cli` 拉起。

## 第 2 步 配置 MCP 连接

Agent 引导用户：打开快游大师 → 设置 → 高级设置 → 开启「MCP 服务」，点击该条目复制连接信息。然后将连接信息写入当前 AI 客户端的 MCP 配置（名称建议 `autoace`）：

```json
{
  "mcpServers": {
    "autoace": {
      "command": "npx",
      "args": ["-y", "autoace-cli"],
      "env": {
        "KUAIYOU_DEVICE_IP": "<DEVICE_IP:PORT>",
        "KUAIYOU_MCP_PAIRING_CODE": "<PAIRING_CODE>"
      }
    }
  }
}
```

写入用户本地 / 客户端 MCP 配置即可。不要把配对码写入仓库或提交到 Git。

USB 连接时通常可省略 `env`，由 CLI 自动发现设备。

部分 App 版本要求先完成设备配对。若用户界面或「复制给 Agent」提示需 pair，先调用 `pair_device`，再继续看屏 / 下发。

## 第 3 步 验证

刷新 MCP 连接后，确认工具列表至少包含：

- `pair_device`
- `get_ui_tree`
- `capture_screenshot`
- `validate_kuaiyou_skill`
- `push_reactive_skill`

可选：先 `pair_device`，再调用 `capture_screenshot` 或 `get_ui_tree` 做冒烟验证。

若客户端会话里的工具目录缺少上述工具，但 CLI 直连 `tools/list` 已包含它们：属于客户端会话缓存与 stdio `tools/list` 不一致。请**新开 Agent 对话**（必要时重启 MCP / 客户端）后再验，勿在旧长会话里继续排查。

更多用法见 https://kuaiyou-app.github.io/docs/

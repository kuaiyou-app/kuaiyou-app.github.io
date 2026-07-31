# 快游大师 CLI 安装指南

以下步骤面向 AI Agent。请**严格按顺序执行**；部分步骤需要用户在手机上配合。装完后**新开一条 Agent 对话**再写技能。

本指南同时覆盖：

1. **autoace-cli**（MCP，npm 包）
2. **autoace** Agent Skill（整包：`SKILL.md` + `reference.md` + `craft.md`）
3. 客户端 **MCP 连接配置**

## 环境要求

- Node.js **≥ 20**、npm **≥ 10**（`node -v` / `npm -v` 自检）
- Android 手机已安装快游大师：https://autoace.kuaiyou-app.com/download

## 第 1 步 安装 CLI（MCP）

推荐由 MCP 配置用 npx 拉起（可钉版本，避免缓存过旧）：

```shell
# 仅验证包可用（可选）
npm view autoace-cli version

# MCP 配置里使用（示例钉 1.0.8，或改为当前最新）
# command: npx
# args: ["-y", "autoace-cli@1.0.8"]
```

可选全局安装（易过期，需自行 `npm update -g autoace-cli`）：

```shell
npm install -g autoace-cli@1.0.8
```

`autoace-cli` 是 **stdio MCP 服务**：在终端单独前台运行会等待 stdin；正常用法是交给 AI 客户端拉起。

## 第 2 步 安装 Agent Skill（推荐整包）

与飞书同款，优先用 skills CLI（会安装整目录，含参考文档）：

```shell
npx -y skills add kuaiyou-app/kuaiyou-open-source --skill autoace -g -y
```

若 `skills` 不可用，再手动拉取 Pages 镜像（**三个文件都要**，不要只装 `SKILL.md`）：

```shell
# 按客户端改 DEST，例如：
#   Claude Code → ~/.claude/skills/autoace
#   Codex       → ~/.codex/skills/autoace
#   Cursor      → ~/.cursor/skills/autoace
DEST="$HOME/.cursor/skills/autoace"
mkdir -p "$DEST"
for f in SKILL.md reference.md craft.md; do
  curl -fsSL "https://kuaiyou-app.github.io/agent-skills/autoace/$f" -o "$DEST/$f"
done
```

## 第 3 步 配置 MCP 连接

引导用户：打开快游大师 → 设置 → 高级设置 → 开启「MCP 服务」，点击该条目复制连接信息。将信息写入**当前 AI 客户端**的用户/本地 MCP 配置（名称建议 `autoace`）。

### Cursor / Claude Desktop（JSON）

```json
{
  "mcpServers": {
    "autoace": {
      "command": "npx",
      "args": ["-y", "autoace-cli@1.0.8"],
      "env": {
        "KUAIYOU_DEVICE_IP": "<DEVICE_IP:PORT>",
        "KUAIYOU_MCP_PAIRING_CODE": "<PAIRING_CODE>"
      }
    }
  }
}
```

### Codex

在 `~/.codex/config.toml`（或当前版本 MCP 配置处）注册同等 `command` / `args` / `env`。

### 硬性要求

- `KUAIYOU_DEVICE_IP` **必须含端口**（App 每次开启 MCP 会换端口与配对码）。
- 手机与电脑须在同一局域网；当前传输为局域网 HTTP。
- **禁止**假设「USB 可省略 env / CLI 会自动发现设备」——当前 CLI **没有** USB 自动发现；未设置地址会失败。
- 不要把配对码写入仓库或提交到 Git。
- 配置后重载 MCP；若会话不能热加载则重启客户端或新开 Agent 对话。

部分 App 版本要求显式配对：用户粘贴「复制给 Agent」全文后，先调用 `pair_device`（传入 `connectionInfo`），再看屏 / 下发。

## 第 4 步 验证

刷新 MCP 后，确认工具列表至少包含：

- `pair_device`
- `get_ui_tree`
- `capture_screenshot`
- `validate_kuaiyou_skill`
- `push_reactive_skill`

可选冒烟：`pair_device` → `capture_screenshot` 或 `get_ui_tree`。

若客户端会话工具目录缺少上述工具，但 CLI 直连 `tools/list` 已包含：属于**会话缓存**与 stdio 不一致。请**新开 Agent 对话**（必要时重启 MCP / 客户端）后再验，勿在旧长会话里继续排查。

## 第 5 步 交给 autoace Skill

安装与验证通过后，告知用户：**新开一条 Agent 对话**，用自然语言编写/推送技能。后续流程由已安装的 **autoace** Skill 接管（契约 → 看屏 → 校验 → 推送 → 调试）。

更多文档：https://kuaiyou-app.github.io/docs/

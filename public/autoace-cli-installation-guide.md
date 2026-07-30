# 快游大师 CLI 安装指南

以下步骤面向 AI Agent。部分步骤需要用户在手机或 AI 客户端设置界面中配合完成。

完成安装后，Agent 可通过 MCP 读取 Android 界面、校验并下发自动化技能到「快游大师」App。

## 名称说明（勿混淆）

| 名称 | 含义 |
| --- | --- |
| **autoace-cli** | npm / MCP CLI（本指南要安装的工具） |
| **autoace** | Agent Skill（`SKILL.md`，工作流说明） |
| **技能 (skill)** | 手机端执行的自动化 JSON，装在快游大师 App 里 |

## 环境要求

开始安装之前，请确保：

- 电脑已安装 **Node.js ≥ 18**（建议 LTS）与 npm / npx
- Android 手机已安装 **快游大师** App：[官方下载页](https://autoace.kuaiyou-app.com/download)
- 手机与电脑处于同一局域网，或通过 USB 连接

## 第 1 步 安装 CLI

优先使用 npx（无需全局安装）。若用户希望本机常驻命令，再全局安装。

```shell
# 方式 A：npx 免安装（推荐，适合作为 MCP command）
npx -y autoace-cli

# 方式 B：全局安装
npm install -g autoace-cli
```

确认包可用：

```shell
npm view autoace-cli version
```

说明：`autoace-cli` 是 MCP stdio 服务。在终端单独运行时会等待标准输入；正常用法是交给 AI 客户端拉起。

## 第 2 步 安装 Agent Skill（推荐）

安装 Agent Skill「autoace」，让 Agent 按固定流程：看屏 → 写技能 → 校验 → 推送。

**Claude Code：**

```shell
mkdir -p ~/.claude/skills/autoace
curl -fsSL https://raw.githubusercontent.com/kuaiyou-app/kuaiyou-open-source/d0acaccc42945c6df49b640d4bd6647546a22bf5/agent-skills/autoace/SKILL.md -o ~/.claude/skills/autoace/SKILL.md
```

调用：`/autoace`。团队可放入项目 `.claude/skills/autoace/`。

**Codex：**

```shell
mkdir -p ~/.codex/skills/autoace
curl -fsSL https://raw.githubusercontent.com/kuaiyou-app/kuaiyou-open-source/d0acaccc42945c6df49b640d4bd6647546a22bf5/agent-skills/autoace/SKILL.md -o ~/.codex/skills/autoace/SKILL.md
```

调用：`$autoace` 或 `/skills`。也可放到项目 `.agents/skills/autoace/`。

**Cursor：**

将 `agent-skills/autoace`（含 `SKILL.md`）复制到项目或个人 Agent Skills 目录，新开 Agent 会话后即可按描述自动选用。也可直接读取本站镜像：

https://kuaiyou-app.github.io/agent-skills/autoace/SKILL.md

源码：https://github.com/kuaiyou-app/kuaiyou-open-source/tree/d0acaccc42945c6df49b640d4bd6647546a22bf5/agent-skills/autoace

## 第 3 步 开启手机 MCP 并配置客户端

Agent 引导用户完成手机端操作，再把连接信息写入 AI 客户端的 MCP 配置。

### 3.1 用户在手机上操作

1. 打开快游大师 App
2. 进入「设置 → 高级设置」
3. 开启「MCP 服务」
4. 点击「MCP 服务」条目，复制完整连接信息（含 `IP:端口` 与配对码）

注意：

- 每次重新开启 MCP 服务后，端口与配对码都会变化，需重新配置
- **不要**把配对码写入仓库、日志、文档或 Git 提交
- 连续输错配对码会触发设备退避（`429` + `Retry-After`）

### 3.2 Agent 写入 MCP 配置

MCP server 名称建议使用 `autoace`。将用户复制的值填入环境变量占位符：

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

局域网也可在终端用环境变量启动（仅作参考；优先写入客户端 MCP 配置）：

```shell
KUAIYOU_DEVICE_IP=<DEVICE_IP:PORT> KUAIYOU_MCP_PAIRING_CODE=<PAIRING_CODE> npx -y autoace-cli
```

USB 连接时设备可自动发现，通常无需配置上述环境变量：

```shell
npx -y autoace-cli
```

各客户端配置位置（路径可能随版本变化）：

- **Cursor / Claude Desktop**：MCP 设置中加入上述 JSON
- **Claude Code**：在其 MCP 配置中增加同等 `autoace` 条目后重启会话
- **Codex**：在 `~/.codex/config.toml`（或当前版本 MCP 配置处）注册同等 `command` / `args` / `env`

优先写入用户/本地 MCP 配置，不要把凭证提交进项目仓库。

## 第 4 步 验证

重启或刷新 AI 客户端的 MCP 连接后，确认工具列表包含：

- `get_ui_tree`
- `capture_screenshot`
- `validate_kuaiyou_skill`
- `push_reactive_skill`

可选冒烟：调用 `capture_screenshot` 或 `get_ui_tree`。成功则表示电脑已连上手机 MCP。

若失败，请检查：

1. 手机「MCP 服务」仍开启，且显示的 IP:端口、配对码与配置一致
2. 手机与电脑网络可达（同局域网或 USB）
3. Node.js / npm 可用，`npx -y autoace-cli` 能拉取包

## 下一步

安装完成后，用户可用自然语言让 Agent 写技能。推荐流程：

1. `capture_screenshot` / `get_ui_tree` 查看当前界面
2. 生成技能 JSON
3. `validate_kuaiyou_skill` 校验
4. `push_reactive_skill` 下发；用户在手机上确认导入/运行

更多说明见站内文档：https://kuaiyou-app.github.io/docs/

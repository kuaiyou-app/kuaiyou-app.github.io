# 快游大师 CLI 安装指南

面向 AI Agent。按顺序执行；手机开 MCP、授权需用户配合。完成后**新开 Agent 对话**再写技能。

## 环境

- Node.js ≥ 20、npm ≥ 10
- 手机已装快游大师：https://autoace.kuaiyou-app.com/download

## 1. 安装 CLI

```shell
npm install -g autoace-cli@latest
```

`autoace-cli` 是 stdio MCP 服务，由 AI 客户端拉起，不要只在终端前台空跑。

## 2. 安装 Agent Skill

```shell
npx -y skills add kuaiyou-app/kuaiyou-open-source --skill autoace -g -y
```

将 `autoace` 整包（含参考文档）装到当前环境支持的 Agent Skills 目录。按当前客户端自行选择安装位置，不必逐客户端照抄路径。

## 3. 配置 MCP

引导用户：快游大师 → 设置 → 高级设置 → 开启「MCP 服务」→ 点击条目复制连接信息。写入当前客户端的用户/本地 MCP 配置（名称建议 `autoace`）：

```json
{
  "mcpServers": {
    "autoace": {
      "command": "autoace-cli",
      "args": [],
      "env": {
        "KUAIYOU_DEVICE_IP": "<DEVICE_IP:PORT>",
        "KUAIYOU_MCP_PAIRING_CODE": "<PAIRING_CODE>"
      }
    }
  }
}
```

若客户端更习惯用 npx：`command` 为 `npx`，`args` 为 `["-y","autoace-cli@latest"]`。按客户端配置格式改写（JSON / toml 等）即可。

要点：

- `KUAIYOU_DEVICE_IP` 必须含端口；每次开启 MCP 会变端口与配对码
- 手机与电脑同一局域网；须设置地址与配对码（无 USB 自动发现）
- 配对码不写仓库 / 不提交 Git
- 配置后重载 MCP 或新开对话

用户粘贴「复制给 Agent」全文后，先 `pair_device`（`connectionInfo`），再看屏 / 下发。

## 4. 验证

确认工具至少有：`pair_device`、`get_ui_tree`、`capture_screenshot`、`validate_kuaiyou_skill`、`push_reactive_skill`。

可选：`pair_device` 后截屏或拉 UI 树冒烟。

若会话工具目录缺工具但 CLI `tools/list` 已有：新开对话后再验。

## 5. 收尾

验证通过后告知用户新开对话，用自然语言写/推送技能；后续由 **autoace** Skill 接管。

文档：https://kuaiyou-app.github.io/docs/

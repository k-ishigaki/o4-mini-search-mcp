# o4-mini-search-mcp

An MCP (Model Context Protocol) server that provides web search capabilities using OpenAI's o4-mini model. The `o4-mini-search` tool accepts text queries and returns AI-powered search results.

---

> 🚀 **Forked from [yoshiko-pg/o3-search-mcp](https://github.com/yoshiko-pg/o3-search-mcp)**
>
> Switched from the original o3 model to o4-mini for lighter TPM usage.

## Installation

### Using npx (Recommended)

```bash
$ claude mcp add o4-mini -s user \
    -e OPENAI_API_KEY=your-api-key \
    -e SEARCH_CONTEXT_SIZE=medium \
    -e REASONING_EFFORT=medium \
    -- npx o4-mini-search-mcp
```

```json
{
  "mcpServers": {
    "o4-mini-search": {
      "command": "npx",
      "args": ["o4-mini-search-mcp"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```

## Local Development Setup

```bash
# setup
git clone git@github.com:k-ishigaki/o4-mini-search-mcp.git
cd o4-mini-search-mcp
pnpm install
pnpm build
```

```bash
$ claude mcp add o4-mini -s user \
    -e OPENAI_API_KEY=your-api-key \
    -e SEARCH_CONTEXT_SIZE=medium \
    -e REASONING_EFFORT=medium \
    -- node /path/to/o4-mini-search-mcp/build/index.js
```

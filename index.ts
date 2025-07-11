#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import OpenAI from "openai";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "o4-mini-search-mcp",
  version: "0.0.1",
});

// Initialize OpenAI client
const openAIApiBase = process.env.OPENAI_API_BASE;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  ...(openAIApiBase ? { baseURL: openAIApiBase } : {}),
});

// Configuration from environment variables
const searchContextSize =
  (process.env.SEARCH_CONTEXT_SIZE || 'medium') as 'low' | 'medium' | 'high';
const reasoningEffort =
  (process.env.REASONING_EFFORT || 'medium') as 'low' | 'medium' | 'high';

// Define the o4-mini-search tool
server.tool(
  "o4-mini-search",
  "An AI agent with advanced web search capabilities using OpenAI's o4-mini model.",
  {
    input: z.string().describe(
      "Ask questions, search for information, or consult about complex problems in English."
    ),
  },
  async ({ input }) => {
    try {
      const response = await openai.responses.create({
        model: "o4-mini",
        input,
        tools: [{ type: "web_search_preview", search_context_size: searchContextSize }],
        tool_choice: "auto",
        parallel_tool_calls: true,
        reasoning: { effort: reasoningEffort },
      });

      return {
        content: [
          {
            type: "text",
            text: response.output_text ?? "No response text available.",
          },
        ],
      };
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${
              error instanceof Error ? error.message : "Unknown error occurred"
            }`,
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP Server running on stdio");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

# AgentCN Web Context

This directory contains the context engineering configuration and system prompt for **AgentCN's** web capabilities.

## Overview

The `prompt.ts` file exports a `prompt` string that defines the persona, capabilities, and operational boundaries for AgentCN when handling web-related tasks on the `agentcn` platform.

## Capabilities

AgentCN is designed as a web specialist with the following core capabilities:

1.  **Web Search**: Searching the web for real-time information and resources.
2.  **Browser Automation**: Interacting with websites programmatically (clicking, filling forms, navigating) when standard search is insufficient.
3.  **Webset Creation**: Generating structured, tabular data (Websets) from exhaustive searches based on specific criteria.
4.  **Question Answering**: answering user queries using synthesized information from web sources.
5.  **Deep Research**: Conducting comprehensive, long-running research tasks on complex topics.

## Usage

Import the prompt constant to initialize the agent's context:

```typescript
import { prompt } from './prompt';

// Use 'prompt' as the system message or context for the AI model
```

## Guidelines

The prompt includes specific instructions for:
*   **Citations**: Ensuring all claims are backed by source URLs.
*   **Tool Usage**: Prioritizing cheaper/faster tools (Web Search) over expensive ones (Browser/Websets) unless necessary.
*   **Safety**: Strictly prohibiting file downloads directly by the agent.

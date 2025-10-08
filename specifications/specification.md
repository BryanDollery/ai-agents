# Project Overview

This project wraps the Vercel AI SDK to provide a more user-friendly interface for building AI agents. It includes features such as:

- Simplified agent creation with decorators
- Built-in validation using Zod
- Support for various AI models
- Easy integration with tools and APIs

# Project Structure
- `src/`: Contains the main source code for the library.
  - `agents/`: Agent-related classes and decorators.
  - `llm/`: Language model providers and utilities.
  - `tools/`: Tool integration classes and decorators.
- `test/`: Contains unit tests for the library.
- `specifications/`: Contains the specification files for project (always read this file first).

# Origins

This project is a fork of axar-ai. It will not be merged back beause that project is abandoned. But, I like it so I'm going to try to maintain it.

# Immdeitate Tasks

1. [ ] Remove zod-schema-to-json dependency by finding a different way to convert the zod schema to json schema
2. [ ] Upgrade ai-sdk and related libs (provider, openai, and anthropic), and zod
3. [ ] Upgrade other libs


# File Permission Process

Provides an RPC command for running a non-graphical command with elevated
permissions through `@vscode/sudo-prompt`.

The prompt and elevated command are one operation: prompting once does not make
the file permission process privileged for later calls.

The `FilePermission.prompt` RPC command accepts the command to elevate and
optional `name`, `icns`, and `env` values. It resolves with the command's
`stdout` and `stderr`, or rejects when elevation or execution fails.

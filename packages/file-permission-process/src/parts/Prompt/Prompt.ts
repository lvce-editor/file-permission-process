import * as SudoPrompt from '@vscode/sudo-prompt'

export interface PromptOptions {
  readonly env?: Record<string, string>
  readonly icns?: string
  readonly name?: string
}

export interface PromptResult {
  readonly stderr: string
  readonly stdout: string
}

type Callback = (error?: Error, stdout?: string | Buffer, stderr?: string | Buffer) => void

export type SudoPromptExec = (command: string, options: PromptOptions, callback: Callback) => void

const toString = (value: string | Buffer | undefined): string => {
  return value?.toString() ?? ''
}

export const promptWithExec = (exec: SudoPromptExec, command: string, options: PromptOptions = {}): Promise<PromptResult> => {
  const { promise, reject, resolve } = Promise.withResolvers<PromptResult>()
  try {
    exec(command, { name: 'Lvce Editor', ...options }, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      resolve({
        stderr: toString(stderr),
        stdout: toString(stdout),
      })
    })
  } catch (error) {
    reject(error)
  }
  return promise
}

export const prompt = async (command: string, options: PromptOptions = {}): Promise<PromptResult> => {
  if (typeof command !== 'string' || command.length === 0) {
    throw new TypeError('command must be a non-empty string')
  }
  return promptWithExec(SudoPrompt.exec, command, options)
}

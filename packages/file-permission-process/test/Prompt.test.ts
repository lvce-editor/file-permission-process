import { expect, jest, test } from '@jest/globals'
import * as Prompt from '../src/parts/Prompt/Prompt.js'

test('promptWithExec invokes sudo prompt and returns its output', async () => {
  const exec = jest.fn<Prompt.SudoPromptExec>((command, options, callback) => {
    expect(command).toBe('echo hello')
    expect(options).toEqual({
      env: {
        TEST_VALUE: 'test',
      },
      name: 'Test App',
    })
    callback(undefined, Buffer.from('hello\n'), 'warning')
  })

  await expect(
    Prompt.promptWithExec(exec, 'echo hello', {
      env: {
        TEST_VALUE: 'test',
      },
      name: 'Test App',
    }),
  ).resolves.toEqual({
    stderr: 'warning',
    stdout: 'hello\n',
  })
  expect(exec).toHaveBeenCalledTimes(1)
})

test('promptWithExec uses the default application name', async () => {
  const exec = jest.fn<Prompt.SudoPromptExec>((command, options, callback) => {
    expect(command).toBe('true')
    expect(options).toEqual({
      name: 'Lvce Editor',
    })
    callback()
  })

  await expect(Prompt.promptWithExec(exec, 'true')).resolves.toEqual({
    stderr: '',
    stdout: '',
  })
})

test('promptWithExec rejects errors', async () => {
  const error = new Error('permission denied')
  const exec = jest.fn<Prompt.SudoPromptExec>((command, options, callback) => {
    callback(error)
  })

  await expect(Prompt.promptWithExec(exec, 'false')).rejects.toBe(error)
})

test('prompt rejects an empty command', async () => {
  await expect(Prompt.prompt('')).rejects.toThrow('command must be a non-empty string')
})

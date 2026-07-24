import { test, expect } from '@jest/globals'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.js'

test('commandMap contains expected commands', () => {
  expect(typeof CommandMap.commandMap).toBe('object')
  expect(typeof CommandMap.commandMap['FilePermission.prompt']).toBe('function')
})

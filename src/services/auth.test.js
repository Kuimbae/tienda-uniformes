import { describe, it, expect } from 'vitest'
import * as auth from './auth'

describe('auth', () => {
  it('debería estar definido el módulo', () => {
    expect(auth).toBeDefined()
  })
})
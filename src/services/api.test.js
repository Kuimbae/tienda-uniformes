import { describe, it, expect } from 'vitest'
import api from './api'

// Test básico para verificar que la instancia de api esté definida

describe('api', () => {
  it('debería estar definida', () => {
    expect(api).toBeDefined()
  })
})
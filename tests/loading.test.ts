import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Loading from '../components/Loading.vue'

describe('Loading.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(Loading)
    expect(wrapper.classes()).toContain('spinner')
  })
})
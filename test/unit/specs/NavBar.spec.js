import Vue from 'vue'
import BetsList from '@/components/BetsList'

describe('BetsList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(BetsList)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('thead tr th:first-child').textContent)
      .to.equal('Bet #')
  })
})

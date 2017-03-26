<template>
  <div class="row">
    <div class="col-xs-4 col-sm-3 col-md-2">
      <div class="ui-panel2">
        <div class="dropdown-toggle" id="currencyMenu" data-toggle="dropdown" aria-haspopup="true"
             aria-expanded="true">
          <p id="Balance">{{ Balance }}{{ CurrencySymbol }} <span class="caret"></span></p>
        </div>
        <ul class="dropdown-menu" aria-labelledby="currencyMenu">
          <li v-for="currency in Currencies"><a href="#" v-on:click.prevent="onCurrencyChange(currency.value)">{{ currency.name }}</a></li>
        </ul>
        <label for="Balance">Balance</label>
      </div>
    </div>

    <div class="col-xs-4 col-sm-3 col-md-2">
      <div class="ui-panel2">
        <p id="MaxWin">{{ MaxWin }}</p>
        <label for="MaxWin">Max Win</label>
      </div>
    </div>

    <div class="col-xs-4 col-sm-3 col-md-2">
      <div class="ui-panel2">
        <p id="Bankroll">{{ Bankroll }}</p>
        <label for="Bankroll">Bankroll</label>
      </div>
    </div>

    <div class="hidden-xs col-sm-3 col-md-2">
      <div class="ui-panel2">
        <p id="Wagered">{{ Wagered }}</p>
        <label for="Wagered">Wagered</label>
      </div>
    </div>

    <div class="hidden-xs hidden-sm col-md-2">
      <div class="ui-panel2">
        <p id="Profit">{{ Profit }}</p>
        <label for="Profit">Profit</label>
      </div>
    </div>

    <div class="hidden-xs hidden-sm col-md-2">
      <div class="ui-panel2">
        <p id="NumBets">{{ NumBets }}</p>
        <label for="NumBets">Bets</label>
      </div>
    </div>
  </div>
</template>

<style>
  .ui-panel2 {
    padding: 8px;
    text-align: center;
  }
</style>

<script>
  import {mapGetters} from 'vuex'
  import {currencies} from '../currencies'

  export default {
    name: 'StatsBar',
    data: () => ({
      Currencies: currencies
    }),
    computed: mapGetters({
      Balance: 'Balance',
      Currency: 'Currency',
      CurrencySymbol: 'CurrencySymbol',
      NumBets: 'NumBets',
      MaxWin: 'MaxWin',
      Bankroll: 'Bankroll',
      Wagered: 'Wagered',
      Profit: 'Profit'
    }),
    methods: {
      onCurrencyChange: function (c) {
        this.$store.dispatch('changeCurrency', c)
      }
    }
  }
</script>

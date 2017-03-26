<template>
  <table class="table table-condensed table-striped">
    <thead>
    <tr>
      <th>Bet #</th>
      <th>Player</th>
      <th>Time</th>
      <th>Bet</th>
      <th class="hidden-xs">Payout</th>
      <th class="hidden-xs">Target</th>
      <th>Roll</th>
      <th>Profit</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="bet in ActiveBets">
      <td class="red-text">{{ bet.BetId }}</td>
      <td class="red-text">{{ bet.Player }}</td>
      <td>{{ bet.Time }}</td>
      <td>{{ bet.BetAmount.toFixed(8) }}{{ bet.Currency }}</td>
      <td class="hidden-xs">{{ bet.Payout }}x</td>
      <td class="hidden-xs">{{ bet.Target }}</td>
      <td>{{ bet.Roll.toFixed(4) }}</td>
      <td v-bind:class="formatProfit(bet.Profit)">{{ bet.Profit.toFixed(8) }}{{ bet.Currency }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style>
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: #1B262D;
  }

  table {
    font-size: 9px;
  }

  th {
    text-align: center;
    color: #878e92;
  }

  .red-text {
    color: #FF2A68;
  }

  .green-text {
    color: #8EC919;
  }

  /* ipad portrait */
  @media all and (device-width: 768px) and (device-height: 1024px) and (orientation: portrait) {
    table {
      font-size: 14px;
    }
  }

  /*ipad landscape */
  @media all and (device-width: 768px) and (device-height: 1024px) and (orientation: landscape) {
    table {
      font-size: 16px;
    }
  }

  /*ipad pro portrait -- this seems to catch ipad lanscape? */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    table {
      font-size: 16px;
    }
  }

  tbody tr td {
    border-top: 0 !important;
    text-align: center;
  }

  .table thead tr th {
    border-bottom: 0 !important;
  }
</style>

<script>
  export default {
    name: 'BetsList',
    props: {
      ActiveBets: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      formatProfit: function (x) {
        if (x < 0)
          return "red-text";
        return "green-text";
      }
    }
  };
</script>

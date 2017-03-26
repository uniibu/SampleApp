<template>
  <div class="row">
    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
      <div class="ui-panel">
        <div class="row">
          <div class="col-xs-6">
            <div class="form-group">
              <label class="label-control" for="betAmount">Bet Amount</label>
              <div class="input-group">
                <input id="betAmount" v-model="BetAmount" v-on:keyup="updateProfit" class="form-control"
                       type="text" autocomplete="off">
                <span class="input-group-addon">{{ CurrencySymbol }}</span>
              </div>
            </div>
          </div>
          <div class="col-xs-6">
            <div class="form-group">
              <label class="label-control" for="chance">Profit</label>
              <div class="input-group">
                <input id="betProfit" disabled v-model="BetProfit" class="form-control" type="text"
                       autocomplete="off">
                <span class="input-group-addon">{{ CurrencySymbol }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-6">
            <div class="form-group">
              <label class="label-control" for="chance">Chance</label>
              <div class="input-group">
                <input id="chance" v-model="Chance" v-on:keyup="updateChance" class="form-control"
                       type="text" autocomplete="off">
                <span class="input-group-addon">%</span>
              </div>
            </div>
          </div>
          <div class="col-xs-6">
            <div class="form-group">
              <label class="label-control" for="payout">Payout</label>
              <div class="input-group">
                <input id="payout" v-model="Payout" v-on:keyup="updatePayout" class="form-control"
                       type="text" autocomplete="off">
                <span class="input-group-addon">X</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-6">
            <div class="form-group pull-right">
              <button v-on:click="bet(0)" v-bind:disabled="WaitingOnBetResult" id="betHiButton"
                      class="btn btn-custom" type="button">Hi
								<span class="target">{{ HiTarget }}</span>
              </button>
            </div>
          </div>
          <div class="col-xs-2">
            <div class="form-group pull-left">
              <button v-on:click="bet(1)" v-bind:disabled="WaitingOnBetResult" id="betLoButton"
                      class="btn btn-custom" type="button">Lo
								<span class="target">{{ LoTarget }}</span>
              </button>
            </div>
          </div>
          <div class="col-xs-2">
            <p @click="showProvablyFairDialog"
               class="btn btn-default fa fa-balance-scale provablyFairButton"></p>
            <ProvablyFairModal v-if="ProvablyFairDialogVisible" @close="hideProvablyFairDialog">
            </ProvablyFairModal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .ui-panel {
    background-color: #1B262D;
    padding: 8px;
    text-align: center;
  }

  .btn-custom {
    width: 50px;
    height: 45px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: -webkit-linear-gradient(top, #FF2A68 13%, #8c0000 82%);
    background: linear-gradient(to bottom, #FF2A68 13%, #8c0000 82%);
    border: 0;
    padding: 5px;
    margin: 0 1px 0 0;
    position: relative;
  }

  .btn-custom:hover {
    background: -webkit-linear-gradient(top, #FF2A68 13%, #8c0000 82%);
    background: linear-gradient(to bottom, #FF2A68 13%, #8c0000 82%);
    color: #fff;
  }

  .btn-custom:focus {
    background: -webkit-linear-gradient(top, #FF2A68 13%, #8c0000 82%);
    background: linear-gradient(to bottom, #FF2A68 13%, #8c0000 82%);
    color: #fff;
  }

  .target {
    font-size: 9px;
    float: right;
  }

  .input-group-addon {
    color: #FBFCFE;
    background-color: #303e46;
    border: none;
    border-left: 1px solid #1b262d !important;
  }

  .provablyFairButton {
    margin-top: 9px;
    margin-left: 14px;
  }
</style>
<script>
  import toastr from 'toastr';
  import ProvablyFairModal from './ProvablyFairModal.vue';
  import {formatDecimal} from './../helpers';
  import {mapGetters} from 'vuex';

  export default {
    name: 'BetControls',
    data: function () {
      return {
        Chance: 49.5,
        BetAmount: 0,
        BetProfit: 0,
        Payout: 2,
        LoTarget: "< 49.5000",
        HiTarget: "> 50.4999",
      };
    },
    components: {
      ProvablyFairModal,
    },
    computed: mapGetters({
      WaitingOnBetResult: 'WaitingOnBetResult',
      Currency: 'Currency',
      CurrencySymbol: "CurrencySymbol",
      ProvablyFairDialogVisible: "ProvablyFairDialogVisible"
    }),
    methods: {
      bet: function (target) {
        if (this.BetAmount === 0) {
          toastr.error('You must bet more than 0');
          return;
        }

        if (this.BetAmount > this.Balance) {
          toastr.error('Balance too low');
          return;
        }

        this.$store.dispatch('bet', {Chance: this.Chance, BetAmount: this.BetAmount, Target: target});
      },
      updateTargets: function () {
        var c = this.Chance;

        if (isNaN(c) || c === '') {
          c = 0.0001;
        }

        this.HiTarget = "> " + (99.9999 - c).toFixed(4);
        this.LoTarget = "< " + parseFloat(c).toFixed(4);
      },
      updateChance: function () {
        var fc = (this.Chance);
        if (isNaN(fc) || fc === '' || fc === 0) {
          this.Payout = 0;
        } else {
          if (fc < 0.0001) {
            fc = 0.0001;
          }
          if (fc > 98.99) {
            fc = 98.99;
          }

          var m = 99 / fc;
          m = formatDecimal(m, 8);

          this.Payout = m;
          this.Chance = fc;
        }

        this.updateProfit();
        this.updateTargets();
      },
      updatePayout: function () {
        var fp = this.Payout;
        if (isNaN(fp) || fp === '' || fp === 0) {
          this.Chance = 0;
        } else {
          if (fp > 990000) {
            fp = 990000;
          }

          var c = 99 / fp;

          c = formatDecimal(c, 4);

          this.Chance = c;
          this.Payout = fp;
        }

        this.updateProfit();
        this.updateTargets();
      },
      updateProfit: function () {
        if (isNaN(parseFloat(this.BetAmount))) {
          this.BetProfit = 0;
        }
        else if (this.Payout > 0) {
          var p = this.BetAmount * this.Payout - this.BetAmount;
          this.BetProfit = formatDecimal(p, 8);
        }
        else {
          this.BetProfit = 0;
        }
      },
      showProvablyFairDialog: function () {
        this.$store.dispatch('showProvablyFairDialog');
      },
      hideProvablyFairDialog: function () {
        this.$store.dispatch('hideProvablyFairDialog');
      },
    }
  };
</script>

<template>
  <div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">
          <h4>{{ AppName }}</h4>
        </a>
      </div>
      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
          <template v-if="IsAuthenticated === false">
            <li><a @click.prevent="showRegisterDialog" href="#">Register</a></li>
            <li><a v-bind:href="LoginUrl">Log in</a></li>
          </template>
          <template v-if="IsAuthenticated === true">
            <li><a @click.prevent="openDepositWindow">Deposit</a></li>
            <li><a @click.prevent="openWithdrawWindow">Withdraw</a></li>
            <li><a v-bind:href="AccountManageUrl">Account: {{ UserName }}</a></li>
            <li><a @click.prevent="logout" href="#">Log off</a></li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  .navbar-brand {
    padding: 6px 6px;
  }

  .navbar {
    height: 50px;
    min-height: 50px;
  }
</style>

<script>
  import {mapGetters} from 'vuex';
  import Settings from "./../settings";

  export default {
    name: 'NavBar',
    data: function () {
      return {
        LoginUrl: Settings.BetKingUrlBase + Settings.LoginUrl + '?appId=' + Settings.AppId,
        AccountManageUrl: Settings.BetKingUrlBase + Settings.AccountManageUrl
      };
    },
    computed: mapGetters({
      AppName: 'AppName',
      UserName: 'UserName',
      IsAuthenticated: "IsAuthenticated"
    }),
    methods: {
      showRegisterDialog: function () {
        this.$store.dispatch('showRegisterDialog');
      },
      openDepositWindow: function () {
        const url = Settings.BetKingUrlBase + '/apps/deposit?appId=' + Settings.AppId;
        const name = 'App Deposit';
        const options = [
          'width=500',
          'height=400',
          'left=50',
          'top=50'
        ];
        const w = window.open(url, name, options);
        w.focus();
      },
      openWithdrawWindow: function () {
        const url = Settings.BetKingUrlBase + '/apps/withdraw?appId=' + Settings.AppId;
        const name = 'App Withdraw';
        const options = [
          'width=500',
          'height=400',
          'left=50',
          'top=50'
        ];
        const w = window.open(url, name, options);
        w.focus();
      },
      logout: function () {
        this.$store.dispatch('logout');
      }
    }
  };
</script>
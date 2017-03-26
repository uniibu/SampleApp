<template>
  <div id="app">
    <RegisterDialog v-if="RegisterDialogVisible" @close="hideRegisterDialog">
    </RegisterDialog>

    <NavBar>
    </NavBar>

    <div class="container">
      <StatsBar>
      </StatsBar>

      <br/>

      <BetControls>
      </BetControls>

      <br/>
      <div class="row">
        <div class="col-xs-12">
          <ul class="nav nav-tabs">
            <li class="active mainTab highRollerButton" v-on:click.prevent="highRollerButtonClicked">
              <a href="#">Highroller</a>
            </li>
            <li class="mainTab allBetsButton" v-on:click.prevent="allBetsButtonClicked">
              <a href="#">All Bets</a>
            </li>
            <li class="mainTab myBetsButton" v-on:click.prevent="myBetsButtonClicked">
              <a href="#">My Bets</a>
            </li>
            <li class="mainTab"><a href="#">Chat</a></li>
            <li class="mainTab"><a href="#">Stats</a></li>
          </ul>
          <BetsList v-bind:ActiveBets="ActiveBets">
          </BetsList>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #app {
    color: #FBFCFE;
    margin-top: 4px;
  }

  .form-control, .form-control[disabled] {
    background-color: #303E46;
    border-color: #303E46;
    color: #FBFCFE;
    text-align: right;
    font-size: 12px;
  }

  label {
    font-size: 12px;
    color: #878e92;
  }

  p {
    font-size: 12px;
    margin: 0;
  }

  a {
    color: #878e92;
  }

  /* iphone 6 landscape */
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: landscape) {
    table {
      font-size: 12px;
    }
  }

  /* iphone 6 plus landscape */
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation: landscape) {
    table {
      font-size: 14px;
    }
  }

  /* ipad portrait */
  @media all and (device-width: 768px) and (device-height: 1024px) and (orientation: portrait) {
    p {
      font-size: 16px;
    }

    label {
      font-size: 16px;
    }

    .form-control, .form-control[disabled] {
      font-size: 16px;
    }

    .nav-tabs li a {
      font-size: 18px;
    }
  }

  /*ipad landscape */
  @media all and (device-width: 768px) and (device-height: 1024px) and (orientation: landscape) {
    p {
      font-size: 16px;
    }

    label {
      font-size: 16px;
    }

    .form-control, .form-control[disabled] {
      font-size: 16px;
    }

    .nav-tabs li a {
      font-size: 18px;
    }
  }

  /*ipad pro portrait and larger -- this seems to catch ipad lanscape? */
  @media only screen and (min-device-width: 1024px) {
    p {
      font-size: 14px;
    }

    label {
      font-size: 14px;
    }

    .form-control, .form-control[disabled] {
      font-size: 16px;
    }

    .nav-tabs li a {
      font-size: 18px;
    }
  }

  .nav-tabs {
    border: none;
  }

  .nav li a {
    padding: 4px 6px;
    border-radius: 0;
  }

  .nav-tabs li.active a {
    background-color: #1B262D;
    border: 0;
    color: #FBFCFE;
  }

  .btn-default {
    color: #FBFCFE;
    background-color: #303E46;
    border-color: #303E46;
  }

  .btn-primary {
    color: #FBFCFE;
    background: -webkit-linear-gradient(top, #FF2A68 13%, #8c0000 82%);
    background: linear-gradient(to bottom, #FF2A68 13%, #8c0000 82%);
  }
</style>

<script>
  import $ from 'jquery';
  import bootstrap from "bootstrap";
  import settings from '../settings';
  import BetsList from './BetsList.vue';
  import RegisterDialog from './RegisterDialog.vue';
  import StatsBar from './StatsBar.vue';
  import NavBar from './NavBar.vue';
  import BetControls from './BetControls.vue';
  import {getRandomString, setInputNumeric} from '../helpers';
  import {mapGetters} from 'vuex';

  export default {
    name: 'app',
    data: () => ({
      ActiveBets: []
    }),
    computed: mapGetters({
      HighrollerBets: 'HighrollerBets',
      UserBets: 'UserBets',
      LatestBets: 'LatestBets',
      Currency: 'Currency',
      RegisterDialogVisible: "RegisterDialogVisible",
    }),
    components: {
      BetsList,
      RegisterDialog,
      StatsBar,
      NavBar,
      BetControls
    },
    mounted: function () {
      document.title = settings.AppName;
      if (this.getHashParams().access_token) {
        this.$store.dispatch('login', {
          access_token: this.getHashParams().access_token,
          expires_in: this.getHashParams().expires_in
        });
      }

      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, "/");
      } else {
        window.location.hash = '#';
      }

      this.loadState(getRandomString(20));
      this.ActiveBets = this.HighrollerBets;
      this.setupSignalR();

      $('#betAmount, #chance, #payout').keypress(function (event) {
        setInputNumeric(event, $(this).val());
      });
    },
    methods: {
      getHashParams: function () {
        const hashParams = {};
        var e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&;=]+)=?([^&;]*)/g,
          d = function (s) {
            return decodeURIComponent(s.replace(a, " "));
          },
          q = window.location.hash.substring(1);
        while (e = r.exec(q))
          hashParams[d(e[1])] = d(e[2]);
        return hashParams;
      },
      loadState: function (clientSeed) {
        this.$store.dispatch("loadState", clientSeed);
      },
      setupSignalR: function () {
        this.$store.dispatch("setupNotifications");
      },

      hideRegisterDialog: function () {
        this.$store.dispatch('hideRegisterDialog');
      },
      highRollerButtonClicked: function () {
        $(".mainTab").removeClass("active");
        $(".highRollerButton").addClass("active");
        this.ActiveBets = this.HighrollerBets;
      },
      allBetsButtonClicked: function () {
        $(".mainTab").removeClass("active");
        $(".allBetsButton").addClass("active");
        this.ActiveBets = this.LatestBets;
      },
      myBetsButtonClicked: function () {
        $(".mainTab").removeClass("active");
        $(".myBetsButton").addClass("active");
        this.ActiveBets = this.UserBets;
      }
    }
  };
</script>

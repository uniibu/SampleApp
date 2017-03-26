<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Provably Fair

            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="container">
                <div class="row">
                  <div class="col-xs-12">
                    <table class="table table-condensed text-left provablyFairTable">
                      <tr>
                        <td>Server Seed Hash</td>
                        <td>
                          <input id="ServerSeedHash" v-model="ServerSeedHash"
                                 class="form-control" type="text" autocomplete="off">
                        </td>
                      </tr>
                      <tr>
                        <td>Client Seed</td>
                        <td>
                          <div class="row">
                            <div class="col-xs-9">
                              <input id="ClientSeed" :disabled="EditClientSeedDisabled"
                                     v-model="ClientSeed" class="form-control" type="text"
                                     autocomplete="off">
                            </div>
                            <div class="col-xs-1">
                              <button v-on:click="editClientSeed"
                                      class="btn btn-primary editClientSeedButton"
                                      type="button">{{ EditClientSeedText }}

                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Nonce</td>
                        <td>
                          <input id="Nonce" v-model="Nonce" class="form-control" type="text"
                                 autocomplete="off">
                        </td>
                      </tr>
                      <tr>
                        <td>Previous Server Seed</td>
                        <td>
                          <input id="PreviousSeed" v-model="PreviousSeed" class="form-control"
                                 type="text" autocomplete="off">
                        </td>
                      </tr>
                      <tr>
                        <td>Previous Server Seed Hash</td>
                        <td>
                          <input id="PreviousSeedHash" v-model="PreviousSeedHash"
                                 class="form-control" type="text" autocomplete="off">
                        </td>
                      </tr>
                      <tr>
                        <td>Previous Client Seed</td>
                        <td>
                          <input id="PreviousClientSeed" v-model="PreviousClientSeed"
                                 class="form-control" type="text" autocomplete="off">
                        </td>
                      </tr>
                      <tr>
                        <td>Previous Nonce</td>
                        <td>
                          <input id="PreviousNonce" v-model="PreviousNonce"
                                 class="form-control" type="text" autocomplete="off">
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <button v-on:click="generateNewSeed" class="btn btn-primary" type="button">Generate New

              </button>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-default" @click="$emit('close')">
                OK

              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    background-color: #1B262D;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modla-header {
    padding: 10px;
  }

  .modal-body {
    margin: 0;
    padding: 15px 2px;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .provablyFairTable td {
    padding: 4px;
  }

  /* iphone 6 portrait */
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: portrait) {
    .modal-container {
      width: 90%;
    }
  }

  /* iphone 6 landscape */
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: landscape) {
    .modal-container {
      width: 50%;
    }
  }

  /* iphone 6 plus portrait */
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation: portrait) {
  }

  /* iphone 6 plus landscape */
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation: landscape) {
    .modal-container {
      width: 70%;
    }
  }

  /* ipad portrait */
  @media all and (device-width: 768px) and (device-height: 1024px) and (orientation: portrait) {
    .modal-container {
      width: 50%;
    }
  }

  /*ipad pro portrait -- this seems to catch ipad portrait? */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    .modal-container {
      width: 92%;
    }
  }

  /*ipad pro landscape -- this seems to catch ipad ladscape? */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: landscape) {
    .modal-container {
      width: 92%;
    }
  }

  /*col-sm ? */
  @media (min-width: 768px) {
    .modal-container {
      width: 50%;
    }

    .provablyFairTable {
      width: 50%;
    }
  }

  /*col-md*/
  @media (min-width: 992px) {
    .modal-container {
      width: 66%;
    }

    .provablyFairTable {
      width: 66%;
    }
  }

  .editClientSeedButton {
    margin-left: -20px;
  }
</style>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'ProvablyFairModal',
    data: function () {
      return {
        EditClientSeedDisabled: true,
        EditClientSeedText: 'Edit'
      }
    },
    computed: mapGetters({
      ServerSeedHash: 'ServerSeedHash',
      ClientSeed: 'ClientSeed',
      Nonce: 'Nonce',
      PreviousSeed: 'PreviousSeed',
      PreviousSeedHash: 'PreviousSeedHash',
      PreviousClientSeed: 'PreviousClientSeed',
      PreviousNonce: 'PreviousNonce'
    }),
    methods: {
      editClientSeed: function () {
        this.EditClientSeedDisabled = !this.EditClientSeedDisabled
        if (this.EditClientSeedDisabled === true) {
          this.EditClientSeedText = 'Edit'
          this.$store.dispatch('saveClientSeed', this.ClientSeed)
        } else {
          this.EditClientSeedText = 'Save'
        }
      },
      generateNewSeed: function () {
        this.$store.dispatch('generateNewServerSeed', this.ClientSeed)
      }
    }
  }
</script>

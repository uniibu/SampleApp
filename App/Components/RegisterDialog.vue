<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Register
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="container">
                <div class="row">
                  <div class="col-xs-12">
                    <p>{{ AppName }} is a BetKing.io app.</p>
                    <p>To play at {{ AppName }} you will need to register an account at https://betking.io</p>
                    <p>Click the register to be take to https://betking.io where you can create a new account.</p>
                    <p>You will be redirected back to {{ AppName }} after you create an account.</p>
                  </div>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <a v-bind:href="RegisterUrl" class="btn btn-default">Register</a>
              <button class="btn btn-default" @click="$emit('close')">
                Cancel
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
</style>

<script>
  import {mapGetters} from 'vuex';
  import Settings from "./../settings";

  export default {
    name: 'RegisterDialog',
    data: function () {
      return {
        RegisterUrl: Settings.BetKingUrlBase + Settings.RegisterUrl + '?appId=' + Settings.AppId
      };
    },
    computed: mapGetters({
      AppName: 'AppName'
    }),
  };
</script>

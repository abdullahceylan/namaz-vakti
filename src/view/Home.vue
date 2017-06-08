<template lang="pug">
  .Home
    .Info
      router-link.Info-link(:to="{ name: 'Settings' }") {{ townName }}
      .moon
        img(:src="moonPhase")
    .Times(:class="currentPeriod")
      rowRamadan(v-if="showRamadan")
      Period(v-for="(time, name) in periods", :name="name", :time="time", :key="name")
</template>

<script>
  import Period from '@/components/Home-period.vue'
  import rowRamadan from '@/components/Home-row-ramadan.vue'
  import _ from 'lodash'
  import Router from '@/router'

  export default {
    name: 'Home',
    components: {
      Period,
      rowRamadan
    },
    computed: {
      moonPhase () {
        return this.$store.state.moonPhase
      },
      periods () {
        return this.$store.state.periods
      },
      currentPeriod () {
        return this.$store.state.currentPeriod
      },
      ramadanStatus () {
        return this.$store.state.ramadan.status
      },
      showRamadan () {
        return this.ramadanStatus && !_.includes(['Ikindi', 'Aksam', 'Yatsi'], this.currentPeriod)
      },
      townName () {
        return localStorage.getItem('townName')
      }
    },
    watch: {
      periods () {
        this.$store.dispatch('START_COUNTER')
      }
    },
    created () {
      if (!localStorage.getItem('townId')) {
        Router.push({ name: 'Settings' })
      }
      this.$store.dispatch('INIT_APP')
    }
  }
</script>

<style lang="scss">
  .Home {
    position: relative;
    height: 100%;
  }

  $Info-height: 34px;

  .Info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $Info-height;
    color: white;
    background-color: #000;

    &-link {
      font-size: .9em;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 1px;
    }

    .moon {
      position: absolute;
      right: 7px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 23px;
      width: 1em;
      height: 1em;

      img {
        max-width: 100%;
      }
    }

  }

  .Times {
    position: absolute;
    left: 0;
    right: 0;
    top: $Info-height;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }
</style>

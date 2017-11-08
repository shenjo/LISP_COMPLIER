<template>
    <div id="app">
        <label>
            <input type="text" placeholder="input your statement" v-model="message"/>
            <button @click="translate">translate</button>
        </label>
        <div>the answer is :{{result}}</div>
        <div :if="errorMessage">{{errorMessage}}</div>
    </div>
</template>

<script>
  import myEval from './main';
  export default {
    name: 'app',
    data() {
      return {
        message: '(+ 2 3)',
        result: '',
        errorMessage: ''
      }
    },
    methods: {
      translate: function() {
        this.result = '';
        this.errorMessage = '';
        try {
          this.result = myEval(this.message);
        } catch (err) {
          this.errorMessage = err.message;
        }
      }
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        top: 0;
        left: 0;
    }
</style>
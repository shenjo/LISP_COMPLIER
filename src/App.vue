<template>
    <div id="app" class="full_height">

        <el-container class="full_height">
            <el-header>Lisp compiler</el-header>
            <el-container class="full_height">
                <el-aside width="200px">
                    <el-input v-model="message" placeholder="input your statement"></el-input>
                </el-aside>
                <el-container>
                    <el-main>
                        <el-button type="primary" @click="translate">translate</el-button>
                    </el-main>
                    <el-footer>
                        <div>the answer is :{{result}}</div>
                        <div :if="errorMessage">{{errorMessage}}</div>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
  import myEval from './main';
  export default {
    name: 'app',
    data() {
      return {
        message: '(define a (+ 2 3))(+ a 3)',
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
     .el-header {
         background-color: #B3C0D1;
         color: #333;
         line-height: 60px;
     }

    .el-aside {
        color: #333;
    }
</style>
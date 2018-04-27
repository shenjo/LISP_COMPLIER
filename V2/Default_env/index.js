class Env {
  constructor() {
    this.$scope = {
      father: null
    }
  }

  find(key) {
    if(this.$scope[key]){
      return this.$scope[key];
    }else if(this.$scope.father){
      return this.$scope.father.find(key);
    }else{
      return null;
    }
  }

  register(key, val) {
    this.$scope[key] = val;
  }

  setSuperEnv(env) {
    this.$scope.father = env;
  }

}

module.exports = {
  Env
}
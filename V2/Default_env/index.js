class Env {
  constructor(env) {
    this.$scope = {
      father: env || null
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

}

module.exports = {
  Env
};
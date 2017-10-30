/**
 * Created by SHENJO on 10/30/2017.
 */


class ENV {
  constructor () {
    this.scopes = {
      father: null
    }
  };

  find (oper) {
    return this.scopes[oper] ? this.scopes[oper] : this.scopes.father ? this.scopes.father.find(oper) : null;
  }

  setSuperEnv (env) {
    this.scopes.father = env;
  }

  register (bind, meaning) {
    this.scopes[bind] = meaning;
  }

}


export default ENV;
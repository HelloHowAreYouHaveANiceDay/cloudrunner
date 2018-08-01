export default class Job {
  constructor(params) {
    this.command = params.command || '';
    this.args = params.args || [];
    this.options = params.options || {};
  }

  function run(){

  }
}

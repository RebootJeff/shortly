Shortly.Stats = Backbone.Collection.extend({

  model: Shortly.Stat,

  initialize: function(options){
    this.code = options.code;
  },

  url: function(){
    return '/' + this.code + '/stats';
  }

});
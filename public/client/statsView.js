Shortly.StatsView = Backbone.View.extend({

  className: 'statsTable',

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();
    return this;
  },

  addAll: function(){
    var timeHash = {};
    //iterate through collection, add times and increment
    //use moment to display data in table form
    this.collection.forEach(function(click){
      //do stuff
      // inner loop to iterate through timeHash
      //check if diff is < 5
      // var a = moment([2007, 0, 29]);
      // var b = moment([2007, 0, 28]);
      // a.diff(b) // 86400000
      moment(click.created_at).subtract('minutes', 5);
    }, this);

    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
  }

});
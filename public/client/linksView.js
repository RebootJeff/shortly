Shortly.LinksView = Backbone.View.extend({

  className: 'links',

  initialize: function(options){
    this.filter = options.filter;
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();
    return this;
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new Shortly.LinkView( {model: item} );
    if (item.attributes.title.indexOf(this.filter) !== -1 || this.filter === undefined){
      this.$el.append(view.render().el);
    }
  }

});
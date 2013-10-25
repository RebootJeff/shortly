Shortly.Router = Backbone.Router.extend({

  routes: {
    "":             "index",
    "create":       "create"
  },

  initialize: function(options){
    this.$el = options.el;
  },

  swapView: function(view){
    this.$el.html( view.render().el );
  },

  index: function(sortBy, filter){
    console.log('sortBy',sortBy,'filter',filter);
    this.links = new Shortly.Links();
    this.linksView = new Shortly.LinksView( {collection: this.links} );
    this.swapView(this.linksView);
  },

  create: function(){
    this.$el.find('.sortBy').html('');
    this.$el.find('.search').html('');
    this.linkCreateView = new Shortly.LinkCreateView();
    this.swapView(this.linkCreateView);
  }

});
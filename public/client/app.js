window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="" class="index">All Links</a></li> \
        <li><a href="" class="create">Shorten</a></li> \
      </ul> \
      </div> \
      <form class="search"> \
      </form> \
      <div class="sortBy"></div> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.index":  "renderIndexView",
    "click li a.create": "renderCreateView",
    "click .searchButton": "filterLinks",
    "click .sortOption": "renderIndexView"
    // "click .stats": "renderStatsView"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.appRouter = new Shortly.Router({ el: this.$el.find('#container') });
    this.appRouter.on('route', this.updateNav, this);
    Backbone.history.start({pushstate: true});
    this.$el.find('.sortBy').html('<p>Sort By:</p><a href="#" class="sortOption" data-sort="clickTime">Most Recent Click</a> <a href="#" class="sortOption" data-sort="visitCount">Visit Count</a>');
    this.$el.find('.search').html('<input type="text"/><button class="searchButton">Search</button>');
    this.linksView = renderIndexView();
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

   sortLinks: function(){
    this.linksView.addAll();
   },

  filterLinks: function(e){
    e.preventDefault();
    var query = this.$el.find('input').val();
    this.renderIndexView(e, query);
  },

  renderIndexView: function(e, filter){
    var sortType = '';
    if(e){
      e.preventDefault();
      sortType = $(e.target).data('sort');
    }
    this.appRouter.navigate("", {trigger: true});
    this.$el.find('.sortBy').html('<p>Sort By:</p><a href="#" class="sortOption" data-sort="clickTime">Most Recent Click</a> <a href="#" class="sortOption" data-sort="visitCount">Visit Count</a>');
    this.$el.find('.search').html('<input type="text"/><button class="searchButton">Search</button>');
    return this;
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    this.$el.find('.sortBy').html('');
    this.$el.find('.search').html('');
    this.appRouter.navigate("create", {trigger: true});
  },

  // renderStatsView: function(e){
  //   e.preventDefault();
  //   var code = $(e.target).data('code');

  //   var stats = new Shortly.Stats( {code: code});
  //   var statsView = new Shortly.StatsView( {code: code, collection: stats} );
  //   this.$el.find('#container').html( statsView.render().el );
  // },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  }

});
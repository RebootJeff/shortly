window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
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
    "click .sortOption": "renderIndexView",
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.renderIndexView(); // default view
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
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
    this.$el.find('.sortBy').html('<p>Sort By:</p><a href="#" class="sortOption" data-sort="clickTime">Most Recent Click</a> <a href="#" class="sortOption" data-sort="visitCount">Visit Count</a>');
    this.$el.find('.search').html('<input type="text"/><button class="searchButton">Search</button>');
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView( {filter: filter, sortType: sortType, collection: links} );
    this.$el.find('#container').html( linksView.render().el );
    this.updateNav('index');
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    this.$el.find('.sortBy').html('');
    this.$el.find('.search').html('');
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.find('#container').html( linkCreateView.render().el );
    this.updateNav('create');
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  }

});
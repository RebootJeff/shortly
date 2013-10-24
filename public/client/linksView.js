Shortly.LinksView = Backbone.View.extend({

  className: 'links',

  initialize: function(options){
    this.filter = options.filter;
    this.sortType = options.sortType;
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();
    return this;
  },

  addAll: function(){
    this.collection.comparator = function(a,b){
      return a - b;
    };

    if(this.sortType === 'clickTime'){
      this.collection.comparator = function(a,b){
        return Date.parse(b.attributes.latestClickTime) - Date.parse(a.attributes.latestClickTime);
      };
    } else if (this.sortType === 'visitCount'){
      this.collection.comparator = function(a,b){
        return b.attributes.visits - a.attributes.vists;
      };
    }
    this.collection.sort();

    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new Shortly.LinkView( {model: item} );
    if (item.attributes.title.indexOf(this.filter) !== -1 || this.filter === undefined){
      this.$el.append(view.render().el);
    }
  }

});
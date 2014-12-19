App.controller('celebrity', function (page) {
  function callback(str){
    $(page).find('.app-content').append(str);
  }

  function openDialog(el){
    var stars = [
  { id: 'star1', optionClass: 'star', checkClass: 'checked' },
{ id: 'star2', optionClass: 'star', checkClass: 'checked' },
{ id: 'star3', optionClass: 'star', checkClass: 'checked' },
{ id: 'star4', optionClass: 'star', checkClass: 'checked' },
{ id: 'star5', optionClass: 'star', checkClass: 'checked' }
];
var radio = new Radio({ items: stars, id: 'stars'}, function () {
  if (radio.HTML.parentNode) {
    radio.HTML.parentNode.classList.remove('submit-lock');
  }
});
opts = {
  title        : el.find('h3').text(),
  rawHTML      : radio.HTML,
  theme        : 'submit-lock',
  cancelButton : 'Cancel',
  okButton     : 'Rate'
}


App.dialog(opts, function(choice) {
  if(choice && radio.selected) {
    rating = radio.selected.id.slice(-1);
    zerver.put('API/hashtag', {groupName: opts['title'], rating : parseInt(rating)}, function(str){
      App.load('new');
      App.removeFromStack(-1);
    });
  }
});

}

$(page).on('appReady', function(){
  category = ($(page).data('page'));
  zerver.get('API/hashtag', {category: category} , function(hashtags){
    super_el = $('<div class="groupcontainer"></div>');
    var i =0;
    for(i = 0; i< hashtags.length; i++){
      el = $('<div class="populate_group"><div class="info"></div></div>');
      el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
      el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
      el.find('.info').append('<div class="stars"></div>');
      el.find('.info').append('<div class="rater">Rate the group <i class="fa fa-thumbs-up"></i></div>')

      el.on('click', function(){
        openDialog($(this));
      });
      super_el.append(el);
    }
    callback(super_el);
  });
});

});

App.controller('entertainment', function (page) {
  function callback(str){
    $(page).find('.app-content').append(str);
  }

  function openDialog(el){
    var stars = [
  { id: 'star1', optionClass: 'star', checkClass: 'checked' },
{ id: 'star2', optionClass: 'star', checkClass: 'checked' },
{ id: 'star3', optionClass: 'star', checkClass: 'checked' },
{ id: 'star4', optionClass: 'star', checkClass: 'checked' },
{ id: 'star5', optionClass: 'star', checkClass: 'checked' }
];
var radio = new Radio({ items: stars, id: 'stars'}, function () {
  if (radio.HTML.parentNode) {
    radio.HTML.parentNode.classList.remove('submit-lock');
  }
});
opts = {
  title        : el.find('h3').text(),
  rawHTML      : radio.HTML,
  theme        : 'submit-lock',
  cancelButton : 'Cancel',
  okButton     : 'Rate'
}


App.dialog(opts, function(choice) {
  if(choice && radio.selected) {
    rating = radio.selected.id.slice(-1);
    zerver.put('API/hashtag', {groupName: opts['title'], rating : parseInt(rating)}, function(str){
      App.load('new');
      App.removeFromStack(-1);
    });
  }
});

}

$(page).on('appReady', function(){
  category = ($(page).data('page'));
  zerver.get('API/hashtag', {category: category} , function(hashtags){
    super_el = $('<div class="groupcontainer"></div>');
    var i =0;
    for(i = 0; i< hashtags.length; i++){
      el = $('<div class="populate_group"><div class="info"></div></div>');
      el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
      el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
      el.find('.info').append('<div class="stars"></div>');
      el.find('.info').append('<div class="rater">Rate the group <i class="fa fa-thumbs-up"></i></div>')

      el.on('click', function(){
        openDialog($(this));
      });
      super_el.append(el);
    }
    callback(super_el);
  });
});

});

App.controller('funny', function (page) {
  function callback(str){
    $(page).find('.app-content').append(str);
  }

  function openDialog(el){
    var stars = [
  { id: 'star1', optionClass: 'star', checkClass: 'checked' },
{ id: 'star2', optionClass: 'star', checkClass: 'checked' },
{ id: 'star3', optionClass: 'star', checkClass: 'checked' },
{ id: 'star4', optionClass: 'star', checkClass: 'checked' },
{ id: 'star5', optionClass: 'star', checkClass: 'checked' }
];
var radio = new Radio({ items: stars, id: 'stars'}, function () {
  if (radio.HTML.parentNode) {
    radio.HTML.parentNode.classList.remove('submit-lock');
  }
});
opts = {
  title        : el.find('h3').text(),
  rawHTML      : radio.HTML,
  theme        : 'submit-lock',
  cancelButton : 'Cancel',
  okButton     : 'Rate'
}


App.dialog(opts, function(choice) {
  if(choice && radio.selected) {
    rating = radio.selected.id.slice(-1);
    zerver.put('API/hashtag', {groupName: opts['title'], rating : parseInt(rating)}, function(str){
      App.load('new');
      App.removeFromStack(-1);
    });
  }
});

}

$(page).on('appReady', function(){
  category = ($(page).data('page'));
  zerver.get('API/hashtag', {category: category} , function(hashtags){
    super_el = $('<div class="groupcontainer"></div>');
    var i =0;
    for(i = 0; i< hashtags.length; i++){
      el = $('<div class="populate_group"><div class="info"></div></div>');
      el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
      el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
      el.find('.info').append('<div class="stars"></div>');
      el.find('.info').append('<div class="rater">Rate the group <i class="fa fa-thumbs-up"></i></div>')

      el.on('click', function(){
        openDialog($(this));
      });
      super_el.append(el);
    }
    callback(super_el);
  });
});

});

App.controller('movies', function (page) {
  function callback(str){
    $(page).find('.app-content').append(str);
  }

  function openDialog(el){
    var stars = [
  { id: 'star1', optionClass: 'star', checkClass: 'checked' },
{ id: 'star2', optionClass: 'star', checkClass: 'checked' },
{ id: 'star3', optionClass: 'star', checkClass: 'checked' },
{ id: 'star4', optionClass: 'star', checkClass: 'checked' },
{ id: 'star5', optionClass: 'star', checkClass: 'checked' }
];
var radio = new Radio({ items: stars, id: 'stars'}, function () {
  if (radio.HTML.parentNode) {
    radio.HTML.parentNode.classList.remove('submit-lock');
  }
});
opts = {
  title        : el.find('h3').text(),
  rawHTML      : radio.HTML,
  theme        : 'submit-lock',
  cancelButton : 'Cancel',
  okButton     : 'Rate'
}


App.dialog(opts, function(choice) {
  if(choice && radio.selected) {
    rating = radio.selected.id.slice(-1);
    zerver.put('API/hashtag', {groupName: opts['title'], rating : parseInt(rating)}, function(str){
      App.load('new');
      App.removeFromStack(-1);
    });
  }
});

}

$(page).on('appReady', function(){
  category = ($(page).data('page'));
  zerver.get('API/hashtag', {category: category} , function(hashtags){
    super_el = $('<div class="groupcontainer"></div>');
    var i =0;
    for(i = 0; i< hashtags.length; i++){
      el = $('<div class="populate_group"><div class="info"></div></div>');
      el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
      el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
      el.find('.info').append('<div class="stars"></div>');
      el.find('.info').append('<div class="rater">Rate the group <i class="fa fa-thumbs-up"></i></div>')

      el.on('click', function(){
        openDialog($(this));
      });
      super_el.append(el);
    }
    callback(super_el);
  });
});

});

App.controller('music', function (page) {
  function callback(str){
    $(page).find('.app-content').append(str);
  }

  function openDialog(el){
    var stars = [
  { id: 'star1', optionClass: 'star', checkClass: 'checked' },
{ id: 'star2', optionClass: 'star', checkClass: 'checked' },
{ id: 'star3', optionClass: 'star', checkClass: 'checked' },
{ id: 'star4', optionClass: 'star', checkClass: 'checked' },
{ id: 'star5', optionClass: 'star', checkClass: 'checked' }
];
var radio = new Radio({ items: stars, id: 'stars'}, function () {
  if (radio.HTML.parentNode) {
    radio.HTML.parentNode.classList.remove('submit-lock');
  }
});
opts = {
  title        : el.find('h3').text(),
  rawHTML      : radio.HTML,
  theme        : 'submit-lock',
  cancelButton : 'Cancel',
  okButton     : 'Rate'
}


App.dialog(opts, function(choice) {
  if(choice && radio.selected) {
    rating = radio.selected.id.slice(-1);
    zerver.put('API/hashtag', {groupName: opts['title'], rating : parseInt(rating)}, function(str){
      App.load('new');
      App.removeFromStack(-1);
    });
  }
});

}

$(page).on('appReady', function(){
  category = ($(page).data('page'));
  zerver.get('API/hashtag', {category: category} , function(hashtags){
    super_el = $('<div class="groupcontainer"></div>');
    var i =0;
    for(i = 0; i< hashtags.length; i++){
      el = $('<div class="populate_group"><div class="info"></div></div>');
      el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
      el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
      el.find('.info').append('<div class="stars"></div>');
      el.find('.info').append('<div class="rater">Rate the group <i class="fa fa-thumbs-up"></i></div>')

      el.on('click', function(){
        openDialog($(this));
      });
      super_el.append(el);
    }
    callback(super_el);
  });
});

});

App.controller('social', function (page) {
  function callback(str){
    $(page).find('.app-content').append(str);
  }

  function openDialog(el){
    var stars = [
  { id: 'star1', optionClass: 'star', checkClass: 'checked' },
{ id: 'star2', optionClass: 'star', checkClass: 'checked' },
{ id: 'star3', optionClass: 'star', checkClass: 'checked' },
{ id: 'star4', optionClass: 'star', checkClass: 'checked' },
{ id: 'star5', optionClass: 'star', checkClass: 'checked' }
];
var radio = new Radio({ items: stars, id: 'stars'}, function () {
  if (radio.HTML.parentNode) {
    radio.HTML.parentNode.classList.remove('submit-lock');
  }
});
opts = {
  title        : el.find('h3').text(),
  rawHTML      : radio.HTML,
  theme        : 'submit-lock',
  cancelButton : 'Cancel',
  okButton     : 'Rate'
}


App.dialog(opts, function(choice) {
  if(choice && radio.selected) {
    rating = radio.selected.id.slice(-1);
    zerver.put('API/hashtag', {groupName: opts['title'], rating : parseInt(rating)}, function(str){
      App.load('new');
      App.removeFromStack(-1);
    });
  }
});

}

$(page).on('appReady', function(){
  category = ($(page).data('page'));
  zerver.get('API/hashtag', {category: category} , function(hashtags){
    super_el = $('<div class="groupcontainer"></div>');
    var i =0;
    for(i = 0; i< hashtags.length; i++){
      el = $('<div class="populate_group"><div class="info"></div></div>');
      el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
      el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
      el.find('.info').append('<div class="stars"></div>');
      el.find('.info').append('<div class="rater">Rate the group <i class="fa fa-thumbs-up"></i></div>')

      el.on('click', function(){
        openDialog($(this));
      });
      super_el.append(el);
    }
    callback(super_el);
  });
});

});

App.controller('sports', function (page) {
  function callback(str){
    $(page).find('.app-content').append(str);
  }

  function openDialog(el){
    var stars = [
  { id: 'star1', optionClass: 'star', checkClass: 'checked' },
{ id: 'star2', optionClass: 'star', checkClass: 'checked' },
{ id: 'star3', optionClass: 'star', checkClass: 'checked' },
{ id: 'star4', optionClass: 'star', checkClass: 'checked' },
{ id: 'star5', optionClass: 'star', checkClass: 'checked' }
];
var radio = new Radio({ items: stars, id: 'stars'}, function () {
  if (radio.HTML.parentNode) {
    radio.HTML.parentNode.classList.remove('submit-lock');
  }
});
opts = {
  title        : el.find('h3').text(),
  rawHTML      : radio.HTML,
  theme        : 'submit-lock',
  cancelButton : 'Cancel',
  okButton     : 'Rate'
}


App.dialog(opts, function(choice) {
  if(choice && radio.selected) {
    rating = radio.selected.id.slice(-1);
    zerver.put('API/hashtag', {groupName: opts['title'], rating : parseInt(rating)}, function(str){
      App.load('new');
      App.removeFromStack(-1);
    });
  }
});

}

$(page).on('appReady', function(){
  category = ($(page).data('page'));
  zerver.get('API/hashtag', {category: category} , function(hashtags){
    super_el = $('<div class="groupcontainer"></div>');
    var i =0;
    for(i = 0; i< hashtags.length; i++){
      el = $('<div class="populate_group"><div class="info"></div></div>');
      el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
      el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
      el.find('.info').append('<div class="stars"></div>');
      el.find('.info').append('<div class="rater">Rate the group <i class="fa fa-thumbs-up"></i></div>')

      el.on('click', function(){
        openDialog($(this));
      });
      super_el.append(el);
    }
    callback(super_el);
  });
});

});

App.controller('television', function (page) {
  function callback(str){
    $(page).find('.app-content').append(str);
  }

  function openDialog(el){
    var stars = [
  { id: 'star1', optionClass: 'star', checkClass: 'checked' },
{ id: 'star2', optionClass: 'star', checkClass: 'checked' },
{ id: 'star3', optionClass: 'star', checkClass: 'checked' },
{ id: 'star4', optionClass: 'star', checkClass: 'checked' },
{ id: 'star5', optionClass: 'star', checkClass: 'checked' }
];
var radio = new Radio({ items: stars, id: 'stars'}, function () {
  if (radio.HTML.parentNode) {
    radio.HTML.parentNode.classList.remove('submit-lock');
  }
});
opts = {
  title        : el.find('h3').text(),
  rawHTML      : radio.HTML,
  theme        : 'submit-lock',
  cancelButton : 'Cancel',
  okButton     : 'Rate'
}


App.dialog(opts, function(choice) {
  if(choice && radio.selected) {
    rating = radio.selected.id.slice(-1);
    zerver.put('API/hashtag', {groupName: opts['title'], rating : parseInt(rating)}, function(str){
      App.load('new');
      App.removeFromStack(-1);
    });
  }
});

}

$(page).on('appReady', function(){
  category = ($(page).data('page'));
  zerver.get('API/hashtag', {category: category} , function(hashtags){
    super_el = $('<div class="groupcontainer"></div>');
    var i =0;
    for(i = 0; i< hashtags.length; i++){
      el = $('<div class="populate_group"><div class="info"></div></div>');
      el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
      el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
      el.find('.info').append('<div class="stars"></div>');
      el.find('.info').append('<div class="rater">Rate the group <i class="fa fa-thumbs-up"></i></div>')

      el.on('click', function(){
        openDialog($(this));
      });
      super_el.append(el);
    }
    callback(super_el);
  });
});

});

App.controller('other', function (page) {
  function callback(str){
    $(page).find('.app-content').append(str);
  }

  function openDialog(el){
    var stars = [
  { id: 'star1', optionClass: 'star', checkClass: 'checked' },
{ id: 'star2', optionClass: 'star', checkClass: 'checked' },
{ id: 'star3', optionClass: 'star', checkClass: 'checked' },
{ id: 'star4', optionClass: 'star', checkClass: 'checked' },
{ id: 'star5', optionClass: 'star', checkClass: 'checked' }
];
var radio = new Radio({ items: stars, id: 'stars'}, function () {
  if (radio.HTML.parentNode) {
    radio.HTML.parentNode.classList.remove('submit-lock');
  }
});
opts = {
  title        : el.find('h3').text(),
  rawHTML      : radio.HTML,
  theme        : 'submit-lock',
  cancelButton : 'Cancel',
  okButton     : 'Rate'
}


App.dialog(opts, function(choice) {
  if(choice && radio.selected) {
    rating = radio.selected.id.slice(-1);
    zerver.put('API/hashtag', {groupName: opts['title'], rating : parseInt(rating)}, function(str){
      App.load('new');
      App.removeFromStack(-1);
    });
  }
});

}

$(page).on('appReady', function(){
  category = ($(page).data('page'));
  zerver.get('API/hashtag', {category: category} , function(hashtags){
    super_el = $('<div class="groupcontainer"></div>');
    var i =0;
    for(i = 0; i< hashtags.length; i++){
      el = $('<div class="populate_group"><div class="info"></div></div>');
      el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
      el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
      el.find('.info').append('<div class="stars"></div>');
      el.find('.info').append('<div class="rater">Rate the group <i class="fa fa-thumbs-up"></i></div>')

      el.on('click', function(){
        openDialog($(this));
      });
      super_el.append(el);
    }
    callback(super_el);
  });
});

});

App.controller('profile', function (page) {
  function callback(str){
    $(page).find('.app-content').append(str);
  }
  kikUser = '';
  if (kik.getUser) {
    kik.getUser(function (user) {
      if (user) {
        kikUser = user.username;
      }
    }, true);
  }

  function openDialog(el){
    opts = {
      hashtag: $(el).find('h3').text(),
      deleteButton : 'Delete',
      viewButton   : 'View'
    };

    App.dialog(opts, function(choice, cancelButton){
      if(choice == 'delete'){
        zerver.del('API/hashtag', {groupName: opts.hashtag}, function(str){
          App.load('profile', function(event){
            App.removeFromStack(-1);
          });
        });
      }
    });
  }


  $(page).on('appReady', function(){
    zerver.get('API/user', {user: kikUser} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
        super_el.append(el);
        el.on('click', function(){
          openDialog($(this));
        });
      }
      callback(super_el);
    });

  });
});

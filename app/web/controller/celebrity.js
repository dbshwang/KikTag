App.controller('celebrity', function (page) {

  function callback(str){
    $(page).find('.app-content').append(str);

  }
  $(page).on('appReady', function(){
    category = ($(page).data('page'));
    zerver.get('API/view', {category: category} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
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
  $(page).on('appReady', function(){
    category = ($(page).data('page'));
    zerver.get('API/view', {category: category} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
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
  $(page).on('appReady', function(){
    category = ($(page).data('page'));
    zerver.get('API/view', {category: category} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
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
  $(page).on('appReady', function(){
    category = ($(page).data('page'));
    zerver.get('API/view', {category: category} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
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
  $(page).on('appReady', function(){
    category = ($(page).data('page'));
    zerver.get('API/view', {category: category} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
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
  $(page).on('appReady', function(){
    category = ($(page).data('page'));
    zerver.get('API/view', {category: category} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
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
  $(page).on('appReady', function(){
    category = ($(page).data('page'));
    zerver.get('API/view', {category: category} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
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
  $(page).on('appReady', function(){
    category = ($(page).data('page'));
    zerver.get('API/view', {category: category} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
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
  $(page).on('appReady', function(){
    category = ($(page).data('page'));
    zerver.get('API/view', {category: category} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
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

  $(page).on('appReady', function(){
    console.log(kikUser);
    zerver.get('API/user', {user: kikUser} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
        super_el.append(el);
      }
      callback(super_el);
    });

  });
});

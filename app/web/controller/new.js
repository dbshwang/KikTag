App.controller('new', function (page) {
    function callback(str){
      $(str).find('.populate_group').each(function(index, element){
        stars   =  $(element).find('.info').find('.stars');
        rating = $(element).attr('rating');
        $(element).attr('rating');
        for(var i=0; i<rating; i++){
          $(stars).append('<i class="fa fa-star"></i>');
        }
      });
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
            rating = Math.round(hashtags[i]['rating']);
            console.log(rating);
            el = $('<div class="populate_group"><div class="info"></div></div>');
            el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
            el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
            el.find('.info').append('<div class="stars"></div>');
            el.find('.info').append('<div class="rater">Rate the group <i class="fa fa-thumbs-up"></i></div>');
            el.attr('rating', rating);
            el.on('click', function(){
              openDialog($(this));
            });
            super_el.append(el);
          }
          callback(super_el);
        });
    });

});

App.controller('search_group', function (page) {
    page.querySelector('.submit').addEventListener('click', function(){
        App.load('kik_group', 'slideon-down');
    });

    zerver.get('API/view', function(response){
      console.log(response);
    });
});
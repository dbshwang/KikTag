App.controller('home', function (page) {
    page.querySelector('.submit').addEventListener('click', function(){
        App.load('submitgroup', 'slideon-down');
    });
});

(function (App) {
	try {
		App.restore();
	} catch (err) {
		App.load('home');
	}
    kik.browser.setOrientationLock('portrait');
    
    //For refreshing card to homepage every start
//    App.load('home');

})(App);

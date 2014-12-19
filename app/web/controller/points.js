/*
	Kik Points Client API
*/

(function () {
	Points.POINTS_API_BASE  = 'https://points-service.appspot.com/v1/';
	Points.OFFER_API_BASE   = 'https://offer-service.appspot.com/v1/';
	Points.TIMEOUT          = 25 * 1000;
	Points.CACHE_KEY        = 'points_transactions';
	Points.MAX_TRANSACTION_DATA_SIZE = 5*1024;
	Points.SLIDE_LEFT_TIME  = 340,
	Points.SCREEN_STAY_TIME = 2500,
	Points.FADE_AWAY_TIME   = 500,
	Points.ICON             = 'https://points.kik.com/img/app-icon.png';

	function Points(kik, localStorage, XMLHttpRequest, document) {
		var points = {
				debug : false,
				open  : openKikPoints
			},
			fetchBatch, queue;

		var data;
		try {
			data = JSON.parse(decodeURIComponent(window.location.hash.substr(1)));
		} catch (err) {}
		if (data && data.kikpoints && validOffer(data.kikpoints.offer)) {
			var debug = !!data.kikpoints.debug;
			points.offer = new Offer(data.kikpoints.offer, debug);
			preloadIcon();
		}
		if (kik && kik.picker) {
			points.redeem = transferPoints;
			if (kik.sign) {
				points.getTransactions = getTransactions;
				points.getTransaction  = getTransaction;
			}
		}
		return points;

		function transferPoints(id, amount, sku, data, callback) {
			if (typeof id !== 'string' || !id) {
				throw TypeError('id must be a string, got '+id);
			}
			if (typeof amount !== 'number' || !(amount > 0)) {
				throw TypeError('points must be a positive number, got '+amount);
			}
			if (typeof sku !== 'string' || !sku) {
				throw TypeError('sku must be a string, got '+sku);
			}
			if (typeof data === 'function') {
				callback = data;
				data = undefined;
			}
			data = data || {};
			if (typeof data !== 'object') {
				throw TypeError('data must be an object if defined, got '+data);
			}
			for (var key in data) {
				if (data[key] !== undefined && data[key] !== null && typeof data[key] !== 'string') {
					throw TypeError('data field must be a string if defined, got '+data[key]);
				}
			}
			var json;
			try {
				json = JSON.stringify(data);
			} catch (err) {
				throw TypeError('data must be JSON serializable if defined, got '+data);
			}
			if (json.length > Points.MAX_TRANSACTION_DATA_SIZE) {
				throw TypeError('data is too large, must be less than '+(Points.MAX_TRANSACTION_DATA_SIZE/1024)+'kb');
			}
			if (typeof callback !== 'function') {
				throw TypeError('callback must be a function, got '+callback);
			}
			kik.picker('https://points.kik.com/', {
				id     : id,
				url    : window.location.href.split('#')[0],
				points : amount,
				sku    : sku,
				data   : data,
				debug  : points.debug
			}, callback);
		}

		function getTransactions(callback) {
			if ( !callback ) {
				return getCachedTransactions();
			}
			if (typeof callback !== 'function') {
				throw TypeError('callback must be a function if defined, got '+callback);
			}
			if (fetchBatch) {
				fetchBatch.push(callback);
				return;
			}
			fetchBatch = [callback];
			kik.sign('/v1/transaction/', function (signedData, username, host) {
				if ( !signedData ) {
					finish();
					return;
				}
				apiCall('GET', 'transaction/', Points.POINTS_API_BASE, {
					jws   : signedData,
					debug : points.debug
				}, function (status, data) {
					if (status !== 200) {
						finish();
						return;
					}
					var oldTransactions = localStorage[Points.CACHE_KEY];
					if (data) {
						localStorage[Points.CACHE_KEY] = JSON.stringify(data);
					}
					finish(data);
				});
			}, true);

			function finish(data) {
				var callbacks = fetchBatch;
				fetchBatch = null;
				callbacks.forEach(function (callback) {
					callback(data);
				});
			}
		}

		function getCachedTransactions() {
			try {
				return JSON.parse(localStorage[Points.CACHE_KEY]);
			} catch (err) {
				return [];
			}
		}

		function getTransaction(id, callback) {
			if (typeof id !== 'string') {
				throw TypeError('transaction id must be a string, got '+id);
			}

			var localTransactions = getCachedTransactions();
			for (var i=0; i<localTransactions.length; i++) {
				if (localTransactions[i].id === id) {
					callback(localTransactions[i]);
					return;
				}
			}

			kik.sign(id, function (signedData, username, host) {
				if ( !signedData ) {
					callback();
					return;
				}
				apiCall('GET', 'transaction/'+id, Points.POINTS_API_BASE, {
					s     : signedData,
					debug : points.debug
				}, function (status, data) {
					if (status !== 200) {
						callback();
						return;
					}
					var cachedTransactions = getCachedTransactions(),
							shouldAdd = true;
					for (var i=0, l=cachedTransactions.length; i<l; i++) {
						if (cachedTransactions[i].id === id) {
							shouldAdd = false;
							break;
						}
					}
					if (shouldAdd) {
						cachedTransactions.push(data);
						localStorage[Points.CACHE_KEY] = JSON.stringify(cachedTransactions);
					}
					callback(data);
				});
			}, true);
		}

		function validOffer(offer) {
			return offer &&
				offer.offerId &&
				offer.points && offer.points > 0 &&
				offer.sku;
		}

		function Offer(offerData, debug) {
				this.data = offerData;
				this.debug = debug;
				this.complete = completeOffer;
				this._queue = null;
		}

		function completeOffer(callback) {
			callback = callback || function(){};

			var self = this;

			if (self._success) {
				callback();
				return;
			}

			if (self._queue) {
				self._queue.push(callback);
				return;
			}
			self._queue = [callback];

			function flush(data) {
				var q = self._queue;
				self._queue = null;
				q.forEach(function (cb) {
					cb(data);
				});
			}

			var url = 'offer/' + self.data.id + '/complete';
			url += '?debug='+(!!self.debug);
			url += '&sku='+self.data.sku;

			if (self.data.minimum_security_level === 'VERIFIED_SERVICE'){
				flush({status: 401, msg: 'a higher level of security required to complete offer'})
				return;
			} else if (self.data.minimum_security_level === 'VERIFIED_USER'){
				if (!kik || !kik.sign) {
					flush({ status: 400, msg: 'kik.sign not available (enable developer mode or https)' });
					return;
				}
				kik.sign(JSON.stringify(self.data.id), function (signedData, username, host) {
					if ( !signedData ) {
						flush({ status: 403, msg: 'signature failed' });
						return;
					}
					finish(signedData);
				}, true);
			} else {
				finish();
			}

			function finish(requestData) {
				apiCall('POST', url, Points.OFFER_API_BASE, requestData,
					function (status, data) {
						if (status === 200) {
							self._success = true;
							queueNotification(self.data.points);
							flush();
						} else {
							flush({ status: status, msg: 'offer-service complete error' });
						}
					}
				);
			}
		}

		function apiCall(method, resource, base, data, callback) {
			if (typeof data === 'function') {
				callback = data;
				data     = null;
			}

			var done = false,
				xhr  = new XMLHttpRequest(),
				url  = base + resource,
				jwsHeader,
				contentType;
			method = method.toUpperCase();
			switch (method) {
				case 'POST':
				case 'PUT':
				case 'PATCH':
					if (data && (typeof data === 'object')) {
						data = JSON.stringify(data);
						contentType = 'application/json';
					} else {
						contentType = 'text/plain';
					}
					break;
				default:
					if (data && (typeof data === 'object')) {
						if (data.jws) {
							jwsHeader = data.jws;
							delete data.jws;
						}
						data = Object.keys(data).map(function (key) {
							return encodeURIComponent(key)+'='+encodeURIComponent(data[key]);
						}).join('&');
					}
					if (data) {
						var index = url.indexOf('?'),
							last = url[url.length-1];
						if (index === -1) {
							url += '?';
						} else if (last !== '?' && last !== '&') {
							url += '&';
						}
						url += data;
						data = null;
					}
					break;
			}

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					xhrComplete(xhr.status);
				}
			};
			xhr.onload = function () {
				xhrComplete(xhr.status);
			};
			xhr.onerror = function () {
				xhrComplete(xhr.status);
			};

			xhr.timeout = Points.TIMEOUT;
			xhr.ontimeout = function () {
				xhrComplete(0);
			};

			if (kik) {
				kik.ready(xhrSend);
			} else {
				xhrSend();
			}

			function xhrSend() {
				setTimeout(function () {
					if ( !done ) {
						xhr.abort();
						xhrComplete(0);
					}
				}, Points.TIMEOUT);

				xhr.open(method, url, true);
				if (contentType) {
					xhr.setRequestHeader('Content-Type', contentType);
				}
				if (jwsHeader) {
					xhr.setRequestHeader('X-Kik-JWS', jwsHeader);
				}
				xhr.send(data);
			}

			function xhrComplete(status) {
				if (done) {
					return;
				}
				done = true;

				var response;
				try {
					response = JSON.parse(xhr.responseText);
				} catch (err) {}

				if (callback) {
					callback(status, response);
				}
			}
		}

		function preloadIcon() {
			if (document) {
				if (kik) {
					kik.ready(preload);
				} else {
					preload();
				}
			}
			function preload() {
				new Image().src = Points.ICON;
			}
		}

		function queueNotification(points) {
			if ( !document ) {
				return;
			}
			if (queue) {
				queue.push(points);
			} else {
				queue = [points];
				showNextNotification();
			}
		}

		function showNextNotification() {
			var points = queue.shift();
			if ( !points ) {
				queue = null;
				return;
			}

			var $notification = createNotification(points);
			$notification.style['opacity'] = '1';
			$notification.style['-webkit-transform'] = 'translateX(110%)';
			$notification.style['transform'] = 'translateX(110%)';
			$notification.style['-webkit-transition'] = '-webkit-transform '+Points.SLIDE_LEFT_TIME+'ms linear';
			$notification.style['transition'] = 'transform '+Points.SLIDE_LEFT_TIME+'ms linear';
			setTimeout(function () {
				document.documentElement.appendChild($notification);
				setTimeout(function () {
					$notification.style['-webkit-transform'] = 'translateX(0)';
					$notification.style['transform'] = 'translateX(0)';
					setTimeout(function () {
						setTimeout(function () {
							$notification.style['-webkit-transition'] = 'opacity '+Points.FADE_AWAY_TIME+'ms linear';
							$notification.style['transition'] = 'opacity '+Points.FADE_AWAY_TIME+'ms linear';
							setTimeout(function () {
								$notification.style['opacity'] = '0';
								setTimeout(function () {
									if ($notification.parentNode) {
										$notification.parentNode.removeChild($notification);
									}
									showNextNotification();
								}, Points.FADE_AWAY_TIME+100);
							}, 0);
						}, Points.SCREEN_STAY_TIME);
					}, Points.SLIDE_LEFT_TIME);
				}, 100);
			}, 0);
		}

		function createNotification(points) {
			var $notification = document.createElement('div');
			$notification.id = 'kik-points-notification';
			$notification.textContent = '+'+points+' kp';
			$notification.style.zIndex = '20000';
			$notification.style.position = 'fixed';
			$notification.style.top = '8px'; //TODO: ios status bar
			$notification.style.right = '8px';
			$notification.style.paddingLeft = '48px';
			$notification.style.paddingRight = '12px';
			$notification.style.height = '40px';
			$notification.style.lineHeight = '40px';
			if ( getOS().android ) {
				$notification.style.fontFamily = '"Roboto", sans-serif';
			} else {
				$notification.style.fontFamily = '"Helvetica Neue",Helvetica,Arial,sans-serif';
			}
			$notification.style.fontWeight = '400';
			$notification.style.color = 'rgb(241,184,45)';
			$notification.style.backgroundColor = 'rgb(38,39,46)';
			$notification.style.backgroundImage = 'url('+Points.ICON+')';
			$notification.style.backgroundPosition = '4px center';
			$notification.style.backgroundRepeat = 'no-repeat';
			$notification.style['-webkit-background-size'] = '32px 32px';
			$notification.style['background-size'] = '32px 32px';
			$notification.style['-webkit-border-radius'] = '20px';
			$notification.style['border-radius'] = '20px';
			return $notification;
		}

		function openKikPoints() {
			var url = 'cards://points.kik.com/';
			if (kik && kik.enabled) {
				kik.open(url);
			} else {
				sendViaKik(url, function (success) {
					if ( !success ) {
						sendViaFallback(url);
					}
				});
			}
		}

		function sendViaKik(url, callback) {
			var os = getOS();
			if (os.ios) {
				setTimeout(function () {
					callback( !!(document.webkitHidden || document.hidden) );
				}, 1000);
				window.location.href = url;
			} else if (os.android) {
				if ( isNewChrome() ) {
					sendUsingIntent(url, callback);
				} else {
					sendUsingIframe(url, callback);
				}
			} else {
				callback(false);
			}
		}

		function sendUsingIntent(url, callback) {
			var scheme = url.split('://')[0],
				rest   = url.substr(scheme.length).split('#')[0],
				intent = 'intent'+rest+'#Intent;scheme='+scheme+';package=kik.android;end';
			window.location.href = intent;
			callback(true);
		}

		function sendUsingIframe(url, callback) {
			var iframe = document.createElement('iframe');
			iframe.style.position = 'fixed';
			iframe.style.top = '0';
			iframe.style.left = '0';
			iframe.style.width = '1px';
			iframe.style.height = '1px';
			iframe.style.border = 'none';
			iframe.style.opacity = '0';

			iframe.onload = function () {
				callback(document.webkitHidden || document.hidden);
				cleanup();
			};

			var timeout = setTimeout(function () {
				callback(true);
				cleanup();
			}, 1000);

			iframe.src = url;
			document.documentElement.appendChild(iframe);

			function cleanup() {
				iframe.onload = null;
				clearTimeout(timeout);
				try {
					if (iframe.parentNode) {
						iframe.parentNode.removeChild(iframe);
					}
				} catch (err) {}
			}
		}

		function sendViaFallback(url) {
			url = url.replace('cards://', 'https://');
			if (kik && kik.open) {
				kik.open(url);
			} else {
				window.location.href = url;
			}
		}

		function getOS() {
			var ua = window.navigator.userAgent,
				m;
			if (m = /\bCPU.*OS (\d+(_\d+)?)/i.exec(ua)) {
				return { ios: true, version: parseInt(m[1]) };
			} else if (m = /\bAndroid (\d+(\.\d+)?)/.exec(ua)) {
				return { android: true, version: parseInt(m[1]) };
			} else {
				return {};
			}
		}

		function isNewChrome() {
			var os = getOS();
			if (kik && kik.enabled && os.version >= 4.4) {
				return true;
			}

			var ua = window.navigator.userAgent,
				m  = /\bChrome\/(\d+(\.\d+)?)/i.exec(ua);
			if (m) {
				return parseInt(m[1]) >= 19;
			} else {
				return false;
			}

			return false;
		}
	}



	if (typeof module === 'object') {
		module.exports = Points;
	} else {
		this.points = Points(this.kik, this.localStorage, this.XMLHttpRequest, this.document);
	}

}).call(this);
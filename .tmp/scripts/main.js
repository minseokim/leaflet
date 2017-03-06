
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Custom JS Goes Here

  const fetchPostData = function() {
    const requestUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%20%3D%22http%3A%2F%2Fwww.minseoalexkim.com%2Fwp-json%2Fwp%2Fv2%2Fposts%22&format=json&diagnostics=true&callback=';

    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.open('GET', requestUrl);

      request.onload = function() {
        // if status is 200
        if (request.status === 200) {
          // resolve promise with response
          resolve(request.responseText);
        } else {
          // otherwise reject with status text
          reject(Error(request.statusText));
        }
      };
      // Handling network errors
      request.onerror = function() {
        reject(Error('Network Error!'));
      };

      request.send();
    });
  };

  fetchPostData().then(function(response) {
    // Parse JSON data and then filter for book reviews using categories( Category "36")
    let postData = JSON.parse(response).query.results.json.json;
    let bookReviewData = postData.filter(function(post) {
      return post.categories === '36';
    });
    console.log(bookReviewData);
  }, function(error) {
    console.error('Failed!', error);
  });
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLyogZXNsaW50LWVudiBicm93c2VyICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDaGVjayB0byBtYWtlIHN1cmUgc2VydmljZSB3b3JrZXJzIGFyZSBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgYnJvd3NlcixcbiAgLy8gYW5kIHRoYXQgdGhlIGN1cnJlbnQgcGFnZSBpcyBhY2Nlc3NlZCBmcm9tIGEgc2VjdXJlIG9yaWdpbi4gVXNpbmcgYVxuICAvLyBzZXJ2aWNlIHdvcmtlciBmcm9tIGFuIGluc2VjdXJlIG9yaWdpbiB3aWxsIHRyaWdnZXIgSlMgY29uc29sZSBlcnJvcnMuIFNlZVxuICAvLyBodHRwOi8vd3d3LmNocm9taXVtLm9yZy9Ib21lL2Nocm9taXVtLXNlY3VyaXR5L3ByZWZlci1zZWN1cmUtb3JpZ2lucy1mb3ItcG93ZXJmdWwtbmV3LWZlYXR1cmVzXG4gIHZhciBpc0xvY2FsaG9zdCA9IEJvb2xlYW4od2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbG9jYWxob3N0JyB8fFxuICAgICAgLy8gWzo6MV0gaXMgdGhlIElQdjYgbG9jYWxob3N0IGFkZHJlc3MuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09ICdbOjoxXScgfHxcbiAgICAgIC8vIDEyNy4wLjAuMS84IGlzIGNvbnNpZGVyZWQgbG9jYWxob3N0IGZvciBJUHY0LlxuICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLm1hdGNoKFxuICAgICAgICAvXjEyNyg/OlxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPykpezN9JC9cbiAgICAgIClcbiAgICApO1xuXG4gIGlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yICYmXG4gICAgICAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JyB8fCBpc0xvY2FsaG9zdCkpIHtcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcignc2VydmljZS13b3JrZXIuanMnKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlZ2lzdHJhdGlvbikge1xuICAgICAgLy8gdXBkYXRlZm91bmQgaXMgZmlyZWQgaWYgc2VydmljZS13b3JrZXIuanMgY2hhbmdlcy5cbiAgICAgIHJlZ2lzdHJhdGlvbi5vbnVwZGF0ZWZvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIHVwZGF0ZWZvdW5kIGlzIGFsc28gZmlyZWQgdGhlIHZlcnkgZmlyc3QgdGltZSB0aGUgU1cgaXMgaW5zdGFsbGVkLFxuICAgICAgICAvLyBhbmQgdGhlcmUncyBubyBuZWVkIHRvIHByb21wdCBmb3IgYSByZWxvYWQgYXQgdGhhdCBwb2ludC5cbiAgICAgICAgLy8gU28gY2hlY2sgaGVyZSB0byBzZWUgaWYgdGhlIHBhZ2UgaXMgYWxyZWFkeSBjb250cm9sbGVkLFxuICAgICAgICAvLyBpLmUuIHdoZXRoZXIgdGhlcmUncyBhbiBleGlzdGluZyBzZXJ2aWNlIHdvcmtlci5cbiAgICAgICAgaWYgKG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAvLyBUaGUgdXBkYXRlZm91bmQgZXZlbnQgaW1wbGllcyB0aGF0IHJlZ2lzdHJhdGlvbi5pbnN0YWxsaW5nIGlzIHNldDpcbiAgICAgICAgICAvLyBodHRwczovL3NsaWdodGx5b2ZmLmdpdGh1Yi5pby9TZXJ2aWNlV29ya2VyL3NwZWMvc2VydmljZV93b3JrZXIvaW5kZXguaHRtbCNzZXJ2aWNlLXdvcmtlci1jb250YWluZXItdXBkYXRlZm91bmQtZXZlbnRcbiAgICAgICAgICB2YXIgaW5zdGFsbGluZ1dvcmtlciA9IHJlZ2lzdHJhdGlvbi5pbnN0YWxsaW5nO1xuXG4gICAgICAgICAgaW5zdGFsbGluZ1dvcmtlci5vbnN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGluc3RhbGxpbmdXb3JrZXIuc3RhdGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnaW5zdGFsbGVkJzpcbiAgICAgICAgICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgb2xkIGNvbnRlbnQgd2lsbCBoYXZlIGJlZW4gcHVyZ2VkIGFuZCB0aGVcbiAgICAgICAgICAgICAgICAvLyBmcmVzaCBjb250ZW50IHdpbGwgaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBjYWNoZS5cbiAgICAgICAgICAgICAgICAvLyBJdCdzIHRoZSBwZXJmZWN0IHRpbWUgdG8gZGlzcGxheSBhIFwiTmV3IGNvbnRlbnQgaXNcbiAgICAgICAgICAgICAgICAvLyBhdmFpbGFibGU7IHBsZWFzZSByZWZyZXNoLlwiIG1lc3NhZ2UgaW4gdGhlIHBhZ2UncyBpbnRlcmZhY2UuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAncmVkdW5kYW50JzpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBpbnN0YWxsaW5nICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2VydmljZSB3b3JrZXIgYmVjYW1lIHJlZHVuZGFudC4nKTtcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIElnbm9yZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHNlcnZpY2Ugd29ya2VyIHJlZ2lzdHJhdGlvbjonLCBlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEN1c3RvbSBKUyBHb2VzIEhlcmVcblxuICBjb25zdCBmZXRjaFBvc3REYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcmVxdWVzdFVybCA9ICdodHRwczovL3F1ZXJ5LnlhaG9vYXBpcy5jb20vdjEvcHVibGljL3lxbD9xPXNlbGVjdCUyMColMjBmcm9tJTIwanNvbiUyMHdoZXJlJTIwdXJsJTIwJTNEJTIyaHR0cCUzQSUyRiUyRnd3dy5taW5zZW9hbGV4a2ltLmNvbSUyRndwLWpzb24lMkZ3cCUyRnYyJTJGcG9zdHMlMjImZm9ybWF0PWpzb24mZGlhZ25vc3RpY3M9dHJ1ZSZjYWxsYmFjaz0nO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCByZXF1ZXN0VXJsKTtcblxuICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gaWYgc3RhdHVzIGlzIDIwMFxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgIC8vIHJlc29sdmUgcHJvbWlzZSB3aXRoIHJlc3BvbnNlXG4gICAgICAgICAgcmVzb2x2ZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb3RoZXJ3aXNlIHJlamVjdCB3aXRoIHN0YXR1cyB0ZXh0XG4gICAgICAgICAgcmVqZWN0KEVycm9yKHJlcXVlc3Quc3RhdHVzVGV4dCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgLy8gSGFuZGxpbmcgbmV0d29yayBlcnJvcnNcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QoRXJyb3IoJ05ldHdvcmsgRXJyb3IhJykpO1xuICAgICAgfTtcblxuICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZmV0Y2hQb3N0RGF0YSgpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAvLyBQYXJzZSBKU09OIGRhdGEgYW5kIHRoZW4gZmlsdGVyIGZvciBib29rIHJldmlld3MgdXNpbmcgY2F0ZWdvcmllcyggQ2F0ZWdvcnkgXCIzNlwiKVxuICAgIGxldCBwb3N0RGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UpLnF1ZXJ5LnJlc3VsdHMuanNvbi5qc29uO1xuICAgIGxldCBib29rUmV2aWV3RGF0YSA9IHBvc3REYXRhLmZpbHRlcihmdW5jdGlvbihwb3N0KSB7XG4gICAgICByZXR1cm4gcG9zdC5jYXRlZ29yaWVzID09PSAnMzYnO1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKGJvb2tSZXZpZXdEYXRhKTtcbiAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQhJywgZXJyb3IpO1xuICB9KTtcbn0pKCk7XG4iXSwiZmlsZSI6Im1haW4uanMifQ==

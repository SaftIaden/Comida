/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-64ec4c3a'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/index.1257885f.js",
    "revision": null
  }, {
    "url": "assets/index.2c1085ae.css",
    "revision": null
  }, {
    "url": "assets/index.57ee6086.js",
    "revision": null
  }, {
    "url": "assets/index.595a1bec.js",
    "revision": null
  }, {
    "url": "assets/index.5a403b18.js",
    "revision": null
  }, {
    "url": "assets/index.a37465f7.js",
    "revision": null
  }, {
    "url": "assets/index.afcc2632.js",
    "revision": null
  }, {
    "url": "assets/index.d0c3706a.js",
    "revision": null
  }, {
    "url": "assets/index.da513860.js",
    "revision": null
  }, {
    "url": "assets/index.f1ac76d4.js",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "38bbfbfd2ce886db5ae2ac2eba2d4364"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "images/icons/android-chrome-192x192.png",
    "revision": "3737c3a273f13f6c187b6939f64cca7a"
  }, {
    "url": "images/icons/android-chrome-512x512.png",
    "revision": "36142d97ee4057c65468a1b3d19888de"
  }, {
    "url": "favicon.ico",
    "revision": "5640f38478a99c87e86553aa9db5a453"
  }, {
    "url": "images/icons/apple-touch-icon.png",
    "revision": "3ab5812f5e99a2b9c7e775b88627c686"
  }, {
    "url": "images/icons/browserconfig.xml",
    "revision": "2dccb9e7e4cee84d7cc8a17d6580ca5c"
  }, {
    "url": "images/icons/favicon-16x16.png",
    "revision": "71958e1a3833787005ff3685ec69470d"
  }, {
    "url": "images/icons/favicon-32x32.png",
    "revision": "72d7ae621ce939cfdd5d43f461d7c20f"
  }, {
    "url": "images/icons/favicon.ico",
    "revision": "5640f38478a99c87e86553aa9db5a453"
  }, {
    "url": "images/icons/mstile-144x144.png",
    "revision": "c972c1994d033782cf3276bcf9429c38"
  }, {
    "url": "images/icons/mstile-150x150.png",
    "revision": "cedeadf50a18b4dbfd5b3db62fe16b0e"
  }, {
    "url": "images/icons/mstile-310x150.png",
    "revision": "b0894c7291535be7dcd351fc96742045"
  }, {
    "url": "images/icons/mstile-310x310.png",
    "revision": "0d9c8127e76390d781bf1fd5c65e6337"
  }, {
    "url": "images/icons/mstile-70x70.png",
    "revision": "c2d95fab8fd427777ecfb7d1d7676c87"
  }, {
    "url": "images/icons/safari-pinned-tab.svg",
    "revision": "35f6c22608a9cd46974080772b34191c"
  }, {
    "url": "manifest.webmanifest",
    "revision": "77b6965565cdb0ee6256d0ad86210b91"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute("/meals", new workbox.NetworkFirst({
    "cacheName": "max-meals",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/.*images\/icons\/*.*.png/, new workbox.CacheFirst({
    "cacheName": "max-images",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https?:\/\/localhost:3000\/meals/, new workbox.NetworkFirst({
    "cacheName": "meals-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    })]
  }), 'GET');

}));

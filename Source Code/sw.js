/**
 * Filename: sw.js
 * Author: Amey Thakur
 * GitHub: https://github.com/Amey-Thakur
 * Repository: https://github.com/Amey-Thakur/CLAUDE-SPINNER-WORDS
 * Release Date: March 27 2026
 * License: MIT
 */

const CACHE_NAME = 'claude-spinner-cache-v4';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './assets/favicon.svg',
    './css/base.css',
    './css/layout.css',
    './css/terminal.css',
    './css/simulation.css',
    './css/loader.css',
    './css/state_sim.css',
    './css/navigation.css',
    './js/verbs.js',
    './js/signature.js',
    './js/loader.js',
    './js/engine.js',
    './js/state_sim.js',
    './js/navigation.js',
    './js/app.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && !event.request.url.startsWith('http'))) {
                    return networkResponse;
                }
                return caches.open(CACHE_NAME).then((cache) => {
                    if (event.request.url.startsWith('http')) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });
            });
        })
    );
});

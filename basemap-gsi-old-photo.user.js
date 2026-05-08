// ==UserScript==
// @id             iitc-plugin-basemap-gsioldphoto
// @name           IITC plugin: GSI map tiles Old Aerial Photos
// @category       Map Tiles
// @version        0.0.5
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL      https://github.com/mklyr/gsi-cyber-japan-old/raw/main/basemap-gsi-old-photo.user.js
// @downloadURL    https://github.com/mklyr/gsi-cyber-japan-old/raw/main/basemap-gsi-old-photo.user.js
// @description    IITCに国土地理院の過去の航空写真レイヤーを追加します
// @match          https://intel.ingress.com/*
// @match          https://intel-x.ingress.com/*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
  if(typeof window.plugin !== 'function') window.plugin = function() {};

  plugin_info.buildName = 'gsi-cyber-japan-oldphoto';
  plugin_info.dateTimeVersion = '20260508000000';
  plugin_info.pluginId = 'gsi-cyber-japan-oldphoto';

  var mapTileGsiOldOrt = {};
  window.plugin.mapTileGsiOldOrt = mapTileGsiOldOrt;

  var gsioldOpt = {
    attribution: 'Map Data &copy; <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">国土地理院</a>',
    maxNativeZoom: 17,
    maxZoom: 21,
    zIndex: 0
  };

  mapTileGsiOldOrt.LAYERS = [
    { name: 'GSI OldOrt 1988', url: 'https://cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg', options: Object.assign({}, gsioldOpt) },
    { name: 'GSI OldOrt 1984', url: 'https://cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg', options: Object.assign({}, gsioldOpt) },
    { name: 'GSI OldOrt 1979', url: 'https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg', options: Object.assign({}, gsioldOpt) },
    { name: 'GSI OldOrt 1974', url: 'https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg', options: Object.assign({}, gsioldOpt) },
    { name: 'GSI OldOrt 1961', url: 'https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png', options: Object.assign({}, gsioldOpt) },
    { name: 'GSI OldOrt 1945', url: 'https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png', options: Object.assign({}, gsioldOpt) }
  ];

  function setup() {
    for (var entry of mapTileGsiOldOrt.LAYERS) {
      var layer = new L.TileLayer(entry.url, entry.options);
      window.layerChooser.addBaseLayer(layer, entry.name);
    }
  }

  setup.info = plugin_info;
  if(!window.bootPlugins) window.bootPlugins = [];
  window.bootPlugins.push(setup);
  if(window.iitcLoaded && typeof setup === 'function') setup();
}

var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);

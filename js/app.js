var map = L.map('js-map');
var zoom_level_locate = 17;
var circle_current;
var popup = L.popup();

L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg', {
  attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
}).addTo(map);
map.setView([35.499524, 133.063088], zoom_level_locate);
map.options.maxZoom = zoom_level_locate;

/**
* マップをクリックしたポップアップを表示する
*/
function onMapClick(e) {
  popup.setLatLng(e.latlng)
       .setContent("You clicked the map at " + e.latlng.toString())
       .openOn(map);
}
map.on('click', onMapClick);

/**
* 現在地を表示する
*/
function displayYourLocation() {
  //現在地の円をマップに追加
  function addCircleToMap(e) {
    circle_current = L.circle([e.latitude, e.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10
    }).addTo(map);
  }
  if (circle_current) {
    circle_current.remove();
    map.off('locationfound', addCircleToMap);
  }
  //現在地取得
  map.locate({setView: true, maxZoom: zoom_level_locate});
  //取得成功
  map.on('locationfound', addCircleToMap);
}
document.getElementById('js-current-locate')
        .addEventListener('click', displayYourLocation, false);

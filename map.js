//储存位置信息
var locations = [
    {title: '瘦西湖',
    location: [119.421015, 32.409223]},
    {title: '东关街',
    location: [119.441404, 32.397598]},
    {title: '茱萸湾',
    location: [119.488737, 32.433163]},
    {title: '何园',
    location: [119.44885, 32.385698]},
    {title: '个园',
    location: [119.443762, 32.399009]},
];

//绑定景点名称到列表中
var ViewModel = function() {
    var self = this;
    self.yzName = ko.observableArray(locations);
    self.hideListings = function (evt){
        var titleName = event.target.innerHTML;
        for (var i = 0; i < allMarker.length; i++) {
            allMarker[i].setMap(map);
            if (titleName != allMarker[i].G.title) {
                allMarker[i].setMap(null)
            }
        }
    };
};
ko.applyBindings(ViewModel);

//初始化地图
var map;
var allMarker = [];
function initMap() {
  map = new AMap.Map('map', {
    zoom: 13,
    center: [119.421003,32.393159]
  });

  for (let i = 0; i < locations.length; i++) {
      let title = locations[i].title;
      let position = locations[i].location;
      var marker = new AMap.Marker({
          position: position,
          title: title,
          map: map
      });
      allMarker.push(marker);
  }
};

function match(){
    var inputValue = document.getElementById('inputValue').value;
    for (var i = 0; i < allMarker.length; i++) {
        allMarker[i].setMap(map);
        if (inputValue != allMarker[i].G.title) {
            allMarker[i].setMap(null)
        }
    }
}

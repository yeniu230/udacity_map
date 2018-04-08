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

//数据动态绑定
var ViewModel = function() {
    var self = this;
    self.locationInput = ko.observable('');
    self.yzName = ko.observableArray(locations);
    self.hideListings = function (evt){
        var titleName = event.target.innerHTML;
        for (let i = 0; i < allMarker.length; i++) {
            if (titleName == allMarker[i].getTitle()) {
                map.setZoomAndCenter(14, locations[i].location);
                markerClick.call(allMarker[i]);
            }
        }
    };
    //动态筛选
    self.listFilter = ko.computed(function(){
        return ko.utils.arrayFilter(self.yzName(), function(location) {
            if(location.title.indexOf(self.locationInput()) >= 0){
                location.marker.show();
                return true;
            } else {
                location.marker.hide();
                return false;
            }
        })
    })
};


//初始化地图
var map;
var infoWindow;
var allMarker = [];
function initMap() {
  map = new AMap.Map('map', {
    zoom: 13,
    center: [119.421003,32.393159]
  });

  infoWindow = new AMap.InfoWindow({offset:new AMap.Pixel(0,-20)});

  //创建标记
  for (let i = 0; i < locations.length; i++) {
      let title = locations[i].title;
      let position = locations[i].location;
      var marker = new AMap.Marker({
          position: position,
          title: title,
          map: map
      });
      locations[i].marker = marker;
      allMarker.push(marker);
      marker.on('click', markerClick);
    };
    ko.applyBindings(ViewModel);
};

//获取第三方信息
var wendu;
fetch('https://www.apiopen.top/weatherApi?city=%E6%89%AC%E5%B7%9E').then(
    function(response){
        if(response.status!==200){
            console.log("存在一个问题，状态码为："+response.status);
            return;
        }
        //检查响应文本
        response.json().then(function(data){
            wendu = data.data.ganmao;
        });
    }
).catch(function(err){
    alert("Fetch错误:"+err);
});

function markerClick(){
    //设置点击动画
    this.setAnimation('AMAP_ANIMATION_DROP');
    infoWindow.setContent(this.getTitle() + wendu);
    infoWindow.open(map, this.getPosition());
};

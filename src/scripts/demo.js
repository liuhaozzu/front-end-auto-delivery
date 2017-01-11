;(function () {
    //独立的作用域，不会污染全局变量
})();
;(function (window) {
    //对于当前作用域，如果将window传入，就不依赖全局对象了
    //如果在此区域引用全局变量，就会增加依赖，不建议这么写
    var div=document.getElementById('id');
    //所以最好不要在此区域内使用全局变量
})(window);
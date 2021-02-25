

// 封装一个方法用来获取页面滚动的距离
function getScroll(){
    if(window.pageYOffset){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.documentElement.scrollTop){
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }else{
        return {
            top:document.body.scrollTop,
            left:document.body.scrollLeft
        }
    }
}






/* 
    封装一个animate函数，可以实现指定元素的指定属性运动到指定的目标
        ==>dom:传入要运动的dom节点
        ==>json:所有属性要运动到的目标的集合对象
        ==>fn:定时完成以后执行的函数(回调函数)
*/
function animate(dom,json,fn){
    clearInterval(dom.timer)
    // 每隔20毫秒，每隔属性都缓动一小段距离
    dom.timer = setInterval(function(){
        // flag是一个变量，记录本次运动完了一个后，是否能停止定时器
        var flag = true;
        // json里面有几个键值对，就要运动几次
        for(var attr in json){
            
            // 1 获取当前位置
            if(attr=="opacity"){
                var current = parseInt(getStyle(dom,attr)*100)
            }else{
                var current = parseInt(getStyle(dom,attr))
            }
            // 2 计算速度
            var speed = (json[attr]-current)/10
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            // 3 计算下一个位置
            var next = current+speed;
            if(attr=="zIndex"){
                next = json[attr];
            }
            // 4 有条件的定位元素
            if(next!=json[attr]){
                flag = false;
            }
            if(attr=="opacity"){
                dom.style.opacity = next/100;
                dom.style.filter = "alpha(opacity="+next+")";
            }else if(attr=="zIndex"){
                dom.style.zIndex = next;
            }else{
                dom.style[attr] = next+"px";
            }
            
        }

        if(flag==true){
            clearInterval(dom.timer);
            if(fn){
                fn()
            }
        }
    },20)
}
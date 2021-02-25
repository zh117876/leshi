//获取当前地址栏中的参数信息
var search=location.search
//获取大盒子对象
var box=document.querySelector(".xqbig")
var dt;
//判断当前search对象中是否有值
if(search){
    //分割search字符串
    var id=search.split('=')[1];

    (async function(){
        dt=await promiseAjax({
            url:'../php/xiangqing.php',
            data:'id='+id,
            datatype:'json'
        })
        //创建拼接所有内容的字符串
        var str=`
        <div class="xqimg">
        <div id="tsShopContainer" style="float: left;">
            <div id="tsImgS"><a href="${dt.shop_img1}" title="Images" class="MagicZoom" id="MagicZoom">
                <img width="300" height="300" src="${dt.shop_img1}" /></a>
            </div>
            
            
        </div>
    <div class="xqsj">
        <div class="biaot"><p >${dt.title}</p></div>
        <div>
            <div class="jgbox">
                <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span><i>￥${dt.price}</i><em>有${dt.number}人评价</em>
            </div>
            <div class="dizi">
                <span>配送地区</span><i>广东省&nbsp;深圳市&nbsp;宝安区</i>
                <p>24:00前完成支付，预计（2021.02.24）之前发货</p>
            </div>
            <div class="guige">
                <span>颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</span>
                <ul>
                    <li>黑色</li>
                    <li>白色</li>
                </ul>
            </div>
            <div class="suliang">
                <span>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span>
                <div>
                    <a href="">+</a>
                    <input type="text" value="1">
                    <a href="">-</a>
                </div>
            </div>
            <div class="zongji">
                <span>总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计</span><i>$218</i>
                <a href="">加入购物车</a>
            </div>
            
        </div>
    </div>
    
        `
        //把当前内容添加到大盒子中
        box.innerHTML=str;
    })()


}else{
    alert("你还没选中商品")
    location="./liebiao.html"
}
box.onclick=function(e){
    var e = e || window.event
    //获取点击对象
    var target=e.target || e.srcElement
    //判断点击的对象是否为加入购物车按钮
    if(target.innerHTML=="加入购物车"){
        //获取localStorage中的cartList3
        var cartList=localStorage.getItem("cartList3")
        //判断当前获取的cartList是否存在
        if(cartList){
            //把localStorage中获取的内容转为数组对象
            cartList=JSON.parse(cartList)
            var a=0 //判断当前添加的商品是否在localStorage中存在
            //遍历数组中所有元素啊
            cartList.forEach(item=>{
                //判断当前遍历的商品是否等于要添加的商品
                if(item.id==dt.id){
                    a++
                    item.cart_num++
                }
            })
            //判断a变量是否等于0
            if(a==0){
                //修改商品数量
                dt.cart_num=1
                //把当前对象追加到数组中
                cartList.push(dt)
            }
            //把当前商品添加到localStorage中
            localStorage.setItem("cartList3",JSON.stringify(cartList))
        }else{
            //修改当前商品数量
            dt['cart_num']=1
            //把当前商品添加到localStorage中
            localStorage.setItem("cartList3",JSON.stringify([dt]))
        }
        alert("添加成功") ;
    }  
}
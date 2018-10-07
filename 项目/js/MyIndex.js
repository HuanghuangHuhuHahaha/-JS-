window.onload = function () {  //等待页面其他资源加载完成，在执行js代码
  //获取dom元素
  //头部dom元素
  var headerLiNodes = document.querySelectorAll('#header li');
  var headerUpNodes = document.querySelectorAll('#header li .up');
  var headerArrowNode = document.querySelector('#header .arrow');
  //内容dom元素
  var contentNode = document.getElementById('content');
  var contentUlNode = document.querySelector('#content .contentMain');
  //第一屏dom元素
  var homePointNodes = document.querySelectorAll('#content .home .home_point li');
  var homeLiNodes = document.querySelectorAll('#content .contentMain .home .home_carousel li');
  var homeUlNode = document.querySelector('#content .contentMain .home .home_carousel');
  var navList = document.querySelector('.navList');
  var navLiNode = document.querySelectorAll('.navList li');
  var musicNode = document.querySelector('.music');
  var audioNode = document.querySelector('.music audio');
  var teamLi = document.querySelectorAll('#content .contentMain .team .team_lists li');
  var Team = document.querySelector('#content .contentMain .team .team_lists');
  var mask = document.querySelector('.mask');
  var maskTop = document.querySelector('.mask>.maskTop');
  var maskBottom = document.querySelector('.mask>.maskBottom');
  var maskLine = document.querySelector('.mask>.maskLine');



    //上一次的索引
  var parent = 0;
  //初始化当前下标为0
  var nowIndex = 0;



  // 出入场动画
        var inAndOutAnimation = [
            {
                //第一屏
                inAn:function(){
                    // 入场
                    var ban = document.querySelector('#content .contentMain .home .home_carousel')
                    var circle = document.querySelector('#content .contentMain .home .home_point')
                    ban.style.transform = 'translateY(0px)'
                    circle.style.transform = 'translateY(0px)'

                    ban.style.opacity = '1'
                    circle.style.opacity = '1'
                },
                outAn:function(){
                    var ban = document.querySelector('#content .contentMain .home .home_carousel')
                    var circle = document.querySelector('#content .contentMain .home .home_point')
                    ban.style.transform = 'translateY(-200px)'
                    circle.style.transform = 'translateY(200px)'

                    ban.style.opacity = '0'
                    circle.style.opacity = '0'
                }
                //出场
            },
            {
                //第二屏

                    inAn:function(){
                        var plane1 = document.querySelector('.course .plane1')
                        var plane2 = document.querySelector('.course .plane2')
                        var plane3 = document.querySelector('.course .plane3')
                        plane1.style.transform = 'translate(0px,0px)';
                        plane2.style.transform = 'translate(0px,0px)';
                        plane3.style.transform = 'translate(0px,0px)';

                    },
                    outAn:function(){
                        var plane1 = document.querySelector('.course .plane1')
                        var plane2 = document.querySelector('.course .plane2')
                        var plane3 = document.querySelector('.course .plane3')
                        plane1.style.transform = 'translate(-200px,-200px)';
                        plane2.style.transform = 'translate(-200px,200px)';
                        plane3.style.transform = 'translate(200px,-200px)';



                    }
            },
            {
                  //第三屏
                inAn:function(){
                    var pencel1 = document.querySelector('.works .pencel1');
                    var pencel2 = document.querySelector('.works .pencel2');
                    var pencel3 = document.querySelector('.works .pencel3');
                    pencel1.style.transform = 'translate(0px,0px)'
                    pencel2.style.transform = 'translate(0px,0px)'
                    pencel3.style.transform = 'translate(0px,0px)'


                },
                outAn:function(){
                    var pencel1 = document.querySelector('.works .pencel1');
                    var pencel2 = document.querySelector('.works .pencel2');
                    var pencel3 = document.querySelector('.works .pencel3');
                    pencel1.style.transform = 'translate(0px,-200px)'
                    pencel2.style.transform = 'translate(0px,200px)'
                    pencel3.style.transform = 'translate(0px,200px)'


                }
            },
            {
              //第四屏
                inAn:function(){
                    var photo = document.querySelectorAll('#content .contentMain .about .about_photo');
                    photo[0].style.transform = 'rotate(0deg)'
                    photo[1].style.transform = 'rotate(0deg)'
                    console.log('入场');
                },
                outAn:function(){
                    var photo = document.querySelectorAll('#content .contentMain .about .about_photo');
                    photo[0].style.transform = 'rotate(30deg)'
                    photo[1].style.transform = 'rotate(-30deg)'
                    console.log('出场');

                }
            },
            {
                //第五屏
                inAn: function () {
                    var h_2 = document.querySelector('#content .contentMain .team .team_title');
                    var p_ = document.querySelector('#content .contentMain .team .team_content');
                    h_2.style.transform = 'translateX(0px)'
                    p_.style.transform = 'translateX(0px)'
                },
                outAn: function () {
                    var h_2 = document.querySelector('#content .contentMain .team .team_title');
                    var p_ = document.querySelector('#content .contentMain .team .team_content');
                    h_2.style.transform = 'translateX(-200px)'
                    p_.style.transform = 'translateX(200px)'
                }
            }]


    //开机动画     动画进度条是用图片加载来控制ide    加载成功个数/总数 = 进度
    loading()
    function loading(){
    var arrImage = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
        var flag = 0;
        for (var i = 0; i < arrImage.length; i++) {
            var newImage = new Image();
            newImage.src = '../img/'+arrImage[i];
            newImage.onload = function(){
                //加载成功的个数
                flag++;
                maskLine.style.width =  flag/arrImage.length * 100 +'%';
            }
        }
        maskLine.addEventListener('transitionend',function(){
            maskLine.style.opacity = '0';
            maskTop.style.height = '0'
            maskBottom.style.height = '0';
            mask.remove();
        })



    }
  //逻辑代码
  //头部js
  headerHandle();
  function headerHandle() {
    //初始化时第一个upnode宽度为100%
    headerUpNodes[0].style.width = '100%';
    //初始化时让小箭头来到第一个Li下面
    headerArrowNode.style.left = headerLiNodes[0].getBoundingClientRect().left + headerLiNodes[0].offsetWidth / 2
      - headerArrowNode.offsetWidth / 2 + 'px';
  
    //给所有li绑定点击事件
    for (var i = 0; i < headerLiNodes.length; i++) {

      //给所有的头部li添加下标属性
      headerLiNodes[i].index = i;
      headerLiNodes[i].onclick = function () {


              //当点击时  点击的这个值给了nowIndex 然后它成了新的索引，但它没点时 它还是之前的索引,
              // 有点备份的感觉        每次点击  会获取到新值 也会保留下来旧的值
        //捕获上一次的索引下标
        parent = nowIndex;
          //同步nowIndex的值
        nowIndex = this.index;
        move(nowIndex);

      }
    }

    //侧边栏li
      for (var o = 0; o < navLiNode.length; o++) {

          //给所有的li添加下标属性
          navLiNode[o].index = o;
          navLiNode[o].onclick = function () {

              //捕获上一次的索引下标
              //当点击时  点击的这个值给了nowIndex 然后它成了新的索引，但它没点时 它还是之前的索引,
              // 有点备份的感觉        每次点击  会获取到新值 也会保留下来旧的值
              parent = nowIndex;
              //同步nowIndex的值
              nowIndex = this.index;
              move(nowIndex);

          }
      }

  }
  
  // move(4);//屏幕移动   小箭头移动  侧边栏移动
  function move(nowIndex) {

    //改变小箭头的位置  改变小箭头的位置  来回切
    headerArrowNode.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left + headerLiNodes[nowIndex].offsetWidth / 2
        - headerArrowNode.offsetWidth / 2 + 'px';

    //改变内容区ul位置   就是整体内容区的位置  Y轴  也就是屏幕切换
    contentUlNode.style.top = - nowIndex * contentNode.offsetHeight + 'px';

    //  导航变色的逻辑  点击那个 那个变成缓缓变成黑色
    //将所有的upnodes宽度设置为0
    for (var j = 0; j < headerUpNodes.length; j++) {
      headerUpNodes[j].style.width = '';  //不会添加相应的行内样式
    }
    //将当前点击的upnode宽度设置为100%
    //this代表当前被点击的li元素
    headerUpNodes[nowIndex].style.width = '100%';

    //侧边栏导航逻辑
    for (var k = 0; k < navLiNode.length; k++) {
        navLiNode[k].className = '';
    }
    navLiNode[nowIndex].className = 'active'

      //入场
      inAndOutAnimation[parent]['outAn']();

      //出场
      inAndOutAnimation[nowIndex]['inAn']();

  }
  
  //内容区js
    // 滚动
  contentHandle();
  function contentHandle() {
   //页面滚动
   //兼容ie/chrome
   document.onmousewheel = wheel;
   //兼容firefox
   if (document.addEventListener) {
     document.addEventListener('DOMMouseScroll', wheel);
   }
   /*
     函数反抖：对于一个频繁触发的函数，为了节约性能，在规定时间内只让最后一次函数的触发生效，其他的都忽略
       让多次的函数调用变成一次
     函数节流：对于一个频繁触发的函数，为了节约性能，在规定时间内只让第一次函数的触发生效，其他的都忽略
    */
  
   var wheelTimer = null;
  
   function wheel(event) {
     event = event || window.event;
     //清除延时器
     //清除上一个延时器

     clearTimeout(wheelTimer);
     //设置延时器
     wheelTimer = setTimeout(function () {
       var flag = '';
       if (event.wheelDelta) {
         //ie/chrome
         if (event.wheelDelta > 0) {
           flag = 'up';
         } else {
           flag = 'down'
         }
       } else if (event.detail) {
         //firefox
         if (event.detail < 0) {
           flag = 'up';
         } else {
           flag = 'down'
         }
       }
         //捕获上一次的索引下标
         parent = nowIndex;
       console.log('滚轮事件被触发了');
       switch (flag) {
         case 'up' :
           /*
             向上移动ul
             小箭头位置
             upNode宽度
            */if (nowIndex > 0) {
             nowIndex--;

             move(nowIndex);
         }

           break;
         case 'down' :
           if (nowIndex < headerLiNodes.length - 1) {
             nowIndex++;
             move(nowIndex);
           }
           break;
       }

     }, 200)

     //禁止默认行为
     event.preventDefault && event.preventDefault();
     return false;
   }
  
   //用户缩放浏览器
   window.onresize = function () {
     //更新小箭头的位置
     headerArrowNode.style.left = headerLiNodes[0].getBoundingClientRect().left + headerLiNodes[0].offsetWidth / 2
       - headerArrowNode.offsetWidth / 2 + 'px';
     //更新ul的位置
     contentUlNode.style.top = - nowIndex * contentNode.offsetHeight + 'px';
   }
 }
 
  //第一屏js
  homeHandle();
  function homeHandle() {
    //上一次的下标
    var lastIndex = 0;
    //当前下标
    var nowIndex = 0;
    //初始化上一次点击时间
    var lastTime = 0;
    //自动轮播定时器
    var timer = null;
    
    //给每一个小圆点绑定点击事件
    for (var i = 0; i < homePointNodes.length; i++) {
      homePointNodes[i].index = i;
      homePointNodes[i].onclick = function () {
        //获取当前点击的时间
        var nowTime = Date.now();
        if (nowTime - lastTime < 2100) {
          //说明两次点击间隔时间少于两秒
          return;
        }
        //同步nowIndex的值
        nowIndex = this.index;
        //如果下标相等，说明点击的就是当前小圆点，不进行处理
        if (nowIndex === lastIndex) return;
        
        //清除定时器
        clearInterval(timer);
        
        //清除掉所有class
        for (var j = 0; j < homeLiNodes.length; j++) {
          homeLiNodes[j].className = 'commonTitle';
        }
        
        if (nowIndex > lastIndex) {
          //说明点击的是右边
          homeLiNodes[nowIndex].className = 'commonTitle rightShow';
          homeLiNodes[lastIndex].className = 'commonTitle leftHide';
        } else {
          //说明点击的是左边
          homeLiNodes[nowIndex].className = 'commonTitle leftShow';
          homeLiNodes[lastIndex].className = 'commonTitle rightHide';
        }
        
        //修正小圆点的显示
        homePointNodes[lastIndex].className = '';
        homePointNodes[nowIndex].className = 'active';
    
        //同步下标
        lastIndex = nowIndex;
        //同步时间
        lastTime = nowTime;
        
        //重新开启自动轮播
        autoPlay();
        
      }
    }
    
    //开启自动轮播
    autoPlay();
    function autoPlay() {
      //自动轮播
      timer = setInterval(function () {
        //相当于点击右边小圆点  右边显示 左边隐藏
        nowIndex++;
    
        if (nowIndex === 4) {
          nowIndex = 0;
        }
    
        homeLiNodes[nowIndex].className = 'commonTitle rightShow';
        homeLiNodes[lastIndex].className = 'commonTitle leftHide';
        //修正小圆点的显示
        homePointNodes[lastIndex].className = '';
        homePointNodes[nowIndex].className = 'active';
    
        //同步下标
        lastIndex = nowIndex;
        //更新lastTime时间
        lastTime = Date.now();
    
      }, 2500)
    }
    
    //鼠标移入移出事件
    homeUlNode.onmouseenter = function () {
      clearInterval(timer);
    }
    homeUlNode.onmouseleave = autoPlay;

      // navCe(lastIndex);
  }

  //第五屏
    team();
    function team(){
        var mycanvas = null;
        var timer1 = null;
        var timer2 = null;
      //  鼠标移入 所有的li 变透明  鼠标放上去的那个透明度是1
        for (var i = 0; i < teamLi.length; i++) {
            teamLi[i].onmouseenter = function(){
              //排他
              //鼠标移入 任何一个li的时候  所有的li透明度变为0.5  透明的那个变成1
                for (var j = 0; j < teamLi.length; j++) {
                    teamLi[j].style.opacity = '0.5';
                }
                this.style.opacity = '1';

                //当鼠标移入时 要创建canvas  还要有气泡效果
                addCanvas();
                //指定canvas位置
                mycanvas.style.left = this.offsetLeft +'px';
            }
        }

      // 鼠标离开ul区域  所有li透明度变为1
        Team.onmouseleave = function(){
            for (var j = 0; j < teamLi.length; j++) {
                teamLi[j].style.opacity = '1';
            }
            //鼠标离开时要删除canvas
            removeCanvas();
            //删除以后 再把canvas变会null  为了鼠标离开ul下次再进入li的时候能运行
            mycanvas = null;
    }

      //创建canvas
        function addCanvas(){
          //判断一下  当没有canvas的时候创建canvas
          if(!mycanvas){
            //创建  塞入 canvas
              mycanvas = document.createElement('canvas');
              //指定canvas宽高
              mycanvas.width = teamLi[0].offsetWidth;
              mycanvas.height = 400;
              Team.appendChild(mycanvas);

              // 气泡效果
              qiPao();
            }
        }

      // 删除canvas
        function removeCanvas(){
            mycanvas.remove();
            //删除后清除气泡里面的定时器
            clearInterval(timer1)
            clearInterval(timer2)
        }


        //气泡效果
        function qiPao(){
            //获取画笔
            var hb = mycanvas.getContext('2d')
            var arr = [];
        timer1 = setInterval(function(){
//        清除画布  不然会出现8变形  是因为JS引擎的锅
                hb.clearRect(0,0,mycanvas.width,mycanvas.height);
                //数据处理
                for (var j = 0; j < arr.length; j++) {

                    arr[j].deg += 3;

                    //改变   xy 的初始位置             deg*PI/180 = 弧度  弧度可以直接计算
                    arr[j].x = arr[j].startX + Math.sin(arr[j].deg * Math.PI / 180) * arr[j].scale/2;
                    arr[j].y = arr[j].startY - 0.75 * (arr[j].deg * Math.PI / 180) * arr[j].scale;
                    //
                    if(arr[j].y < 30 ){
                        arr.splice(j,1)
                    }
                }

                //创建圆
                //因为 所有圆的信息和 颜色信息都在数组中 所以要遍历数组拿到所有每个对象 此时对象正好也叫arr
                //每过20毫秒创建一个圆
                for (var i = 0; i < arr.length; i++) {
//        hb.fillStyle = 'rgba('+arr[i].r+','+arr[i].g+','+arr[i].b+','+arr[i].a+')';
                    hb.fillStyle = 'rgba('+arr[i].r+','+arr[i].g+','+arr[i].b+','+arr[i].a+')';
                    hb.beginPath();
                    //  颜色的值是变量所以拼串    又因为值是在对象中保存的 所以对象.属性读取


                    //清除一下画布  不然产生出来的圆是八边形  是JS引擎的锅
                    // 创建圆
                    //      对象.属性 = 信息值
                    hb.arc(arr[i].x,arr[i].y,arr[i].c_r,0,2*Math.PI,true);
                    hb.fill(); //填充类型
                }



            },10)
            // 每个500毫秒 产生一次 圆的信息
        timer2 = setInterval(function(){
                // 圆的信息
                var c_r = Math.floor(Math.random() * 8+2);
                var x = Math.floor(Math.random() * mycanvas.width);   //获取的值在 1-400之间 不会超出画布的范围  就相当于在画布上
                var y = mycanvas.height + c_r;
                //颜色信息
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                var a = 1;
                //曲线运动信息
                var startX = x;
                var startY = y;
                var deg = 0;
                var scale = Math.floor(Math.random() * 30) + 30 ;


                // 把产生的圆的信息都 插入到数组中 一会儿给圆添加
                // 用对象是因为 每过500毫秒就会产生一组信息 一个圆的信息和颜色信息
                // 太多了 所以用对象来保存一下 用的时候直接对象.属性名
                arr.push({
                    //圆的信息 数据
                    x:x,
                    y:y,
                    c_r:c_r,
                    //颜色的数据
                    r:r,
                    g:g,
                    b:b,
                    a:a,
                    //曲线运动
                    startX:startX,
                    startY:startY,
                    deg:deg,
                    scale:scale
                })

            },30)
        }
    }






    console.log(musicNode);
    console.log(audioNode);
    musicNode.onclick = function () {
        console.log('------------');
        if (audioNode.paused) {
            //说明当前音乐是暂停的，点击播放
            audioNode.play();
            console.log(1111);
            this.style.backgroundImage = 'url("../img/musicon.gif")';
        } else {
            //说明当前音乐是播放的，点击暂停
            audioNode.pause();
            this.style.backgroundImage = 'url("../img/musicoff.gif")';
            console.log(122222);
        }
    }

    //手动触发播放
    audioNode.play();
    //设置静音
    audioNode.muted = false;


}
    function getFileName(path) {
        var index = path.lastIndexOf("\/");
        path = path.substring(index + 1, path.length);
        return path
    }
    function insert_video_sharpness(data) {
        if (data['type'] == true) {
            $("#video_sharpness_list").prepend('<div class="niputv-player-sharpness-poup a" data-sharpness="' + data[
                'calss'] + '">' + data['calss'] + '</div>')
        }
    }
    $('#video').on('waiting', function() {
       $(".niputv-player-popu.buffer").fadeIn()
    });
    $('#video').on('canplay', function() {
       $(".niputv-player-popu.buffer").fadeOut()
    });
    var getvideofile = $("#videokey").data("key")
    var videoptype_list = [{
            "calss": "360P",
            "type": getvideofile['360']
        },
        {
            "calss": "480P",
            "type": getvideofile['480']
        },
        {
            "calss": "720P",
            "type": getvideofile['720']
        },
        {
            "calss": "1080P",
            "type": getvideofile['1080']
        },
        {
            "calss": "2K",
            "type": getvideofile['2k']
        },
        {
            "calss": "4K",
            "type": getvideofile['4k']
        },
    ]
    var video_sharpness720p = getvideofile['720']
    var filekey = getFileName(getvideofile['key'])
    var videofilekey = filekey.substring(0, filekey.lastIndexOf("."));
    
    if (getvideofile['360'] == true) {
        $("#control-video_sharpness").html("360P")
        $("#video").attr("src",videofilekey + '-360p.mp4')
    }
    if (getvideofile['480'] == true) {
        $("#control-video_sharpness").html("480P")
        $("#video").attr("src",videofilekey + '-480p.mp4')
    }
    if (video_sharpness720p == true) {
        $("#control-video_sharpness").html("720P")
        $("#video").attr("src",videofilekey + '-720p.mp4')
    }
    $.each((videoptype_list),
        function () {
            insert_video_sharpness(this)
        });
    /**播放器主体**/
    var video = document.getElementById("video");

    /**现在播放时间-视频总时长**/
    var play_nowtime = document.getElementById("play-nowtime");
    var play_total_length = document.getElementById("play-total_length");

    /**视频播放进度条**/
    var player_filling_all = document.getElementById("play-filling_all");
    var player_filling = document.getElementById("play-filling");
    /**播放控件**/
    var video_playbutt = document.getElementById("control-play");
    $('body, html').bind('mousemove', function(e) {
                        $("#niputv-player-control").hover(function() {
							$("#niputv-player-control").stop(true, false).animate({'opacity' : '1'});
						}, function() {
							$("#niputv-player-control").stop(true, false).animate({'opacity' : '0'});
						});
    })
    function formatTime(time) {
        var hour = Math.floor(time / 3600);
        var other = time % 3600;
        var minute = Math.floor(other / 60);
        var second = (other % 60).toFixed(0);
        var showTime = hour + ':' + minute + ':' + second;
        return showTime;
    };
    
	$(window).keyup(function(event){
		event = event || window.event;
			if(event.keyCode == 27){
                exitFullscreen()
			};
		event.preventDefault();
        a = 0
        return a
	});
    //全屏按钮
    a = 0
    $('#video-FullScreen').on('click', function() {
        if(a==0){
           FullScreen()
            a = 1
            console.log(a)
        }else{
            exitFullscreen()
            a = 0
            console.log(a)
        }
    });
    function FullScreen() {
        
        $(".niputv-player").css("max-width","100%")
        $(".niputv-player").css("max-height","100%")
        
        var ele = document.documentElement;
        if (ele .requestFullscreen) {
            ele .requestFullscreen();
        } else if (ele .mozRequestFullScreen) {
            ele .mozRequestFullScreen();
        } else if (ele .webkitRequestFullScreen) {
            ele .webkitRequestFullScreen();
        }
    }
    
    //退出全屏
    function exitFullscreen() {
        $(".niputv-player").css("max-width","1280px")
        $(".niputv-player").css("max-height","720px")
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    }
    function play() {
        this.controls = true;
        if (video.paused) {
            video.play()
            video_playbutt.style.cssText = "background: url(img/niputv-player-ico.png) -100px -0px no-repeat";
            $("#control-topplay").fadeOut()
            $("#niputv-player-playover").fadeOut()
        } else {
            $("#control-topplay").fadeIn()
            video.pause()
            video_playbutt.style.cssText = "background: url(img/niputv-player-ico.png) 0px 0px no-repeat";
        }
    };
    $('#control-volume_butt').on('click', function () {
        if (video.muted == true) {
            video.muted = false;
            $('#control-volume_butt').attr("style",
                "background: url(img/niputv-player-ico.png) 0px -105px no-repeat")
        } else {
            video.muted = true;
            $('#control-volume_butt').attr("style",
                "background: url(img/niputv-player-ico.png) 0px -155px no-repeat")
        }
    });
    $('.niputv-player-volume-poup_control').on('click mousewheel DOMMouseScroll', function (e) {
        e = e || window.event;
        volumeControl(e);
        e.stopPropagation();
        return false;
    });
    $('video')[0].volume = 1;
    function volumeControl(e) {
        e = e || window.event;
        var eventype = e.type;
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail &&
            (e.originalEvent.detail > 0 ? -1 : 1));
        var positions = 0;
        var percentage = 0;
        if (eventype == "click") {
            positions = $('.niputv-player-volume-poup_control').find('.niputv-player-volume-poup_controlfilling').offset()
                .top - e.pageY;
            percentage = 100 * (positions + $('.niputv-player-volume-poup_control').find(
                '.niputv-player-volume-poup_controlfilling').height()) / $('.niputv-player-volume-poup_control').height();
        } else if (eventype == "mousewheel" || eventype == "DOMMouseScroll") {
            percentage = 100 * ($('.niputv-player-volume-poup_control').find(
                '.niputv-player-volume-poup_controlfilling').height() + delta) / $(
                '.niputv-player-volume-poup_control').height();
        }
        if (percentage < 0) {
            percentage = 0;
        }

        if (percentage >= 100) {
            percentage = 100;
        }
        $('.niputv-player-volume-poup_controlfilling').css('height', percentage + '%');
        $('video')[0].volume = percentage / 100;
        e.stopPropagation();
        e.preventDefault();
    }
    var timer = null;
    $('#control-volume_butt').on('mouseover', function () {
        clearInterval(timer);
        $('#control-volume').css('display', 'block');
    });
    $('#control-volume_butt').on('mouseout', function () {
        clearInterval(timer);
        timer = setTimeout(function () {
            $('#control-volume').css('display', 'none');
        }, 200);
    });
    $("#control-play").click(function () {
        play()
    })

    $("#control-topplay").click(function () {
        play()
        $("#control-topplay").fadeOut()
    })
    
    $("#video").click(function () {
        play()
    })
    var timeDrag = false;
    $('#play-filling_all').mousedown(function (e) {
        timeDrag = true;
        updatebar(e.pageX);
    });

    $(document).mouseup(function (e) {
        if (timeDrag) {
            timeDrag = false;
            updatebar(e.pageX);
        }
    });

    $(document).mousemove(function (e) {
        if (timeDrag) {
            updatebar(e.pageX);
        }
    });
    //清晰度弹窗隐藏
    $("#control-video_sharpness").click(function (e) {
        $("#video_sharpness_list").toggle()
    })

    function sharpness_important(data) {
            $("#sharpness-important").fadeIn({
                duration: 300
            });
            $("#sharpness-important").html('正在为你切换清晰度至'+data)
    }
    //清晰度调用
    $(function () {
        $('#video_sharpness_list').on('click', '.niputv-player-sharpness-poup.a', function () {
            data = $(this).data("sharpness")
            $('#control-video_sharpness').html(data);
            $("#video_sharpness_list").toggle()
            sharpness_important(data)
            video_sharpness(data)
        });
    });

    //清晰度实现切换
    function video_sharpness(sharpness) {
        //alert(sharpness)
        var currentTimeBak = video.currentTime;
        $("#video").attr("src",videofilekey + '-' + sharpness + '.mp4')
        video.currentTime = currentTimeBak;
        play()
        $("#sharpness-important").html('以为你切换到'+sharpness)
        setTimeout(function(){
            $('#sharpness-important').fadeOut({
                duration: 1000
            });//找到对应的标签隐藏
        },2200)//3000是表示3秒后执行隐藏代码
    }

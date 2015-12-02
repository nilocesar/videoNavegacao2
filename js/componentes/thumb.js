define(['jquery', "jquery_easing"], function ($) {
    'use strict';

    var thumb = function () {
        var $public = {};
        var $private = {};
        var $parent = {};

        $public.init = function init(_parent) {
            $parent = _parent;
        };

        $public.createThumb = function createThumb(id_, w_, h_, _scrolling, _close) {

            $public.Controle1Status = true;

            var _scroll = "no";
            if (_scrolling) _scroll = "yes";
            
            var w = w_;
            var h = h_;
            var id = id_;
            $(".preloader").css("display", "block");
            $("#v5_lightbox_controle1").remove();
            $('body').prepend('<div id="v5_lightbox_controle1"><div class="bcg_controle1"></div><iframe class="modalIframe_controle1" width=' + w + ' height=' + h + ' src=' + id + ' frameborder="0" scrolling=' + _scroll + ' allowfullscreen></iframe><div class="hit_controle1"></div></div>');

            $(".hit_controle1").css("width", w_ );
            $(".hit_controle1").css("height", h_);
            $(".modalIframe_controle1").css("width", w_);
            $(".modalIframe_controle1").css("height", h_);
            $("#v5_lightbox_controle1").css('display', 'block');
            $("#v5_lightbox_controle1").css('opacity', 0 );
            var thumbStatus = false;

            ///Loader Iframe
            $(".modalIframe_controle1", this.domNode).on("load", function () {
                $private.contents = $('.modalIframe_controle1').contents();
                
                
                if (!Modernizr.touch) {
                    
                    $parent.thumbVideo.getPlayer().on('timeupdate', function () {

                        var _width = $private.contents.find( "#big-video-vid" ).css("width");
                        var _height = $private.contents.find( "#big-video-vid" ).css("height");

                        if( parseInt(_width ) > 3 && $parent.thumbVideo.getPlayer().currentTime() > 1 && !thumbStatus  ){

                            $("#v5_lightbox_controle1").css('opacity', 1 );
                            $(".hit_controle1").css("width", _width );
                            $(".hit_controle1").css("height", _height );
                            $(".modalIframe_controle1").css("width", _width );
                            $(".modalIframe_controle1").css("height", _height );            

                            //
                            $("#v5_lightbox_controle1").addClass('animated slideInDown');

                            thumbStatus = true;
                        }
                    });
                
                }
                else{
                    
                    $("#v5_lightbox_controle1").css('opacity', 1 );
                    
                    var _width = parseInt($private.contents.find( "#bkg" ).css("width"));
                    var _height = parseInt($private.contents.find( "#bkg" ).css("height"));
                
                    
                    $(".hit_controle1").css("width", _width );
                    $(".hit_controle1").css("height", _height );
                    $(".modalIframe_controle1").css("width", _width );
                    $(".modalIframe_controle1").css("height", _height );   
                    $("#v5_lightbox_controle1").addClass('animated slideInDown');
                }
                
            });


            $(".hit_controle1").on("click", function () {

                $(".hit_controle1").off("click");


                if (!Modernizr.touch) {

                    var BV = $parent.thumbVideo;
                    BV.getPlayer().currentTime(1);
                    BV.getPlayer().pause();


                    setTimeout(function () {

                        $(".bcg_controle1").delay(0).animate({
                            opacity: 1
                        }, 100);
                                        
                        $(".modalIframe_controle1").delay(200).animate({
                            left: 0,
                            top: 0,
                            height: $(window).height(),
                            width: $(window).width()
                        }, 500, "easeOutSine", function () {

                            $("#v5_lightbox_controle1").delay(0).animate({
                                opacity: 0
                            }, 1000, function () {

                                $public.removeThumb(); 
                                $parent.videoPlay();

                            });
                        });

                        //
                        $parent.thumbPlay();
                        $parent.videoPause();


                    }, 1000 * 0.2);

                } else //para mobile
                {
                    $(".bcg_controle1").delay(0).animate({
                            opacity: 1,
                    }, 300);
                    
                    var _top = parseInt( $(".modalIframe_controle1").css("height"))/2 * -1;
                    var _left = parseInt(  $(".modalIframe_controle1").css("width"))/2 * -1;
                    
                    $(".modalIframe_controle1").delay(0).animate({
                            marginTop: _top,
                            marginLeft: _left,
                            left: "50%",
                            top:"50%"
                    }, 300);
                    
                    
                    
                   $("#v5_lightbox_controle1").delay(500).animate({
                        opacity: 0
                    }, 1000, function () {

                        $public.removeThumb();
                        $parent.videoPlay();

                    });

                    
                    $parent.thumbPlay();
                    $parent.videoPause();
                }

            });

        };
        
        $public.removeThumb = function removeThumb(){
            $("#v5_lightbox_controle1").children().hide();
            $("#v5_lightbox_controle1").remove();
        }

        return $public;
    };

    return thumb();
});
function scroll(){var e=$(window),a=e.innerWidth(),n=e.scrollTop();n>origOffsetY?nav_fixed||(nav_fixed=!0,$(".back-to-top").show(),$("#navbar-container").removeClass("nav-not-fixed").addClass("nav-fixed"),$(".sidebar-container").addClass("sidebar-fixed"),a>=768&&$("#brand").removeClass("hidden-left")):($("#banner-image").css({backgroundPosition:"calc(-750px + ((100% - 1280px) / 2)) "+(n/-3-100)+"px"}),a>=768&&$("#brand").addClass("hidden-left"),nav_fixed&&(nav_fixed=!1,$(".back-to-top").hide(),$(".sidebar-container").removeClass("sidebar-fixed"),$("#navbar-container").removeClass("nav-fixed").addClass("nav-not-fixed")))}var nav_fixed=!1,origOffsetY=198;$(document).ready(function(){document.onscroll=scroll,document.ontouchmove=function(e){var a=e.target||e.srcElement;a.hasClass("enable_touchmove")||e.preventDefault()}});
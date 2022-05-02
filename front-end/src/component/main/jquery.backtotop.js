/*
Template Name: Colossus
Author: <a href="https://www.os-templates.com/">OS Templates</a>
Author URI: https://www.os-templates.com/
Licence: Free to use under our free template licence terms
Licence URI: https://www.os-templates.com/template-terms
File: Back to Top JS
*/
import React from "react";
import $ from "jquery"


export default function jqueryBacktotop(){
    $("#backtotop").click(function () {
        $("body,html").animate({
            scrollTop: 0
        }, 600);
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 150) {
            $("#backtotop").addClass("visible");
        } else {
            $("#backtotop").removeClass("visible");
        }
    });
    return
}

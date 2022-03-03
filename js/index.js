import api_data from './api_data.js';
import li_2 from './li_2.js';

// 홈으로 이동
$('#header h1 > a').on('click',function(){
    var home = $(this).attr('href')
    $('#section').load(`${home} #container`)
    return false
})

// li별 페이지 이동
$('.depth1 > li > a').on('click',function(){
    var linum = $(this).attr('href')
    // $('#section').load(`${linum} #container`)
    $('#section').load(`${linum} #container`, function(responseTxt, statusTxt){
        if (linum==="./li_1.html" &&  statusTxt==="success") {

        } 
        else if (linum==="./li_2.html" &&  statusTxt==="success") {
            li_2();
        } 
        else if (linum==="./li_3.html" &&  statusTxt==="success") {

        } 
        else if (linum==="./li_4.html" &&  statusTxt==="success") {
            api_data();
        } 
    })
    return false
})

// li클릭시 불들어오는 
$('.depth1 li a').on('click',function(){
    $(this).parent().addClass('on')
    $(this).parent().siblings().removeClass('on')
})

// 홈누르면 li불끄기
$('#header h1 > a').on('click',function(){
    $('.depth1 li').removeClass('on')
})


$(window).on('scroll', function(){
    var sct = $(this).scrollTop();

    if (sct>=0 && !$('html').hasClass('flag')) 
    {
        $('html').addClass('flag');
        $('body').append('<div class="gotop"><a href="#"><i class="fa-solid fa-angle-up"></i></a></div><div class="gobottom"><a href="#"><i class="fa-solid fa-angle-down"></i></a></div>');
        $('.gotop').css({
            position: 'fixed',
            right: '50px',
            bottom: '30px',
            fontSize: '30px',
            opacity: '0',
            background: '#2277ee',
            color: '#fff',
            borderRadius: '50%',
            padding: '5px 15px',
        }).animate( { opacity:1 }, 100);
        $('.gobottom').css({
            position: 'fixed',
            right: '110px',
            bottom: '30px',
            fontSize: '30px',
            opacity: '0',
            background: '#2277ee',
            color: '#fff',
            borderRadius: '50%',
            padding: '5px 15px',
        }).animate( { opacity:1 }, 100);
    } 
    else if (sct <=0 && $('html').hasClass('flag')) 
    {
        $('html').removeClass('flag');
        $('.gotop').animate( { opacity:0 }, 100, function(){
            $(this).remove();
        })
        $('.gobottom').animate( { opacity:0 }, 100, function(){
            $(this).remove();
        })
    }
})

$('body').on('click', '.gotop', function(){
    $('html').animate({
        scrollTop: 0
    }, 500)

    return false;
})

$('body').on('click', '.gobottom', function(){
    var down = $('body').prop('scrollHeight');
    $('html').animate({
        scrollTop: down
    }, 500)

    return false;
})

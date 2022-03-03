const li_2 = () => {

    $('.Content .nav > ul > li > a').on('click', function()
    {
        // 메뉴 안 내용 변경
        var index = $(this).parent().index();
        $(this).parents('.nav').next().children('div').eq(index).addClass('on').siblings().removeClass('on')

        // 서브 메뉴 불들어오기
        $(this).parent().addClass('on').siblings().removeClass('on')

        // 첫번째 메뉴 내용 변경
        $('.section .main_section_1 .main').children('div').eq(0).addClass('on').siblings().removeClass('on')

        $('.Content .section .main_section .head h2').eq(0).addClass('on').siblings().removeClass('on')

        $('.Content .section .main_section_2 .head h2').eq(0).addClass('on').siblings().removeClass('on')
        return false;
    })

    $('.Content .section .main_section .head h2').on('click', function()
    {
        var index = $(this).index();
        $(this).parent().next().children('div').eq(index).addClass('on').siblings().removeClass('on')

        $(this).addClass('on').siblings().removeClass('on')
        return false;
    })
}

export default li_2
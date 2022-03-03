import {
    sidos
} from './sido.js';

const api_data = () => {
    var isRun = false;

    function api_data(sdName, pageNo, numRows) {
        if (!isRun) {
            isRun = true;

            $.ajax({
                type: 'GET',
                url: `https://popupu.herokuapp.com/http://openapi.kepco.co.kr/service/EvInfoServiceV2/getEvSearchList?serviceKey=iVtdG4wl1qRvI0fDb%2BZ24NdqKOIUlQv8r%2FimXnCC0qHt5H0eeO2nH4D0FoA0RDlwIfPDUOnJTUWIoEUGkIlzvw%3D%3D&pageNo=${pageNo}&numOfRows=${numRows}&addr=${sdName}`,
                dataType: 'xml',
                beforeSend: function () {
                    Loding();
                },
                complete: function () {
                    $('#Content .battery').remove();
                },
                success: function (getdata) {
                    usedata(getdata, pageNo, numRows);
                },
                error: function (xhr) {
                    alert(xhr.status + '/' + xhr.errorText);
                },
            })
        }
    }

    function api_data_2(sdName, pageNo, numRows, num, row) {
        if (!isRun) {
            isRun = true;

            $.ajax({
                type: 'GET',
                url: `https://popupu.herokuapp.com/http://openapi.kepco.co.kr/service/EvInfoServiceV2/getEvSearchList?serviceKey=iVtdG4wl1qRvI0fDb%2BZ24NdqKOIUlQv8r%2FimXnCC0qHt5H0eeO2nH4D0FoA0RDlwIfPDUOnJTUWIoEUGkIlzvw%3D%3D&pageNo=${pageNo}&numOfRows=${numRows}&addr=${sdName}`,
                dataType: 'xml',
                beforeSend: function () {
                    Loding();
                },
                complete: function () {
                    $('#Content .battery').remove();
                },
                success: function (getdata) {
                    usedata_2(getdata, num, numRows, row);
                },
                error: function (xhr) {
                    alert(xhr.status + '/' + xhr.errorText);
                },
            })
        }
    }

    var sido = ''; // 시도
    var rows = 10; // 한페이지에 볼 아이템 갯수

    var startPage = 1; // 페이지 번호
    var totalCount = 0; // 총 검색수

    var charger = '' // 충전 타입 // all(모두 표시시 ''), 급속, 완속 중에 보기

    var opt = '';
    var opt_2 = '';

    var last = 0;
    var first = 0;
    var click_flag = false;

    var checked_char;

    api_data(sido, startPage, rows);

    function usedata(data, pno, num) {
        var all_count = $(data).find('totalCount').text();
        totalCount = Math.ceil(Number(all_count) / num)
        var tenCount = Math.ceil(totalCount / num)

        $('#Content .top_bar_2 .count').text(`총 ${all_count}건이 검색 되었습니다.`);
        
        var elem = `<ul class="List cf">`

        if (all_count == 0) {
            elem += `<li>`;
            elem += `<p>데이터가 존재 하지 않습니다</p>`;
            elem += `</li>`;
            elem += `</ul>`;
            $('#Content').append(elem);
            isRun = false;
            return;
        }

        $(data).find('item').each(function () 
        {
            var addr = $(this).find('addr').text();
            var chargeTp = $(this).find('chargeTp').text();
            var cpId = $(this).find('cpId').text();
            var cpNm = $(this).find('cpNm').text();
            var cpStat = $(this).find('cpStat').text();
            var cpTp = $(this).find('cpTp').text();
            var csId = $(this).find('csId').text();
            var csNm = $(this).find('csNm').text();
            var lat = $(this).find('lat').text();
            var longi = $(this).find('longi').text();
            var statUpdateDatetime = $(this).find('statUpdateDatetime').text();

            elem += `<li>`;

            elem += `<div class="adress">`;
            elem += `<div class="firsts">`;
            elem += `<p>주소 : <strong>${addr}</strong></p>`;
            elem += `<div class="arrow">`;
            elem += `<i class="fa-solid fa-angle-down"></i>`;
            elem += `</p>`;
            elem += `</div>`;
            elem += `</div>`;
            elem += `<div class="colors">`;

            switch (cpStat) 
            {
                case '1': elem += `<p>충전기 상태 : <span style="color:green;font-weight: 600" >충전가능 <i class="fa-solid fa-bolt"></i></span></p>`; break;
                case '2': elem += `<p>충전기 상태 : <span style="color:red;font-weight: 600">충전중 <i class="fa-solid fa-bolt"></i></p>`; break;
                case '3': elem += `<p>충전기 상태 : <span style="color: rgb(222, 222, 0);font-weight: 600">고장/점검 <i class="fa-solid fa-bolt"></i></span></p>`; break;
                case '4': elem += `<p>충전기 상태 : <span style="color:red;font-weight: 600">통신장애 <i class="fa-solid fa-bolt"></i></span></p>`; break;
                case '5': elem += `<p>충전기 상태 : <span style="color:red;font-weight: 600">통신미연결 <i class="fa-solid fa-bolt"></i></span></p>`;break;
            }

            elem += `</p>`;
            elem += `</div>`;

            switch (chargeTp) {
                case '1':
                    elem += `<p>충전기타입 : 완속</p>`;
                    break;
                case '2':
                    elem += `<p>충전기타입 : 급속</p>`;
                    break;
            }

            switch (cpTp) {
                case '1':
                    elem += `<p>충전방식 : B타입(5핀)</p>`;
                    break;
                case '2':
                    elem += `<p>충전방식 : C타입(5핀)</p>`;
                    break;
                case '3':
                    elem += `<p>충전방식 : BC타입(5핀)</p>`;
                    break;
                case '4':
                    elem += `<p>충전방식 : BC타입(7핀)</p>`;
                    break;
                case '5':
                    elem += `<p>충전방식 : DC차데모</p>`;
                    break;
                case '6':
                    elem += `<p>충전방식 : AC3상</p>`;
                    break;
                case '7':
                    elem += `<p>충전방식 : DC콤보</p>`;
                    break;
                case '8':
                    elem += `<p>충전방식 : DC차데모+DC콤보</p>`;
                    break;
                case '9':
                    elem += `<p>충전방식 : DC차데모+AC3상</p>`;
                    break;
                case '10':
                    elem += `<p>충전방식 : DC차데모+DC콤보+AC3상</p>`;
                    break;
            }

            elem += `<div class="hide">`
            elem += `<p>충전기 ID : ${cpId}</p>`;
            elem += `<p>충전기명칭 :  ${cpNm}</p>`;
            elem += `<p>충전소ID : ${csId}</p>`;
            elem += `<p>충전소 명칭 : ${csNm}</p>`;
            elem += `<p>충전기상태 갱신 시각 : ${statUpdateDatetime}</p>`;
            elem += `<iframe class="map" frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=${lat},${longi}&amp;key=AIzaSyBvJ_OC7o2tQfl9tKh6H0nNQhU-GAoYp3c"></iframe>`
            elem += `</div>`
            elem += `</div>`;
            elem += `</li>`;
        })
        elem += `</ul>`;

        elem += `<div class="page">`;

        if (startPage > 10) {
            elem += `<span class="prev"><i class="fa-solid fa-angles-left"></i></span>`;
        }

        elem += `<span>`

        for (let i = startPage; i <= totalCount && i <= startPage + 9; i++) {
            if (pno == i) {
                elem += `<a href="${i}" class="on"> ${i} </a>`
            } else {
                elem += `<a href="${i}"> ${i} </a>`
            }
        }

        if (tenCount >= 2 && totalCount > startPage + 9) {
            elem += `<span class="next"><i class="fa-solid fa-angles-right"></i></span>`
        }

        elem += `</span>`
        elem += `</div>`;

        $('#Content').append(elem);

        isRun = false;
    }

    function usedata_2(data, pno, num, row) 
    {
        var numOfRows = 10;
        var numOfRows2 = 0;
        var pageNo = 1;
        var totalCount = 0;
        numOfRows2 += numOfRows;
        checked_char = '';
        checked_char += `<response><body><pageNo${pageNo}>`
        checked_char += `<items>`

        $(data).find('item').each(function () 
        {
            var addr = $(this).find('addr').text();
            var chargeTp = $(this).find('chargeTp').text();
            var cpId = $(this).find('cpId').text();
            var cpNm = $(this).find('cpNm').text();
            var cpStat = $(this).find('cpStat').text();
            var cpTp = $(this).find('cpTp').text();
            var csId = $(this).find('csId').text();
            var csNm = $(this).find('csNm').text();
            var lat = $(this).find('lat').text();
            var longi = $(this).find('longi').text();
            var statUpdateDatetime = $(this).find('statUpdateDatetime').text();

            if (!cpNm.match(charger)) 
            {
                // 해당 충전 타입이 아니면 종료
                return;
            }

            checked_char += `<item>`;
            checked_char += `<addr>${addr}</addr>`;
            checked_char += `<chargeTp>${chargeTp}</chargeTp>`;
            checked_char += `<cpId>${cpId}</cpId>`;
            checked_char += `<cpNm>${cpNm}</cpNm>`;
            checked_char += `<cpStat>${cpStat}</cpStat>`;
            checked_char += `<cpTp>${cpTp}</cpTp>`;
            checked_char += `<csId>${csId}</csId>`;
            checked_char += `<csNm>${csNm}</csNm>`;
            checked_char += `<lat>${lat}</lat>`;
            checked_char += `<longi>${longi}</longi>`;
            checked_char += `<statUpdateDatetime>${statUpdateDatetime}</statUpdateDatetime>`
            checked_char += `</item>`;

            totalCount++;

            if (totalCount >= numOfRows2) 
            {
                numOfRows2 += numOfRows;
                checked_char += `</items>`
                checked_char += `</pageNo${pageNo++}>`
                checked_char += `<pageNo${pageNo}>`
                checked_char += `<items>`
            }
        })

        checked_char += `</items>`
        checked_char += `</pageNo${pageNo}>`
        checked_char += `<numOfRows>${numOfRows}</numOfRows>`
        checked_char += `<totalCount>${totalCount}</totalCount>`
        checked_char += `</body></response>`

        usedata_3(checked_char, pno, numOfRows, row);
    }

    function usedata_3(data, pno, num) 
    {
        var all_count = $(data).find('totalCount').text();
        totalCount = Math.ceil(Number(all_count) / num)
        var row_count = Math.ceil(rows / 10)
        var tenCount = Math.ceil(totalCount / row_count)
       
        $('#Content .top_bar_2 .count').text(`총 ${all_count}건이 검색 되었습니다.`);

        var elem = `<ul class="List cf">`

        if (all_count == 0) 
        {
            elem += `<li>`;
            elem += `<p>데이터가 존재 하지 않습니다</p>`;
            elem += `</li>`;
            elem += `</ul>`;
            $('#Content').append(elem);
            isRun = false;
            return;
        }

        for(let i = 1; i <= row_count; i++)
        {
            $(data).find(`pageNo${pno*i}`).find('item').each(function () 
            {
                var addr = $(this).find('addr').text();
                var chargeTp = $(this).find('chargeTp').text();
                var cpId = $(this).find('cpId').text();
                var cpNm = $(this).find('cpNm').text();
                var cpStat = $(this).find('cpStat').text();
                var cpTp = $(this).find('cpTp').text();
                var csId = $(this).find('csId').text();
                var csNm = $(this).find('csNm').text();
                var lat = $(this).find('lat').text();
                var longi = $(this).find('longi').text();
                var statUpdateDatetime = $(this).find('statUpdateDatetime').text();
    
                elem += `<li>`;
    
                elem += `<div class="adress">`;
                elem += `<div class="firsts">`;
                elem += `<p>주소 : <strong>${addr}</strong></p>`;
                elem += `<div class="arrow">`;
                elem += `<i class="fa-solid fa-angle-down"></i>`;
                elem += `</p>`;
                elem += `</div>`;
                elem += `</div>`;
                elem += `<div class="colors">`;
                switch (cpStat) 
            {
                case '1': elem += `<p>충전기 상태 : <span style="color:green;font-weight: 600" >충전가능 <i class="fa-solid fa-bolt"></i></span></p>`; break;
                case '2': elem += `<p>충전기 상태 : <span style="color:red;font-weight: 600">충전중 <i class="fa-solid fa-bolt"></i></p>`; break;
                case '3': elem += `<p>충전기 상태 : <span style="color: rgb(222, 222, 0);font-weight: 600">고장/점검 <i class="fa-solid fa-bolt"></i></span></p>`; break;
                case '4': elem += `<p>충전기 상태 : <span style="color:red;font-weight: 600">통신장애 <i class="fa-solid fa-bolt"></i></span></p>`; break;
                case '5': elem += `<p>충전기 상태 : <span style="color:red;font-weight: 600">통신미연결 <i class="fa-solid fa-bolt"></i></span></p>`;break;
            }
    
                elem += `</p>`;
                elem += `</div>`;
    
                switch (chargeTp) {
                    case '1':
                        elem += `<p>충전기타입 : 완속</p>`;
                        break;
                    case '2':
                        elem += `<p>충전기타입 : 급속</p>`;
                        break;
                }
    
                switch (cpTp) {
                    case '1':
                        elem += `<p>충전방식 : B타입(5핀)</p>`;
                        break;
                    case '2':
                        elem += `<p>충전방식 : C타입(5핀)</p>`;
                        break;
                    case '3':
                        elem += `<p>충전방식 : BC타입(5핀)</p>`;
                        break;
                    case '4':
                        elem += `<p>충전방식 : BC타입(7핀)</p>`;
                        break;
                    case '5':
                        elem += `<p>충전방식 : DC차데모</p>`;
                        break;
                    case '6':
                        elem += `<p>충전방식 : AC3상</p>`;
                        break;
                    case '7':
                        elem += `<p>충전방식 : DC콤보</p>`;
                        break;
                    case '8':
                        elem += `<p>충전방식 : DC차데모+DC콤보</p>`;
                        break;
                    case '9':
                        elem += `<p>충전방식 : DC차데모+AC3상</p>`;
                        break;
                    case '10':
                        elem += `<p>충전방식 : DC차데모+DC콤보+AC3상</p>`;
                        break;
                }
    
                elem += `<div class="hide">`
                elem += `<p>충전기 ID : ${cpId}</p>`;
                elem += `<p>충전기명칭 :  ${cpNm}</p>`;
                elem += `<p>충전소ID : ${csId}</p>`;
                elem += `<p>충전소 명칭 : ${csNm}</p>`;
                elem += `<p>충전기상태 갱신 시각 : ${statUpdateDatetime}</p>`;
                elem += `<iframe class="map" frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=${lat},${longi}&amp;key=AIzaSyBvJ_OC7o2tQfl9tKh6H0nNQhU-GAoYp3c"></iframe>`
                elem += `</div>`
                elem += `</div>`;
                elem += `</li>`;
            })
        }

        elem += `</ul>`;

        elem += `<div class="page">`;

        if (startPage > 10) 
        {
            elem += `<span class="prev"><i class="fa-solid fa-angles-left"></i></span>`;
        }

        elem += `<span>`

        for (let i = startPage; i <= tenCount && i <= startPage + 9; i++) 
        {
            if (pno == i) 
            {
                elem += `<a href="${i}" class="on"> ${i} </a>`
            } 
            else 
            {
                elem += `<a href="${i}"> ${i} </a>`
            }
        }

        if (tenCount >= 2 && tenCount > startPage + 9) {
            elem += `<span class="next"><i class="fa-solid fa-angles-right"></i></span>`
        }

        elem += `</span>`
        elem += `</div>`;
        isRun = false;

        $('#Content').append(elem);
    }

    function search(page_num, num) 
    {
        $('#Content .List, #Content .page').remove();
        click_flag = false;

        if (num == 1) 
        {
            api_data(sido, page_num, rows)
        }
         else if (num == 2) 
         {
            api_data_2(sido, 1, 3000, 1);
        }
    }

    $('#Content').on('click', '.page a', function () 
    {
        var pno = $(this).attr('href')
        $(this).addClass('on').siblings().removeClass('on')
        var checked = $('input:radio[name=charger]:checked').val();

        switch (checked) 
        {
            case 'all':
                search(pno, 1);
                break;
            case 'fast':
                $('#Content .List, #Content .page').remove();
                api_data_2(sido,  1, 3000, pno);
                break;
            case 'slow':
                $('#Content .List, #Content .page').remove();
                api_data_2(sido,  1, 3000, pno);
                break;
        }

        return false
    })

    // 이전버튼 
    $('#Content').on('click', '.page .prev', function () {
        if (startPage > 10) 
        {
            startPage -= 10
        }

        var checked = $('input:radio[name=charger]:checked').val();

        switch (checked) 
        {
            case 'all':
                search(startPage, 1);
                break;
            case 'fast':
                $('#Content .List, #Content .page').remove();
                api_data_2(sido,  1, 3000, startPage);
                break;
            case 'slow':
                $('#Content .List, #Content .page').remove();
                api_data_2(sido,  1, 3000, startPage);
                break;
        }
    })

    // 다음버튼 
    $('#Content').on('click', '.page .next', function () {
        if (startPage < totalCount) 
        {
            startPage += 10
        }

        var checked = $('input:radio[name=charger]:checked').val();

        switch (checked) 
        {
            case 'all':
                search(startPage, 1);
                break;
            case 'fast':
                $('#Content .List, #Content .page').remove();
                api_data_2(sido,  1, 3000, startPage);
                break;
            case 'slow':
                $('#Content .List, #Content .page').remove();
                api_data_2(sido,  1, 3000, startPage);
                break;
        }
    })

    function Loding() 
    {
        var elem =
            `<div class='battery'>
            <div class="outer">
                <div class="inner"></div>
                <div class="inner"></div>
                <div class="inner"></div>
                <div class="inner"></div>
            </div>
            <div class="text">
                Loading...
            </div>
        </div>`
        $('#Content').append(elem);
    }

    function change(city, opt) {
        $(`#select_list_2 option`).remove();

        if (opt == '' || opt == '전체') {
            var option = $(`<option value='전체}'>전체</option>`);

            $(`#select_list_2`).append(option);
        } else {
            for (let i = 0; i < city[opt].length; i++) {
                var option = $(`<option value='${city[opt][i]}'>${city[opt][i]}</option>`);

                $(`#select_list_2`).append(option);
            }
        }
    }

    $('#select_list_1').on('change', function () {
        opt = $(this).find('option:selected').val()
        sido = opt;

        if (opt == '전체') {
            opt = '';
            sido = '';
        }

        opt_2 = '';

        change(sidos, sido);
    })

    $('#select_list_2').on('change', function () {
        opt_2 = $(this).find('option:selected').val();

        if (opt_2 == '전체') {
            opt_2 = '';
        }

        sido = opt + ' ' + opt_2;
    })

    $('.select_box .btn button').on('click', function () {
        startPage = 1;

        checked_all();
        search(startPage, 1);
    })

    function checked_all()
    {
        $("input:radio[name='charger']").each(function() {

            if($(this).val() == 'all')
            {
                $(this).prop("checked", true);
            }
            else
            {
                $(this).prop("checked", false);
            }
        });
    }
 
    $('#num_box').on('change', function () 
    {
        rows = $(this).find('option:selected').val();
        startPage = 1;
        var checked = $('input:radio[name=charger]:checked').val();
        // checked_all();
        switch (checked) 
        {
            case 'all':
                search(1, 1);
                break;
            case 'fast':
                $('#Content .List, #Content .page').remove();
                api_data_2(sido,  1, 3000, startPage);
                break;
            case 'slow':
                $('#Content .List, #Content .page').remove();
                api_data_2(sido,  1, 3000, startPage);
                break;
        }
    })

    $("input:radio[name=charger]").click(function () 
    {
        charger = $(this).val();
        
        switch (charger) 
        {
            case 'all':
                charger = '';
                break;
            case 'fast':
                charger = '급속';
                break;
            case 'slow':
                charger = '완속';
                break;
        }
        startPage = 1;

        search(startPage, 2);
    })

    $("#li4 #Content").on('click', '.List li', function () {
        last = $(this).index();

        if ($(this).hasClass('on')) 
        {
            $(this).removeClass('on');
            click_flag = false;
        } 
        else 
        {
            $(this).addClass('on').siblings().removeClass('on');

            if (click_flag) 
            {
                if (first >= last) 
                {
                    var offset = $(this).offset();
                    $('html, body').animate({
                        scrollTop: offset.top - 10
                    }, 500);
                } 
                else 
                {
                    var offset = $(this).offset();
                    $('html, body').animate({
                        scrollTop: offset.top - 610
                    }, 500);
                }
            } 
            else 
            {
                var offset = $(this).offset();
                $('html, body').animate({
                    scrollTop: offset.top - 10
                }, 500);
            }

            first = last;
            click_flag = true;
        }
    })
}

export default api_data
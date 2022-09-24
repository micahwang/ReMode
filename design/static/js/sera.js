window.onload = function () {
    //清空select的value
    document.querySelector('div.select>select').value = ''

    /**
     * 点击自定义的select框开启或收回选择框
     */
    document.querySelector('div.select-head').onclick = function () {
        //清空输入框内容
        document.querySelector('div.search-input>input').value = ''

        document.querySelectorAll('div.value-body>li').forEach( function(element, index) {
            if (element.classList.contains('active')) {
                element.classList = 'active'
            }else {
                element.classList = ''
            }
        });

        document.querySelector('div.value-body>div').classList = 'none'

        var select_body = document.querySelector('div.select-body')
        if (select_body.style.display == 'block') 
            select_body.style.display = 'none'
        else 
            select_body.style.display = 'block'
    };

    /**
     * 点击空白处关闭select框
     */
    document.onclick = function (argument) {
        if(!argument.target.classList.contains('s')){
            var select_body = document.querySelector('div.select-body')
            if (select_body.style.display == 'block') 
                select_body.style.display = 'none'
        }
    }

    /**
     * 自定义的select的选值功能
     */
    document.querySelectorAll('div.value-body>li').forEach( function(element, index) {
        element.onclick = function () {
            //初始化下样式
            document.querySelectorAll('div.value-body>li').forEach( function(element, index) {
                element.classList = ''
            });
            element.classList = 'active'
            //更新select框的value和自定义的select框的value
            var data_value = element.getAttribute('data-value')
            var select_head_span = document.querySelector('div.select-head>span')
            document.querySelector('div.select>select').value = data_value
            select_head_span.innerHTML = data_value
            if(!select_head_span.classList.contains('fill'))
                select_head_span.classList = 'fill'

            //关闭select-body
            document.querySelector('div.select-body').style.display = 'none'
        }
    });

    /**
     * 搜素功能实现
     */
    document.querySelector('div.search-input>input').oninput = function () {
        var input_value = document.querySelector('div.search-input>input').value
        if(input_value == '') {
            document.querySelectorAll('div.value-body>li').forEach( function(element, index) {
                if (element.classList.contains('active')) {
                    element.classList = 'active'
                }else {
                    element.classList = ''
                }
            });
        }else{
            document.querySelectorAll('div.value-body>li').forEach( function(element, index) {
                if(element.getAttribute('data-value').indexOf(input_value) == -1){
                        if (element.classList.contains('active')) {
                            element.classList += ' none'
                        }else {
                            element.classList = 'none'
                        }
                }else {
                    if(element.classList.contains('none')) {
                        document.querySelectorAll('div.value-body>li').forEach( function(element, index) {
                            if (element.classList.contains('active')) {
                                element.classList = 'active'
                            }else {
                                element.classList = ''
                            }
                        });
                    }
                }
            });
        }
        //记一下结果数量
        var length = 0
        document.querySelectorAll('div.value-body>li').forEach( function(element, index) {
            if (!element.classList.contains('none')) length++
        });
        
        if (length == 0) {
            document.querySelector('div.value-body>div').classList = ''
        }else{
            document.querySelector('div.value-body>div').classList = 'none'
        }
    }
};
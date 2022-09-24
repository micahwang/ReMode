$(document).ready(function () {
   $("#basic-table").DataTable({
            // 表下方页脚的类型，具体类别比较到，见[官网](https://datatables.net/examples/basic_init/alt_pagination.html)
            "pagingType": "simple_numbers",
            //启动搜索框
            searching: true,
            destroy : true,
            // 保存刷新时原表的状态
            stateSave: true,
            // 此处重要，该data就是dataTables要展示的数据.users即为后台传递过来的数据
            data: {{ queuers | safe }},
            columns: [
                {data: 'ID',},
                {data: 'State'}
            ]
        })
    });
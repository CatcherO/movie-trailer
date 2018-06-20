module.exports = `
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport" content="width=device-width, initial-scale=1.0")
        link(href="https://cdn.bootcss.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet")
        script(src="https://cdn.bootcss.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js")
        script(src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js")
        title Koa Server HTML
    body
        .container
            .row
                .col-md-8
                    h1 Hi #{me}
                    p This is #{you}
                .col-md-4
                    p 测试静态 HTML 页面
` 
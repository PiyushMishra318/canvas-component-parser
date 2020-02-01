const fs = require("fs");
var boilerplate = fs.readFileSync(__dirname + "/boilerplate.html", {
  encoding: "utf8"
});

// default JSON

const newFormat = [
  {
    elementID: "d4c357c0-5716-4e70-bb32-8a43451468bc",
    html: `<nav rold="navigation"> <button id = "menu-toggle"> <i class= "material-icons" id= "menu-icon-normal">menu</i><i class="material-icons" id="menu-icon-close">close</i> <span class="text-fallback">Menu</span> </button > <ul id="menu"></ul> </nav >`,
    styles: [
      `<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/0.5.0/modern-normalize.min.css">`,
      `<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css">`,
      `<style>
            button {
                -webkit-appearance: none !important;
                    -moz-appearance: none !important;
                        appearance: none !important;
                cursor: pointer;
                }

                nav {
                background: #333;
                }

                .enhanced .text-fallback {
                display: none !important;
                }
                .enhanced .text-fallback:before, .enhanced .text-fallback:after {
                display: none !important;
                }
                .enhanced #menu {
                display: none;
                }
                .enhanced #menu.open {
                max-height: 20em;
                }

                #menu-toggle {
                border: none !important;
                background: transparent !important;
                color: white;
                height: 100%;
                line-height: 0 !important;
                vertical-align: middle !important;
                height: 3em;
                width: 3em;
                -webkit-transition: all 180ms;
                transition: all 180ms;
                }
                #menu-toggle .material-icons {
                font-size: 2em;
                vertical-align: middle;
                text-align: center;
                margin: 0 auto;
                }
                #menu-toggle #menu-icon-normal {
                display: block;
                }
                #menu-toggle:hover {
                color: lightgray;
                }
                #menu-toggle:active {
                opacity: 0.25;
                -webkit-transform: scale(0.9);
                        transform: scale(0.9);
                }
                #menu-toggle:focus {
                outline: none !important;
                }
                #menu-toggle.open #menu-icon-close {
                display: block;
                }
                #menu-toggle.open #menu-icon-normal {
                display: none;
                }

                #menu-icon-close {
                display: none;
                }

                #menu {
                list-style: none !important;
                }
                #menu li {
                list-style: none !important;
                }
                #menu a {
                text-decoration: none !important;
                color: white;
                display: block;
                width: 100% !important;
                height: 100% !important;
                padding: 1em;
                }
                #menu a:hover {
                background: #000;
                }

                @media (min-width: 600px) {
                #menu-toggle {
                    display: none;
                }

                #menu {
                    display: block !important;
                }
                #menu li {
                    display: inline-block;
                }
                }
                h1 {
                line-height: 2;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                margin-left: auto;
                margin-top: 2em;
                margin-right: auto;
                color: cornflowerblue;
                }

                main {
                padding: 2em;
                }
        </style>`
    ],
    scripts: [
      `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>`,
      `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`,
      `<script>
                $(document).ready(function () {
                  axios.get("http://127.0.0.1:3000/get/navs").then((res) => {
                    res.data.forEach((data) => {
                      var node = document.createElement("LI");
                      var a = document.createElement("A");
                      var textnode = document.createTextNode(data.name);         
                      a.appendChild(textnode);
                      node.appendChild(a);
                      document.getElementById("menu").appendChild(node);
                    })
                  })
                    // Make sure the browser understands js
                    // Prefix all classes related to js with
                    //.enhanced to ensure progressive
                    // enhancement
                    $("html").addClass("enhanced");

                    var $nav = $("#menu");
                    var $navToggle = $("#menu-toggle");

                    if ($navToggle) {
                        $navToggle.on("click", function () {
                            $nav.slideToggle("fast");
                            $(this).toggleClass("open");
                        });
                    }
                });
            </script>
        `
    ],
    style: {
      css: {
        height: "100%",
        width: "100%"
      },
      hover: {},
      focus: {}
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    elementID: "bc848a7a-813c-4fdc-a2f5-60552216155c",
    style: {
      css: {
        height: "100%",
        width: "100%"
      },
      hover: {},
      focus: {}
    },
    position: {
      x: 100,
      y: 0
    },
    html: `<h1>Incredibly Basic Slider</h1>
            <div id="slider">
            <a href="#" class="control_next">>></a>
            <a href="#" class="control_prev"><</a>
            <ul>
            </ul>  
            </div>

            <div class="slider_option">
            <input type="checkbox" id="checkbox">
            <label for="checkbox">Autoplay Slider</label>
            </div> `,
    styles: [
      `<style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300,600);	
            html {
            border-top: 5px solid #fff;
            background: #58DDAF;
            color: #2a2a2a;
            }

            html, body {
            margin: 0;
            padding: 0;
            font-family: 'Open Sans';
            }

            h1 {
            color: #fff;
            text-align: center;
            font-weight: 300;
            }

            #slider {
            position: relative;
            overflow: hidden;
            margin: 20px auto 0 auto;
            border-radius: 4px;
            }

            #slider ul {
            position: relative;
            margin: 0;
            padding: 0;
            height: 200px;
            list-style: none;
            }

            #slider ul li {
            position: relative;
            display: block;
            float: left;
            margin: 0;
            padding: 0;
            width: 500px;
            height: 300px;
            background: #ccc;
            text-align: center;
            line-height: 300px;
            }

            a.control_prev, a.control_next {
            position: absolute;
            top: 40%;
            z-index: 999;
            display: block;
            padding: 4% 3%;
            width: auto;
            height: auto;
            background: #2a2a2a;
            color: #fff;
            text-decoration: none;
            font-weight: 600;
            font-size: 18px;
            opacity: 0.8;
            cursor: pointer;
            }

            a.control_prev:hover, a.control_next:hover {
            opacity: 1;
            -webkit-transition: all 0.2s ease;
            }

            a.control_prev {
            border-radius: 0 2px 2px 0;
            }

            a.control_next {
            right: 0;
            border-radius: 2px 0 0 2px;
            }

            .slider_option {
            position: relative;
            margin: 10px auto;
            width: 160px;
            font-size: 18px;
            }</style>`
    ],
    scripts: [
      `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>`,
      `<script>
      jQuery(document).ready(function ($) {
        axios.get("http://127.0.0.1:3000/get/navs").then((res) => {
          var count = 0
                    res.data.forEach((data) => {
                      var node = document.createElement("LI");
                      var textnode = document.createTextNode(count++ +" " + data.name);
                      node.appendChild(textnode);
                      $('#slider ul')[0].appendChild(node);
                    })
                    $('#checkbox').change(function(){
                setInterval(function () {
                    moveRight();
                }, 3000);
            });
            
                var slideCount = $('#slider ul li').length;
                var slideWidth = $('#slider ul li').width();
                var slideHeight = $('#slider ul li').height();
                var sliderUlWidth = slideCount * slideWidth;
                
                $('#slider').css({ width: slideWidth, height: slideHeight });
                
                $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
                
                $('#slider ul li:last-child').prependTo('#slider ul');

                function moveLeft() {
                    $('#slider ul').animate({
                        left: + slideWidth
                    }, 200, function () {
                        $('#slider ul li:last-child').prependTo('#slider ul');
                        $('#slider ul').css('left', '');
                    });
                };

                function moveRight() {
                    $('#slider ul').animate({
                        left: - slideWidth
                    }, 200, function () {
                        $('#slider ul li:first-child').appendTo('#slider ul');
                        $('#slider ul').css('left', '');
                    });
                };

                $('a.control_prev').click(function () {
                    moveLeft();
                });

                $('a.control_next').click(function () {
                    moveRight();
                });

            });
                  })
            </script>`
    ]
  }
];

const jsonFormat = {
  elementID: "d4c357c0-5716-4e70-bb32-8a43451468bc",
  style: {
    css: {},
    hover: {},
    focus: {}
  },
  position: {
    x: 100,
    y: 100
  },
  scripts: [
    "<script crossorigin src = `https://unpkg.com/react@16/umd/react.development.js`></script>",
    "<script crossorigin src=`https://unpkg.com/react-dom@16/umd/react-dom.development.js`></script>",
    "<script src=`https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js`></script>",
    "<script src=`https://unpkg.com/react-router-dom/umd/react-router-dom.min.js`></script>"
  ]
};

//support functions

const addScripts = (json, final_script) => {
  if (final_script.includes(`<body style="position:relative">`)) {
    var breakpoints = final_script.split(`<body style="position:relative">`);
  } else {
    var breakpoints = final_script.split("<body>");
  }
  breakpoints[0] += `<body style="position:relative">\n<div id="${
    json.elementID
  }">${json.html || ""}\n</div>\n`;
  json.scripts.forEach(script => {
    breakpoints[0] += `${script}\n`;
  });
  return `${breakpoints[0] + breakpoints[1]}`;
};

const generateMainCSS = json => {
  var basic_style_start = `<style>\n#${json.elementID}{\n`;
  var basic_style_end = "}\n";
  var basic_main_style = "";
  var position = `position:absolute;\ntop:${json.position.x}px;\nleft:${json.position.y}px;\n`;
  for (var key in json.style.css) {
    if (json.style.css.hasOwnProperty(key)) {
      basic_main_style += `${key}:${json.style.css[key]};\n`;
    }
  }
  return `${basic_style_start}${position}${basic_main_style}${basic_style_end}`;
};

const generateHoverCSS = json => {
  var basic_style_start = `#${json.elementID}:hover{\n`;
  var basic_style_end = "}\n";
  var basic_hover_style = "";
  for (var key in json.style.hover) {
    if (json.style.hover.hasOwnProperty(key)) {
      basic_hover_style += `${key}:${json.style.hover[key]};\n`;
    }
  }
  return `${basic_style_start}${basic_hover_style}${basic_style_end}`;
};

const generateFocusCSS = json => {
  var basic_style_start = `#${json.elementID}:hover{\n`;
  var basic_style_end = "}\n";
  var basic_focus_style = "";
  for (var key in json.style.focus) {
    if (json.style.focus.hasOwnProperty(key)) {
      basic_focus_style += `${key}:${json.style.focus[key]};\n`;
    }
  }
  return `${basic_style_start}${basic_focus_style}${basic_style_end}`;
};

const importStyleSheets = (json, html) => {
  var breakpoints = html.split("</head>");
  breakpoints[1] = `</head>\n` + breakpoints[1];
  json.styles.forEach(style => {
    breakpoints[0] += `${style}`;
  });
  return `${breakpoints[0]}${breakpoints[1]}`;
};

const addStyles = (json, script_html) => {
  var breakpoints = script_html.split("</head>");
  breakpoints[1] = `</head>\n` + breakpoints[1];
  var css_styles = generateMainCSS(json);
  var hover_styles = generateHoverCSS(json);
  var focus_styles = generateFocusCSS(json);
  return `${breakpoints[0]}${css_styles}${hover_styles}${focus_styles}</style>\n${breakpoints[1]}`;
};

// main function

const parser = (json_list = newFormat) => {
  var final_html = boilerplate;
  json_list.forEach(json => {
    if (json.scripts) var script_html = addScripts(json, final_html);
    if (json.styles)
      var imported_styles_html = importStyleSheets(
        json,
        script_html || final_html
      );
    if (json.style)
      var style_html = addStyles(
        json,
        imported_styles_html || script_html || final_html
      );
    final_html = style_html || imported_styles_html || script_html;
  });
  return final_html;
};

module.exports = parser;

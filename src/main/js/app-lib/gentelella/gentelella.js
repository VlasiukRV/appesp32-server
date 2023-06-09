/**
* Gentelella
 *
* Gentelella Admin is a free to use Bootstrap admin template.
* This template uses the default Bootstrap 3 styles along with a variety of powerful jQuery plugins and tools to create a powerful framework for creating admin panels or back-end dashboards.
 *
* Theme uses several libraries for charts, calendar, form validation, wizard style interface, off-canvas navigation menu, text forms, date range, upload area, form autocomplete, range slider, progress bars, notifications and much more.
 *
* We would love to see how you use this awesome admin template. You can notify us about your site, app or service by tweeting to [@colorlib](https://twitter.com/colorlib). Once the list will grown long enough we will write a post similar to [this](https://colorlib.com/wp/avada-theme-examples/) to showcase the best examples.
*/



/**
 * Resize function without multiple trigger
 *
 * Usage:
 * $(window).smartresize(function(){
 *     // code here
 * });
 */
(function ($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    // smartresize
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

})(jQuery, 'smartresize');
/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

;
(function (exp) {
    if (!exp.gentelellaTheme) {
        exp.gentelellaTheme = new Object(null);
    }
    var gentelellaTheme = exp.gentelellaTheme;

    var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
        $BODY = $('body'),
        $MENU_TOGGLE = $('#menu_toggle'),
        $SIDEBAR_MENU = $('#sidebar-menu'),
        $SIDEBAR_FOOTER = $('.sidebar-footer'),
        $LEFT_COL = $('.left_col'),
        $RIGHT_COL = $('.right_col'),
        $NAV_MENU = $('.nav_menu'),
        $FOOTER = $('footer');


// Sidebar
// TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };

    // toggle small or large menu
    gentelellaTheme.init_menuBaton = function () {
        $MENU_TOGGLE.on('click', function () {
            console.log('clicked - menu toggle');

            if ($BODY.hasClass('nav-md')) {
                $SIDEBAR_MENU.find('li.active ul').hide();
                $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            } else {
                $SIDEBAR_MENU.find('li.active-sm ul').show();
                $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
            }

            $BODY.toggleClass('nav-md nav-sm');

            setContentHeight();

            $('.dataTable').each(function () {
                $(this).dataTable().fnDraw();
            });
        });
    }

    gentelellaTheme.init_panel_toolbox = function (parentElement) {
        parentElement.find('.collapse-link').on('click', function () {
            var $BOX_PANEL = $(this).closest('.x_panel'),
                $ICON = $(this).find('i'),
                $BOX_CONTENT = $BOX_PANEL.find('.x_content');

            // fix for some div with hardcoded fix class
            if ($BOX_PANEL.attr('style')) {
                $BOX_CONTENT.slideToggle(200, function () {
                    $BOX_PANEL.removeAttr('style');
                });
            } else {
                $BOX_CONTENT.slideToggle(200);
                $BOX_PANEL.css('height', 'auto');
            }

            $ICON.toggleClass('fa-chevron-up fa-chevron-down');
        });

        parentElement.find('.close-link').click(function () {
            var $BOX_PANEL = $(this).closest('.x_panel');

            $BOX_PANEL.remove();
        });

    }

    gentelellaTheme.init_sidebar_addEvent = function (parentElement) {

        parentElement.find('a').on('click', function (ev) {
            var $li = $(this).parent();

            if ($li.is('.active')) {
                $li.removeClass('active active-sm');
                $('ul:first', $li).slideUp(function () {
                    setContentHeight();
                });
            } else {
                // prevent closing menu if we are on child menu
                if (!$li.parent().is('.child_menu')) {
                    $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                    $SIDEBAR_MENU.find('li ul').slideUp();
                } else {
                    if ($BODY.is(".nav-sm")) {
                        $li.parent().find("li").removeClass("active active-sm");
                        $li.parent().find("li ul").slideUp();
                    }
                }
                $li.addClass('active');

                $('ul:first', $li).slideDown(function () {
                    setContentHeight();
                });
            }
        });

    }

    gentelellaTheme.init_sidebar = function () {

        //gentelellaTheme.init_sidebar_addEvent($SIDEBAR_MENU);


        // check active menu
        $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

        $SIDEBAR_MENU.find('a').filter(function () {
            return this.href == CURRENT_URL;
        }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
            setContentHeight();
        }).parent().addClass('active');

        // recompute content when resizing
        $(window).smartresize(function () {
            setContentHeight();
        });

        setContentHeight();

        // fixed sidebar
        if ($.fn.mCustomScrollbar) {
            $('.menu_fixed').mCustomScrollbar({
                autoHideScrollbar: true,
                theme: 'minimal',
                mouseWheel: {preventDefault: true}
            });
        }
    };
// /Sidebar

    var randNum = function () {
        return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
    };


// Panel toolbox
    $(document).ready(function () {
        $('.collapse-link').on('click', function () {
            var $BOX_PANEL = $(this).closest('.x_panel'),
                $ICON = $(this).find('i'),
                $BOX_CONTENT = $BOX_PANEL.find('.x_content');

            // fix for some div with hardcoded fix class
            if ($BOX_PANEL.attr('style')) {
                $BOX_CONTENT.slideToggle(200, function () {
                    $BOX_PANEL.removeAttr('style');
                });
            } else {
                $BOX_CONTENT.slideToggle(200);
                $BOX_PANEL.css('height', 'auto');
            }

            $ICON.toggleClass('fa-chevron-up fa-chevron-down');
        });

        $('.close-link').click(function () {
            var $BOX_PANEL = $(this).closest('.x_panel');

            $BOX_PANEL.remove();
        });
    });
// /Panel toolbox

// Tooltip
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip({
            container: 'body'
        });
    });
// /Tooltip

// Progressbar
    if ($(".progress .progress-bar")[0]) {
        $('.progress .progress-bar').progressbar();
    }
// /Progressbar

// Switchery
    $(document).ready(function () {
        if ($(".js-switch")[0]) {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
            elems.forEach(function (html) {
                var switchery = new Switchery(html, {
                    color: '#26B99A'
                });
            });
        }
    });
// /Switchery


// iCheck
    $(document).ready(function () {
        if ($("input.flat")[0]) {
            $(document).ready(function () {
                $('input.flat').iCheck({
                    checkboxClass: 'icheckbox_flat-green',
                    radioClass: 'iradio_flat-green'
                });
            });
        }
    });
// /iCheck

// Table
    $('table input').on('ifChecked', function () {
        checkState = '';
        $(this).parent().parent().parent().addClass('selected');
        countChecked();
    });
    $('table input').on('ifUnchecked', function () {
        checkState = '';
        $(this).parent().parent().parent().removeClass('selected');
        countChecked();
    });

    var checkState = '';

    $('.bulk_action input').on('ifChecked', function () {
        checkState = '';
        $(this).parent().parent().parent().addClass('selected');
        countChecked();
    });
    $('.bulk_action input').on('ifUnchecked', function () {
        checkState = '';
        $(this).parent().parent().parent().removeClass('selected');
        countChecked();
    });
    $('.bulk_action input#check-all').on('ifChecked', function () {
        checkState = 'all';
        countChecked();
    });
    $('.bulk_action input#check-all').on('ifUnchecked', function () {
        checkState = 'none';
        countChecked();
    });

    function countChecked() {
        if (checkState === 'all') {
            $(".bulk_action input[name='table_records']").iCheck('check');
        }
        if (checkState === 'none') {
            $(".bulk_action input[name='table_records']").iCheck('uncheck');
        }

        var checkCount = $(".bulk_action input[name='table_records']:checked").length;

        if (checkCount) {
            $('.column-title').hide();
            $('.bulk-actions').show();
            $('.action-cnt').html(checkCount + ' Records Selected');
        } else {
            $('.column-title').show();
            $('.bulk-actions').hide();
        }
    }


// Accordion
    $(document).ready(function () {
        $(".expand").on("click", function () {
            $(this).next().slideToggle(200);
            var $expand = $(this).find(">:first-child");

            if ($expand.text() == "+") {
                $expand.text("-");
            } else {
                $expand.text("+");
            }
        });
    });

// NProgress
    if (typeof NProgress != 'undefined') {
        $(document).ready(function () {
            NProgress.start();
        });

        $(window).load(function () {
            NProgress.done();
        });
    }


//hover and retain popover when on popover content
    var originalLeave = $.fn.popover.Constructor.prototype.leave;
    $.fn.popover.Constructor.prototype.leave = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
        var container, timeout;

        originalLeave.call(this, obj);

        if (obj.currentTarget) {
            container = $(obj.currentTarget).siblings('.popover');
            timeout = self.timeout;
            container.one('mouseenter', function () {
                //We entered the actual popover – call off the dogs
                clearTimeout(timeout);
                //Let's monitor popover content instead
                container.one('mouseleave', function () {
                    $.fn.popover.Constructor.prototype.leave.call(self, self);
                });
            });
        }
    };

    $('body').popover({
        selector: '[data-popover]',
        trigger: 'click hover',
        delay: {
            show: 50,
            hide: 400
        }
    });

    gentelellaTheme.init_GentelellaVendorsComponents = function () {
        gentelellaTheme.init_sidebar();

        // init_sparklines();
        // init_flot_chart();
        // init_wysiwyg();
        // init_InputMask();
        // init_JQVmap();
        // init_cropper();
        // init_knob();
        // init_IonRangeSlider();
        // init_ColorPicker();
        // init_TagsInput();
        // init_parsley();
        // init_daterangepicker();
        // init_daterangepicker_right();
        // init_daterangepicker_single_call();
        // init_daterangepicker_reservation();
        // init_SmartWizard();
        // init_EasyPieChart();
        // init_charts();
        // init_echarts();
        // init_morris_charts();
        // init_skycons();
        // init_select2();
        // init_validator();
        // init_DataTables();
        // init_chart_doughnut();
        // init_gauge();
        // init_PNotify();
        // init_starrr();
        // init_compose();
        // init_CustomNotification();
        // init_autosize();
        // init_autocomplete();

    }

})(window);

$(document).ready(function () {

    gentelellaTheme.init_GentelellaVendorsComponents();

});

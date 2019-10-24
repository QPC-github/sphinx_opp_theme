import "../scss/sphinx_materialdesign_theme.scss";
import "material-design-lite";
import "babel-polyfill";
import ScrollSpy from "./scrollspy";
import AdjustHeight from "./adjust-height";

$(function() {
    $('body').fadeIn(0);
    $('.page-content > blockquote:first-child').remove();
    $('table').removeAttr('border');

    const styleColorTextPrimary = () => {
        $('h1, h2, h3, h4, h5, h6, .toc-backref, .contents, .toctree-wrapper, .contents a, .toctree-wrapper a, .globaltoc a.current').addClass('mdl-color-text--primary');
    }

    function reconstructionDrawerGlobalToc() {
        const $globaltoc = $('.mdl-layout__drawer nav');
        const $lists = $globaltoc.find('li');
        $.each($lists, function(index, li) {
            const $li = $(li);
            const $linkWrapper = $('<span class="link-wrapper"></span>');
            const $link = $li.children('a');
            $li.append($linkWrapper.append($link));

            const isCurrent = $li.hasClass('current') && !$link.hasClass('current');
            const $ul = $li.children('ul');
            if ($ul.length) {
                const ulId = `globalnav-${index}`;
                $ul.attr('id', ulId);
                $ul.addClass('collapse');
                const $toggleWrapper = $('<span class="nav-toggle"></span>');
                if (isCurrent) {
                    $ul.addClass('show');
                    $toggleWrapper.addClass('show');
                } else {
                    $ul.hide();
                }

                $li.append(
                    $linkWrapper.append(
                        $toggleWrapper.append(
                            $(`<a class="mdl-button mdl-js-button mdl-button--icon" data-toggle="#${ulId}"><span style="color: #888"><i class="material-icons">keyboard_arrow_down</i></span></span>`)
                        )
                    )
                ).append($ul);
            }
        });
    }

    function collapse() {
        $('.mdl-layout__drawer nav .nav-toggle a').click(function() {
            const $toggle = $(this);
            const id = $toggle.attr('data-toggle');
            $(`ul${id}`).toggleClass('show').animate({height: "toggle", opacity: "toggle"});
            $toggle.parent().toggleClass('show');
        });
    }

    function quickSearchClickEvent() {
        const $breadcrumb = $('.breadcrumb');

        $('#waterfall-exp').focus(() => {
            if ($(window).width() <= 1024) {
                $breadcrumb.hide();
            }
        }).blur(() => {
            if ($(window).width() <= 1024) {
                $breadcrumb.show();
            }
        });
    }

    styleColorTextPrimary();
    reconstructionDrawerGlobalToc();
    collapse();
    quickSearchClickEvent();

    const spy = new ScrollSpy({
        contentSelector: '.page-content .section',
        navSelector: '.localtoc a',
        scrollSelector: 'main' ,
        className: 'current',
        offsetTop: 64});

    const adjust = new AdjustHeight();

    $('.mdl-layout__content').focus();

    $('.mx-card').each(function(){
        $(this).addClass('mdl-card mdl-shadow--2dp');
    });
    $('.mx-card .mx-card-title').each(function(){
        $(this).addClass('mdl-card__title');
    });
    $('.mx-card .mx-card-text').each(function(){
        $(this).addClass('mdl-card__supporting-text');
    });
    $('.mx-card-link').each(function(){
        $(this).hide();
    });
    $('.mdl-card').each(function(){
        $(this).click(function() {
            var url = $(this).find('.mx-card-link').text();
            if (url) {
                window.location = url;
            }
            return true;
        });
    });

});

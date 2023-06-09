const html = document.documentElement
const body = document.body
const pageWrapper = document.querySelector('.page')
const header = document.querySelector('.header')
const firstScreen = document.querySelector('[data-observ]')
const burgerButton = document.querySelector('.icon-menu')
const menu = document.querySelector('.menu')
const lockPaddingElements = document.querySelectorAll('[data-lp]')


/*
* Универсальная функция для блокировки скрола при открытии модальных окон
* При открытии модального окна вызываем: toggleBodyLock(true)
* При закрытии окна вызываем: toggleBodyLock(false)

* lockPaddingElements - это коллекция элементов с фиксированной позицией
* В html таким элементам нужно дать атрибут [data-lp] 
*/
const toggleBodyLock = (isLock) => {
  FLS(`Попап ${isLock ? 'открыт' : 'закрыт'}`)
  const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth

  setTimeout(() => {
    if (lockPaddingElements) {
      lockPaddingElements.forEach((element) => {
        element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
      })
    }
  
    body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
    body.classList.toggle('lock', isLock)
  }, isLock ? 0 : 0)
}
// logger (Full Logging System) =================================================================================================================
function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений =================================================================================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp'
    html.classList.add(className)

    FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  })
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// Функция для фиксированной шапки при скролле =================================================================================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Универсальная функция для открытия и закрытия попапо =================================================================================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      )

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
        })
      }

      popup.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg')

      popup.classList.remove('_is-open')
      toggleBodyLock(false)
    }
  })
}

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
const menuInit = () => {
  if (burgerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}
const menuOpen = () => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = () => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}



headerFixed()
isWebp()

//плавные якоря
// $('a[href^="#"]').on("click", function (e) {
//     let anchor = $(this);
//     $('html, body').stop().animate({
//         scrollTop: $(anchor.attr("href")).offset().top
//     }, 1000);
//     e.preventDefault();
// });

document.addEventListener('DOMContentLoaded', function () {

    togglePopupWindows()
    if(document.querySelector('.hits-box') !== null) {
    }

    if(document.querySelector('.hits-box') !== null) {
        let sliders = document.querySelectorAll('.hits-box')

        sliders.forEach(el => {
            let arrowRight = el.parentNode.querySelector('.hits__arrow.right'),
                arrowLeft = el.parentNode.querySelector('.hits__arrow.left'),
                itemsLength = el.querySelectorAll('.hits__item').length
            $(el).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                touchMove: false,
                prevArrow: arrowLeft,
                nextArrow: arrowRight,
                speed: 300,
                onAfterChange: function (slide, index) {
                    if (index <= 0) {
                        alert("Первый слайд!");
                    }
                    if (itemsLength >= index) {
                        alert("Последний слайд!");
                    }
                },
                responsive: [
                    {
                        breakpoint: 360,
                        settings: {
                            slidesToShow: 1.3,
                            touchMove: true,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1.8,
                            touchMove: true,
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2.1,
                            touchMove: true,
                        }
                    },
                    {
                        breakpoint: 1080,
                        settings: {
                            slidesToShow: 3,
                            touchMove: true,
                        }
                    },
                ]
            });
            $(el).on('afterChange', function(slide, index){
                if (index.currentSlide <= 0) {
                    arrowLeft.classList.add('hide')
                }else{
                    arrowLeft.classList.remove('hide')
                }
                if (itemsLength >= index) {
                    alert("Последний слайд!");
                }
            });
        })


    }
    if(document.querySelector('.hits-controllers')) {
        //сообщение при добавлении в корзину
        let basketButtons = document.querySelectorAll('.hits-controllers__basket'),
            message = document.querySelector('.header-message'),
            messageIsActive = false
        basketButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.contains('selected')
                    ? button.querySelector('span').textContent = 'В корзину'
                    : button.querySelector('span').textContent = 'В корзине'
                button.classList.toggle('selected')
                if(!messageIsActive){
                    if(!button.classList.contains('selected')) return false
                    messageIsActive = true
                    message.classList.toggle('active')
                    setTimeout(() => {
                        messageIsActive = false
                        message.classList.toggle('active')
                    }, 4000)
                }
            })
        })
    }
    if(document.querySelector('.banners') !== null) {
        $(".banners-box").slick({
            arrows: false,
            fade: true,
            autoplay: true,
            autoplaySpeed: 6000,
            dots: true,
        });
    }
    if(document.querySelector('.header-searchBx__button') !== null) {
        let catalogButton = document.querySelectorAll('.open-catalog'),
            catalog = document.querySelector('.catalog'),
            isLock = false

        catalogButton.forEach(el => {
            el.addEventListener('click', () => {
                el.classList.toggle('active')
                catalog.classList.toggle('active')
                isLock = !isLock
                toggleBodyLock(isLock)
            })
        })
    }
    if(document.querySelector('.brands') !== null) {
        if(window.innerWidth <= 480) {
            $(".brands-box").slick({
                slidesToShow: 2.1, // толкьо 1 слайд показывать одновременно
                slidesToScroll: 1, // по 1-му слайду проскролливать
                speed: 8000, // медленная смена слайдов - скорость бегущей строки
                autoplay: true, // устанавливаем автозапуск слайдера
                autoplaySpeed: 0, //делаем запуск мгновенный с загрузкой страницы
                cssEase: 'linear', // делаем анимацию однотонной при смене слайда
                arrows: false,
            });
        }
    }
    if(document.querySelector('.recently-box') !== null) {
        if(window.innerWidth <= 480) {
            $(".recently-box").slick({
                slidesToShow: 1.3,
                slidesToScroll: 1,
                arrows: false,
                infinite: false,
            });
        }
    }
    if(document.querySelector('.footer-item__title') !== null) {
        if(window.innerWidth <= 768) {
            let footerItems = document.querySelectorAll('.footer-item__title')

            footerItems.forEach(item => {
                item.addEventListener('click', () => {

                    let content = item.parentNode.querySelector('.footer-pages');

                    if(content.style.maxHeight){
                        content.style.maxHeight = null;
                        item.classList.remove('active');
                    }else{
                        document.querySelectorAll('.footer-pages').forEach(el => el.style.maxHeight = null);
                        document.querySelectorAll('.footer-item__title').forEach(el => el.classList.remove('active'));
                        content.style.maxHeight = content.scrollHeight + 'px';
                        item.classList.add('active');
                    }
                })
            })
        }
    }
    if(document.querySelector('.catalog')) {
        hideItemsCatalog()
        let catalogItems = document.querySelectorAll('.catalog__item'),
            catalogItemsContent = document.querySelectorAll('.catalog-itemBx .catalog-item'),
            backArrow = document.querySelector('.catalog-itemBx-back'),
            catalogDetailTitles = document.querySelectorAll('.catalog-detail__title')

        if(window.innerWidth <= 480) {
            catalogItems.forEach(link => link.classList.remove('active'))
            catalogItemsContent.forEach(item => item.classList.remove('visible'))
        }

        catalogItems.forEach((el, index) => {
            if(window.innerWidth > 768) {
                el.addEventListener('mouseover', () => {
                    catalogItems.forEach(link => link.classList.remove('active'))
                    el.classList.add('active')

                    catalogItemsContent.forEach(item => item.classList.remove('visible'))
                    catalogItemsContent[index].classList.add('visible')
                })
            }else{
                el.querySelector('.catalog-arrow').addEventListener('click', () => {
                    catalogItems.forEach(link => link.classList.remove('active'))
                    el.classList.add('active')

                    catalogItemsContent.forEach(item => item.classList.remove('visible'))
                    catalogItemsContent[index].classList.add('visible')
                })
            }
        })

        if(window.innerWidth <= 768) {
            let catalogPoint = document.querySelectorAll('.catalog-lists__title')

            catalogPoint.forEach(el => {
                el.addEventListener('click', () => {
                    let content = el.parentNode.querySelector('ul');

                    if(content.style.maxHeight){
                        content.style.maxHeight = null;
                        el.classList.remove('active');
                    }else{
                        document.querySelectorAll('.catalog-lists ul').forEach(el => el.style.maxHeight = null);
                        document.querySelectorAll('.catalog-lists__title').forEach(el => el.classList.remove('active'));
                        content.style.maxHeight = content.scrollHeight + 'px';
                        el.classList.add('active');
                    }
                })
            })
            catalogDetailTitles.forEach(el => {
                el.addEventListener('click', () => {
                    catalogItems.forEach(link => link.classList.remove('active'))
                    catalogItemsContent.forEach(item => item.classList.remove('visible'))
                })
            })
        }
    }

    if(document.querySelector('.product-slider')) {
        $('.product-slider').slick({
            dots: false,
            infinite: false,
            slidesToShow: 1,
            arrows: false,
            fade: true,
            swipe: false,
            responsive: [
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        swipe: true,
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 3000,
                    }
                },
            ],
            asNavFor: ".product-slider-nav",
        });
        $('.product-slider-nav').slick({
            dots: false,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: '.product-slider-nav-arrow.right',
            prevArrow: '.product-slider-nav-arrow.left',
            // variableWidth: true,
            asNavFor: ".product-slider",
            focusOnSelect: true,
        });
    }

    if (document.querySelector('.product-selectBx') !== null) {
        let wrapperSelect = document.querySelector('.product-selectBx'),
            select = document.querySelector('.product-selected'),
            options = document.querySelectorAll('.product-variants__item')

        select.addEventListener('click', () => {
            wrapperSelect.classList.toggle('active')
        })

        options.forEach(el => {
            el.addEventListener('click', () => {
                select.textContent = el.textContent

                options.forEach(item => item.classList.remove('isSelected'))
                el.classList.add('isSelected')
                wrapperSelect.classList.toggle('active')
            })
        })
    }

    if(document.querySelector('.about-points')) {
        let aboutItem = document.querySelectorAll('.about-points__item'),
            aboutContents = document.querySelectorAll('.about-content__item')
        aboutContents[0].classList.add('active')

        aboutItem.forEach((el, index) => {
            el.addEventListener('click', () => {
                aboutItem.forEach(item => {item.classList.remove('active')})
                el.classList.add('active')
                aboutContents.forEach(item => item.classList.remove('active'))
                aboutContents[index].classList.add('active')
            })
        })
    }

    if(document.querySelector('.about-points')) {
        if(window.innerWidth <= 768) {
            $('.about-points').slick({
                dots: false,
                infinite: false,
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                variableWidth: true,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 321,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 333,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                ]
            });
        }
    }

    if(document.querySelector('.product-controllers__item')) {
        //при нажатии на В избранное, В сравнении загорается их свг
        let items = document.querySelectorAll('.product-controllers__item')
        items.forEach(el => {
            el.addEventListener('click', () => {
                el.classList.toggle('isAdd')
            })
        })
    }

    //при добавлении в корзину в разделе товаров появляется счетчик
    if(document.querySelector('.product-price-buttonBx__buy')) {
        let item = document.querySelector('.product-price-buttonBx__buy')
        item.addEventListener('click', () => {
            item.classList.toggle('active')
        })
    }

    if(document.querySelector('.controller-b')) {
        let controllersItem = document.querySelectorAll('.controller-b')
        controllersItem.forEach(el => {
            el.addEventListener('click', () => {
                el.classList.toggle('selected')
            })
        })
    }

    if(document.querySelector('img[data-fancybox="gallery"]')) {
        console.log(1)
        Fancybox.bind('[data-fancybox="gallery"]', {  });
    }

    if(document.querySelector('.instruments-box')) {
        let arrowRight = document.querySelector('.instruments-next'),
            arrowLeft = document.querySelector('.instruments-prev'),
            itemsLength = document.querySelectorAll('.instruments__item').length
        if(window.innerWidth > 768) {
            $('.instruments-box').slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                infinite: false,
                touchMove: false,
                prevArrow: arrowLeft,
                nextArrow: arrowRight,
                speed: 300,
                onAfterChange: function (slide, index) {
                    if (index <= 0) {
                        alert("Первый слайд!");
                    }
                    if (itemsLength >= index) {
                        alert("Последний слайд!");
                    }
                },
                responsive: [
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1.8,
                            touchMove: true,
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2.3,
                            touchMove: true,
                        }
                    },
                ]
            });

            $('.instruments-box').on('afterChange', function(slide, index){
                if (index.currentSlide <= 0) {
                    arrowLeft.classList.add('hide')
                }else{
                    arrowLeft.classList.remove('hide')
                }
                if (itemsLength >= index) {
                    alert("Последний слайд!");
                }
            });
        }
        if(window.innerWidth <= 768) {
            let titleItem = document.querySelectorAll('.product-list-filter__item-title')

            titleItem.forEach(item => {
                item.addEventListener('click', () => {
                    let content = item.parentNode.querySelector('.product-list-filter-wrapper')

                    if(content.style.maxHeight){
                        content.style.maxHeight = null;
                        item.classList.remove('active');
                    }else{
                        document.querySelectorAll('.faq-answerBx').forEach(el => el.style.maxHeight = null);
                        document.querySelectorAll('.faq__item').forEach(el => el.classList.remove('active'));
                        content.style.maxHeight = content.scrollHeight + 'px';
                        item.classList.add('active');
                    }

                })
            })
        }
    }

    //слайдер цены
    if(document.querySelector('.filter-range')) {
        let $range = $('.filter-range')
        let minRange = parseInt($range.attr('data-min')) ,
            maxRange = parseInt($range.attr('data-max'))
        let $inputMax = $('.filter-max'),
            $inputMin = $('.filter-min')
        $inputMin.attr('size', String(minRange).length - 1)
        $inputMax.attr('size', String(maxRange).length - 1)

        $range.slider({
            range: true,
            min: minRange,
            max: maxRange,
            values: [ minRange, maxRange  ],
            slide: function( event, ui ) {
                $inputMin.val( 'от ' + ui.values[ 0 ]);
                $inputMin.attr('size', String(ui.values[ 0 ]).length - 1)

                $inputMax.val( 'до ' + ui.values[ 1 ]);
                $inputMax.attr('size', String(ui.values[ 1 ]).length - 1)
            }
        });

        let handleForMin = (e) => {
            let count = parseInt($inputMin.val().replace(/\D+/g,""))

            if(!isNaN(count) && count >= minRange) {
                $range.slider( "values", 0, count )
            }else{
                count = minRange
                $range.slider( "values", 0, `${minRange}` )
                $inputMin.val(`от ${minRange}`)
            }

            $inputMin.attr('size', String(count).length - 1)
        }

        let handleForMax = (e) => {
            let count = parseInt($inputMax.val().replace(/\D+/g,""))


            if(!isNaN(count) && count <= maxRange && count > minRange) {
                $range.slider( "values", 1, count )
            }else{
                count = minRange
                $range.slider( "values", 1, `${minRange}` )
                $inputMax.val(`до ${minRange}`)
            }

            $inputMax.attr('size', String(count).length - 1)
        }

        $inputMin.on('keyup', (e) => {
            if(e.which === 13) handleForMin()
        })
        $inputMax.on('keyup', (e) => {
            if(e.which === 13) handleForMax()
        })
        window.addEventListener('click', (e) => {
            handleForMin()
            handleForMax()
        })
    }

    if(document.querySelector('.product-list-filter__item-formBx form.hidden')) {
        hidefilters()
    }

    if(document.querySelector('.product-list-filter-tags')) {
        if(window.innerWidth <= 768) {
            $(".product-list-filter-tags").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                infinite: false,
                variableWidth: true,
            });
        }
    }

    if(document.querySelector('.mask-phone')) {
        $('.mask-phone').mask('+7 (999) 999-99-99')
    }

    if(document.querySelector('.order')) {
        let basketCheckoutBtn = document.querySelector('.basket-detail__button'),
            orderBack = document.querySelector('.order__back'),
            basket = document.querySelector('.basket'),
            header = document.querySelector('.header'),
            headerTop = document.querySelector('.header-top'),
            crumbs = document.querySelector('.crumbs'),
            order = document.querySelector('.order'),
            customHeader = document.querySelector('.custom-header'),
            orderHits = document.querySelector('.order-hits')

        basketCheckoutBtn.addEventListener('click', () => {
            basket.classList.toggle('hide')
            header.classList.toggle('hide')
            crumbs.classList.toggle('hide')
            headerTop.classList.toggle('hide')
            orderHits.classList.toggle('hide')
            order.classList.toggle('show')
            customHeader.classList.toggle('show')
            document.querySelector('.order-stepsBx-wrapper.active .order-item-content').style.maxHeight = document.querySelector('.order-stepsBx-wrapper.active .order-item-content').scrollHeight + 'px'
            $('html, body').stop().animate({
                scrollTop: $('.custom-header').offset().top
            }, 700);
        })
        orderBack.addEventListener('click', () => {
            basket.classList.toggle('hide')
            header.classList.toggle('hide')
            headerTop.classList.toggle('hide')
            crumbs.classList.toggle('hide')
            orderHits.classList.toggle('hide')
            order.classList.toggle('show')
            customHeader.classList.toggle('show')
            $('html, body').stop().animate({
                scrollTop: $('body').offset().top
            }, 700);
        })


        let deliveryMethods = document.querySelectorAll('.order-delivery-method'),
            deliveryVariants = document.querySelectorAll('.order-delivery-variant')

        deliveryMethods.forEach((method, index) => {
            method.addEventListener('click', () => {
                deliveryVariants.forEach(el => el.classList.remove('active'))
                deliveryVariants[index].classList.add('active')
                method.closest('.order-item-content').style.maxHeight = method.closest('.order-item-content').scrollHeight + 'px'
            })
        })

        let paymentVariants = document.querySelectorAll('.order-methodBx label')
        paymentVariants.forEach(el => {
            el.addEventListener('click', () => {
                let {text: hint} = el.dataset
                el.closest('.order-stepsBx-wrapper').querySelector('.order__item-desc').textContent = hint
            })
        })

        let selectCity = document.querySelector('.order__item-select')
        selectCity.addEventListener('change', (e) => {
            e.target.value === 'Москве' ? document.querySelector('.order__item-desc-city').textContent = `Доставка по Москве`
                                        : document.querySelector('.order__item-desc-city').textContent = `Доставка по Санкт-Петербургу`
        })

        let stepsButton = document.querySelectorAll('.order-stepsBx-wrapper .order__item-button'),
            allMethodContent = document.querySelectorAll('.order-item-content')

        stepsButton.forEach(button => {
            button.addEventListener('click', () => {
                let parent = button.closest('.order-stepsBx-wrapper'),
                    numStep = parseInt(parent.dataset.step),
                    nextStepBx = document.querySelector(`.order-stepsBx-wrapper[data-step="${numStep+1}"]`),
                    nextContent = nextStepBx !== null ? nextStepBx.querySelector('.order-item-content') : null
                if(numStep + 1 < allMethodContent.length) {
                    //однуление всех значений каждого шага
                    document.querySelectorAll('.order-item-content').forEach(content => content.style.maxHeight = null)
                    document.querySelectorAll('.order-stepsBx-wrapper .order__item-button').forEach(el => el.style.display = 'none')
                    //если не последний то разворачиваем ледующий
                    if(nextContent) {
                        nextContent.style.maxHeight = nextContent.scrollHeight + 'px' // разворачиваем следующий шаг
                        nextStepBx.querySelector('.order__item-button').style.display = 'block' // показываем кнопку следующиего этапа
                        parent.classList.add('hide') // вешаем класс, чтобы показать и убрать ненужные/нужные блоки
                        nextStepBx.classList.remove('hide') // вешаем класс, чтобы показать и убрать ненужные/нужные блоки
                        setTimeout(() => {
                            nextStepBx.querySelector('.order__item-button').style.opacity = '1'
                        }, 600)
                        if(numStep === 0) {
                            document.querySelector('.order__item-selectBx').style.display = 'none' // если перешли от первого шага, то скрываем select
                        }
                    }
                }

            })
        })

        //кнопки Изменить
        let buttonsChange = document.querySelectorAll('.order__item-change')
        buttonsChange.forEach(el => {
            el.addEventListener('click', () => {
                let parent = el.closest('.order-stepsBx-wrapper'),
                    numStep = parseInt(parent.dataset.step),
                    currentContent = parent !== null ? parent.querySelector('.order-item-content') : null
                if(numStep + 1 < allMethodContent.length) {
                    //однуление всех значений каждого шага
                    document.querySelectorAll('.order-item-content').forEach(content => content.style.maxHeight = null)
                    document.querySelectorAll('.order-stepsBx-wrapper').forEach(el => {
                        el.classList.add('hide')
                        if(el.querySelector('.order__item-selectBx')) {
                            el.querySelector('.order__item-selectBx').style.display = 'none';
                        }
                    })
                    document.querySelectorAll('.order-stepsBx-wrapper .order__item-button').forEach(el => el.style.display = 'none')

                    //если не последний то разворачиваем ледующий
                    if(currentContent) {
                        currentContent.style.maxHeight = currentContent.scrollHeight + 'px' //разворачиваем содержимое блока
                        parent.querySelector('.order__item-button').style.display = 'block' //показываем кнопку
                        // parent.querySelector('.order__item-change').style.opacity = '1' // показывает кнопку изменить
                        parent.classList.remove('hide') //убирает и показывает скрытые элементы
                        setTimeout(() => {
                            parent.querySelector('.order__item-button').style.opacity = '1'
                        }, 600)
                        if(numStep === 0) { // если переход на первый этап, то показываем select
                            document.querySelector('.order__item-selectBx').style.display = 'block'
                        }
                    }
                }
            })
        })
    }
})

let hideItemsCatalog = (count) => {
    let more = document.querySelectorAll(`.catalog__more`);
    for (let i = 0; i < more.length; i++) {
        more[i].addEventListener('click', function() {
            let showPerClick = 3;
            let hidden = this.parentNode.querySelectorAll('li.hidden');
            for (let i = 0; i < showPerClick; i++) {
                if (!hidden[i]) return this.outerHTML = "";

                hidden[i].classList.add('flex');
            }
        });
    }
}
let hidefilters = (count) => {
    let more = document.querySelectorAll(`.product-list-filter-more`);

    for (let i = 0; i < more.length; i++) {
        more[i].addEventListener('click', function() {
            let showPerClick = 3;
            let hidden = this.parentNode.querySelectorAll('.product-list-filter__item form.hidden');
            for (let i = 0; i < showPerClick; i++) {
                if (!hidden[i]) return this.outerHTML = "";

                hidden[i].classList.remove('hidden');
            }
        });
    }
}

// =======================================================================================================

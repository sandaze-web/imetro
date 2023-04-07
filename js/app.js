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

// =======================================================================================================

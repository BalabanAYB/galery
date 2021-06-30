document.addEventListener('DOMContentLoaded', function () {
  let index
  let filter_select_el = document.getElementById('filter');
  let items_el = document.getElementById('items');

  filter_select_el.onchange = function () {
    console.log(this.value);
    let items = items_el.getElementsByClassName('about-us__card');

    for (let i = 0; i < items.length; i++) {

      if (items[i].classList.contains(this.value)) {
        items[i].style.display = 'inline-block';
      }
      else {
        items[i].style.display = 'none';
      }

    }
  }


  //document.querySelector('.event__block').style.justifyContent = 'space-between';
  document.querySelector('#button').addEventListener('click', function () {
    document.querySelectorAll('.events__card').forEach(function (btn) {
      btn.classList.toggle('is-active');

      if (btn.classList.contains('is-active')) {
        document.querySelector('#button').style.display = 'none';
        // document.querySelector('.event__block').style.justifyContent = '';
      }
      //else {
      //document.querySelector('.event__block').style.justifyContent = 'space-between';
      // }

    })
  })


  ymaps.ready(init);//Создание карты
  function init() {
    var myMap = new ymaps.Map("map", {

      center: [55.76203815560579, 37.64657320963028],
      zoom: 14
    });

    var myPlaceMark = new ymaps.Placemark([55.75846306898368, 37.601079499999905], {}, {
      iconLayout: 'default#image',
      iconImageHref: './img/map/location.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-3, -42]
    });


    myMap.geoObjects.add(myPlaceMark);
  }


  function scroll(element) {//Скролл на сайте
    $(document).ready(function () {
      $(element).on("click", "a", function (event) {
        event.preventDefault();
        let id = $(this).attr('href'),
          top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1500);
      });
    });
  };


  scroll("#menu");
  scroll("#mapLink");

  function tabs(btn, content, contentActive) {

    document.querySelectorAll(btn).forEach(function (tabsBtn) {
      tabsBtn.addEventListener('click', function (event) {
        const path = event.currentTarget.dataset.path

        document.querySelectorAll(content).forEach(function (tabContent) {
          tabContent.classList.remove(contentActive);
        })
        document.querySelectorAll(`[data-target="${path}"]`).forEach(function (tabsContent) {
          tabsContent.classList.add(contentActive)
        });
      })
    });
  };

  tabs('.tabs__btn', '.tab-content', 'tab-content-active');

  tabs('.tabs_man', '.man-content', 'man-content-active');

  function tabMan() {
    document.querySelectorAll('.tabs_man').forEach(function (manClick) {
      manClick.addEventListener('click', function () {
        document.querySelectorAll('.tabs_man').forEach(function (e) {
          e.classList.remove('man-active')
          manClick.classList.add('man-active');
        });
      });
    });
  };

  tabMan();

  //Маска на input type = 'tel'
  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  //Валидация формы
  new JustValidate('.form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      }
    }
  })

  function rectagleAdd() {
    let btn = document.querySelectorAll('.dropbtn');
    let show = document.querySelectorAll('.dropdown-content');
    let rectangle = document.querySelectorAll('.hero__header_listitem')
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', () => {
        let showOpen = show[i];
        if (showOpen.classList.contains('show')) {
          rectangle[i].classList.add('rectagle-active');
          btn[i].style.color = '#9D5CD0';
        }
        else {
          rectangle[i].classList.remove('rectagle-active');
          btn[i].style.color = '';
        }
      })
    }
  }

  rectagleAdd()


  function myFunction(id) {
    debugger;
    document.getElementById(id).classList.toggle("show");

    window.onclick = function (event) {
      if (!event.target.matches('.dropbtn')) {


        let dropdowns = document.getElementsByClassName("dropdown-content");

        let i;
        for (i = 0; i < dropdowns.length; i++) {
          let btn = document.querySelectorAll('.dropbtn');
          let openDropdown = dropdowns[i];
          let rectangle = document.querySelectorAll('.hero__header_listitem')
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            rectangle[i].classList.remove('rectagle-active');
            btn[i].style.color = 'white';
          }

        }
      }
    }
  }

  window.myFunction = myFunction;

  let arrayCarousel = [
    {
      name: carousel, //название класса карусели, //ширина картинки
      position: -3.3, // положение ленты прокрутки
      nameBtnPrev: '.prev', //класс кнопки назад
      nameBtnNext: '.next', //класс кнопки вперед
    },
    {
      name: carousel2,
      position: 0,
      nameBtnPrev: '.prev2',
      nameBtnNext: '.next2',
    },
    {
      name: banners,
      position: 0,
      nameBtnPrev: '.prev3',
      nameBtnNext: '.next3',
    },
  ];

  let arrayWidth = [
    [{ width: 20.834, count: 3 }, { width: 20.834, count: 3 }, { width: 26.042, count: 1 }],  //1920
    [{ width: 30.6643, count: 2 }, { width: 30.91544, count: 2 }, { width: 42.38282, count: 1 }],  //1024
    [{ width: 45.69, count: 2 }, { width: 42.18808, count: 2 }, { width: 39.95, count: 1 }],  //768

  ]

  function createCarousel(array) {
    if (screen.width >= 1320) {
      index = 0;
    }
    else if (screen.width <= 1320 && screen.width > 910) {
      index = 1;
    }
    else if (screen.width <= 910) {
      index = 2;
    }


    for (let i = 0; i < array.length; i++) {
      let width = arrayWidth[index][i].width;
      let count = arrayWidth[index][i].count;
      let carousel = array[i];
      let j = 1;
      for (let li of carousel.name.querySelectorAll('li')) {
        li.style.position = 'relative';
        li.insertAdjacentHTML('beforeend', `<span style="opacity:0;">${j}</span>`);
        j++;
      }

      let list = carousel.name.querySelector('ul');
      let listElems = carousel.name.querySelectorAll('li');
      carousel.name.querySelector(carousel.nameBtnPrev).onclick = function () {
        // сдвиг влево
        carousel.position += width * count;
        // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
        carousel.position = Math.min(carousel.position, 0)
        list.style.marginLeft = carousel.position + 'vw';
      };

      carousel.name.querySelector(carousel.nameBtnNext).onclick = function () {
        // сдвиг вправо
        carousel.position -= width * count;
        // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
        carousel.position = Math.max(carousel.position, -width * (listElems.length - count));
        list.style.marginLeft = carousel.position + 'vw';
      };
    }

  }
  createCarousel(arrayCarousel);
  console.log(arrayCarousel)
});

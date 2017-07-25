//data with positions in menu
//supposed to be fetched from API in real conditions
var dishes = [
    {
        title: 'Tasty pancakes',
        subtitle: 'season favourite',
        descr: "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus.",
        raiting: 4,
        img: "menu_slider_item1.jpg",
        readyIn: 40,
        id: "pancakes"
    },
    {
        title: "Jibarito Sandwitch",
        subtitle: "the best sandwitch you have ever tasted",
        descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat libero id arcu volutpat pellentesque. Praesent quis nunc ut arcu lobortis venenatis.",
        raiting: 5,
        img: "special_img.jpg",
        readyIn: 50,
        id: "sandwitch"
    },
    {
        title: "Berry pie",
        subtitle: "quis nunc ut arcu",
        descr: "Aenean pharetra pulvinar ante eget posuere. Ut volutpat interdum faucibus. Suspendisse sit amet nisi ut dui feugiat ultrices.",
        raiting: 3,
        img: "menu_slider_item3.jpg",
        readyIn: 70,
        id: "berries"
    },
    {
        title: "Fresh salad",
        subtitle: "volutpat interdum faucibus",
        descr: "Vivamus a metus et lorem efficitur blandit sit amet sit amet nisl. Maecenas placerat nunc odio.",
        raiting: 2,
        img: "menu_slider_item4.jpg",
        readyIn: 20,
        id: "salad"
    }
];

(function() {
    //Экспорт всего содержимого в теле одной функции
    var carousel = document.getElementById('slider'),
        list = carousel.querySelector('ul'),
        prev = document.getElementById('prev'),
        next = document.getElementById('next'),
        listElems = carousel.querySelectorAll('li'),

        width = 120, // ширина изображения с боковыми отступами
        carouselWidth = +((getComputedStyle(carousel)).width.slice(0,3)),
        count = Math.ceil( carouselWidth / width ), // количество отображающихся изображений
        amount = listElems.length, //общее количество изображений в списке
        position = 0, // текущий сдвиг влево

        widgetCover = document.getElementById('cover'),
        widgetContent = document.getElementById('widgContent'),
        widgetTitle = widgetContent.querySelector('h2'),
        widgetSubTitle = widgetContent.querySelector('h3'),
        widgetText = widgetContent.querySelector('p'),
        widgetRaiting = widgetContent.querySelector('.raiting'),
        widgetRaitingElems = widgetRaiting.querySelectorAll('li'),
        widgetReadyIn = document.getElementById('widgetReadyAmount'),
        widgetContentBox = widgetContent.querySelector('.widget_content-box');

    /* слайдер */
    function slide(currentPosition, clickedElem) {
        var start = Date.now(),
            timer = setInterval(function() {
                var timePassed = Date.now() - start,
                    duration = 360,
                    step = duration / width;

                if (timePassed >= duration) {
                    clearInterval(timer);
                    return;
                }

                draw(timePassed, step, currentPosition, clickedElem);
            }, 10);

        function draw(timePassed, step, currentPosition, clickedElem) {
            list.style.left = (clickedElem === next) ?
                currentPosition + (-(timePassed / step)) - 3 + 'px' :
                currentPosition + (timePassed / step) + 'px';
        }
    }

//рендеринг выбранного блюда в виджет
    function showWidgItem () {
         var clickedElemId = this.id;
        function render (elem, i, arr) {
            function animate() {
                var start = Date.now(),
                    timer = setInterval(function() {
                        var timePassed = Date.now() - start,
                            duration = 800,
                            step = duration / 1;

                        if (timePassed >= duration) {
                            clearInterval(timer);
                            return;
                        }

                        draw(timePassed, step);
                    }, 30);

                function draw(timePassed, step) {
                    widgetCover.style.opacity = timePassed / step;
                    widgetContentBox.style.opacity = timePassed / step;
                }
            }
            if (clickedElemId === arr[i].id) {
                var elemRaiting = arr[i].raiting;
                function renderRaiting (elem, i, arr) {
                    arr[i].id = i < elemRaiting ? "checked-star" : "unchecked-star";
                }
                widgetCover.style.opacity = 0;
                widgetCover.style.backgroundColor = "white";
                widgetContentBox.style.opacity = 0;
                widgetContentBox.style.opacity = 0;

                widgetCover.style.backgroundImage = "url(img/" + arr[i].img + ")";
                widgetTitle.innerHTML = arr[i].title;
                widgetSubTitle.innerHTML = arr[i].subtitle;
                widgetText.innerHTML = arr[i].descr;
                widgetReadyIn.innerHTML = arr[i].readyIn;
                widgetRaitingElems.forEach(renderRaiting);
                animate();
            }
        }

        dishes.forEach(render);
    }

//Обработчик на элемент меню
    function addEvent(elem, i, arr) {
        elem.addEventListener('click', showWidgItem, false);
    }

    next.onclick = function() {
        if (position <= ((width * count) - (width * amount))) {}
        else {
            slide(position, this);
            position -= width;
        }
    };

    prev.onclick = function() {
        if (position <= -width) {
            slide(position, this);
            position += width;
        }
    };

    listElems.forEach(addEvent);
})();




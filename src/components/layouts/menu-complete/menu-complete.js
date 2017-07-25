/**
 * Created by Дарья on 22.07.2017.
 */
(function () {
    var coversContainer = document.getElementById('cover-container');
    var frontCover = coversContainer.querySelector('#front-cover');

    function coverSlide () {
        frontCover.addEventListener('click', clickSlide, false);

        function clickSlide() {
            var nextSizeL = coversContainer.querySelector('.cover-sizeM');

            nextSizeL.className = "breakfast-cover_box cover-sizeL";
            nextSizeL.id = "front-cover";

            var nextSizeM = coversContainer.querySelector('.cover-sizeS');
            nextSizeM.className = "breakfast-cover_box cover-sizeM";

            frontCover.id = "";
            frontCover.className = "breakfast-cover_box cover-sizeS";
            frontCover = coversContainer.querySelector('#front-cover');
            frontCover.addEventListener('click', clickSlide, false);
        }
    }

    coverSlide ();
})();

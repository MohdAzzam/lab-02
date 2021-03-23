'use strict';
let AllKey = [];
function AnimalGallery(title, image_url, keyword, description, horns) {
    this.title = title;
    this.image_url = image_url;
    this.keyword = keyword;
    this.description = description;
    this.horns = horns;
    AllKey.push(this.keyword);
}
let filterArray = [];
AnimalGallery.prototype.render = function () {
    let animal = $('#photo-template').clone();
    $('main').append(animal);

    animal.find('h2').text(this.title);
    animal.find('img').attr('src', this.image_url);
    animal.find('img').attr('alt', this.description);
    animal.find('p').text(this.description);
    animal.removeAttr('id');
};
// filterArray = AllKey.filter((item, index) =>AllKey.indexOf(item) === index);
AnimalGallery.prototype.showSelectedBox = function () {
    filterArray.push(AllKey.filter((item, index) => AllKey.indexOf(item) === index));
    console.log(filterArray[19]);
    $('select option').remove();
    if (filterArray[19] !== undefined) {
        $('select').append(`<option value='default'>Filter by Keyword</option>`);
        for (let i = 0; i < filterArray[19].length; i++) {
            $('select').append(`<option value='${filterArray[19][i]}'>${filterArray[19][i]}</option>`);
        }
    }
};

$('select').change(function () {
    let keys = $('select option:selected').val();
    if (keys === 'default') {
        // $('section').remove();
        $('section').attr('id', 'photo-template');
        getAnimalData();
    } else {
        // $('section').remove();
        console.log('sssssssss');
        $('section').attr('id', 'photo-template');
        getAnimalDataByKey(keys);
    }
});
function getAnimalDataByKey(key) {

    const ajaxSetting = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-1.json', ajaxSetting).then(data => {
        let animalObj;
        data.forEach(item => {
            if (item.keyword === key) {
                animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
                // console.log(animalObj);
                animalObj.showSelectedBox();
                animalObj.render();
            }

        });
    });
}
function getAnimalData() {
    const ajaxSetting = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-1.json', ajaxSetting).then(data => {
        data.forEach(item => {
            let animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
            animalObj.showSelectedBox();
            animalObj.render();
        });
    });
}

$('document').ready(getAnimalData);


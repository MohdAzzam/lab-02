'use strict';
function AnimalGallery(title, image_url, keyword, description, horns) {
    this.title = title;
    this.image_url = image_url;
    this.keyword = keyword;
    this.description = description;
    this.horns = horns;
}

AnimalGallery.prototype.render = function () {
    let animal = $('#photo-template').clone();
    $('main').append(animal);
    $('select').append(`<option value='${this.keyword}'>${this.keyword}</option>`);
    animal.find('h2').text(this.title);
    animal.find('img').attr('src', this.image_url);
    animal.find('img').attr('alt', this.description);
    animal.find('p').text(this.description);
    animal.removeAttr('id');
};

$('select').change(function () {
    let keys = $('select option:selected').val();
    if (keys === 'default') {
        // $('section').remove();
        $('section').attr('id','photo-template');
        getAnimalData();
    } else {
        // $('section').remove();
        console.log('sssssssss');
        $('section').attr('id','photo-template');
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
            if(item.keyword===key){
                animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
                // console.log(animalObj);
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
            animalObj.render();
        });
    });
}

$('document').ready(getAnimalData);


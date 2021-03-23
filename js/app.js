'use strict';
let newArr = [];
function AnimalGallery(title, image_url, keyword, description, horns) {
    this.title = title;
    this.image_url = image_url;
    this.keyword = keyword;
    this.description = description;
    this.horns = horns;
}
// function AnimalGallery(dataObj){
//     for(let key in dataObj){
//         this[key]=dataObj[key];
//     }
// }
AnimalGallery.prototype.render = function () {
    let template = $('#mustache-template').html();
    let html = Mustache.render(template, this);
    $('main').append(html);
    let selectop = $('<option></option>').text(this.keyword);
    selectop.attr('value', this.keyword);
    $('header select').attr('id', 'title');
    if (!(newArr.includes(this.keyword))) {
        newArr.push(this.keyword);
        $('#title').append(selectop);
    }
};

let select = $(`<select id='filter'>
            <option value='fil'>Filter</option>   
             <option value='alpha'>A-Z</option>   
             <option value='horn'>Horn</option>   
             </select>`);
$('main').append(select);
$('header select').change(function () {
    let keys = $('select option:selected').val();
    if (keys === 'default') {
        // $('section').remove();
        $('.container').empty();
        $('section').attr('id', 'photo-template');
        getAnimalData();
        getSecoundPageData();
    } else {
        // $('section').remove();
        console.log('sssssssss');
        $('.container').empty();
        $('section').attr('id', 'photo-template');
        getAnimalDataByKey(keys);
        getSecoundPageDataByKey(keys);
    }
});
$('#filter').change(function () {
    let keyz = $('#filter option:selected').val();
    if (keyz === 'alpha') {
        console.log('alpha');
        $('section').attr('id', 'photo-template');
        sortAnimal(keyz);
    } else if (keyz === 'horn') {
        $('section').attr('id', 'photo-template');
        console.log('horn');
        sortAnimal(keyz);

    }
});

const ajaxSetting = {
    method: 'get',
    dataType: 'json'
};
function sortAnimal(key) {
    $('.container').empty();
    $.ajax('data/page-1.json', ajaxSetting).then(data => {
        if (key === 'alpha') {
            data.sort((a, b) => {
                return a.title.charCodeAt() - b.title.charCodeAt();
            });
            data.forEach(item => {
                let animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
                animalObj.render();
            });
        } else if (key === 'horn') {
            data.sort((a, b) => {
                return a.horns - b.horns;
            });
            console.log(data);
            data.forEach(item => {
                let animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
                animalObj.render();
            });
        }
    });
}
function getAnimalDataByKey(key) {
    $('.container').empty();
    $.ajax('data/page-1.json', ajaxSetting).then(data => {
        let animalObj;
        data.sort((a, b) => {
            return a.title.charCodeAt() - b.title.charCodeAt();
        });
        data.forEach(item => {
            if (item.keyword === key) {
                animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
                // console.log(animalObj);
                animalObj.render();
            }
        });
    });
}

function getSecoundPageDataByKey(key) {
    $('.container').empty();
    $.ajax('data/page-2.json', ajaxSetting).then(data => {
        let animalObj;
        data.sort((a, b) => {
            return a.title.charCodeAt() - b.title.charCodeAt();
        });
        data.forEach(item => {
            if (item.keyword === key) {
                animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
                // console.log(animalObj);
                animalObj.render();
            }
        });
    });
}
function getAnimalData() {
    $('.container').empty();
    $.ajax('data/page-1.json', ajaxSetting).then(data => {
        data.sort((a, b) => {
            return a.title.charCodeAt() - b.title.charCodeAt();
        });
        data.forEach(item => {
            let animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
            animalObj.render();
        });
    });
}

$('main').append('<input type="submit" value="Page1" id="page-1">');
$('#page-1').on('click', function () {
    $('section').attr('id', 'photo-template');
    console.log('zzzzzzzzzzz');
    getAnimalData();
});

$('main').append('<input type="submit" value="Page2" id="page-2">');
$('#page-2').on('click', function () {
    // $('header select').remove();
    $('section').attr('id', 'photo-template');
    console.log('aaaaaaaaaaa');
    getSecoundPageData();
});


function getSecoundPageData() {
    $('.container').empty();
    $.ajax('data/page-2.json', ajaxSetting).then(data => {
        data.sort((a, b) => {
            return a.title.charCodeAt() - b.title.charCodeAt();
        });
        data.forEach(item => {
            let animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
            animalObj.render();
        });
    });
}

getAnimalData();
getSecoundPageData();

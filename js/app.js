'use strict';
let selectOption = [];
function AnimalGallery(title, image_url, keyword, description, horns) {
    this.title = title;
    this.image_url = image_url;
    this.keyword = keyword;
    this.description = description;
    this.horns = horns;
    selectOption.push(this);
}
AnimalGallery.prototype.render = function () {
    let template = $('#mustache-template').html();
    let html = Mustache.render(template, this);
    $('main').append(html);
};

function renderOption() {
    let a = [];
    console.log(selectOption);
    $('header select').attr('id', 'title');
    $('#title').append(`<option value='default'>Filter by Keyword</option>`);
    selectOption.forEach((item) => {
        if (!a.includes(item.keyword)) {
            a.push(item.keyword);
            $('#title').append(`<option value='${item.keyword}'>${item.keyword}</option>`);
        }
    });
}
let select = $(`<select id='filter'>
            <option value='fil'>Filter</option>   
             <option value='alpha'>A-Z</option>   
             <option value='horn'>Horn</option>   
             </select>`);
$('.newHe').append(select);

$('header select').change(function () {
    let keys = $('select option:selected').val();
    if (keys === 'default') {
        $('.container').remove();
        getAnimalData();
        getSecoundPageData();
    } else {
        $('.container').remove();
        getAnimalDataByKey(keys);
        getSecoundPageDataByKey(keys);
    }
});
$('#filter').change(function () {
    let keyz = $('#filter option:selected').val();
    if (keyz === 'alpha') {
        $('.container').remove();
        sortAnimal(keyz);
    } else if (keyz === 'horn') {
        $('.container').remove();
        sortAnimal(keyz);

    }
});

const ajaxSetting = {
    method: 'get',
    dataType: 'json'
};
function sortAnimal(key) {
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
    $.ajax('data/page-1.json', ajaxSetting).then(data => {
        let animalObj;
        data.sort((a, b) => {
            return a.title.charCodeAt() - b.title.charCodeAt();
        });
        data.forEach(item => {
            if (item.keyword === key) {
                animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
                animalObj.render();
            }
        });
    });
}

function getSecoundPageDataByKey(key) {
    $.ajax('data/page-2.json', ajaxSetting).then(data => {
        let animalObj;
        data.sort((a, b) => {
            return a.title.charCodeAt() - b.title.charCodeAt();
        });
        data.forEach(item => {
            if (item.keyword === key) {
                animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
                animalObj.render();

            }
        });
    });
}
function getAnimalData() {
    selectOption=[];
    $.ajax('data/page-1.json', ajaxSetting).then(data => {
        data.sort((a, b) => {
            return a.title.charCodeAt() - b.title.charCodeAt();
        });
        data.forEach(item => {
            let animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
            $('#title').empty();
            renderOption();
            animalObj.render();
        });
    });
}

$('.newHe').append('<input type="submit" value="Page1" id="page-1">');
$('#page-1').on('click', function () {
    $('.container').remove();
    getAnimalData();
});

$('.newHe').append('<input type="submit" value="Page2" id="page-2">');
$('#page-2').on('click', function () {
    $('.container').remove();

    getSecoundPageData();
});


function getSecoundPageData() {
    selectOption=[];
    $.ajax('data/page-2.json', ajaxSetting).then(data => {
        data.sort((a, b) => {
            return a.title.charCodeAt() - b.title.charCodeAt();
        });
        data.forEach(item => {
            let animalObj = new AnimalGallery(item.title, item.image_url, item.keyword, item.description, item.horns);
            $('#title').empty();
            // selectOption=[];
            renderOption();
            animalObj.render();
        });
    });
}
$('#title').empty();
renderOption();
getAnimalData();
getSecoundPageData();

'ues strict';
require('should');

const { get } = require('axios');
const { Assert } = require('zombie');
const Zombie = require('zombie');
const page = new Zombie();
const URL = 'http://kodaktor.ru/g/testing_kramer';
const cases = [
    {a1:-2, b1:4, c1:-22, a2:7, b2:-5, c2:50, x:5, y:-3},
    {a1:2, b1:-3, c1:-32, a2:-3, b2:2, c2:33, x:-7, y:6},
    {a1:2, b1:0, c1:-14, a2:-3, b2:2, c2:33, x:-7, y:6},
    {a1:1, b1:1, c1:5, a2:3, b2:2, c2:2, x:-8, y:13},
    {a1:5, b1:5, c1:10, a2:3, b2:2, c2:2, x:-2, y:4},
    {a1:0, b1:3, c1:12, a2:1, b2:0, c2:12, x:12, y:4}
];

describe ('Проверка работы /testing_kramer через заполнение формы', function() {
    cases.forEach((v)=>{
       it ('Передаём туда:\n\t' + v.a1 + 'x ' + (v.b1<0?'':'+') + v.b1 + 'y = ' + v.c1 + '\n\t' +
        + v.a2 + 'x ' + (v.b2<0?'':'+') + v.b2 + 'y = ' + v.c2, async function () {
            await page.visit(URL);
            page.fill('#a1', v.a1);
            page.fill('#b1', v.b1);
            page.fill('#c1', v.c1);
            page.fill('#a2', v.a2);
            page.fill('#b2', v.b2);
            page.fill('#c2', v.c2);
            page.pressButton('button');
            const {result} = JSON.parse(page.document.title);
            result.x.should.equal(v.x);
            result.y.should.equal(v.y);
        });
    });
});

describe ('Проверка работы /testing_kramer через адресный запрос', function() {
    cases.forEach((v)=>{
        const ADD_TO_URL = `?a1=${v.a1}&b1=${v.b1}&c1=${v.c1}&a2=${v.a2}&b2=${v.b2}&c2=${v.c2}`;
        it ('Передаём туда:\n\t' + v.a1 + 'x ' + (v.b1<0?'':'+') + v.b1 + 'y = ' + v.c1 + '\n\t' +
            + v.a2 + 'x ' + (v.b2<0?'':'+') + v.b2 + 'y = ' + v.c2, async function () {
            await page.visit(URL + ADD_TO_URL);
            const result = JSON.parse(page.document.title);
            result.x.should.equal(v.x);
            result.y.should.equal(v.y);
        });
    });
});

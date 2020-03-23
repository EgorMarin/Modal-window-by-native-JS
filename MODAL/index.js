let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://freshmart.com.ua/storage/web/cache/product/117/1a5b048882a24d05bb4f9c7474564934.jpeg?s=cb72495763e409d95a7fec0c8f4c5a0f'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
]


const card = fruit => `
            <div class="col">
                <div class="card">
                    <img src=${fruit.img} class="card-img-top" style="height: 300px;">
                    <div class="card-body">
                      <h5 class="card-title">${fruit.title}</h5>
                      <a href="#" class="btn btn-primary" data-btn='price' data-id='${fruit.id}'>Посмотреть цену</a>
                      <a href="#" class="btn btn-danger" data-btn='remove' data-id='${fruit.id}'>Удалить</a>
                    </div>
                  </div>
            </div>
`

const render = function() {
const html = fruits.map( fruit => card(fruit)).join('')
document.querySelector('#fruits').innerHTML = html
}

render()


const modal = $.modal({
    title: 'Цена на товар:',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            modal.close()
            }
        }
    ]
})


document.addEventListener('click', event => {
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id     //cтавим + чтобы строку преобразовать в число
    const fruit = fruits.find( f => f.id === id)   //тк метод f.id - число, id - строка

    if (btnType === 'price') {
        modal.setContent (`
        <p>Стоимость продукта: <strong>${fruit.title}</strong> cоставляет <strong>${fruit.price} грн.</strong> за <strong>1</strong> кг.</p>
        `)
        modal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content:`<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel');
        })
    }
})
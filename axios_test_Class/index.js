/*
    O componente axios está sendo chamado no html:
    <script src="./node_modules/axios/dist/axios.min.js"></script>
*/
import Pagination from './assets/js/Pagination.js'

const url = 'https://rickandmortyapi.com/api/character'
let pagAtual

async function getCharacters(url, targetPage) {
    try {
        const response = await axios.get(url, { params: { page: targetPage } })         //Vai fazer uma req get com um parâmetro e retornar um json. Com axios não precisa fazer o parse
        return response.data.results                                                    //Se não der jabu, será retornado uma promise com o array de objetos com os personagens
    }
    catch (e) {
        console.error('Deu Jabu')
    }
}

function selectData(arr) {
    return arr.map(({ name, image }) => ({ name, image }))
}

const paginationConteiner = document.getElementById('pagination-1')
const cardPagination = new Pagination(42, paginationConteiner)

paginationConteiner.addEventListener('click', (event) => {
    event.preventDefault()
    pagAtual = cardPagination.onChangePage(pagAtual, event)

    getCharacters(url, pagAtual)
        .then(selectData)
        .then(characterList => renderCard(characterList))
})

function onLoadEvent(event) {
    pagAtual = 1

    getCharacters(url, pagAtual)
        .then(selectData)
        .then(characterList => renderCard(characterList))
}

const cardConteiner = document.getElementById('character-card')

function renderCard(characterList){
    cardConteiner.innerHTML = ''

    characterList.map(({ name, image }) => {
        const div = document.createElement('div')
        div.classList.add('flex-item')
    
        const img = document.createElement('img')
        img.src = image
    
        const p = document.createElement('p')
        p.innerText = name
    
        div.appendChild(img)
        div.appendChild(p)
    
        cardConteiner.appendChild(div)
    })
}
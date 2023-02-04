/*
    O componente axios está sendo chamado no html:
    <script src="./node_modules/axios/dist/axios.min.js"></script>
*/
const url = 'https://rickandmortyapi.com/api/character'
let pagAtual

async function getCharacters(url, targetPage) {
    try {
        const response = await axios.get(url, { params: { page: targetPage } })         //Vai fazer uma req get com um parâmetro e retornar um json. Com axios não precisa fazer o parse
        return response.data.results                                            //Se não der jabu, será retornado uma promise com o array de objetos com os personagens
    }
    catch (e) {
        console.error('Deu Jabu')
    }
}

function selectData(arr) {
    return arr.map(({ name, image }) => ({ name, image }))
}

const paginationConteiner = document.getElementById('pagination-1')

paginationConteiner.addEventListener('click', (event) => {
    event.preventDefault()
    pagAtual = getPage(pagAtual, 42, paginationConteiner, event, false)

    getCharacters(url, pagAtual)
        .then(selectData)
        .then(characterList => renderCard(characterList))
})

function onLoadEvent(event) {
    pagAtual = 1
    getPage(pagAtual, 42, paginationConteiner, event, true)

    getCharacters(url, pagAtual)
        .then(selectData)
        .then(characterList => renderCard(characterList))
}
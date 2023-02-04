//Vai da Página 1 até a Página 42
//https://rickandmortyapi.com/api/character?page=1
//https://rickandmortyapi.com/api/character?page=42
const btnFirstValue = 'First'
const btnPrevValue = 'Prev'
const btnNextValue = 'Next'
const btnLastValue = 'Last'

function getPage(actualPg, pgsQtt, conteinerElement, event, init) {
    const targetPage = init ? 1 : getTargetPage(event, pgsQtt, actualPg)

    if (targetPage === actualPg && !init) {
        return targetPage
    } else {
        conteinerElement.innerHTML = ''
    }

    if (!targetPage) return false

    conteinerElement.appendChild(renderPagButtons(targetPage, pgsQtt))
    return targetPage
}

function getTargetPage(event, pgsQtt, actualPg) {
    let value = event.target.innerText

    if (value === btnFirstValue) return 1
    if (value === btnLastValue) return pgsQtt
    if (value === btnPrevValue) {
        return actualPg > 1 ? actualPg - 1 : 1
    }
    if (value === btnNextValue) {
        return actualPg < pgsQtt ? actualPg + 1 : pgsQtt
    }
    value = parseInt(value, 10)
    if (value > 0 && value < pgsQtt) return value
    return false
}

function renderPagButtons(targetPage, pgsQtt) {
    const ul = document.createElement('ul')

    createFirstTwoButtons(ul, targetPage)
    createNumeralsButtons(ul, targetPage, pgsQtt)
    createLastTwoButtons(ul, targetPage, pgsQtt)

    return ul
}

function createFirstTwoButtons(ul, targetPage) {
    if (targetPage === 1) return

    const liFirst = createPagButton(btnFirstValue)
    const liPrev = createPagButton(btnPrevValue)
    ul.appendChild(liFirst)
    ul.appendChild(liPrev)
}

function createNumeralsButtons(ul, targetPage, pgsQtt) {
    const qttButtonsOnTheLeft = targetPage > 4 ? 4 : (targetPage - 1)
    const qttButtonsOnTheRight = (pgsQtt - targetPage) > 4 ? 4 : (pgsQtt - targetPage)

    if (targetPage > 1) {
        for (let i = (targetPage - qttButtonsOnTheLeft); i < targetPage; i++) {
            ul.appendChild(createPagButton(i))
        }
    }
    const targetPageButton = createPagButton(targetPage)
    targetPageButton.classList.add('page-active')
    ul.appendChild(targetPageButton)

    if (targetPage < pgsQtt) {
        for (let i = (targetPage + 1); i <= (targetPage + qttButtonsOnTheRight); i++) {
            ul.appendChild(createPagButton(i))
        }
    }
}

function createLastTwoButtons(ul, targetPage, pgsQtt) {
    if (targetPage === pgsQtt) return

    const liNext = createPagButton(btnNextValue)
    const liLast = createPagButton(btnLastValue)
    ul.appendChild(liNext)
    ul.appendChild(liLast)
}

function createPagButton(text) {
    const link = document.createElement('a')
    link.innerText = text
    const li = document.createElement('li')
    li.classList.add('page-item')
    li.appendChild(link)
    return li
}
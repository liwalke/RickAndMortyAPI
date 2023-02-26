export default class Pagination {
    constructor(pgsQtt, conteinerElement) {
        this.btnFirstValue = 'First'
        this.btnPrevValue = 'Prev'
        this.btnNextValue = 'Next'
        this.btnLastValue = 'Last'
        this.ul = document.createElement('ul')
        this.init = true
        this.pgsQtt = pgsQtt
        this.conteinerElement = conteinerElement
        this.renderPagButtons(1)
        console.log(this.pgsQtt)
    }

    onChangePage(actualPg, event) {
        const targetPage = this.getTargetPage(actualPg, event)

        if (!targetPage) return false
        if (targetPage === actualPg) return targetPage

        this.renderPagButtons(targetPage)
        return targetPage
    }

    getTargetPage(actualPg, event) {
        let value = event.target.innerText

        if (value === this.btnFirstValue) return 1
        if (value === this.btnLastValue) return this.pgsQtt
        if (value === this.btnPrevValue) return actualPg > 1 ? actualPg - 1 : 1
        if (value === this.btnNextValue) return actualPg < this.pgsQtt ? actualPg + 1 : this.pgsQtt

        value = parseInt(value, 10)
        if (value > 0 && value < this.pgsQtt) return value

        return false
    }

    renderPagButtons(targetPage) {
        this.conteinerElement.innerHTML = ''
        this.ul.innerHTML = ''

        this.createFirstTwoButtons(targetPage)
        this.createNumeralsButtons(targetPage)
        this.createLastTwoButtons(targetPage)

        this.conteinerElement.appendChild(this.ul)
    }

    createFirstTwoButtons(targetPage) {
        if (targetPage === 1) return
    
        this.createPagButton(this.btnFirstValue)
        this.createPagButton(this.btnPrevValue)
    }
    
    createNumeralsButtons(targetPage) {
        const qttButtonsOnTheLeft = targetPage > 4 ? 4 : (targetPage - 1)
        const qttButtonsOnTheRight = (this.pgsQtt - targetPage) > 4 ? 4 : (this.pgsQtt - targetPage)
    
        if (targetPage > 1) {
            for (let i = (targetPage - qttButtonsOnTheLeft); i < targetPage; i++) {
                this.createPagButton(i)
            }
        }
        const targetPageButton = this.createPagButton(targetPage)
        targetPageButton.classList.add('page-active')
    
        if (targetPage < this.pgsQtt) {
            for (let i = (targetPage + 1); i <= (targetPage + qttButtonsOnTheRight); i++) {
                this.createPagButton(i)
            }
        }
    }
    
    createLastTwoButtons(targetPage) {
        if (targetPage === this.pgsQtt) return
    
        this.createPagButton(this.btnNextValue)
        this.createPagButton(this.btnLastValue)
    }
    
    createPagButton(text) {
        const li = document.createElement('li')
        li.classList.add('page-item')
        const link = document.createElement('a')
        link.innerText = text
        
        li.appendChild(link)
        this.ul.appendChild(li)

        return li
    }
}
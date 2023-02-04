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
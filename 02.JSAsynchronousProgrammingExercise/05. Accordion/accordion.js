function solution() {
    let mainElement = document.getElementById('main');

    showArticles(mainElement);

    mainElement.addEventListener('click', (e) => {
        if(e.target.tagName == 'BUTTON'){
            let contentDiv = e.target.parentNode.parentNode.querySelector('div:nth-of-type(2)');

            if(e.target.textContent == 'More'){
                e.target.textContent = 'Less';
                contentDiv.style.display = 'block';
            } else{
                e.target.textContent = 'More';
                contentDiv.style.display = 'none';
            }
        }
    })
}

async function showArticles(main) {
    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(res => res.json())
        .then(async data => {
            for (const article of data) {
                let accordionDiv = document.createElement('div');
                accordionDiv.classList.add('accordion');

                let headDiv = document.createElement('div');
                headDiv.classList.add('head');

                let titleSpan = document.createElement('span');
                titleSpan.textContent = article.title;
                headDiv.appendChild(titleSpan);

                let button = document.createElement('button');
                button.classList.add('button');
                button.setAttribute('id', article._id);
                button.textContent = 'More'
                headDiv.appendChild(button);
                accordionDiv.appendChild(headDiv);

                let extraDiv = document.createElement('div');
                extraDiv.classList.add('extra');

                let p = document.createElement('p');
                p.textContent = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`)
                .then(res => res.json())
                .then(extraData => {
                    return extraData.content;
                });
                extraDiv.appendChild(p);

                accordionDiv.appendChild(extraDiv);
                main.appendChild(accordionDiv);
            }
        })
}

window.addEventListener('load', solution);
export function createCustomElement(type, attrs, ...children) {
    let element = document.createElement(type);

    if (attrs) {
        for (const key in attrs) {

            if (attrs[key] == null) {
                element.removeAttribute(key);
                continue;
            }

            if(key == 'innerHTML'){
                element.innerHTML  = attrs[key];
                continue;
            }

            if (key == 'textContent') {
                element.textContent = attrs[key]
                continue;
            }
            if (key == 'class') {
                element.classList.add(attrs[key]);
                continue;
            }
            if (key == 'removeClass') {
                element.classList.remove(attrs[key])
            }
            element.setAttribute(key, attrs[key]);
        }
    }

    if (children.length > 0 && children[0])
        for (let index = 0; index < children.length; index++) {
            element.appendChild(children[index]);
        }

    return element;
}

export function getDateTimeNow(){
    
    let time = Date();
    let date = new Date(time);

    let hours = ('00' + date.getHours()).slice(-2);
    let mins = ('00' + date.getMinutes()).slice(-2);
    let secs = ('00' + date.getSeconds()).slice(-2);
    let result = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${hours}:${mins}:${secs}`;

    return result;
}
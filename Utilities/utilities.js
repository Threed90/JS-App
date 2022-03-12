function utilities(){

    return {
        createCustomElement,
    }
}

/**
 * 
 * @param {string} type the type of DOM (HTML) element 
 * ```javascript 
 * //example:
 * let type = 'div';
 * ```
 * @param {object} attrs key : value pairs. Every key is the html attribute name. Every value is the value of the html attribute. Set null if there are no attributes or classes for adding
 * **Example:** 
 * ```javascript
 * {
 *    attrName : 'attrValue',
 *    textContent : 'text', // for textContent property
 *    class : 'className', // for adding class to the element
 *    disabled : null, // set null if u want to remove attribute
 *    removeClass : 'className' // use removeClass for removing a class from the HTML element
 * }
 * ```
 * @param {} children Append already created HTML elements to the parent element or set null if there are no children elements:
 * 
 * ```javascript
 * let element = document.createElement('div');
 * let anotherElement = createCustomElement('div', { class : 'example'})
 * 
 * [element, anotherElement] // children param
 * elemnt // chidren param can be just a single HTMLElement or separated with commas (do not need to use array)
 * ```
 */
 function createCustomElement(type, attrs, ...children) {
    let element = document.createElement(type);

    if (attrs) {
        for (const key in attrs) {

            if (attrs[key] == null) {
                element.removeAttribute(key);
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


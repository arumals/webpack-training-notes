const component = function (){
    const element = document.createElement('h1');
    element.className = 'fa fa-spock-o fa-lg';
    element.innerHTML= 'Hello World';
    element.onclick = () => {
        import('./lazy').then((lazy) => {
            element.textContent = lazy.default;
        }).catch((err) => {
            console.error(err);
        });
    };
    return element;
};

const sayHi = function(){
    console.log('Hi!');
};

export {
    component,
    sayHi
};
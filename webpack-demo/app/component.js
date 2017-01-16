import styles from './main.css';

export default function (){
    const element = document.createElement( 'h1' );
    element.className = styles.redButton;
    element.innerHTML= 'Hello Lake';
    return element;
}

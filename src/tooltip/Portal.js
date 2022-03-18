import ReactDOM from 'react-dom';

function Portal(props) {
    //receive a children prop that will be the tooltip and in this case we need the second parameter to be the document body so we can place the tooltip anywhere on the dom
    return ReactDOM.createPortal(props.children, document.body);
}

export default Portal;
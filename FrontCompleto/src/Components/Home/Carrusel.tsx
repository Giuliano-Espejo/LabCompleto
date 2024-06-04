import Carousel from 'react-bootstrap/Carousel';
import "./Carrusel.css"

export const Carrusel = () => {
    return (
        <Carousel slide={false} className='carousel-container'>
            <Carousel.Item >
                <img src='img/guitarra.jpg' className="d-block w-100"/>
            </Carousel.Item>
            <Carousel.Item>
                <img src='img/acordeon.jpg' className="d-block w-100"/>
            </Carousel.Item>
            <Carousel.Item>
                <img src='img/bateria.png' className="d-block w-100"/>
            </Carousel.Item>
        </Carousel>
    )
}

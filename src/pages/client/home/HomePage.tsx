import { Carousel } from 'antd';
import './HomePage.scss'
import background_01 from '../../../assets/background-01.png'
import background_02 from '../../../assets/background-02.png'
import background_03 from '../../../assets/background-03.png'

const HomePage = () => {
    return (
        <div className='home-container'>
            <div className="home-main">
                <Carousel arrows infinite={true} autoplay>
                    <div>
                        <img src={background_01} alt="slide1" />
                    </div>
                    <div>
                        <img src={background_02} alt="slide2" />
                    </div>
                    <div>
                        <img src={background_03} alt="slide3" />
                    </div>
                </Carousel>
            </div>
            <div className="home-content">
                <div><h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos quidem minima, magnam cumque cupiditate voluptatum tenetur ad, consequatur explicabo distinctio pariatur illum veritatis molestias harum nesciunt laudantium quo! Velit, optio.</h3></div>
                <div><h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos quidem minima, magnam cumque cupiditate voluptatum tenetur ad, consequatur explicabo distinctio pariatur illum veritatis molestias harum nesciunt laudantium quo! Velit, optio.</h3></div>
                <div><h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos quidem minima, magnam cumque cupiditate voluptatum tenetur ad, consequatur explicabo distinctio pariatur illum veritatis molestias harum nesciunt laudantium quo! Velit, optio.</h3></div>
                <div><h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos quidem minima, magnam cumque cupiditate voluptatum tenetur ad, consequatur explicabo distinctio pariatur illum veritatis molestias harum nesciunt laudantium quo! Velit, optio.</h3></div>
                <div><h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos quidem minima, magnam cumque cupiditate voluptatum tenetur ad, consequatur explicabo distinctio pariatur illum veritatis molestias harum nesciunt laudantium quo! Velit, optio.</h3></div>
            </div>
        </div>
    )
}
export default HomePage;
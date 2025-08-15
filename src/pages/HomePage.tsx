import Sticker01 from '../assets/sticker-01.mp4';
// import Sticker02 from '../assets/sticker-02.mp4';

const HomePage = () => {
    return (
        <div className='home-container'>
            <div className="home-video">
                <video className='home-video-sticker-01' muted autoPlay loop>
                    <source src={Sticker01} type="video/mp4" />
                </video>
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
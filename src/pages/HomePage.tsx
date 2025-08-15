import Sticker01 from '../assets/sticker-01.mp4';
import BackGround01 from '../assets/background-01.png';
import BackGround02 from '../assets/background-02.png';
import BackGround03 from '../assets/background-03.png';
// import Sticker02 from '../assets/sticker-02.mp4';
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
    height: '500px',
    width: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const HomePage = () => {
    return (
        <div className='home-container'>
            <div className="home-video">
                <video className='home-video-sticker-01' muted autoPlay loop>
                    <source src={Sticker01} type="video/mp4" />
                </video>
            </div>
            <div className="home-content">
                <Carousel
                 autoplay={{ dotDuration: true }} 
                 autoplaySpeed={2000}
                 >
                    <div>
                        <img src={BackGround01} />
                    </div>
                    <div>
                        <img src={BackGround02} />
                    </div>
                    <div>
                        <img src={BackGround03} />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}
export default HomePage;
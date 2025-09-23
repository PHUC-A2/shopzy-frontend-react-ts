import { Card, Carousel, Image, Pagination } from 'antd';
import './HomePage.scss'
import background_01 from '../../../assets/background-01.png'
import background_02 from '../../../assets/background-02.png'
import background_03 from '../../../assets/background-03.png'
import shirt_01 from '../../../assets/shirt-01.png'
import asus_zenbook_01 from '../../../assets/asus-zenbook-01.png'
import lenovo_legion_05_01 from '../../../assets/lenovo-legion05-01.png'


const { Meta } = Card;
const gridStyle: React.CSSProperties = {
    width: '200px',
    textAlign: 'center',
};

const HomePage = () => {
    return (
        <div className='home-container'>
            <div className="home-main">
                <Carousel arrows infinite={true} autoplay autoplaySpeed={1000} >
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
                <h4>DANH MỤC</h4>
                <hr />
                <div className='home-card'>
                    <Card title='DANH MỤC' hoverable>
                        <Card.Grid style={gridStyle}>
                            <Image
                                width='100%'
                                src={asus_zenbook_01}
                            />
                            <a href="/">
                                <div>
                                    <div><strong>Asus zenbook</strong></div>
                                    <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                    <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                    <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                    <div><strong>Tình trạng:</strong><span> Mới</span></div>
                                </div></a>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card.Grid>
                    </Card>
                    <Card title='DANH MỤC' hoverable>
                        <Card.Grid style={gridStyle}>
                            <Image
                                width='100%'
                                src={asus_zenbook_01}
                            />
                            <a href="/">
                                <div>
                                    <div><strong>Asus zenbook</strong></div>
                                    <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                    <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                    <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                    <div><strong>Tình trạng:</strong><span> Mới</span></div>
                                </div></a>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card.Grid>
                    </Card>
                    <Card title='DANH MỤC' hoverable>
                        <Card.Grid style={gridStyle}>
                            <Image
                                width='100%'
                                src={asus_zenbook_01}
                            />
                            <a href="/">
                                <div>
                                    <div><strong>Asus zenbook</strong></div>
                                    <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                    <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                    <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                    <div><strong>Tình trạng:</strong><span> Mới</span></div>
                                </div></a>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card.Grid>
                    </Card>
                    <Card title='DANH MỤC' hoverable>
                        <Card.Grid style={gridStyle}>
                            <Image
                                width='100%'
                                src={asus_zenbook_01}
                            />
                            <a href="/">
                                <div>
                                    <div><strong>Asus zenbook</strong></div>
                                    <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                    <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                    <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                    <div><strong>Tình trạng:</strong><span> Mới</span></div>
                                </div></a>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card.Grid>
                    </Card>
                    <Card title='DANH MỤC' hoverable>
                        <Card.Grid style={gridStyle}>
                            <Image
                                width='100%'
                                src={asus_zenbook_01}
                            />
                            <a href="/">
                                <div>
                                    <div><strong>Asus zenbook</strong></div>
                                    <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                    <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                    <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                    <div><strong>Tình trạng:</strong><span> Mới</span></div>
                                </div></a>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card.Grid>
                    </Card>
                    <Card title='DANH MỤC' hoverable>
                        <Card.Grid style={gridStyle}>
                            <Image
                                width='100%'
                                src={asus_zenbook_01}
                            />
                            <a href="/">
                                <div>
                                    <div><strong>Asus zenbook</strong></div>
                                    <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                    <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                    <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                    <div><strong>Tình trạng:</strong><span> Mới</span></div>
                                </div></a>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card.Grid>
                    </Card>
                    <Card title='DANH MỤC' hoverable>
                        <Card.Grid style={gridStyle}>
                            <Image
                                width='100%'
                                src={asus_zenbook_01}
                            />
                            <a href="/">
                                <div>
                                    <div><strong>Asus zenbook</strong></div>
                                    <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                    <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                    <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                    <div><strong>Tình trạng:</strong><span> Mới</span></div>
                                </div></a>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card.Grid>
                    </Card>
                    <Card title='DANH MỤC' hoverable>
                        <Card.Grid style={gridStyle}>
                            <Image
                                width='100%'
                                src={asus_zenbook_01}
                            />
                            <a href="/">
                                <div>
                                    <div><strong>Asus zenbook</strong></div>
                                    <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                    <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                    <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                    <div><strong>Tình trạng:</strong><span> Mới</span></div>
                                </div></a>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card.Grid>
                    </Card>
                    <Card title='DANH MỤC' hoverable>
                        <Card.Grid style={gridStyle}>
                            <Image
                                width='100%'
                                src={asus_zenbook_01}
                            />
                            <a href="/">
                                <div>
                                    <div><strong>Asus zenbook</strong></div>
                                    <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                    <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                    <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                    <div><strong>Tình trạng:</strong><span> Mới</span></div>
                                </div></a>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card.Grid>
                    </Card>

                </div>
                <hr />
                <Card title="Sản phẩm khác">
                    <Card.Grid style={gridStyle}>
                        <Image
                            width='100%'
                            src={asus_zenbook_01}
                        />
                        <a href="/">
                            <div>
                                <div><strong>Asus zenbook</strong></div>
                                <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                <div><strong>Tình trạng:</strong><span> Mới</span></div>
                            </div></a>
                    </Card.Grid>

                    <Card.Grid style={gridStyle}>
                        <Image
                            width='100%'
                            src={lenovo_legion_05_01}
                        />
                        <a href="/">
                            <div>
                                <div><strong>Lenovo legion 5</strong></div>
                                <div><strong>Giá:</strong><span> 20.000.000 VND</span></div>
                                <div><strong>Số lượng đã bán:</strong><span> 99</span></div>
                                <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                <div><strong>Tình trạng:</strong><span> Mới</span></div>
                            </div></a>
                    </Card.Grid>

                    <Card.Grid style={gridStyle}>
                        <Image
                            width='100%'
                            src={shirt_01}
                        />
                        <a href="/">
                            <div>
                                <div><strong>Áo thun nóng lạnh</strong></div>
                                <div><strong>Giá:</strong><span> 999.999.999 + VND</span></div>
                                <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                <div><strong>Tình trạng:</strong><span> Mới</span></div>
                            </div></a>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Image
                            width='100%'
                            src={shirt_01}
                        />
                        <a href="/">
                            <div>
                                <div><strong>Áo thun nóng lạnh</strong></div>
                                <div><strong>Giá:</strong><span> 999.999.999 + VND</span></div>
                                <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                <div><strong>Tình trạng:</strong><span> Mới</span></div>
                            </div></a>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Image
                            width='100%'
                            src={shirt_01}
                        />
                        <a href="/">
                            <div>
                                <div><strong>Áo thun nóng lạnh</strong></div>
                                <div><strong>Giá:</strong><span> 999.999.999 + VND</span></div>
                                <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                <div><strong>Tình trạng:</strong><span> Mới</span></div>
                            </div></a>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Image
                            width='100%'
                            src={shirt_01}
                        />
                        <a href="/">
                            <div>
                                <div><strong>Áo thun nóng lạnh</strong></div>
                                <div><strong>Giá:</strong><span> 999.999.999 + VND</span></div>
                                <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                <div><strong>Tình trạng:</strong><span> Mới</span></div>
                            </div></a>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Image
                            width='100%'
                            src={shirt_01}
                        />
                        <a href="/">
                            <div>
                                <div><strong>Áo thun nóng lạnh</strong></div>
                                <div><strong>Giá:</strong><span> 999.999.999 + VND</span></div>
                                <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                <div><strong>Tình trạng:</strong><span> Mới</span></div>
                            </div></a>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Image
                            width='100%'
                            src={shirt_01}
                        />
                        <a href="/">
                            <div>
                                <div><strong>Áo thun nóng lạnh</strong></div>
                                <div><strong>Giá:</strong><span> 999.999.999 + VND</span></div>
                                <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                <div><strong>Tình trạng:</strong><span> Mới</span></div>
                            </div></a>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Image
                            width='100%'
                            src={shirt_01}
                        />
                        <a href="/">
                            <div>
                                <div><strong>Áo thun nóng lạnh</strong></div>
                                <div><strong>Giá:</strong><span> 999.999.999 + VND</span></div>
                                <div><strong>Số lượng đã bán:</strong><span> 899</span></div>
                                <div><strong>Trạng thái:</strong><span> Còn hàng</span></div>
                                <div><strong>Tình trạng:</strong><span> Mới</span></div>
                            </div></a>
                    </Card.Grid>

                </Card>
                <br />
                <Pagination align="center" defaultCurrent={1} total={50} />
            </div>
        </div>
    )
}
export default HomePage;
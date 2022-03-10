import { Carousel, Image } from 'antd';
import { observer } from 'mobx-react-lite';
import { IGood } from 'pages/Goods/models';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import useStore from 'store';
interface IProps {
  good?: IGood;
}
const Detail = (props: IProps) => {
  const { detail } = useStore();
  const { detail: goodDetail } = detail;
  const [visible, setVisible] = useState(false);
  const params = useParams();

  useEffect(() => {
    detail.getDetail(params.id!);
  }, [params.id]);

  return (
    <div className={styles['detail-container']}>
      <main>
        <div className={styles['image-container']}>
          <Carousel autoplay>
            {goodDetail.img_url.map((img, index) => (
              <Image src={img} key={index} width={300} preview={{ visible: false }} onClick={() => setVisible(true)} />
            ))}
          </Carousel>
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
              {goodDetail.img_url.map((img, index) => (
                <Image src={img} key={index} />
              ))}
            </Image.PreviewGroup>
          </div>
        </div>
        <div className='content'>11</div>
      </main>
    </div>
  );
};

export default observer(Detail);

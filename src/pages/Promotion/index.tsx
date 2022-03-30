import { Card, Space, Statistic, Tag } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import good from 'store/Good';
import styles from './index.module.scss';

const Promotion = () => {
  const { Countdown } = Statistic;
  const navigate = useNavigate();
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  useEffect(() => {
    good.getGoodLists();
  }, [good]);
  const GoToDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };
  return (
    <div className={styles['card-container']}>
      <Card
        bordered
        style={{ borderRadius: '5%' }}
        title={
          <>
            <Countdown title='限时秒杀' value={deadline} valueStyle={{ color: '#cf1322' }} format='HH:mm:ss:SSS' />
          </>
        }
      >
        <div>
          {good.goods
            .filter((item) => item.id < 3)
            .map((item) => (
              <Space key={item.id} direction='vertical' onClick={() => GoToDetail(item.id)}>
                <img src={item.img_url[0]} />
                <p>
                  <Tag color='red'>¥{item.price}</Tag>
                  <span style={{ textDecorationLine: 'line-through' }}>¥{item.originPrice}</span>
                </p>
              </Space>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default observer(Promotion);

import { LoadingOutlined } from '@ant-design/icons';
import { Divider, List, Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import useStore from 'store';
import GoodItem from './components/Item';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from './components/Head';

const Goods = () => {
  const { good } = useStore();
  const { loading, getMoreGoods, total, goodCategory } = good;
  const [page, setPage] = useState(2);
  useEffect(() => {
    good.getGoodsByCateGory('All');
  }, []);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    getMoreGoods(page, goodCategory);
    setPage(page + 1);
  };
  useEffect(() => {
    setPage(2);
  }, [goodCategory]);
  useEffect(() => {
    loadMoreData();
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const tabContent = (
    <InfiniteScroll
      dataLength={good.goods.length}
      next={loadMoreData}
      hasMore={good.goods.length < total}
      loader={<Skeleton active />}
      endMessage={<Divider plain>到底了,没有更多商品了~</Divider>}
    >
      <List
        loading={{ spinning: loading, tip: '努力加载中', size: 'large', indicator: antIcon }}
        dataSource={good.goods}
        grid={{ column: 4 }}
        size='small'
        renderItem={(item) => <GoodItem item={item} />}
      />
    </InfiniteScroll>
  );
  return <Head goods={tabContent} />;
};

export default observer(Goods);

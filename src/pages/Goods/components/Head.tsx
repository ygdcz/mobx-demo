import { Button, Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useEffect, useState } from 'react';
import useStore from 'store';
import { GOOD_CATEGORY, IGood } from '../models';
interface IProps {
  goods: ReactNode;
}
const Head = ({ goods }: IProps) => {
  const { TabPane } = Tabs;
  const { good } = useStore();
  const { goodCategory, setGoodCategory, getGoodsByCateGory } = good;

  useEffect(() => {
    getGoodsByCateGory(goodCategory);
  }, [goodCategory]);
  const CATEGORY = {
    All: '全部分类',
    Dairy: '乳品烘培',
    Fruit: '果蔬鲜花',
    Meat: '肉禽蛋品',
    Drink: '酒水饮料'
  };
  const tab = (category: GOOD_CATEGORY, goods: ReactNode) => (
    <TabPane tab={CATEGORY[category]} key={category}>
      {goods}
    </TabPane>
  );
  return (
    <Tabs centered onChange={(activeKey) => setGoodCategory(activeKey as GOOD_CATEGORY | 'All')} activeKey={goodCategory}>
      {Object.keys(CATEGORY).map((category) => tab(category as GOOD_CATEGORY, goods))}
    </Tabs>
  );
};

export default observer(Head);

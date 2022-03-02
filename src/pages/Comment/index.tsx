import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import useBreadcrumbs from 'hooks/breadcrumb';
import { Avatar, Tooltip, Comment, List } from 'antd';
import moment from 'moment';
import React, { createElement, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import useLike from 'hooks/like';
import { getCommentList } from './service/comment';
import { IComment } from 'common/model/type';
import CommentItem from './component/comment-item';
function CommentPage() {
  useBreadcrumbs(['comment']);
  const [list, setList] = useState<IComment[]>([]);
  useEffect(() => {
    getCommentList().then((res) => {
      setList(res);
    });
  }, []);

  const generateComments = (list: IComment[]) => {
    return list.map((item) => {
      return (
        <CommentItem data={item} key={item.id}>
          {item.reply ? generateComments(item.reply) : <></>}
        </CommentItem>
      );
    });
  };

  return (
    <>
      <List>
        <>{generateComments(list)}</>
      </List>
    </>
  );
}

export default observer(CommentPage);

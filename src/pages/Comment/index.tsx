import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import useBreadcrumbs from 'hooks/breadcrumb';
import { Avatar, Tooltip, Comment, List, Empty } from 'antd';
import moment from 'moment';
import React, { createElement, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import useLike from 'hooks/like';
import { getCommentList } from './service/comment';
import { IComment } from 'common/model/type';
import CommentItem from './component/comment-item';
import AddComment from './component/add-comment';
import useStore from 'store';
function CommentPage(props: { goodId: number }) {
  const { comment } = useStore();
  useBreadcrumbs(['评论区']);
  useEffect(() => {
    comment.getComment(props.goodId);
  }, [comment]);

  const generateComments = (list: IComment[]) => {
    return list.map((item) => {
      return (
        <CommentItem data={item} key={item.id}>
          {item.extra ? generateComments(item.extra) : <></>}
        </CommentItem>
      );
    });
  };

  const formatCommentList = (list: IComment[]) => {
    const deleteIds: number[] = [];
    list.forEach((item) => {
      if (item.parentId) {
        list[list.findIndex((i) => i.id === item.parentId)].extra.push(item);
        deleteIds.push(item.id);
      }
    });

    return list.filter((item) => {
      if (!deleteIds.length) return true;
      return !(deleteIds.indexOf(item.id) > -1);
    });
  };

  return (
    <>
      购买后可以评价跳转到comment
      <List
        header={`${comment.Total}条评论`}
        pagination={{ pageSize: 3 }}
        dataSource={formatCommentList(comment.comments)}
        renderItem={(item) => (
          <CommentItem data={item} key={item.id}>
            {item.extra ? generateComments(item.extra) : <></>}
          </CommentItem>
        )}
        locale={{ emptyText: '暂无评论' }}
      />
      <AddComment goodId={props.goodId} />
    </>
  );
}

export default observer(CommentPage);

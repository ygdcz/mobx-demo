import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Comment, List } from 'antd';
import moment from 'moment';
import React, { createElement, useState, useEffect, ReactNode } from 'react';
import './index.module.less';
import { observer } from 'mobx-react';
import useLike from 'hooks/like';
import { IComment } from 'common/model/type';
interface IProps {
  data: IComment;
  children?: ReactNode;
}
function CommentItem(props: IProps) {
  const { data, children } = props;
  const { like, dislike, author, time, status, comment } = data;
  const { likes, dislikes, doLike, doDislike, action } = useLike(like, dislike, status);

  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span onClick={doLike}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className='comment-action'>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span onClick={doDislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className='comment-action'>{dislikes}</span>
      </span>
    </Tooltip>,
    <span key='comment-basic-reply-to'>Reply to</span>
  ];

  return (
    <Comment
      actions={actions}
      author={<a>{author}</a>}
      avatar={<Avatar src={`https://joeschmoe.io/api/v1/${author}`} alt={author} />}
      content={<p>{comment}</p>}
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(time).fromNow()}</span>
        </Tooltip>
      }
    >
      {children}
    </Comment>
  );
}

export default observer(CommentItem);

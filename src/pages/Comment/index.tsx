import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import useBreadcrumbs from 'hooks/breadcrumb';
import { Avatar, Tooltip, Comment, List } from 'antd';
import moment from 'moment';
import React, { createElement, useState, useEffect } from 'react';
import './index.module.less';
import { observer } from 'mobx-react';
import useLike from 'hooks/like';

function CommentPage() {
  useBreadcrumbs(['comment']);
  const { likes, dislikes, doLike, doDislike, action } = useLike();

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
    <List>
      <>
        <Comment
          actions={actions}
          author={<a>Han Solo</a>}
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />}
          content={
            <p>
              We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create
              their product prototypes beautifully and efficiently.
            </p>
          }
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
        <Comment
          actions={actions}
          author={<a>Han Solo</a>}
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />}
          content={
            <p>
              We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create
              their product prototypes beautifully and efficiently.
            </p>
          }
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      </>
    </List>
  );
}

export default observer(CommentPage);

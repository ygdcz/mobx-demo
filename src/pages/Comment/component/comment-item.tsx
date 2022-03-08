import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Comment, List, Button, Input, Space, Typography, Popconfirm } from 'antd';
import moment from 'moment';
import React, { createElement, useState, useEffect, ReactNode, ChangeEvent, useCallback } from 'react';
import './index.module.less';
import { observer } from 'mobx-react';
import useLike from 'hooks/like';
import { IComment } from 'common/model/type';
import useStore from 'store';
interface IProps {
  data: IComment;
  children?: ReactNode;
}

function CommentItem(props: IProps) {
  const { data, children } = props;
  const { like, dislike, author, time, status, comment, id } = data;
  const { likes, dislikes, doLike, doDislike, action } = useLike(like, dislike, status);
  const [init, setInit] = useState(true);
  const { comment: commentStore } = useStore();
  const [value, setValue] = useState(comment);
  const [isUpdate, setIsUpdate] = useState(false);
  const { Paragraph } = Typography;

  const likeAndDislike = useCallback(() => {
    commentStore.updateLike(id, {
      like: likes,
      dislike: dislikes,
      status: action
    });
  }, [action, commentStore, dislikes, id, likes]);
  useEffect(() => {
    if (init) return;
    likeAndDislike();
  }, [init, likeAndDislike]);

  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span
        onClick={() => {
          setInit(false);
          doLike();
          likeAndDislike();
        }}
      >
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className='comment-action'>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span
        onClick={() => {
          setInit(false);
          doDislike();
          likeAndDislike();
        }}
      >
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className='comment-action'>{dislikes}</span>
      </span>
    </Tooltip>,
    <Popconfirm
      key='delete'
      placement='top'
      title={'你确定要删除这条评论吗?'}
      onConfirm={() => commentStore.deleteComment(id)}
      okText='确定'
      cancelText='取消'
    >
      <Button type='link' key='comment-basic-delete'>
        删除
      </Button>
    </Popconfirm>,
    isUpdate ? (
      <Space>
        <Button type='link' style={{ color: 'gray' }} onClick={() => setIsUpdate(false)}>
          取消
        </Button>
        <Button
          type='link'
          loading={commentStore.loading}
          onClick={() => {
            setInit(false);
            commentStore.updateComment(id, {
              time: new Date().toLocaleString(),
              comment: value
            });
            setIsUpdate(false);
          }}
        >
          确定
        </Button>
      </Space>
    ) : (
      <Button
        type='link'
        key='comment-basic-update'
        onClick={() => {
          setIsUpdate(true);
        }}
      >
        编辑
      </Button>
    )
  ];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Comment
      actions={actions}
      author={<a>{author}</a>}
      avatar={<Avatar src={`https://joeschmoe.io/api/v1/${author}`} alt={author} />}
      content={isUpdate ? <Input value={value} onChange={onChange} maxLength={64} /> : <Paragraph copyable>{value}</Paragraph>}
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

import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Comment, List, Button, Input, Space, Typography, Popconfirm } from 'antd';
import moment from 'moment';
import React, { createElement, useState, useEffect, ReactNode, ChangeEvent, useCallback } from 'react';
import './index.module.less';
import { observer } from 'mobx-react';
import useLike from 'hooks/like';
import { IComment } from 'common/model/type';
import useStore from 'store';
import auth from 'store/Auth';
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
  const isHidden = () => {
    if (auth.id === 3) return false;
    if (auth.id === data.pId) {
      return false;
    }
    return true;
  };

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
      title={'??????????????????????????????????'}
      onConfirm={() => commentStore.deleteComment(id)}
      okText='??????'
      cancelText='??????'
    >
      <Button type='link' key='comment-basic-delete' hidden={isHidden()}>
        ??????
      </Button>
    </Popconfirm>,
    isUpdate ? (
      <Space>
        <Button type='link' style={{ color: 'gray' }} onClick={() => setIsUpdate(false)}>
          ??????
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
          ??????
        </Button>
      </Space>
    ) : (
      <Button
        type='link'
        key='comment-basic-update'
        hidden={isHidden()}
        onClick={() => {
          setIsUpdate(true);
        }}
      >
        ??????
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

import { Comment, Avatar, Form, Button, List, Input, message, Divider } from 'antd';
import moment from 'moment';
import { IComment } from 'common/model/type';
import React, { useState, ReactNode, ChangeEvent } from 'react';
import { addComment } from '../service/comment';
import { observer } from 'mobx-react';
import useStore from 'store';
import { useUnmountedRef } from 'ahooks';

const { TextArea } = Input;
interface IEditor {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean | { delay?: number };
  value: string;
}

const Editor = ({ onChange, onSubmit, submitting, value }: IEditor) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const AddComment = (props: { goodId: number }) => {
  const [submitting, setSubmitting] = useState<boolean | { delay?: number }>(false);
  const [value, setValue] = useState('');
  const { comment } = useStore();
  const unmountedRef = useUnmountedRef();

  const onSubmit = () => {
    if (unmountedRef.current) return;
    if (!value) {
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      comment
        .addComment(props.goodId, value)
        .then((res) => {
          setValue('');
          setSubmitting(false);
          message.success('评论成功');
        })
        .catch((err) => message.error('评论失败'));
    }, 1000);
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Divider orientation='left' plain>
        填写你的评论
      </Divider>
      <Comment
        avatar={<Avatar src='https://joeschmoe.io/api/v1/male/random' alt='Han Solo' />}
        content={<Editor onChange={onChange} onSubmit={onSubmit} submitting={submitting} value={value} />}
      />
    </>
  );
};

export default observer(AddComment);

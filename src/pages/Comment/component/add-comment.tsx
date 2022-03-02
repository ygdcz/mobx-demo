import { Comment, Avatar, Form, Button, List, Input } from 'antd';
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

const AddComment = () => {
  const [submitting, setSubmitting] = useState<boolean | { delay?: number }>(false);
  const [value, setValue] = useState('');
  const { comment } = useStore();
  const unmountedRef = useUnmountedRef();

  const onSubmit = () => {
    if (unmountedRef.current) return;
    if (!value) {
      return;
    }
    setSubmitting({ delay: 1000 });
    comment.addComment(value).then((res) => {
      setSubmitting(false);
      setValue('');
    });
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <Comment
      avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />}
      content={<Editor onChange={onChange} onSubmit={onSubmit} submitting={submitting} value={value} />}
    />
  );
};

// class AddComment extends React.Component {
//   state = {
//     comments: [],
//     submitting: false,
//     value: ''
//   };

//   handleSubmit = () => {
//     if (!this.state.value) {
//       return;
//     }

//     this.setState({
//       submitting: true
//     });

//     setTimeout(() => {
//       this.setState({
//         submitting: false,
//         value: '',
//         comments: [
//           ...this.state.comments,
//           {
//             author: 'Han Solo',
//             avatar: 'https://joeschmoe.io/api/v1/random',
//             content: <p>{this.state.value}</p>,
//             datetime: moment().fromNow()
//           }
//         ]
//       });
//     }, 1000);
//   };

//   handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     this.setState({
//       value: e.target.value
//     });
//   };

//   render() {
//     const { comments, submitting, value } = this.state;

//     return (
//       <>
//         {comments.length > 0 && <CommentList comments={comments} />}
//         <Comment
//           avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />}
//           content={<Editor onChange={this.handleChange} onSubmit={this.handleSubmit} submitting={submitting} value={value} />}
//         />
//       </>
//     );
//   }
// }

export default observer(AddComment);

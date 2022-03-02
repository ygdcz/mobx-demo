import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { IComment } from 'common/model/type';
import React, { useState } from 'react';

const { TextArea } = Input;
interface IEditor {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean | { delay?: number };
  value: string;
}

// const CommentList = ({ comments }: ISafeAny) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout='horizontal'
//     renderItem={(props) => <Comment {...props} />}
//   />
// );

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

class App extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: ''
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          ...this.state.comments,
          {
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow()
          }
        ]
      });
    }, 1000);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <>
        {/* {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />}
          content={<Editor onChange={this.handleChange} onSubmit={this.handleSubmit} submitting={submitting} value={value} />}
        /> */}
      </>
    );
  }
}

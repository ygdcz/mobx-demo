import { message } from 'antd';
import { IComment } from 'common/model/type';
import { reverse } from 'lodash-es';
import { makeAutoObservable, runInAction } from 'mobx';
import { addComment, getCommentList } from 'pages/Comment/service/comment';

class Comment {
  comments: IComment[] = [];
  constructor() {
    makeAutoObservable(
      this,
      {
        // increment: false 排除increment 是可观察的属性或方法
      },
      { autoBind: true } // 自动绑定this
    );
  }
  getComment = () => {
    getCommentList()
      .then((res) => {
        message.success('获取评论成功');
        runInAction(() => {
          this.comments = reverse([...res]);
        });
      })
      .catch((err) => {
        message.error('获取评论出错');
      });
  };
  addComment = (comment: string) => {
    addComment(comment)
      .then((res) => {
        message.success('评论成功');
        runInAction(() => {
          this.comments.unshift(res);
        });
      })
      .catch((err) => message.error('评论失败'));
    return Promise.resolve();
  };
}

const comment = new Comment();

// reaction, autorun 监听属性

export default comment;

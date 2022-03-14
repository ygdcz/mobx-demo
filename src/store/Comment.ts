import { message } from 'antd';
import { IComment } from 'common/model/type';
import { reverse } from 'lodash-es';
import { makeAutoObservable, runInAction } from 'mobx';
import { addComment, deleteComment, getCommentList, updateComment, updateLike } from 'pages/Comment/service/comment';

class Comment {
  comments: IComment[] = [];
  loading = false;
  constructor() {
    makeAutoObservable(
      this,
      {
        // increment: false 排除increment 是可观察的属性或方法
      },
      { autoBind: true } // 自动绑定this
    );
  }
  get Total() {
    return this.comments.length;
  }

  getComment = (goodId: number) => {
    getCommentList(goodId)
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
  addComment = (goodId: number, comment: string) => {
    const res = addComment(goodId, comment)
      .then((res) => {
        runInAction(() => {
          this.comments.unshift(res);
        });
        return Promise.resolve(res);
      })
      .catch((err) => Promise.reject(err));
    return res;
  };
  deleteComment = (id: number) => {
    deleteComment(id)
      .then((res) => {
        message.success('删除成功');
        runInAction(() => {
          this.comments = this.comments.filter((comment) => comment.id !== id);
        });
      })
      .catch((err) => message.error('删除失败'));
  };
  updateComment = (id: number, comment: Partial<IComment>) => {
    this.loading = true;
    updateComment(id, comment)
      .then((res) => {
        message.success('更新成功');
        this.loading = false;
      })
      .catch((err) => message.error('更新失败'));
  };
  updateLike = (id: number, comment: Partial<IComment>) => {
    this.loading = true;
    console.log(comment);

    updateLike(id, comment)
      .then((res) => {
        this.loading = false;
      })
      .catch((err) => message.error('点赞失败'));
  };
}

const comment = new Comment();

// reaction, autorun 监听属性

export default comment;

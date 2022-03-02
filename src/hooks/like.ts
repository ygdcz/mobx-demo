import React, { useEffect, useState } from 'react';

const useLike = (likeNum: number, dislikeNum: number, status: 'liked' | 'disliked' | null) => {
  const [likes, setLikes] = useState(likeNum);
  const [dislikes, setDislikes] = useState(dislikeNum);
  const [action, setAction] = useState<'liked' | 'disliked' | null>(status);

  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  useEffect(() => {
    if (action === 'liked') {
      setLikeClicked(true);
    } else if (action === 'disliked') {
      setDislikeClicked(true);
    }
  }, [action]);

  const reset = () => {
    setLikeClicked(false);
    setDislikeClicked(false);
    setAction(null);
  };

  const likeAction = () => {
    setLikes(likes + 1);
    setLikeClicked(true);
    setAction('liked');
  };
  const dislikeAction = () => {
    setDislikes(dislikes + 1);
    setDislikeClicked(true);
    setAction('disliked');
  };

  const checkValue = (value: number) => {
    return value > 0 ? value : 0;
  };
  const doLike = () => {
    if (likeClicked) {
      reset();
      setLikes(checkValue(likes - 1));
    } else {
      if (action === 'disliked') {
        setDislikes(checkValue(dislikes - 1));
        setDislikeClicked(false);
      }
      likeAction();
    }
  };

  const doDislike = () => {
    if (dislikeClicked) {
      reset();
      setDislikes(checkValue(dislikes - 1));
    } else {
      if (action === 'liked') {
        setLikes(checkValue(likes - 1));
        setLikeClicked(false);
      }
      dislikeAction();
    }
  };

  return { likes, dislikes, doLike, doDislike, action };
};

export default useLike;

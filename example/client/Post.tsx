import * as React from 'react';
import useApios from '../../dist/index';
import * as api from './api';

const Post: React.FC = () => {
  const [{ loading, data, error }, fetchPost] = useApios(api.post);

  const onClickPost = React.useCallback(() => {
    fetchPost({
      id: 'id',
      name: 'name',
    });
  }, []);

  return (
    <div>
      <p>POST</p>
      {loading && <p>loading</p>}
      {error && <p>error: {error.response.status}</p>}
      {data && (
        <>
          <p>{data.user.id}</p>
          <p>{data.user.name}</p>
        </>
      )}
      <button onClick={onClickPost}>POST</button>
    </div>
  );
};

export default Post;

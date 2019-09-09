import * as React from 'react';
import useApios from '../../dist/index';
import * as api from './api';

const Get: React.FC = () => {
  const [{ loading, data, error }, fetchGet] = useApios(api.get);

  const onClickGet = React.useCallback(() => {
    fetchGet();
  }, []);

  return (
    <div>
      <p>GET</p>
      {loading && <p>loading</p>}
      {error && <p>error: {error.response.status}</p>}
      {data && (
        <>
          <p>{data.user.id}</p>
          <p>{data.user.name}</p>
        </>
      )}
      <button onClick={onClickGet}>GET</button>
    </div>
  );
};

export default Get;

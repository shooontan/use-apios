# use-apios

[![npm version](https://img.shields.io/npm/v/%40shooontan%2Fuse-apios.svg)](https://www.npmjs.com/package/%40shooontan%2Fuse-apios)
[![install size](https://packagephobia.now.sh/badge?p=use-apios)](https://packagephobia.now.sh/result?p=use-apios)
[![Build Status](https://travis-ci.com/shooontan/use-apios.svg?branch=master)](https://travis-ci.com/shooontan/use-apios)

Custom React hook for [axios](https://github.com/axios/axios).

## Install

```sh
# npm
$ npm install use-apios axios

# or yarn
$ yarn add use-apios axios
```

## Example

```tsx
import * as React from 'react';
import axios from 'axios';
import useApios from 'useApios'

type GetRes = {
  name: string
}

const App: React.FC = () => {
  const [{ loading, data, error }, fetch] = useApios(
    () => http.get<GetRes>('/api/user')
  );

  const onClick = React.useCallback(() => {
    fetch();
  }, []);

  return (
    <div>
      <p>User</p>
      {loading && <p>loading</p>}
      {error && <p>error: {error.response.status}</p>}
      {data && (
        <>
          <p>{data.name}</p>
        </>
      )}
      <button onClick={onClick}>GET</button>
    </div>
  );
};
```

## API

- useApios(fn)

### args:

#### fn: Function

AxiosResponse-Promise returning function.

```ts
useApios(() => axios.get('/api'));
```

#### return: [{...}, fn]

```ts
const [{ loading, error, data, status, statusText, headers, config }, fetch] = useApios(fn)
```

#### loading: boolean

default: false.

#### error: AxiosError

axios's AxiosError.

#### data, status, statusText, headers, config, request

axios's response data.

[https://github.com/axios/axios#response-schema](https://github.com/axios/axios#response-schema)

#### fetch

The function to exec axios request.


## Develop

```sh
# build use-apios
$ yarn build

# development: localost:3000
$ yarn dev
```

import fetch from 'node-fetch';

export async function postGraphQlData (query, variables) {
  console.log('postGraphQlData variables', JSON.stringify(query), JSON.stringify(variables));
  const res = await fetch(process.env.NEXT_PUBLIC_NHOST_GRAPHQL_API, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': process.env.SECRET
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
  const data = await res.json();
  console.log('postGraphQlData response', JSON.stringify(data));
  return data;
}

export async function postFetchData (url, body) {
  const res = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  console.log('postFetchData', JSON.stringify(data));
  return data;
}

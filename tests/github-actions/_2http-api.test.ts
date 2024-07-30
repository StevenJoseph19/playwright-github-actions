import { test, expect } from '@playwright/test';
import { request } from 'http';

// Using this variable globally
let userId;

test('GET Request', async ({ request }) => {
  // GET Request to fetch data

  const get_response = await request.get('https://reqres.in/api/users/?page=2');

  console.log(await get_response.json());

  // expecting the appropriate status of the request

  expect(get_response.status()).toBe(200);
});

test('POST Request', async ({ request }) => {
  // POST Request to fetch data

  const post_response = await request.post('https://reqres.in/api/users', {
    data: { name: 'Steve Samuels', job: 'Trainer' },

    headers: { Accept: 'application/json' },
  });

  // Storing the result in a variable
  const result = await post_response.json();

  console.log(result);

  // expecting the appropriate status of the request

  expect(post_response.status()).toBe(201);

  // Assigning the result's id in variable -> userId.
  // Pupose: To update and delete the particular user in API
  userId = result.id;
});

test('PUT Request', async ({ request }) => {
  // PUT Request to fetch data

  const put_response = await request.put(
    'https://reqres.in/api/users' + userId,
    {
      data: { name: 'Steven Samuels', job: 'Trainer - Automation Testing' },

      headers: { Accept: 'application/json' },
    }
  );

  // Log the raw response content
  console.log(await put_response.text());

  // expecting the appropriate status of the request
  expect(put_response.status()).toBe(404);
});

test('DELETE Request', async ({ request }) => {
  // DELETE Request to fetch data

  const delete_response = await request.delete(
    'https://reqres.in/api/users' + userId
  );

  // expecting the appropriate status of the request
  expect(delete_response.status()).toBe(204);
});

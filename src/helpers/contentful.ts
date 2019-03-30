import { createClient, Entry, EntryCollection } from 'contentful/dist/contentful.browser.min.js';

export const content = () => {
  const client = createClient({
    space: 'prxwxwshz29c',
    accessToken: '04605a5df90274f65f6739dda0db1346e6e1526a0eb0fb734268f7b447cdade6',
  });

  return client
    .getEntry('7rQP3NpRz40gKmalq7lBjA')
    .then((entry: any) => entry)
    .catch(console.error);
};

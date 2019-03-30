import { createClient } from "contentful/dist/contentful.browser.min.js";

const client = createClient({
  space: "prxwxwshz29c",
  accessToken:
    "04605a5df90274f65f6739dda0db1346e6e1526a0eb0fb734268f7b447cdade6"
});
export const content = (id: string) => {
  return client
    .getEntry(id)
    .then((entry: any) => {
      const { fields } = entry;
      if (!fields.image) throw new Error();
      const { url } = fields.image.fields.file;
      return {
        heading: fields.name,
        fullText: fields.fullText.content.map((p: any) => p.content[0].value),
        ingredients: fields.ingredients.map((ingr: any) => ingr.fields.name),
        image: {
          uri: `https:${url}`
        }
      };
    })
    .catch(console.error);
};

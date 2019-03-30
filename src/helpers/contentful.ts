import { createClient } from "contentful/dist/contentful.browser.min.js";

const client = createClient({
  space: "prxwxwshz29c",
  accessToken:
    "04605a5df90274f65f6739dda0db1346e6e1526a0eb0fb734268f7b447cdade6"
});
export function getRecipe(id: string) {
  return client
    .getEntry(id)
    .then((result: any) => {
      const { fields } = result;
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
}

export function getRecipiesByIngredients(ingredients: Array<string>) {
  return client
    .getEntries({
      // content_type: ingredients,
      query: ingredients[0]
      // 'fields.ingredients.sys.id': ingredients.join(',')
    })
    .then((result: any) => {
      if (result.total == 0) return [];
      return result.items
        .map((item: { sys: any; fields: any }) => {
          const { fields } = item;
          if (!fields.image || !fields.ingredients || !fields.fullText)
            return null;
          return {
            _id: item.sys.id,
            heading: fields.name,
            fullText: fields.fullText.content.map(
              (p: any) => p.value || p.content[0].value
            ),
            ingredients: fields.ingredients.map(
              (ingr: any) => ingr.fields.name
            ),
            image: {
              uri: `https:${fields.image.fields.file.url}`
            }
          };
        })
        .filter((_: any) => _);
    })
    .catch(console.error);
}

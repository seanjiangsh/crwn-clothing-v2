import { useQuery } from "@apollo/client";

import { getCategories } from "../../utils/graphql/query/categories";
import { getImageUrl } from "../../utils/misc/misc";

import DirectoryItem from "./item/Item";
import { DirectoryContainer } from "./Directory.styles";

export default function Directory() {
  const { data } = useQuery(getCategories);

  const directoryItems = data?.categories.map(({ id, title, items }) => {
    const imageUrl = getImageUrl(title, items[0].id);
    const route = `shop/${title.toLowerCase()}`;
    const props = { key: id, title, imageUrl, route };
    return <DirectoryItem {...props} />;
  });

  return (
    <DirectoryContainer data-testid="directory">
      {directoryItems}
    </DirectoryContainer>
  );
}

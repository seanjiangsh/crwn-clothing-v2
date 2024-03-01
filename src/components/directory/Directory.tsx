import { useQuery } from "@apollo/client";

import DirectoryItem from "./item/Item";
import { DirectoryContainer } from "./Directory.styles";
import { getCategories } from "../../utils/graphql/query/categories";

export default function Directory() {
  const { data } = useQuery(getCategories);

  return (
    <DirectoryContainer>
      {data?.categories.map(({ id, title, items }) => (
        <DirectoryItem
          key={id}
          title={title}
          imageUrl={items[0].imageUrl}
          route={`shop/${title.toLowerCase()}`}
        />
      ))}
    </DirectoryContainer>
  );
}

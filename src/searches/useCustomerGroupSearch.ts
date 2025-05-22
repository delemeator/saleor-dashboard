// @ts-strict-ignore
import { gql } from "@apollo/client";
import {
  CustomerGroupsSearchDocument,
  CustomerGroupsSearchQuery,
  CustomerGroupsSearchQueryVariables,
} from "@dashboard/graphql";
import makeTopLevelSearch from "@dashboard/hooks/makeTopLevelSearch";

export const customerGroupsSearch = gql`
  query CustomerGroupsSearch($query: String!, $first: Int!, $after: String) {
    search: customerGroups(first: $first, filter: { search: $query }, after: $after) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export default makeTopLevelSearch<CustomerGroupsSearchQuery, CustomerGroupsSearchQueryVariables>(
  CustomerGroupsSearchDocument,
);

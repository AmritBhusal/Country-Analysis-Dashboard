import { gql } from "@apollo/client";

export const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      name
      code
      capital
      currency
      emoji
      languages {
        name
        native
      }
      continent {
        name
      }
      states {
        name
      }
      native
      awsRegion
      phone
    }
  }
`;
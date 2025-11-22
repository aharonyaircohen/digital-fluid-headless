export const GET_COURSES = /* GraphQL */ `
  query GetCourses($first: Int = 20, $after: String) {
    courses(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        slug
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        courseFields {
          shortDescription
          price
          durationMinutes
          level
          isFree
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG = /* GraphQL */ `
  query GetCourseBySlug($slug: ID!) {
    course(id: $slug, idType: SLUG) {
      id
      title
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      courseFields {
        shortDescription
        price
        durationMinutes
        level
        isFree
      }
    }
  }
`;

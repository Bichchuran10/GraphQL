const graphql = require("graphql");

let _ = require("lodash");

//dummy data
let usersData = [
  {
    id: "1",
    name: "John",
    age: 50,
  },
  { id: "10", name: "God", age: 20, profession: "Programmer" },
  { id: "100", name: "Neyen", age: 40, profession: "EM" },
  { id: "1000", name: "Lord", age: 60, profession: "SEO" },
  { id: "110", name: "John", age: 30, profession: "PM" },
  { id: "210", name: "Cena", age: 10, profession: "sales person" },
  { id: "30", name: "Reigns", age: 65, profession: "doctor" },
];

let hobbiesData = [
  {
    id: "1",
    title: "Programming",
    description: "Using computers to make the world better",
    userId: "110",
  },
  {
    id: "2",
    title: "Hiking",
    description: "To explore the world",
    userId: "10",
  },
  {
    id: "3",
    title: "Swimming",
    description: "follow the ocean",
    userId: "100",
  },
  {
    id: "4",
    title: "MMA",
    description: "To win the UFC championship",
    userId: "30",
  },
  {
    id: "5",
    title: "Model",
    description: "To participate in Mr. India",
    userId: "1000",
  },
  {
    id: "6",
    title: "Singing",
    description: "To make new albums and get an award",
    userId: "1000",
  },
];

let postData = [
  {
    id: "1",
    comment: "Building a Mind",
    userId: "10",
  },
  {
    id: "2",
    comment: "Learning GraphQL",
    userId: "210",
  },
  {
    id: "3",
    comment: "Take you forward",
    userId: "100",
  },
  {
    id: "4",
    comment: "Stop",
    userId: "30",
  },
  {
    id: "5",
    comment: "Hope for the best",
    userId: "1000",
  },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;

//create Types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postData, { userId: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

//POST type (id,comment)

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(usersData, { id: args.id });
        // let user = {
        //   id: "220",
        //   name: "Maina",
        //   age: "30",
        // };
        // return user;
        //we resolve with data
        //get and return data from a datasource
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        //return data for our hobby
        return _.find(hobbiesData, { id: args.id });
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return (post data)
        return _.find(postData, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

// {
//     user(id:"1"){
//         name
//     }
// }

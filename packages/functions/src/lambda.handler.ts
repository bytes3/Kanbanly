import { Resource } from "sst";

export const handler = async () => {
  // Access linked resources using the Resource module
  console.log(Resource.MyBucket.name);

  // Process the event and return a response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  };
};

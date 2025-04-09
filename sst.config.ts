/// <reference path="./.sst/platform/config.d.ts" />


export default $config({
  app(input) {
    return {
      name: "kanbanly",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },

  async run() {
    const myBucket = new sst.aws.Bucket("MyBucket")
    const myApi = new sst.aws.ApiGatewayV2("MyApi", {
      link: [myBucket],
    });

    new sst.aws.Auth("MyAuth", {
      issuer: "packages/functions/src/auth.handler"
    });

    myApi.route("GET /", "src/get.handler");
    api.deploy();

    // TODO(Refactor): Move this into an utility
    const [fs, pulumi] = await Promise.all([import("fs"), import("@pulumi/pulumi")])

    const envVars = pulumi.all([
      myBucket.name,
      myApi.url
    ]).apply(([bucket, url]) => {
      return {
        EXPO_PUBLIC_BUCKET_NAME: bucket,
        EXPO_PUBLIC_API_URL: url
      }
    })

    // make an .env file so expo app can read the sst output values
    envVars.apply(it => Object.entries(it)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n'))
      .apply(it => fs.writeFileSync('.env', it))
  },
});

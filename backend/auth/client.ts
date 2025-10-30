import { createClient } from "@openauthjs/openauth/client";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { subjects } from "./subjects";

(async () => {
  const client = createClient({
    clientID: "Ov23lir35gvAzMMD4Xyi",
    issuer: "http://localhost:3001", // url to the OpenAuth server
  });

  // const verified = await client.verify(subjects, "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIzYTM0ZDE4LWQ5ZGMtNDYwMi05NTZhLTc3MmYxZjAwOGU2MSIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoiYWNjZXNzIiwidHlwZSI6InVzZXIiLCJwcm9wZXJ0aWVzIjp7InVzZXJJRCI6InByb2ZpbGUiLCJlbWFpbCI6ImVtYWlsIn0sImF1ZCI6Im15LWNsaWVudCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsInN1YiI6InVzZXI6MmY1ZTVhN2FlMTkwNDhkOSIsImV4cCI6MTc0NzgzNjMxM30.umSpfinGZSspY-mGkxV_NW2MmcVRntUeVMDaC1Q1czH3VxMhUpDVsCBOz7QiS74C_gpLb-oe_HRqfw2YqF_xsg")
  // console.log(verified)

  const authorizeResult = await client.authorize(
    "http://localhost:3000/lol",
    "token",
    { pkce: true },
  );
  console.log(authorizeResult);
})();

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    MY_AWS_REGION: process.env.MY_AWS_REGION ?? null,
    AWS_REGION: process.env.AWS_REGION ?? null,
    AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION ?? null,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME ?? null,
    DDB_TABLE_NAME: process.env.DDB_TABLE_NAME ?? null,
    NODE_ENV: process.env.NODE_ENV ?? null,
  });
}

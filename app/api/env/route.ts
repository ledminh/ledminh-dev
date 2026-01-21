import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    APP_AWS_REGION: process.env.MY_AWS_REGION ?? null,
    BLOG_S3_BUCKET: process.env.S3_BUCKET_NAME ?? null,
    BLOG_DDB_TABLE: process.env.DDB_TABLE_NAME ?? null,
    NODE_ENV: process.env.NODE_ENV ?? null,
  });
}

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    APP_AWS_REGION: process.env.APP_AWS_REGION ?? null,
    BLOG_S3_BUCKET: process.env.BLOG_S3_BUCKET ?? null,
    BLOG_DDB_TABLE: process.env.BLOG_DDB_TABLE ?? null,
    NODE_ENV: process.env.NODE_ENV ?? null,
  });
}

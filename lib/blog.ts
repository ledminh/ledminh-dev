import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { Readable } from "stream";

export type BlogPostMeta = {
  key: string;
  title: string;
  tags: string[];
  updatedAt: string | null;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const bucketName = process.env.S3_BUCKET_NAME;
const tableName = process.env.DDB_TABLE_NAME;
const region = process.env.MY_AWS_REGION || process.env.AWS_DEFAULT_REGION;

console.log("S3_BUCKET_NAME =", process.env.S3_BUCKET_NAME);
console.log("DDB_TABLE_NAME =", process.env.DDB_TABLE_NAME);
console.log("MY_AWS_REGION =", process.env.MY_AWS_REGION);

const getClients = () => {
  if (!bucketName || !tableName || !region) {
    throw new Error("Missing S3 or DynamoDB configuration.");
  }
  return {
    s3: new S3Client({ region }),
    dynamo: DynamoDBDocumentClient.from(new DynamoDBClient({ region })),
    bucket: bucketName,
    table: tableName,
  };
};

const streamToString = async (stream: Readable) => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
};

const normalizeMeta = (item: Record<string, unknown>): BlogPostMeta => ({
  key: item.key as string,
  title: (item.title as string) ?? "Untitled post",
  tags: (item.tags as string[]) ?? [],
  updatedAt: (item.updatedAt as string) ?? null,
});

export const listBlogPostMeta = async (options?: {
  tag?: string;
  query?: string;
}): Promise<BlogPostMeta[]> => {
  const { dynamo, table } = getClients();
  const response = await dynamo.send(
    new ScanCommand({
      TableName: table,
    }),
  );
  const tag = options?.tag?.toLowerCase();
  const query = options?.query?.toLowerCase();
  const items = (response.Items ?? [])
    .map((item) => normalizeMeta(item as Record<string, unknown>))
    .filter((item) => item.key?.endsWith(".md"))
    .filter((item) =>
      tag ? item.tags.some((entry) => entry.toLowerCase() === tag) : true,
    )
    .filter((item) => {
      if (!query) {
        return true;
      }
      const tagMatch = item.tags.some((entry) =>
        entry.toLowerCase().includes(query),
      );
      return (
        item.title.toLowerCase().includes(query) ||
        item.key.toLowerCase().includes(query) ||
        tagMatch
      );
    })
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));

  return items;
};

export const getBlogPost = async (key: string): Promise<BlogPost> => {
  const { s3, dynamo, bucket, table } = getClients();
  const response = await dynamo.send(
    new GetCommand({
      TableName: table,
      Key: { key },
    }),
  );
  if (!response.Item) {
    throw new Error(`Post not found: ${key}`);
  }
  const meta = normalizeMeta(response.Item as Record<string, unknown>);
  const s3Key = response.Item.s3Key as string;
  const s3Response = await s3.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: s3Key,
    }),
  );
  if (!s3Response.Body || !(s3Response.Body instanceof Readable)) {
    throw new Error(`Unable to read post content for ${key}.`);
  }
  const content = await streamToString(s3Response.Body);
  return {
    ...meta,
    content,
  };
};

export const listNewestPosts = async (options: {
  limit: number;
  tag?: string;
  query?: string;
}): Promise<BlogPost[]> => {
  const meta = await listBlogPostMeta({
    tag: options.tag,
    query: options.query,
  });
  const top = meta.slice(0, options.limit);
  const posts = await Promise.all(top.map((item) => getBlogPost(item.key)));
  return posts;
};

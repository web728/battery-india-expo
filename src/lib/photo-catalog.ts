
import "server-only";

import { readdir } from "node:fs/promises";
import path from "node:path";

export type GalleryPhoto = {
  src: string;
  alt: string;
};

const IMAGE_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "images"
);

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

const CACHE_DURATION = 60_000;

export const GALLERY_BATCH_SIZE = 18;

let cachedPhotos: GalleryPhoto[] | null = null;
let cacheExpiresAt = 0;
let pendingScan: Promise<GalleryPhoto[]> | null = null;

async function findImages(
  directory: string,
  relativeDirectory = ""
): Promise<string[]> {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  const results: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const relativePath = relativeDirectory
      ? `${relativeDirectory}/${entry.name}`
      : entry.name;

    const absolutePath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      const nestedFiles = await findImages(
        absolutePath,
        relativePath
      );

      results.push(...nestedFiles);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path
      .extname(entry.name)
      .toLowerCase();

    if (ALLOWED_EXTENSIONS.has(extension)) {
      results.push(relativePath);
    }
  }

  return results;
}

function toPublicUrl(relativePath: string): string {
  const encodedPath = relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/images/${encodedPath}`;
}

function toAltText(relativePath: string): string {
  const fileName = path.basename(
    relativePath,
    path.extname(relativePath)
  );

  const description = fileName
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Numeric and generic camera filenames should not
  // become misleading image descriptions.
  const isGeneric =
    !description ||
    /^\d+$/.test(description) ||
    /^(img|image|dsc|dscn|photo|untitled|pic)\s*\d*$/i.test(
      description
    );

  return isGeneric
    ? "Exhibition gallery photograph"
    : `Exhibition gallery photograph: ${description}`;
}

async function scanGallery(): Promise<GalleryPhoto[]> {
  let files: string[];

  try {
    files = await findImages(IMAGE_DIRECTORY);
  } catch (error) {
    const isMissingDirectory =
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT";

    if (isMissingDirectory) {
      return [];
    }

    throw error;
  }

  files.sort((a, b) =>
    a.localeCompare(b, "en", {
      numeric: true,
      sensitivity: "base",
    })
  );

  return files.map((file) => ({
    src: toPublicUrl(file),
    alt: toAltText(file),
  }));
}

export async function getGalleryPhotos(): Promise<
  GalleryPhoto[]
> {
  const now = Date.now();

  if (cachedPhotos && now < cacheExpiresAt) {
    return cachedPhotos;
  }

  if (!pendingScan) {
    pendingScan = scanGallery();
  }

  try {
    const photos = await pendingScan;

    cachedPhotos = photos;
    cacheExpiresAt = Date.now() + CACHE_DURATION;

    return photos;
  } finally {
    pendingScan = null;
  }
}

export async function getGalleryBatch(
  offset: number,
  batchSize = GALLERY_BATCH_SIZE
) {
  const photos = await getGalleryPhotos();

  const start = Math.max(0, Math.floor(offset));
  const end = start + batchSize;

  return {
    photos: photos.slice(start, end),
    nextOffset: Math.min(end, photos.length),
    hasMore: end < photos.length,
  };
}

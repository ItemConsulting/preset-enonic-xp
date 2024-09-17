export function urlToRequest(url: string, root?: string): string;

export function getHashDigest(
  buffer: unknown,
  hashType?: "xxhash64" | "sha1" | "md4" | "md5" | "sha256" | "sha512",
  digestType?: string,
  maxLength?: "hex" | "base26" | "base32" | "base36" | "base49" | "base52" | "base58" | "base62" | "base64",
): string;

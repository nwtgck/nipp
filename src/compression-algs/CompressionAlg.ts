export type CompressionAlg = {
  readonly id: symbol,
  readonly name: string,
  readonly compress: (raw: string) => Promise<string>,
  readonly decompress: (compressed: string) => Promise<string>
}

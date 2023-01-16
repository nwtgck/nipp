import {type CompressionAlg} from "@/compression-algs/CompressionAlg";

const pakoAsync = () => import('pako');

export const DeflateAlg: CompressionAlg = {
  name: "Deflate",
  compress: async (str: string) => {
    const pako = await pakoAsync();
    // NOTE: Negative windowBits means no header and no checksum
    // (see: https://docs.python.org/3.6/library/zlib.html#zlib.decompress)
    const binStr = pako.deflate(str, {to: 'string', level: 9, windowBits: -8});
    return binStr;
  },
  decompress: async (binStr: string) => {
    const pako = await pakoAsync();
    // NOTE: Negative windowBits means no header and no checksum
    // (see: https://docs.python.org/3.6/library/zlib.html#zlib.decompress)
    return pako.inflate(binStr, {to: 'string', windowBits: -8});
  }
};

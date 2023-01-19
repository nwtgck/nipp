import {loadScriptOnce} from "@/utils";
import {type CompressionAlg} from "@/compression-algs/CompressionAlg";


// Get LZMA object
const LZMAAsync = async () => {
  // NOTE: LZMA-JS does not support require/import: This PR seem to be a support, but not merged : https://github.com/LZMA-JS/LZMA-JS/pull/60
  await loadScriptOnce('copied_js/lzma_worker-min.js');
  return (window as any).LZMA;
};

export const LZMAAlg: CompressionAlg = {
  id: Symbol(),
  name: "LZMA",
  compress: async (str: string) => {
    const LZMA = await LZMAAsync();
    const compressed: string = LZMA.compress(str, 9);
    // (from: https://github.com/alcor/itty-bitty/blob/5292c4b7891939dab89412f9e474bca707c9bec5/data.js#L25)
    // TODO: Not use any in Uint8Array
    // TODO: Not use any in apply
    return String.fromCharCode.apply(null, new Uint8Array(compressed as any) as any);
  },
  decompress: async function(binStr) {
    const LZMA = await LZMAAsync();
    return LZMA.decompress(binStr.split('').map(function(c){return c.charCodeAt(0)}));
  }
};

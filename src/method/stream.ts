import { Stream, Duplex } from 'stream';

/**
 * Converting a read/write stream to a buffer.
 *
 * @param buffer
 *
 * @returns Buffer
 *
 * @publicApi
 */
export async function toBuffer(stream: Stream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const buffers: Uint8Array[] = [];
    stream.on('error', reject);
    stream.on('data', (data) => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
  });
}
/**
 * Converting a buffer to a read/write stream
 *
 * @param buffer
 *
 * @returns Duplex
 *
 * @publicApi
 */
export async function toStream(buffer: Buffer): Promise<Duplex> {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

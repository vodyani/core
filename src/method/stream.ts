import { Stream, Duplex } from 'stream';

export async function toBuffer(stream: Stream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const buffers: Uint8Array[] = [];
    stream.on('error', reject);
    stream.on('data', (data) => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
  });
}

export async function toStream(buffer: Buffer): Promise<Duplex> {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

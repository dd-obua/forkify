import { TIMEOUT_SECONDS } from './config';

const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request too long. Timeout after ${s} seconds.`));
    }, s * 1000);
  });
};

export const getJSON = async (url) => {
  try {
    const request = fetch(url);
    const res = await Promise.race([request, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} - ${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async (url, uploadData) => {
  try {
    const request = fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([request, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} - ${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
};

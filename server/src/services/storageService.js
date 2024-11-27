import { createClient } from 'openstack-swift-client';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const client = createClient({
  authUrl: process.env.OS_AUTH_URL,
  tenantId: process.env.OS_TENANT_ID,
  tenantName: process.env.OS_TENANT_NAME,
  username: process.env.OS_USERNAME,
  password: process.env.OS_PASSWORD,
  region: process.env.OS_REGION_NAME
});

const container = process.env.OS_CONTAINER_NAME;

export const uploadFile = async (file, folder = '') => {
  try {
    const extension = path.extname(file.originalname);
    const filename = `${folder}/${uuidv4()}${extension}`;
    
    await client.putObject(container, filename, file.buffer, {
      contentType: file.mimetype
    });

    const url = `https://storage.gra.cloud.ovh.net/${container}/${filename}`;
    return { url, filename };
  } catch (error) {
    console.error('Storage upload error:', error);
    throw new Error('Failed to upload file');
  }
};

export const deleteFile = async (filename) => {
  try {
    await client.deleteObject(container, filename);
  } catch (error) {
    console.error('Storage delete error:', error);
    throw new Error('Failed to delete file');
  }
};

export const getFileUrl = (filename) => {
  return `https://storage.gra.cloud.ovh.net/${container}/${filename}`;
};
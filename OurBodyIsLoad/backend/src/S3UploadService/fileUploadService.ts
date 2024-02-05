import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { Buffer } from 'buffer';

@Injectable()
export class FileUploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFileToBucket(
    bucketName: string,
    fileName: string,
    file: Buffer,
  ): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: file,
      });

      await this.s3Client.send(command);

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });

      return url;
    } catch (error) {
      console.error('Error uploading file to AWS S3:', error);
      throw error;
    }
  }

  async uploadImage(fileName: string, image: Buffer): Promise<string> {
    const bucketName = 'obilbucket';

    const imageUrlWithQueryParams = await this.uploadFileToBucket(
      bucketName,
      fileName,
      image,
    );

    const baseUrl = imageUrlWithQueryParams.split('?')[0];

    return baseUrl;
  }
}

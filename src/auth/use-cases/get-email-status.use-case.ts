import { BadRequestException } from '@nestjs/common';
import { QueryStatusDto } from '../../common/mailjet/dto/query-status.dto';

export const getEmailStatusUseCase = async (
  queryStatusDto: QueryStatusDto,
): Promise<any> => {
  const username = process.env.MAILJET_API_KEY;
  const password = process.env.MAILJET_API_SECRET;
  const { messageHref } = queryStatusDto;

  try {
    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64',
    );

    const response = await fetch(messageHref, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error(error.message);

    error.message = `BAD_REQUEST :: ${error.message}`;
    throw new BadRequestException(error.message);
  }
};

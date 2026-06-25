import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { envs } from 'src/config/envs';

const Mailjet = require('node-mailjet');

const mailjet = new Mailjet({
  apiKey: envs.mailjetApiKey,
  apiSecret: envs.mailjetApiSecret,
});

type Attachment = {
  ContentType: string;
  Filename: string;
  Base64Content: string; // Ahora siempre se espera que Base64Content sea proporcionado
};

export interface MailsTo {
  Email: string;
}

@Injectable()
export class MailjetService {
  private readonly logger = new Logger(MailjetService.name);

  constructor() {
    // Afficher les options utilisés en mode debug

    // instancier la connexion a mailjet
    //  console.log(mailjet);
    if (!mailjet) {
      throw new Error('Failed to initialize Mailjet client.');
    }
  }

  async sendEmail(
    to: MailsTo[] = [],
    subject: string,
    textPart: string,
    htmlPart: string,
    attachments: Attachment[] = [], // Base64Content debe ser proporcionado si hay adjuntos
  ): Promise<any> {
    const messages = {
      Messages: [
        {
          From: {
            Email: envs.mailFrom, // Tu dirección de correo de envío
            Name: envs.nameFrom, // Tu nombre o el de tu empresa
          },
          // To: [
          //   {
          //     Email: to,
          //   },
          // ],
          To: to,
          Subject: subject,
          TextPart: textPart,
          HTMLPart: htmlPart,
          Attachments: attachments.map(
            ({ ContentType, Filename, Base64Content }) => ({
              ContentType,
              Filename,
              Base64Content,
            }),
          ),
        },
      ],
    };

    try {
      const resp = await mailjet
        .post('send', { version: 'v3.1' })
        .request(messages);
      this.logger.log('Email sent successfully');
      return resp;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
}

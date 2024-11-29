export type TMessageAttachment = {
    uuid: string;
    type: "image";
    url: string;
    width: number;
    height: number;
};

export type TReaction = {
    uuid: string;
    participantUuid: string;
    value: string;
};

export type TMessage = {
    uuid: string;
    text: string;
    attachments: TMessageAttachment[];
    replyToMessageUuid?: string;
    reactions: TReaction[];
    authorUuid: string;
    sentAt: number;
    updatedAt: number;
};

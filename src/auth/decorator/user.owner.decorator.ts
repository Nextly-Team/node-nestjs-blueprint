import { SetMetadata } from "@nestjs/common";

export const IS_USER_OWNER = 'isUserOwner';
export const UserOwner = () => SetMetadata(IS_USER_OWNER, true);
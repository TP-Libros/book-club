import { PartialType } from '@nestjs/mapped-types';
import { CreateGenderDto } from './create-gender.dto';

export class UpdateGenderDto extends PartialType(CreateGenderDto) {}

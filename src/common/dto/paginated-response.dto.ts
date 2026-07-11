import { PaginationMetaDto } from "./pagination-meta.dto";

export interface PaginatedResponseDto<T> {
  items: T[];
  meta: PaginationMetaDto;
}
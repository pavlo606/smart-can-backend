import { PaginatedResponseDto } from "../dto/paginated-response.dto";

export class PaginatedMapper {
  static map<TEntity, TResponse>(
    result: PaginatedResponseDto<TEntity>,
    mapper: (entity: TEntity) => TResponse,
  ): PaginatedResponseDto<TResponse> {
    return {
      items: result.items.map(mapper),
      meta: result.meta,
    };
  }
}
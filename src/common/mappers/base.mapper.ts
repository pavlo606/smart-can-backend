export abstract class BaseMapper<TEntity, TResponse> {
  abstract toBaseResponse(entity: TEntity): TResponse;
}
import { SelectQueryBuilder, QueryRunner, AbstractRepository, UpdateResult, FindConditions, ObjectID, FindOneOptions, QueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

const _ = require('lodash');

export default abstract class BaseRepository<T> extends AbstractRepository<T> {
  queryBuilder(userId: unknown, alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<T> {
    const userIdFilter = alias ? `${alias}.user_id` : 'user_id';
    return this.repository.createQueryBuilder(alias, queryRunner).andWhere(`${userIdFilter} = :user_id`, { user_id: userId });
  }

  create(userId: unknown, entity: T[]): Promise<T[]>;
  create(userId: unknown, entity: T): Promise<T>;
  async create(userId: unknown, entity: T | T[]): Promise<T | T[]> {
    if (!Array.isArray(entity)) {
      Object.assign(entity, { created_by: userId, updated_by: userId, created_at: new Date(), updated_at: new Date() });
      return await this.repository.create(entity);
    }

    for (let i = 0; i < entity.length; i++) {
      Object.assign(entity[i], { created_by: userId, updated_by: userId, created_at: new Date(), updated_at: new Date() });
    }

    return await this.repository.create(entity);
  }

  async findOne(userId: unknown, id: number, options?: FindOneOptions<T>): Promise<T> {
    options = options ?? {};
    Object.assign(options, { where: `${this.repository.metadata.name}.user_id = ${userId}` });

    return this.repository.findOne(id, options);
  }

  save(userId: unknown, entity: T[]): Promise<T[]>;
  save(userId: unknown, entity: T): Promise<T>;
  async save(userId: unknown, entity: T | T[]): Promise<T | T[]> {
    const timestamp = { updated_at: new Date(), updated_by: userId };
    if (!_.get(entity, 'id')) Object.assign(timestamp, { created_at: new Date(), created_by: userId });

    if (!Array.isArray(entity)) {
      Object.assign(entity, timestamp);
      return await this.repository.save(entity);
    }

    for (let i = 0; i < entity.length; i++) {
      Object.assign(entity[i], timestamp);
    }
    return await this.repository.save(entity);
  }

  toSql(query: SelectQueryBuilder<T> | QueryBuilder<T> | SelectQueryBuilder<unknown>): string {
    const [q, params] = query.getQueryAndParameters();
    let sql = q;

    params.forEach((p) => (sql = sql.replace('?', p)));

    // eslint-disable-next-line
    console.log(sql);
    return sql;
  }

  async update(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>,
    partialEntity: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    Object.assign(partialEntity, { created_at: new Date(), updated_at: new Date() });
    return this.repository.update(criteria, partialEntity);
  }
}

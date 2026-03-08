import { Repository, FindManyOptions, ObjectLiteral } from "typeorm";

export interface PaginationResult<T extends ObjectLiteral> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }
}

export interface PaginationOptions {
    page?: number;
    limit?: number;
}

export async function paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    options: FindManyOptions<T>,
    paginationOptions: PaginationOptions
): Promise<PaginationResult<T>> {
    const page = paginationOptions.page || 1;
    const limit = paginationOptions.limit || 10;

    const skip = (page - 1) * limit;

    const [data, total] = await repository.findAndCount({
        ...options,
        skip,
        take: limit,
    });

    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }
    };
}

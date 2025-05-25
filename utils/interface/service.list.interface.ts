import type {IApiListResponseInterface} from "~/plugins/router/api.list.response.interface";

export interface IServiceList<T> {
    kind: "IServiceList"
    list: (page: number, perPage: number, search: string, orderBy: string, order: string) => Promise<IApiListResponseInterface<T>>
    get: (id: number) => Promise<T>
}

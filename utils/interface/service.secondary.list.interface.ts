import type {IApiListResponseInterface} from "~/plugins/router/api.list.response.interface";

export interface IServiceSecondaryList<T> {
    kind: "IServiceSecondaryList"
    list: (page: number, perPage: number, search: string, orderBy: string, order: string, id: number) => Promise<IApiListResponseInterface<T>>
}

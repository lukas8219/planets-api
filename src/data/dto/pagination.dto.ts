export class PaginationDTO<T> {

    private data : Array<T>;
    private size : number;
    private page : number;
    private sort : string;
    private count : number;

    constructor({
        data , pageSize, pageNumber, sort, count
    }){
        Object.assign(this, {
            data: data,
            size: pageSize,
            page: pageNumber,
            sort: sort,
            count: count
        })
    }
}
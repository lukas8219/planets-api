export class PaginationParameters {

    private pageNumber : number;
    private pageSize : number;
    private sort : string;

    constructor({
        pageNumber, pageSize, sort
    }){
        Object.assign(this, {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sort: sort
        })
    }

    getPageSize(){
        return this.pageSize;
    }

    getPageNumber(){
        return this.pageNumber;
    }

    getSort() : string{
        return this.sort;;
    }

}
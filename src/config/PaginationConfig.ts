import { Injectable, OnApplicationBootstrap } from "@nestjs/common";

@Injectable()
export class PaginationConfig implements OnApplicationBootstrap {

    onApplicationBootstrap() {
        if(!this.pageNumber || !this.pageSize || !this.sort){
            throw new Error();
        }
    }

    private pageNumber : Number = Number(process.env.PAGINATION_PAGE_NUMBER);
    private pageSize : Number = Number(process.env.PAGINATION_PAGE_SIZE);
    private sort : string = process.env.PAGINATION_SORT;

    getPageNumber(){
        return this.pageNumber;
    }

    getPageSize(){
        return this.pageSize;
    }

    getSort(){
        return this.sort;
    }

}
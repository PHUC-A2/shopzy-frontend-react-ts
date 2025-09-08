// USER
export interface IUser {
    id: number;
    name: string;
    fullName: string;
    email: string;
    password?: string | null;
    phoneNumber: string;
    status?: string | null;
}

// login
export interface ILogin {
    username: string;
    password: string;
}

// product
export interface IProduct {
    /*
 * +) Sản Phẩm
 * id : Mã sản phẩm
 * name : Tên sản phẩm
 * description : Mô tả sản phẩm
 * price : Giá bán
 * stock : Số lượng tồn kho
 * status : Trạng thái hàng (IN_STOCK = còn hàng, OUT_OF_STOCK = hết hàng)
 * condition : Tình trạng hàng (NEW = hàng mới, USED = hàng cũ/second-hand)
 * imageUrl : Ảnh sản phẩm
 * size : Kích thước (S, M, L, XL)
 * color : Màu sắc
 * 
 */

    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    status: ProductStatusEnum;
    productCondition: ProductConditionEnum;
    imageUrl: string;
    size: string;
    color: string;
}

// cart
export interface ICart {
    id: number;
    user: IUser | null;
}

// cart create
/*
vì backend ở dạng object:
    {
        "user":{
            "id":1
        }
    }
*/
export interface ICreateCartReq {
    user: {
        id: number;
    }
}

// cart update
export interface IUpdateCartReq {
    id: number;
    user: {
        id: number;
    }
}


// dùng union tương tự enum
export type ProductConditionEnum = "NEW" | "USED";
export type ProductStatusEnum = "IN_STOCK" | "OUT_OF_STOCK";
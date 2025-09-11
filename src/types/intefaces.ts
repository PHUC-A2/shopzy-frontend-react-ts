// ================USER================
export interface IUser {
    id: number;
    name?: string;
    fullName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    status?: string;
}

export interface ICreateUserReq {
    name: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    status: string;
}

export interface IUpdateUserReq {
    id: number;
    name: string;
    fullName: string;
    phoneNumber: string;
    status: string;
}

// ==============Auth==================
// login
export interface ILogin {
    username: string;
    password: string;
}

// ==============Product==================
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

export interface ICreateProductReq {
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

export interface IUpdateProductReq {
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

// ==============Cart==================

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

export interface IUpdateCartReq {
    id: number;
    user: {
        id: number;
    }
}

// ==============Order==================
export interface IOrder {
    id: number;
    status: OrderStatusEnum;
    paymentMethod: OrderPaymentMethodEnum;
    paymentStatus: OrderPaymentStatusEnum;
    total: number;
    shippingAddress: string;
    shippingPhone: string;
    user: IUser | null;
}

export interface ICreateOrderReq {
    user: {
        id: number;
    }
    status: OrderStatusEnum;
    paymentMethod: OrderPaymentMethodEnum;
    paymentStatus: OrderPaymentStatusEnum;
    total: number;
    shippingAddress: string;
    shippingPhone: string;
}

export interface IUpdateOrderReq {
    id: number;
    user: {
        id: number;
    }
    status: OrderStatusEnum;
    paymentMethod: OrderPaymentMethodEnum;
    paymentStatus: OrderPaymentStatusEnum;
    total: number;
    shippingAddress: string;
    shippingPhone: string;
}

// ==============Các type tương tự Enum trong java==================

// dùng union tương tự enum

// product
export type ProductConditionEnum = "NEW" | "USED";
export type ProductStatusEnum = "IN_STOCK" | "OUT_OF_STOCK";

// order
export type OrderPaymentMethodEnum = "COD" | "VNPAY";
export type OrderPaymentStatusEnum = "UNPAID" | "PAID";
export type OrderStatusEnum = "PENDING" | "SHIPPING" | "COMPLETED" | "CANCELLED";
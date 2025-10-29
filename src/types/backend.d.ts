// ================Client================

// Response API chung cho mọi entity
export interface IApiResponse<T> {
    statusCode: number;
    error: string | null;
    message: string;
    data: T;
}

// Response có phân trang
export interface IPaginate<T> {
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    };
    result: T[];
}

// cart item
export interface ICartItemRes {
    cartItemId: number;
    productId: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    status: ProductStatusEnum;
    subtotal: number;
}

export interface ICartItemResult<T> {
    cartId: number;
    cartItems: T[]
}

// ============= FILE===========
export interface IUploadFile {
    fileName: string;
    uploadedAt: string;
    url: string;
}

// upload file res

export type IGetUploadResponse = IApiResponse<IUploadFile>;

// cart item
export type IGetCartItemResponse = IApiResponse<ICartItemResult<ICartItemClient>>;

// product
export type IGetAllProductsResponse = IApiResponse<IPaginate<IProduct>>;

// ================Client================
// ================USER================
export interface IUser {
    id: number;
    name?: string;
    fullName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    status?: UserEnum;
    createdAt: string;         // hoặc Date, tùy backend
    updatedAt: string | null;  // có thể null nếu chưa cập nhật
    createdBy: string;         // email hoặc username
    updatedBy: string | null;  // null nếu chưa ai cập nhật
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
    status: UserEnum;
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
    name?: string;
    description?: string;
    price: number;
    stock: number;
    status?: ProductStatusEnum;
    productCondition?: ProductConditionEnum;
    imageUrl?: string;
    size?: string;
    color?: string;
    createdAt: string;         // hoặc Date, tùy backend
    updatedAt: string | null;  // có thể null nếu chưa cập nhật
    createdBy: string;         // email hoặc username
    updatedBy: string | null;  // null nếu chưa ai cập nhật
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
    createdAt: string;         // hoặc Date, tùy backend
    updatedAt: string | null;  // có thể null nếu chưa cập nhật
    createdBy: string;         // email hoặc username
    updatedBy: string | null;  // null nếu chưa ai cập nhật
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

// ==============Cart Item==================
export interface ICartItem {
    id: number;
    quantity: number;
    product: IProduct | null;
    cart: ICart | null;
    createdAt: string;         // hoặc Date, tùy backend
    updatedAt: string | null;  // có thể null nếu chưa cập nhật
    createdBy: string;         // email hoặc username
    updatedBy: string | null;  // null nếu chưa ai cập nhật
}

export interface ICreateCartItemReq {
    quantity: number;
    product: {
        id: number;
    }
    cart: {
        id: number;
    }
}

export interface IUpdateCartItemReq {
    id: number;
    quantity: number;
    product: {
        id: number;
    }
    cart: {
        id: number;
    }
}

// ==============Order==================
export interface IOrder {
    id: number;
    status?: OrderStatusEnum;
    paymentMethod?: OrderPaymentMethodEnum;
    paymentStatus?: OrderPaymentStatusEnum;
    total: number;
    shippingAddress?: string;
    shippingPhone?: string;
    user: IUser | null;
    createdAt: string;         // hoặc Date, tùy backend
    updatedAt: string | null;  // có thể null nếu chưa cập nhật
    createdBy: string;         // email hoặc username
    updatedBy: string | null;  // null nếu chưa ai cập nhật
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

// ==============Order Item==================
export interface IOrderItem {
    id: number;
    quantity: number;
    unitPrice: number;
    product: IProduct | null;
    order: IOrder | null;
    createdAt: string;         // hoặc Date, tùy backend
    updatedAt: string | null;  // có thể null nếu chưa cập nhật
    createdBy: string;         // email hoặc username
    updatedBy: string | null;  // null nếu chưa ai cập nhật
}

export interface ICreateOrderItemReq {
    quantity: number;
    unitPrice: number;
    product: {
        id: number;
    };
    order: {
        id: number;
    }
}

export interface IUpdateOrderItemReq {
    id: number;
    quantity: number;
    unitPrice: number;
    product: {
        id: number;
    };
    order: {
        id: number;
    }
}


// ==============Các type tương tự Enum trong java==================

// dùng union tương tự enum

// user
//     ACTIVE, // Hoạt động bình thường
//     INACTIVE, // Ngưng hoạt động / bị vô hiệu hóa
//     PENDING_VERIFICATION, // Chờ xác minh email/OTP
//     BANNED, // Bị cấm
//     DELETED // Đã xóa (hoặc lưu trữ)
export type UserEnum = "ACTIVE" | "INACTIVE" | "PENDING_VERIFICATION" | "BANNED" | "DELETED";

// product
export type ProductConditionEnum = "NEW" | "USED";
export type ProductStatusEnum = "IN_STOCK" | "OUT_OF_STOCK";

// order
export type OrderPaymentMethodEnum = "COD" | "VNPAY";
export type OrderPaymentStatusEnum = "UNPAID" | "PAID";
export type OrderStatusEnum = "PENDING" | "SHIPPING" | "COMPLETED" | "CANCELLED";


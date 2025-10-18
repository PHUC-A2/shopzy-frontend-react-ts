// đây là file query.ts chứa các hàm chung về query

export const buildQuery = (params: Record<string, any>) => {
    return Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join('&');
};

export const buildFilterQuery = (filters: Record<string, any>, operator: 'and' | 'or' = 'and') => {
    const conditions = Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => {
            // Nếu value là số thì không cần thêm dấu nháy
            if (typeof value === 'number') {
                return `${key} = ${value}`;
            }
            // Nếu value là chuỗi có chứa ~, >, <,... thì giữ nguyên
            if (/[~<>]/.test(value)) {
                return `${key} ${value}`;
            }
            // Mặc định: so sánh chuỗi có dấu nháy
            return `${key} ~ '${value}'`;
        });

    return conditions.length
        ? `filter=${encodeURIComponent(conditions.join(` ${operator} `))}`
        : '';
};

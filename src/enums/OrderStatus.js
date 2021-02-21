const OrderStatus = {
    NEW: {
        value: 'NEW',
        title: 'Mới tạo',
        progressTitle: 'Tạo đơn',
        indicatorColor: '#ed5426'
    },
    RECEIVED: {
        value: 'RECEIVED',
        title: 'Đã nhận',
        progressTitle: 'Nhận đơn',
        indicatorColor: '#ed5426'
    },
    CONFIRMED: {
        value: 'CONFIRMED',
        title: 'Đã xác nhận',
        progressTitle: 'Xác nhận',
        indicatorColor: '#367ff5'
    },
    AVAILABLE: {
        value: 'AVAILABLE',
        title: 'Sẵn sàng giao',
        progressTitle: 'Sẵn sàng giao',
        indicatorColor: '#367ff5'
    },
    COMPLETED: {
        value: 'COMPLETED',
        title: 'Đã lấy',
        progressTitle: 'Lấy hàng',
        indicatorColor: '#4db856'
    },
    CANCELED: {
        value: 'CANCELED',
        title: 'Đã huỷ',
        progressTitle: 'Đã huỷ',
        indicatorColor: '#db2828'
    }
};

export default OrderStatus;
